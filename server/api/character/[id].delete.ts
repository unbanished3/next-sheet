import jwt, { Secret } from 'jsonwebtoken'
import { User, Character} from '../../database'

export default defineEventHandler(async (event) => {
    let token = getHeaders(event).authorization

    if(!token) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    token = token.split(' ')[1]
    if(!token) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    let decoded: jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET as Secret) as jwt.JwtPayload

    if(!decoded) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    let user = await User.findOne({ where: { id: decoded.id } })
    if(!user) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    let id = getRouterParams(event).id
    let character = await Character.findOne({ where: { id, userId: user.id } })
    if(!character) {
        return sendError(event, createError({ statusCode: 404, statusMessage: 'Character not found' }))
    }

    await character.destroy()

    return { message: 'Character deleted' }
})