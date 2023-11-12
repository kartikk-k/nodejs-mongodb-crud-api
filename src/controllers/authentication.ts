import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) return res.status(400).send({ message: 'Missing fields' }).end();

        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.send({ message: 'user already exists' }).status(400).end();

        const salt = random();
        const user: any = await createUser({
            email, username, authentication: {
                salt, password: authentication(salt, password)
            }
        })

        return res.send(user).status(200).end();

    } catch (err) {
        console.log("error registering: ", err);
        if (err.keyPattern.username === 1) return res.send({ message: 'Username already exists' }).status(400).end();
        return res.send({ message: 'Something went wrong', error: err }).status(400).end();
    }
}

export const login = async (req: express.Request, res: express.Response) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ message: 'Email or password missing' }).end();

        const user = await getUserByEmail(email).select('+authentication.password +authentication.salt');
        if (!user) return res.status(400).send({ message: 'User not found' }).end();

        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) return res.send({ message: 'Wrong password' }).status(400).end();

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('sessionToken', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();

    } catch (err) {
        console.log("error logging in: ", err)
        return res.send({ message: 'Something went wrong', error: err }).status(400).end();
    }
}