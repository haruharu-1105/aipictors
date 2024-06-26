import { gql } from "@/_graphql/__generated__"

export const followNotificationFieldsFragment = gql(`
  fragment FollowNotificationFields on FollowNotificationNode {
    id
    createdAt
    user {
      ...PartialUserFields
    }
  }
`)
