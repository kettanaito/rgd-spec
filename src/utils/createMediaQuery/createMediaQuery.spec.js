import { expect } from 'chai'
import createMediaQuery from './createMediaQuery'

test('Returns proper media query with "up" behavior', () => {
  const mediaQuery = createMediaQuery(
    {
      minWidth: 100,
      maxWidth: 200,
      minAspectRatio: '72dpi',
    },
    'up',
  )

  expect(mediaQuery).to.equal('(min-width:100px) and (min-aspect-ratio:72dpi)')
})

test('Returns proper media query with "down" behavior', () => {
  const mediaQuery = createMediaQuery(
    {
      minWidth: 100,
      maxWidth: 200,
      minResolution: '300dpi',
    },
    'down',
  )

  expect(mediaQuery).to.equal('(max-width:200px) and (min-resolution:300dpi)')
})

test('Returns proper media query with "only" behavior', () => {
  const mediaQuery = createMediaQuery(
    {
      minWidth: 100,
      maxWidth: 200,
      orientation: 'landscape',
    },
    'only',
  )

  expect(mediaQuery).to.equal(
    '(min-width:100px) and (max-width:200px) and (orientation:landscape)',
  )
})
