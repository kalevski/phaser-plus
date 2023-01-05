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
const getAllScenes = () => {
    return scenes
}

export {
    getScene,
    getAllScenes
}