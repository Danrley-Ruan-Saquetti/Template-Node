import { ErrorGeneral } from '@util/error'

export type ListenerRequestHTTPData<TData extends object> = { status: number; data: TData | { error?: ErrorGeneral } }

export type ListenerRequestHTTP<TResponse = any> = (req: any) => Promise<ListenerRequestHTTPData<TResponse>>

export type TRouterPath = {
    type: 'get' | 'post' | 'put' | 'delete'
    url: string
    middleware?: ListenerRequestHTTP
    listener: ListenerRequestHTTP
}

export interface InterfaceRouter {
    baseURL?: string
    paths: TRouterPath[]
}
