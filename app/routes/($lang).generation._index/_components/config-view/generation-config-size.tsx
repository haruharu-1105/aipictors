import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select"

type Props = {
  modelType: string
  value: string
  onChange(value: string): void
}

export const GenerationConfigSize = (props: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      <span className="font-bold text-sm">{"サイズ"}</span>
      <Select value={props.value} onValueChange={props.onChange}>
        <SelectGroup>
          <SelectTrigger className="break-all text-start">
            <SelectValue placeholder="サイズ" />
          </SelectTrigger>
          <SelectContent>
            {props.modelType === "SD1" && (
              <SelectItem value={"SD1_512_512"}>
                {"【正方形】768x768(upscale:1.5)"}
              </SelectItem>
            )}
            {props.modelType === "SD1" && (
              <SelectItem value={"SD1_512_768"}>
                {"【縦長】768x1152(upscale:1.5)"}
              </SelectItem>
            )}
            {props.modelType === "SD1" && (
              <SelectItem value={"SD1_768_512"}>
                {"【横長】1152x768(upscale:1.5)"}
              </SelectItem>
            )}
            {props.modelType === "SD2" && (
              <SelectItem value={"SD2_768_768"}>
                {"【正方形】768×768"}
              </SelectItem>
            )}
            {props.modelType === "SD2" && (
              <SelectItem value={"SD2_768_1200"}>
                {"【縦長】768×1200"}
              </SelectItem>
            )}
            {props.modelType === "SD2" && (
              <SelectItem value={"SD2_1200_768"}>
                {"【横長】1200×768"}
              </SelectItem>
            )}
            {props.modelType === "SD1" && (
              <SelectItem value={"SD1_384_960"}>
                {"【超縦長】576x1440(upscale:1.5)"}
              </SelectItem>
            )}
            {props.modelType === "SD1" && (
              <SelectItem value={"SD1_960_384"}>
                {"【超横長】1440x576(upscale:1.5)"}
              </SelectItem>
            )}
            {props.modelType === "SDXL" && (
              <SelectItem value={"SD3_1024_1024"}>
                {"【正方形】1024x1024"}
              </SelectItem>
            )}
            {props.modelType === "SDXL" && (
              <SelectItem value={"SD3_832_1216"}>
                {"【縦長】832x1216"}
              </SelectItem>
            )}
            {props.modelType === "SDXL" && (
              <SelectItem value={"SD3_1216_832"}>
                {"【横長】1216x832"}
              </SelectItem>
            )}
            {props.modelType === "SDXL" && (
              <SelectItem value={"SD3_640_1536"}>
                {"【超縦長】640x1536"}
              </SelectItem>
            )}
            {props.modelType === "SDXL" && (
              <SelectItem value={"SD3_1536_640"}>
                {"【超横長】1536x640"}
              </SelectItem>
            )}
          </SelectContent>
        </SelectGroup>
      </Select>
    </div>
  )
}
