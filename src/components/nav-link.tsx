import { Link, LinkProps, useLocation } from 'react-router-dom'

export interface NavLinkProps extends LinkProps {}

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()
  const isCurrentRouteActive = pathname === props.to

  return (
    <Link
      data-current={isCurrentRouteActive}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[current=true]:text-foreground"
      {...props}
    />
  )
}
