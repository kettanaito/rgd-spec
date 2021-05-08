import * as React from 'react'
import styled from 'styled-components'
import { BoxProps, omitProps, applyStyles } from '@atomic-layout/core'

const Box: React.FC<BoxProps> = styled(
  ({ as: As = 'div', ...rest }: BoxProps) => <As {...omitProps(rest)} />,
)`
  display: ${({ flex, inline }) =>
    flex
      ? inline
        ? 'inline-flex'
        : 'flex'
      : inline
      ? 'inline-block'
      : 'block'};

  && {
    ${applyStyles};
  }
`

Box.displayName = 'Box'

/**
 * @todo Export a regular Box by default to be used by Emotion,
 * which does attributes clean up by default.
 * Export a Box with responsive props omitted for styled-components
 * version.
 */
// export const BoxWithoutAttributesPolution

export default Box
