"use client"
import { Divider, HStack, Image, Stack, Text, useToast } from "@chakra-ui/react"
import { useLoginWithPasswordMutation } from "__generated__/apollo"
import { LoginForm } from "app/_components/LoginForm"
import { MainCenterPage } from "app/_components/MainCenterPage"
import type { FormLogin } from "app/_types/formLogin"
import { getAuth, signInWithCustomToken } from "firebase/auth"

export const LoginPage: React.FC = () => {
  const [mutation, { loading: isLoading }] = useLoginWithPasswordMutation()

  const toast = useToast()

  const onLogin = async (form: FormLogin) => {
    try {
      const result = await mutation({
        variables: {
          input: {
            login: form.login,
            password: form.password,
          },
        },
      })
      const token = result.data?.loginWithPassword.token ?? null
      if (token === null) {
        toast({ status: "error", description: "ログインに失敗しました。" })
        return
      }
      await signInWithCustomToken(getAuth(), token)
      toast({ status: "success", description: "ログインしました。" })
    } catch (error) {
      if (error instanceof Error) {
        toast({ status: "error", description: error.message })
      }
    }
  }

  return (
    <MainCenterPage>
      <Stack
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        maxW={"sm"}
        spacing={6}
        pb={16}
      >
        <HStack justifyContent={"center"}>
          <Image alt={"Logo"} src={"/icon.png"} maxW={"4rem"} />
        </HStack>
        <LoginForm onSubmit={onLogin} isLoading={isLoading} />
        <Divider />
        <Text fontSize={"sm"}>
          {
            "現在、アプリでのログインはパスワード認証のみに対応しています。パスワードはサイトから設定または変更できます。"
          }
        </Text>
      </Stack>
    </MainCenterPage>
  )
}