"use client"
import { Grid, GridItem } from "@chakra-ui/react"
import type {
  ImageLoraModelsQuery,
  ImageModelsQuery,
  PromptCategoryQuery,
} from "__generated__/apollo"
import { useState } from "react"

import { GenerationEditorHistory } from "app/[lang]/(beta)/generation/_components/GenerationEditorHistory"
import { GenerationEditorLoraModels } from "app/[lang]/(beta)/generation/_components/GenerationEditorLoraModels"
import { GenerationEditorModels } from "app/[lang]/(beta)/generation/_components/GenerationEditorModels"
import { GenerationEditorNegative } from "app/[lang]/(beta)/generation/_components/GenerationEditorNegative"
import { GenerationEditorPrompt } from "app/[lang]/(beta)/generation/_components/GenerationEditorPrompt"
import { useImageGenerationAreas } from "app/[lang]/(beta)/generation/_hooks/useImageGenerationAreas"
import { Config } from "config"

type Props = {
  imageModels: ImageModelsQuery["imageModels"]
  promptCategories: PromptCategoryQuery["promptCategories"]
  imageLoraModels: ImageLoraModelsQuery["imageLoraModels"]
}

export const GenerationEditor: React.FC<Props> = (props) => {
  /**
   * 選択された画像モデルのID
   */
  const [selectedImageModelId, onSelectedImageModelId] = useState(
    Config.defaultImageModelId,
  )

  /**
   * 選択されたLoRAモデルのID
   */
  const [selectedLoraModels, selectLoraModels] = useState(() => {
    return Config.defaultImageLoraModelIds.map((id) => {
      return { id, value: 0 }
    })
  })

  const [imageSize, setImageSize] = useState<number>()

  const [imageVae, setImageVae] = useState<number>()

  const [imageSeed, setImageSeed] = useState<number>()

  const [selectedNegativePromptCategories, setSelectNegativePromptCategories] =
    useState<string>()

  const [selectedHistory, selectHistory] = useState("")

  const area = {
    models: "models",
    editorPrompt: "editor-prompt",
    histories: "histories",
    loraModels: "lora-models",
    editorNegativePrompt: "editor-negative-prompt",
  } as const

  const responsiveAreas = useImageGenerationAreas()

  const templateAreas = (responsiveAreas ?? [])
    .map((row) => `"${row.join(" ")}"`)
    .join("\n")

  /**
   * LoRAモデルを選択する
   * @param modelId
   */
  const onSelectLoraModelId = (modelId: string) => {
    const currentModelIds = selectedLoraModels.map((model) => model.id)
    const draftIds = [...currentModelIds]
    const index = draftIds.indexOf(modelId)
    if (index === -1) {
      draftIds.push(modelId)
    } else {
      draftIds.splice(index, 1)
    }
    // TODO: プランによって個数をかえる
    // 3つ以上選択されたら、最初の要素を削除する
    if (draftIds.length > 2) {
      draftIds.shift()
    }
    const draftModels = draftIds.map((id) => {
      const model = selectedLoraModels.find((model) => model.id === id)
      if (model !== undefined) {
        return model
      }
      return { id, value: 0 }
    })
    selectLoraModels(draftModels)
  }

  return (
    <Grid
      as={"main"}
      templateAreas={templateAreas}
      gridTemplateRows={{
        base: "1fr 1fr 1fr 1fr 1fr",
        md: "1fr 1fr 1fr",
        xl: "1fr 1fr",
      }}
      gridTemplateColumns={{
        base: "1fr",
        md: "1fr 1fr",
        xl: "1fr 1fr 1fr",
      }}
      w={"100%"}
      gap={2}
      h={"calc(100svh - 72px)"}
      px={4}
      pb={4}
      overflowY={"auto"}
    >
      <GridItem area={area.models} overflow={{ base: "auto", md: "hidden" }}>
        <GenerationEditorModels
          models={props.imageModels}
          selectedImageModelId={selectedImageModelId}
          onSelectImageModelId={(id) => {
            onSelectedImageModelId(id)
          }}
        />
      </GridItem>
      <GridItem
        area={area.loraModels}
        overflow={{ base: "auto", md: "hidden" }}
      >
        <GenerationEditorLoraModels
          models={props.imageLoraModels}
          selectedModels={selectedLoraModels}
          onSelectModelId={onSelectLoraModelId}
          onChangeValue={(id, value) => {
            const draftModels = selectedLoraModels.map((model) => {
              if (model.id === id) {
                return { ...model, value }
              }
              return model
            })
            selectLoraModels(draftModels)
          }}
          size={0}
          setSize={(size) => {
            setImageSize(size)
          }}
          vae={0}
          setVae={(vae) => {
            setImageVae(vae)
          }}
          seed={0}
          setSeed={(seed) => {
            setImageSeed(seed)
          }}
        />
      </GridItem>
      <GridItem
        area={area.editorPrompt}
        overflow={{ base: "auto", md: "hidden" }}
      >
        <GenerationEditorPrompt
          promptCategories={props.promptCategories}
          selectedPrompts={[]}
          onSelectPromptId={() => {}}
        />
      </GridItem>
      <GridItem
        area={area.editorNegativePrompt}
        overflow={{ base: "auto", md: "hidden" }}
      >
        <GenerationEditorNegative
          negativePrompt={selectedNegativePromptCategories ?? ""}
          setNegativePrompt={(prompt) => {
            setSelectNegativePromptCategories(prompt)
          }}
        />
      </GridItem>
      <GridItem area={area.histories} overflow={{ base: "auto", md: "hidden" }}>
        <GenerationEditorHistory
          selectHistory={selectHistory}
          selectedHistory={selectedHistory}
        />
      </GridItem>
    </Grid>
  )
}