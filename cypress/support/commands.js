//等待
Cypress.Commands.add("_waitLoading", () => {
    cy.get('body').then(($loading) => {
        if ($loading.find('span.loading1').length > 0 || $loading.find('circle.ng-star-inserted').length > 0 || $loading.find('nz-table[ng-reflect-nz-loading="true"]').length > 0) {
            cy.wait(1500);
            cy.log("wait");
            cy._waitLoading();
        } else {
            cy.log("wait finish");
        }
    })
});

// 紀錄抓元素時的嘗試次數
let getElementTryTimes = 1;

//獲取元素
Cypress.Commands.add("getElement", ({ searchContext = null, selector = null, exclusion = "", parentOrChildLevel = 0, nextOrPrevLevel = 0, filter = null, isCheckVisible = true, maxTryTimes = 3, tryPeriod = 1000 }) => {
    cy.log("第" + getElementTryTimes + "次嘗試抓元素")

    // 如果沒給selector，直接回傳null
    if (!selector) {
        cy.log("沒給Selector");
        return cy.wrap(null);
    }

    // 取得搜尋上下文
    const getContext = () => {
        if (searchContext) {
            return cy.wrap(searchContext);
        }
        return cy.get('body');
    };

    return getContext().then(($context) => {
        return cy.wrap($context).then(($ctx) => {
            if (!$ctx || !$ctx.find) {
                cy.log('Invalid context');
                return cy.wrap(null);
            }
            cy.log('searchContext:', $ctx);
            let $target = $ctx.find(selector);

            if (filter) {
                cy.log('filter:', filter);
                $target = $target.filter((_, el) => Cypress.$(el).text().trim() === filter);
            }

            if ($target.length === 0) {
                cy.log('Element not found');
                // 嘗試抓元素次數達到上限，直接回傳null
                getElementTryTimes++;
                if (getElementTryTimes > maxTryTimes) {
                    // reset嘗試次數，下次要抓其他元素時呼叫的初始值才正確
                    cy.log("已達最大次數");
                    getElementTryTimes = 1;
                    return cy.wrap(null);
                }
                cy.wait(tryPeriod);
                return cy.getElement({ searchContext, selector, exclusion, parentOrChildLevel, nextOrPrevLevel, filter, isCheckVisible, maxTryTimes, tryPeriod });
            }

            // 處理排除條件
            if (exclusion) {
                $target = $target.not(exclusion);
            }

            // 統一處理元素選擇邏輯
            return cy.wrap($target).then(($el) => {
                let current = $el;
                // reset嘗試次數，下次要抓其他元素時呼叫的初始值才正確
                getElementTryTimes = 1;

                // 處理父子層級
                // 如果 parentOrChildLevel 是 0，直接選擇當前元素，
                // parentOrChildLevel>0 時，則選擇對應層級父元素
                // parentOrChildLevel<0 時，則選擇對應層級的子元素
                if (parentOrChildLevel > 0) {
                    current = current.parents().eq(parentOrChildLevel - 1);
                } else if (parentOrChildLevel < 0) {
                    cy.log(parentOrChildLevel)
                    for (let i = 0; i < Math.abs(parentOrChildLevel); i++) {
                        current = current.children().eq(0);
                        cy.log(current);
                        if (current.length === 0) { cy.log(current); break };
                    }
                }

                // 處理同層級元素
                // 如果 nextOrPrevLevel 是 0，則選擇當前元素
                // nextOrPrevLevel>0 時，則選擇對應層級的下一個元素
                // nextOrPrevLevel<0 時，則選擇對應層級的上一個元素
                if (nextOrPrevLevel > 0) {
                    current = current.nextAll().eq(nextOrPrevLevel - 1);
                } else if (nextOrPrevLevel < 0) {
                    current = current.prevAll().eq(Math.abs(nextOrPrevLevel) - 1);
                }

                // 當isCheckVisible=false,不檢查元素是否顯示,直接回傳
                if (isCheckVisible === false)
                    return cy.wrap(current);
                // 檢查元素可見性，看得見才回傳元素
                if (current.length && Cypress.dom.isVisible(current)) {
                    return cy.wrap(current);
                }
                return cy.wrap(null);
            });
        });
    });
});