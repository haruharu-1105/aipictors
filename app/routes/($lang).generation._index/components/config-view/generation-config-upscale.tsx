import { CrossPlatformTooltip } from "~/components/cross-platform-tooltip"
import { Checkbox } from "~/components/ui/checkbox"
import { useGenerationContext } from "~/routes/($lang).generation._index/hooks/use-generation-context"

export function GenerationConfigUpscale() {
  const context = useGenerationContext()

  return (
    <>
      <div className="flex gap-x-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="upscale-size-check"
            checked={context.config.upscaleSize === 2}
            onCheckedChange={() => {
              context.changeUpscaleSize(
                context.config.upscaleSize === 2 ? null : 2,
              )
            }}
          />
          <label
            htmlFor="upscale-size-check"
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            高解像度で生成する
          </label>
        </div>
        <CrossPlatformTooltip
          text={"通常の2倍の高解像度で生成できます、2枚分の消費になります。"}
        />
      </div>
    </>
  )
}
