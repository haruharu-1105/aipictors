"use client"

import { PromptCategoriesDialogContents } from "@/app/[lang]/generation/_components/editor-prompt-view/prompt-categories-dialog-contents"
import { GenerationEditorCard } from "@/app/[lang]/generation/_components/generation-editor-card"
import { formatPromptText } from "@/app/[lang]/generation/_utils/format-prompt-text"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { PromptCategoriesQuery } from "@/graphql/__generated__/graphql"
import { BookTextIcon } from "lucide-react"

type Props = {
  promptText: string
  promptCategories: PromptCategoriesQuery["promptCategories"]
  onChangePromptText(text: string): void
  onBlurPromptText(): void
}

export const GenerationEditorPromptView = (props: Props) => {
  const formattedPromptText = formatPromptText(props.promptText)

  const categoryPrompts = props.promptCategories.flatMap((category) => {
    return category.prompts
  })

  const onSelectPromptId = (promptId: string) => {
    const categoryPrompt = categoryPrompts.find((prompt) => {
      return prompt.id === promptId
    })
    const promptText = categoryPrompt?.words.join(",") ?? ""
    const draftPromptText = formattedPromptText.includes(promptText)
      ? formattedPromptText.replaceAll(promptText, "")
      : [formattedPromptText, promptText].join(",")
    const draftFormattedPromptText = formatPromptText(draftPromptText)
    props.onChangePromptText(draftFormattedPromptText)
  }

  const currentPrompts = categoryPrompts.filter((prompt) => {
    return formattedPromptText.includes(prompt.words.join(","))
  })

  const selectedPromptIds = currentPrompts.map((prompt) => prompt.id)

  const onOpen = () => {}
  const onClose = () => {}

  return (
    <>
      <GenerationEditorCard
        title={"プロンプト"}
        tooltip={"生成したいイラストの要素をキーワードから選んでください。"}
        action={
          <>
            <div className="hidden xl:block">
              <Button variant={"secondary"} size={"sm"} onClick={onOpen}>
                {"キーワード"}
              </Button>
            </div>
            <div className="block xl:hidden">
              <Button size={"icon"} variant={"ghost"} onClick={onOpen}>
                <BookTextIcon />
              </Button>
            </div>
          </>
        }
      >
        <div className="flex flex-col px-4 pb-4 h-full gap-y-2">
          <Textarea
            className="resize-none h-full font-mono min-h-40"
            placeholder={"プロンプト"}
            value={props.promptText}
            onChange={(event) => {
              props.onChangePromptText(event.target.value)
            }}
            onBlur={() => {
              props.onBlurPromptText()
            }}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"} size={"sm"} className="w-full">
                {"キーワードから選ぶ"}
              </Button>
            </DialogTrigger>
            <PromptCategoriesDialogContents
              selectedPromptIds={selectedPromptIds}
              onClose={onClose}
              promptCategories={props.promptCategories}
              onSelect={onSelectPromptId}
            />
          </Dialog>
        </div>
      </GenerationEditorCard>
    </>
  )
}