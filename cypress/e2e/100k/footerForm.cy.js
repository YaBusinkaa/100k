describe('Footer form', () => {

    beforeEach( () => {
        cy.intercept({
            method: 'POST',
            url: Cypress.env('StoKoneyApiUrl')+'/orders',
          }).as('matchedFooterForm')                           // Перехватываем post запрос login

        cy.visit(Cypress.env('StoKoneyUrl'))
        cy.contains('У Вас остались вопросы?')
        .parent()
        .parent()
    })

    it.skip('Основной сценарий', () => {
       cy.get('input[name="FIO"]')
       .type('Иван')

       cy.contains('Ваш телефон')
       .parent()
       .type('9685468952')

       cy.get('input[name="email"]')
       .type('ivan@gmail.com')

       cy.contains('Выберите дилерский центр')
       .parent()
       .click()
       
       cy.contains('Дилерский центр KIA')
       .click()

       cy.get('textarea[name="question"]')
       .type('мой вопрос')

       cy.get('button')
       .contains('Отправить')
       .click()

       cy.wait('@matchedFooterForm').then(({response}) => {           // пока не завершится запрос не переходим к следующему шагу
        expect(response.statusCode).to.eq(201)
    })
    cy.contains('Ваш вопрос успешно отправлен')
    .should('exist')
    })

    it.skip('Альтернативный сценарий - некорректные символы', () => {
        cy.get('input[name="FIO"]')
        .type('@@@')
 
        cy.contains('Ваш телефон')
        .parent()
        .type('@@@')
 
        cy.get('input[name="email"]')
        .type('@@@')
 
        cy.contains('Выберите дилерский центр')
        .parent()
        .click()
        
        cy.contains('Дилерский центр KIA')
        .click()
 
        cy.get('textarea[name="question"]')
        .type('🎄🎄🎄')
 
        cy.get('button')
        .contains('Отправить')
        .click()
 
        cy.contains('Адрес электронной почты содержит некорректные символы')
        .should('exist')

        cy.contains('Ваше обращение содержит некорректные символы')
        .should('exist')
     })

     it.skip('Альтернативный сценарий - пустые поля', () => {
     
        cy.get('button')
        .contains('Отправить')
        .click()


        cy.get('input[name="FIO"]')
        //.parent()
        //.find('fieldset')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
 
        cy.get('input[class="maskedInput"]')
            .should('have.css', 'border-color', 'rgb(189, 32, 37)')

 
        cy.contains('Выберите дилерский центр')
        .parent()
            .should('have.css', 'border-color', 'rgb(189, 32, 37)')
 
        cy.get('textarea[name="question"]')
            .should('have.css', 'border-color', 'rgb(189, 32, 37)')

     })

     it.skip('Альтернативный сценарий - пробелы в текстовых полях', () => {
     
        cy.get('input[name="FIO"]')
        .type('   ')
 
        cy.contains('Ваш телефон')
        .parent()
        .type('   ')
 
        cy.get('input[name="email"]')
        .type('   ')
 
        cy.contains('Выберите дилерский центр')
        .parent()
        .click()
        
        cy.contains('Дилерский центр KIA')
        .click()
 
        cy.get('textarea[name="question"]')
        .type('   ')
 
        cy.get('button')
        .contains('Отправить')
        .click()
 
        cy.contains('Адрес электронной почты содержит некорректные символы')
        .should('exist')

        cy.contains('Ваше обращение содержит некорректные символы')
        .should('exist')

     })

     it('Альтернативный сценарий - телефон не по маске', () => {
     
        cy.get('input[name="FIO"]')
       .type('Иван')

       cy.contains('Ваш телефон')
       .parent()
       .type('968')

       cy.get('input[name="email"]')
       .type('ivan@gmail.com')

       cy.contains('Выберите дилерский центр')
       .parent()
       .click()
       
       cy.contains('Дилерский центр KIA')
       .click()

       cy.get('textarea[name="question"]')
       .type('мой вопрос')

        cy.get('button')
        .contains('Отправить')
        .click()
 
        cy.get('input[class="maskedInput"]')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')

     })

    
})
