<script setup>

    let router = useRouter()

    let characters = localStorage.getItem('characters');
    let data = ref(characters ? JSON.parse(characters) : []);

    watch(data, () => {
        localStorage.setItem('characters', JSON.stringify(data.value))
    }, { deep: true })

    const getNextId = () => {
        if(!data.value.length) {
            return 1
        }

        let ids = data.value.map(character => character.id)
        
        return Math.max(...ids) + 1
    }

    const createCharacter = () => {
        let id = getNextId()

        let newCharacter = {
            data:{
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
            },
            game: 'savage'
        }

        data.value.push({ ...newCharacter, id })

        router.push(`/local/${id}`)
    }

    const deleteCharacter = (id) => {
        data.value = data.value.filter(character => character.id !== id)
    }
</script>

<template>
    <UContainer class="w-screen flex justify-center items-center md:pt-32 pt-2">
        <UCard class="md:w-1/2 lg:w-1/3 w-full text-center">
            <template #header>
                Персонажи
            </template>

            <UContainer class="!p-0 space-y-4">
                <UContainer v-for="character in data" class="flex justify-between w-full !px-0">
                    <ULink :to="`/local/${character.id}`" class="hover:text-primary">{{ character.data.name }}</ULink>
                    <UButton @click="deleteCharacter(character.id)">Удалить</UButton>
                </UContainer>
            </UContainer>

            <template #footer>
                <UButton @click="createCharacter()" >Создать персонажа</UButton>
            </template>
        </UCard>
    </UContainer>
</template>