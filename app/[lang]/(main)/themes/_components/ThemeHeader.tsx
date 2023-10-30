"use client"
import { HStack, Stack, Text } from "@chakra-ui/react"
import { ThemeCard } from "app/[lang]/(main)/themes/_components/ThemeCard"

export const ThemeHeader: React.FC = () => {
  return (
    <Stack>
      <Text fontSize={"lg"}>{"創作アイディアページ"}</Text>
      <Text fontSize={"sm"}>
        {
          "お題を毎日更新しています。AIイラストをテーマに沿って作成して投稿してみましょう。午前0時に更新されます。"
        }
      </Text>
      <Stack>
        <Text fontSize={"sm"}>{"今日のお題「」"}</Text>
        <Text fontSize={"sm"}>{"新着順"}</Text>
        <HStack>
          <ThemeCard />
          <ThemeCard />
          <ThemeCard />
          <ThemeCard />
        </HStack>
      </Stack>
    </Stack>
  )
}