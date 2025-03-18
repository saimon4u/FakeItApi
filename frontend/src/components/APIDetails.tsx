import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card"
import { ClipboardCopy } from "lucide-react"
import { useNavigate } from "react-router-dom";

export interface API {
    name?: string;
    method?: string;
    schemaType?: string;
    responseSize?: string;
    schema?: { fieldName: string; type: string }[];
    endpoint?: string;
    token?: string;
}

interface APIDetailsProps {
    api: API;
    setApi: (api: API | null) => void;
    setFetchApi: (fetchApi: boolean) => void;
}

export function ApiDetails({ api, setApi, setFetchApi }: APIDetailsProps) {

    const navigate = useNavigate();

    const handleCopy = () => {
        navigator.clipboard.writeText(api.token || "");
        toast.info("Token copied to clipboard");
    };


    const handleDelete = async () => {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch('http://localhost:3000/api/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: api.name,
                method: api.method
            })
        })
        if(!response.ok) {
            if (response.status === 401) {
                toast.error("Unauthorized", { description: "Please login to test an API" });
                localStorage.removeItem('accessToken');
                localStorage.removeItem("isAuthenticated");
                navigate('/signin');
            } else {
                toast.error("Failed to test API");
            }
            return;
        }
        const data = await response.json()
        console.log(data)
        toast.success('API deleted successfully')
        setFetchApi(true);
    }

    return (
        <div className="w-screen h-screen">
            <Card className="w-full h-full">
                <CardHeader className="text-center text-md font-bold md:text-2xl">
                    <h1>{api.endpoint}</h1>
                </CardHeader>
                <CardContent>
                    <div className="w-full p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">Name:</p>
                                <p>{api.name}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Method:</p>
                                <p>{api.method}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Schema Type:</p>
                                <p>{api.schemaType}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Response Size:</p>
                                <p>{api.responseSize}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="font-semibold mb-2">Schema:</p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {api.schema?.map((field, index) => (
                                    <div key={index} className="border p-4 rounded-md shadow-sm">
                                        <p>
                                            <span className="font-semibold">{field.fieldName}:</span> {field.type}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="font-semibold mb-2">Token:</p>
                            <div className="flex items-center border rounded-md p-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={api.token}
                                    className="w-full bg-transparent outline-none"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="ml-2 px-2 py-1 rounded-md border shadow-sm hover:bg-gray-100 transition"
                                >
                                    <ClipboardCopy size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-evenly mt-6">
                            <Button className="w-[30%] bg-red-500 text-white hover:bg-red-800" onClick={() => { setApi(null); handleDelete() }}>Delete</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
