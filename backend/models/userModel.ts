import mongoose, { Document, Model } from 'mongoose';

const Schema = mongoose.Schema;
const bcrypt

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

// static signup method
userSchema.statics.signup = async (email: String, password: String) => {
    
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email is already in use')
    }


}

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default User;
