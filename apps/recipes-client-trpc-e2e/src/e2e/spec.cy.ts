/// <reference types="cypress" />

context('Sanity', () => {
    beforeEach(() => {
      cy.visit('https://internet-israel.com');
    });
  
    describe('First page is loading', () => {
      it('Header is there', () => {
        cy.get('body')
          .find('h1')
          .should('be.visible');
      });
    });
  
  });