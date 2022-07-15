import Settings from '../../src/components/Settings.jsx';
import React from 'react';

describe('MainMenu.cy.js', () => {
    
    it('should display the proper content', () => {
        cy.mount(<Settings appConfig={{ isMusicOn: true, isMobileControl: true, isDebugMode: true }}/>);
        cy.contains('Music Playing');
        cy.contains('Mobile Controls Mode');
        cy.contains('Show Debug Information');
        cy.contains('Reset Scores');
        cy.contains('Save Configuration');
        cy.contains('Back Home');
    });

    for (let mobileFlag of [true, false]) {
        for (let musicFlag of [true, false]) {
            for (let debugFlag of [true, false]) {
                it(`should initialize with proper values (${musicFlag}, ${mobileFlag}, ${debugFlag})`, () => {
                    cy.mount(<Settings appConfig={{ isMusicOn: musicFlag, isMobileControl: mobileFlag, isDebugMode: debugFlag }} />);
                    cy.get('input[name="music"]').should(`${musicFlag ? '' : 'not.to.'}be.checked`);
                    cy.get('input[name="mobile"]').should(`${mobileFlag ? '' : 'not.to.'}be.checked`);
                    cy.get('input[name="debug"]').should(`${debugFlag ? '' : 'not.to.'}be.checked`);
                });
            }
        }
    }
    
    it('should not call the save function when options are clicked', () => {
        const onClickSpy = cy.spy().as('onClickSpy');

        cy.mount(<Settings appConfig={{ isMusicOn: true, isMobileControl: true, isDebugMode: true }} setAppConfig={onClickSpy} />);
        cy.get('input[name="music"]').click();
        cy.get('input[name="mobile"]').click();
        cy.get('input[name="debug"]').click();
        cy.get('@onClickSpy').should('not.have.been.called');
        cy.contains('Save Configuration').click();
        cy.get('@onClickSpy').should('have.been.calledWithExactly',{ isMusicOn: false, isMobileControl: true, isDebugMode: false })
        
    });
    
    it('should go back to main menu when clicked on main menu', () => {
        const onClickSpy = cy.spy().as('onClickSpy');
        const backHomeSpy = cy.spy().as('backHomeSpy');
        cy.mount(<Settings appConfig={{ isMusicOn: true, isMobileControl: true, isDebugMode: true }} setAppConfig={onClickSpy} returnHome={backHomeSpy} />);
        cy.contains('Back Home').click();
        cy.get('@backHomeSpy').should('have.been.called');

    });
});