"use client"
import "@splidejs/react-splide/css"
import { Divider, HStack, useBreakpoint, useDisclosure } from "@chakra-ui/react"
import { FlexibleNavigation } from "app/[lang]/(main)/components/FlexibleNavigation"
import { HomeHeader } from "app/[lang]/(main)/components/HomeHeader"
import { HomeNavigationList } from "app/[lang]/(main)/components/HomeNavigationList"
import { LoginModal } from "app/[lang]/(main)/components/LoginModal"
import { LogoutModal } from "app/[lang]/(main)/components/LogoutModal"
import { HomeFooter } from "app/components/HomeFooter"

type Props = {
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = (props) => {
  const breakPoint = useBreakpoint()

  const {
    isOpen: isOpenNavigation,
    onClose: onCloseNavigation,
    onToggle: onToggleNavigation,
  } = useDisclosure({
    defaultIsOpen:
      typeof window !== "undefined" ? 768 < window.innerWidth : false,
  })

  const {
    isOpen: isOpenDrawer,
    onClose: onCloseDrawer,
    onToggle: onToggleDrawer,
  } = useDisclosure({
    defaultIsOpen: false,
  })

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure()

  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure()

  const onToggle = () => {
    if (breakPoint === "base" || breakPoint === "sm") {
      onToggleDrawer()
      return
    }
    onToggleNavigation()
  }

  const onClose = () => {
    if (breakPoint === "base" || breakPoint === "sm") {
      onCloseDrawer()
    }
    onCloseNavigation()
  }

  return (
    <>
      <HomeHeader onOpenNavigation={onToggle} />
      <HStack alignItems={"flex-start"} spacing={0}>
        <FlexibleNavigation
          isOpen={isOpenNavigation}
          isOpenDrawer={isOpenDrawer}
          onClose={onClose}
        >
          <HomeNavigationList
            onOpen={onOpenLogin}
            onOpenLogout={onOpenLogout}
          />
        </FlexibleNavigation>
        {props.children}
      </HStack>
      <Divider />
      <HomeFooter />
      <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
      <LogoutModal
        isOpen={isOpenLogout}
        onClose={onCloseLogout}
        onOpen={onOpenLogout}
      />
    </>
  )
}

export default MainLayout