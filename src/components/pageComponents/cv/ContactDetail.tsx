export const ContactDetail = ({
  detail,
  Icon,
}: {
  detail: string
  Icon: LucideIcon
}) => {
  return (
    <div className="flex items-center justify-start sm:justify-end gap-1.5">
      <Icon className="h-3 w-3" />
      <span>{detail}</span>
    </div>
  )
};
