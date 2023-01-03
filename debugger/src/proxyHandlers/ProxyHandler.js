/**
 * @template T
 */
class ProxyHandler {

    /**
     * @protected
     * @type {T}
     */
    ref = null

    /**
     * @protected
     * @type {Array<ProxyHandler<T>>}
     */
    proxyList = []

    /**
     * 
     * @param {T} ref 
     */
    setRef(ref) {
        this.ref = ref
        for (let child of this.proxyList) {
            child.setRef(ref)
        }
    }

    /**
     * @returns {T}
     */
    getRef() {
        return this.ref
    }

    removeRef() {
        this.ref = null
        for (let child of this.proxyList) {
            child.removeRef()
        }
    }

}

export default ProxyHandler