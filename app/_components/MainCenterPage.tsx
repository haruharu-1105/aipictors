"use client"

import { HStack } from "@chakra-ui/react"

type Props = {
  children: React.ReactNode
}

export const MainCenterPage: React.FC<Props> = (props) => {
  return (
    <HStack
      overflowX={"hidden"}
      px={4}
      w={"100%"}
      mx={"auto"}
      maxW={"container.sm"}
      justifyContent={"center"}
      pb={16}
    >
      {props.children}
    </HStack>
  )
}