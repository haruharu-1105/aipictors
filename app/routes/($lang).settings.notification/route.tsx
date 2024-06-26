import { AppPageCenter } from "@/_components/app/app-page-center"
import { Separator } from "@/_components/ui/separator"
import { SettingFcmForm } from "@/routes/($lang).settings.notification/_components/setting-fcm-form"
import { SettingNotificationForm } from "@/routes/($lang).settings.notification/_components/setting-notification-form"

export default function SettingNotification() {
  return (
    <AppPageCenter>
      <div className="w-full space-y-8">
        <p className="font-bold text-2xl">{"通知・いいね"}</p>
        <SettingNotificationForm />
        <Separator />
        <SettingFcmForm />
      </div>
    </AppPageCenter>
  )
}
