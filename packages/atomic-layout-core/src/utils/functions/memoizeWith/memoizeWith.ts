interface Cache {
  [key: string]: any
}

export default function memoizeWith<F extends (...args: any[]) => any>(
  saltGenerator: (...args: Parameters<F>) => string,
) {
  const cache: Cache = {}

  return (func: F) =>
    function(...args: Parameters<F>): ReturnType<F> {
      const key = saltGenerator(...args)

      if (!(key in cache)) {
        cache[key] = func(...args)
      }

      return cache[key]
    }
}
