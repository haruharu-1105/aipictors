import { gql } from "@/_graphql/__generated__"

export const workAwardNotificationFieldsFragment = gql(`
  fragment WorkAwardNotificationFields on WorkAwardNotificationNode {
    id
    createdAt
    message
    work {
      ...PartialWorkFields
    }
  }
`)
