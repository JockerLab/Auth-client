<template>
    <q-page class="row items-center justify-evenly">
        <register-component></register-component>
    </q-page>
</template>
  
<script lang="ts">
import RegisterComponent from 'components/RegisterComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'RegisterPage',
    components: { RegisterComponent },
});
</script>
  