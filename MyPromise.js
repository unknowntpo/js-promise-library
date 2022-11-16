const STATE = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
}
class myPromise {
    #thenCbs = []
    #state = PENDING

    constructor(cb) {
        try {
            cb(this.#onSuccess, this.#onFail)
        } catch (e) {
            this.#onFail(e)
        }
    }

    #onSuccess(value) {
        // resolve should be handled only once 
        if (this.#state !== STATE.PENDING) return
        this.#value = value
        this.#state = STATE.FULFILLED
    }

    #onFail(value) {
        // reject should be handled only once 
        if (this.#state !== STATE.PENDING) return
        this.#value = value
        this.#state = STATE.REJECTED
    }

    then(cb) {
        this.#thenCbs.push(cb)
    }
}

module.exports = MyPromise

// Example usage

const p = new MyPromise((resolve, reject) => {
    resolve('OK')
    reject('FAIL')
}).then()

p.then()
p.then()
