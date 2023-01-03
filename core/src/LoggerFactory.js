import { ConsoleLogReporter, Level, LoggerFactory as Factory } from '@toolcase/logging'

class LoggerFactory extends Factory {

    constructor() {
        super([
            new ConsoleLogReporter()
        ])
        this.level = Level.VERBOSE
    }

}

export default LoggerFactory