import { useState } from 'react'
import useViewportChange from './useViewportChange'
import { Layout, createMediaQuery } from '@atomic-layout/core'

/**
 * Returns a list of breakpoints that match the current state of the viewport.
 */
export default function useCurrentBreakpoints(): string[] {
  const [currentBreakpoints, setCurrentBreakpoints] = useState<string[]>([
    Layout.defaultBreakpointName,
  ])

  useViewportChange(() => {
    const matchingBreakpoints = Object.keys(Layout.breakpoints).filter(
      (breakpointName) => {
        const mediaQueryObject = Layout.breakpoints[breakpointName]
        /**
         * @fixme Move the media query composition and matching logic
         * into the `Layout` class.
         * @reason It's expensive and redundant to compose strings from
         * breakpoints on each viewport change. Breakpoints never change
         * on runtime.
         */
        const mediaQuery = createMediaQuery(mediaQueryObject, 'only')
        return matchMedia(mediaQuery).matches
      },
    )

    setCurrentBreakpoints(matchingBreakpoints)
  })

  return currentBreakpoints
}
