import { ConstructionAlert } from "~/components/construction-alert"
import { ParamsError } from "~/errors/params-error"
import { loaderClient } from "~/lib/loader-client"
import {
  UserContents,
  UserProfileFragment,
} from "~/routes/($lang)._main.users.$user/components/user-contents"
import {
  UserHomeMain,
  userHomeMainFragment,
} from "~/routes/($lang)._main.users.$user/components/user-home-main"
import {
  UserProfileIconFragment,
  UserProfileNameIcon,
} from "~/routes/($lang)._main.users.$user/components/user-profile-name-icon"
import type { LoaderFunctionArgs } from "@remix-run/cloudflare"
import { json, useLoaderData, useParams } from "@remix-run/react"
import { graphql } from "gql.tada"
import { Suspense } from "react"
import { Lumiflex } from "uvcanvas"
import { ExchangeIconUrl } from "~/utils/exchange-icon-url"

export async function loader(props: LoaderFunctionArgs) {
  if (props.params.user === undefined) {
    throw new Response(null, { status: 404 })
  }

  const userResp = await loaderClient.query({
    query: userQuery,
    variables: {
      userId: decodeURIComponent(props.params.user),
    },
  })

  if (userResp.data.user === null) {
    throw new Response(null, { status: 404 })
  }

  return json({
    user: userResp.data.user,
  })
}

export default function UserLayout() {
  const params = useParams<"user">()

  if (params.user === undefined) {
    throw ParamsError()
  }

  const data = useLoaderData<typeof loader>()

  return (
    <>
      <Suspense>
        <ConstructionAlert
          type="WARNING"
          message="リニューアル版はすべて開発中のため不具合が起きる可能性があります！一部機能を新しくリリースし直しています！基本的には旧版をそのままご利用ください！"
          fallbackURL={`https://www.aipictors.com/users/${params.user}`}
          deadline={"2024-07-30"}
        />
        <div className="flex w-full flex-col justify-center">
          <div className="relative">
            <div className="relative">
              {data.user.headerImageUrl ? (
                <div className="relative min-h-[168px] md:min-h-[320px]">
                  {data.user.headerImageUrl &&
                  !data.user.headerImageUrl.includes("wp-content") ? (
                    <>
                      <div
                        className="absolute top-0 left-0 z-10 z-standard flex h-full min-h-[168px] w-full items-center justify-center md:min-h-[320px]"
                        style={{
                          background: "center top / contain no-repeat",
                          backgroundImage: `url(${data.user.headerImageUrl})`,
                          maxHeight: "240px",
                        }}
                      />
                      <div className="absolute right-0 bottom-0 left-0 z-10 box-border flex h-24 flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 pb-7 opacity-0 md:opacity-50" />
                    </>
                  ) : (
                    <>
                      <div
                        className="absolute top-0 left-0 z-10 z-standard flex h-16 min-h-[168px] w-full items-center justify-center opacity-50 md:min-h-[320px]"
                        style={{
                          background: "center top / contain no-repeat",
                          maxHeight: "240px",
                        }}
                      >
                        <Lumiflex />
                      </div>
                      <div className="absolute right-0 bottom-0 left-0 z-10 box-border flex h-24 flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 pb-7 opacity-0 md:opacity-50" />
                    </>
                  )}
                  <div className="relative m-auto">
                    <div className="absolute top-0 left-0 max-h-full min-h-[168px] w-full max-w-full overflow-hidden md:min-h-[320px]">
                      <img
                        className="block h-full max-h-full min-h-[168px] w-full max-w-full scale-125 object-cover object-center blur-[64px] transition-opacity duration-500 md:min-h-[320px]"
                        src={data.user.headerImageUrl}
                        alt=""
                      />
                    </div>
                    <div className="absolute bottom-0 left-8 z-30">
                      <UserProfileNameIcon user={data.user} />
                    </div>
                  </div>
                  {/* <div className="absolute right-0 bottom-0 left-0 z-20 h-[25%] bg-gradient-to-t from-[rgba(0,0,0,0.30)] to-transparent p-4 pb-3">
                    &nbsp;
                  </div> */}
                </div>
              ) : (
                <>
                  <div className="relative min-h-[240px] overflow-hidden md:min-h-[320px]">
                    {/* <div
                className="absolute top-0 left-0 z-10 z-standard flex h-full min-h-[240px] w-full items-center justify-center md:min-h-[320px]"
                style={{
                  background: "center top / contain no-repeat",
                  backgroundImage: `url(${data.user.headerImageUrl})`,
                  maxHeight: "240px",
                  boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
                }}
              /> */}
                    <div className="relative m-auto">
                      <img
                        className="absolute top-0 left-0 h-full max-h-full min-h-[320px] w-full max-w-full object-cover object-center blur-[120px] transition-opacity duration-500 md:block md:blur-[120px]"
                        src={ExchangeIconUrl(data.user.iconUrl)}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-8 z-20">
                    <UserProfileNameIcon user={data.user} />
                  </div>
                </>
              )}
            </div>
            <Suspense>
              <UserHomeMain
                user={data.user}
                userId={data.user.id}
                isSensitive={true}
              />
            </Suspense>
          </div>
          <Suspense>
            <UserContents isSensitive={true} user={data.user} />
          </Suspense>
        </div>
      </Suspense>
    </>
  )
}

const userQuery = graphql(
  `query User(
    $userId: ID!,
  ) {
    user(id: $userId) {
      ...UserHomeMain
      ...UserProfile
      ...UserProfileIcon
    }
  }`,
  [userHomeMainFragment, UserProfileFragment, UserProfileIconFragment],
)