export default function omit<R = Record<string, any>>(
  keys: string[],
  obj: R,
): Omit<R, keyof typeof keys> {
  return Object.keys(obj).reduce<any>((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = (obj as any)[key]
    }

    return acc
  }, {})
}
