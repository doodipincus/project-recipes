/// <reference types="cypress" />

context('Sanity', () => {
    beforeEach(() => {
      cy.visit('https://internet-israel.com');
    });
  
    describe('First page is loading', () => {
      it('Header is there', () => {
        cy.get('body')
          .find('h2')
          .should('be.visible');
      });
    });

    describe('First page is loading', () => {
        it('Header is there', () => {
          cy.get('body')
            .find('h3')
            .should('be.visible');
        });
      });


  });


//   context('Sanity', () => {
//     beforeEach(() => {
//       cy.visit('https://internet-israel.com');
//     });
  
    // describe('First page is loading', () => {
    //   it('Header is there', () => {
    //     cy.get('body')
    //       .find('button')
    //       .click()
    //       .should('be.visible');
    //   });
    // });
  
//   });