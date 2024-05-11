
import { createStore } from "../../../base/redux";
import Singleton from "../../../base/singleton"; 






export class State extends Singleton {
    static get inst() {
        return super.getInstance<State>()
    }

    ableSound:boolean = true;

    ableMusic:boolean = false;



}



export const global_state = createStore(State.inst);

