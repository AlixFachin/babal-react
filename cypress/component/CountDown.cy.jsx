import CountDown from "../../src/components/CountDown";
import React from "react";

describe('CountDown component', () => {
    it('should display the proper countdown', () => {
        const onLeaveSpy = cy.spy().as('onLeaveSpy');
        
        cy.clock();
        cy.mount(<CountDown initialCount={5} onCountDownEnd={onLeaveSpy} />);

        cy.contains('5');
        cy.tick(1000);
        cy.contains('4');
        cy.get('@onLeaveSpy').should('not.have.been.called');
        cy.tick(1000);
        cy.contains('3');
        cy.get('@onLeaveSpy').should('not.have.been.called');
        cy.tick(1000);
        cy.contains('2');
        cy.get('@onLeaveSpy').should('not.have.been.called');
        cy.tick(1000);
        cy.contains('1');
        cy.get('@onLeaveSpy').should('not.have.been.called');
        cy.tick(1000);
        cy.get('@onLeaveSpy').should('have.been.called');
    });
});