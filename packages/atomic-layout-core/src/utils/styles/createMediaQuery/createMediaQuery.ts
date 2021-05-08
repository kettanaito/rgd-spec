import { Breakpoint, BreakpointBehavior } from '../../../const/defaultOptions'
import transformNumeric from '../../math/transformNumeric'
import normalizeQuery, {
  NormalizedQueryParam,
} from '../../styles/normalizeQuery'
import compose from '../../functions/compose'

/**
 * Determines whether a given media query param should be added
 * to the media query string based on a breakpoint's behavior.
 */
const shouldAppendProperty = (
  queryParam: NormalizedQueryParam,
  behavior: BreakpointBehavior,
): boolean => {
  const { prefix, name } = queryParam
  const isDimensionalProp = ['height', 'width'].includes(name)

  if (!isDimensionalProp) {
    return true
  }

  return (
    (prefix === 'min' && ['up', 'only'].includes(behavior)) ||
    (prefix === 'max' && ['down', 'only'].includes(behavior))
  )
}

const filterRelevantQueryParams = (behavior: BreakpointBehavior) => (
  queryList: NormalizedQueryParam[],
): NormalizedQueryParam[] => {
  return queryList.filter((normalizedQueryParam) =>
    shouldAppendProperty(normalizedQueryParam, behavior),
  )
}

/**
 * Joins a given media query params list with the given transformer function.
 */
export const joinQueryList = (
  queryList: NormalizedQueryParam[],
  transformer: (pair: NormalizedQueryParam) => any,
) => {
  return queryList.map(transformer).join(' and ')
}

export const createQueryList = (
  breakpoint: Breakpoint,
  behavior: BreakpointBehavior,
): NormalizedQueryParam[] => {
  return compose(
    filterRelevantQueryParams(behavior),
    normalizeQuery,
  )(breakpoint)
}

export default function createMediaQuery(
  breakpoint: Breakpoint,
  behavior: BreakpointBehavior,
): string {
  const queryList = createQueryList(breakpoint, behavior)

  const mediaQueryString = joinQueryList(
    queryList,
    ({ displayName, value }) => {
      return `(${displayName}:${String(transformNumeric(value))})`
    },
  )

  return mediaQueryString
}
