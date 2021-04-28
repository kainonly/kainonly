---
title: Redis 故障
categories: 手记
tags: redis
---

错误信息

```shell
If you get this error Can't save in background: fork: Cannot allocate memory
it means that your current database is bigger than memory you have.
```

解决方式是开启 `vm.overcommit_memory`

```shell
# sysctl vm.overcommit_memory=1
```
