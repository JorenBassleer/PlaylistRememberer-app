import { createApp } from 'vue';
import { createPinia } from 'pinia';
import setupVueQuery from './plugins/vueQuery';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

setupVueQuery(app);

app.use(createPinia());
app.use(router);

app.mount('#app');
