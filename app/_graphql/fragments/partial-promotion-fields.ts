import { gql } from "@/_graphql/__generated__"

export const partialPromotionFieldsFragment = gql(`
  fragment PartialPromotionFields on PromotionNode {
    id
    title
    description
    imageURL
    pageURL
    startDateTime
    endDateTime
  }
`)
