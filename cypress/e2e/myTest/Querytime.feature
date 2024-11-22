Feature: THSRC 高鐵查詢時刻

  Scenario: 查詢時刻表與票價
    Given 進入高鐵官網 "https://www.thsrc.com.tw/"
    When  確認視窗我同意
    When 點選"時刻表與票價查詢"
    And 選擇出發站為-左營
    And 選擇到達站為-板橋
    And 選擇-單程
    And 選擇出發日期為明天
    And 選擇出發時間為現在時間
    And 選擇-適用優惠
    And 點選查詢
    And 看到查詢結果
    When  點擊第1行列車的出發時間
    When 點擊立即訂購按鈕
    # When 跳轉到訂票網站
    # When 點擊訂票網站的我同意

    Examples:
    |dataFilePath|
    | "/testData.json"|