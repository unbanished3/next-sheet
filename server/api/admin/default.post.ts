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

    const decoded: jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET as Secret) as jwt.JwtPayload
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

    let data = await readBody(event)
    let type = data.type
    let value = data.value

    if(type === 'skill') {
        await defaultSkill.create({ name: value.name, description: value.description })
    }
    if(type === 'edge') {
        await defaultEdge.create({ name: value.name, description: value.description, requierments: value.requierments })
    }
    if(type === 'weapon') {
        await defaultWeapon.create({ name: value.name, damage: value.damage, range: value.range, weight: value.weight, armorPiece: value.armorPiece, rateOfFire: value.rateOfFire })
    }
    if(type === 'power') {
        await defaultPower.create({ name: value.name, cost: value.cost, effect: value.effect, duration: value.duration, range: value.range })
    }
    if(type === 'hindrance') {
        await defaultHindrance.create({ name: value.name, description: value.description, cost: value.cost })
    }

    return
})