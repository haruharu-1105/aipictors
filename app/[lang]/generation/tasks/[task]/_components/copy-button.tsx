import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type Props = {
  text: string
  className?: string
  disabled?: boolean
}

export const CopyButton = (props: Props) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(props.text)
      .then(() => {
        toast("クリップボードにコピーされました")
      })
      .catch((err) => {
        console.error("クリップボードへのコピーに失敗しました:", err)
      })
  }

  return (
    <Button
      variant={"secondary"}
      disabled={props.disabled}
      size={"sm"}
      className={`${props.className} pad-16 whitespace-normal w-full`}
      onClick={copyToClipboard}
    >
      <p className="break-all text-left">コピー</p>
    </Button>
  )
}