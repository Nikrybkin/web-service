import { boot } from "quasar/wrappers";
import bus from '../utils/bus'

declare class EventBus {
    $emit: (event: string, args: any) => void;
    $on: (event: string, fn: any) => void;
    $off: (event: string, fn: any) => void;
}
declare module 'vue/types/vue' {
    interface Vue {
        $bus: EventBus;
    }
}

export const $bus = bus;

export default boot(({Vue}) => {
    Vue.prototype.$bus = bus;
})