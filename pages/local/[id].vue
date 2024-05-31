<script setup>
    let id = useRoute().params.id
    let router = useRouter()

    let characters = localStorage.getItem('characters');
    let character = ref(characters ? JSON.parse(characters).find((char) => char.id == id) : null);

    if(!character.value) {
        router.push('/')
    }

    watch(character, () => {

        let old_characters = JSON.parse(localStorage.getItem('characters'));

        let old_character = old_characters.find((char) => char.id == id)

        old_characters.splice(old_characters.indexOf(old_character), 1, character.value)

        localStorage.setItem('characters', JSON.stringify(old_characters))

    }, { deep: true })

</script>

<template>
    <SavageSheet v-model:character="character"/>
</template>