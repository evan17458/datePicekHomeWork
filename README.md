## 預覽網站

這個專案已部署到 Vercel，你可以在以下連結查看線上預覽版本：

🔗 [預覽連結](https://date-picek.vercel.app/)

此網站展示了日期選擇期 功能，並基於 next.js 技術構建。

# Next.js 專案

這是一個使用 `create-next-app` 引導創建的 Next.js 專案。

## 開始使用

首先，運行開發伺服器：

```bash
npm run dev
```

在瀏覽器中打開 http://localhost:3000 來查看結果。

你可以通過修改 `app/page.js` 文件來開始編輯頁面。當你編輯文件時，頁面會自動更新。

這個專案使用 `next/font` 來自動優化和加載 Inter，這是一種自定義的 Google 字體。

#

## 部署到 Vercel

部署 Next.js 應用的最簡單方法是使用 Next.js 創建者提供的 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

## 測試說明

本專案使用 Jest 和 React Testing Library 進行單元測試。測試文件位於 `__tests__` 目錄下（或者您存放測試文件的位置）。

### DateRangePicker 組件測試

我們為 `DateRangePicker` 組件編寫了以下測試案例：

1. **渲染當前月份和年份**

   - 確保組件正確顯示當前的年月。

2. **月份導航**

   - 測試點擊左箭頭是否正確顯示上個月。
   - 測試點擊右箭頭是否正確顯示下個月。

3. **日期選擇**

   - 測試選擇單個日期（開始日期）。
   - 測試選擇兩個日期（開始日期和結束日期）。

4. **日期範圍高亮**
   - 確保在選擇開始和結束日期後，中間的日期被正確高亮顯示。

### 測試技術細節

- 使用 `render` 函數渲染組件。
- 使用 `screen.getByText` 和 `screen.getByTestId` 查找元素。
- 使用 `fireEvent.click` 模擬用戶點擊事件。
- 使用 `expect` 斷言來驗證預期的行為。

### 運行測試

要運行測試，請在終端中執行以下命令：

```bash
npm run test
```

# 日曆渲染函數完整說明

## 目錄

1. [概述](#概述)
2. [函數結構](#函數結構)
3. [主要步驟](#主要步驟)
4. [詳細執行過程](#詳細執行過程)
5. [注意事項](#注意事項)
6. [使用示例](#使用示例)

## 概述

這個文檔詳細說明了我們項目中用於渲染日曆的核心函數 `renderDays`。這個函數負責生成一個完整月份的日曆視圖，包括當前月份的所有日期，以及為了填滿完整週而顯示的上個月和下個月的部分日期。

## 函數結構

```javascript
const renderDays = () => {
  // 函數主體
};
```

## 主要步驟

1. **初始化日期範圍**

   ```javascript
   const monthStart = startOfMonth(currentMonth);
   const monthEnd = endOfMonth(monthStart);
   const startDay = startOfWeek(monthStart);
   const endDay = endOfWeek(monthEnd);
   ```

   這些行確定了需要渲染的日期範圍，確保我們總是顯示完整的週。

2. **遍歷日期**

   ```javascript
   while (day <= endDay) {
     for (let i = 0; i < 7; i++) {
       // 處理每一天
     }
     // 處理每週
   }
   ```

   這個雙層循環遍歷了從 `startDay` 到 `endDay` 的每一天。

3. **處理每一天**

   對於每一天，函數執行以下操作：

   - 格式化日期
   - 檢查特殊狀態（今天、選中、範圍內等）
   - 設置背景顏色和文字顏色
   - 創建日期元素

4. **創建週和月的結構**

   ```javascript
   rows.push(<行>{days}</行>);
   days = [];
   ```

   每處理完 7 天，就將這一週添加到 `rows` 數組中，然後重置 `days` 數組。

5. **返回結果**

   ```javascript
   return rows;
   ```

   函數最終返回包含所有週的數組。

## 詳細執行過程

以下是函數在渲染 2024 年 9 月日曆時的詳細執行過程（假設日曆從週日開始，9 月 1 日是週日）：

### 第一週（9 月 1 日 - 9 月 7 日）

1. **i = 0** (週日，9 月 1 日)

   - `formattedDate` = "1"
   - `isToday` = false（假設今天不是 9 月 1 日）
   - `isSelected` = false（假設沒有選中）
   - `isInRange` = false（假設沒有範圍選擇）
   - `isCurrentMonth` = true
   - 背景色 = default，文字顏色 = inherit
   - 添加元素：`<日期元素>1日</日期元素>`

2. **i = 1** (週一，9 月 2 日)

   - `formattedDate` = "2"
   - 其他狀態類似上面，除非這天被特別標記
   - 添加元素：`<日期元素>2日</日期元素>`

3. **i = 2 到 i = 6** (9 月 3 日 - 9 月 7 日)
   - 重複類似的過程，添加 3 日 到 7 日 的元素

**週循環結束**：

- `rows` 添加：`<行>[1日, 2日, 3日, 4日, 5日, 6日, 7日]</行>`
- `days` 重置為 `[]`

### 第二週（9 月 8 日 - 9 月 14 日）

1. **i = 0** (週日，9 月 8 日)

   - `formattedDate` = "8"
   - 狀態檢查和元素添加，如前所述

2. **i = 1 到 i = 6** (9 月 9 日 - 9 月 14 日)
   - 重複過程，添加 9 日 到 14 日 的元素

**週循環結束**：

- `rows` 添加：`<行>[8日, 9日, 10日, 11日, 12日, 13日, 14日]</行>`
- `days` 重置為 `[]`

### 第三週和第四週

- 重複類似的過程，處理 9 月 15 日 到 9 月 28 日

### 第五週（9 月 29 日 - 10 月 5 日）

1. **i = 0** (週日，9 月 29 日)

   - `formattedDate` = "29"
   - `isCurrentMonth` = true
   - 添加元素：`<日期元素>29日</日期元素>`

2. **i = 1** (週一，9 月 30 日)

   - `formattedDate` = "30"
   - `isCurrentMonth` = true
   - 添加元素：`<日期元素>30日</日期元素>`

3. **i = 2** (週二，10 月 1 日)

   - `formattedDate` = "1"
   - `isCurrentMonth` = false
   - 文字顏色 = dayState.nonCurrentMonth
   - 添加元素：`<日期元素 style={{color: dayState.nonCurrentMonth}}>1日</日期元素>`

4. **i = 3 到 i = 6** (10 月 2 日 - 10 月 5 日)
   - 重複 10 月 的處理過程

**週循環結束**：

- `rows` 添加最後一行，包含 9 月底和 10 月初的日期
- `days` 重置為 `[]`

### 循環結束

- `while` 循環結束，因為 `day` 現在大於 `endDay`
- 函數返回 `rows`，包含了 5 個 `<行>` 元素，每個代表一週

## 注意事項

- 這個函數能夠處理跨月的情況，確保日曆視圖始終顯示完整的週。
- 它通過不同的背景色和文字顏色來區分當前月份的日期和非當前月份的日期。
- 函數支持日期選擇、範圍選擇，並能夠突出顯示今天的日期。

## 使用示例

```javascript
const calendarRows = renderDays();
return (
  <日曆容器>
    {calendarRows.map((week, index) => (
      <週容器 key={index}>{week}</週容器>
    ))}
  </日曆容器>
);
```

這個函數是日曆組件的核心，提供了靈活和直觀的方式來顯示和操作日期。
