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

    let def_skills = await defaultSkill.findAll()

    def_skills = def_skills.map((def_skill: typeof defaultSkill) => {
        return {
            id: def_skill.id,
            name: def_skill.name,
            description: def_skill.description
        }
    })

    let def_edges = await defaultEdge.findAll()

    def_edges = def_edges.map((def_edge: typeof defaultEdge) => {
        return {
            id: def_edge.id,
            name: def_edge.name,
            description: def_edge.description,
            reqierments: def_edge.reqierments
        }
    })

    let def_weapons = await defaultWeapon.findAll()

    def_weapons = def_weapons.map((def_weapon: typeof defaultWeapon) => {
        return {
            id: def_weapon.id,
            name: def_weapon.name,
            notes: def_weapon.notes,
            damage: def_weapon.damage,
            range: def_weapon.range,
            weight: def_weapon.weight,
            armorPiece: def_weapon.armorPiece,
            rateOfFire: def_weapon.rateOfFire
        }
    })

    let def_powers = await defaultPower.findAll()

    def_powers = def_powers.map((def_power: typeof defaultPower) => {
        return {
            id: def_power.id,
            effect: def_power.effect,
            name: def_power.name,
            cost: def_power.cost,
            duration: def_power.duration,
            range: def_power.range
        }
    })

    let def_hindrances = await defaultHindrance.findAll()

    def_hindrances = def_hindrances.map((def_hindrance: typeof defaultHindrance) => {
        return {
            id: def_hindrance.id,
            name: def_hindrance.name,
            description: def_hindrance.description,
            cost: def_hindrance.cost
        }
    })

    return character.toJSON()
})