
describe('Testing Menu architecture / state machine', function() {
    it('Should have the main menu displaying on start', function() {
        cy.visit('localhost:3000');
        cy.contains('BABAL');
        // Checking the link to the "Main Menu"
        cy.contains('Start Game').click();
        
    })
})