import auth from '../fixtures/auth.json';
import order from '../fixtures/order.json';
import ingredients from '../fixtures/ingredients.json';

describe("creating order", () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', { fixture: "auth.json" });
        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: "order.json" });
        cy.visit('http://localhost:3000/login');
        cy.get("[data-testid=email_input]").type(auth.user.email);
        cy.get("[data-testid=password_input]").type('123123213');
        cy.get("[data-testid=login_button]").click();
    });
    it('user should be authorized', () => {
        cy.contains("[data-testid=header_user_name_container]", auth.user.name)
    })

    it('ingredients should drag and drop', () => {
        checkDragElements();
        cy.get("[data-testid=constructor_existed_items_container]").should('exist');
    })

    it('created order modal with data should open', () => {
        checkPlaceOrder();
    })

    it('modal window should close on button click', () => {
        checkPlaceOrder();
        cy.get("[data-testid=modal_container]").should('exist');
        cy.get(`[data-testid=modal_empty_header_close_button]`).click();
        cy.get("[data-testid=modal_container]").should('not.exist');
    });
})

const checkPlaceOrder = () => {
    checkDragElements();
    cy.get(`[data-testid=place_order_button]`).click();
    cy.get("[data-testid=modal_container]").should('exist');
    cy.get("[data-testid=order_details_number]").should('have.text', order.order.number);
}

const checkDragElements = () => {
    const selectedIngredients = [ingredients.data[0], ingredients.data[3], ingredients.data[5]];
    selectedIngredients.forEach(ingredient => {
        const dataTransfer = new DataTransfer();

        cy.get(`[data-testid=ingredient_item_${ingredient._id}]`).trigger('dragstart', {
            dataTransfer
        });

        cy.get("[data-testid=constructor_drop_container]").trigger('drop', {
            dataTransfer
        });
    })
}