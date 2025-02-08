import Api from "../model/Api.js";
import jwt from "jsonwebtoken";
import { faker } from '@faker-js/faker';

const authenticateUser = (req) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};


export const createApi = async (req, res) => {
    const user = authenticateUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { name, method, schema, schemaType, responseSize } = req.body;
    if (!name || !method || !schema || !schemaType) {
        return res.status(400).json({ message: "Missing required fields" });
    }


    try {
        const newApi = await new Api({ userName: user.username, name: name, method: method, schemaType: schemaType, schema: schema, responseSize: responseSize });
        await newApi.save();

        res.status(201).json({
            message: "Mock API created successfully",
            endpoint: `${req.protocol}://${req.get("host")}/api/${name}`,
            token: req.headers.authorization?.split(" ")[1],
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating mock API" });
    }
};


const generateMockData = (schema, responseSize) => {
    let mockDataArray = [];
    for (let i = 0; i < responseSize; i++) {
        let mockData = {};
        for (const field in schema) {
            const type = schema[field];
            mockData[field] = generateMockValue(type);
        }
        mockDataArray.push(mockData);
    }
    return mockDataArray;
};

const generateMockValue = (type) => {
    switch (type) {
        case "string": return faker.lorem.word();
        case "integer": return faker.datatype.number();
        case "boolean": return faker.datatype.boolean();
        case "date": return faker.date.past();
        default: return null;
    }
};

export const getMockData = async (req, res) => {
    const user = authenticateUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { apiName } = req.params;

    try {
        const mockApi = await Api.findOne({ userName: user.username, name: apiName, method: req.method });
        if (!mockApi) return res.status(404).json({ message: "API not found" });

        const mockData = generateMockData(mockApi.schema, mockApi.responseSize);
        res.status(200).json(mockData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mock data" });
    }
};