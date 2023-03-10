import path from 'path'
import { logging } from '@toolcase/logging'
import { Command } from 'commander'
import { getPath, isDirectoryEmpty, createDirectory, createFile } from '../utils/files'
import { createPackageJSON } from '../utils/npm'
import * as templates from '../utils/templates'

const TEMPLATE_LIST = [
    'browser',
    'phaser'
]

const DEPENDENCIES = {
    browser: {
        production: ['phaser', '@phaser-plus/core'],
        development: ['parcel', '@phaser-plus/cli']
    },

    phaser: {
        production: ['phaser'],
        development: ['parcel', '@phaser-plus/cli']
    }
}

class ProjectInit extends Command {
    
    logger = logging.getLogger('command=init')

    constructor(name) {
        super(name)
        this.option('-t --template [template]', 'project template, default: browser')
        this.argument('[path]', 'project location on file system')
            .action(this.onExec)
    }

    onExec(relativePath = './') {
        const projectPath = getPath(relativePath)
        const projectName = projectPath.split(path.sep).pop() || 'my-awesome-game'

        const {
            template = TEMPLATE_LIST[0]
        } = this.opts()


        if (!TEMPLATE_LIST.includes(template)) {
            return this.logger.error(`❌ invalid template (${template}), available options: [${TEMPLATE_LIST.join(', ')}]`)
        }


        if (isDirectoryEmpty(projectPath) === false) {
            return this.logger.error(`❌ the directory [${projectPath}] is not empty`)
        }
        let dirExist = !(isDirectoryEmpty(projectPath) === null)

        this.logger.info(`📋 name: ${projectName}`)
        this.logger.info(`📋 path: ${projectPath}`)
        this.logger.info(`📋 template: ${template}`)


        let dependencyOptions = DEPENDENCIES[template]
        const packageJSON = createPackageJSON({
            name: projectName,
            scripts: {
                start: 'phaserplus project start',
                build: 'phaserplus project build'
            },
            dependencies: dependencyOptions.production,
            devDependencies: dependencyOptions.development
        }, message => this.logger.info(message))

        if (!dirExist) {
            createDirectory(projectPath)
            this.logger.info(`📁 creating directory`)
        }
        this.logger.info(`📁 creating project files`)
        createFile('.gitignore', projectPath, templates.get('template.gitignore'))
        templates.clone(template, projectPath)
        createFile('package.json', projectPath, packageJSON)
        this.logger.info('🏁 done!')

        this.logger.info(`start project by executing:
        
        ▶  cd ${projectName}
        ▶  npm install
        ▶  npm start

        `)
        
    }

}

export default ProjectInit