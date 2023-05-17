export function formatterSchema<T extends TSchemas>(schema: T, type: keyof (typeof schemas)[T]) {
    return schemas[schema][type]
}

const schemas = {
    user: {
        in: 'in',
        out: 'out',
    },
    products: {
        aggregate: 'aggregate',
        join: 'join',
    },
}

type TSchemas = keyof typeof schemas
