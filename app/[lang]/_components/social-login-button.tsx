import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { captureException } from "@sentry/nextjs"
import { AuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { ReactElement } from "react"
import { toast } from "sonner"

type Props = {
  disabled: boolean
  provider: AuthProvider
  buttonText?: string | null
  icon?: ReactElement
}

/**
 * ソーシャルログインボタン
 * Googleでログインするなど
 * @param props
 * @returns
 */
export const SocialLoginButton = (props: Props) => {
  const onLogin = async () => {
    if (props.disabled) return

    try {
      await signInWithPopup(getAuth(), props.provider)
    } catch (error) {
      captureException(error)
      if (error instanceof Error) {
        toast("アカウントが見つかりませんでした")
      }
    }
  }

  return (
    <Button
      className="w-full flex items-center justify-center"
      onClick={onLogin}
      disabled={props.disabled}
    >
      {props.disabled ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        props.icon
      )}
      {props.buttonText}
    </Button>
  )
}