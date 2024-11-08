import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare"
import { RemixServer } from "@remix-run/react"
import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"

declare global {
  interface CacheStorage {
    default: Cache
  }
}

export default async function handleRequest(
  request: Request,
  loaderStatusCode: number,
  headers: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  const url = new URL(request.url)

  const cacheKey = new Request(
    url.toString(),
    new Request(request.url, request),
  )

  if (import.meta.env.PROD && loaderStatusCode === 200) {
    const cachedResponse = await caches.default.match(cacheKey)
    if (cachedResponse) {
      return cachedResponse
    }
  }

  let remixStatusCode = loaderStatusCode

  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      onError(error: unknown) {
        console.error(error)
        remixStatusCode = 500
      },
    },
  )

  if (isbot(request.headers.get("user-agent"))) {
    await body.allReady
  }

  headers.set("Content-Type", "text/html")

  const response = new Response(body, {
    headers: headers,
    status: remixStatusCode,
  })

  if (import.meta.env.PROD && loaderStatusCode === 200) {
    loadContext.cloudflare.ctx.waitUntil(
      caches.default.put(cacheKey, response.clone()),
    )
  }

  return response
}
