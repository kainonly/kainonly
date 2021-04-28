---
title: OpensSSL 编译
categories: 手记
tags: openssl
---

查看版本

```shell script
openssl version
```

官网下载 https://www.openssl.org 编译

```shell script
./config
make && make install
```

建立链接

```shell script
ln -s /usr/local/ssl/bin/openssl /usr/bin/openssl
ln -s /usr/local/lib64/libssl.so.1.1 /usr/lib64/libssl.so.1.1
ln -s /usr/local/lib64/libcrypto.so.1.1 /usr/lib64/libcrypto.so.1.1
```
