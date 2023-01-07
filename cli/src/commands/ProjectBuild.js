import path from 'path'
import concurrently from 'concurrently'
import { Color } from '@toolcase/base'
import { logging } from '@toolcase/logging'
import { Command } from 'commander'
import { deleteFile, getPath } from '../utils/files'
import { getBuildFiles, getProjectEntrypoints } from '../utils/project'

class ProjectBuild extends Command {

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

    constructor(name = 'build') {
        super(name)
        this.option('-d --dist-dir [distDirectory]', 'project build destination, default: public')
        this.argument('[path]', 'project source location on file system')
        this.action(this.onExec)
    }

    onExec(relativePath = './src') {

        const {
            distDir = 'public'
        } = this.opts()

        const projectPath = getPath()
        const publicPath = getPath(distDir)
        const sourcePath = getPath(relativePath)

        let buildFiles = getBuildFiles(publicPath)
        // clean directory
        buildFiles.forEach(file => {
            let filePath = path.join(publicPath, file)
            deleteFile(filePath)
        })

        let entrypoints = getProjectEntrypoints(sourcePath)
        if (entrypoints.length === 0) {
            return this.logger.error(`❌ `)
        }
        const commands = entrypoints.map(file => {
            let filePath = path.join(relativePath, file)
            let color = this.colors.shift() || Color.DEEP_ORANGE
            return {
                command: `parcel build --public-url '.' --no-scope-hoist --no-cache --no-source-maps --log-level info --dist-dir ${distDir} ${filePath}`,
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
    }

}

export default ProjectBuild