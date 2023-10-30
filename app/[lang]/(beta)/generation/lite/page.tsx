import type { PromptCategoryQuery } from "__generated__/apollo"
import { PromptCategoryDocument } from "__generated__/apollo"
import { GenerationEditorLite } from "app/[lang]/(beta)/generation/lite/_components/GenerationEditorLite"
import { createClient } from "app/_utils/client"
import type { Metadata } from "next"

const GenerationLitePage = async () => {
  const client = createClient()

  const promptCategoryQuery = await client.query<PromptCategoryQuery>({
    query: PromptCategoryDocument,
    variables: {},
  })

  return (
    <GenerationEditorLite
      promptCategories={promptCategoryQuery.data.promptCategories}
    />
  )
}

export const metadata: Metadata = {
  robots: { index: false },
  title: "-",
}

export const revalidate = 60

export default GenerationLitePage