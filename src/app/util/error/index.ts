export type TError = {
    status: number
    title: string
    message: { message: string, origin: string | number }[]
}

export type IError = {
    error: TError
}

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
