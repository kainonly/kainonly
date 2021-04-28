---
title: 安装非默认 Python3
categories: 手记
tags: python
---

Python 是一个非常实用的工具，在 Linux 中存在不少应用会依赖于系统默认的 Python，但是在一些老的发行版本中系统默认的 Python 往往版本较低不能兼容一些新的特性，因此需要实现系统默认 Python3 与自定义 Python3.x 的共存共用

<!-- more -->

## 以 Debian 系统为例

首先安装构建 Python 源代码所需的软件包：

```shell
sudo apt update
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev curl libbz2-dev
```

从 [Python download page](https://www.python.org/downloads/source/) 下载源码包，当前版本为 `3.8.5` 开始解压

```shell
tar -xf Python-3.8.5.tar.xz
```

进入目录，执行编译检测，`--enable-optimizations` 选项将通过运行多个测试来优化 Python 二进制文件，这将使构建过程变慢

```shell
cd Python-3.8.5
./configure --enable-optimizations
```

运行 make 开始构建过程，可以增加多线程编译 `-j [CPU核数]` 提速

```shell
make
```

构建完成后，使用该命令安装 Python；请不要使用 `make install` 因为它将覆盖系统默认的 Python3，导致依赖它的软件包工作异常

```shell
make altinstall
```

安装成功后将以 `python3.8` `pip3.8` 呈现

```shell
python3.8 --version
pip3.8
```
