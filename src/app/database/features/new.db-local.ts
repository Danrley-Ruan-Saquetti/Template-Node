export type TypeDefault = {
    [prop: string]<T>: T
}

export function newLocalDB() {
    const local: any = {}

    const model = () => {}

    return {
        model,
        local,
    }
}
