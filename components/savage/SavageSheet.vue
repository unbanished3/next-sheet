<template>

    <SavageSlideover 
        v-model:slideoverMode="isSlideoverOpen"
        :addSkill="addSkill"
        :addEdge="addEdge"
        :addPower="addPower"
        :addHindrance="addHindrance"
        :addWeapon="addWeapon"
    />

    <div class="w-screen flex justify-center items-center">
        <div class="w-full md:w-2/3 flex justify-center flex-col gap-4 md:pt-24">
            <div class="w-full flex flex-row gap-4 flex-wrap items-stretch justify-stretch ">
                <UCard class="flex-grow">
                    <template #header>
                        <div class="text-center">
                            Аттрибуты
                        </div>
                        
                    </template>

                    <UContainer class="flex flex-col space-y-2 !px-0">
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Сила</label>
                            <DiceArray v-model:attribute="character.data.strength" v-model:modifier="character.data.strength_mod"/>
                        </div>
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Ловкость</label>
                            <DiceArray v-model:attribute="character.data.agility" v-model:modifier="character.data.agility_mod"/>
                        </div>
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Смекалка</label>
                            <DiceArray v-model:attribute="character.data.smarts" v-model:modifier="character.data.smarts_mod"/>
                        </div>
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Воля</label>
                            <DiceArray v-model:attribute="character.data.spirit" v-model:modifier="character.data.spirit_mod"/>
                        </div>
                        <div class="w-full flex flex-row justify-between space-x-8">
                            <label>Телосложение</label>
                            <DiceArray v-model:attribute="character.data.vigor" v-model:modifier="character.data.vigor_mod"/>
                        </div>
                    </UContainer>
                    
                </UCard>

                <UCard  class="flex-grow">
                    <template #header>
                        <div class="text-center">
                            Параметры
                        </div>
                    </template>

                    <UContainer class="flex flex-col space-y-2 !px-0">
                        <UInput v-model="character.data.name" label="Имя" color="gray" placeholder="Имя"/>
                        <UInput v-model="character.data.race" label="Раса" color="gray" placeholder="Раса"/>
                        <UInput v-model="character.data.bennies" label="Фишки" color="gray" placeholder="Фишки"/>
                        <UInput v-model="character.data.size" label="Размер" color="gray" placeholder="Размер"/>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Скорость:</span>
                            <UInput v-model="character.data.pace" type="number" color="gray" :disabled="character.data.calculate_pace"/>
                        </label>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Паррирование:</span>
                            <UInput v-model="character.data.parry" type="number" color="gray" ref="parry_field" :disabled="character.data.calculate_parry"/>
                        </label>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Прочность:</span>
                            <UInput v-model="character.data.thoughtness" type="number" color="gray" ref="thoughtness_field" :disabled="character.data.calculate_thoughtness"/>
                        </label>
                    </UContainer>

                </UCard>

                <UCard class="flex-grow">
                    <template #header>
                        <div class="text-center">
                            Настройки
                        </div>
                    </template>

                    <UContainer class="flex flex-col space-y-2 !px-0">
                        <label class="flex flex-row justify-between gap-2">
                            <span>Расчитать скорость:</span>
                            <UCheckbox v-model="character.data.calculate_pace" color="primary" />
                        </label>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Расчитать парирование:</span>
                            <UCheckbox v-model="character.data.calculate_parry" color="primary" />
                        </label>
                        <label class="flex flex-row justify-between gap-2">
                            <span>Расчитать прочность:</span>
                            <UCheckbox v-model="character.data.calculate_thoughtness" color="primary" />
                        </label>
                        <UButton @click="isSlideoverOpen = true" v-if="!isSlideoverOpen">Открыть меню</UButton>
                        <UButton @click="isSlideoverOpen = false" v-if="isSlideoverOpen">Закрыть меню</UButton>
                    </UContainer>
                </UCard>

                <UCard  class="flex-grow">
                    <template #header>
                        <div class="text-center">
                            Навыки
                        </div>
                    </template>

                    <UContainer class="flex flex-col gap-14 md:gap-4 !px-0">

                        <UContainer class="flex md:flex-row gap-4 !px-0 md:items-center flex-col items-stretch" v-for="skill, index in character.data.skills">

                            <UInput v-model="character.data.skills[index].name" label="Название" color="gray" placeholder="Название"/>

                            <div class="flex flex-row justify-between gap-4 items-center">
                                <DiceArray v-model:attribute="character.data.skills[index].score" v-model:modifier="character.data.skills[index].mod"/>
                                <Icon name="ic:baseline-delete" class="cursor-pointer" @click="character.data.skills.splice(index, 1)" size="1.5rem"/>
                            </div>

                        </UContainer>
                    </UContainer>
                    

                    <template #footer>
                        <div class="flex flex-row justify-center">   
                            <UButton @click="addSkill()">Добавить навык</UButton>
                        </div>
                    </template>
                </UCard>

                <UCard  class="flex-grow">
                    <template #header>
                        <div class="text-center">
                            Инвентарь
                        </div>
                    </template>

                    <UContainer class="flex flex-col gap-4 !px-0 h-full">
                        <UTextarea v-model="character.data.inventory" size="lg" label="Инвентарь" color="gray" placeholder="Инвентарь" autoresize/>
                    </UContainer>
                </UCard>

                <UCard  class="flex-grow">
                    <template #header>
                        <div class="text-center">
                            Черты
                        </div>
                    </template>

                    <UContainer class="flex flex-col gap-4 !px-0 !pt-0">
                        <div class="w-full text-center flex flex-col gap-4">
                            <label>Недостатки</label>
                            <li v-for="hindrance, index in character.data.hindrances" class="list-none flex flex-row items-center gap-4 mx-2">
                                <UInput v-model="character.data.hindrances[index].name" label="Недостаток" color="gray" placeholder="Недостаток" class="flex-grow"/>
                                <Icon name="ic:baseline-delete" class="cursor-pointer" @click="character.data.hindrances.splice(index, 1)" size="1.5rem"/>
                            </li>
                            <UButton @click="addHindrance()">Добавить недостаток</UButton>
                        </div>
                        <UDivider />
                        <div class="w-full text-center flex flex-col gap-4">
                            <label>Черты</label>
                            <li v-for="trait, index in character.data.edges" class="list-none flex flex-row items-center gap-4 mx-2">
                                <UInput v-model="character.data.edges[index].name" label="Черта" color="gray" placeholder="Черта" class="flex-grow"/>
                                <Icon name="ic:baseline-delete" class="cursor-pointer" @click="console.log(character.data.edges)" size="1.5rem"/>
                            </li>
                            <UButton @click="addEdge()">Добавить черту</UButton>
                        </div>
                    </UContainer>
                </UCard>
            </div>
            <div>
                <UCard>
                    <template #header>
                        <div class="text-center">
                            Способности
                        </div>
                    </template>

                    <UContainer class="flex flex-col gap-6 !px-0 h-full">
                        <UContainer class="flex flex-row gap-2 !px-0 !pt-0 !mx-6 items-center justify-center" v-for="power, index in character.data.powers">
                            <UInput v-model="character.data.powers[index].name" label="Способность" color="gray" placeholder="Способность" class="flex-grow"/>
                            <UInput v-model="character.data.powers[index].duration" label="Длительность" color="gray" placeholder="Длительность" class="flex-grow"/>
                            <UInput v-model="character.data.powers[index].range" label="Стоимость" color="gray" placeholder="Стоимость" class="flex-grow"/>
                            <UInput v-model="character.data.powers[index].effect" label="Эффект" color="gray" placeholder="Эффект" class="flex-grow"/>
                            <Icon name="ic:baseline-delete" class="cursor-pointer" @click="character.data.powers.splice(index, 1)" size="1.5rem"/>
                        </UContainer>
                    </UContainer>

                    <template #footer>
                        <div class="flex flex-row justify-center">   
                            <UButton @click="addPower()">Добавить способность</UButton>
                        </div>
                    </template>
                </UCard>
            </div>

            <div>
                <UCard>
                    <template #header>
                        <div class="text-center">
                            Оружие
                        </div>
                    </template>

                    <UContainer class="flex flex-col gap-6 !px-0 h-full">
                        <UContainer class="flex flex-row gap-2 !px-0 !pt-0 !mx-6 items-center justify-center" v-for="weapon, index in character.data.weapons">
                            <UInput v-model="character.data.weapons[index].name" label="Оружие" color="gray" placeholder="Оружие" class="flex-grow"/>
                            <UInput v-model="character.data.weapons[index].damage" label="Урон" color="gray" placeholder="Урон" class="flex-grow"/>
                            <UInput v-model="character.data.weapons[index].range" label="Дистанция" color="gray" placeholder="Дистанция" class="flex-grow"/>
                            <UInput v-model="character.data.weapons[index].weight" label="Вес" color="gray" placeholder="Вес" class="flex-grow"/>
                            <UInput v-model="character.data.weapons[index].rateOfFire" label="Скорострельность" color="gray" placeholder="Скорострельность" class="flex-grow"/>
                            <UInput v-model="character.data.weapons[index].notes" label="Инфо" color="gray" placeholder="Инфо" class="flex-grow"/>
                            <Icon name="ic:baseline-delete" class="cursor-pointer" @click="character.data.weapons.splice(index, 1)" size="1.5rem"/>
                        </UContainer>
                    </UContainer>

                    <template #footer>
                        <div class="flex flex-row justify-center">   
                            <UButton @click="addWeapon()">Добавить оружие</UButton>
                        </div>
                    </template>
                </UCard>
            </div>
            
        </div>
    </div>
</template>

<script setup>

    let character = defineModel('character')

    let calculated_pace = computed(() => {
        return 6;
    })

    let calculated_parry = computed(() => {
        if(character.value.data.skills["fighting"]) {
            return character.value.data.skills["fighting"].score + 3
        }
        return 2
    })

    let calculated_thoughtness = computed(() => {
        return character.value.data.vigor + 3
    })

    let pace_field = ref(null)
    let parry_field = ref(null)
    let thoughtness_field = ref(null)

    let isSlideoverOpen = ref(false)

    const addSkill = (name = "") => {

        if(!character.value.data.skills || !Array.isArray(character.value.data.skills)) {
            character.value.data.skills = []
        }

        character.value.data.skills.push({
            name,
            score: 1,
            mod: 0
        })
    }

    const addHindrance = (name = "") => {

        if(!character.value.data.hindrances || !Array.isArray(character.value.data.hindrances)) {
            character.value.data.hindrances = []
        }

        character.value.data.hindrances.push({
            name
        })
    }

    const addEdge = (name = "", description = "") => {

        if(!character.value.data.edges || !Array.isArray(character.value.data.edges)) {
            character.value.data.edges = []
        }

        character.value.data.edges.push({
            name,
            description
        })
    }

    const addPower = (name = "", duration = "", range = "", effect = "", cost = "") => {

        if(!character.value.data.powers || !Array.isArray(character.value.data.powers)) {
            character.value.data.powers = []
        }

        character.value.data.powers.push({
            name,
            duration,
            range,
            effect,
            cost
        })
    }

    const addWeapon = (name = "", damage = "", range = "", weight = "", rateOfFire = "", notes = "") => {

        if(!character.value.data.weapons || !Array.isArray(character.value.data.weapons)) {
            character.value.data.weapons = []
        }

        character.value.data.weapons.push({
            name,
            damage,
            range,
            weight,
            rateOfFire,
            notes
        })
    }

    watch(character, () => {
        if(character.value.data.calculate_pace) {
            character.value.data.pace = calculated_pace.value
        }
        if(character.value.data.calculate_parry) {
            character.value.data.parry = calculated_parry.value
        }
        if(character.value.data.calculate_thoughtness) {
            character.value.data.thoughtness = calculated_thoughtness.value
        }
    }, { deep: true })
</script>