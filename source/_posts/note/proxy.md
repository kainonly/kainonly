---
title: 终端设置代理

categories: 手记

tags: shell
---

## Git 客户端设置代理

使用 Git 执行

```shell script
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080
```

<!-- more -->

## Linux 平台

### 方法 1

在终端中直接运行命令，这个办法的好处是简单直接，并且影响面很小（只对当前终端有效，退出就不行了）

```shell script
export http_proxy=http://proxyAddress:port
```

如果你用的是 ss 代理，在当前终端运行以下命令，那么 `wget` `curl` 这类网络命令都会经过 ss 代理

```shell script
export ALL_PROXY=socks5://127.0.0.1:1080
```

### 方法 2

把代理服务器地址写入 `.bashrc` 或者 `.zshrc` ，添加下面内容

```shell script
export http_proxy="http://localhost:port"
export https_proxy="http://localhost:port"
```

以使用 shadowsocks 代理为例，ss 的代理端口为 `1080` ，那么应该设置为

```shell script
export http_proxy="socks5://127.0.0.1:1080"
export https_proxy="socks5://127.0.0.1:1080"
```

或者直接设置 ALL_PROXY

```shell script
export ALL_PROXY=socks5://127.0.0.1:1080
```

或者通过设置 alias 简写来简化操作，每次要用的时候输入 `setproxy`，不用了就 `unsetproxy`

```shell script
alias setproxy="export ALL_PROXY=socks5://127.0.0.1:1080"
alias unsetproxy="unset ALL_PROXY"
alias ip="curl -i http://ip.cn"
```

### 方法 3

改相应工具的配置，比如 `apt` 的配置

```shell script
sudo vim /etc/apt/apt.conf
```

在文件末尾加入下面这行

```
Acquire::http::Proxy "http://proxyAddress:port"
```

保存 `apt.conf` 文件即可

### 方法 4

利用 proxychains 在终端使用 socks5 代理，proxychains 安装

```shell script
git clone https://github.com/rofl0r/proxychains-ng.git
cd proxychains-ng
./configure
make && make install
cp ./src/proxychains.conf /etc/proxychains.conf
cd .. && rm -rf proxychains-ng
```

编辑 proxychains 配置

```shell script
vim /etc/proxychains.conf
```

将 socks4 127.0.0.1 9095 改为（默认的 `socks4 127.0.0.1 9095` 是 tor 代理，而 `socks5 127.0.0.1 1080` 是 shadowsocks 的代理）

```
socks5 127.0.0.1 1080
```

`proxychains.conf` 文件说明了代理配置格式,在需要代理的命令前加上 proxychains4

```
proxychains4 wget http://xxx.com/xxx.zip
```

## Window 平台

使用管理员打开 `powershell`，在终端中手动执行

```shell script
netsh winhttp set proxy "127.0.0.1:1080"
```
