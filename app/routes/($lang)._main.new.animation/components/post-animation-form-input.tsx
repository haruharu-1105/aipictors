import { useEffect, type Dispatch } from "react"
import { PostFormItemModel } from "~/routes/($lang)._main.new.image/components/post-form-item-model"
import { PostFormItemRating } from "~/routes/($lang)._main.new.image/components/post-form-item-rating"
import { PostFormItemTaste } from "~/routes/($lang)._main.new.image/components/post-form-item-taste"
import { PostFormItemTitle } from "~/routes/($lang)._main.new.image/components/post-form-item-title"
import { useQuery } from "@apollo/client/index"
import { PostFormItemTheme } from "~/routes/($lang)._main.new.image/components/post-form-item-theme"
import { Loader2Icon } from "lucide-react"
import { PostFormItemCaption } from "~/routes/($lang)._main.new.image/components/post-form-item-caption"
import { PostFormItemView } from "~/routes/($lang)._main.new.image/components/post-form-item-view"
import { PostFormItemDate } from "~/routes/($lang)._main.new.image/components/post-form-item-date"
import { PostFormItemTags } from "~/routes/($lang)._main.new.image/components/post-form-item-tags"
import { PostFormItemEvent } from "~/routes/($lang)._main.new.image/components/post-form-item-event"
import { PostFormItemRelatedLink } from "~/routes/($lang)._main.new.image/components/post-form-item-related-link"
import { PostFormItemAlbum } from "~/routes/($lang)._main.new.image/components/post-form-item-album"
import { PostFormItemAdvertising } from "~/routes/($lang)._main.new.image/components/post-form-item-advertising"
import { aiModelFieldsFragment } from "~/graphql/fragments/ai-model-fields"
import type { partialAlbumFieldsFragment } from "~/graphql/fragments/partial-album-fields"
import { partialTagFieldsFragment } from "~/graphql/fragments/partial-tag-fields"
import { partialWorkFieldsFragment } from "~/graphql/fragments/partial-work-fields"
import type { passFieldsFragment } from "~/graphql/fragments/pass-fields"
import { type FragmentOf, graphql } from "gql.tada"
import { PostFormPermissionSetting } from "~/routes/($lang)._main.new.image/components/post-form-permission-setting"
import { PostFormItemEnglish } from "~/routes/($lang)._main.new.image/components/post-form-item-english"
import type { PostAnimationFormInputAction } from "~/routes/($lang)._main.new.animation/reducers/actions/post-animation-form-input-action"
import type { PostAnimationFormInputState } from "~/routes/($lang)._main.new.animation/reducers/states/post-animation-form-input-state"

type Props = {
  dispatch: Dispatch<PostAnimationFormInputAction>
  state: PostAnimationFormInputState
  albums: FragmentOf<typeof partialAlbumFieldsFragment>[]
  currentPass: FragmentOf<typeof passFieldsFragment> | null
  eventInputHidden?: boolean
  setDisabledSubmit?: (value: boolean) => void
}

export function PostAnimationFormInput(props: Props) {
  const { data, loading } = useQuery(pageQuery, {
    variables: {
      isSensitive:
        props.state.ratingRestriction === "R18" ||
        props.state.ratingRestriction === "R18G",
      startAt: new Date().toISOString().split("T")[0],
      year: props.state.date.getFullYear(),
      month: props.state.date.getMonth() + 1,
      day: props.state.date.getDate(),
    },
  })

  useEffect(() => {
    if (props.setDisabledSubmit) {
      props.setDisabledSubmit(loading)
    }
  }, [loading])

  const onChangeTheme = (value: boolean) => {
    if (data === undefined) {
      throw new Error("theme is undefined")
    }
    if (data.dailyTheme === null) {
      throw new Error("theme.dailyTheme is null")
    }
    if (value === false) {
      props.dispatch({
        type: "SET_THEME_ID",
        payload: {
          themeId: null,
          themeTitle: data.dailyTheme.title,
        },
      })
      return
    }
    props.dispatch({
      type: "SET_THEME_ID",
      payload: {
        themeId: data.dailyTheme.id,
        themeTitle: data.dailyTheme.title,
      },
    })
  }

  /**
   * 選択可能なタグ
   */
  const tagOptions = () => {
    if (data?.whiteListTags === undefined) {
      return []
    }
    const tags = data.whiteListTags.filter((tag) => {
      return !props.state.tags.map((t) => t.text).includes(tag.name)
    })
    return tags.map((tag) => {
      return {
        id: tag.id,
        text: tag.name,
      }
    })
  }

  const albumOptions = () => {
    return props.albums.map((album) => {
      return {
        id: album.id,
        name: album.title,
      }
    })
  }

  const aiModelOptions = () => {
    if (data === undefined) {
      return []
    }
    return data.aiModels
      .filter((model) => model.workModelId !== null)
      .map((model) => {
        return {
          id: model.workModelId as string,
          name: model.name,
        }
      })
  }

  return (
    <div className="space-y-4">
      <PostFormItemTitle
        onChange={(title) => {
          props.dispatch({ type: "SET_TITLE", payload: title })
        }}
        value={props.state.title}
      />
      <PostFormItemCaption
        setCaption={(caption) => {
          props.dispatch({ type: "SET_CAPTION", payload: caption })
        }}
        caption={props.state.caption}
      />
      <PostFormItemEnglish
        onChangeTitle={(title) => {
          props.dispatch({ type: "SET_EN_TITLE", payload: title })
        }}
        onChangeCaption={(caption) => {
          props.dispatch({ type: "SET_EN_CAPTION", payload: caption })
        }}
        title={props.state.enTitle}
        caption={props.state.enCaption}
      />
      <PostFormItemRating
        setRating={(value) => {
          props.dispatch({ type: "SET_RATING_RESTRICTION", payload: value })
        }}
        rating={props.state.ratingRestriction}
      />
      <PostFormItemView
        accessType={props.state.accessType}
        setAccessType={(accessType) => {
          props.dispatch({ type: "SET_ACCESS_TYPE", payload: accessType })
        }}
      />
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex-1">
          <PostFormItemTaste
            imageStyle={props.state.animationStyle}
            setImageStyle={(imageStyle) => {
              props.dispatch({
                type: "SET_ANIMATION_STYLE",
                payload: imageStyle,
              })
            }}
          />
        </div>
        <div className="flex-1">
          <PostFormItemModel
            model={props.state.aiModelId}
            models={aiModelOptions()}
            setModel={(model) => {
              props.dispatch({ type: "SET_AI_MODEL_ID", payload: model })
            }}
          />
        </div>
      </div>
      <PostFormItemDate
        date={props.state.reservationDate}
        time={props.state.reservationTime}
        setDate={(value) => {
          props.dispatch({ type: "SET_RESERVATION_DATE", payload: value })
        }}
        setTime={(time) => {
          props.dispatch({ type: "SET_RESERVATION_TIME", payload: time })
        }}
      />
      {data?.dailyTheme &&
        (!props.state.reservationDate ||
          (props.state.reservationDate &&
            new Date(props.state.reservationDate) <
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))) && (
          <PostFormItemTheme
            title={data?.dailyTheme?.title}
            isLoading={loading}
            onChange={onChangeTheme}
          />
        )}
      {data && 0 < data?.appEvents.length && !props.eventInputHidden && (
        <PostFormItemEvent
          eventName={data?.appEvents[0]?.title ?? null}
          eventDescription={data?.appEvents[0]?.description ?? null}
          eventTag={data?.appEvents[0]?.tag ?? null}
          endAt={data?.appEvents[0]?.endAt ?? 0}
          slug={data?.appEvents[0]?.slug ?? null}
          addTag={(tag) => {
            props.dispatch({ type: "ADD_TAG", payload: tag })
          }}
          removeTag={(tag) => {
            props.dispatch({ type: "REMOVE_TAG", payload: tag.id })
          }}
          isAttending={props.state.tags.some(
            (tag) => tag.text === data?.appEvents[0]?.tag,
          )}
        />
      )}
      <PostFormItemTags
        whiteListTags={tagOptions()}
        tags={props.state.tags}
        recommendedTags={[]}
        onAddTag={(tag) => {
          props.dispatch({ type: "ADD_TAG", payload: tag })
        }}
        onRemoveTag={(tag) => {
          props.dispatch({ type: "REMOVE_TAG", payload: tag.id })
        }}
      />
      {loading && <Loader2Icon className="h-4 w-4 animate-spin" />}
      <PostFormPermissionSetting
        isTagEditableChecked={props.state.useTagFeature}
        onTagEditableChange={(value) => {
          props.dispatch({ type: "ENABLE_TAG_FEATURE", payload: value })
        }}
        isCommentsEditableChecked={props.state.useCommentFeature}
        onCommentsEditableChange={(value) => {
          props.dispatch({ type: "ENABLE_COMMENT_FEATURE", payload: value })
        }}
      />
      {props.albums.length !== 0 && (
        <PostFormItemAlbum
          album={props.state.albumId}
          albums={albumOptions()}
          setAlbumId={(albumId) => {
            props.dispatch({ type: "SET_ALBUM_ID", payload: albumId })
          }}
        />
      )}
      <PostFormItemRelatedLink
        link={props.state.link}
        onChange={(link) => {
          props.dispatch({ type: "SET_LINK", payload: link })
        }}
      />
      <PostFormItemAdvertising
        isSubscribed={
          props.currentPass?.type === "STANDARD" ||
          props.currentPass?.type === "PREMIUM"
        }
        isChecked={props.state.usePromotionFeature}
        onChange={(isAd) => {
          props.dispatch({ type: "ENABLE_PROMOTION_FEATURE", payload: isAd })
        }}
      />
    </div>
  )
}

const pageQuery = graphql(
  `query PageQuery(
    $isSensitive: Boolean!
    $startAt: String!
    $year: Int,
    $month: Int,
    $day: Int,
  ) {
    aiModels(offset: 0, limit: 124, where: {}) {
      ...AiModelFields
    }
    appEvents(
      limit: 1,
      offset: 0,
      where: {
        startAt: $startAt,
      }
    ) {
      id
      description
      title
      slug
      thumbnailImageUrl
      headerImageUrl
      startAt
      endAt
      tag
    }
    whiteListTags(
      where: {
        isSensitive: $isSensitive
      }
    ) {
      ...PartialTagFields
    }
    dailyTheme(year: $year, month: $month, day: $day) {
      id
      title
      dateText
      year
      month
      day
      worksCount,
      works(offset: 0, limit: 1) {
        ...PartialWorkFields
      }
    }
  }`,
  [partialWorkFieldsFragment, aiModelFieldsFragment, partialTagFieldsFragment],
)