import mongoose from "mongoose";

const APISchema = new mongoose.Schema({
    userName: { type: String, ref: "User", required: true },
    name: { type: String, required: true },
    method: { type: String, enum: ["GET", "POST", "PUT", "DELETE"], default: "GET" },
    schemaType: { type: String, enum: ["SQL", "MongoDB", "Manual"], required: true },
    schema: { type: Object, required: true },
    responseSize: {type: Number, default: 20},
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("API", APISchema);