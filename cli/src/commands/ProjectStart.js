import express from 'express'
import concurrently from 'concurrently'
import { Color } from '@toolcase/base'
import { logging } from '@toolcase/logging'
import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import { getPath, isDirectoryEmpty } from '../utils/files'
import { getMachineIP } from '../utils/network'


class ProjectStart extends Command {

    logger = logging.getLogger('command=start')

    colors = [
        Color.RED,
        Color.BLUE,
        Color.AMBER,
        Color.TEAL,
        Color.GREEN,
        Color.LIGHT_BLUE,
        Color.LIME
    ]

    constructor(name = 'start') {
        super(name)
        this.option('-d --dist-dir [distDirectory]', 'project build destination, default: public')
        this.option('-p --port [port]', 'server port, default: 3500')
        this.argument('[path]', 'project source location on file system')
        this.action(this.onExec)
    }

    onExec(relativePath = './src') {
        const {
            distDir = 'public',
            port = 3500
        } = this.opts()
        
        const projectPath = getPath()
        const sourcePath = getPath(relativePath)

        if (isDirectoryEmpty(sourcePath) === null) {
            return this.logger.error(`❌ invalid source path, directory ${sourcePath} does not exist`)
        }

        let htmlFiles = fs.readdirSync(sourcePath).filter(filePath => filePath.split('.').pop() === 'html')
        
        let hrmPort = 2334
        const commands = htmlFiles.map(htmlFile => {
            let htmlFilePath = path.join(relativePath, htmlFile)
            let color = this.colors.shift() || Color.DEEP_ORANGE
            return {
                command: `parcel watch -p ${hrmPort++} --dist-dir ${distDir} ${htmlFilePath}`,
                name: htmlFile,
                prefixColor: color,
                cwd: projectPath
            }
        })

        let processes = concurrently(commands, {
            outputStream: process.stdout
        })

        processes.result.then(() => {
            process.exit()
        }).catch(error => {
            this.logger.error('❌ error: ', error.message)
            process.exit() 
        })

        const server = express()
        let publicPath = getPath(distDir)
        let serverPort = typeof port === 'number' ? port :  parseInt(port, 10)
        let ip = getMachineIP()
        let url = `http://${ip}:${serverPort}`
        
        
        server.use(express.static(publicPath))
        server.listen(serverPort, '0.0.0.0', () => {
            this.logger.info(`🌐 server started: \x1b[33m ${url} \x1b[0m`)
            htmlFiles.filter(htmlFile => htmlFile !== 'index.html').forEach(htmlFile => {
                this.logger.info(`🌐 open ${htmlFile}: \x1b[33m ${url}/${htmlFile} \x1b[0m`)
            })
        })
    }

}

export default ProjectStart