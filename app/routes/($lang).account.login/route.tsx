import { AppPageCenter } from "@/_components/app/app-page-center"
import { AccountLoginForm } from "@/routes/($lang).account.login/_components/account-login-form"

export default function AccountLogin() {
  return (
    <AppPageCenter>
      <p className="font-bold text-2xl leading-none">ユーザID</p>
      <AccountLoginForm />
    </AppPageCenter>
  )
}
