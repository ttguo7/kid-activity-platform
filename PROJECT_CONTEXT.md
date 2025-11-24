\# Famzzi 项目上下文



\## 核心信息

\- \*\*项目\*\*: Famzzi 亲子活动平台

\- \*\*网址\*\*: https://kid-activity-platform.vercel.app  

\- \*\*技术\*\*: Next.js 16 + TypeScript + Tailwind CSS v4 + MongoDB + Vercel



\## 关键文件

\- `src/app/page.tsx` + `src/app/home.css` = 首页

\- `src/components/Navigation.tsx` = 彩虹导航栏

\- `src/app/activities/page.tsx` = 活动列表

\- `src/app/activities/\[id]/page.tsx` = 活动详情

\- `src/app/layout.tsx` = 布局文件



\## 当前状态

✅ 彩虹导航栏 | ✅ 首页背景图 | ✅ 活动路由 | ✅ 响应式设计



\## 样式系统

\- 导航栏: rainbow-nav 彩虹渐变

\- 主色调: 蓝色系 + 黄色点缀

\- 方案: 纯CSS（绕过Tailwind v4问题）

\- 布局: 固定导航栏 + 内容区 margin-top: 80px

