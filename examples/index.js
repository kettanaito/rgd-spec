import React from 'react'
import { storiesOf } from '@storybook/react'
import './styles.css'

/**
 * Configuration
 */
import ConfigCustomUnit from './configuration/CustomUnit'
import ConfigCustomBreakpoints from './configuration/CustomBreakpoints'

storiesOf('Configuration|Default configuration', module).add(
  'Nothing so far',
  () => <p>TODO</p>,
)
storiesOf('Configuration|Custom configuration', module)
  .add('Custom unit', () => <ConfigCustomUnit />)
  .add('Custom breakpoints', () => <ConfigCustomBreakpoints />)

/**
 * Box
 */
import BoxDisplayOverride from './components/Box/DisplayOverride'

storiesOf('Components|Box', module).add(
  'Properties override',
  BoxDisplayOverride,
)

/**
 * Composition
 */
import TemplateIndentation from './components/Composition/declaration/TemplateIndentation'
import Templateless from './components/Composition/declaration/Templateless'
import TemplatePeriod from './components/Composition/declaration/TemplatePeriod'
import GridTemplate from './components/Composition/declaration/GridTemplate'
import CompositionOrderProp from './components/Composition/declaration/OrderProp'
storiesOf('Components|Composition/Declaration', module)
  .add('Template indentation', TemplateIndentation)
  .add('Template-less composition', Templateless)
  .add('Template period', TemplatePeriod)
  .add('Grid template syntax', GridTemplate)
  .add('Order prop', CompositionOrderProp)

import WeakArea from './components/Composition/rendering/WeakArea'
import NamespaceCollision from './components/Composition/rendering/NamespaceCollision'
import NestedComposition from './components/Composition/rendering/NestedComposition'
storiesOf('Components|Composition/Rendering', module)
  .add('Weak areas', WeakArea)
  .add('Namespace collision', NamespaceCollision)
  .add('Nested composition', NestedComposition)

import BellRendering from './components/Composition/rendering/behaviors/Bell'
import MobileFirstRendering from './components/Composition/rendering/behaviors/MobileFirst'
import NotchRendering from './components/Composition/rendering/behaviors/Notch'
storiesOf('Components|Composition/Rendering/Behaviors', module)
  .add('Mobile-first', MobileFirstRendering)
  .add('Bell', BellRendering)
  .add('Notch', NotchRendering)

import BreakpointEdges from './components/Composition/rendering/responsive-props/BreakpointEdges'
import MobileFirstResponsiveProps from './components/Composition/rendering/responsive-props/MobileFirst'
import BreakpointSpecificResponsiveProps from './components/Composition/rendering/responsive-props/BreakpointSpecific'
import InclusiveNotchResponsiveProps from './components/Composition/rendering/responsive-props/InclusiveNotch'
storiesOf('Components|Composition/Rendering/Responsive props', module)
  .add('Breakpoint edges', BreakpointEdges)
  .add('Mobile-first', MobileFirstResponsiveProps)
  .add('Breakpoint-specific', BreakpointSpecificResponsiveProps)
  .add('Inclusive-notch', InclusiveNotchResponsiveProps)

/**
 * Only
 */
import OnlyDefaultBehavior from './components/Only/OnlyDefaultBehavior'
import OnlyCustomBreakpoints from './components/Only/OnlyCustomBreakpoints'

storiesOf('Components|Only', module)
  .add('Default behavior', OnlyDefaultBehavior)
  .add('Custom breakpoints', OnlyCustomBreakpoints)

/**
 * Visible
 */
import VisibleDefaultBehavior from './components/Visible/VisibleDefaultBehavior'

storiesOf('Components|Visible', module).add(
  'Default behavior',
  VisibleDefaultBehavior,
)

/**
 * Hooks
 */
import UseViewportChange from './hooks/UseViewportChange'
import UseResponsiveValue from './hooks/UseResponsiveValue'
import UseBreakpointChange from './hooks/UseBreakpointChange'
import UseCurrentBreakpoints from './hooks/UseCurrentBreakpoints'
import UseResponsiveProps from './hooks/UseResponsiveProps'

storiesOf('Hooks', module)
  .add('useViewportChange', () => <UseViewportChange />)
  .add('useResponsiveValue', () => <UseResponsiveValue />)
  .add('useBreakpointChange', () => <UseBreakpointChange />)
  .add('useCurrentBreakpoints', () => <UseCurrentBreakpoints />)
  .add('useResponsiveProps', () => <UseResponsiveProps />)

/**
 * Utilities
 */
import QueryExample from './utils/Query/Query'
import MakeResponsive from './utils/MakeResponsive/MakeResponsive'

storiesOf('Utilities', module)
  .add('query', () => <QueryExample />)
  .add('makeResponsive', MakeResponsive)

/**
 * Semantics
 */
import PolymorphicProp from './semantics/PolymorphicProp'

storiesOf('Semantics', module).add('Polymorphic prop', PolymorphicProp)

/**
 * Recipes
 */
import IterativeAreas from './recipes/IterativeAreas'

storiesOf('Recipes|All', module).add('Iterative areas', IterativeAreas)

/**
 * Regression
 */
import DisplayNames from './regression/DisplayNames'
import StylesUndefined from './regression/StylesUndefined'
import SingleResponsiveProp from './regression/SingleResponsiveProp'
import OnlyUnmount from './regression/OnlyUnmount'
import ParentRerendering from './regression/ParentRerendering'

storiesOf('Regression|All', module)
  .add('Display names', DisplayNames)
  .add('Styles undefined', StylesUndefined)
  .add('Single responsive prop', SingleResponsiveProp)
  .add('Only unmount', OnlyUnmount)
  .add('Parent re-rendering', ParentRerendering)
