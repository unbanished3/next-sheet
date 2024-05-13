import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../../database'

export default defineEventHandler(async (event) => {
    let data = await readBody(event)
    
    let login = data.login
    let password = data.password
    let email = data.email

    let user = await User.findOne({ where: { login } })

    if(user) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'User already exists' }))
    }

    user = await User.create({ login, password: bcrypt.hashSync(password, 10), email })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as Secret)

    return { token }
})