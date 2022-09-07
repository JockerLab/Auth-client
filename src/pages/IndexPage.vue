<template>
    
    <q-header  class="bg-primary text-white">
        <q-toolbar class="justify-between">
            <q-toolbar-title>
                Auth App
            </q-toolbar-title>
            <q-btn @click="logout" label="log-out" color="white" text-color="black" class="q-ml-sm" />
        </q-toolbar>
    </q-header>

    <q-page class="row items-center justify-evenly">
        <info-component></info-component>
    </q-page>
</template>

<script lang="ts">
import InfoComponent from 'components/InfoComponent.vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'IndexPage',
    components: { InfoComponent },
    setup() {
        const router = useRouter();
        return {
            async logout() {
                localStorage.removeItem('access_token');
                router.push({ path: '/login' });
            }
        }
    }
});
</script>
