---
title: openssl去掉私钥密码
categories: 手记
tags: openssl
---

执行

```shell
openssl rsa -in ~/.ssh/id_rsa -out ~/.ssh/id_rsa_new
```

备份旧私钥

```shell
mv ~/.ssh/id_rsa ~/.ssh/id_rsa.backup
```

使用新私钥

```shell
mv ~/.ssh/id_rsa_new ~/.ssh/id_rsa
```

设置权限

```shell
chmod 600 ~/.ssh/id_rsa
```
