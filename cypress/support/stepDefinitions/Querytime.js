import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import myPage from '../pageObject/myPage';
import { StringText } from '../shareObjects';

const myPageObject = new myPage();

let environment=Cypress.env("environment")
let testData;
let path="";


// Given('設定測試檔案{string}', (dataFilePath) => {
//      path=environment.concat('/',dataFilePath)
//    cy.fixture(path).as("testData")
//    .then(data => {
//      cy.log(data)
//      testData=data
//    });
// });

// Given('進入高鐵官網 {string}', () => {
//     cy.visit('https://www.thsrc.com.tw/');
// });

// Then('確認視窗我同意',() => {
//     cy.get('div[role="dialog"]').contains('button','我同意').click();
//     cy.wait(2000);
// })

When('點選"時刻表與票價查詢"', () => {
    cy.contains('a','時刻表與票價').click({ force: true });
});

When('選擇出發站為-左營', () => {
    cy.get('#select_location01').select('左營');
    cy.wait(4000);
});

When('選擇到達站為-板橋', () => {
    cy.get('#select_location02').select('板橋');
    cy.wait(4000);
});

When('選擇-單程', () => {
    cy.get('select[id="typesofticket"]').find('option[value="tot-1"]').click({force: true});
    cy.wait(4000);
});

When('選擇出發日期為明天', () => {
    cy.get('#Departdate03').click(); 
    cy.get('.datepicker-days', { timeout: 10000 }).should('be.visible');
    cy.wait(4000);

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dayToSelect = tomorrowDate.getDate();
    const monthToSelect = tomorrowDate.toLocaleString('default', { month: 'long' });

    cy.get('.datepicker-days td.day').contains(dayToSelect) .click({force: true}); 
    cy.wait(4000);
});

When('選擇出發時間為現在時間', () => {
  cy.get('input[type="text"][id="outWardTime"]');
  cy.wait(4000);
 
});

When('選擇-適用優惠', () => {
  cy.get('.filter-option-inner-inner').contains('適用優惠');
  cy.wait(4000);
});

When('點選查詢', () => {
  cy.get('button[title="查詢"]').click();
  cy.wait(4000);
});

When('看到查詢結果', () => {
  cy.get('.tr-thead').should('be.visible');
  cy.get('.tr-thead .tr-td').should('have.length', 7);
  cy.get('.tr-thead .tr-td').eq(0).should('contain', '出發時間');
  cy.wait(4000);
});

When('點擊第1行列車的出發時間', () => {
  cy.get('.tr-table span.font-16r.darkgray').contains('13:50').click({force: true});
});

When('點擊立即訂購按鈕', () => {
  cy.get('button[title="立即訂購"]').click({force: true});  
});

