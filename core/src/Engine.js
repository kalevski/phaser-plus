import { Level } from '@toolcase/logging'
import LoggerFactory from './LoggerFactory'
import ServiceRegistry from './ServiceRegistry'

class Engine {

    /** @readonly */
    version = '0.0.1'

    /** @type {ServiceRegistry} */
    services = null

    /** @private */
    logging = new LoggerFactory()

    constructor() {
        this.logging.level = Level.VERBOSE
        this.services = new ServiceRegistry()
        this.getLogger().info(`v${this.version} initialized`)
    }

    
    /**
     * @param {string} value 
     * @returns {this}
     */
    setLogLevel(value) {
        this.logging.level = value
    }

    /**
     * 
     * @param {string} scope 
     */
    getLogger(scope = '@toolcase/phaser-plus') {
        return this.logging.getLogger(scope)
    }

}

export default Engine