import 'dotenv/config'
import { getFlag } from './command-line-flags'

const VARS = {
    PORT: getFlag('--port') || process.env['PORT'] || '',
    NODE_ENV: getFlag('--env') || process.env['NODE_ENV'] || '',
    TEXT_SERVER_SECRET: process.env['TEXT_SERVER_SECRET'] || '',
    TEXT_ADMIN_SECRET: process.env['TEXT_ADMIN_SECRET'] || '',
    SERVER_HASH_SECRET: process.env['SERVER_HASH_SECRET'] || '',
    ADMIN_HASH_SECRET: process.env['ADMIN_HASH_SECRET'] || '',
}

export function getEnv<T>(args: { name: keyof typeof VARS, default?: T, forceDefault?: boolean, production?: boolean, }) {
    if (VARS['NODE_ENV'] == 'development') {
        return args.forceDefault ? args.default || VARS[args.name] : VARS[args.name] || args.default || ''
    }

    return !args.production ? VARS[args.name] : args.forceDefault ? args.default || VARS[args.name] : VARS[args.name] || args.default || ''
}
