import express from 'express'
import cors from 'cors'
import concurrently from 'concurrently'
import { Color } from '@toolcase/base'
import { logging } from '@toolcase/logging'
import { Command } from 'commander'
import path from 'path'
import { deleteFile, getPath, isDirectoryEmpty } from '../utils/files'
import { getMachineIP } from '../utils/network'
import { getBuildFiles, getProjectEntrypoints } from '../utils/project'


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

        let entrypoints = getProjectEntrypoints(sourcePath)
        
        let hrmPort = 2334
        const commands = entrypoints.map(file => {
            let filePath = path.join(relativePath, file)
            let color = this.colors.shift() || Color.DEEP_ORANGE
            return {
                command: `parcel watch -p ${hrmPort++} --dist-dir ${distDir} ${filePath}`,
                name: file,
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

        let publicPath = getPath(distDir)
        let buildFiles = getBuildFiles(publicPath)
        
        // clean directory
        buildFiles.forEach(file => {
            let filePath = path.join(publicPath, file)
            deleteFile(filePath)
        })

        const server = express()
        let serverPort = typeof port === 'number' ? port :  parseInt(port, 10)
        let ip = getMachineIP()
        let url = `http://${ip}:${serverPort}`
        
        server.use(cors())
        server.use('/', express.static(publicPath))
        server.listen(serverPort, '0.0.0.0', () => {
            this.logger.info(`🌐 server started: \x1b[33m ${url} \x1b[0m`)
            entrypoints.filter(file => path.extname(file) === '.html' && file !== 'index.html').forEach(file => {
                this.logger.info(`🌐 open ${file}: \x1b[33m ${url}/${file} \x1b[0m`)
            })
        })
    }

}

export default ProjectStart