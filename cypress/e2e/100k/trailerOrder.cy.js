describe('Trailer order', () => {

    beforeEach( () => {

        cy.viewport(1920, 1080)

        cy.intercept({
            method: 'POST',
            url: Cypress.env('StoKoneyApiUrl')+'/trailers/**',
          }).as('matchedTrailerOrder')                           

        cy.visit(Cypress.env('StoKoneyUrl'))

        cy.contains('Каталог')
        .click()

        cy.contains('Прицепы')
        .click()  
        
        cy.contains('Атлет 8213В5 (3010х1480х380 мм)')
        .parent()
        .parent()
        .parent()
        .find('button')
        .click()
        
        cy.contains('Заказать')
        .click()  
    })

    it.skip('Основной сценарий', () => {
       cy.contains('ФИО')
       .parent()
       .type('Иван')

       cy.contains('Телефон')
       .parent()
       .type('9685468952')

       cy.get('input[placeholder="E-mail"]')
       .type('ivan@gmail.com')

       cy.get('textarea[placeholder="Ваш комментарий"]')
       .type('мой комментарий')

       cy.contains('Атлет 8213В5 (3010х1480х380 мм)')
       .should('be.visible')

       cy.contains('Оформить заказ')
       .parent()
       .parent()
       .find('button')
       .contains('Отправить')
       .click({force:true})

       cy.wait(1000)

       cy.wait('@matchedTrailerOrder').then(({response}) => {           // пока не завершится запрос не переходим к следующему шагу
        expect(response.statusCode).to.eq(201)
    })
    cy.contains('Ваша заявка успешно отправлена')
    .should('exist')
    })

    it.skip('Альтернативный сценарий - некорректные символы', () => {

        cy.contains('ФИО')
        .parent()
        .type('@@@')
 
        cy.contains('Телефон')
        .parent()
        .type('@@@')
 
        cy.get('input[placeholder="E-mail"]')
        .type('🎄🎄🎄@gmail.com')
 
        cy.get('textarea[placeholder="Ваш комментарий"]')
        .type('🎄🎄🎄')
 
        cy.contains('Атлет 8213В5 (3010х1480х380 мм)')
        .should('be.visible')
 
        cy.contains('Оформить заказ')
        .parent()
        .parent()
        .find('button')
        .contains('Отправить')
        .click({force:true})
 
        cy.wait(1000)
 
        cy.get('input[value="@@@"]')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
 
        cy.contains('Телефон')
        .parent()
        .find('input')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
 
        cy.get('input[placeholder="E-mail"]')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
 
        cy.get('textarea[placeholder="Ваш комментарий"]')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')

        cy.contains('ФИО не должно содержать цифры или  специальные символы, кроме - , \',  `')
        .should('exist')

        cy.contains('Адрес электронной почты содержит некорректные символы')
        .should('exist')

        cy.contains('Комментарий содержит некорректные символы')
        .should('exist')
 
 
     })

     it('Альтернативный сценарий - пустые поля', () => {

 
        cy.contains('Атлет 8213В5 (3010х1480х380 мм)')
        .should('be.visible')
 
        cy.contains('Оформить заказ')
        .parent()
        .parent()
        .find('button')
        .contains('Отправить')
        .click({force:true})
 
        cy.wait(1000)
 
        cy.contains('ФИО')
        .parent()
        .find('input')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
 
        cy.get('input')
        .contains('Телефон')
      
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
 
        cy.get('input[placeholder="E-mail"]')
        .parent()
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
 
        cy.get('textarea[placeholder="Ваш комментарий"]')
        .parent()
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
 
 
     })

     it.skip('Альтернативный сценарий - телефон заполнен не полностью', () => {

        cy.contains('ФИО')
        .parent()
        .type('Иван')
 
        cy.contains('Телефон')
        .parent()
        .type('968')
 
        cy.get('input[placeholder="E-mail"]')
        .type('ivan@gmail.com')
 
        cy.get('textarea[placeholder="Ваш комментарий"]')
        .type('мой комментарий')
 

        cy.contains('Атлет 8213В5 (3010х1480х380 мм)')
        .should('be.visible')
 
        cy.contains('Оформить заказ')
        .parent()
        .parent()
        .find('button')
        .contains('Отправить')
        .click({force:true})
 
        cy.wait(1000)
 
        cy.get('input[value="+7 (968) ___ __ __"]')
        .should('have.css', 'border-color', 'rgb(189, 32, 37)')
  
     })

    
})
