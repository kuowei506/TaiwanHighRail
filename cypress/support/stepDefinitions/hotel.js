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

// Given('進入高鐵官網',() => {
//     cy.visit('https://tholiday.thsrc.com.tw/');
//     Cypress.on('uncaught:exception', (err, runnable) => {
//         // 可以選擇性忽略特定錯誤
//         if (err.message.includes('$ is not defined')) {
//           return false; // 忽略這個錯誤
//         }
//       });
//     cy.wait(2000);
// })

// When('點擊我了解規定及條款',() => {
//     cy.get('button[type="button"].btn.btn-primary.btn-block').contains('我了解服務相關規定及使用條款').click({force:true})
//     cy.wait(2000);
// })

When('點擊 "高鐵+飯店" 選項',() => {
    cy.contains('span.type-text', '高鐵+飯店').click();
    cy.url().should('include', '/products?type=D1B98B1F-8B34-41D3-9164-44E4BCC1BBC5');
    cy.wait(4000);
})

When('在 "目的地或關鍵字" 欄位中輸入 "高雄"',() => {
    cy.wait(1500)
    cy.get('input[placeholder="城市、景點或飯店名稱"]').then(($input) => {
    
    const focusSpy = cy.spy($input[0], 'focus');
    const blurSpy = cy.spy($input[0], 'blur');
    
    
    cy.wrap($input).type('高雄', { force: true });
    cy.wait(2000);
    })
})

When('選擇 "台北" 作為出發站',() => {
    cy.get('.display-text.has-no-selected').click();
    cy.contains('li.option', '台北').click();
})

When('選擇 "高鐵+飯店" 作為旅遊類型',() => {
    cy.contains('span.display-text', '高鐵+飯店').click();
    cy.contains('li.option', '高鐵+飯店').click();
})

When('選擇 "2024-12-25" 作為出發日期',() => {
    cy.get('input[name="departure"]').click()
    cy.wait(2000)

    for (let a = 0; a < 1; a++) {
        cy.get('button').find('svg[data-icon="chevron-right"]').click();
        cy.wait(2000)
    }    
    cy.get('button').contains('25').click();
})

When('點選搜索',() => {
    cy.contains('button', '搜尋').click({force:true});
})

When('選擇 "3日遊"',() => {
    cy.contains('label','三日遊').find('input[type="checkbox"]').click({force:true});
    cy.wait(2000);
})

When('價格設為 "NT $2371 ~ NT $4225"',() => {
    cy.get('.slider-thumb').filter(':visible').first()
      .trigger('mousedown', { which: 1 }) 
      .trigger('mousemove', { clientX: 155 }) 
      .trigger('mouseup'); 
  })
  
When('點擊唯一方案',() => {
  cy.get('a.product-card.horizontal-on-tablet')
  .contains('和逸飯店．台南西門館+高雄中山館3日自由行')
  .click();

cy.wait(5000); // 增加固定等待時間
cy.contains('選擇方案', { timeout: 20000 }).should('be.visible');
});


When('點擊第一天舒適客房1間,孩童佔床',() => {
    cy.contains('選擇方案').scrollIntoView().wait(3000)
    cy.get('button[data-v-757b1428]').eq(0).click({force:true})
    cy.wait(2000)
    
    cy.contains('li.option', '1間').click();
    cy.wait(2000)
    cy.contains('button', '繼續輸入入住人數').click();

    cy.contains('孩童佔床')
    .parent()
    .find('button')
    .wait(3000)
    .last()
    .click({ force: true })

    cy.contains('button', '繼續').click();
})

When('點擊第二天舒適客房1間,孩童佔床' ,() => {
    cy.contains('span', '第二天').scrollIntoView().wait(3000)
    .parent('.flex.items-center.text-subtitle.text-gray-darker.mb-3.lg\\:mb-6')
    .wait(3000)
    .parent()
    .within(() => {
      // 找到舒適客房的選擇器
      cy.get('select')
        .first()
        .select('1', { force: true })
    })

    cy.get('div.flex.items-center.space-x-2.lg\\:space-x-4')
    .find('button')
    .wait(3000)
    .not('[disabled]')
    .eq(1)
    .click({force:true});

    cy.get('button.btn.btn-primary.w-45.ml-auto.hidden.lg\\:block').click();
})

When('點選繼續選擇車票',() => {
    cy.get('button.btn.btn-outline-primary.btn-block.lg\\:block.lg\\:ml-auto.lg\\:max-w-60').wait(3000).click();

    cy.get('[data-v-c68e9496]')
      .contains('成人票')
      .parent()
      .find('button')
      .not('[disabled]')  // 排除被禁用的按鈕
      .click()

    // 短暫等待確保第一次點擊已完成
    cy.wait(3000)

    // 點擊孩童票的加號按鈕（第二個 data-v-c68e9496 區域內的按鈕）
    cy.get('[data-v-c68e9496]')
      .contains('孩童票')
      .wait(3000)
      .parent()
      .find('button')
      .not('[disabled]')  // 排除被禁用的按鈕
      .click()

    // 等待點擊完成
    cy.wait(2000)

    cy.contains('button', '繼續試算金額').click();
})

When('點選立即訂購',() => {
    cy.get('button.btn.btn-block.lg\\:max-w-60.btn-primary').click();
    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('TNLMGTag is not defined')) {
          return false;
        }
      });
})

When('點擊略過繼續購買',() => {
    cy.contains('略過登入繼續購買').click();
    // cy.url().should('include', '/products/D167F31B-5880-4187-9AD8-9EC87442C13A/order');
})

When('點選選擇車次下一步',() => {
    cy.contains('下一步').click({force:true});
})

When('填寫訂購人資料', () => {
    cy.get('input[placeholder="請填寫姓名"]').first().type('王大明')

    cy.get('[data-v-4bd841ad].display-text')
      .contains('請選擇性別')
      .should('be.visible')
      .click()
    
      cy.get('[data-v-4bd841ad].options')
      .should('be.visible')
      .wait(2000)
      .find('li.option')
      .contains('男')
      .click()

      cy.get('input[type="tel"][placeholder="請輸入聯絡電話"]').should('be.visible').type('0931162318');
      cy.get('input[type="email"][placeholder="請輸入電子信箱"]').should('be.visible').type('test01@ibm.com');

      cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(1).click({force : true});
})

When('填寫旅客資料', () => {
    cy.get('.p-3.rounded-lg.text-left.md\\:text-center.bg-primary.bg-opacity-10.text-primary-dark.md\\:min-w-50').eq(0).click();

    cy.get('input[placeholder="請填寫身分證字號"]').first().type('A123456789');
    cy.get('input[name="birthday"]').first().click();
    cy.contains('time', '1994').first().click();
    cy.get('[data-v-0c87326e]').find('li').contains('1').click()
    cy.get('[data-v-0c87326e]').find('li').contains('12').click()

    cy.get('.p-3.rounded-lg.text-left.md\\:text-center.bg-primary.bg-opacity-10.text-primary-dark.md\\:min-w-50').eq(1).click();
    cy.get('input[placeholder="請填寫身分證字號"]').eq(1).type('F130026189');

    cy.get('input[name="birthday"]').eq(1).click();
    Cypress._.times(2, () => {
      cy.contains('time', '1994').click();
    });

    Cypress._.times(2, () => {
      cy.get('button.flex-center').find('svg.fa-chevron-right').parent().click();
    });
    
    // 最後選擇2015
    cy.contains('time', '2015').click();
    
    cy.get('[data-v-0c87326e]').find('li').contains('1').click()
    cy.get('[data-v-0c87326e]').find('li').contains('17').click()
    
    cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(2).click({force : true});
})

When('選擇旅行社', () => {
  cy.contains('label', '雄獅旅遊').click();
  cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(3).click({force : true})
})

When('選擇取票方式', () => {
  cy.contains('label', '便利商店取票').click();
    cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(4).click({force : true});
    cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(5).click({force : true});
})

When('使用須知勾選',() => {
  cy.contains('label', '我已閱讀個人資料蒐集聲明，並同意所有內容。').click();
  cy.contains('label', '我同意收到台灣高鐵公司提供之最新旅遊優惠訊息、新產品推廣及特別活動資訊。').click();
  cy.get('button.btn.btn-primary.w-full.md\\:w-auto').eq(6).click({force : true});
})

When('點選送出訂單',() => {
  cy.contains('button', '送出訂單').click({force:true});
  // cy.get('.text-center.font-normal.text-subtitle')
  //   .should('be.visible')
  //   .and('contain', '訂單錯誤');
})