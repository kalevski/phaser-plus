import Panel from './Panel'

class FlowPanel extends Panel {

    state = {
        delay: 0,
        options: [],
        optionHash: null
    }

    components = {
        eventList: null,
        delay: null,
        fireEvent: null
    }

    draw() {
        this.components.eventList = this.base.addBlade({
            view: 'list',
            label: 'Event',
            options: this.state.options,
            value: ''
        })
        this.components.delay = this.base.addInput(this.state, 'delay' , {
            label: 'Delay / s',
            step: 0.1
        })
        this.components.fireEvent = this.base.addButton({
            title: 'Fire event'
        }).on('click', this.onFireEvent)
        this.base.addSeparator()
    }

    /** @private */
    doUpdate() {
        this.refreshComponents()
    }

    /** @private */
    refreshComponents() {
        for (let key in this.components) {
            if (typeof this.components[key].refresh === 'function') {
                this.components[key].refresh()
            }
        }
        if (this.scene.flow  === null) {
            return
        }
        let eventList = this.scene.flow.events.keys
        let hash = eventList.join('')
        if (hash === this.components.eventList.hash) {
            return
        }
        this.components.eventList.hash = hash
        let options = eventList.map(event => {
            return { text: event, value: event }
        })
        options.unshift({
            text: '', value: ''
        })
        this.components.eventList.options = options
        this.components.eventList.value = ''
        this.state.delay = 0
    }

    onFireEvent = () => {
        let eventName = this.components.eventList.value
        let delay = this.state.delay
        this.state.delay = 0
        if (eventName === '') {
            return
        }
        this.scene.flow.events.trigger(eventName, null, delay)
    }



}

export default FlowPanel