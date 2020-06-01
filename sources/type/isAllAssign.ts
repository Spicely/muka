interface IVal {
    [name: string]: any
}

const isAllAssign =  (params: IVal): boolean => {
    const keys: string[] = Object.keys(params)
    return keys.every((i) => params[i] !== undefined && params[i] !== '' )
}

export default isAllAssign
