Feature: 查詢高鐵左營站至義大世界的市區公車資訊

Scenario: 查詢高鐵左營站至義大世界的公車路線資訊
    Given 進入台灣高鐵網站首頁
    When  確認視窗我同意
    When 點擊車站資訊
    And 點擊左營站
    And 點擊市區公車選項
    And 選擇8501路線
    And 選擇起站為高鐵左營站
    Then 看到該路線的詳細資訊



    Examples:
    |dataFilePath|
    | "/testData.json"|