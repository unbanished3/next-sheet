import { defaultSkill, defaultEdge, defaultWeapon, defaultPower, defaultHindrance } from '../database'

const getArrayFromDatabase = async (dataTable: typeof defaultSkill | typeof defaultEdge | typeof defaultWeapon | typeof defaultPower | typeof defaultHindrance) => {
    let array = await dataTable.findAll()

    if(!array) {
        array = []
    }
    else {
        array = array.map((data: typeof defaultSkill | typeof defaultEdge | typeof defaultWeapon | typeof defaultPower | typeof defaultHindrance) => {
            return data.toJSON()
        })
    }

    return array
}

export default defineEventHandler(async (event) => {

    let skills = await getArrayFromDatabase(defaultSkill)

    let edges = await getArrayFromDatabase(defaultEdge)

    let weapons = await getArrayFromDatabase(defaultWeapon)

    let powers = await getArrayFromDatabase(defaultPower)

    let hindrances = await getArrayFromDatabase(defaultHindrance)

    return { skills, edges, weapons, powers, hindrances }
})