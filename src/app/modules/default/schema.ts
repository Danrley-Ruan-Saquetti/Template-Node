import { z } from 'zod'

const SchemaDefault = z.object({
    id: z.number(),
    createAt: z.optional(z.date()).default(new Date(Date.now())),
})

type ISchemaDefault = z.infer<typeof SchemaDefault>

export { ISchemaDefault, SchemaDefault }
