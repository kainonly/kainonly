---
title: PHP CURL 证书问题
categories: 手记
tags: php
---

如出现该错误, 未正确配置 CA 证书

```shell
curl: (60) SSL certificate : unable to get local issuer certificate
```

下载证书 `http://curl.haxx.se/ca/cacert.pem`, 配置 `php.ini`

```ini
curl.cainfo = "/usr/local/php/cacert.pem"
```
