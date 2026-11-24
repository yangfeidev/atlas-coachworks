# Atlas Coachworks — RV Design & Contract Manufacturing

面向海外房车品牌 / 经销商的 **OEM / ODM 代工官网**（英文单页站）。定位「Designed in Turin, Built in Ningbo」，卖设计能力、产能、认证与交付，询盘表单收线索。

> 品牌名 `Atlas Coachworks` 与产品代号（APEX 24 / ATLAS C32 / VAN 170）、全部参数与案例均为**占位内容**，上线前需替换。

## 技术栈

单文件原生 HTML / CSS / JS，零构建依赖，无 npm 包。字体走 Google Fonts CDN（Archivo / Inter / IBM Plex Mono）。

## 目录

```
index.html          单页全部结构 + 样式 + 脚本
assets/images/      7 张配图（JPEG，已压缩去水印，共约 1.7MB）
  hero.jpg          首屏：峡湾公路旁的铝制拖挂房车
  studio.jpg        设计工作室：油泥模型 + CAD
  factory.jpg       产线：拖挂壳体与铝骨架
  interior.jpg      内饰：橡木 + 亚麻
  craft.jpg         铆接特写
  port.jpg          集装箱码头
  heritage.jpg      品牌沿革老照片
.assetsignore       Cloudflare Pages 直传排除项
```

## 页面结构

| # | 区块 | 说明 |
|---|---|---|
| — | Hero | 主张 + 4 项数据（62 项目 / 1400 台 / 42000㎡ / 14 市场） |
| — | 认证跑马灯 | ISO 9001、IATF 16949、RVIA、EC 等 |
| 01 | How we work | 三种合作模式：Turnkey OEM / 平台授权 ODM / Build-to-print |
| 02 | Design | 工业设计、内饰架构、工程与认证 |
| 03 | Production | 暗色数据带：产线 / 产能 / 公差 / 节拍 |
| 04 | Platforms | 三个平台卡，含手绘 SVG 侧面线稿与参数 |
| — | Interior band | 整屏引言 |
| 05 | Compliance | 按市场拆的合规表（EU / UK / US / AU / GCC） |
| 06 | Process | 6 个 gate 时间轴，共 18 个月 |
| 07 | Quality | 6 项质量体系 + 铆接特写 + 品牌沿革 |
| 08 | Delivery | 物流条款与装柜量 |
| — | Case | 北欧客户案例 |
| 09 | FAQ | 8 条常见问题（`<details>` 手风琴） |
| 10 | Contact | 询盘表单（前端校验，未接后端） |

## 本地预览

```bash
open index.html
# 或起个静态服务
python3 -m http.server 8080
```

## 部署

Cloudflare Pages **Git 连接**：推送到 `main` 自动部署（生产），推其他分支生成预览部署。

- 项目：`atlas-coachworks`（账号 Yangfei.dev@gmail.com）
- Build command：留空（纯静态，无构建步骤）
- 输出目录：`/`（仓库根目录）
- 线上：https://atlas-coachworks.pages.dev

仓库根目录的 `README.md`、`.gitignore` 等通过 `.assetsignore` 排除，不会出现在线上。

手动直传（备用，Git 挂掉时用）：

```bash
./deploy.sh
```

## 待办

- [ ] 换真实品牌名、产品线与参数
- [ ] 换真实产品图与工厂照片
- [ ] 询盘表单接后端（Cloudflare Worker + 邮件通知）
- [ ] 多语言（EN / DE / IT / 中文），文案抽 i18n
- [ ] 补 SEO：sitemap、robots.txt、真实 og:image 绝对地址
