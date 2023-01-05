import React, { Component } from 'react'
import clsx from 'clsx'
import CodeBlock from '@theme/CodeBlock'
import { AUTO, Game, Scale } from 'phaser'

const BASE_URL = 'https://raw.githubusercontent.com/kalevski/phaser-plus/main/examples/src/'

class PhaserExample extends Component {

    /** @type {Game} */
    game = null

    state = {
        title: 'Please wait',
        file: 'Loading...'
    }

    componentDidMount() {
        this.game = new Game({
            type: AUTO,
            parent: 'game_canvas',
            scale: {
                mode: Scale.FIT,
                autoCenter: Scale.CENTER_BOTH,
            },
            physics: {
                default: 'matter',
                matter: {
                    debug: true
                }
            },
            dom: {
                createContainer: true
            },
            antialias: true,
            width: 1280,
            height: 720
        })

        /** @type {import('@phaser-plus/examples/lib/scenes').SceneEntry} */
        let entry = this.props.entry
        this.game.scene.add('demo', new entry.sceneClass())
        this.game.scene.start('demo')

        fetch(`${BASE_URL}${entry.sceneFile}`).then(response => response.text()).then(value => {
            this.setState({
                title: entry.sceneFile,
                file: value
            })
        })
    }

    componentWillUnmount() {
        this.game.destroy()
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        const {
            title,
            file
        } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className={clsx('col col--8 col--offset-2')}>
                        <div id="game_canvas"></div>
                    </div>
                </div>
                <div className="row">
                <div className={clsx('col col--8 col--offset-2')}>
                    <CodeBlock language="js" title={title} showLineNumbers>{file}</CodeBlock>
                </div>
                </div>
            </div>
        )
    }

}

export default PhaserExample