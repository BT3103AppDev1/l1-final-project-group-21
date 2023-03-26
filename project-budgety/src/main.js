import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import router from "./router/index.js";

import './assets/main.css'

library.add(fas);

createApp(App).component("fa", FontAwesomeIcon).use(router).mount("#app");
// createApp(App).mount("#app");
