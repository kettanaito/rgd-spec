// @flow
import type { TBreakpointBehavior } from '../../const/defaultOptions'
import type { TTemplate } from '../getAreasList'
import pop from '../pop'

export type TAreaParams = {
  behavior: TBreakpointBehavior,
  minWidth?: number,
  maxWidth?: number,
}

export default function getAreaParams(
  areaName: string,
  templates: TTemplate[],
): TAreaParams[] {
  return templates.reduce((acc, template, index) => {
    const { areas, breakpoint, behavior } = template
    let areaOptions: TAreaParams = {
      behavior,
      minWidth: breakpoint.minWidth,
      maxWidth: breakpoint.maxWidth,
    }

    const isLast = index === templates.length - 1
    const prevAreaOptions = acc[acc.length - 1]
    const includesArea = areas.includes(areaName)

    /* Behaviors */
    const hasSameBehavior =
      prevAreaOptions && prevAreaOptions.behavior === areaOptions.behavior
    const hasInclusiveBehavior =
      prevAreaOptions &&
      prevAreaOptions.behavior === 'up' &&
      areaOptions.behavior === 'down'

    let shouldUpdatePrevious =
      includesArea && (hasSameBehavior || hasInclusiveBehavior)
    const shouldStretch = prevAreaOptions && prevAreaOptions.behavior === 'up'

    if (includesArea) {
      if (hasSameBehavior || hasInclusiveBehavior) {
        areaOptions.minWidth = prevAreaOptions.minWidth
      }

      if (isLast && behavior === 'up') {
        areaOptions.maxWidth = undefined
      }
    } else {
      if (shouldStretch) {
        shouldUpdatePrevious = true
        areaOptions.behavior = 'down'
        areaOptions.minWidth = prevAreaOptions.minWidth
        areaOptions.maxWidth = breakpoint.minWidth - 1
      } else {
        // TODO
        // I don't think it ever gets here.
        areaOptions = null
      }
    }

    const target = shouldUpdatePrevious ? pop(acc) : acc
    const nextAcc = target.concat(areaOptions)

    return nextAcc
  }, [])
}
