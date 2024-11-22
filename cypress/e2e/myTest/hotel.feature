Feature: 高鐵+飯店選項

    Scenario: 選擇3日遊的高鐵+飯店行程
        Given 進入高鐵官網
        When  點擊我了解規定及條款
        When  點擊 "高鐵+飯店" 選項
        When  在 "目的地或關鍵字" 欄位中輸入 "高雄"
        And  選擇 "台北" 作為出發站
        And  選擇 "高鐵+飯店" 作為旅遊類型
        And  選擇 "2024-12-25" 作為出發日期
        And 點選搜索 
        And 選擇 "3日遊"
        And 價格設為 "NT $2371 ~ NT $4225"
        And 點擊唯一方案
        And 點擊第一天舒適客房1間,孩童佔床
        And 點擊第二天舒適客房1間,孩童佔床
        And 點選繼續選擇車票
        And 點選立即訂購
        And 點擊略過繼續購買
        And 點選選擇車次下一步
        And 填寫訂購人資料
        And 填寫旅客資料
        And 選擇旅行社
        And 選擇取票方式
        And 使用須知勾選
        And 點選送出訂單

    Examples:
    |dataFilePath|
    | "/testData.json"|