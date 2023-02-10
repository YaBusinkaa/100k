describe('CallOrder', () => {

    beforeEach( () => {
        cy.viewport(1920, 1080)

        cy.visit(Cypress.env('StoKoneyUrl')+'/body-repair',)

    })

    it('Основной сценарий', () => {
       
        cy.wait(1000)

        cy.get('input[id="Порог (левый)52"]')
        .parent()
        .click()

        cy.get('input[id="Крыло заднее (левое)92"]')
        .parent()
        .click()

        cy.get('input[id="Крышка багажника33"]')
        .parent()
        .click()

        cy.contains('Стоимость ремонта: от 49 500 руб')

        cy.contains('Выбрано элементов: 3')
    })

    it('Альтернативный сценарий', () => {
       
        cy.wait(1000)

        cy.get('input[id="Дверь задняя (правая)123"]')
        .parent()
        .click()

        cy.get('input[id="Крыло переднее (правое)64"]')
        .parent()
        .click()

        cy.get('input[id="Крыша04"]')
        .parent()
        .click()

        cy.get('input[id="Крыша01"]')
        .parent()
        .click()

        cy.contains('Стоимость ремонта: от 114 000 руб')

        cy.contains('Выбрано элементов: 4')
    })

})
