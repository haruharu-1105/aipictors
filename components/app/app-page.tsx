import { AppPageCenter } from "@/components/app/app-page-center"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
  isCenter?: boolean
}

/**
 * デフォルトのページのレイアウト
 * @param props
 * @returns
 */
export const AppPage = (props: Props) => {
  if (props.isCenter) {
    return <AppPageCenter {...props} />
  }

  return (
    <main
      className={cn(
        "w-full md:max-w-page mx-auto pb-16 pt-2 md:pt-0",
        "space-y-8 md:space-y-8",
        "px-sm md:px-md",
        props.className,
      )}
    >
      {props.children}
    </main>
  )
}