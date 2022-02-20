import {createApp} from 'vue';
import App from './App.vue';
import {Router} from './router';
import store from './store';

import './styles/style.scss';

/*
* APP
* */
const AppInstance = createApp(App);

/*
* USES
* */
AppInstance
  .use(store)
  .use(Router);

/*
* MOUNT
* */
AppInstance.mount('#app');
