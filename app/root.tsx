import "react-photo-view/dist/react-photo-view.css"
import "@fontsource-variable/noto-sans-jp"

import { AppAnalytics } from "@/_components/app/app-analytics"
import { AppLoadingPage } from "@/_components/app/app-loading-page"
import { AppNotFoundPage } from "@/_components/app/app-not-found-page"
import { ContextProviders } from "@/_components/context-providers"
import { cn } from "@/_lib/utils"
import { config } from "@/config"
import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/cloudflare"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react"
import { init } from "@sentry/browser"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import { Toaster } from "@/_components/app/app-sonner"
import { PhotoProvider } from "react-photo-view"
import notoSansJPWoff2 from "@fontsource-variable/noto-sans-jp/files/noto-sans-jp-latin-wght-normal.woff2?url"
import styles from "@/tailwind.css?url"
import { AppErrorPage } from "@/_components/app/app-error-page"

export const headers: HeadersFunction = (props) => {
  if (props.errorHeaders !== undefined) {
    return {
      "Cache-Control": "max-age=0, s-maxage=0",
    }
  }

  return {
    "Cache-Control":
      "max-age=120, s-maxage=3600, stale-while-revalidate=2592000, stale-if-error=2592000",
  }
}

export const links: LinksFunction = () => {
  return [
    // tailwind.cssのロード
    { rel: "stylesheet", href: styles, crossOrigin: "anonymous" },

    // フォントのpreload
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: notoSansJPWoff2,
      crossOrigin: "anonymous",
    },
  ]
}

export const meta: MetaFunction = () => {
  return [
    { title: config.metadata.catchphraseJA },
    { desc: config.metadata.descriptionJA },
  ]
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <AppNotFoundPage />
  }

  if (isRouteErrorResponse(error) && 400 < error.status) {
    return <AppErrorPage status={error.status} message={error.data} />
  }

  return <AppNotFoundPage />
}

type Props = Readonly<{
  children: React.ReactNode
}>

/**
 * https://remix.run/docs/en/main/file-conventions/root#layout-export
 */
export function Layout(props: Props) {
  if (
    typeof window !== "undefined" &&
    typeof import.meta.env.VITE_SENTRY_DSN === "string"
  ) {
    init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
      tracesSampleRate: 0.001,
      enabled: import.meta.env.PROD,
    })
  }

  return (
    <html lang={"ja"} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={cn("margin-0 min-h-screen font-sans antialiased")}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"system"}
          enableSystem
          disableTransitionOnChange
        >
          <ContextProviders>
            <PhotoProvider maskOpacity={0.7}>
              <Suspense fallback={<AppLoadingPage />}>
                {props.children}
              </Suspense>
            </PhotoProvider>
          </ContextProviders>
        </ThemeProvider>
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <>
      <Outlet />
      <Suspense fallback={null}>
        <AppAnalytics />
      </Suspense>
    </>
  )
}
