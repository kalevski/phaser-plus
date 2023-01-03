import * as Scenes from './scenes'


/**
 * @template {Scene} T
 * @param {string} name
 * @returns {new T|null} 
 */
const getSceneClass = (name) => {
    if (typeof Scenes[name] !== 'undefined') {
        return Scenes[name]
    }
    return null
}

export {
    getSceneClass
}