<template>
    <div>
        <main>
            <ServerProfile v-if="isRegistered" />
            <LocalProfile v-else />
        </main>
    </div>
</template>


<script setup lang="ts">
import ServerProfile from '../components/ServerProfile.vue'
import LocalProfile from '../components/LocalProfile.vue'

let isRegistered = useCookie('token')
</script>