import User from '../models/userModel';

// login user
const loginUser = async (req: Request, res: Response) => {
    res.json({messg: 'login user'})
}

// signup user

const signupUser = async (req: Request, res: Response) => {
    res.json({messg: 'signup user'})
}

module.exports = {
    loginUser,
    signupUser
}