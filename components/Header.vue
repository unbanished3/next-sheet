<template>
    <div class="header flex justify-between p-2 bg-neutral-800 items-center">
        <img class="logo rounded size-12" src="" alt="logo">
        <div class="navigation flex justify-between gap-4 items-center" v-if="!isRegistered">
            <NuxtLink to="/register">Зарегистрироваться</NuxtLink>
            <NuxtLink to="/login">Войти</NuxtLink>
        </div>
        <UDropdown :items="options" v-else>
            <UButton>{{ username }}</UButton>
        </UDropdown>
    </div>
</template>

<script setup>
    import nuxtStorage from 'nuxt-storage'

    let isRegistered = ref(!!nuxtStorage.localStorage.getData('token'))
    let username = ref(nuxtStorage.localStorage.getData('username'))

    let options = [
        {
            label: 'Мои персонажи', to: '/'
        },
        {
            label: 'Выйти', click: () => {
                localStorage.removeItem('token'); 
                isRegistered.value = false
            }
        }
    ]
</script>