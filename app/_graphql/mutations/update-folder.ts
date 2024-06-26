import { gql } from "@/_graphql/__generated__"

export const updateFolderMutation = gql(`
  mutation UpdateFolder($input: UpdateFolderInput!) {
    updateFolder(input: $input) {
      id
      title
      description
    }
  }
`)
