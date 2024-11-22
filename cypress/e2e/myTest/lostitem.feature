Feature: 查詢高鐵遺失物

  Scenario: 使用者進入高鐵網站查詢遺失物
    Given 進入高鐵官網 "https://www.thsrc.com.tw"
    When  確認視窗我同意
    When 向下滑動至頁面底部
    When 點選遺失物查詢選項
    When 選取站別為"台中"
    When 選取遺失物類別為其他類
    When 填寫遺失物關鍵字為員工證
    When 選取日期為2024.10.01
    When 點選搜尋按鈕
    Then 系統顯示符合條件的遺失物查詢結果

    Examples:
    |dataFilePath|
    | "/testData.json"|