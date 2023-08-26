import mongoose, { Document, Model } from 'mongoose';

const Schema = mongoose.Schema;

export interface ContactAttributes {
    name: string;
    number: string;
    email?: string;
}

export interface ContactDocument extends ContactAttributes, Document {}

const contactSchema = new Schema<ContactAttributes>(
    {
        name: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Contact: Model<ContactDocument> = mongoose.model<ContactDocument>('Contact', contactSchema);

export default Contact;
