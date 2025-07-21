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

// Given('進入台灣高鐵網站首頁', () => {
//     cy.visit('https://www.thsrc.com.tw/');
// });

// Then('確認視窗我同意',() => {
//     cy.get('div[role="dialog"]').contains('button','我同意').click({ force: true });
//     cy.wait(2000);
// })

When('點擊車站資訊', () => {
    cy.get('a[title="車站資訊"]').should('be.visible').click({ force: true });
    cy.url().should('eq', 'https://www.thsrc.com.tw/ArticleContent/2f940836-cedc-41ef-8e28-c2336ac8fe68');
    Cypress.on('uncaught:exception', (err, runnable) => {
        // 可以選擇性忽略特定錯誤
        if (err.message.includes('$ is not defined')) {
          return false; // 忽略這個錯誤
        }
      });
});

When('點擊左營站', () => {
    cy.get('.nav-item.nav-link.station-12').click({force:true});
    cy.wait(3000);
});

When('點擊市區公車選項', () => {
    cy.get('a[title="市區公車"]').scrollIntoView({duration:900})
    .click({force:true});
    cy.wait(3000);
});

When('選擇8501路線', () => {
    cy.get('#selCityBusRoute').should('be.visible').select('8501 高鐵左營站－義大世界(第5月台)');
    cy.wait(3000);
    
});

When('選擇起站為高鐵左營站', () => {
    cy.get('#cityBusStartStation').should('be.visible').select('高鐵左營站');
    cy.wait(7000);
});

Then('看到該路線的詳細資訊', () => {
    cy.get('.traffic-line-container').should('be.visible');
});