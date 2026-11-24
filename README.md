# Atlas Coachworks — 房车内饰设计展示站

中英文静态网站，展示房车内饰设计、空间布局、设备点位协调、立面与剖面表达和设计流程。品牌名及视觉内容为演示占位，不代表已核实的企业资料。

- `public/index.html`：英文页面
- `public/zh.html`：中文页面
- `public/assets/css/reference.css`：页面样式和响应式布局
- `public/assets/js/studio.js`：图纸切换与移动导航
- `public/assets/images/ga-01-layout.svg`：平面布置图（GA-01，1:50 @ A3）
- `public/assets/images/ga-02-services.svg`：点位协调图（GA-02，含 230V/12V/水/燃气/暖风/排风点位与示意走线）
- `public/assets/images/ga-03-elevation.svg`：室内立面图（GA-03，A-A 剖视，含标高与尺寸链）
- 三张图纸按同一辆 6.00 × 2.30 m 房车几何绘制（1 px = 5 mm），分区、尺寸与点位互相对应
- 布局前提：侧滑门净宽 750、净高 1800，门洞两侧各留 130–200 mm 墙垛，门内留 750 × 520 落客区，1020 mm 通道贯通至尾床，家具、柜门与卫浴门均让开门洞和通道
- 仍为概念图纸，非施工图
- `public/assets/images/interior-concept-v3.png`：AI 生成的内饰氛围效果图，非真实项目

本地预览：`python3 -m http.server 8080 --directory public`，访问 `http://localhost:8080/zh.html`。发布目录为 `public`。

Cloudflare Pages 项目 `atlas-coachworks` 与 Git 仓库连接，推送 `main` 自动发布到 https://atlas-coachworks.pages.dev。`deploy.sh` 可作为直接上传的备用方式。

正式商用前需提供真实品牌、联系方式、授权使用的实际项目图片与图纸；按实际服务范围校验文案。网站询盘由 FormSubmit 处理并转发至配置的邮箱。

## 画廊与需求摘要

- `public/gallery-zh.html` / `public/gallery.html`：中英文设计画廊，支持点击放大。
- `rv-layout-door-v2.png`（布置总览）/ `rv-twin-bed-layout-v3.png`（双床与会客布局）：AI 生成的房车轴测概念图，非真实项目或施工图。
- 首页询盘表单通过 FormSubmit 发送到配置的邮箱；访客的姓名、邮箱和需求会由该服务处理。

## 语言切换

页面左下角可选择十种语言，以英文页面为原文，其余九种译文预置在 `public/assets/i18n/` 中，访客浏览时无需访问翻译服务。语言选择会在首页和画廊间保留；旧的中文链接会跳转到对应的中文页面。修改英文页面文案后，应同步更新各语言 JSON；现有译文由机器生成，正式使用前建议校对。
