<template>
    <div class="header flex justify-between p-2 bg-neutral-800 items-center">
        <img class="logo rounded h-12 cursor-pointer" src="/logo.png" alt="logo" @click="router.push('/')">
        <div class="navigation flex justify-between gap-4 items-center" v-if="!token">
            <NuxtLink to="/register">Зарегистрироваться</NuxtLink>
            <NuxtLink to="/login">Войти</NuxtLink>
        </div>
        <UDropdown :items="options" v-else>
            <UButton>Опции</UButton>
        </UDropdown>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'

    let router = useRouter()

    let token = useCookie('token')
    let username = useCookie('username')

    let options = [
        [
            {
                label: 'Выйти',
                click: () => {
                    token.value = undefined
                    username.value = ''
                    router.push('/')
                }
            },
            {
                label: 'Профиль',
                to: '/'
            }
        ]
    ]
</script>