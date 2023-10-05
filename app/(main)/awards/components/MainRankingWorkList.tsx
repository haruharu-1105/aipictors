"use client"
import { SimpleGrid } from "@chakra-ui/react"
import type { WorkAwardsQuery } from "__generated__/apollo"
import { CardRanking } from "app/(main)/awards/components/CardRanking"

type Props = {
  awards: NonNullable<WorkAwardsQuery["workAwards"]>
}

export const MainRankingWorkList: React.FC<Props> = (props) => {
  return (
    <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing={2}>
      {props.awards.map((props) => {
        return (
          <CardRanking
            key={props.id}
            title={props.work.title}
            imageURL={props.work.thumbnailImage?.downloadURL ?? null}
          />
        )
      })}
    </SimpleGrid>
  )
}