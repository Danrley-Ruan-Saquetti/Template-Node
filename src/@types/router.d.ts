import { ErrorGeneral } from '@util/error'
import { Request, Response, NextFunction } from 'express'

export type ListenerRequestHTTPData<TData extends object> = { status: number; data: TData | { error?: ErrorGeneral } }

export type ListenerRequestHTTP<TResponse = any> = (req: Request) => Promise<ListenerRequestHTTPData<TResponse>>

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
