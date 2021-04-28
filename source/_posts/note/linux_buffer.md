---
title: 释放 Linux Buff / Cache
categories: 手记
tags: linux
---

首先要确认，`/proc/sys/vm/drop_caches`的值为 0，手动执行 sync 命令

```shell
# sync
```

执行释放

```shell
# echo 3 > /proc/sys/vm/drop_caches
```
