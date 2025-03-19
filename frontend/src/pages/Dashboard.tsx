import { API, ApiDetails } from "@/components/APIDetails"
import { AppSidebar } from "@/components/app-sidebar"
import { CreateAPI } from "@/components/CreateAPI"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { BACKEND_HOST } from "@/lib/utils"
import { useEffect, useState } from "react"
import { toast } from "sonner"
export function Dashboard() {
	const [api, setApi] = useState<API | null>(null)
	const [apis, setApis] = useState<API[]>([])
	const [fetchApi, setFetchApi] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
		  const token = localStorage.getItem('accessToken') || "";
		  const response = await fetch(`${BACKEND_HOST}api/apis`, {
			method: 'GET',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Bearer ${token}`
			}
		  })
		  
		  if(!response.ok) {
			toast.error('Failed to fetch APIs')
			return
		  }

		  const data = await response.json()
		  console.log(data)
		  if(data.apis.length === 0) {
			toast.info('Create some apis');
		  }
		  setApis(data.apis)
		}
		if (fetchApi) {
		  fetchData();
		  setFetchApi(false)
		}
	  }, [fetchApi])

	return (
		<div className="[--header-height:calc(theme(spacing.14))] h-screen w-screen overflow-scroll"
			style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
		>
			<SidebarProvider className="flex flex-col">
				<SiteHeader />
				<div className="flex flex-1">
					<AppSidebar setApi={setApi} apis={apis} />
					{api ? <ApiDetails api={api} setApi={setApi} setFetchApi={setFetchApi} /> : <CreateAPI setFetchApi={setFetchApi} setApi={setApi} />}
				</div>
			</SidebarProvider>
		</div>
	)
}
