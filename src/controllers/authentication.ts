import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) return res.status(400).send({ message: 'Missing fields' }).end();

        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(400);

        const salt = random();
        const user: any = await createUser({
            email, username, authentication: {
                salt, password: authentication(salt, password)
            }
        })

        return res.send(user).status(200).end();

    } catch (err) {
        console.log(err);
        return res.send({ message: 'Something went wrong', error: err }).status(400).end();
    }
}