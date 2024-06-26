import { gql } from "@/_graphql/__generated__"

export const followUserMutation = gql(`
  mutation FollowUser($input: FollowUserInput!) {
    followUser(input: $input) {
      id
      isFollowee
    }
  }
`)
