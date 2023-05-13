import { ListenerRequestHTTPData } from '@@types/router'

type IUCFunction<TData> = (req: any) => Promise<ListenerRequestHTTPData<TData>>
