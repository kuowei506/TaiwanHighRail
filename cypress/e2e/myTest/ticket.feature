Feature: 高鐵+票捲選項

    Scenario: 選擇3日遊的高鐵+飯店行程
        Given 進入高鐵官網
        When  點擊我了解規定及條款
        When  點擊 "高鐵+票捲" 選項
        When  在 "目的地或關鍵字" 欄位中輸入 "台東"
        And  選擇 "台中" 作為出發站
        And  選擇 "高鐵+票卷" 作為旅遊類型
        And  選擇 "2024-12-27" 作為出發日期
        And 點擊搜索 
        Then 查詢錯誤

Examples:
    |dataFilePath|
    | "/testData.json"|
