const args = process.argv

const MAP_FLAGS: {
    name: string
    operator: string
    options: string[]
}[] = [
    {name: '--env', operator: '=', options: ['start', 'dev', 'test']},
    {name: '', operator: '', options: ['start']},
]

const FLAGS: {[x: string]: string} = {}

const initFlag = (flag: string) => {
    const op = MAP_FLAGS.find(({name, operator}) => flag.startsWith(name) && flag.includes(operator))

    if (!op) {return}

    const subs = op.operator ? flag.split(op.operator) : [flag, flag]

    const [flagName, value] = subs

    const option = op.options.find(option => option == flagName)

    if (!option) {return}

    FLAGS[flagName] = value
}

const setup = () => {
    args.forEach(flag => initFlag(flag))
}

const printFlags = () => {
    let text = ''

    MAP_FLAGS.forEach(flag => {
        let line = ''

        flag.options.forEach((option, i) => {
            if (i > 0) {line += '\n'}
            line += `${flag.name}${flag.operator}${option}`
        })

        text += line + '\n'
    })

    console.log(text)
}

setup()

printFlags()

console.log(FLAGS)