---
title: SSH 频繁掉线
categories: 手记
tags: linux
---

找到文件 `/etc/ssh/sshd_config` 进行修改

```
ClientAliveInterval 15
ClientAliveCountMax 45
```

<!-- more -->

> ClientAliveInterval 是每隔多少秒，服务器端向客户端发送心跳，ClientAliveCountMax 是多少次心跳无响应之后，断开 Client 连接

然后重启 `sshd` 服务

```shell
# systemctl restart sshd
```

重新打开客户端就不会频繁掉线了
