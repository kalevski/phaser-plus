import fs from 'fs'
import path from 'path'
import { copyDirectory, copyFile } from './files'

const get = (name) => {
    const filePath = path.join(__dirname, '../../templates', name)
    console.log(filePath)
    let exists = fs.existsSync(filePath)
    if (!exists) {
        throw new Error(`template=(${name}) does not exist`)
    }
    return fs.readFileSync(filePath).toString('utf-8')
}

const clone = (dirName, destDir) => {
    const srcDir = path.join(__dirname, '../../templates', dirName)
    let exists = fs.existsSync(srcDir)
    if (!exists) {
        throw new Error(`template directory=(${dirName}) does not exist`)
    }
    let files = fs.readdirSync(srcDir)
    for (let file of files) {
        let filePath = path.join(srcDir, file)
        if (fs.lstatSync(filePath).isDirectory()) {
            copyDirectory(filePath, destDir)
        } else {
            copyFile(filePath, destDir)
        }
    }
}

export { get, clone }