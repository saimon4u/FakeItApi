import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export const httpMethods = [
	{ label: 'GET', value: 'GET' },
	{ label: 'POST', value: 'POST' },
	{ label: 'PUT', value: 'PUT' },
	{ label: 'DELETE', value: 'DELETE' },
]

export const schemaTypes = [
	{ label: 'Manual', value: 'Manual' },
	{ label: 'SQL', value: 'SQL' },
	{ label: 'Mongo Model', value: 'MONGO_MODEL' },
]

export const dataTypes = [
	{ label: "String", value: "String" },
	{ label: "Number", value: "Number" },
	{ label: "Boolean", value: "Boolean" },
	{ label: "Array", value: "Array" },
	{ label: "Object", value: "Object" },
	{ label: "Date", value: "Date" },
	{ label: "ObjectId", value: "ObjectId" },
	{ label: "Binary", value: "Binary" },
	{ label: "Decimal128", value: "Decimal128" },
	{ label: "Image", value: "Image" },
]