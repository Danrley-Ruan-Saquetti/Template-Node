export type Observer = { obsFunction: <T>(data?: T) => void, code: string }

export function useObserver() {
    const observers: Observer[] = []

    const subscribeObserver = (obs: Observer) => {
        observers.push(obs)
    }

    const notifyObs = <T>({ code, data }: { data?: T, code: string }) => {
        observers.filter(obs => { return obs.code == code }).forEach(obs => {
            setTimeout(() => {
                obs.obsFunction({ data })
            }, 1)
        })
    }

    return {
        subscribeObserver,
        notifyObs,
    }
}