"use client"

import { InPaintingImageForm } from "@/app/[lang]/generation/_components/editor-submission-view/in-painting-image-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"

type Props = {
  isOpen: boolean
  onClose(): void
  taskId: string
  token: string
  userNanoid: string | null
  configSeed: number
  configSteps: number
  configSampler: string
  configScale: number
  configSizeType: string
  configModel: string | null
  configVae: string | null
  configClipSkip: number
}

/**
 * インペイントダイアログ
 * @param props
 * @returns
 */
export const InPaintingDialog = (props: Props) => {
  return (
    <Dialog onOpenChange={props.onClose} open={props.isOpen}>
      <DialogContent>
        <DialogHeader>一部修正</DialogHeader>
        <InPaintingImageForm
          taskId={props.taskId}
          token={props.token}
          userNanoid={props.userNanoid}
          configSeed={props.configSeed}
          configSteps={props.configSteps}
          configSampler={props.configSampler}
          configScale={props.configScale}
          configSizeType={props.configSizeType}
          configModel={props.configModel}
          configVae={props.configVae}
          configClipSkip={props.configClipSkip}
          onClose={props.onClose}
        />
        <DialogFooter>
          <Button
            onClick={() => {
              props.onClose()
            }}
          >
            {"Close"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}