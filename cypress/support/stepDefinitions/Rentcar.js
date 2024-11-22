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

When('點擊 "高鐵+租車" 選項',() => {
    cy.contains('span.type-text', '高鐵+租車').click();
    cy.url().should('include','/products?type=F1CF1DDE-8E94-456D-B2C0-6A101A4A8EFC');
    cy.wait(2000);
})

When('在 "目的地或關鍵字" 欄位中輸入 "台南"',() => {
    cy.wait(1500)
    cy.get('input[placeholder="城市、景點或飯店名稱"]').then(($input) => {
    // 監聽 focus 和 blur 事件
    const focusSpy = cy.spy($input[0], 'focus');
    const blurSpy = cy.spy($input[0], 'blur');
    
    // 輸入台南
    cy.wrap($input).type('台南', { force: true });
    cy.wait(2000);
    })
})

When('選擇 "板橋" 作為出發站',() => {
    cy.get('.display-text.has-no-selected').click();
    cy.contains('li.option', '板橋').click();
})

When('選擇 "高鐵+租車" 作為旅遊類型',() => {
    cy.contains('span.display-text', '高鐵+租車').click();
    cy.contains('li.option', '高鐵+租車').click();
})

When('選擇 "2024-12-17" 作為出發日期',() => {
    cy.get('input[name="departure"]').click()
    cy.wait(2000)

    for (let a = 0; a < 1; a++) {
        cy.get('button').find('svg[data-icon="chevron-right"]').click();
        cy.wait(2000)
    }    
    cy.get('button').contains('17').click();
})

When('點選搜尋',() => {
    cy.get('button[type="submit"].btn-primary.btn-block').click();
})

When('選擇 "3日遊" 作為出遊天數',() => {
    cy.contains('label','三日遊').find('input[type="checkbox"]').click({force:true});
    cy.wait(2000);
})

When('價格設為 "NT $1,716 ~ NT $2,980"',() => {
  cy.get('.slider-thumb').filter(':visible').first()
    .trigger('mousedown', { which: 1 }) 
    .trigger('mousemove', { clientX: 155 }) 
    .trigger('mouseup'); 
})

When('點擊第一個方案',() => {
    cy.get('a.product-card.horizontal-on-tablet').contains('台南和運租車(48小時)3日自駕遊').click();
    cy.wait(15000);
    // cy.url().should('include', '/products/65D6A250-2099-4779-9F66-924DE809FAA9');
})

When('點擊車子一台',() => {
    cy.contains('選擇方案').scrollIntoView().wait(1000)
    cy.get('button[data-v-757b1428]').first().click({force:true});
    cy.get('li.option').contains('1台').click();
    cy.get('button.btn.btn-primary.btn-block').contains('繼續輸入乘車人數').click(); 
})

When('點擊成人為1位',() => {
    cy.get('button[type="button"]')
      .not('[disabled]')  // 排除 disabled 的按鈕
      .last()
      .wait(5000)
      .click()
})

When('點擊繼續選擇車票',() => {
    cy.get('.btn.btn-outline-primary.btn-block').click();
})

When('點擊成人票為1張',() => {
    cy.get('div.flex.justify-between.items-center')
      .contains('成人票')
      .should('be.visible');

    // 點擊加號按鈕兩次
    for(let i = 0; i < 1; i++) {
        cy.get('div.flex.justify-between.items-center')
          .contains('成人票')
          .closest('div.flex.justify-between.items-center')
          .find('button')
          .last()
          .click({ force: true }); 

        cy.wait(1000);
    }
})

When('點擊試算金額',() => {
    cy.get('button[type="submit"].btn.btn-block.btn-primary').click();
})

When('點擊立即訂票',() => {
    cy.contains('立即訂購').click();
    cy.wait(5000);
    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('TNLMGTag is not defined')) {
          return false;
        }
      });
})

When('點擊略過登入繼續購買',() => {
    cy.contains('略過登入繼續購買').click();
    cy.url().should('include', '/products/65D6A250-2099-4779-9F66-924DE809FAA9/order');
})

When('點擊選擇車次下一步',() => {
    cy.contains('下一步').click({force:true});
})

When('填選訂購人姓名',() => {
    cy.get('input[placeholder="請填寫姓名"]').first().type('王小明');
})

When('填選性別男',() => {
    cy.get('[data-v-4bd841ad].display-text')
      .contains('請選擇性別')
      .should('be.visible')
      .click()

    // 在下拉選單中選擇「男」選項
    cy.get('[data-v-4bd841ad].options')
      .should('be.visible')
      .find('li.option')
      .contains('男')
      .click()
})

When('填選連絡電話',() => {
    cy.get('input[type="tel"][placeholder="請輸入聯絡電話"]').should('be.visible').type('0931162318');
})

When('填選聯絡電子信箱',() => {
    cy.get('input[type="email"][placeholder="請輸入電子信箱"]').should('be.visible').type('test01@ibm.com');
})

When('點擊下一步',() => {
    cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(1).click({force : true});
})

When('點選同訂購人資料',() => {
    cy.get('button.p-3.rounded-lg.text-left.md\\:text-center.bg-primary.bg-opacity-10.text-primary-dark.md\\:min-w-50').click({force : true});
})

When('填選身分證字號',() => {
    cy.get('input[placeholder="請填寫身分證字號"]').type('A123456789');
})

When('填選出生日期',() => {
    cy.get('input[name="birthday"]').click();
    cy.contains('time', '1994').click();
    cy.get('[data-v-0c87326e]').find('li').contains('1').click()
    cy.get('[data-v-0c87326e]').find('li').contains('12').click()

    cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(2).click({force : true});
})

When('點擊雄獅旅遊',() => {
    cy.contains('label', '雄獅旅遊').click();
    cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(3).click({force : true});
})

When('便利商店取票',() => {
    cy.contains('label', '便利商店取票').click();
    cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(4).click({force : true});
    cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(5).click({force : true});
})

When('個資使用須知都勾選',() => {
    cy.contains('label', '我已閱讀個人資料蒐集聲明，並同意所有內容。').click();
    cy.contains('label', '我同意收到台灣高鐵公司提供之最新旅遊優惠訊息、新產品推廣及特別活動資訊。').click();
    cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(6).click({force : true});
})

When('點選確認',() => {
    cy.contains('button', '送出訂單').click({force:true});
    cy.get('.text-center.font-normal.text-subtitle')
      .should('be.visible')
      .and('contain', '訂單錯誤');
})

