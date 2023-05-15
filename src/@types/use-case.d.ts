import { ListenerRequestHTTPData } from '@@types/router'

export type IUCFunction<TData, TRequest extends any[] = any> = (...args: TRequest) => Promise<ListenerRequestHTTPData<TData>>
