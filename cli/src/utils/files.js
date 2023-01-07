import process from 'process'
import path from 'path'
import fs from 'fs'


export const getPath = (relativePath = './') => {
    return path.join(process.cwd(), relativePath)
}

export const isDirectoryEmpty = (dirPath) => {
    try {
        let files = fs.readdirSync(dirPath)
        return files.length === 0
    } catch (error) {
        return null
    }
}

export const copyFile = (source, target) => {
    let currentTarget = target
    if (!fs.existsSync(source)) {
        return false
    }
    if (fs.existsSync(currentTarget)) {
        if (fs.lstatSync(currentTarget).isDirectory()) {
            currentTarget = path.join(target, path.basename(source))
        }
    }
    fs.writeFileSync(currentTarget, fs.readFileSync(source))
    return true
}

export const copyDirectory = (source, target) => {
    let files = []
    let currentTarget = path.join(target, path.basename(source))
    if (!fs.existsSync(currentTarget)) {
        fs.mkdirSync(currentTarget)
    }
    if (fs.lstatSync(source).isDirectory() ) {
        files = fs.readdirSync(source)
        files.forEach(file => {
           let currentSource = path.join(source, file)
            if (fs.lstatSync(currentSource).isDirectory()) {
                copyDirectory(currentSource, currentTarget)
            } else {
                copyFile(currentSource, currentTarget)
            }
        })
    }
}

export const createFile = (filename, dirPath, data = '') => {
    try {
        fs.writeFileSync(path.join(dirPath, filename), data, { encoding: 'utf-8' })
        return true
    } catch (error) {
        return false
    }
}

export const createDirectory = (dirPath) => {
    try {
        fs.mkdirSync(dirPath)
        return dirPath
    } catch (error) {
        return null
    }
}

export const deleteFile = (filePath) => {
    try {
        fs.rmSync(filePath)
        return true
    } catch (error) {
        return false
    }
}