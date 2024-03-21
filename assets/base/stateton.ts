


export class Stateton<T> {


    _data:T;

    get data() {
        return this._data
    }

    set data(val) {
        console.log('val',val);
        let oldVal = this._data;
        this._data = val;
        this.events.forEach((el)=>{
            el(val,oldVal)
        })
    }

    constructor(val:T) {
        this._data = val;
    }



    events:Set<(newVal:T,oldVal?:T)=>void> = new Set();

    registerEvents(fn:((newVal:T,oldVal?:T)=>void)[]) {
        fn.forEach(el=>{
            this.events.add(el)
        })
        
    }

    deleteEvents(fn:(newVal:T,oldVal?:T)=>void) {
        if(this.events.has(fn)) {
            this.events.delete(fn)
        } else {
            console.warn('不存在此事件')
        }
        
    }


}

