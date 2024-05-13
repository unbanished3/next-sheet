<template>
    <div class="w-screen flex justify-center items-center">
        <UForm :state="registrerData" :schema="schema" class="space-y-4 p-8 bg-neutral-800 rounded-2xl" @submit="submit">
            <UFormGroup label="Логин" name="login">
                <UInput placeholder="Логин" v-model="registrerData.login" />
            </UFormGroup>

            <UFormGroup label="Email" name="email">
                <UInput type="email" placeholder="Email" v-model="registrerData.email" />
            </UFormGroup>

            <UFormGroup label="Пароль" name="password">
                <UInput type="password" placeholder="Пароль" v-model="registrerData.password" />
            </UFormGroup>

            <UFormGroup label="Повторите пароль" name="passwordRepeat">
                <UInput type="password" placeholder="Повторите пароль" v-model="registrerData.passwordRepeat" />
            </UFormGroup>

            <UButton type="submit">Зарегистрироваться</UButton>
        </UForm>
    </div>
    
</template>

<script setup lang="ts">

    import { ref } from 'vue'
    import { object, string, ref as rf } from 'yup'

    let registrerData = ref({
        login: '',
        password: '',
        passwordRepeat: '',
        email: ''
    })

    let schema = object({
        login: string().required("Введите логин"),
        password: string().required("Введите пароль"),
        passwordRepeat: string().oneOf([rf("password")], "Пароли должны совпадать").required("Повторите пароль"),
        email: string().email("Введите корректный адрес электронной почты").required("Введите адрес электронной почты")
    })

    const submit = async () => {
        let responce = await $fetch('/api/user/register', {
            method: 'POST',
            body: JSON.stringify(registrerData.value)
        })

        if (!responce.token) {
            console.log(responce)
            return
        }

        localStorage.setItem('token', responce.token)
    }
</script>