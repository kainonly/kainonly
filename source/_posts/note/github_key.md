---
title: Github 密钥设置
categories: 手记
tags: git
---

设置 `git` 的 `user.name` 和 `user.email`

```shell
# git config --global user.name "kain"
# git config --global user.email "zhangtqx@vip.qq.com"
```

<!-- more -->

生成 `RSA` 密钥对

```shell
# ssh-keygen -t rsa -C
```

将公钥内容上传至 `git` 服务器 或 `github`，测试一下

```shell
# ssh git@github.com
```

生成以下内容代表成功

```shell
Warning: Permanently added 'github.com,192.30.255.112' (RSA) to the list of known hosts.
PTY allocation request failed on channel 0
Hi kainOnly! You've successfully authenticated, but GitHub does not provide shell access.
```
