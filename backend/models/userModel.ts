import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

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

// static signup method
userSchema.statics.signup = async function(email: String, password: String) {
    
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email is already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default User;
