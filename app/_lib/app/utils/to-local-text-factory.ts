import { toLocalText } from "@/_lib/app/utils/to-local-text"

export const toLocalTextFactory = (locale: string) => {
  return (ja: string, en: string) => {
    return toLocalText(locale, ja, en)
  }
}
