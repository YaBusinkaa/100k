describe('CallOrder', () => {

    beforeEach( () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.env('StoKoneyApiUrl')+'/orders',
          }).as('matchedOrderCall')                           // Перехватываем post запрос login

        cy.visit(Cypress.env('StoKoneyUrl'))
        // cy.contains('Подпишитесь на SMS рассылку')
        // .parent()
        // .parent()
        // .parent()
    })

    it.skip('Основной сценарий', () => {
       
        cy.wait(1000)

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .parent()
        .find('input')
        .type('9685468952')

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .click({ force: true })
        
       cy.wait('@matchedOrderCall').then(({response}) => {           // пока не завершится запрос не переходим к следующему шагу
        expect(response.statusCode).to.eq(201)
    })

    cy.contains('Вы подписаны на рассылку')                            // не знаю какое сообщение о подписке, не реализовано
    .should('exist')
    })

    it.skip('Альтернативный сценарий - телефон подписан на рассылку', () => {
       
        cy.wait(1000)

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .parent()
        .find('input')
        .type('9685468952')

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .click({ force: true })

    cy.contains('Вы уже подписаны на рассылку')                            // не знаю какое сообщение о подписке, не реализовано
    .should('exist')
    })

    it.skip('Альтернативный сценарий - телефон подписан на рассылку', () => {

        cy.wait(1000)

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .parent()
        .find('input')
        .type('@@@')

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .click({ force: true })

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .parent()
        .find('input')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
    })

    it.skip('Альтернативный сценарий - пустые поля', () => {

        cy.wait(1000)

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .click({ force: true })

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .parent()
        .find('input')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
        
    })

    it('Альтернативный сценарий - телефон подписан на рассылку', () => {

        cy.wait(1000)

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .parent()
        .find('input')
        .type('895')

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .click({ force: true })

        cy.get('button')
        .contains('Подписаться')
        .eq(1)
        .parent()
        .find('input')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
    })
    
})
