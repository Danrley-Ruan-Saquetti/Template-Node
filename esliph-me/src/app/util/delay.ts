export async function Delay(amount: number) {
    return new Promise(resolve => setTimeout(resolve, amount))
}