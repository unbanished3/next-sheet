<script setup>
    let slideoverMode = defineModel('slideoverMode')

    let { data: defaults } = useFetch('/api/default')

    if(!defaults.value) {
        slideoverMode.value = false
    } else {
        console.log(defaults.value)
    }

    let mode = ref('skills')

    const { addSkill, addEdge, addPower, addHindrance, addWeapon}  = defineProps(["addSkill", "addEdge", "addPower", "addHindrance", "addWeapon"])
</script>

<template>
    <USlideover v-model="slideoverMode" :overlay="false">

        <UCard class="">
            <template #header>
                <div class="flex flex-row flex-wrap justify-between gap-2">
                    <UButton @click="mode = 'skills'" :variant="mode === 'skills' ? 'solid' : 'link'">Навыки</UButton>
                    <UButton @click="mode = 'edges'" :variant="mode === 'edges' ? 'solid' : 'link'">Черты</UButton>
                    <UButton @click="mode = 'powers'" :variant="mode === 'powers' ? 'solid' : 'link'">Способности</UButton>
                    <UButton @click="mode = 'hindrances'" :variant="mode === 'hindrances' ? 'solid' : 'link'">Недостатки</UButton>
                    <UButton @click="mode = 'weapons'" :variant="mode === 'weapons' ? 'solid' : 'link'">Оружие</UButton>
                </div>
            </template>

            <UContainer v-if="mode === 'skills'" class="flex flex-col gap-8 !px-0">
                <UContainer v-for="skill in defaults.skills" class="flex flex-col justify-between w-full !px-2 gap-2">
                    <div class="flex flex-row items-center justify-between">
                        <label class="font-bold">{{ skill.name }}</label>
                        <UButton @click="addSkill(skill.name)">
                            <Icon name="mdi:plus" size="1.1rem" />
                        </UButton>
                    </div>
                    <p>{{ skill.description }}</p>
                </UContainer>
            </UContainer>

            <UContainer v-if="mode === 'edges'">
                <UContainer v-for="edge in defaults.edges" class="flex flex-col justify-between w-full !px-2">
                    <div class="flex flex-row items-center justify-between">
                        <label class="font-bold">{{ edge.name }}</label>
                        <UButton @click="addEdge(edge.name, edge.description)">
                            <Icon name="mdi:plus" size="1.1rem" />
                        </UButton>
                    </div>
                    <p>{{ edge.description }}</p>
                </UContainer>
            </UContainer>

            <UContainer v-if="mode === 'powers'">
                <UContainer v-for="power in defaults.powers" class="flex flex-col justify-between w-full !px-2">
                    <div class="flex flex-row items-center justify-between">
                        <label class="font-bold">{{ power.name }}</label>
                        <label>{{ power.cost }}</label>
                        <label>{{ power.range }}</label>
                        <label>{{ power.duration }}</label>
                        <UButton @click="addPower(power.name, power.duration, power.range, power.effect, power.cost)">
                            <Icon name="mdi:plus" size="1.1rem" />
                        </UButton>
                    </div>
                    <p>{{ power.effect }}</p>
                </UContainer>
            </UContainer>

            <UContainer v-if="mode === 'hindrances'">
                <UContainer v-for="hindrance in defaults.hindrances" class="flex flex-col justify-between w-full !px-2">
                    <div class="flex flex-row items-center justify-between">
                        <label class="font-bold">{{ hindrance.name }}</label>
                        <UButton @click="addHindrance(hindrance.name, hindrance.description)">
                            <Icon name="mdi:plus" size="1.1rem" />
                        </UButton>
                    </div>
                    <p>{{ hindrance.description }}</p>
                </UContainer>
            </UContainer>

            <UContainer v-if="mode === 'weapons'">
                <UContainer v-for="weapon in defaults.weapons" class="flex flex-col justify-between w-full !px-2">
                    <div class="flex flex-row items-center justify-between">
                        <label class="font-bold">{{ weapon.name }}</label>
                        <UButton @click="addWeapon(weapon.name, weapon.damage, weapon.range, weapon.weight, weapon.rateOfFire, weapon.notes)">
                            <Icon name="mdi:plus" size="1.1rem" />
                        </UButton>
                    </div>
                    <p>{{ weapon.description }}</p>
                </UContainer>
            </UContainer>
        </UCard>
        
    </USlideover>
</template>