import { cn } from '../utils/cn'

type Props = {
  className?: string
}

export const Divider = ({ className }: Props) => {
  return <hr className={cn('border-t border-gray-300', className)} />
}
