type Props = {
  /**
   * 画像など
   */
  children: React.ReactNode
  className?: string
  size?: "default" | "sm" | "lg" | "icon" | null | undefined
  disabled?: boolean
  onClick(): void
}

/**
 * ボーダーが虹色のボタン
 * @param props
 * @returns
 */
export function GradientBorderButton(props: Props) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      // biome-ignore lint/nursery/useSortedClasses: <explanation>
      className={`flex font-medium hover:opacity-80 duration-200 rounded-md bg-gradient-to-tr from-pink-300 to-blue-300 p-1 dark:text-black ${props.className}`}
    >
      <div className="flex flex-1 justify-center rounded-md bg-white py-2">
        {props.children}
      </div>
    </button>
  )
}