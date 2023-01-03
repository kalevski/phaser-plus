import GameObject2D from './GameObject2D'

/**
 * @callback SortFn
 * @param {GameObject2D} objectA
 * @param {GameObject2D} objectB
 * @returns {number}
 */

class DepthOrder {

    /**
     * @private
     * @type {string}
     */
    sortFn = 'normalSort'

    setup() {
        this.sortFn = 'normalSort'
    }

    disable() {
        this.sortFn = 'disabledSort'
    }

    set(inverseX = false, inverseY = false) {
        if (!inverseX && !inverseY) {
            this.sortFn = 'normalSort'
        } else if (inverseX && !inverseY) {
            this.sortFn = 'inverseXSort'
        } else if (!inverseX && inverseY) {
            this.sortFn = 'inverseYSort'
        } else if (inverseX && inverseY) {
            this.sortFn = 'inverseSort'
        }
    }

    /**
     * @private
     * @type {SortFn}
     */
    normalSort = (objectA, objectB) => {
        let orderY = objectA.pivot.y - objectB.pivot.y
        if (orderY !== 0) {
            return orderY
        }
        return objectA.pivot.x - objectB.pivot.x
    }

    /**
     * @private
     * @type {SortFn}
     */
    inverseXSort = (objectA, objectB) => {
        let orderY = objectA.pivot.y - objectB.pivot.y
        if (orderY !== 0) {
            return orderY
        }
        return objectB.pivot.x - objectA.pivot.x
    }

    /**
     * @private
     * @type {SortFn}
     */
    inverseYSort = (objectA, objectB) => {
        let orderY = objectB.pivot.y - objectA.pivot.y
        if (orderY !== 0) {
            return orderY
        }
        return objectA.pivot.x - objectB.pivot.x
    }

    /**
     * @private
     * @type {SortFn}
     */
    inverseSort = (objectA, objectB) => {
        let orderY = objectB.pivot.y - objectA.pivot.y
        if (orderY !== 0) {
            return orderY
        }
        return objectB.pivot.x - objectA.pivot.x
    }

    /**
     * @private
     * @type {SortFn}
     */
    disabledSort = () => {}

    get fn() {
        return this[this.sortFn]
    }

}

export default DepthOrder