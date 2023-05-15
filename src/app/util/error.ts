import { TError } from '@@types/error'

export class ErrorGeneral implements TError {
    status: number
    title: string
    message: { message: string, origin: string | number }[]

    constructor({ message, status, title }: TError) {
        this.status = status
        this.title = title
        this.message = message
    }
}
