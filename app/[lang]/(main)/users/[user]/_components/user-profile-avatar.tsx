import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type UserProfileAvatarProps = {
  alt: string
  src?: string
}

export const UserProfileAvatar = ({ alt, src }: UserProfileAvatarProps) => {
  return (
    <Avatar className="w-20 h-20 border-2">
      <AvatarImage alt={alt} src={src} />
      <AvatarFallback />
    </Avatar>
  )
}