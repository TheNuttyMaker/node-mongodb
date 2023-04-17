import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, getDbConnection } from '../db';

export const LoginRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password }= req.body;
        let user;
        console.log('DB connection');
        const db = getDbConnection('react-auth-db');
        try {
            console.log('Find User');
            user = await findUserByEmail(db, email);
            console.log(user);

        } catch(err) {
            console.log('Error is: '+ err);
        }
        console.log('user'+ user);

        if(!user) {
            return res.sendStatus(401);
        }
        const { _id: id, isVerified, passwordHash, info } = user;

        const isCorrect = await bcrypt.compare(password, passwordHash);

        if(isCorrect) {
            jwt.sign({
                id, isVerified, email, info
            }, process.env.JWT_SECRET, { expiresIn: '2d'}, (err, token) => {
                if(err) {
                    res.status(500).json(err);
                }
                res.status(200).json({token});
            });
        } else {
            res.sendStatus(401);
        }
    }
}