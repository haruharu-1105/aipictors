import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/_components/ui/carousel"
import type { HotTagsQuery } from "@/_graphql/__generated__/graphql"
import { TagButton } from "@/routes/($lang)._main._index/_components/tag-button"
import Autoplay from "embla-carousel-autoplay"
import React from "react"

type Props = {
  hotTags: HotTagsQuery["hotTags"]
}

/**
 * ホーム上部に
 * @param props
 * @returns
 */
export const HomeTagList = (props: Props) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  )

  return (
    <Carousel
      opts={{ dragFree: true, loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {props.hotTags?.map((tag) => (
          <CarouselItem className="basis-auto" key={tag.id}>
            <TagButton name={tag.name} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
