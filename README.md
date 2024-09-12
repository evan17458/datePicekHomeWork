## 預覽網站

這個專案已部署到 Vercel，你可以在以下連結查看線上預覽版本：

🔗 [預覽連結](https://date-picek.vercel.app/)

此網站展示了日期選擇期 功能，並基於 next.js 技術構建。

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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
