import React from 'react'
import { Numeric } from '@atomic-layout/core'
import useResponsiveProps from './useResponsiveProps'

/**
 * Returns a copy of the given React component
 * that supports Responsive Props API.
 */
function useResponsiveComponent<
  OwnProps extends Record<string, any>,
  ResponsiveProps extends Record<string, Numeric>
>(
  Component: React.FC<OwnProps>,
): React.FC<OwnProps & Partial<ResponsiveProps>> {
  return (responsiveProps) => {
    /**
     * @see https://github.com/Microsoft/TypeScript/issues/29049
     */
    const actualProps = useResponsiveProps<typeof responsiveProps>(
      responsiveProps,
    ) as OwnProps & Partial<ResponsiveProps>

    return <Component {...actualProps} />
  }
}

export default useResponsiveComponent