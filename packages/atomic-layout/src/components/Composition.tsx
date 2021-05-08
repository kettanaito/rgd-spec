import * as React from 'react'
import styled from 'styled-components'
import {
  BoxProps,
  CompositionProps,
  CompositionRenderProp,
  AreaComponent,
  parseTemplates,
  generateComponents,
  applyStyles,
  warn,
  omitProps,
} from '@atomic-layout/core'
import Box from './Box'
import { withPlaceholder } from '../utils/withPlaceholder'
import { forwardRef } from '../utils/forwardRef'

const CompositionWrapper = styled.div<CompositionProps>`
  && {
    ${applyStyles};
    display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  }
`

const createAreaComponent = (areaName: string): AreaComponent =>
  forwardRef((props: BoxProps, ref) => {
    return <Box ref={ref} area={areaName} {...props} />
  })

const Composition = forwardRef<unknown, CompositionProps>(
  ({ children, ...restProps }, ref) => {
    const areasList = parseTemplates(restProps)

    // Memoize areas generation so parental updates do not re-generate areas,
    // making area components preserve their internal state.
    const Areas = React.useMemo(() => {
      return generateComponents(areasList, createAreaComponent, withPlaceholder)
    }, [areasList])

    const hasAreaComponents = Object.keys(Areas).length > 0
    const childrenType = typeof children
    const hasChildrenFunction = childrenType === 'function'

    // Warn when provided "areas"/"template" props, but didn't use a render prop pattern.
    warn(
      !(hasAreaComponents && !hasChildrenFunction),
      `Failed to render 'Composition' with template areas ["${Object.keys(
        Areas,
      ).join(
        '", "',
      )}"]: expected children to be a function, but got: ${childrenType}. Please provide render function as children, or remove assigned template props (\`areas\`/\`template\`).`,
    )

    return (
      <CompositionWrapper ref={ref} {...restProps}>
        {hasAreaComponents && hasChildrenFunction
          ? (children as CompositionRenderProp)(Areas)
          : children}
      </CompositionWrapper>
    )
  },
)

Composition.displayName = 'Composition'

export default Composition
