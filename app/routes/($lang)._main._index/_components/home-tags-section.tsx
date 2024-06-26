import {} from "@/_components/ui/tooltip"
import type { WorkTag } from "@/routes/($lang)._main._index/_types/work-tag"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/_components/ui/carousel"
import React from "react"
import Autoplay from "embla-carousel-autoplay"

type Props = {
  title?: string
  tags: WorkTag[]
}

export const HomeTagsSection = (props: Props) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  )

  return (
    <>
      <h2 className="items-center space-x-2 font-bold text-2xl">
        {props.title}
      </h2>
      <Carousel
        opts={{ dragFree: true, loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {props.tags?.map((tag) => (
            <CarouselItem className="basis-auto" key={tag.name}>
              <a className="relative" href={`/tags/${tag.name}`}>
                <img
                  className="h-[240px] w-[196px] rounded-md bg-white object-cover object-center transition-opacity duration-200 ease-in-out"
                  src={tag.thumbnailUrl}
                  alt={tag.name}
                />
                <div className="absolute right-0 bottom-0 left-0 box-border flex h-40 flex-col justify-end bg-gradient-to-t from-black to-transparent p-4 pb-3">
                  <p className="text-white">{`#${tag.name}`}</p>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>

    // <section className="space-y-4">
    //   <div className="flex justify-between">
    //     {props.tags.map((tag) => (
    //       // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
    //       <div className="h-24 w-16">
    //         <img alt="" src={tag.thumbnailUrl} />
    //       </div>
    //     ))}
    //   </div>
    // </section>
  )
}
