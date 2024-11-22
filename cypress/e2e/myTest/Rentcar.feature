Feature: 高鐵+租車選項

  Scenario: 選擇3日遊的高鐵+租車行程
    Given 進入高鐵官網
    When 點擊我了解規定及條款
    When 點擊 "高鐵+租車" 選項
    And 在 "目的地或關鍵字" 欄位中輸入 "台南"
    And 選擇 "板橋" 作為出發站
    And 選擇 "高鐵+租車" 作為旅遊類型
    And 選擇 "2024-12-17" 作為出發日期
    And 點選搜尋
    And 選擇 "3日遊" 作為出遊天數
    And 價格設為 "NT $1,716 ~ NT $2,980"
    And 點擊第一個方案
    And 點擊車子一台
    And 點擊成人為1位
    And 點擊繼續選擇車票
    And 點擊成人票為1張
    And 點擊試算金額
    And 點擊立即訂票
    And 點擊略過登入繼續購買
    And 點擊選擇車次下一步
    And 填選訂購人姓名
    And 填選性別男
    And 填選連絡電話
    And 填選聯絡電子信箱
    And 點擊下一步
    And 點選同訂購人資料
    And 填選身分證字號
    And 填選出生日期
    And 點擊雄獅旅遊
    And 便利商店取票
    And 個資使用須知都勾選
    And 點選確認

    Examples:
    |dataFilePath|
    | "/testData.json"|
