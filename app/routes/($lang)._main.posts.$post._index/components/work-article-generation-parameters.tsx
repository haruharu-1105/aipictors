import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { useState } from "react"
import { Card } from "~/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"
import { Button } from "~/components/ui/button"
import { toast } from "sonner"
import { useTranslation } from "~/hooks/use-translation"

type Props = {
  prompt: string | null
  negativePrompt: string | null
  steps: number | null
  scale: number | null
  seed: number | null
  sampler: string | null
  strength: string | null
  otherGenerationParams: string | null
}

/**
 * 作品詳細情報
 */
export function WorkArticleGenerationParameters(props: Props) {
  const [viewGenerationType, setViewGenerationType] = useState("prompt")

  const t = useTranslation()

  if (
    !(
      props.otherGenerationParams ||
      props.prompt ||
      props.negativePrompt ||
      props.steps ||
      props.scale ||
      props.seed ||
      props.sampler ||
      props.strength
    )
  ) {
    return null
  }

  const copyToClipboard = (text: string | null) => {
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
      toast("コピーしました")
    })
  }

  return (
    <>
      <div className="hidden md:block">
        <Tabs className="block" value={viewGenerationType}>
          <TabsList>
            {props.prompt && (
              <TabsTrigger
                onClick={() => {
                  setViewGenerationType("prompt")
                }}
                className="w-full"
                value="prompt"
              >
                Prompts
              </TabsTrigger>
            )}
            {props.negativePrompt && (
              <TabsTrigger
                onClick={() => {
                  setViewGenerationType("negativePrompt")
                }}
                className="w-full"
                value="negativePrompt"
              >
                NegativePrompts
              </TabsTrigger>
            )}
            {(props.steps || props.scale || props.seed || props.sampler) && (
              <TabsTrigger
                onClick={() => {
                  setViewGenerationType("parameter")
                }}
                className="w-full"
                value="parameter"
              >
                Parameter
              </TabsTrigger>
            )}
            {props.otherGenerationParams && (
              <TabsTrigger
                onClick={() => {
                  setViewGenerationType("other")
                }}
                className="w-full"
                value="other"
              >
                Other
              </TabsTrigger>
            )}
          </TabsList>
          {props.prompt && (
            <TabsContent value="prompt">
              <Card className="m-0 max-h-32 overflow-y-auto whitespace-pre-wrap p-2">
                {props.prompt}
              </Card>
              <Button
                onClick={() => {
                  copyToClipboard(props.prompt)
                }}
                variant={"secondary"}
                className="h-8 w-full"
              >
                {"Copy"}
              </Button>
            </TabsContent>
          )}
          {props.negativePrompt && (
            <TabsContent value="negativePrompt">
              <Card className="m-0 max-h-32 overflow-y-auto whitespace-pre-wrap p-2">
                {props.negativePrompt}
              </Card>
              <Button
                onClick={() => {
                  copyToClipboard(props.negativePrompt)
                }}
                variant={"secondary"}
                className="h-8 w-full"
              >
                {"Copy"}
              </Button>
            </TabsContent>
          )}
          {(props.steps || props.scale || props.seed || props.sampler) && (
            <TabsContent value="parameter">
              <Card className="m-0 max-h-32 overflow-y-auto whitespace-pre-wrap p-2">
                <div className="p-4">
                  <div className="flex flex-wrap justify-between">
                    <div className="flex md:block">
                      <span className="block text-center text-sm opacity-50">
                        Steps
                      </span>
                      <span className="block text-center text-lg">
                        {props.steps}
                      </span>
                    </div>
                    <div className="flex md:block">
                      <span className="block text-center text-sm opacity-50">
                        Scale
                      </span>
                      <span className="block text-center text-lg">
                        {props.scale}
                      </span>
                    </div>
                    <div className="flex md:block">
                      <span className="block text-center text-sm opacity-50">
                        Seed
                      </span>
                      <span className="block text-center text-lg">
                        {props.seed}
                      </span>
                    </div>
                    <div className="flex md:block">
                      <span className="block text-center text-sm opacity-50">
                        Sampler
                      </span>
                      <span className="block text-center text-lg">
                        {props.sampler}
                      </span>
                    </div>
                    <div className="flex md:block">
                      <span className="block text-center text-sm opacity-50">
                        Strength
                      </span>
                      <span className="block text-center text-lg">
                        {props.strength}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}
          {props.otherGenerationParams && (
            <TabsContent value="other">
              <Card className="m-0 max-h-32 overflow-y-auto whitespace-pre-wrap p-2">
                {props.otherGenerationParams}
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
      <div className="block md:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="setting">
            <AccordionTrigger>
              {t("生成情報", "Generation Information")}
            </AccordionTrigger>
            <AccordionContent className="space-y-2">
              <div className="space-y-2">
                {props.prompt && (
                  <div className="space-y-2">
                    <p className="text-md">{t("プロンプト", "Prompts")}</p>
                    <Card className="m-0 max-h-32 overflow-y-auto whitespace-pre-wrap p-2">
                      {props.prompt}
                    </Card>
                    <Button
                      onClick={() => {
                        copyToClipboard(props.prompt)
                      }}
                      variant={"secondary"}
                      className="w-full"
                    >
                      {t("コピー", "Copy")}
                    </Button>
                  </div>
                )}
                {props.negativePrompt && (
                  <div className="space-y-2">
                    <p className="text-md">
                      {t("ネガティブプロンプト", "Negative Prompts")}
                    </p>
                    <Card className="m-0 max-h-32 overflow-y-auto whitespace-pre-wrap p-2">
                      {props.negativePrompt}
                    </Card>
                    <Button
                      onClick={() => {
                        copyToClipboard(props.negativePrompt)
                      }}
                      variant={"secondary"}
                      className="w-full"
                    >
                      {t("コピー", "Copy")}
                    </Button>
                  </div>
                )}
                {(props.steps ||
                  props.scale ||
                  props.seed ||
                  props.sampler) && (
                  <div>
                    <p className="text-md">{"Stepsなど"}</p>
                    <Card className="m-0 max-h-32 overflow-y-auto whitespace-pre-wrap p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-center text-sm opacity-50">
                          Steps
                        </span>
                        <span className="text-center text-lg">
                          {props.steps}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-center text-sm opacity-50">
                          Scale
                        </span>
                        <span className="text-center text-lg">
                          {props.scale}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-center text-sm opacity-50">
                          Seed
                        </span>
                        <span className="text-center text-lg">
                          {props.seed}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-center text-sm opacity-50">
                          Sampler
                        </span>
                        <span className="text-center text-lg">
                          {props.sampler}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-center text-sm opacity-50">
                          Strength
                        </span>
                        <span className="text-center text-lg">
                          {props.strength}
                        </span>
                      </div>
                    </Card>
                  </div>
                )}
                {props.otherGenerationParams && (
                  <div>
                    <p className="text-md">{"Other"}</p>
                    <Card className="m-0 max-h-32 overflow-y-auto whitespace-pre-wrap p-2">
                      {props.otherGenerationParams}
                    </Card>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
