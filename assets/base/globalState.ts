import Singleton from "./singleton";



export class GlobalState extends Singleton {

    /**是否能点击消除物 */
    ableClickEli:boolean = false

    static get inst() {
        return this.getInstance<GlobalState>()
    } 

    constructor() {
        super()
    }
}