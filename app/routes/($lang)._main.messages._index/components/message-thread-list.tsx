import { IconUrl } from "~/components/icon-url"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"
import { messageThreadFieldsFragment } from "~/graphql/fragments/message-thread-fields"
import { toDateTimeText } from "~/utils/to-date-time-text"
import { useSuspenseQuery } from "@apollo/client/index"
import { Link } from "@remix-run/react"
import { graphql } from "gql.tada"
import { startTransition } from "react"
import { useInterval } from "usehooks-ts"

export const MessageThreadList = () => {
  const { data: threads, refetch } = useSuspenseQuery(
    viewerMessageThreadsQuery,
    {
      variables: {
        limit: 124,
        offset: 0,
      },
    },
  )

  useInterval(() => {
    startTransition(() => {
      refetch()
    })
  }, 4000)

  const messageThreads = threads.viewer?.messageThreads ?? []

  return (
    <aside className="sticky h-main w-80 min-w-80 pb-4 pl-4">
      <ScrollArea type="always" className="h-full">
        <div className="w-full space-y-2">
          {messageThreads.map((messageThread) => (
            <Link
              key={messageThread.id}
              className="block"
              to={`/messages/${messageThread.id}`}
            >
              <Button
                className="flex h-auto flex-col gap-y-2 overflow-hidden p-4"
                variant={"secondary"}
              >
                <div className="flex w-full items-center gap-x-4">
                  <Avatar>
                    <AvatarImage
                      src={IconUrl(messageThread.recipient.iconUrl)}
                    />
                    <AvatarFallback />
                  </Avatar>
                  <span className="whitespace-pre-wrap break-words">
                    {messageThread.recipient.name}
                  </span>
                </div>
                <div className="flex w-full flex-col items-start gap-y-2">
                  <p className="overflow-hidden overflow-ellipsis whitespace-pre-wrap break-words text-left">
                    {messageThread.latestMessage.text}
                  </p>
                  <p>{toDateTimeText(messageThread.latestMessage.createdAt)}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}

const viewerMessageThreadsQuery = graphql(
  `query ViewerMessageThreads($offset: Int!, $limit: Int!) {
    viewer {
      id
      messageThreads(offset: $offset, limit: $limit) {
        ...MessageThreadFields
      }
    }
  }`,
  [messageThreadFieldsFragment],
)