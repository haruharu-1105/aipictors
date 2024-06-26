import { gql } from "@/_graphql/__generated__"

export const updateImageGenerationMemoMutation = gql(`
  mutation UpdateImageGenerationTask($input: UpdateImageGenerationMemoInput!) {
    updateImageGenerationMemo(input: $input) {
      ...ImageGenerationMemoFields
    }
  }
`)
