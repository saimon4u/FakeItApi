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

    const existingApi = await Api.findOne({userId: user.userId, name: name, method: method});
    if (existingApi) {
        return res.status(400).json({ message: "API already exists with same endpoint and method." });
    }

    try {
        const newApi = await new Api({ userId: user.userId, name: name, method: method, schemaType: schemaType, schema: schema, responseSize: responseSize });
        await newApi.save();

        res.status(201).json({
            message: "Mock API created successfully",
            endpoint: `${req.protocol}://${req.get("host")}/api/${name}`,
            token: req.headers.authorization?.split(" ")[1],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating mock API" });
    }
};


export const testApi = async (req, res) => {
    const { name, method, schema, schemaType, responseSize } = req.body;
    if (!name || !method || !schema || !schemaType) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const jsonSchema = await JSON.parse(schema);
    console.log(jsonSchema);
    const data = await generateMockData(jsonSchema, responseSize);
    res.status(200).json(data);
};


const generateMockData = async (schema, responseSize) => {
    let mockDataArray = [];
    for (let i = 0; i < responseSize; i++) {
        let mockData = {};
        for (const fieldIndex in schema) {
            const field = schema[fieldIndex];
            mockData[field.fieldName] = await generateMockValue(field.type);
        }
        mockDataArray.push(mockData);
    }
    return mockDataArray;
};

const generateMockValue = async (type) => {
    switch (type) {
        case "Name": return faker.person.fullName();
        case "Bio": return faker.person.bio();
        case "Color": return faker.color.human();
        case "Price": return faker.commerce.price();
        case "Product": return faker.commerce.product();
        case "Boolean": return faker.datatype.boolean();
        case "Date": return faker.date.anytime();
        case "Day": return faker.date.weekday();
        case "Account": return faker.finance.accountNumber();
        case "Cvv": return faker.finance.creditCardCVV();
        case "Issuer": return faker.finance.creditCardIssuer();
        case "Card": return faker.finance.creditCardNumber();
        case "Currency": return faker.finance.currencyName();
        case "Pin": return faker.finance.pin();
        case "Fruit": return faker.food.fruit();
        case "Vegetable": return faker.food.vegetable();
        case "Image": return faker.image.url();
        case "Domain": return faker.internet.domainName();
        case "Email": return faker.internet.email();
        case "Emoji": return faker.internet.emoji();
        case "Ip": return faker.internet.ipv4();
        case "Jwt": return faker.internet.jwt();
        case "Password": return faker.internet.password();
        case "Url": return faker.internet.url();
        case "Username": return faker.internet.username();
        case "City": return faker.location.city();
        case "Country": return faker.location.country();
        case "Language": return faker.location.language().name;
        case "Latitude": return faker.location.latitude();
        case "Longitude": return faker.location.longitude();
        case "Address": return faker.location.streetAddress();
        case "Zip": return faker.location.zipCode();
        case "Line": return faker.lorem.sentence();
        case "Paragraph": return faker.lorem.paragraph();
        case "Word": return faker.lorem.word();
        case "Number": return faker.number.int({max: 100000});
        case "Float": return faker.number.float({max: 100000});
        case "Phone": return faker.phone.number();
        case "Imei": return faker.phone.imei();
        case "Uuid": return faker.string.uuid();
        case "Filename": return faker.system.commonFileName();
        case "Directory": return faker.system.directoryPath();
        default: return faker.lorem.word();
    }
};

export const getMockData = async (req, res) => {
    const user = authenticateUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { apiName } = req.params;
    

    let method = req.method.toString().split("");
    for(let x in method){
        if(x == 0)method[x] = method[x].toUpperCase();
        else method[x] = method[x].toLowerCase();
    }
    method = method.join("");
    try {
        const mockApi = await Api.findOne({ userId: user.userId, name: apiName, method: method });
        if (!mockApi) return res.status(404).json({ message: "API not found" });

        const jsonSchema = await JSON.parse(mockApi.schema);
        const mockData = await generateMockData(jsonSchema, mockApi.responseSize);
        res.status(200).json(mockData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching mock data" });
    }
};


export const getAPIs = async (req, res) => {
    const user = authenticateUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const apis = await Api.find({userId: user.userId});

    return res.status(200).json({
        message: "APIs fetched successfully", 
        apis: apis.map(api => { 
            return ({
                name: api.name, 
                method: api.method, 
                userId: api.userId, 
                schemaType: api.schemaType, 
                schema: JSON.parse(api.schema), 
                responseSize: api.responseSize, 
                endpoint: `${req.protocol}://${req.get("host")}/api/${api.name}`,
                token: req.headers.authorization?.split(" ")[1],
            }) 
        })
    });
}

export const deleteApi = async (req, res) => {
    const user = authenticateUser(req);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const {name, method} = req.body;
    if (!name || !method) return res.status(400).json({ message: "Missing required fields" });

    const api = await Api.findOne({userId: user.userId, name: name, method: method});
    if (!api) return res.status(404).json({ message: "API not found" });

    await Api.deleteOne({userId: user.userId, name: name, method: method});
    return res.status(200).json({ message: "API deleted successfully" });
}