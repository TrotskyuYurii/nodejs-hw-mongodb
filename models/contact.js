import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true}, 
    gender: {type: String, required: true, enum: ["male", "female", "other"]},
    avgMark: {type: Number, required: true, min: 0, max: 12},
    onDuty: {type: Boolean, required: false},
}, {timestamps: true, versionKey: false});


export const ContactCollection = model("contacts", contactSchema);
