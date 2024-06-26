import { AppPage } from "@/_components/app/app-page"
import { workAwardsQuery } from "@/_graphql/queries/award/work-awards"
import { createClient } from "@/_lib/client"
import { RankingHeader } from "@/routes/($lang)._main.awards._index/_components/ranking-header"
import { RankingWorkList } from "@/routes/($lang)._main.awards._index/_components/ranking-work-list"
import { useLoaderData } from "@remix-run/react"

export async function loader() {
  const client = createClient()

  const year = new Date().getFullYear()

  const month = new Date().getMonth() + 1

  const day = new Date().getDate()

  const workAwardsResp = await client.query({
    query: workAwardsQuery,
    variables: {
      offset: 0,
      limit: 16,
      where: {
        year: year,
        month: month,
        day: day,
      },
    },
  })

  return {
    year,
    month,
    day,
    workAwards: workAwardsResp,
  }
}

/**
 * ランキングの履歴
 * @returns
 */
export default function Awards() {
  const data = useLoaderData<typeof loader>()

  return (
    <AppPage>
      <RankingHeader year={data.year} month={data.month} day={data.day} />
      <RankingWorkList awards={data.workAwards.data.workAwards} />
    </AppPage>
  )
}
