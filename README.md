# Atlas Coachworks — 房车内饰设计展示站

中英文静态网站，展示房车内饰设计、空间布局、设备点位协调、立面与剖面表达和设计流程。品牌名及视觉内容为演示占位，不代表已核实的企业资料。

- `public/index.html`：英文页面
- `public/zh.html`：中文页面
- `public/assets/css/reference.css`：页面样式和响应式布局
- `public/assets/js/studio.js`：图纸切换与移动导航
- `public/assets/images/drawing-*.svg`：同一概念方案的示意图，非施工图
- `public/assets/images/interior-concept-v3.png`：AI 生成的内饰氛围效果图，非真实项目

本地预览：`python3 -m http.server 8080 --directory public`，访问 `http://localhost:8080/zh.html`。发布目录为 `public`。

Cloudflare Pages 项目 `atlas-coachworks` 与 Git 仓库连接，推送 `main` 自动发布到 https://atlas-coachworks.pages.dev。`deploy.sh` 可作为直接上传的备用方式。

正式商用前需提供真实品牌、联系方式、授权使用的实际项目图片与图纸；按实际服务范围校验文案。网站询盘由 FormSubmit 处理并转发至配置的邮箱。

## 画廊与需求摘要

- `public/gallery-zh.html` / `public/gallery.html`：中英文设计画廊，支持点击放大。
- `axonometric-concept-01.png` / `axonometric-concept-02.png`：AI 生成的房车轴测概念图，非真实项目或施工图。
- 首页询盘表单通过 FormSubmit 发送到配置的邮箱；访客的姓名、邮箱和需求会由该服务处理。
