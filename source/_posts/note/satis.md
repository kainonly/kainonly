---
title: 搭建 Satis 私有 Packagist
categories: 手记
tags: 
	- php
	- satis
---

使用 composer 初始化 Satis 项目

```shell
# composer create-project composer/satis --keep-vcs
```

删除默认 composer.lock，重新安装依赖

```shell
# composer install
# composer dump-autoload --optimize
```

<!-- more -->

配置 satis.json

```json
{
  "name": "My Repository",
  "homepage": "http://localhost:8001",
  "repositories": [
    { "type": "composer", "url": "https://packagist.laravel-china.org" },
    {
      "type": "vcs",
      "url": "git@github.com:kainonly/anyone.git"
    }
  ],
  "require-all": false,
  "require": {
    "topthink/think": "5.1.*",
    "topthink/think-captcha": "^2.0",
    "topthink/think-image": "^1.0",
    "overtrue/wechat": "~4.0",
    "aliyuncs/oss-sdk-php": "^2.3",
    "phpseclib/phpseclib": "^2.0",
    "kain/think-bit": "^1.4",
    "lcobucci/jwt": "^3.2",
    "doctrine/collections": "^1.5",
    "nesbot/carbon": "^2.5",
    "php-amqplib/php-amqplib": "^2.8",
    "ajaxray/short-code": "^1.1",
    "ramsey/uuid": "^3.8",
    "kain/anyone": "^1.0"
  }
}
```

- `homepage` 在 satis 上显示的默认私有镜像地址
- `repositories` 需要被索引的 git 代码仓库地址
- `require-all` 索引全网的 php 包
- `require` 明确定义包名可以减少索引内容中使用

创建索引

```shell
# php bin/satis build satis.json ./public
```

在项目初始 package.json，name:satis-server，并安装 `browser-sync`

```shell
# npm init
# npm install browser-sync --save
```

创建 js 文件：satis-server.js

```js
const bs = require("browser-sync").create();

bs.init({
  host: "127.0.0.1",
  ui: false,
  watch: true,
  server: "./public",
  port: 8001,
  browser: [],
});
```

使用 pm2 守护运行

```shell
# pm2 start satis-server.js
# pm2 save
# pm2 startup
```
