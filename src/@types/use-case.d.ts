import { ListenerRequestHTTPData } from '@@types/router'

type IUCFunction<TData, TRequest extends any[] = any> = (...args: TRequest) => Promise<ListenerRequestHTTPData<TData>>
