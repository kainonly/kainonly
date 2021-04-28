---
title: PHP-FPM 编译
categories: 手记
tags: php
---

适用于 `centos`、`debain` 与 `ubuntu` 系统进行编译安装与部署

## 安装编译所需开发库

- 在 `centos` 下执行安装

```shell script
yum install -y libacl libacl-devel libxml2 libxml2-devel openssl openssl-devel bzip2 bzip2-devel libcurl libcurl-devel enchant enchant-devel gd gd-devel gmp gmp-devel libmcrypt libmcrypt-devel libtidy libtidy-devel libxslt libxslt-devel argon2 libargon2-devel libtidy libtidy-devel gcc gcc-c++ autoconf automake zlib zlib-devel pcre-devel
```

- **如果是 `debain` 或 `ubuntu` 下执行安装**

```shell script
apt-get install libacl1 libacl1-dev libxml2 libxml2-dev libbz2-dev libcurl3 libcurl3-dev enchant libenchant-dev libjpeg-dev libpng-dev libxpm-dev libfreetype6-dev libgmp-dev libgmp3-dev libmcrypt-dev libtidy-dev libxslt-dev libssl-dev libargon2-0 libargon2-0-dev build-essential libpcre3 libpcre3-dev autoconf zlib1g-dev
```

<!-- more -->

> 使用 Debian x86 版本出现 `GMP` 错误，则需要手动建立软链接

```shell script
ln -s /usr/include/x86_64-linux-gnu/gmp.h /usr/include/gmp.h
```

## 准备编译源码

- [PHP 官网](http://php.net/downloads.php) 下载需要的版本源码，建议使用最新稳定版本

将准备好的源码包解压，进入到 `php` 源码目录下

## 配置安装

默认下，可以直接使用执行，但是很多模块是不包含在内的

```shell script
./configure
```

为了减少以后再次配置编译，以下这些配置都是我们常用到的

```shell script
./configure \
    --disable-debug \
    --disable-rpath \
    --enable-fpm \
    --with-fpm-user=nginx \
    --with-fpm-group=nginx \
    --with-fpm-acl \
    --with-libxml-dir \
    --with-openssl \
    --with-kerberos \
    --with-pcre-regex \
    --with-zlib \
    --enable-bcmath \
    --with-bz2 \
    --enable-calendar \
    --with-curl \
    --enable-dba \
    --with-enchant \
    --enable-exif \
    --disable-fileinfo \
    --with-pcre-dir \
    --enable-ftp \
    --with-gd \
    --with-jpeg-dir \
    --with-png-dir \
    --with-zlib-dir \
    --with-xpm-dir \
    --with-freetype-dir \
    --with-gettext \
    --with-gmp \
    --with-mhash \
    --enable-mbstring \
    --enable-mbregex \
    --with-mysqli \
    --enable-embedded-mysqli \
    --with-mysql-sock=/tmp/mysql.sock \
    --enable-pcntl \
    --with-pdo-mysql \
    --enable-session \
    --enable-shmop \
    --enable-soap \
    --enable-sockets \
    --enable-sysvsem \
    --with-tidy \
    --enable-wddx \
    --with-xmlrpc \
    --enable-xml \
    --with-iconv-dir \
    --with-xsl \
    --enable-zip \
    --enable-mysqlnd \
    --without-pear \
    --enable-shared \
    --with-password-argon2
```

执行后，配置检测无误就可以编译与安装了

```shell
# make && make install
```

## 环境配置

到 /usr/local/etc 修改 php-fpm.conf 文件

```conf
;pool name ('www' here)
[nginx]
user = nginx
group = nginx
include=/usr/local/etc/php-fpm.d/*.conf
```
