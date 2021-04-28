---
title: OpenSSL 生成密钥证书
categories: 手记
tags: openssl
---

OpenSSL 是为网络通信提供安全及数据完整性的一种安全协议，囊括了主要的密码算法、常用的密钥和证书封装管理功能以及 SSL 协议，并提供了丰富的应用程序供测试或其它目的使用

<!-- more -->

## 生成 RSA 密钥

生成私钥

```shell script
openssl genrsa -out rsa_private_key.pem 1024
```

把 RSA 私钥转换成 PKCS8 格式

```shell script
openssl pkcs8 -topk8 -inform PEM -in rsa_private_key.pem -outform PEM –nocrypt
```

生成 RSA 公钥

```shell script
openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
```

## 生成 ECC 密钥

生成私密

```shell script
openssl ecparam -genkey -name prime256v1 -out domain.key
```

生成指定证书

```shell script
openssl req -new -sha256 -key domain.key -out domain_csr.txt
```

> 注意事项： ECC 算法加密强度有 3 个选项：prime256v1/secp384r1/secp521r1/prime256v1 目前已经足够安全，如无特殊需要请保持 ECC 算法 prime256v1 默认即可。 SHA256 目前已经足够安全，如无特殊需要请保持默认。

生成公钥

```shell script
openssl ec -in domain.key -pubout -out pubkey.pem
```

## 签发证书

生成签名

```shell script
openssl genrsa -des3 -out root.key 1024
```

清除口令

```shell script
openssl rsa -in server.key -out server.key
```

生成 CA 证书

```shell script
openssl req -new -x509 -key root.key -out root.crt -days 365 -config openssl.conf
```
