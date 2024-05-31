<template>
    <div class="flex flex-row items-center space-x-4">
        <Icon 
            :name="icon_list[value - 1]" 
            size="1.7rem" 
            class="hover:invert-[0.3] hover:sepia-[1] cursor-pointer" 
            @click="toast.add({title: diceThrow(value, modifier)})"
        />
        <URadioGroup v-model="value" :options="options" class="group"/>
        <UInput type="number" class="w-16" color="gray" v-model="modifier"/>
    </div>
    
</template>

<script setup>
    import { diceThrow } from '../../utils/diceThrow.js'

    const options = [
        {value: 1, label: ''},
        {value: 2, label: ''},
        {value: 3, label: ''},
        {value: 4, label: ''},
        {value: 5, label: ''}
    ]

    const icon_list = [
        "mdi:dice-d4-outline",
        "mdi:dice-d6-outline",
        "mdi:dice-d8-outline",
        "mdi:dice-d10-outline",
        "mdi:dice-d12-outline",
        "mdi:dice-d20-outline"
    ]

    const value = defineModel("attribute")
    const modifier = defineModel("modifier")

    const toast = useToast()
</script>

<style scoped>
    .group *, .group{
        display: flex !important;
        flex-direction: row !important;
        gap: 0.3rem !important;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }
</style>