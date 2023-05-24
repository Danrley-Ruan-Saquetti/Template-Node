import { ErrorGeneral } from '@util/error'
import { z } from 'zod'

export const SchemaDefault = z.object({
    id: z.number(),
    createAt: z.optional(z.date()).default(new Date(Date.now())),
})

export type ISchemaDefault = z.infer<typeof SchemaDefault>

export type ResultMethodData<T extends {}> = T & {
    error?: ErrorGeneral
}