import InPaintingEditImage from "@/app/[lang]/generation/_components/submission-view/in-painting-edit-image"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "画像生成/in-painting-edit-image",
  component: InPaintingEditImage,
  parameters: { layout: "centered" },
} satisfies Meta<typeof InPaintingEditImage>

export default meta

type Story = StoryObj<typeof meta>

export const 通常: Story = {
  args: {
    imageUrl: "https://picsum.photos/800",
    isLoading: false,
    onLoaded() {},
  },
}

export const ローディング中: Story = {
  args: {
    imageUrl: "https://picsum.photos/800",
    isLoading: true,
    onLoaded() {},
  },
}