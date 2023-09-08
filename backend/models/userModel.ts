import mongoose, { Document, Model } from 'mongoose';

const Schema = mongoose.Schema;

export interface UserAttributes {
    email: string;
    password: string;
}

export interface UserDocument extends UserAttributes, Document {}

const userSchema = new Schema<UserAttributes>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default User;
