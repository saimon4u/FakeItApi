import {
  LogOutIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function NavUser({
  user,
}: {
  user: {
    email: string
  } | null
}) {

  const navigate = useNavigate();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-default"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg">{user?.email.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-xs">{user?.email}</span>
          </div>
          <LogOutIcon className="ml-auto size-4 cursor-pointer" onClick={() => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('isAuthenticated')
            toast.info('Logged out successfully')
            navigate('/signin')
          }}/>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
