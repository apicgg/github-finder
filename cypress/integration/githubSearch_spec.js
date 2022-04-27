/* eslint-disable no-undef */
describe('search github accounts', () => {
  it('test', () => {
    cy.visit('http://localhost:3000/')
    const name = 'brad'
    cy.findByRole('textbox').type(name)
    cy.findByRole('button', { name: /go/i }).click()
    cy.findByRole('link', { name: /bradtraversy/i }).within(() => {})
    // cy.get('.flex-grow-0')
    cy.findByRole('link', { name: /visit github profile/i }).click()
  })
})
