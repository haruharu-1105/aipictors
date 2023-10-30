"use client"

import {
  Box,
  Button,
  Card,
  HStack,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from "@chakra-ui/react"
import { al } from "vitest/dist/reporters-5f784f42"

type Props = {
  negativePrompt: string
  setNegativePrompt(prompt: string): void
}

export const GenerationEditorNegative: React.FC<Props> = (props) => {
  return (
    <Card p={4} h={"100%"}>
      <Stack h={"100%"} spacing={4}>
        <HStack>
          <Text fontWeight={"bold"}>{"ネガティブ"}</Text>
          <Tooltip
            label="生成したくないイラストを英単語で書いてください。初期値は高品質なイラストの生成に役立つ値が入力されています。"
            fontSize="md"
          >
            <Button size={"xs"} borderRadius={"full"}>
              {"?"}
            </Button>
          </Tooltip>
        </HStack>
        <Box h={"100%"} flex={1}>
          <Stack spacing={2} h={"100%"}>
            <Textarea
              h={"100%"}
              placeholder={"プロンプト"}
              borderRadius={"md"}
              onChange={() => {}}
              defaultValue={"EasyNegativeなど"}
            />
            <HStack>
              <Button
                size={"xs"}
                borderRadius={"full"}
                onClick={() => {
                  alert("+bad-hands-5")
                }}
              >
                {"+bad-hands-5"}
              </Button>
              <Button
                size={"xs"}
                borderRadius={"full"}
                onClick={() => {
                  alert("+badhandv4")
                }}
              >
                {"+badhandv4"}
              </Button>
              <Button
                size={"xs"}
                borderRadius={"full"}
                onClick={() => {
                  alert("+bad_prompt_version2")
                }}
              >
                {"+bad_prompt_version2"}
              </Button>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Card>
  )
}