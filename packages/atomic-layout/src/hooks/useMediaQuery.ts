import { useState, useMemo, useEffect, useLayoutEffect } from 'react'
import {
  MediaQuery as MediaQueryParams,
  joinQueryList,
  normalizeQuery,
  transformNumeric,
} from '@atomic-layout/core'

/**
 * Creates a media querty string based on the given params.
 */
export const createMediaQuery = (queryParams: MediaQueryParams): string => {
  const queryList = normalizeQuery(queryParams)
  const mediaQueryString = joinQueryList(
    queryList,
    ({ displayName, value }) => {
      /**
       * Transform values that begin with a number to prevent
       * transformations of "calc" expressions.
       * Transformation of numerics is necessary when a simple
       * number is used as a value (min-width: 750) is not valid.
       *
       * (min-width: 750) ==> (min-width: 750px)
       */
      const resolvedParamValue = /^\d/.test(String(value))
        ? transformNumeric(value)
        : value

      return `(${displayName}:${resolvedParamValue})`
    },
  )

  return mediaQueryString
}

type UseMediaQuery = (
  queryParams: MediaQueryParams[] | MediaQueryParams,
  initialMatches?: boolean,
) => boolean

export const useMediaQuery: UseMediaQuery = (
  queryParams,
  initialMatches = false,
): boolean => {
  const useSafeEffect =
    typeof window === 'undefined' ? useEffect : useLayoutEffect
  const [matches, setMatches] = useState(initialMatches)
  const query = useMemo(() => {
    return []
      .concat(queryParams)
      .map(createMediaQuery)
      .join(',')
  }, [queryParams])

  const handleMediaQueryChange = (
    mediaQueryList: MediaQueryList | MediaQueryListEvent,
  ) => {
    setMatches(mediaQueryList.matches)
  }

  useSafeEffect(() => {
    const mediaQueryList = matchMedia(query)
    handleMediaQueryChange(mediaQueryList)
    mediaQueryList.addListener(handleMediaQueryChange)

    return () => {
      mediaQueryList.removeListener(handleMediaQueryChange)
    }
  }, Object.keys(queryParams))

  return matches
}
