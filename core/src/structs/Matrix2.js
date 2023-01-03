import { Math as M } from 'phaser'

class Matrix2 extends Float32Array {

    /**
     * @readonly
     */
    PRECISION = 10000

    /** @type {Float32Array} */
    adjoint = new Float32Array(4)

    /** @type {Matrix2} */
    inverse = null

    /** @type {number} */
    determinant = 0

    /**
     * 
     * @param {number} v00 
     * @param {number} v01 
     * @param {number} v10 
     * @param {number} v11 
     * @param {Matrix2} inverse 
     */
    constructor(v00 = 1, v01 = 1, v10 = 1, v11 = 1, inverse = null) {
        super(4)
        this.setValues(v00, v01, v10, v11, inverse)
    }

    get v00() {
        return this[0]
    }

    get v01() {
        return this[1]
    }

    get v10() {
        return this[2]
    }

    get v11() {
        return this[3]
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {M.Vector2} out 
     * @returns {M.Vector2}
     */
    translate(x, y, out = new M.Vector2()) {
        out.x = Math.round((x * this[0] + y * this[1]) * this.PRECISION) / this.PRECISION
        out.y = Math.round((x * this[2] + y * this[3]) * this.PRECISION) / this.PRECISION
        return out
    }

    /**
     * 
     * @param {number} v00 
     * @param {number} v01 
     * @param {number} v10 
     * @param {number} v11 
     * @param {Matrix2} [inverse] 
     * @returns 
     */
    setValues(v00, v01, v10, v11, inverse = null) {
        this[0] = v00
        this[1] = v01
        this[2] = v10
        this[3] = v11

        this.adjoint[0] = v11
        this.adjoint[1] = -v01
        this.adjoint[2] = -v10
        this.adjoint[3] = v00

        this.determinant = 1 / (this[0] * this[3] - this[1] * this[2])

        if (inverse !== null) {
            this.inverse = inverse
            return
        }

        let i00 = this.adjoint[0] * this.determinant
        let i01 = this.adjoint[1] * this.determinant
        let i10 = this.adjoint[2] * this.determinant
        let i11 = this.adjoint[3] * this.determinant
        
        this.inverse = new Matrix2(i00, i01, i10, i11, this)
    }

}

/**
 * 
 * @param {number} size 
 */
Matrix2.createISO = (size = 64) => {
    return new Matrix2(size, -size, size / 2, size / 2)
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} angleX 
 * @param {number} angleY 
 */
Matrix2.create = (x = 1, y = 1, angleX = 0, angleY = 0) => {
    let vectorA = new M.Vector2(x, 0)
    let vectorB = new M.Vector2(0, y)
    vectorA.rotate(M.DegToRad(angleX))
    vectorB.rotate(M.DegToRad(angleY))
    return new Matrix2(vectorA.x, vectorA.y, vectorB.x, vectorB.y)
}

export default Matrix2