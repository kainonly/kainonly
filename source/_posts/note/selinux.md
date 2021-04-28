---
title: Selinux 开启和关闭
categories: 手记
tags: redis
---

如果 SELinux status 参数为 enabled 即为开启状态

```shell
/usr/sbin/sestatus -v

getenforce
```

临时关闭 SELinux

```shell
setenforce 0
```

修改 `/etc/selinux/config`，将 SELINUX=enforcing 改为 SELINUX=disabled，关闭 SELinux
