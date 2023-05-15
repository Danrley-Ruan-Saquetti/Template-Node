import { z } from 'zod'

const SchemaDefault = z.object({
    id: z.number(),
    createAt: z.date().optional().transform(() => {
        return new Date(Date.now())
    }),
})

type ISchemaDefault = z.infer<typeof SchemaDefault>

export { ISchemaDefault, SchemaDefault }
