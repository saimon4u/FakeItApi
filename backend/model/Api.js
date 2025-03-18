import mongoose from "mongoose";

const APISchema = new mongoose.Schema({
    userId: { type: String, ref: "User", required: true },
    name: { type: String, required: true },
    method: { type: String, enum: ["Get", "Post"], default: "Get" },
    schemaType: { type: String, enum: ["Sql", "Mongo", "Manual"], required: true },
    schema: { type: Object, required: true },
    responseSize: {type: Number, default: 20},
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("API", APISchema);