import { gql } from "@/_graphql/__generated__"

export const reportWorkMutation = gql(`
  mutation ReportWork($input: ReportWorkInput!) {
    reportWork(input: $input)
  }
`)
