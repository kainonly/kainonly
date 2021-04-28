---
title: SWAP 交换分区
categories: 手记
tags: linux
---

Linux 中的 SWAP（交换分区），类似于 Windows 的虚拟内存。系统会把一部分硬盘空间虚拟成内存使用，将系统内非活动内存换页到 SWAP，以提高系统可用内存。

<!-- more -->

## 开启 swap

创建用于交换分区的文件

```shell script
dd if=/dev/zero of=/mnt/swap bs=1M count=2048
```

设置交换分区文件

```shell script
mkswap /mnt/swap
```

立即启用交换分区文件

```shell script
swapon /mnt/swap
```

设置开机时自启用 SWAP 分区, 需要修改文件 /etc/fstab 中的 SWAP 行, 添加

```
/mnt/swap swap swap defaults 0 0
```

修改 swpapiness 参数, 可以使用下述方法临时修改此参数, 假设我们配置为空闲内存少于 10% 时才使用 SWAP 分区

```shell script
echo 10 >/proc/sys/vm/swappiness
```

若需要永久修改此配置，在系统重启之后也生效的话，可以修改 /etc/sysctl.conf 文件，并增加以下内容

```conf
vm.swappiness=10
```
