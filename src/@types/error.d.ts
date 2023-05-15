export type TError = {
    status: number
    title: string
    message: { message: string, origin: string | number }[]
}
