describe('useCurrentBreakpoints', () => {
  before(() => {
    cy.loadStory(['hooks'], ['usecurrentbreakpoints'])
  })

  it('Returns the default breakpoint on initial render', () => {
    cy.get('[data-test-id="current-breakpoints"]').should('have.text', 'xs')
  })

  it('Returns "sm" breakpoint name on "sm" breakpoint', () => {
    cy.setBreakpoint('sm')
    cy.get('[data-test-id="current-breakpoints"]').should('have.text', 'sm')
  })

  it('Returns "md" breakpoint name on "md" breakpoint', () => {
    cy.setBreakpoint('md')
    cy.get('[data-test-id="current-breakpoints"]').should('have.text', 'md')
  })

  it('Returns "lg" breakpoint name on "lg" breakpoint', () => {
    cy.setBreakpoint('lg')
    cy.get('[data-test-id="current-breakpoints"]').should('have.text', 'lg')
  })

  it('Returns "xl" breakpoint name on "xl" breakpoint', () => {
    cy.setBreakpoint('xl')
    cy.get('[data-test-id="current-breakpoints"]').should('have.text', 'xl')
  })
})
