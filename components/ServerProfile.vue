<template>
    <UContainer class="w-screen flex justify-center items-center md:pt-32 pt-2">
        <UCard class="md:w-1/2 lg:w-1/3 w-full text-center">
            <template #header>
                Персонажи
            </template>

            <UContainer class="!p-0 space-y-4">
                <UContainer v-for="character in data" class="flex justify-between w-full !px-0">
                    <ULink :to="`/character/${character.id}`" class="hover:text-primary">{{ character.name }}</ULink>
                    <UButton>Удалить</UButton>
                </UContainer>
            </UContainer>

            <template #footer>
                <UButton @click="createCharacter()" >Создать персонажа</UButton>
            </template>
        </UCard>
    </UContainer>
    
</template>

<script setup>
    let token = useCookie('token')

    let { data } = await useFetch('/api/character/all', {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })

    const createCharacter = async () => {
        let responce = await $fetch('/api/character/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })

        console.log(responce)
    }
</script>