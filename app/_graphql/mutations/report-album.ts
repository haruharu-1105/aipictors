import { gql } from "@/_graphql/__generated__"

export const reportAlbumMutation = gql(`
  mutation ReportAlbum($input: ReportAlbumInput!) {
    reportAlbum(input: $input)
  }
`)
