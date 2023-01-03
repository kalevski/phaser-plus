import md5 from 'md5'

class ServiceRegistry {

    /**
     * @private
     * @type {Map<string,Object>}
     */
    services = new Map()

    /**
     * @template T
     * @param {new T} serviceClass 
     * @returns {T}
     */
    resolve(serviceClass) {
        let key = this.getServiceType(serviceClass)
        if (this.services.has(key)) {
            return this.services.get(key) || null
        }
        let service = new serviceClass()
        this.services.set(key, service)
        return service
    }

    /**
     * 
     * @param {typeof Object} serviceClass 
     */
    dispose(serviceClass) {
        let key = this.getServiceType(serviceClass)
        this.services.delete(key)
    }

    disposeAll() {
        this.services.clear()
    }

    /**
     * @private
     * @param {typeof Object} serviceClass 
     */
    getServiceType(serviceClass) {
        if (typeof serviceClass !== 'function') {
            throw new Error(`provided serviceClass is not a class`)
        }
        return md5(serviceClass.toString())
    }

}

export default ServiceRegistry