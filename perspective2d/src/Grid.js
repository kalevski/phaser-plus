import { generateId } from '@toolcase/base'
import { Cameras, GameObjects, Math as M } from 'phaser'
import { GameObject, Structs } from '@phaser-plus/core'

class Grid extends GameObject {

    STYLE = {
        GRID: 0x59758a,
        LINES: 0xffffff
    }

    /** @private */
    TEXTURE_KEY = ''

    /** @private */
    TILE_PRECISION = 7

    /**
     * @private
     * @type {GameObjects.Graphics}
     */
    canvas = null

    /**
     * @private
     * @type {GameObjects.TileSprite}
     */
    gridTile = null

    /** @protected */
    onCreate() {
        this.TEXTURE_KEY = `@toolcase/phaser+grid-${generateId(4)}`
        
        const { width, height } = this.game.config
        
        this.gridTile = this.scene.add.tileSprite(0, 0, width, height)
            .setVisible(false)
            .setOrigin(0)
        this.add(this.gridTile)
    }

    setColors(gridColor, lineColor) {
        if (typeof gridColor !== 'number' || typeof lineColor !== 'number') {
            return
        }
        this.STYLE.GRID = gridColor
        this.STYLE.LINES = lineColor
    }

    /** @private */
    setCanvasStyle() {
        this.canvas.fillStyle(this.STYLE.GRID, 1)
        this.canvas.lineStyle(1, this.STYLE.LINES, .3)
    }

    /** @protected */
    onDestroy() {

    }

    /**
     * 
     * @param {Structs.Matrix2} matrix 
     */
    setProjection(matrix) {
        this.canvas = this.scene.add.graphics()
        this.setCanvasStyle()
        this.add(this.canvas)
        if (this.scene.textures.exists(this.TEXTURE_KEY)) {
            this.scene.textures.remove(this.TEXTURE_KEY)
        }
        this.gridTile.setVisible(false)
        let tile = this.getProjectionTileSize(matrix)
        let size = 0
        for (let value of matrix) {
            size = Math.max(size, Math.abs(value))
        }

        if (size < 25) {
            this.drawBackground()
        } else if (tile.x === 0 || tile.y === 0) {
            this.drawLinearTiles(matrix)
        } else {
            this.drawGridTiles(matrix, tile)
        }
        this.canvas.clear()
        this.canvas.destroy()
        this.gridTile.setTexture(this.TEXTURE_KEY)
        this.gridTile.setVisible(true)
        
    }

    /**
     * 
     * @param {Cameras.Scene2D.Camera} camera 
     */
    move(camera) {
        this.gridTile.setTilePosition(camera.scrollX, camera.scrollY)   
    }

    /**
     * @private
     * @param {Structs.Matrix2} matrix 
     * @param {M.Vector2} tile 
     */
    drawGridTiles(matrix, tile) {
        let polygons = this.TILE_PRECISION
        
        let pointA = new M.Vector2(0, 0)
        let pointB = new M.Vector2(0, 0)
        let pointC = new M.Vector2(0, 0)
        let pointD = new M.Vector2(0, 0)

        this.canvas.fillRect(0, 0, tile.x, tile.y)
        for (let x = -polygons; x < polygons; x++) {
            for (let y = -polygons; y < polygons; y++) {
                matrix.translate(x, y, pointA)
                matrix.translate(x, y + 1, pointB)
                matrix.translate(x + 1, y, pointC)
                matrix.translate(x + 1, y + 1, pointD)
                this.canvas.beginPath()
                this.canvas.moveTo(pointA.x, pointA.y)
                this.canvas.lineTo(pointB.x, pointB.y)
                this.canvas.lineTo(pointD.x, pointD.y)
                this.canvas.strokePath()
            }
        }
        
        this.canvas.generateTexture(this.TEXTURE_KEY, tile.x, tile.y)
    }

    /** @private */
    drawLinearTiles(matrix) {
        let crop = new M.Vector2(0, 0)
        matrix.translate(2, 2, crop)

        this.canvas.fillRect(0, 0, crop.x, crop.y)
        this.canvas.lineStyle(1, 0xffffff, .2)

        this.canvas.strokePoints([
            matrix.translate(.8, 1),
            matrix.translate(1.2, 1)
        ])
        this.canvas.strokePoints([
            matrix.translate(1, .8),
            matrix.translate(1, 1.2)
        ])
        this.canvas.generateTexture(this.TEXTURE_KEY, crop.x, crop.y)
    }

    /** @private */
    drawBackground() {
        this.canvas.fillRect(0, 0, 100, 100)
        this.canvas.lineStyle(1, 0xffffff, .1)
        this.canvas.strokeCircle(50, 50, 3)
        this.canvas.generateTexture(this.TEXTURE_KEY, 100, 100)
    }

    /**
     * @private
     * @param {Structs.Matrix2} matrix 
     */
    getProjectionTileSize(matrix) {

        let refPoint = new M.Vector2(matrix.translate(1, 0).x, matrix.translate(0, 1).y)
        refPoint.x = Math.abs(refPoint.x)
        refPoint.y = Math.abs(refPoint.y)

        let point = new M.Vector2()
        let tempPoint = new M.Vector2()


        let x = 0
        let shiftX = 0
        while(shiftX < this.TILE_PRECISION) {
            x += refPoint.x
            shiftX++
            matrix.inverse.translate(x, 0, tempPoint)
            tempPoint.x = Math.round(tempPoint.x * 10) / 10
            tempPoint.y = Math.round(tempPoint.y * 10) / 10

            if (tempPoint.y % 1 === 0 && tempPoint.y % 1 === 0) {
                point.x = Math.round(x)
                break
            }
        }

        let y = 0
        let shiftY = 0
        while(shiftY < this.TILE_PRECISION) {
            y += refPoint.y
            shiftY++
            matrix.inverse.translate(0, y, tempPoint)
            tempPoint.x = Math.round(tempPoint.x * 10) / 10
            tempPoint.y = Math.round(tempPoint.y * 10) / 10


            if (tempPoint.x % 1 === 0 && tempPoint.y % 1 === 0) {
                point.y = Math.round(y)
                break
            }
        }

        return point
    
    }

}

export default Grid