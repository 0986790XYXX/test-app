# 情绪打卡 Web App (React + Tailwind)

一个简洁的情绪打卡应用，支持记录每日情绪、影响因素、简短日记，并将数据保存到本地 `localStorage`。

## 功能

- 今日情绪选择：开心 / 焦虑 / 平静 / 疲惫 / 自定义
- 影响因素选择：工作 / 人际 / 感情 / 健康 / 其他
- 支持自定义添加影响因素
- 可输入简短记录
- 保存到本地（`localStorage`）
- 历史记录页面查看过去条目
- 简洁卡片式 UI

## 项目结构

```text
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components
    │   └── Card.jsx
    ├── data
    │   └── constants.js
    ├── pages
    │   ├── HistoryPage.jsx
    │   └── HomePage.jsx
    └── utils
        └── storage.js
```

## 快速开始

```bash
npm install
npm run dev
```

打开浏览器访问终端输出的本地地址（默认通常是 `http://localhost:5173`）。

## 构建

```bash
npm run build
npm run preview
```
