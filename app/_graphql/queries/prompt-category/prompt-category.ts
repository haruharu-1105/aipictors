import { gql } from "@/_graphql/__generated__"

export const promptCategoriesQuery = gql(`
  query PromptCategories {
    promptCategories {
      id
      name
      prompts {
        id
        name
        words
      }
    }
  }
`)
