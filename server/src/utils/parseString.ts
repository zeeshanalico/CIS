export function parseString(value: string) {
    return value === 'undefined' ||value==='null' ? undefined : value
}