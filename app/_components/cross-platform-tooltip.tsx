import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { config } from "@/config"
import { HelpCircleIcon } from "lucide-react"
import Link from "next/link"
import { useMediaQuery } from "usehooks-ts"

type Props = {
  text: string
  detailLink?: string
}

/**
 * PCとスマホの両方で使えるツールチップ
 * @returns
 */
export const CrossPlatformTooltip = (props: Props) => {
  const isDesktop = useMediaQuery(config.mediaQuery.isDesktop)

  return (
    <>
      {isDesktop ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircleIcon className="w-4" />
            </TooltipTrigger>
            <TooltipContent className="font-size-md whitespace-pre-wrap">
              {props.text}
              {props.detailLink && (
                <Link href={props.detailLink}>{"(詳細)"}</Link>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <HelpCircleIcon className="w-4" />
          </PopoverTrigger>
          <PopoverContent className="font-size-md whitespace-pre-wrap">
            {props.text}
            {props.detailLink && (
              <Link href={props.detailLink}>{"(詳細)"}</Link>
            )}
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}