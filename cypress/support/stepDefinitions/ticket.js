import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import myPage from '../pageObject/myPage';
import { StringText } from '../shareObjects';


const myPageObject = new myPage();

let environment=Cypress.env("environment")
let testData;
let path="";


Given('設定測試檔案{string}', (dataFilePath) => {
    path=environment.concat('/',dataFilePath)
  cy.fixture(path).as("testData")
  .then(data => {
    cy.log(data)
    testData=data
  });
});

Given('進入高鐵官網',() => {
   cy.visit('https://tholiday.thsrc.com.tw/');
   Cypress.on('uncaught:exception', (err, runnable) => {
       // 可以選擇性忽略特定錯誤
       if (err.message.includes('$ is not defined')) {
         return false; // 忽略這個錯誤
       }
     });
   cy.wait(2000);
})

When('點擊我了解規定及條款',() => {
   cy.get('button[type="button"].btn.btn-primary.btn-block').contains('我了解服務相關規定及使用條款').click({force:true})
   cy.wait(2000);
})

When('點擊 "高鐵+票捲" 選項',() => {
  cy.get('span.type-text.group-hover\\:text-primary-dark').contains('高鐵+票券').click({ force: true });
    cy.wait(3000);
})

When('在 "目的地或關鍵字" 欄位中輸入 "台東"',() => {
  cy.wait(1500)
  cy.get('input[placeholder="城市、景點或飯店名稱"]').then(($input) => {
  
  const focusSpy = cy.spy($input[0], 'focus');
  const blurSpy = cy.spy($input[0], 'blur');
  
  
  cy.wrap($input).type('台東', { force: true });
  cy.wait(2000);
  })
})

When('選擇 "台中" 作為出發站',() => {
  cy.get('.display-text.has-no-selected').click();
  cy.contains('li.option', '台中').click();
})

When('選擇 "高鐵+票卷" 作為旅遊類型',() => {
  cy.contains('span.display-text', '高鐵+票券').click();
})

When('選擇 "2024-12-27" 作為出發日期',() => {
  cy.get('input[name="departure"]').click()
  cy.wait(2000)

  for (let a = 0; a < 1; a++) {
      cy.get('button').find('svg[data-icon="chevron-right"]').click();
      cy.wait(2000)
  }    
  cy.get('button').contains('27').click();
})

When('點擊搜索',() => {
  cy.contains('button', '搜尋').click();
})

When('查詢錯誤',() => {
  cy.contains('我們找不到相關的行程體驗，請輸入其他字詞或探索以下推薦行程。').should('be.visible');
})