"use client"

import { StarRating } from "@/app/[lang]/generation/_components/star-rating"
import { GenerationMenuButton } from "@/app/[lang]/generation/tasks/[task]/_components/generation-menu-button"
import { InProgressImageGenerationTaskResult } from "@/app/[lang]/generation/tasks/[task]/_components/in-progress-image-generation-task-result"
import { GenerationParameters } from "@/app/[lang]/generation/tasks/[task]/_types/generation-parameters"
import {
  GenerationSize,
  parseGenerationSize,
} from "@/app/[lang]/generation/tasks/[task]/_types/generation-size"
import { PrivateImage } from "@/app/_components/private-image"
import { AuthContext } from "@/app/_contexts/auth-context"
import { AppConfirmDialog } from "@/components/app/app-confirm-dialog"
import { AppLoading } from "@/components/app/app-loading"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { deleteImageGenerationTaskMutation } from "@/graphql/mutations/delete-image-generation-task"
import { updateRatingImageGenerationTaskMutation } from "@/graphql/mutations/update-rating-image-generation-task"
import { imageGenerationTaskQuery } from "@/graphql/queries/image-generation/image-generation-task"
import { skipToken, useMutation, useSuspenseQuery } from "@apollo/client"
import {
  ArrowDownToLine,
  ArrowUpRightSquare,
  ClipboardCopy,
  Pencil,
  Trash2,
} from "lucide-react"
import { startTransition, useContext, useState } from "react"
import { toast } from "sonner"
import { useInterval } from "usehooks-ts"
import { CopyButton } from "./copy-button"
type Props = {
  taskId: string
  onRestore?: (taskId: string) => void
}

/**
 * 生成情報をクリップボードにコピーする
 * @param generationParameters
 */
export const copyGeneration = (generationParameters: GenerationParameters) => {
  const text = `${generationParameters.prompt}\nNegative prompt:${generationParameters.negativePrompt},\nSteps:${generationParameters.steps}, Size:${generationParameters.width}x${generationParameters.height}, Seed:${generationParameters.seed}, Model:${generationParameters.modelName}, Sampler:${generationParameters.sampler}, CFG scale:${generationParameters.scale}`

  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast("クリップボードにコピーされました")
    })
    .catch((err) => {
      console.error("クリップボードへのコピーに失敗しました:", err)
    })
}

/**
 * 生成履歴の画像を保存する
 * @param taskId
 * @returns
 */
export const saveGenerationImage = (taskId: string) => {
  const imageElement = document.querySelector(
    `.generation-image-${taskId}`,
  ) as HTMLImageElement
  if (!imageElement) {
    return
  }
  const imageUrl = imageElement.src
  const link = document.createElement("a")
  link.href = imageUrl
  link.download = `${taskId}.png`
  link.click()
}

/**
 * 生成履歴から生成情報を保持して投稿画面に遷移する
 */
export const postGenerationImage = async (
  generationParameters: GenerationParameters,
  taskId: string,
) => {
  async function getBase64ImageFromUrl(url: string) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open("GET", url, true)
      xhr.responseType = "blob"

      xhr.onload = () => {
        if (xhr.status === 200) {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result)
          }
          reader.readAsDataURL(xhr.response)
        } else {
          reject(new Error("Failed to load image."))
        }
      }

      xhr.onerror = () => {
        reject(new Error("Failed to load image."))
      }

      xhr.send()
    })
  }

  const imageElement = document.querySelector(
    `.generation-image-${taskId}`,
  ) as HTMLImageElement
  console.log(imageElement)
  if (!imageElement) {
    return
  }
  const imageUrl = imageElement.src
  // 画像をbase64に変換してローカルストレージに保存
  localStorage.clear()
  const base64Image: string = (await getBase64ImageFromUrl(imageUrl)) as string
  localStorage.setItem("post-image-temp", base64Image)

  // その他の情報をオブジェクトにまとめてJSON形式でローカルストレージに保存
  const postData = {
    model: generationParameters.modelName,
    vae: generationParameters.vae,
    prompts: generationParameters.prompt,
    negativePrompts: generationParameters.negativePrompt,
    seed: generationParameters.seed,
    steps: generationParameters.steps,
    scale: generationParameters.scale,
    sampler: generationParameters.sampler,
    width: generationParameters.width,
    height: generationParameters.height,
    type: "image",
  }
  const postDataJson = JSON.stringify(postData)
  localStorage.setItem("post-data-temp", postDataJson)

  window.location.href = "https://www.aipictors.com/post"
}

/**
 * use Dynamic Import
 * @param props
 * @returns
 */
export function GenerationTaskView(props: Props) {
  const [mutation] = useMutation(updateRatingImageGenerationTaskMutation)

  const onChangeRating = async (taskId: string, rating: number) => {
    try {
      await mutation({
        variables: {
          input: {
            id: taskId,
            rating: rating,
          },
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message)
      }
    }
  }

  const authContext = useContext(AuthContext)

  const { data, error, refetch } = useSuspenseQuery(
    imageGenerationTaskQuery,
    authContext.isLoggedIn
      ? {
          variables: {
            id: props.taskId,
          },
        }
      : skipToken,
  )

  useInterval(() => {
    startTransition(() => {
      refetch()
    })
  }, 4000)

  const [rating, setRating] = useState(data?.imageGenerationTask.rating ?? 0)

  const onReference = () => {
    if (props.onRestore !== undefined) {
      props.onRestore(props.taskId)
    } else {
      window.location.href = `/generation/?ref=${props.taskId}`
    }
  }

  const onPost = () => {
    window.location.href = `https://www.aipictors.com/post?generation=${props.taskId}`
  }

  const [deleteTask] = useMutation(deleteImageGenerationTaskMutation)

  const onDelete = async () => {
    await deleteTask({
      variables: {
        input: {
          id: props.taskId,
        },
      },
    })
    refetch()
  }

  if (!data) {
    return (
      <div>
        <>
          <AppLoading />
        </>
      </div>
    )
  }

  if (
    data.imageGenerationTask == null ||
    data.imageGenerationTask.token == null
  ) {
    return <div>{"画像が見つかりませんでした"}</div>
  }

  if (data?.imageGenerationTask.status === "CANCELED") {
    return <p className="mb-1 font-semibold text-center">{"キャンセル済み"}</p>
  }

  if (data?.imageGenerationTask.status === "ERROR") {
    return <p className="mb-1 font-semibold text-center">{"生成エラー"}</p>
  }

  // if (error) return <div>{"エラーが発生しました"}</div>

  const generationSize: GenerationSize = parseGenerationSize(
    data.imageGenerationTask.sizeType,
  )

  const GenerationParameters: GenerationParameters = {
    prompt: data.imageGenerationTask.prompt,
    vae: data.imageGenerationTask.vae ?? "",
    negativePrompt: data.imageGenerationTask.negativePrompt,
    seed: data.imageGenerationTask.seed,
    steps: data.imageGenerationTask.steps,
    scale: data.imageGenerationTask.scale,
    sampler: data.imageGenerationTask.sampler,
    width: generationSize.width,
    height: generationSize.height,
    modelName: data.imageGenerationTask.model?.name ?? "",
  }

  if (data?.imageGenerationTask.status === "IN_PROGRESS") {
    return (
      <>
        <InProgressImageGenerationTaskResult />
      </>
    )
  }

  return (
    <ScrollArea className="px-4 py-4 w-full max-w-fit mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"}>
            <PrivateImage
              className={`max-h-screen m-auto generation-image-${props.taskId}`}
              taskId={data.imageGenerationTask.id}
              token={data.imageGenerationTask.token}
              alt={"-"}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className={"w-[auto] max-h-[96vh] max-w-[96vw]"}>
          <PrivateImage
            className={"h-[auto] max-h-[88vh] max-w-[88vw] m-auto"}
            taskId={data.imageGenerationTask.id}
            token={data.imageGenerationTask.token}
            alt={"-"}
          />
        </DialogContent>
      </Dialog>

      <div className="my-4 flex justify-end">
        <GenerationMenuButton
          title={"同じ情報で生成する"}
          onClick={onReference}
          text={"参照生成"}
          icon={ArrowUpRightSquare}
        />
        <GenerationMenuButton
          title={"投稿する"}
          onClick={onPost}
          text={"投稿"}
          icon={Pencil}
        />
        <GenerationMenuButton
          title={"生成情報をコピーする"}
          onClick={() => copyGeneration(GenerationParameters)}
          icon={ClipboardCopy}
        />
        <GenerationMenuButton
          title={"画像を保存する"}
          onClick={() => saveGenerationImage(props.taskId)}
          icon={ArrowDownToLine}
        />
        <AppConfirmDialog
          title={"確認"}
          description={"本当に削除しますか？"}
          onNext={() => {
            onDelete()
          }}
          onCancel={() => {}}
        >
          <GenerationMenuButton
            title={"生成履歴を削除する"}
            onClick={() => () => {}}
            icon={Trash2}
          />
        </AppConfirmDialog>
      </div>
      <StarRating
        value={rating ?? 0}
        onChange={(value) => {
          setRating(value)
          onChangeRating(props.taskId, value)
        }}
      />
      <div className="py-2">
        <Separator />
      </div>
      <div className="mb-1">
        <p className="mb-1 font-semibold">{"Size"}</p>
        <p>
          {generationSize.width}x{generationSize.height}
        </p>
      </div>
      <div className="py-2">
        <Separator />
      </div>
      <div className="mb-1">
        <p className="mb-1 font-semibold">{"Model"}</p>
        <p>{data.imageGenerationTask.model?.name}</p>
      </div>
      <div className="py-2">
        <Separator />
      </div>
      <p className="mb-1 font-semibold">{"prompt"}</p>
      <Textarea disabled={true}>{data.imageGenerationTask.prompt}</Textarea>
      <CopyButton className="mb-4" text={data.imageGenerationTask.prompt} />
      <div className="py-2">
        <Separator />
      </div>
      <p className="mb-1 font-semibold">{"NegativePrompt"}</p>
      <Textarea disabled={true}>
        {data.imageGenerationTask.negativePrompt}
      </Textarea>
      <CopyButton
        className="mb-4"
        text={data.imageGenerationTask.negativePrompt}
      />
      <div className="py-2">
        <Separator />
      </div>
      <div className="flex space-x-4">
        <div className="w-full">
          <p className="mb-1 font-semibold">{"Seed"}</p>
          <p>{data.imageGenerationTask.seed}</p>
        </div>
        <div className="w-full">
          <p className="mb-1 font-semibold">{"Sampler"}</p>
          <p>{data.imageGenerationTask.sampler}</p>
        </div>
        <div className="w-full">
          <p className="mb-1 font-semibold">{"Scale"}</p>
          <p>{data.imageGenerationTask.scale}</p>
        </div>
      </div>
    </ScrollArea>
  )
}