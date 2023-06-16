import ingredients from '../fixtures/ingredients.json';

describe("open ingredient details modal", () => {
    const ingredient = ingredients.data[0];
    beforeEach(() => {
        cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', { fixture: "ingredients.json" });
        cy.visit('http://localhost:3000');
        cy.get(`[data-testid=ingredient_item_${ingredient._id}]`).click();
    });
    it('should open modal window', () => {
        cy.get("[data-testid=modal_container]").should('exist');
    });

    it('modal window should contains ingredient data', () => {
        cy.get("[data-testid=ingredient_details_name]").should('have.text', ingredient.name);
    });

    it('modal window should close on button click', () => {
        cy.get("[data-testid=modal_container]").should('exist');
        cy.get(`[data-testid=modal_close_button]`).click();
        cy.get("[data-testid=modal_container]").should('not.exist');
    });
})