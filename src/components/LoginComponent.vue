<template>
    <div class="q-pa-md" style="max-width: 400px">

        <div class="text-h4 q-mb-xl">Log-in</div>

        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input filled v-model="name" type="email" label="Your login *" hint="Email adress" lazy-rules
                :rules="[ (val: any) => val && val.length > 0 || 'Please type something']" />

            <q-input filled type="password" v-model="password" label="Your password *" lazy-rules :rules="[
              (val: any) => val && val.length > 0 || 'Please type something'
            ]" />

            <div>
                <q-btn label="Log-in" type="submit" color="primary" />
                <span class="q-ml-sm">or</span>
                <q-btn label="Register" @click="$router.replace('/register')" color="primary" flat class="q-ml-sm" />
            </div>
            <div style="color: red;">{{ errors }}</div>
        </q-form>

    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const name = ref(null)
        const password = ref(null)
        const router = useRouter()
        const errors = ref('')

        return {
            name,
            password,
            errors,

            async onSubmit() {
                errors.value = '';
                try {
                    const response = await api.post('/login', {
                        'username': name.value,
                        'password': password.value
                    });
                    if (response.status >= 200 && response.status <= 299) {
                        router.push({ path: '/' });
                    }
                } catch (error) {
                    errors.value = 'Incorrect email or password.'
                }
            },
        }
    }
}
</script>