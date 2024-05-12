beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4:
*/

describe('Section 1: Functional tests', () => {

    const myEmail = 'ingus@innocent.lv'
    let password = 'test1234'
    const number = '37126188326'
    const username = 'chingijs'
    const lastname = 'Baltrums'
    const firstname = 'Ingus'


    it('User can use only same both first and validation passwords', ()=>{
        
       
      cy.get('#username').type(username)
      cy.get('#email').type(myEmail)
      cy.get('input[name="name"]').type(firstname)
      cy.get('#lastName').type(lastname)
      cy.get('[data-testid="phoneNumberTestId"]').type(number)
      cy.get('input[name="password"]').type('test123')
      cy.get('#confirm').type(password)
      cy.get('h2').contains('Password').click()
      cy.get('.submit_button').should('be.disabled')
      cy.get('#success_message').should('not.be.visible')
      cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')


      cy.get('input[name="password"]').clear()
      cy.get('#confirm').clear()
      cy.get('input[name="password"]').type(password)
      cy.get('#confirm').type(password)
      cy.get('h2').contains('Password').click()
      cy.get('#password_error_message').should('not.be.visible')
      cy.get('.submit_button').should('be.enabled')

    })
    
    it('User can submit form with all fields added', ()=>{
        
        
        cy.get('#username').type(username)
        cy.get('#email').type(myEmail)
        cy.get('input[name="name"]').type(firstname)
        cy.get('#lastName').type(lastname)
        cy.get('[data-testid="phoneNumberTestId"]').type(number)
        cy.get('input[type="radio"]').first().check()
        cy.get('input[class="checkbox vehicles"]').first().check()
        cy.get('#cars').select('audi')
        cy.get('#animal').select('hippo')
        cy.get('input[name="password"]').type(password)
        cy.get('#confirm').type(password)
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')

       
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        
       
        inputValidData('chingijs')

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain', 'User successfully submitted registration')

      
    })

    it('Check that user cannot submit form with lastname missing', ()=>{
        
       
       lastnameMissing('chingijs') 

        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
       
      
    })

  

})

/*
Assignement 5: 
*/

describe('Section 2: Visual tests', () => {




    it('Check that cerebrum hub logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178).and('be.greaterThan', 100)   
      
    })


    it('Check that cypress logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src')
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 178).and('be.greaterThan', 100)   
        
        
    });






    it('Check navigation part for Registration form 1', () => {
        
        
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible').and('have.attr', 'href', 'registration_form_1.html').click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part for Registration form 3', () => {
        
        
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'registration_form_3.html').click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })




    it('Check that radio button list is correct', () => {
       
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    

    it('Check that checkbox list is correct', () => {
       
        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')
        
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
      
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })






    it('Car dropdown is correct', () => {
       
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')


        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    it('Animal dropdown is correct', () => {
       

        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        
        
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

        
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo','cow','mouse'])
        })
    })






})






function inputValidData(username) {


    cy.log('Mandatory fields')
    cy.get('#username').type(username)
    cy.get('#email').type('ingus@gmail.com')
    cy.get('input[name="name"]').type('Ingus')
    cy.get('#lastName').type('Baltrums')
    cy.get('[data-testid="phoneNumberTestId"]').type('212312321')
    cy.get('input[name="password"]').type('test123')
    cy.get('#confirm').type('test123')
    cy.get('h2').contains('Password').click()
}

function lastnameMissing(username) {


    cy.log('Mandatory fields')
    cy.get('#username').type(username)
    cy.get('#email').type('ingus@gmail.com')
    cy.get('input[name="name"]').type('Ingus')
    cy.get('[data-testid="phoneNumberTestId"]').type('212312321')
    cy.get('input[name="password"]').type('test123')
    cy.get('#confirm').type('test123')
    cy.get('h2').contains('Password').click()
}