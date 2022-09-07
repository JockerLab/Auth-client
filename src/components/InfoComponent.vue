<template>
    <q-page class="row items-center">
        <div class="row justify-center q-pa-md">
            <q-list class="q-gutter-md col q-mr-xl">
                <div class="text-h5 q-mb-x">Actual info:</div>
                <q-item v-for="(key, value) in userInfo" :key="key">
                    <q-item-section class="">
                        <q-item-label>{{ value }}: {{ key }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <q-form class="q-gutter-md col-md-7">
                <q-input filled v-model="name" label="Name" />

                <q-input filled v-model="address" label="Address" />

                <q-input filled v-model="phone" label="Phone" />

                <q-input filled type="textarea" v-model="about" label="About" rows="7" />

                <div class="row">
                    <q-btn label="Get" color="primary" class="col" @click="getInfo" />
                    <q-btn @click="createInfo" :disable="!isCreateAvailable" label="Create" color="primary"
                        class="col q-ml-sm" />
                    <q-btn @click="editInfo" :disable="isCreateAvailable" label="Edit" color="primary"
                        class="col q-ml-sm" />
                    <q-btn @click="deleteInfo" :disable="isCreateAvailable" label="Delete" color="primary"
                        class="col q-ml-sm " />
                </div>

                <q-list class="row" style="width: 20vmax; color: red">
                    <q-item v-for="error in errors" :key="error">
                        <q-item-section>
                            <q-item-label>{{ error.constraints[Object.keys(error.constraints)[0]] }};</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { ref, Ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const name = ref(null)
        const address = ref(null)
        const phone = ref(null)
        const about = ref(null)
        const userInfo = ref({})
        const errors: Ref<string[]> = ref([])
        let isCreateAvailable = ref(true)

        async function onCreateLoad() {
            try {
                const response = await api.get('/user');
                if (response.data.name === null &&
                    response.data.address === null &&
                    response.data.phone === null &&
                    response.data.about === null) {
                    isCreateAvailable.value = true;
                } else {
                    isCreateAvailable.value = false;
                }
            } catch (error) {
                router.push({ path: '/login' });
            }
        }

        setTimeout(async () => await onCreateLoad(), 0);

        return {
            name,
            address,
            phone,
            about,
            userInfo,
            errors,
            isCreateAvailable,
            async getInfo() {
                errors.value = [];
                try {
                    const response = await api.get('/user');
                    userInfo.value = {
                        name: response.data.name,
                        address: response.data.address,
                        phone: response.data.phone,
                        about: response.data.about
                    };
                } catch (error) {
                    router.push({ path: '/login' });
                }
            },
            async createInfo() {
                errors.value = [];
                try {
                    const currentInfo = {
                        name: name.value,
                        address: address.value,
                        phone: phone.value,
                        about: about.value
                    };
                    const response = await api.post('/user', currentInfo);

                    if (Array.isArray(response.data)) {
                        errors.value = response.data;
                        return;
                    }

                    userInfo.value = currentInfo;
                    isCreateAvailable.value = false;
                } catch (error) {
                    router.push({ path: '/login' });
                }
            },
            async editInfo() {
                errors.value = [];
                try {
                    const newInfo = {
                        name: name.value,
                        address: address.value,
                        phone: phone.value,
                        about: about.value
                    };
                    const currentInfo = await api.get('/user');
                    const response = await api.put('/user', newInfo);

                    if (Array.isArray(response.data)) {
                        errors.value = response.data;
                        return;
                    }

                    if (!name.value) newInfo.name = currentInfo.data.name;
                    if (!address.value) newInfo.address = currentInfo.data.address;
                    if (!phone.value) newInfo.phone = currentInfo.data.phone;
                    if (!about.value) newInfo.about = currentInfo.data.about;
                    userInfo.value = newInfo;
                } catch (error) {
                    router.push({ path: '/login' });
                }
            },
            async deleteInfo() {
                errors.value = [];
                try {
                    await api.delete('/user');
                    userInfo.value = {};
                    isCreateAvailable.value = true;
                } catch (error) {
                    router.push({ path: '/login' });
                }
            }
        }
    }
}
</script>
