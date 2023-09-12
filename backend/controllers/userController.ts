import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const createToken = (_id: any) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user

const signupUser = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try{
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}