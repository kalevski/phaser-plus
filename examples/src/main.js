import scenes from './scenes'


/**
 * @param {string} slug
 * @returns {import('./scenes').SceneEntry} 
 */
const getScene = (slug) => {
    return scenes.find(entry => entry.slug === slug) || null
}

/**
 * @returns {Array<import('./scenes').SceneEntry>}
 */
const getAllScenes = (filtered = true) => {
    if (filtered) {
        return scenes.filter(scene => scene.ready)
    } else {
        return scenes
    }
}

export {
    getScene,
    getAllScenes
}