import { hash } from 'muka'

// const observer = {
//     subscribes: []
//     subscribe
// }

class Observer {
    // 存储订阅模式
    private subscribes: any = {}

    public subscribe(event: string, callback: (...arg: any[]) => void): void {
        const keys: string[] = Object.keys(this.subscribes)
        if (hash(keys, event)) {
            this.subscribes[event].push(callback)
        } else {
            this.subscribes[event] = [callback]
        }
    }

    public unsubscribe(event: string, callback: (...arg: any[]) => void): void {
        const keys: string[] = Object.keys(this.subscribes)
        if (hash(keys, event)) {
            const index = this.subscribes[event].indexOf(callback)
            if (index !== -1) {
                this.subscribes[event].splice(index, 1)
            }
        }
    }

    public publish(...arg: any[]) {
        const event: string = arg.splice(0, 1)[0]
        const keys: string[] = Object.keys(this.subscribes)
        if (hash(keys, event)) {
            this.subscribes[event].map((callback: () => void) => {
                callback.apply(this, arg)
            })
        }
    }

}

export default new Observer()