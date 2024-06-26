import { Switch } from "@/_components/ui/switch"
import type { ImageModelQuery } from "@/_graphql/__generated__/graphql"

type Props = {
  imageModel: ImageModelQuery["imageModel"]
}

export const ModelHeader = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="text-2xl">
          {`モデル「${props.imageModel.name}」で生成された作品一覧`}
        </p>
      </div>
      <div className="flex">
        <p className="text-xs">{"R18作品モザイクあり"}</p>
        <Switch />
      </div>
      <div className="flex flex-col">
        <p className="text-xl">{"新着"}</p>
        <p
          className="text-xs"
          // color={"blue.400"}
        >
          {"もっと見る"}
        </p>
      </div>
    </div>
  )
}
