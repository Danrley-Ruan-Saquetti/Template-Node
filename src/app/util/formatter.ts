import { z } from 'zod'
import { Result } from '@esliph/util'

export async function Formatter<T extends z.ZodRawShape>(schema: z.ZodObject<T>, schemaData: z.input<z.ZodObject<T>>) {
    type TSchemaData = z.output<z.ZodObject<T>>

    try {
        const schemaDataFormatted = (await schema.parseAsync(schemaData)) as TSchemaData
        return Result.success<TSchemaData>(schemaDataFormatted)
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            const dataErrors = err.errors.map(_err => {
                return { message: _err.message, origin: `${_err.path[0]}` }
            })

            return Result.failure<TSchemaData>({ title: 'Formatter data', message: dataErrors }, 400)
        }
        return Result.failure<TSchemaData>({ title: 'Formatter data', message: [{ message: err, origin: 'Format data' }] }, 400)
    }
}
