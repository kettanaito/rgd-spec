import normalizeQuery from './normalizeQuery'

describe('normalizeQuery', () => {
  describe('given a media query Object', () => {
    it('returns its { prefix, name, value } data', () => {
      expect(
        normalizeQuery({
          height: 100,
          minWidth: 120,
          maxAspectRatio: '3/4',
        }),
      ).toEqual([
        {
          prefix: undefined,
          name: 'height',
          displayName: 'height',
          value: 100,
        },
        {
          prefix: 'min',
          name: 'width',
          displayName: 'min-width',
          value: 120,
        },
        {
          prefix: 'max',
          name: 'aspectRatio',
          displayName: 'max-aspect-ratio',
          value: '3/4',
        },
      ])
    })
  })
})
