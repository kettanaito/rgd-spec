import { Numeric, Breakpoint } from '../../../const/defaultOptions'
import isset from '../../functions/isset'
import toDashedString from '../../strings/toDashedString'
import toLowerCaseFirst from '../../strings/toLowerCaseFirst'

export interface NormalizedQueryParam {
  prefix: string
  name: string
  displayName: string
  value: Numeric
}

/**
 * Normalizes given media query object to a list of [propName, propValue].
 */
export default function normalizeQuery(
  breakpoint: Breakpoint,
): NormalizedQueryParam[] {
  return Object.entries<Numeric>(breakpoint)
    .filter(([_, value]) => isset(value))
    .map(([propName, value]) => {
      const [_, prefix, restName] = propName.match(/(min|max)?(.+)/)
      const normalizedName = toLowerCaseFirst(restName)
      const displayName = [prefix, toDashedString(normalizedName)]
        .filter(Boolean)
        .join('-')

      return { prefix, name: normalizedName, displayName, value }
    })
}
