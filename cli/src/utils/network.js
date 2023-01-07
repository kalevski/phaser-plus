import os from 'os'

export const getMachineIP = () => {
    let ip = Object.values(os.networkInterfaces()).flat().filter(item => {
        return !item.internal && item.family === 'IPv4'
    }).find(Boolean).address
    return ip
}