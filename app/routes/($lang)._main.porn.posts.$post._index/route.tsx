import { ParamsError } from "~/errors/params-error"
import { loaderClient } from "~/lib/loader-client"
import {
  sensitiveWorkArticleFragment,
  type workArticleFragment,
} from "~/routes/($lang)._main.posts.$post._index/components/work-article"
import { CommentListItemFragment } from "~/routes/($lang)._main.posts.$post._index/components/work-comment-list"
import { WorkContainer } from "~/routes/($lang)._main.posts.$post._index/components/work-container"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare"
import { json, useParams } from "@remix-run/react"
import { useLoaderData } from "@remix-run/react"
import { type FragmentOf, graphql } from "gql.tada"
import { AppLoadingPage } from "~/components/app/app-loading-page"
import { config, META } from "~/config"
import { createMeta } from "~/utils/create-meta"
import { HomeNewCommentsFragment } from "~/routes/($lang)._main._index/components/home-new-comments"
import { getJstDate } from "~/utils/jst-date"
import { homeAwardWorksQuery } from "~/routes/($lang)._main._index/components/home-award-works"

export function HydrateFallback() {
  return <AppLoadingPage />
}

export async function loader(props: LoaderFunctionArgs) {
  if (props.params.post === undefined) {
    throw new Response(null, { status: 404 })
  }

  const workResp = await loaderClient.query({
    query: workQuery,
    variables: {
      id: props.params.post,
    },
  })

  if (workResp.data.work === null) {
    throw new Response(null, { status: 404 })
  }

  // 非公開の場合はエラー
  if (
    workResp.data.work.accessType === "PRIVATE" ||
    workResp.data.work.accessType === "DRAFT"
  ) {
    throw new Response(null, { status: 404 })
  }

  // センシティブでない作品の場合は/postsにリダイレクト
  if (
    workResp.data.work.rating === "G" ||
    workResp.data.work.rating === "R15"
  ) {
    return json(null, {
      status: 302,
      headers: {
        Location: `/posts/${props.params.post}`,
      },
    })
  }

  const workCommentsResp = await loaderClient.query({
    query: workCommentsQuery,
    variables: {
      workId: props.params.post,
    },
  })

  if (workCommentsResp.data.work === null) {
    throw new Response(null, { status: 404 })
  }

  const newComments = await loaderClient.query({
    query: newCommentsQuery,
    variables: {
      workId: props.params.post,
    },
  })

  const now = getJstDate(new Date())

  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  // ランキング
  const awardWorks = await loaderClient.query({
    query: homeAwardWorksQuery,
    variables: {
      offset: 0,
      limit: 4,
      where: {
        isSensitive: true,
        year: yesterday.getFullYear(),
        month: yesterday.getMonth() + 1,
        day: yesterday.getDate(),
      },
    },
  })

  console.log(awardWorks)

  return json(
    {
      post: props.params.post,
      work: workResp.data.work,
      workComments: workCommentsResp.data.work.comments,
      newComments: newComments.data.newComments,
      awardWorks: awardWorks.data.workAwards,
    },
    {
      headers: {
        "Cache-Control": config.cacheControl.oneHour,
      },
    },
  )
}

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return [{ title: "Aipictorsの作品ページ" }]
  }

  const work = data as { work: FragmentOf<typeof workArticleFragment> }

  const userPart = work.work.user ? ` - ${work.work.user?.name}の作品` : ""

  return createMeta(META.POSTS, {
    title: `${work.work.title}${userPart}`,
    description:
      work.work.description ||
      "Aipictorsの作品ページです、AIイラストなどの作品を閲覧することができます",
    url: config.defaultSensitiveOgpImageUrl,
  })
}

export default function Work() {
  const params = useParams()

  if (params.post === undefined) {
    throw ParamsError()
  }

  const data = useLoaderData<typeof loader>()

  if (data === null) {
    return null
  }

  return (
    <WorkContainer
      post={data.post}
      work={data.work}
      comments={data.workComments}
      isSensitive={true}
      newComments={data.newComments}
      awardWorks={data.awardWorks}
    />
  )
}

const workCommentsQuery = graphql(
  `query WorkComments($workId: ID!) {
    work(id: $workId) {
      id
      comments(offset: 0, limit: 128) {
        ...Comment
      }
    }
  }`,
  [CommentListItemFragment],
)

const workQuery = graphql(
  `query Work($id: ID!) {
    work(id: $id) {
      ...WorkArticle
    }
  }`,
  [sensitiveWorkArticleFragment],
)

const newCommentsQuery = graphql(
  `query NewComments {
    newComments: newComments(
      offset: 0,
      limit: 8,
      where: {
        isSensitive: true,
        ratings: [R18, R18G],
      }
    ) {
      ...HomeNewComments
    }
  }`,
  [HomeNewCommentsFragment],
)