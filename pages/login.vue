<template>
    <div class="w-screen flex justify-center items-center">
        <UForm :state="registrerData" :schema="schema" class="space-y-4 p-8 bg-neutral-800 rounded-2xl" @submit="submit">
            <UFormGroup label="Логин" name="login">
                <UInput placeholder="Логин" v-model="registrerData.login" />
            </UFormGroup>

            <UFormGroup label="Пароль" name="password">
                <UInput type="password" placeholder="Пароль" v-model="registrerData.password" />
            </UFormGroup>

            <UButton type="submit">Зарегистрироваться</UButton>
        </UForm>
    </div>
    
</template>

<script setup lang="ts">

    import { ref } from 'vue'
    import { object, string } from 'yup'

    let registrerData = ref({
        login: '',
        password: '',
    })

    let schema = object({
        login: string().required("Введите логин"),
        password: string().required("Введите пароль"),
    })

    const submit = async () => {
        let responce = await $fetch('/api/user/authorise', {
            method: 'POST',
            body: JSON.stringify(registrerData.value)
        })

        if (!responce.token) {
            console.log(responce)
            return
        }

        localStorage.setItem('token', responce.token)
        localStorage.setItem('username', responce.username)

        window.location.href = '/'
    }
</script>