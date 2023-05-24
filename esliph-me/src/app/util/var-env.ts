import 'dotenv/config'

const VARS = {
    PORT: process.env['PORT'] || '',
    ENVIRONMENT: process.env['ENVIRONMENT'] || '',
    TEXT_SERVER_SECRET: process.env['TEXT_SERVER_SECRET'] || '',
    TEXT_ADMIN_SECRET: process.env['TEXT_ADMIN_SECRET'] || '',
    SERVER_HASH_SECRET: process.env['SERVER_HASH_SECRET'] || '',
    ADMIN_HASH_SECRET: process.env['ADMIN_HASH_SECRET'] || '',
}

export function getEnv<T>({ name, default: defaultValue, forceDefault = false, production = false }: { name: keyof typeof VARS, default?: T, forceDefault?: boolean, production?: boolean }) {
    if (VARS['ENVIRONMENT'] == 'DEVELOPMENT') {
        return forceDefault ? defaultValue || VARS[name] : VARS[name] || defaultValue || ''
    }

    return !production ? VARS[name] : forceDefault ? defaultValue || VARS[name] : VARS[name] || defaultValue || ''
}