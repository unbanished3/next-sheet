<script setup>

    let id = useRoute().params.id

    let router = useRouter()

    let token = useCookie('token')
    if(!token.value) {
        router.push('/')
    }

    let { data : character} = await useFetch(`/api/character/${id}`, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        },
        method: 'GET',
    })

    console.log(character.value)

    let isLoading = ref(false)

    watch(character, () => {

        if(isLoading.value){
            return
        }

        isLoading.value = true

        $fetch(`/api/character/update/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.value}`
            },
            body: character.value.data
        })

        isLoading.value = false
    }, {deep: true})
</script>

<template>
    <SavageSheet v-model:character="character"/>
</template>