---
title: Linux 内核参数优化
categories: 手记
tags: linux
---

系统全局允许分配的最大文件句柄数

```shell
# 2 millions system-wide
sysctl -w fs.file-max=2097152
sysctl -w fs.nr_open=2097152
echo 2097152 > /proc/sys/fs/nr_open
```

<!-- more -->

允许当前会话/进程打开文件句柄数:

```shell
ulimit -n 1048576
```

持久化 `fs.file-max` 设置到 `/etc/sysctl.conf` 文件

```shell
fs.file-max = 1048576
```

`/etc/systemd/system.conf` 设置服务最大文件句柄数

```shell
DefaultLimitNOFILE=1048576
```

`/etc/security/limits.conf` 持久化设置允许用户/进程打开文件句柄数

```shell
*      soft   nofile      1048576
*      hard   nofile      1048576
```

并发连接 backlog 设置

```shell
sysctl -w net.core.somaxconn=32768
sysctl -w net.ipv4.tcp_max_syn_backlog=16384
sysctl -w net.core.netdev_max_backlog=16384
```

可用知名端口范围

```shell
sysctl -w net.ipv4.ip_local_port_range='1000 65535'
```

TCP Socket 读写 Buffer 设置

```shell
sysctl -w net.core.rmem_default=262144
sysctl -w net.core.wmem_default=262144
sysctl -w net.core.rmem_max=16777216
sysctl -w net.core.wmem_max=16777216
sysctl -w net.core.optmem_max=16777216

#sysctl -w net.ipv4.tcp_mem='16777216 16777216 16777216'
sysctl -w net.ipv4.tcp_rmem='1024 4096 16777216'
sysctl -w net.ipv4.tcp_wmem='1024 4096 16777216'
```

TCP 连接追踪设置

```shell
sysctl -w net.nf_conntrack_max=1000000
sysctl -w net.netfilter.nf_conntrack_max=1000000
sysctl -w net.netfilter.nf_conntrack_tcp_timeout_time_wait=30
```

TIME-WAIT Socket 最大数量、回收与重用设置

```shell
net.ipv4.tcp_max_tw_buckets=1048576

# 注意: 不建议开启該设置，NAT模式下可能引起连接RST
# net.ipv4.tcp_tw_recycle = 1
# net.ipv4.tcp_tw_reuse = 1
```

FIN-WAIT-2 Socket 超时设置

```shell
net.ipv4.tcp_fin_timeout = 15
```
