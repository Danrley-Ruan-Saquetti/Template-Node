import { TObserver } from '@@types/observer'

export function useObserver() {
    const observers: TObserver[] = []

    const subscribeObserver = (obs: TObserver) => {
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