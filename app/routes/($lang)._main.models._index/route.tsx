import { GoogleAdsense } from "@/[lang]/(main)/_components/google-adsense"
import { ImageModelList } from "@/[lang]/(main)/models/_components/image-model-list"
import { ArticlePage } from "@/_components/page/article-page"
import { imageModelsQuery } from "@/_graphql/queries/image-model/image-models"
import { createClient } from "@/_lib/client"
import { useLoaderData } from "@remix-run/react"

/**
 * モデルの一覧
 * @returns
 */
export async function loader() {
  const client = createClient()

  const resp = await client.query({
    query: imageModelsQuery,
    variables: {},
  })

  return {
    imageModels: resp.data.imageModels,
  }
}

export default function ModelsPage() {
  const data = useLoaderData<typeof loader>()

  return (
    <ArticlePage>
      <ImageModelList imageModels={data.imageModels} />
      <GoogleAdsense slot={"5201832236"} format={"auto"} responsive={"true"} />
    </ArticlePage>
  )
}