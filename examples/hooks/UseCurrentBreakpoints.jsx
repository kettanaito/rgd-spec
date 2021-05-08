import React from 'react'
import { useCurrentBreakpoints } from 'atomic-layout'

const UseCurrentBreakpointsScenario = () => {
  const breakpoints = useCurrentBreakpoints()

  return (
    <p>
      Current breakpoint:{' '}
      <span data-test-id="current-breakpoints">{breakpoints.join()}</span>
    </p>
  )
}

export default UseCurrentBreakpointsScenario
