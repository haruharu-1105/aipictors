import { Card, Stack, Button, Image, Text } from "@chakra-ui/react"

type Props = {
  onSelect(): void
  name: string
  imageURL: string | null
  isActive: boolean
}

export const ImageModelCard: React.FC<Props> = (props) => {
  return (
    <Card>
      <Stack>
        <Button
          p={0}
          h={"auto"}
          overflow={"hidden"}
          variant={"outline"}
          borderWidth={2}
          borderColor={props.isActive ? "primary.500" : "gray.200"}
          onClick={() => {
            props.onSelect()
          }}
        >
          <Image src={props.imageURL!} alt={props.name} />
        </Button>
        <Text>{props.name}</Text>
      </Stack>
    </Card>
  )
}