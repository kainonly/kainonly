---
title: Iptable 规则
categories: 手记
tags: linux
---

添加规则，开放端口（例如 80 端）

```shell
# /sbin/iptables -I INPUT -p tcp --dport 80 -j ACCEPT
```

删除规则，如上先查询规则列表

```shell
# iptables -L -n --line-number
```

然后再通过号码进行删除

```shell
# iptables -D INPUT 2
```
