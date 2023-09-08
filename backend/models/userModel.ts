import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator'

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

    // validation
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }
    
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
