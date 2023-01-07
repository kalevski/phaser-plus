import fs from 'fs'
import path from 'path'

export const getProjectEntrypoints = (sourcePath) => {
    if (!fs.existsSync(sourcePath)) {
        return []
    }
    let files = fs.readdirSync(sourcePath).filter(filePath => {
        let ext = path.extname(filePath)
        return ext === '.html' || filePath === 'webworker.js'
    })
    return files
}

export const getBuildFiles = (buildPath) => {
    if (!fs.existsSync(buildPath)) {
        return []
    }
    let files = fs.readdirSync(buildPath).filter(filePath => {
        let ext = path.extname(filePath)
        return ext === '.js' || ext === '.map' || ext === '.html'
    })
    return files
}