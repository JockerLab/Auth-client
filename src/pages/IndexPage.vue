<template>
  <q-page class="row items-center justify-evenly">
    <info-component></info-component>
  </q-page>
</template>

<script lang="ts">
  import InfoComponent from 'components/InfoComponent.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'IndexPage',
    components: { InfoComponent },
  });
</script>
