import { Button } from "@/_components/ui/button"

type Props = {
  name: string
  onClick(): void
}

export const MutedTag = (props: Props) => {
  return (
    <div className="flex justify-between">
      <div>
        <p>{props.name}</p>
      </div>
      <Button className="p-4" onClick={props.onClick}>
        {"解除"}
      </Button>
    </div>
  )
}
