import type { UserQuery } from "@/_graphql/__generated__/graphql"
import { config } from "@/config"
import { UserProfileAvatar } from "@/routes/($lang)._main.users.$user/_components/user-profile-avatar"
import { useMediaQuery } from "usehooks-ts"

type UserProfileProps = {
  user: NonNullable<UserQuery["user"]>
}

export const UserProfileNameIcon = (props: UserProfileProps) => {
  const isDesktop = useMediaQuery(config.mediaQuery.isDesktop)

  return (
    <header className="relative">
      <div
        // biome-ignore lint/nursery/useSortedClasses: <explanation>
        className={"absolute z-10 top-[160px] md:top-[228px]"}
      >
        <div className="mr-auto flex items-center gap-4 p-4 md:p-8">
          <UserProfileAvatar
            alt={props.user.name}
            src={props.user.iconImage?.downloadURL}
            size={isDesktop ? "lg" : "md"}
          />
          <div className="hidden md:block">
            <h1 className="font-bold text-2xl text-white">{props.user.name}</h1>
            <h2 className="font-bold text-sm text-white opacity-50">
              @{props.user.login}
            </h2>
            <div className="flex">
              <div className="w-32">
                <div className="white mt-4 font-bold text-xl">
                  {props.user.followersCount}
                </div>
                <div className="white mt-4 text-md opacity-50">
                  {"フォロワー"}
                </div>
              </div>
              <div className="w-32">
                <div className="white mt-4 font-bold text-xl">
                  {props.user.worksCount}
                </div>
                <div className="white mt-4 text-md opacity-50">{"いいね"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <h1 className="font-bold text-2xl">{props.user.name}</h1>
          <h2 className="font-bold text-sm opacity-50">@{props.user.login}</h2>
        </div>

        <div className="flex md:hidden">
          <div className="w-32">
            <div className="white mt-4 font-bold text-md">
              {props.user.followersCount}
            </div>
            <div className="white mt-1 text-sm opacity-50">{"フォロワー"}</div>
          </div>
          <div className="w-32">
            <div className="white mt-4 font-bold text-md">
              {props.user.worksCount}
            </div>
            <div className="white mt-1 text-sm opacity-50">{"いいね"}</div>
          </div>
        </div>
      </div>
    </header>
  )
}