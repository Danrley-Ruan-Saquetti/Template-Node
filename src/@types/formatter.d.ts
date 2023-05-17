import { IUserDataRequest } from '@module/user/schema'
import { ErrorGeneral } from '@util/error'

export type FormatterResult<T = any> = Promise<{ data: T | {error: ErrorGeneral} }>
