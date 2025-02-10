import { useState } from "react"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Label } from "./ui/label"
import { SelectMenu } from "./SelectMenu"
import { Textarea } from "./ui/textarea"
import { httpMethods, schemaTypes, dataTypes } from "@/lib/utils"
import { Button } from "./ui/button"

export function CreateAPI() {
    const [apiName, setApiName] = useState<string>('Untitled')
    const [resonseSize, setResonseSize] = useState<string>('20')
    const [httpMethod, setHttpMethod] = useState<string>(httpMethods[0].value)
    const [schemaType, setSchemaType] = useState<string>(schemaTypes[0].value)
    const [schema, setSchema] = useState<string>('')
    const [sampleResponse, setSampleResponse] = useState<string>('Sample response from your current endpoint')
    const [fields, setFields] = useState<{ fieldName: string; type: string }[]>([])



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


    const generateJSON = () => {
        console.log(JSON.stringify(fields, null, 2))
    }



    return (
        <div className="grid grid-cols-6 h-[80vh] w-screen p-6">
            <div className="col-span-4">
                <Card>
                    <CardHeader>
                        <div className="text-xl font-bold">{`http://localhost:3000/api/${apiName.toLowerCase()}`}</div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col h-[80vh]">
                            <div>
                                <Label htmlFor="api_name">API Name</Label>
                                <Input
                                    id="api_name"
                                    name="api_name"
                                    value={apiName}
                                    onChange={(e) => setApiName(e.target.value)}
                                />
                            </div>
                            <div className="mt-2">
                                <Label htmlFor="api_name">Response Size</Label>
                                <Input
                                    id="response_size"
                                    name="response_size"
                                    value={resonseSize}
                                    onChange={(e) => setResonseSize(e.target.value)}
                                />
                            </div>
                            <div className="mt-2 flex justify-between">
                                <div>
                                    <Label htmlFor="api_name">Http Method</Label>
                                    <SelectMenu options={httpMethods} selectedValue={httpMethod} onChange={setHttpMethod} />
                                </div>
                                <div>
                                    <Label htmlFor="api_name">Schema Type</Label>
                                    <SelectMenu options={schemaTypes} selectedValue={schemaType} onChange={setSchemaType} />
                                </div>
                            </div>
                            <div className="mt-2">
                                <Label htmlFor="schema">Schema</Label>
                                {
                                    schemaType === 'Manual' ? (
                                        <div className="overflow-y-auto h-[50vh] p-2"
                                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        >
                                            <Button onClick={addField} className="mt-4">+ Add Field</Button>
                                            {
                                                fields.map((field, index) => (
                                                    <div key={index} className="flex items-center gap-4 mb-3">
                                                        <Input
                                                            type="text"
                                                            placeholder="Field Name"
                                                            value={field.fieldName}
                                                            onChange={(e) => updateFieldName(index, e.target.value)}
                                                        />
        
                                                        <SelectMenu
                                                            options={dataTypes}
                                                            selectedValue={field.type}
                                                            onChange={(value) => updateFieldType(index, value)}
                                                        />
        
                                                        <Button onClick={() => removeField(index)} variant="destructive">X</Button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <Textarea
                                            id="schema"
                                            name="schema"
                                            value={schema}
                                            onChange={(e) => setSchema(e.target.value)}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-2">
                <Card>
                    <CardHeader>
                        <h2>Response</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col h-[80vh] items-center justify-center overflow-scroll"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {sampleResponse}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
