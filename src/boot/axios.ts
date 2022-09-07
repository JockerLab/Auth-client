import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.SERVER_URL });

api.interceptors.request.use((config) => {
    if (localStorage.getItem('access_token') && config.headers) {
        config.headers.Authorization = `bearer ${localStorage.getItem('access_token')}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default boot(({ app }) => {
    app.config.globalProperties.$axios = axios
    app.config.globalProperties.$api = api
})

export { axios, api }