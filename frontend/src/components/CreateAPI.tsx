import { useState } from "react"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Label } from "./ui/label"
import { SelectMenu } from "./SelectMenu"
import { httpMethods, schemaTypes, dataTypes, BACKEND_HOST } from "@/lib/utils"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { API } from "./APIDetails"

interface CreateApiProps {
    setApi: (api: API | null) => void;
    setFetchApi: (fetchApi: boolean) => void;
}

export function CreateAPI({ setApi, setFetchApi }: CreateApiProps) {
    const [apiName, setApiName] = useState<string>('Untitled')
    const [resonseSize, setResonseSize] = useState<string>('20')
    const [httpMethod, setHttpMethod] = useState<string>(httpMethods[0].value)
    const [schemaType, setSchemaType] = useState<string>(schemaTypes[0].value)
    const [fields, setFields] = useState<{ fieldName: string; type: string }[]>([])
    const [sampleResponse, setSampleResponse] = useState<typeof fields | null>(null)
    const navigate = useNavigate();

    const addField = () => {
        setFields([...fields, { fieldName: "", type: "" }])
    }

    const removeField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index))
    }

    const updateFieldName = (index: number, name: string) => {
        const updatedFields = [...fields]
        updatedFields[index].fieldName = name
        setFields(updatedFields)
    }

    const updateFieldType = (index: number, type: string) => {
        const updatedFields = [...fields]
        updatedFields[index].type = type
        setFields(updatedFields)
    }

    const handleCreateAPI = async () => {
        if (fields.length === 0 || fields[0].fieldName === "" || fields[0].type === "") {
            toast.error("Please add fields to create an API");
            return;
        }
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(`${BACKEND_HOST}api/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: apiName,
                method: httpMethod,
                schemaType: schemaType,
                responseSize: resonseSize,
                schema: JSON.stringify(fields),
            })
        });
        const data = await response.json();
        if (!response.ok) {
            if (response.status === 401) {
                toast.error("Unauthorized", { description: "Please login to create an API" });
                localStorage.removeItem('accessToken');
                localStorage.removeItem("isAuthenticated");
                navigate('/signin');
            } else {
                toast.error(data.message);
            }
            return;
        }
        toast.success(data.message);
        setApi({ name: apiName, method: httpMethod, responseSize: resonseSize, schemaType: schemaType, token: data.token, endpoint: data.endpoint, schema: fields });
        setFetchApi(true);
    }

    const handleTestAPI = async () => {
        if (fields.length === 0 || fields[0].fieldName === "" || fields[0].type === "") {
            toast.error("Please add fields to create an API");
            return;
        }
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(`${BACKEND_HOST}api/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: apiName,
                method: httpMethod,
                schemaType: schemaType,
                responseSize: resonseSize,
                schema: JSON.stringify(fields),
            })
        });
        if (!response.ok) {
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
        const data = await response.json();
        toast.info('API tested successfully');
        setSampleResponse(data);
    }

    return (
        <div className="p-2 h-[80vh] w-screen flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/3">
                <Card>
                    <CardHeader>
                        <div className="text-md font-bold md:text-xl">{`${BACKEND_HOST}api/${apiName.toLowerCase()}`}</div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col h-[80vh]">
                            <div>
                                <Label htmlFor="api_name">API Name</Label>
                                <Input id="api_name" name="api_name" value={apiName} onChange={(e) => setApiName(e.target.value)} />
                            </div>
                            <div className="mt-2">
                                <Label htmlFor="response_size">Response Size</Label>
                                <Input id="response_size" name="response_size" value={resonseSize} onChange={(e) => setResonseSize(e.target.value)} />
                            </div>
                            <div className="mt-2 flex flex-col md:flex-row justify-between">
                                <div>
                                    <Label htmlFor="http_method">Http Method</Label>
                                    <SelectMenu options={httpMethods} selectedValue={httpMethod} onChange={setHttpMethod} />
                                </div>
                                <div>
                                    <Label htmlFor="schema_type">Schema Type</Label>
                                    <SelectMenu options={schemaTypes} selectedValue={schemaType} onChange={setSchemaType} />
                                </div>
                            </div>
                            <div className="mt-2">
                                <Label htmlFor="schema">Schema</Label>
                                {schemaType === 'Manual' ? (
                                    <div>
                                        <div className="overflow-y-auto h-[50vh] p-2 flex flex-col items-center"
                                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                            <Button onClick={addField} className="m-4 w-[50%]">+ Add Field</Button>
                                            {fields.map((field, index) => (
                                                <div key={index} className="flex items-center gap-4 mb-3">
                                                    <Input type="text" placeholder="Field Name" value={field.fieldName} onChange={(e) => updateFieldName(index, e.target.value)} />
                                                    <SelectMenu options={dataTypes} selectedValue={field.type} onChange={(value) => updateFieldType(index, value)} />
                                                    <Button onClick={() => removeField(index)} variant="destructive">X</Button>
                                                </div>
                                            ))}
                                        </div>
                                        {fields.length > 0 && (
                                            <div className="flex items-center justify-between w-full">
                                                <Button onClick={handleCreateAPI} className="w-[45%] bg-emerald-400 text-black hover:bg-emerald-600">Create API</Button>
                                                <Button onClick={handleTestAPI} className="w-[45%] bg-yellow-300 text-black hover:bg-yellow-500">Test API</Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500">{schemaType} Coming soon...</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full md:w-1/3">
                <Card>
                    <CardHeader>
                        <h2>Response</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col h-[80vh] items-center justify-center overflow-scroll"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {sampleResponse ?
                                <pre className="text-sm overflow-auto w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    {JSON.stringify(sampleResponse, null, 2)}
                                </pre> :
                                <p className="text-center">Test your API for sample data</p>
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
