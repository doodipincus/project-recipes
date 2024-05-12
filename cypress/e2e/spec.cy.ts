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
  

    describe('First page is loading', () => {
      it('Header is there', () => {
        cy.get('body')
          .find('h1')
          .contains('אינטרנט')
          .should('be.visible');
      });
    });

    describe('First page is loading', () => {
      it('Header is there', () => {
        cy.get('body')
          .get('h3')
          .find('a')
          .contains('מכירים ')
          .click()
          .should('be.visible');
      });
    });

  });


