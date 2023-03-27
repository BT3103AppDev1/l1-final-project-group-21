import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import router from "./router/index.js";

import "./assets/main.css";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

library.add(fas);

createApp(App)
	.component("EasyDataTable", Vue3EasyDataTable)
	.component("fa", FontAwesomeIcon)
	.use(router)
	.mount("#app");
// createApp(App).mount("#app");
