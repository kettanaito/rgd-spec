/**
 * @jest-environment node
 */
import { staticMatchMedia } from './staticMatchMedia'

describe('staticMatchMedia', () => {
  describe('given "up" behavior', () => {
    describe('and actual breakpoint matches', () => {
      it('should return true', () => {
        const result = staticMatchMedia(
          {
            behavior: 'up',
            breakpoint: {
              minWidth: 500,
              maxWidth: 750,
            },
          },
          {
            width: 600,
          },
        )

        expect(result).toHaveProperty('matches', true)
      })
    })

    describe('and actual breakpoint does not match', () => {
      it('should return false', () => {
        const result = staticMatchMedia(
          {
            behavior: 'up',
            breakpoint: {
              minWidth: 500,
              maxWidth: 750,
            },
          },
          {
            width: 499,
          },
        )

        expect(result).toHaveProperty('matches', false)
      })
    })
  })

  describe('given "down" behavior', () => {
    describe('and actual breakpoint matches', () => {
      it('should return true', () => {
        const result = staticMatchMedia(
          {
            behavior: 'down',
            breakpoint: {
              minWidth: 500,
              maxWidth: 750,
            },
          },
          {
            width: 499,
          },
        )

        expect(result).toHaveProperty('matches', true)
      })
    })

    describe('and actual breakpoint does not match', () => {
      it('should return false', () => {
        const result = staticMatchMedia(
          {
            behavior: 'down',
            breakpoint: {
              minWidth: 500,
              maxWidth: 750,
            },
          },
          {
            width: 751,
          },
        )

        expect(result).toHaveProperty('matches', false)
      })
    })
  })

  describe('given "only" behavior', () => {
    describe('and actual breakpoint matches', () => {
      it('should return true', () => {
        const result = staticMatchMedia(
          {
            behavior: 'only',
            breakpoint: {
              minWidth: 500,
              maxWidth: 750,
            },
          },
          {
            width: 625,
          },
        )

        expect(result).toHaveProperty('matches', true)
      })
    })

    describe('and actual breakpoint is below expected', () => {
      it('should return false', () => {
        const result = staticMatchMedia(
          {
            behavior: 'only',
            breakpoint: {
              minWidth: 500,
              maxWidth: 750,
            },
          },
          {
            width: 499,
          },
        )

        expect(result).toHaveProperty('matches', false)
      })
    })

    describe('and actual breakpoint is above expected', () => {
      it('should return false', () => {
        const result = staticMatchMedia(
          {
            behavior: 'only',
            breakpoint: {
              minWidth: 500,
              maxWidth: 750,
            },
          },
          {
            width: 751,
          },
        )

        expect(result).toHaveProperty('matches', false)
      })
    })
  })
})
