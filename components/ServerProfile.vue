<template>
    <UContainer class="w-screen flex justify-center items-center md:pt-32 pt-2">
        <UContainer v-if="pending" class="w-full flex justify-center items-center">
            <UButton>Загрузка...</UButton>
        </UContainer>
        <UCard class="md:w-1/2 lg:w-1/3 w-full text-center" v-else>
            <template #header>
                Персонажи
            </template>

            <UContainer class="!p-0 space-y-4">
                <UContainer v-for="character in data" class="flex justify-between w-full !px-0">
                    <ULink :to="`/character/${character.id}`" class="hover:text-primary">{{ character.name }}</ULink>
                    <UButton @click="deleteCharacter(character.id)">Удалить</UButton>
                </UContainer>
            </UContainer>

            <template #footer>
                <UButton @click="createCharacter()" >Создать персонажа</UButton>
            </template>
        </UCard>
    </UContainer>
    
</template>

<script setup>
    import { useRouter } from 'vue-router'

    let token = useCookie('token')
    let router = useRouter()

    let { data, refresh, pending } = await useFetch('/api/character/all', {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })

    const deleteCharacter = async (id) => {
        let responce = await $fetch(`/api/character/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })

        if(responce.message === 'Character deleted') {
            refresh()
        }
    }

    const createCharacter = async () => {
        let responce = await $fetch('/api/character/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })

        if(responce.id){
            router.push(`/character/${responce.id}`)
        }
    }
</script>