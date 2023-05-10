import crypto from 'crypto'

export function generatedId() {
    return crypto.randomBytes(20).toString('hex')
}