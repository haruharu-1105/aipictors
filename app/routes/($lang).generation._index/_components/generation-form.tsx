import { loginWithWordPressTokenMutation } from "@/_graphql/mutations/login-with-wordpress-token"
import { GenerationAdvertisementView } from "@/routes/($lang).generation._index/_components/advertisement-view/generation-advertisement-view"
import { GenerationConfigView } from "@/routes/($lang).generation._index/_components/config-view/generation-config-view"
import { GenerationSideTabsView } from "@/routes/($lang).generation._index/_components/generation-side-tabs-view/generation-side-tabs-view"
import { GenerationAsideView } from "@/routes/($lang).generation._index/_components/generation-view/generation-aside-view"
import { GenerationHeaderView } from "@/routes/($lang).generation._index/_components/generation-view/generation-header-view"
import { GenerationMainView } from "@/routes/($lang).generation._index/_components/generation-view/generation-main-view"
import { GenerationView } from "@/routes/($lang).generation._index/_components/generation-view/generation-view"
import { GenerationNegativePromptView } from "@/routes/($lang).generation._index/_components/negative-prompt-view/generation-negative-prompt-view"
import { GenerationPromptView } from "@/routes/($lang).generation._index/_components/prompt-view/generation-prompt-view"
import { GenerationSubmissionView } from "@/routes/($lang).generation._index/_components/submission-view/generation-submit-view"
import { GenerationCommunicationView } from "@/routes/($lang).generation._index/_components/task-view/generation-communication-view"
import { GenerationTaskContentPreview } from "@/routes/($lang).generation._index/_components/task-view/generation-task-content-preview"
import { GenerationTaskDetailsView } from "@/routes/($lang).generation._index/_components/task-view/generation-task-details-view"
import { GenerationTaskListView } from "@/routes/($lang).generation._index/_components/task-view/generation-task-list-view"
import { GenerationWorkContentPreview } from "@/routes/($lang).generation._index/_components/task-view/generation-work-content-preview"
import { GenerationWorkListModelView } from "@/routes/($lang).generation._index/_components/task-view/generation-works-from-model-view"
import { useMutation } from "@apollo/client/index.js"
import { useState } from "react"

type Props = {
  termsMarkdownText: string
}

/**
 * 画像生成
 * @returns
 */
export const GenerationForm = (props: Props) => {
  const [rating, setRating] = useState(-1)

  const [protect, setProtect] = useState(-1)

  const [isEditMode, toggleEditMode] = useState(false)

  const [isPreviewMode, togglePreviewMode] = useState(false)

  const [mutation, { loading: isLoading }] = useMutation(
    loginWithWordPressTokenMutation,
  )

  return (
    <GenerationView
      header={
        <GenerationHeaderView
          submission={
            <GenerationSubmissionView termsText={props.termsMarkdownText} />
          }
        />
      }
      main={
        <GenerationMainView
          config={<GenerationConfigView />}
          promptEditor={<GenerationPromptView />}
          negativePromptEditor={<GenerationNegativePromptView />}
          taskContentPreview={<GenerationTaskContentPreview />}
          taskDetails={<GenerationTaskDetailsView />}
          workContentPreview={<GenerationWorkContentPreview />}
        />
      }
      asideHeader={<GenerationSideTabsView />}
      aside={
        <GenerationAsideView
          advertisement={<GenerationAdvertisementView />}
          taskList={
            <GenerationTaskListView
              rating={rating}
              protect={protect}
              isEditMode={isEditMode}
              isPreviewMode={isPreviewMode}
              setRating={setRating}
              setProtect={setProtect}
              toggleEditMode={toggleEditMode}
              togglePreviewMode={togglePreviewMode}
            />
          }
          taskDetails={<GenerationTaskDetailsView />}
          workListFromModel={<GenerationWorkListModelView />}
          communication={<GenerationCommunicationView />}
        />
      }
    />
  )
}