"use client"
import { HStack, Text } from "@chakra-ui/react"
import { LoadingPage } from "app/_components/LoadingPage"
import { LoginPage } from "app/_components/LoginPage"
import { AppContext } from "app/_contexts/appContext"
import { useContext } from "react"

export const MainHome: React.FC = () => {
  const context = useContext(AppContext)

  if (context.isLoading) {
    return <LoadingPage />
  }

  if (context.isNotLoggedIn) {
    return <LoginPage />
  }

  return (
    <HStack justifyContent={"center"} py={16} minH={"100vh"}>
      <Text>{"ログイン済み"}</Text>
    </HStack>
  )
}