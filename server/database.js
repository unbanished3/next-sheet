import Sequelize from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const User = sequelize.define('user', {
    login: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isConfirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

const Character = sequelize.define('character', {
    data: {
        type: Sequelize.JSONB,
        defaultValue: {
            name: 'Новый персонаж',
            race: '',
            level: 1,
            bennies: 0,
            strength: 1,
            spirit: 1,
            smarts: 1,
            vigor: 1,
            agility: 1,
            conviction: 1,
            pace: 0,
            parry: 0,
            wounds: 0,
            fatigue: 0,
            xp: 0,
            inventory: '',
            size: 0,
            edges: [],
            weapons: [],
            powers: [],
            hindrances: [],
            skills: []
        }
    },
    game: {
        type: Sequelize.STRING,
        defaultValue: 'Savage Worlds'
    }
})

const defaultSkill = sequelize.define('defaultSkill', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    }
})

const defaultEdge = sequelize.define('defaultEdges', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    requierments: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

const defaultWeapon = sequelize.define('defaultWeapon', {
    name: {
        type: Sequelize.STRING
    },
    notes: {
        type: Sequelize.STRING
    },
    damage: {
        type: Sequelize.STRING
    },
    range: {
        type: Sequelize.STRING
    },
    weight: {
        type: Sequelize.STRING
    },
    armorPiece: {
        type: Sequelize.STRING,
        allowNull: true
    },
    rateOfFire: {
        type: Sequelize.STRING
    }
})

const defaultPower = sequelize.define('defaultPower', {
    name: {
        type: Sequelize.STRING
    },
    effect: {
        type: Sequelize.TEXT
    },
    cost: {
        type: Sequelize.STRING
    },
    duration: {
        type: Sequelize.STRING
    },
    range: {
        type: Sequelize.STRING
    }
})

const defaultHindrance = sequelize.define('defaultHindrance', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    cost: {
        type: Sequelize.STRING
    }
})

User.hasMany(Character)
Character.belongsTo(User)

sequelize.sync()

export { User, Character, defaultSkill, defaultEdge, defaultWeapon, defaultPower, defaultHindrance }