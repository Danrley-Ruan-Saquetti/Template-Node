import { ListenerRequestHTTPData } from '../router'

type IUCFunction<TData> = (req: any) => Promise<ListenerRequestHTTPData<TData>>
