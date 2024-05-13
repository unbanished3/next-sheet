<template>
    <div>
        <main>
            <h1 class="text-3xl font-bold underline">Fuck You</h1>
        </main>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import nuxtStorage from 'nuxt-storage'

let username = ref(nuxtStorage.localStorage.getData('username'))
</script>