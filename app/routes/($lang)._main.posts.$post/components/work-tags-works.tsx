import { useContext } from "react"
import { useQuery } from "@apollo/client/index"
import { AuthContext } from "~/contexts/auth-context"
import { ResponsivePhotoWorksAlbum } from "~/components/responsive-photo-works-album"
import { partialWorkFieldsFragment } from "~/graphql/fragments/partial-work-fields"
import { graphql } from "gql.tada"

type Props = {
  tagName: string
  rating: "G" | "R15" | "R18" | "R18G"
}

/**
 * タグ関連の作品
 */
export const WorkTagsWorks = (props: Props) => {
  const appContext = useContext(AuthContext)

  const { data: suggestedWorkResp } = useQuery(worksQuery, {
    skip: appContext.isLoading,
    variables: {
      offset: 0,
      limit: 32,
      where: {
        tagNames: [props.tagName],
        ratings: [props.rating],
      },
    },
  })

  const tagWork = suggestedWorkResp?.works ?? []

  return <ResponsivePhotoWorksAlbum works={tagWork} />
}

const worksQuery = graphql(
  `query Works($offset: Int!, $limit: Int!, $where: WorksWhereInput) {
    works(offset: $offset, limit: $limit, where: $where) {
      ...PartialWorkFields
    }
  }`,
  [partialWorkFieldsFragment],
)