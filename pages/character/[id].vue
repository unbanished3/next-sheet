<template>
    <div class="w-screen flex justify-center items-center">
        <div class="w-full md:w-2/3 flex justify-center flex-col space-x-4 md:pt-24">
            <div class="w-full flex flex-row gap-4 flex-wrap items-stretch">
                <UCard>
                    <template #header>
                        <div class="text-center">
                            Аттрибуты
                        </div>
                        
                    </template>

                    <UContainer class="flex flex-col space-y-2 !px-0">
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Сила</label>
                            <DiceArray v-model:attribute="data.character.data.strength" v-model:modifier="data.character.data.strength_mod"/>
                        </div>
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Ловкость</label>
                            <DiceArray v-model:attribute="data.character.data.agility" v-model:modifier="data.character.data.agility_mod"/>
                        </div>
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Смекалка</label>
                            <DiceArray v-model:attribute="data.character.data.smarts" v-model:modifier="data.character.data.smarts_mod"/>
                        </div>
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Воля</label>
                            <DiceArray v-model:attribute="data.character.data.spirit" v-model:modifier="data.character.data.spirit_mod"/>
                        </div>
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Телосложение</label>
                            <DiceArray v-model:attribute="data.character.data.vigor" v-model:modifier="data.character.data.vigor_mod"/>
                        </div>
                    </UContainer>
                    
                </UCard>

                <UCard>
                    <template #header>
                        <div class="text-center">
                            Параметры
                        </div>
                    </template>

                    <UContainer class="flex flex-col space-y-2 !px-0">
                        <UInput v-model="data.character.data.name" label="Имя" color="gray" placeholder="Имя"/>
                        <UInput v-model="data.character.data.race" label="Раса" color="gray" placeholder="Раса"/>
                        <UInput v-model="data.character.data.bennies" label="Фишки" color="gray" placeholder="Фишки"/>
                        <UInput v-model="data.character.data.size" label="Размер" color="gray" placeholder="Размер"/>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Скорость:</span>
                            <UInput v-model="data.character.data.pace" type="number" color="gray" :disabled="data.character.data.calculate_pace"/>
                        </label>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Паррирование:</span>
                            <UInput v-model="data.character.data.parry" type="number" color="gray" ref="parry_field" :disabled="data.character.data.calculate_parry"/>
                        </label>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Прочность:</span>
                            <UInput v-model="data.character.data.thoughtness" type="number" color="gray" ref="thoughtness_field" :disabled="data.character.data.calculate_thoughtness"/>
                        </label>
                    </UContainer>

                </UCard>

                <UCard>
                    <template #header>
                        <div class="text-center">
                            Настройки
                        </div>
                    </template>

                    <UContainer class="flex flex-col space-y-2 !px-0">
                        <label class="flex flex-row justify-between gap-2">
                            <span>Расчитать скорость:</span>
                            <UCheckbox v-model="data.character.data.calculate_pace" color="primary" />
                        </label>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Расчитать парирование:</span>
                            <UCheckbox v-model="data.character.data.calculate_parry" color="primary" />
                        </label>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Расчитать прочность:</span>
                            <UCheckbox v-model="data.character.data.calculate_thoughtness" color="primary" />
                        </label>
                    </UContainer>
                </UCard>

                <UCard>
                    <template #header>
                        <div class="text-center">
                            Навыки
                        </div>
                    </template>

                    <UContainer class="flex flex-col gap-4 !px-0">
                        <UContainer class="flex flex-row gap-4 !px-0 items-center" v-for="skill, index in data.character.data.skills">
                            <UInput v-model="data.character.data.skills[index].name" label="Название" color="gray" placeholder="Название"/>
                            <DiceArray v-model:attribute="data.character.data.skills[index].score" v-model:modifier="data.character.data.skills[index].mod"/>
                            <Icon name="ic:baseline-delete" class="cursor-pointer" @click="data.character.data.skills.splice(index, 1)" size="1.5rem"/>
                        </UContainer>
                    </UContainer>
                    

                    <template #footer>
                        <div class="flex flex-row justify-center">   
                            <UButton @click="addSkill()">Добавить навык</UButton>
                        </div>
                    </template>
                </UCard>

                <UCard>
                    <template #header>
                        <div class="text-center">
                            Инвентарь
                        </div>
                    </template>

                    <UContainer class="flex flex-col gap-4 !px-0 h-full">
                        <UTextarea v-model="data.character.data.inventory" size="lg" label="Инвентарь" color="gray" placeholder="Инвентарь" autoresize/>
                    </UContainer>
                </UCard>

                <UCard>
                    <template #header>
                        <div class="text-center">
                            Черты
                        </div>
                    </template>

                    <UContainer class="flex flex-col gap-4 !px-0 !pt-0">
                        <div class="w-full text-center flex flex-col gap-4">
                            <label>Недостатки</label>
                            <li v-for="hindrance, index in data.character.data.hindrances" class="list-none">
                                <UInput v-model="data.character.data.hindrances[index].name" label="Недостаток" color="gray" placeholder="Недостаток"/>
                            </li>
                            <UButton @click="addHindrance()">Добавить недостаток</UButton>
                        </div>
                    </UContainer>
                </UCard>
            </div>
        </div>
    </div>
</template>

<script setup>

    let { id } = useRoute().params

    let router = useRouter()

    let token = useCookie('token')
    if(!token.value) {
        router.push('/')
    }

    let { data } = await useFetch(`/api/character/${id}`, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        },
        method: 'GET',
    })

    let calculated_pace = computed(() => {
        return 6;
    })

    let calculated_parry = computed(() => {
        if(data.value.character.data.skills["fighting"]) {
            return data.value.character.data.skills["fighting"].score + 3
        }

        return 2
    })

    let calculated_thoughtness = computed(() => {
        return data.value.character.data.vigor + 3
    })

    let pace_field = ref(null)
    let parry_field = ref(null)
    let thoughtness_field = ref(null)

    const addSkill = (name = "") => {
        data.value.character.data.skills.push({
            name,
            score: 1,
            mod: 0
        })
    }

    const addHindrance = (name = "") => {
        data.value.character.data.hindrances.push({
            name
        })
    }

    watch(data, () => {
        if(data.value.character.data.calculate_pace) {
            data.value.character.data.pace = calculated_pace.value
        }
        if(data.value.character.data.calculate_parry) {
            data.value.character.data.parry = calculated_parry.value
        }
        if(data.value.character.data.calculate_thoughtness) {
            data.value.character.data.thoughtness = calculated_thoughtness.value
        }
    }, { deep: true })
</script>