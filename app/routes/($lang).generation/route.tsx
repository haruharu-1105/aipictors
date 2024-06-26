import { AppLoadingPage } from "@/_components/app/app-loading-page"
import { AuthContext } from "@/_contexts/auth-context"
import { controlNetCategoriesQuery } from "@/_graphql/queries/controlnet-category/controlnet-category"
import { imageLoraModelsQuery } from "@/_graphql/queries/image-model/image-lora-models"
import { imageModelsQuery } from "@/_graphql/queries/image-model/image-models"
import { negativePromptCategoriesQuery } from "@/_graphql/queries/negative-prompt-category/negative-prompt-category"
import { promptCategoriesQuery } from "@/_graphql/queries/prompt-category/prompt-category"
import { createClient } from "@/_lib/client"
import { config } from "@/config"
import HomeHeader from "@/routes/($lang)._main._index/_components/home-header"
import { GenerationConfigProvider } from "@/routes/($lang).generation._index/_components/generation-config-provider"
import { GenerationQueryProvider } from "@/routes/($lang).generation._index/_components/generation-query-provider"
import { ApolloError } from "@apollo/client/index"
import type { HeadersFunction, MetaFunction } from "@remix-run/cloudflare"
import { Outlet, useLoaderData } from "@remix-run/react"
import { useContext } from "react"

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "max-age=0, s-maxage=60, stale-while-revalidate=2592000, stale-if-error=2592000",
  }
}

export const meta: MetaFunction = () => {
  const siteName = "無料AIイラスト生成 - スマホ対応"

  const description =
    "無料で画像生成することができます。1日無料30枚でたくさん生成できます。LoRA、ControlNetにも対応、多数のモデルからお気に入りのイラストを生成できます。生成した画像はすぐに投稿したり、自由に利用したりすることができます。"

  return [
    { title: siteName },
    {
      name: "description",
      content: description,
    },
    { property: "og:title", content: siteName },
    { property: "og:description", content: description },
    { property: "og:site_name", content: siteName },
    {
      property: "og:image",
      content: `${config.siteURL}/opengraph-image.jpg`,
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: siteName },
    { name: "twitter:description", content: description },
  ]
}

export const loader = async () => {
  try {
    const client = createClient()

    const promptCategoriesReq = client.query({
      query: promptCategoriesQuery,
      variables: {},
    })

    const negativePromptCategoriesReq = client.query({
      query: negativePromptCategoriesQuery,
      variables: {},
    })

    const controlNetCategoriesReq = client.query({
      query: controlNetCategoriesQuery,
      variables: {},
    })

    const imageModelsReq = client.query({
      query: imageModelsQuery,
      variables: {},
    })

    const imageLoraModelsReq = client.query({
      query: imageLoraModelsQuery,
      variables: {},
    })

    const resp = await Promise.all([
      negativePromptCategoriesReq,
      promptCategoriesReq,
      imageModelsReq,
      imageLoraModelsReq,
      controlNetCategoriesReq,
    ])

    const [
      negativePromptCategoriesResp,
      promptCategoriesResp,
      imageModelsResp,
      imageLoraModelsResp,
      controlNetCategoriesResp,
    ] = resp

    return {
      promptCategories: promptCategoriesResp.data.promptCategories,
      negativePromptCategories:
        negativePromptCategoriesResp.data.negativePromptCategories,
      imageModels: imageModelsResp.data.imageModels,
      imageLoraModels: imageLoraModelsResp.data.imageLoraModels,
      controlNetCategories: controlNetCategoriesResp.data.controlNetCategories,
    }
  } catch (error) {
    if (error instanceof ApolloError) {
      throw new Response(error.message, { status: 500 })
    }
    if (error instanceof Error) {
      throw new Response(error.message, { status: 500 })
    }
    throw new Response("ERROR", { status: 500 })
  }
}

export function HydrateFallback() {
  return <AppLoadingPage />
}

export default function GenerationLayout() {
  const data = useLoaderData<typeof loader>()

  const authContext = useContext(AuthContext)

  if (authContext.isLoading) {
    return <AppLoadingPage />
  }

  return (
    <>
      <HomeHeader title="画像生成 β" />
      <GenerationQueryProvider
        promptCategories={data.promptCategories}
        negativePromptCategories={data.negativePromptCategories}
        controlNetCategories={data.controlNetCategories}
        imageModels={data.imageModels}
        imageLoraModels={data.imageLoraModels}
      >
        <GenerationConfigProvider>
          <div className="container max-w-none">
            <Outlet />
          </div>
        </GenerationConfigProvider>
      </GenerationQueryProvider>
    </>
  )
}
