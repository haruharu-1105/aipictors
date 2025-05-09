import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Loader2Icon, StampIcon } from "lucide-react"
import { useContext, useState } from "react"
import { useMutation, useQuery } from "@apollo/client/index"
import { toast } from "sonner"
import { useBoolean } from "usehooks-ts"
import { AutoResizeTextarea } from "~/components/auto-resize-textarea"
import { graphql } from "gql.tada"
import { AuthContext } from "~/contexts/auth-context"
import { StickerDialog } from "~/routes/($lang)._main.posts.$post._index/components/sticker-dialog"
import { withIconUrlFallback } from "~/utils/with-icon-url-fallback"
import { useTranslation } from "~/hooks/use-translation"

type Props = {
  targetCommentId: string
  iconUrl: string
  onReplyCompleted: (
    id: string,
    text: string,
    stickerId: string,
    stickerImageURL: string,
  ) => void
}

/**
 * 返信コメント入力欄
 */
export function ReplyCommentInput(props: Props) {
  const { value: isOpen, setTrue: onOpen, setFalse: onClose } = useBoolean()

  const t = useTranslation()

  const [createReplyComment, { loading: isCreatingReplyComment }] = useMutation(
    createResponseCommentMutation,
  )

  const [comment, setComment] = useState("")

  const sendComment = async (
    text: string,
    targetCommentId: string,
    stickerId?: string,
    stickerImageURL?: string,
  ) => {
    try {
      if (props.targetCommentId !== undefined) {
        const commentRes = await createReplyComment({
          variables: {
            input: {
              commentId: targetCommentId,
              text: text,
              stickerId: stickerId,
            },
          },
        })

        setComment("")

        props.onReplyCompleted(
          commentRes.data?.createResponseComment.id ?? "",
          comment,
          stickerId ?? "",
          stickerImageURL ?? "",
        )
      }
    } catch (e) {
      // toast(
      //   t("送信に失敗しました。同じコメントを何度も送信しようとしているか、通信エラーが発生しています。", "Failed to send. Please try again or check your connection.")
      // )
    }
  }

  const onComment = async () => {
    const inputComment = comment.trim()

    if (inputComment === "") {
      toast(t("コメントを入力してください", "Please enter a comment"))
      return
    }

    sendComment(inputComment, props.targetCommentId)
  }

  const authContext = useContext(AuthContext)

  const { data = null } = useQuery(viewerUserQuery, {
    skip: authContext.isLoading,
  })

  const iconUrl = data?.viewer?.user?.iconUrl ?? ""

  return (
    <>
      <div className="flex w-full items-center space-x-4 pl-16">
        <Avatar>
          <AvatarImage src={withIconUrlFallback(iconUrl)} alt="" />
          <AvatarFallback />
        </Avatar>
        <AutoResizeTextarea
          onChange={(event) => {
            setComment(event.target.value)
          }}
          placeholder={t("コメントする", "Add a comment")}
          disabled={!authContext.isLoggedIn}
        />
        <div>
          <Button
            disabled={!authContext.isLoggedIn}
            variant={"secondary"}
            size={"icon"}
            onClick={onOpen}
          >
            <StampIcon className="w-16" />
          </Button>
        </div>
        {isCreatingReplyComment ? (
          <Button onClick={() => {}}>
            <Loader2Icon className={"w-16 animate-spin"} />
          </Button>
        ) : (
          <Button
            disabled={!authContext.isLoggedIn}
            variant={"secondary"}
            onClick={onComment}
          >
            {t("送信", "Send")}
          </Button>
        )}
      </div>
      <StickerDialog
        isOpen={isOpen}
        onClose={onClose}
        onSend={async (stickerId: string, stickerImageURL: string) => {
          await sendComment(
            comment,
            props.targetCommentId,
            stickerId,
            stickerImageURL,
          )

          setComment("")

          onClose()
        }}
      />
    </>
  )
}

const createResponseCommentMutation = graphql(
  `mutation CreateResponseComment($input: CreateResponseCommentInput!) {
    createResponseComment(input: $input) {
      id
    }
  }`,
)

const viewerUserQuery = graphql(
  `query ViewerUser {
    viewer {
      id
      user {
        id
        iconUrl
      }
    }
  }`,
)
