import { AuthContext } from "~/contexts/auth-context"
import { partialWorkFieldsFragment } from "~/graphql/fragments/partial-work-fields"
import { HomeWorkSection } from "~/routes/($lang)._main._index/components/home-work-section"
import { WORK_COUNT_DEFINE } from "~/routes/($lang)._main._index/route"
import { useQuery } from "@apollo/client/index"
import { type FragmentOf, graphql } from "gql.tada"
import { useContext } from "react"

type Props = {
  isSensitive?: boolean
  works: FragmentOf<typeof partialWorkFieldsFragment>[]
}

/**
 * ユーザからの推薦作品
 */
export const HomeWorksUsersRecommendedSection = (props: Props) => {
  const appContext = useContext(AuthContext)

  // 推薦作品
  const { data: recommendedWorksResp } = useQuery(worksQuery, {
    skip: appContext.isLoading,
    variables: {
      offset: 0,
      limit: WORK_COUNT_DEFINE.PROMOTION_WORKS,
      where: {
        isRecommended: true,
        ratings: props.isSensitive ? ["R18", "R18G"] : ["G"],
      },
    },
  })

  const workDisplayed = recommendedWorksResp?.works ?? props.works

  return (
    <>
      <HomeWorkSection
        title={"ユーザからの推薦"}
        works={workDisplayed}
        isCropped={false}
        link={
          "https://www.aipictors.com/search/?query=%7B%22keyword%22%3A%22%23%23%E6%8E%A8%E8%96%A6%E4%BD%9C%E5%93%81%22%2C%22options%22%3A%7B%22age%22%3A%5B%220%22%2C%223%22%2C%221%22%2C%222%22%5D%2C%22posttype%22%3A%5B%22image%22%2C%22novel%22%2C%22column%22%2C%22video%22%5D%2C%22target%22%3A%5B%22category%22%2C%22title%22%2C%22explanation%22%2C%22prompt%22%2C%22owner%22%5D%2C%22service%22%3A%22%22%2C%22model%22%3A%22%22%2C%22prompt%22%3A%5B%220%22%2C%221%22%2C%222%22%5D%2C%22follow%22%3A%5B%220%22%2C%221%22%5D%2C%22subject%22%3A%5B%220%22%2C%221%22%5D%2C%22taste%22%3A%5B%221%22%2C%222%22%2C%223%22%5D%2C%22post-since%22%3A%22%22%2C%22post-until%22%3A%22%22%2C%22collabid%22%3A%22%22%2C%22order%22%3A%22new%22%2C%22limit%22%3A%22100%22%2C%22offset%22%3A0%7D%7D&next=1"
        }
      />
    </>
  )
}

const worksQuery = graphql(
  `query Works($offset: Int!, $limit: Int!, $where: WorksWhereInput) {
    works(offset: $offset, limit: $limit, where: $where) {
      ...PartialWorkFields
    }
  }`,
  [partialWorkFieldsFragment],
)