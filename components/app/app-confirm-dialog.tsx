import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Props = {
  description: string
  title?: string
  nextLabel?: string
  cancelLabel?: string
  children: React.ReactNode
  onNext(): void
  onCancel(): void
}

/**
 * 確認ダイアログ
 * @param props
 * @returns
 */
export const AppConfirmDialog = (props: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title ?? ""}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.onNext}>
            {props.nextLabel ?? "はい"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={props.onCancel}>
            {props.cancelLabel ?? "いいえ"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}