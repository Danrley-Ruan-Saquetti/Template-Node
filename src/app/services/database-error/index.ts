import { Prisma } from '@prisma/client'

export function catchMessageError(operation: string, error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return error.message
    }

    return `Error in operation ${operation}`
}