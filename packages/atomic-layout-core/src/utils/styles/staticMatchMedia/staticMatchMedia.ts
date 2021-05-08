import { AreaRecord } from '../../breakpoints/getAreaRecords'
import { Breakpoint, BreakpointBehavior } from '../../../const/defaultOptions'
import createMediaQuery, { createQueryList } from '../createMediaQuery'
import openBreakpoint from '../../breakpoints/openBreakpoint'
import closeBreakpoint from '../../breakpoints/closeBreakpoint'

type MatchMediaReturnType = ReturnType<typeof matchMedia>
type DimensionalComparator = (expected: number, actual: number) => boolean

/**
 * Returns a comparator function by given prefix (min/max).
 */
const getComparator = (propertyPrefix: string): DimensionalComparator => {
  if (propertyPrefix === 'min') {
    return (expected, actual) => actual >= expected
  }

  return (expected, actual) => actual <= expected
}

const transformBreakpoint = (
  breakpoint: Breakpoint,
  behavior: BreakpointBehavior,
): Breakpoint => {
  if (behavior === 'up') {
    return openBreakpoint(breakpoint)
  }

  if (behavior === 'down') {
    return closeBreakpoint(breakpoint)
  }

  return breakpoint
}

export const staticMatchMedia = (
  record: AreaRecord,
  clientOverride?: Breakpoint,
): MatchMediaReturnType => {
  const { breakpoint, behavior } = record

  if (typeof window !== 'undefined') {
    // Convert object-like breakpoint to an actual media query string.
    const mediaQueryString = createMediaQuery(breakpoint, behavior)

    // Use native "matchMedia" on the client-side.
    // This resolves all types of media queries: dimensional and non-dimensional.
    return matchMedia(mediaQueryString)
  }

  // Compose a client state by merging sensible defaults
  // with the given explicit overrides.
  const clientState: Breakpoint = {
    orientation: 'landscape',
    ...clientOverride,
  }

  const resolvedBreakpoint = transformBreakpoint(breakpoint, behavior)
  const queryParams = createQueryList(resolvedBreakpoint, behavior)

  // Each media query parameter must match
  const matches = queryParams.every(({ prefix, name, value }) => {
    // Skip breakpoint property values with "undefined" value.
    // This accounts for opened/closed breakpoints, where
    // certain properties are set to explicit "undefined".
    if (value === undefined) {
      return true
    }

    /**
     * @todo Skip string values for now.
     * Ideally, use custom comparator for different query params
     * (aspect ratio, resolution, etc.).
     */
    if (typeof value === 'string') {
      return true
    }

    const actualValue = clientState[name]
    const compare = getComparator(prefix)

    /**
     * @todo Support comparison of Numeriv values with measurement unit.
     * For example, "576px" and "768px". Currently considered a string and
     * always results to true in the upper closure.
     */
    return compare(value, actualValue)
  })

  return {
    matches,
    media: null /** @todo Stub the value of "media" */,

    // Stub MatchMedia methods to be callable, but do nothing
    // on the server-side.
    addEventListener: (): void => null,
    addListener: () => null,
    removeListener: () => null,
    removeEventListener: (): void => null,
    dispatchEvent: () => null,
    onchange: () => null,
  }
}
