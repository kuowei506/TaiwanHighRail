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
// });


When('向下滑動至頁面底部', () => {
    cy.scrollTo('bottom');
});

When('點選遺失物查詢選項',() => {
    cy.get('a[title="遺失物查詢"]').first().click();
    Cypress.on('uncaught:exception', (err, runnable) => {
        // 可以選擇性忽略特定錯誤
        if (err.message.includes('$ is not defined')) {
          return false; // 忽略這個錯誤
        }
      });
    cy.wait(5000);
});

When('選取站別為"台中"',() => {
    cy.get('#stations').select('台中').should('have.value', '台中');
    cy.wait(2000)
})

When('選取遺失物類別為其他類',() => {
    cy.get('#lFSTypes').select('5 其他類');
    cy.wait(2000)
})


When('填寫遺失物關鍵字為員工證',() => {
    cy.get('#keyWord').should('be.visible').type('IBM員工證');
    cy.wait(2000)
})


When('選取日期為2024.10.01',() => {
    cy.get('#startDate').type('{selectall}').type('{backspace}').type('2024.10.01').should('have.value', '2024.10.01');
})


When('點選搜尋按鈕',() => {
    cy.get('#start-search').click();
})

Then('系統顯示符合條件的遺失物查詢結果',() => {
    cy.get('.dataTables_empty').should('be.visible').and('contain.text', '尚無資料');
})