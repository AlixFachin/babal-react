describe('empty spec', () => {
  it('passes', () => {
    
    cy.visit('localhost:3000')
    
    cy.contains('BABAL')
  })
})