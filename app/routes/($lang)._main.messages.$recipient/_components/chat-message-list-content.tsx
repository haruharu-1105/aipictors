import { messageThreadMessagesQuery } from "@/_graphql/queries/message/message-thread-messages"
import { SupportMessageList } from "@/routes/($lang)._main.support.chat/_components/support-message-list"
import { useSuspenseQuery } from "@apollo/client/index"
import { startTransition } from "react"
import { useInterval } from "usehooks-ts"

type Props = {
  recipientId: string
}

/**
 * @param props
 * @returns
 */
export function ChatMessageListContent(props: Props) {
  const { data, refetch } = useSuspenseQuery(messageThreadMessagesQuery, {
    variables: {
      threadId: props.recipientId,
      limit: 124,
      offset: 0,
    },
  })

  useInterval(() => {
    startTransition(() => {
      refetch()
    })
  }, 4000)

  const messages = data?.viewer?.messageThread?.messages ?? []

  return (
    <SupportMessageList
      messages={messages}
      recipientIconImageURL={
        data?.viewer?.messageThread?.recipient.iconImage?.downloadURL ?? ""
      }
    />
  )
}
