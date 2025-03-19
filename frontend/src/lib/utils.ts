import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
};

export const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST as string;

export const httpMethods = [
	{ label: 'GET', value: 'Get' },
	{ label: 'POST', value: 'Post' },
];

export const schemaTypes = [
	{ label: 'Manual', value: 'Manual' },
	{ label: 'SQL', value: 'Sql' },
	{ label: 'Mongo Model', value: 'Mongo' },
];

export const dataTypes = [
	{ label: "Name", value: "Name" },
	{ label: "Bio", value: "Bio" },
	{ label: "Color", value: "Color" },
	{ label: "Price", value: "Price" },
	{ label: "Product", value: "Product" },
	{ label: "Boolean", value: "Boolean" },
	{ label: "Date", value: "Date" },
	{ label: "Day", value: "Day" },
	{ label: "Account", value: "Account" },
	{ label: "Cvv", value: "Cvv" },
	{ label: "Issuer", value: "Issuer" },
	{ label: "Card", value: "Card" },
	{ label: "Currency", value: "Currency" },
	{ label: "Pin", value: "Pin" },
	{ label: "Fruit", value: "Fruit" },
	{ label: "Vegetable", value: "Vegetable" },
	{ label: "Image", value: "Image" },
	{ label: "Domain", value: "Domain" },
	{ label: "Email", value: "Email" },
	{ label: "Emoji", value: "Emoji" },
	{ label: "Ip", value: "Ip" },
	{ label: "Jwt", value: "Jwt" },
	{ label: "Password", value: "Password" },
	{ label: "Url", value: "Url" },
	{ label: "Username", value: "Username" },
	{ label: "City", value: "City" },
	{ label: "Country", value: "Country" },
	{ label: "Language", value: "Language" },
	{ label: "Latitude", value: "Latitude" },
	{ label: "Longitude", value: "Longitude" },
	{ label: "Address", value: "Address" },
	{ label: "Zip", value: "Zip" },
	{ label: "Line", value: "Line" },
	{ label: "Paragraph", value: "Paragraph" },
	{ label: "Word", value: "Word" },
	{ label: "Number", value: "Number" },
	{ label: "Float", value: "Float" },
	{ label: "Phone", value: "Phone" },
	{ label: "Imei", value: "Imei" },
	{ label: "Uuid", value: "Uuid" },
	{ label: "Filename", value: "Filename" },
	{ label: "Directory", value: "Directory" }
  ];