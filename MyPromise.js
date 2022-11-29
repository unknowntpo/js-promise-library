const STATE = {
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
    PENDING: 'pending'
}

// Ref: https://www.youtube.com/watch?v=1l4wHWQCCIc
class MyPromise {
    #thenCbs = []
    #catchCbs = []
    #state = STATE.PENDING
    #value
    // binding: 13:55
    // Why we need to bind this ?
    #onSuccessBind = this.#onSuccess.bind(this)
    #onFailBind = this.#onFail.bind(this)

    constructor(cb) {
        try {
            cb(this.#onSuccessBind, this.#onFailBind)
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

    then(thenCb, catchCb) {
        if (thenCb != null) this.#thenCbs.push(thenCb)
        if (catchCb != null) this.#catchCbs.push(catchCb)

        // Why run callbacks here ?
        this.#runCallbacks()
    }

    catch(cb) {
        this.then(undefined, cb)
    }

    finally(cb) {

    }
}

module.exports = MyPromise

// Example usage

// const p = new MyPromise((resolve, reject) => {
//     resolve('OK')
//     reject('FAIL')
// }).then()