import crypto from 'crypto';
// for loding .env file
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const SECRET = "SECRET-KEY-TO-START-ENGINE";

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/'))
        .update(SECRET)
        .digest('hex');
}