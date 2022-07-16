
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js'
import Follow from '../model/follow.js';

dotenv.config();

export const signupUser=async(request,response)=>{
    try {
        //hashed password:salt+encrypted password
        //const salt = await bcrypt.genSalt();
        //const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = { name: request.body.name, accounttype: request.body.accounttype, email:request.body.email,password:hashedPassword};
        const newUser = new User(user);
        await newUser.save();
        const follow={email:request.body.email,following:[]};
        const newFollow=new Follow(follow);
        await newFollow.save();
        return response.status(200).json({ msg: 'Signup successfull' });
    } 
    catch (error) 
    {
        return response.status(500).json({ msg: 'Error while signing up user' });
    }

}


export const loginUser = async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
        return response.status(400).json({ msg: 'Email does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, email: user.email });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'error while login the user' })
    }
}
