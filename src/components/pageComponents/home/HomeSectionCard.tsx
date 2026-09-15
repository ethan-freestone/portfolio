import { Link } from '@tanstack/react-router'

import {
  ArrowRight,
  Code2,
  FileUser,
  User2,
  type LucideIcon,
} from 'lucide-react'

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components';
import { PROFILE_DATA } from '#/data';

export type HomeSectionCardBadge = {
  Icon?: LucideIcon
  text: string
}

export type HomeSectionCardProps = {
  Icon: LucideIcon
  description: ReactNode
  badges: HomeSectionCardBadge[]
  linkTo: string
  linkText: string
  title: string
}

export const HomeSectionCard = ({
  Icon,
  description,
  badges,
  linkTo,
  linkText,
  title,
}: HomeSectionCardProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/50 flex flex-col justify-between">
      <CardHeader>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {badges?.map(({ Icon, text }) => (
            <Badge variant="outline">
              {Icon && <Icon />}
              {text}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          className="p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform"
          asChild
        >
          <Link to={linkTo} className="text-primary inline-flex items-center">
            {linkText} <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
