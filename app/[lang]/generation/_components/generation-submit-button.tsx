import { Button } from "@/components/ui/button"

type Props = {
  isLoading: boolean
  isDisabled: boolean
  onClick(): void
}

export function GenerationSubmitButton(props: Props) {
  return (
    <Button
      onClick={props.onClick}
      className="w-full"
      size={"lg"}
      disabled={props.isLoading || props.isDisabled}
    >
      {"生成する"}
    </Button>
  )
}