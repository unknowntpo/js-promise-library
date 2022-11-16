const STATE = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
}
class MyPromise {
    #thenCbs = []
    #catchCbs = []
    #state = STATE.PENDING
    #value

    constructor(cb) {
        try {
            cb(this.#onSuccess, this.#onFail)
        } catch (e) {
            this.#onFail(e)
        }
    }

    #runCallbacks() {
        if (this.#state === STATE.FULFILLED) {
            this.#thenCbs.forEach((cb) => {
                cb(this.#value)
            })
            this.#thenCbs = []
        }

        if (this.#state === STATE.REJECTED) {
            this.#catchCbs.forEach((cb) => {
                cb(this.#value)
            })
            this.#catchCbs = []
        }
    }

    #onSuccess(value) {
        // resolve should be handled only once 
        if (this.#state !== STATE.PENDING) return
        this.#value = value
        this.#state = STATE.FULFILLED
        this.#runCallbacks()
    }

    #onFail(value) {
        // reject should be handled only once 
        if (this.#state !== STATE.PENDING) return
        this.#value = value
        this.#state = STATE.REJECTED
        this.#runCallbacks()
    }

    then(cb) {
        this.#thenCbs.push(cb)

        // Why run callbacks here ?
        this.#runCallbacks()
    }
}

module.exports = MyPromise

// Example usage

// const p = new MyPromise((resolve, reject) => {
//     resolve('OK')
//     reject('FAIL')
// }).then()