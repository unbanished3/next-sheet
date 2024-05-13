import jwt, { Secret } from 'jsonwebtoken'
import { User, defaultSkill, defaultEdge, defaultWeapon, defaultPower, defaultHindrance } from '../../database'


export default defineEventHandler(async (event) => {
    let token = getHeaders(event).authorization

    if(!token) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    token = token.split(' ')[1]
    if(!token) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    const decoded : jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET as Secret) as jwt.JwtPayload
    if(!decoded) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    let user = await User.findOne({ where: { id: decoded.id } })
    if(!user) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    if(!user.isAdmin){
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    let type= getRouterParams(event).type
    let id = getRouterParams(event).id

    if(type === 'skill') {
        let skill = await defaultSkill.findOne({ where: { id } })
        return skill
    }

    if(type === 'edge') {
        let edge = await defaultEdge.findOne({ where: { id } })
        return edge
    }

    if(type === 'weapon') {
        let weapon = await defaultWeapon.findOne({ where: { id } })
        return weapon
    }

    if(type === 'power') {
        let power = await defaultPower.findOne({ where: { id } })
        return power
    }

    if(type === 'hindrance') {
        let hindrance = await defaultHindrance.findOne({ where: { id } })
        return hindrance
    }

})