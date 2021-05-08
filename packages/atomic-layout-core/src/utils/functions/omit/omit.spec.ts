import omit from './omit'

describe('omit', () => {
  describe('given an object and a set of keys to omit', () => {
    let result: ReturnType<typeof omit>
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    }

    beforeAll(() => {
      result = omit(['b', 'd'], obj)
    })

    it('should not include omitted keys in the result', () => {
      expect(result).not.toContain(['b', 'c'])
    })

    it('should preserve unaffected keys', () => {
      expect(result).toHaveProperty('a', 1)
      expect(result).toHaveProperty('c', 3)
    })
  })
})
