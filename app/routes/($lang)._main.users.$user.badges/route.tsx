import { loaderClient } from "~/lib/loader-client"
import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"
import { graphql } from "gql.tada"
import { config } from "~/config"
import {
  UserBadgeListItemFragment,
  UserBadgesList,
} from "~/routes/($lang)._main.users.$user.badges/components/user-badges-list"

export async function loader(props: LoaderFunctionArgs) {
  if (props.params.user === undefined) {
    throw new Response(null, { status: 404 })
  }

  const userIdResp = await loaderClient.query({
    query: userIdQuery,
    variables: {
      userId: decodeURIComponent(props.params.user),
    },
  })

  if (userIdResp.data.user === null) {
    throw new Response(null, { status: 404 })
  }

  const badgesResp = await loaderClient.query({
    query: userBadgesQuery,
    variables: {
      offset: 0,
      limit: 32,
      where: {
        userId: userIdResp.data.user.id,
      },
    },
  })

  return {
    badges: badgesResp.data.userBadges,
  }
}

export const headers: HeadersFunction = () => ({
  "Cache-Control": config.cacheControl.oneDay,
})

export default function UserBadges() {
  const data = useLoaderData<typeof loader>()

  if (data.badges === null) {
    return
  }

  return (
    <div className="flex flex-col space-y-4">
      <UserBadgesList badges={data.badges} />
    </div>
  )
}

export const userBadgesQuery = graphql(
  `query UserBadges($offset: Int!, $limit: Int!, $where: UserBadgesWhereInput!) {
    userBadges(offset: $offset, limit: $limit, where: $where) {
      ...UserBadgeListItem
    }
  }`,
  [UserBadgeListItemFragment],
)

const userIdQuery = graphql(
  `query UserId($userId: ID!) {
    user(id: $userId) {
      id
    }
  }`,
)
