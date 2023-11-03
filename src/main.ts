import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/plugins/axios"
import "@/access"
import 'bytemd/dist/index.css'

const debounce = (callback: Function, delay: number) => {
    let tid: any
    return function () {
        const ctx = self
        tid && clearTimeout(tid);
        tid = setTimeout(() => {
            callback.apply(ctx, arguments)
        }, delay)
    }
}

export default () => {
    const _ = (window as any).ResizeObserver;
    (window as any).ResizeObserver = class ResizeObserver extends _ {
        constructor(callback: any) {
            callback = debounce(callback, 20)
            super(callback);
        }
    }
}
createApp(App).use(ElementPlus).use(ArcoVue).use(store).use(router).mount("#app");
