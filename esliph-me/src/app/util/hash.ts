import bcryptjs from 'bcryptjs'

export async function generateHash(text: string) {
    const passHash = await bcryptjs.hash(`${text}`, 5).then(res => { return res })

    return passHash
}

export async function compareHash(hash: string, stringCompare: string) {
    const isEqual = await bcryptjs.compare(`${stringCompare}`, `${hash}`)

    return isEqual
}