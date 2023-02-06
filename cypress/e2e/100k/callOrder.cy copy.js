describe('CallOrder', () => {

    beforeEach( () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.env('StoKoneyApiUrl')+'/orders',
          }).as('matchedOrderCall')                           // Перехватываем post запрос login

        cy.visit(Cypress.env('StoKoneyUrl'))
        cy.contains('Подпишитесь на SMS рассылку')
        .parent()
        .parent()
        .parent()
    })

    it.skip('Основной сценарий', () => {
       

       cy.wait('@matchedOrderCall').then(({response}) => {           // пока не завершится запрос не переходим к следующему шагу
        expect(response.statusCode).to.eq(201)
    })
    cy.contains('Ваш вопрос успешно отправлен')
    .should('exist')
    })

    

    
})
