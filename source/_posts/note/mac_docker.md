---
title: MAC 开启 Docker 端口
categories: 手记
tags:
  - macos
  - docker
---

使用 socat 转发为 2375 端口

```shell
socat TCP-LISTEN:2375,reuseaddr,fork UNIX-CONNECT:/var/run/docker.sock
```
