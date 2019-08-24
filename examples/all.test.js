/**
 * Configuration
 */
describe('Configuration', () => {
  require('./configuration/CustomUnit.test')
  require('./configuration/CustomBreakpoints.test')
})

/**
 * Components
 */
describe('Components', () => {
  describe('Box', () => {
    require('./components/Box/DisplayOverride.test')
  })

  describe('Composition', () => {
    describe('Declaration', () => {
      require('./components/Composition/declaration/TemplateIndentation.test')
      require('./components/Composition/declaration/TemplatePeriod.test')
      require('./components/Composition/declaration/Templateless.test')
      require('./components/Composition/declaration/GridTemplate.test')
    })

    describe('Rendering', () => {
      require('./components/Composition/rendering/NamespaceCollision.test')
      require('./components/Composition/rendering/NestedComposition.test')
      require('./components/Composition/rendering/WeakAreas.test')

      /**
       * @todo Behavior test suites are not loaded correctly in Cypress.
       * May be related to reusage of these scenarios in other tests
       * (i.e. Configuration > Custom unit)
       */
      describe('Behaviors', () => {
        require('./components/Composition/rendering/behaviors/MobileFirst.test')
        require('./components/Composition/rendering/behaviors/Bell.test')
        require('./components/Composition/rendering/behaviors/Notch.test')
      })

      describe('Responsive props', () => {
        require('./components/Composition/rendering/responsive-props/MobileFirst.test')
        require('./components/Composition/rendering/responsive-props/InclusiveNotch.test')
        require('./components/Composition/rendering/responsive-props/BreakpointSpecific.test')
        require('./components/Composition/rendering/responsive-props/BreakpointEdges.test')
      })
    })
  })

  describe('Only', () => {
    require('./components/Only/OnlyDefaultBehavior.test')
    require('./components/Only/OnlyCustomBreakpoints.test')
  })
})

/**
 * Hooks
 */
describe('Hooks', () => {
  require('./hooks/UseViewportChange.test')
  require('./hooks/UseBreakpointChange.test')
  require('./hooks/UseResponsiveValue.test')
  require('./hooks/useResponsiveProps.test')
})

/**
 * Semantics
 */
describe('Semantics', () => {
  require('./semantics/PolymorphicProp.test')
})

/**
 * Recipes
 */
describe('Recipes', () => {
  require('./recipes/IterativeAreas.test')
})

/**
 * Regression tests
 */
describe('Regression tests', () => {
  require('./regression/StylesUndefined.test')
})
