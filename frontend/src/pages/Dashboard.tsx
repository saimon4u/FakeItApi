import { AppSidebar } from "@/components/app-sidebar"
import { CreateAPI } from "@/components/CreateAPI"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
export function Dashboard() {
	return (
		<div className="[--header-height:calc(theme(spacing.14))] h-screen w-screen overflow-scroll"
			style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
		>
			<SidebarProvider className="flex flex-col">
				<SiteHeader />
				<div className="flex flex-1">
					<AppSidebar />
					<SidebarInset>
						<CreateAPI/>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	)
}
