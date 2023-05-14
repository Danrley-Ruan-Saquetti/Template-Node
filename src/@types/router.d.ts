import { ErrorGeneral } from '@util/error'
import { Request, Response, NextFunction } from 'express'

type ListenerRequestHTTPData<TData extends object> = { status: number; data: TData | { error?: ErrorGeneral } }

type ListenerRequestHTTP<TResponse = any> = (req: Request) => Promise<ListenerRequestHTTPData<TResponse>>

type TRouterPath = {
    type: 'get' | 'post' | 'put' | 'delete'
    url: string
    middleware?: ListenerRequestHTTP
    listener: ListenerRequestHTTP
}

interface InterfaceRouter {
    baseURL?: string
    paths: TRouterPath[]
}
