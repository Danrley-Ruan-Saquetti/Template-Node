import { IncomingHttpHeaders } from 'http'

type ListenerRequestHTTPData = { status: number, data: any }

type ListenerRequestHTTP = (req: { body: any, params: ParamsDictionary, headers: IncomingHttpHeaders }) => Promise<ListenerRequestHTTPData>

type TRouterPath = {
	type: 'get' | 'post'
	url: string
	listener: ListenerRequestHTTP
}

interface InterfaceRouter {
	baseURL?: string
	paths: TRouterPath[]
}
