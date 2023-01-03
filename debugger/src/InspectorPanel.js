import { CANVAS, WEBGL } from 'phaser'
import Panel from './Panel'

class InspectorPanel extends Panel {

    state = {
        renderer: '',
        recording: false,
    }

    components = {
        fps: null,
        renderer: null,
        screenshot: null,
        video: null
    }

    /**
     * @private
     * @type {MediaRecorder}
     */
    recorder = null

    /**
     * @private
     * @type {Array<Blob>}
     */
    videoChunks = []

    draw() {
        if (this.game.renderer.type === CANVAS) {
            this.state.renderer = 'CANVAS'
        } else if (this.game.renderer.type === WEBGL) {
            this.state.renderer = 'WebGL'
        }
        this.components.renderer = this.base.addMonitor(this.state, 'renderer', {
            label: 'Renrerer'
        })
        this.base.addSeparator()
        this.components.fps = this.base.addBlade({
            view: 'fpsgraph',
            label: 'FPS Graph',
            lineCount: 2,
        })
        this.components.screenshot = this.base.addButton({ title: 'Take screenshot' }).on('click', this.onScreenshot)
        this.components.video = this.base.addButton({ title: 'Record video' }).on('click', this.onVideoRecord)
    }

    measureFPS() {
        this.components.fps.end()
        this.components.fps.begin()
    }

    /** @private */
    onScreenshot = () => {
        this.game.renderer.snapshot(snapshot => {
            let anchor = document.createElement('a')
            anchor.href = snapshot.src
            anchor.download = 'screenshot.png'
            anchor.click()
        })
    }

    onVideoRecord = () => {
        if (this.state.recording) {
            this.stopRecording()
            this.state.recording = false
            this.components.video.title = `Record video`
        } else {
            this.startRecording()
            this.state.recording = true
            this.components.video.title = `[STOP] Recording...`
        }
    }

    startRecording() {
        this.videoChunks = []
        let stream = this.game.canvas.captureStream(25)
        this.recorder = new MediaRecorder(stream, {
            mimeType: "video/webm; codecs=vp9"
        })
        this.recorder.start(1000)
        this.recorder.ondataavailable = (e) => this.accumulateChunks(e)
    }

    stopRecording() {
        this.recorder.onstop = (e) => this.downloadVideo(e)
        this.recorder.stop()
    }

    accumulateChunks(e) {
        this.videoChunks.push(e.data)
    }

    downloadVideo() {
        let blob = new Blob(this.videoChunks, { type: 'video/webm' })
        let url = URL.createObjectURL(blob)
        let anchor = document.createElement('a')
        anchor.setAttribute('href', url)
        anchor.setAttribute('download', 'videoclip.webm')
        anchor.click()
    }

}

export default InspectorPanel