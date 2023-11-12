import express from 'express';
import { getUsers, deleteUserById, getUserById } from '../db/users';


export const getAllUsers = async (req: express.Request, res: express.Response) => {

    try {

        const users = await getUsers();
        return res.json({ users }).status(200).end();

    } catch (error) {
        return res.send({ error, message: 'users not found' }).status(400).end();
    }

}


export const deleteUser = async (req: express.Request, res: express.Response) => {

    try {

        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser).status(200).end();

    } catch (error) {
        return res.send({ error, message: 'users not deleted' }).status(400).end();
    }

}



export const updateUser = async (req: express.Request, res: express.Response) => {

    try {

        const { id } = req.params;
        const { username } = req.body;
        if (!username) return res.send({ message: 'username is required' }).status(400).end();

        const user = await getUserById(id);

        if (user.username === username) return res.send({ message: 'username cannot be same' }).status(400).end();
        user.username = username;
        await user.save();

        return res.json(user).status(200).end();

    } catch (error) {
        return res.send({ error, message: 'users not deleted' }).status(400).end();
    }

}