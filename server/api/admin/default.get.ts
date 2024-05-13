import jwt, { Secret } from 'jsonwebtoken'
import { User, Character, defaultSkill, defaultEdge, defaultWeapon, defaultPower, defaultHindrance } from '../../database'


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

    let default_skills = await defaultSkill.findAll().map((def_skill: typeof defaultSkill) => {
        return def_skill.toJSON()
    })
    let default_edges = await defaultEdge.findAll().map((def_edge: typeof defaultEdge) => {
        return def_edge.toJSON()
    })
    let default_weapons = await defaultWeapon.findAll().map((def_weapon: typeof defaultWeapon) => {
        return def_weapon.toJSON()
    })
    let default_powers = await defaultPower.findAll().map((def_power: typeof defaultPower) => {
        return def_power.toJSON()
    })
    let default_hindrances = await defaultHindrance.findAll().map((def_hindrance: typeof defaultHindrance) => {
        return def_hindrance.toJSON()
    })

    return { default_skills, default_edges, default_weapons, default_powers, default_hindrances }
})