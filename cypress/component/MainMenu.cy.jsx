import MainMenu from '../../src/components/MainMenu';
import React from 'react';

describe('MainMenu.cy.js', () => {
    
    it('should have three buttons', () => {
        cy.mount(<MainMenu />);
        cy.contains('Start Game');
        cy.contains('Settings');
        cy.contains('Credits');
    });

    it('should open the proper components', () => {
        const onClickSpy = cy.spy().as('onClickSpy');

        cy.mount(<MainMenu send={onClickSpy}/>);

        cy.contains('Start Game').click();
        cy.get('@onClickSpy').should('have.been.called.with','startGame');
        cy.contains('Settings').click();
        cy.get('@onClickSpy').should('have.been.called.with','showSettings');
        cy.contains('Credits').click();
        cy.get('@onClickSpy').should('have.been.called.with','showCredits');

    });
});