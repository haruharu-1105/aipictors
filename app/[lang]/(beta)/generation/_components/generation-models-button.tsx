"use client"

import { ImageModelsList } from "@/app/[lang]/(beta)/generation/_components/image-models-list"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ImageModelsQuery } from "@/graphql/__generated__/graphql"

type Props = {
  isOpen: boolean
  onClose(): void
  models: ImageModelsQuery["imageModels"]
  selectedModelId: string | null
  onSelect(id: string, type: string): void
}

export const GenerationModelsButton = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full" variant={"secondary"}>
          {"すべてのモデル"}
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <DialogHeader>
          <DialogTitle>{"モデルを選択"}</DialogTitle>
          <DialogDescription>
            使用するモデルを選択してください
          </DialogDescription>
        </DialogHeader>
        <ImageModelsList
          models={props.models}
          onSelect={props.onSelect}
          selectedModelId={props.selectedModelId}
        />
      </DialogContent>
    </Dialog>
  )
}