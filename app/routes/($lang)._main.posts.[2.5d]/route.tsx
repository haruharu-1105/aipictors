import { loaderClient } from "~/lib/loader-client"
import {
  HomeTagList,
  HomeTagListItemFragment,
} from "~/routes/($lang)._main._index/components/home-tag-list"
import {
  HomeWorkList,
  HomeWorkListItemFragment,
} from "~/routes/($lang)._main._index/components/home-work-list"
import { useLoaderData } from "@remix-run/react"
import { graphql } from "gql.tada"
import type { HeadersFunction } from "@remix-run/cloudflare"
import { config } from "~/config"

export async function loader() {
  const worksResp = await loaderClient.query({
    query: LoaderWorksQuery,
    variables: {
      offset: 0,
      limit: 16,
      where: {},
    },
  })

  const hotTagsResp = await loaderClient.query({
    query: LoaderTagsQuery,
    variables: {},
  })

  return {
    works: worksResp.data.works,
    hotTags: hotTagsResp.data.hotTags,
  }
}

export const headers: HeadersFunction = () => ({
  "Cache-Control": config.cacheControl.oneDay,
})

/**
 * セミリアルの作品一覧画面
 */
export default function Works25d() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      <HomeTagList hotTags={data.hotTags} />
      <HomeWorkList works={data.works} />
    </>
  )
}

const LoaderTagsQuery = graphql(
  `query HotTags {
    hotTags {
      ...HomeTagListItem
    }
  }`,
  [HomeTagListItemFragment],
)

const LoaderWorksQuery = graphql(
  `query Works($offset: Int!, $limit: Int!, $where: WorksWhereInput) {
    works(offset: $offset, limit: $limit, where: $where) {
      ...HomeWorkListItem
    }
  }`,
  [HomeWorkListItemFragment],
)
