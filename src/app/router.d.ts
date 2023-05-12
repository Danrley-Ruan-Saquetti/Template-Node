import { Request, Response, NextFunction } from 'express'

type ListenerRequestHTTPData<TData> = { status: number; data: TData }

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
