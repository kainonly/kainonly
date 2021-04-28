---
title: NGINX 优化
categories: 手记
tags: nginx
---

修改 `sysctl.conf` 对 Linux 内核参数优化，让 Nginx 更加充分的发挥性能，以下参数需要根据业务逻辑和实际的硬件成本来综合考虑

<!-- more -->

```conf
# 表示单个进程最大可以打开的句柄数
fs.file-max = 999999

# 参数设置为 1 ，表示允许将TIME_WAIT状态的socket重新用于新的TCP链接，这对于服务器来说意义重大，因为总有大量TIME_WAIT状态的链接存在
net.ipv4.tcp_tw_reuse = 1

# 当keepalive启动时，TCP发送keepalive消息的频度；默认是2小时，将其设置为10分钟，可以更快的清理无效链接
ner.ipv4.tcp_keepalive_time = 600

# 当服务器主动关闭链接时，socket保持在FIN_WAIT_2状态的最大时间
net.ipv4.tcp_fin_timeout = 30

# 这个参数表示操作系统允许TIME_WAIT套接字数量的最大值，如果超过这个数字，TIME_WAIT套接字将立刻被清除并打印警告信息。该参数默认为180000，过多的TIME_WAIT套接字会使Web服务器变慢
net.ipv4.tcp_max_tw_buckets = 5000

# 定义UDP和TCP链接的本地端口的取值范围
net.ipv4.ip_local_port_range = 1024 65000

# 定义了TCP接受缓存的最小值、默认值、最大值
net.ipv4.tcp_rmem = 10240 87380 12582912

# 定义TCP发送缓存的最小值、默认值、最大值
net.ipv4.tcp_wmem = 10240 87380 12582912

# 当网卡接收数据包的速度大于内核处理速度时，会有一个列队保存这些数据包。这个参数表示该列队的最大值
net.core.netdev_max_backlog = 8096

# 表示内核套接字接受缓存区默认大小
net.core.rmem_default = 6291456

# 表示内核套接字发送缓存区默认大小
net.core.wmem_default = 6291456

# 表示内核套接字接受缓存区最大大小
net.core.rmem_max = 12582912

# 表示内核套接字发送缓存区最大大小
net.core.wmem_max = 12582912

# 用于解决TCP的SYN攻击
net.ipv4.tcp_syncookies = 1

# 这个参数表示TCP三次握手建立阶段接受SYN请求列队的最大长度，默认1024，将其设置的大一些可以使出现Nginx繁忙来不及accept新连接的情况时，Linux不至于丢失客户端发起的链接请求
net.ipv4.tcp_max_syn_backlog = 8192

# 这个参数用于设置启用timewait快速回收
net.ipv4.tcp_tw_recycle = 1

# 选项默认值是128，这个参数用于调节系统同时发起的TCP连接数，在高并发的请求中，默认的值可能会导致链接超时或者重传，因此需要结合高并发请求数来调节此值
net.core.somaxconn = 262114

# 选项用于设定系统中最多有多少个TCP套接字不被关联到任何一个用户文件句柄上。如果超过这个数字，孤立链接将立即被复位并输出警告信息。这个限制指示为了防止简单的DOS攻击，不用过分依靠这个限制甚至认为的减小这个值，更多的情况是增加这个值
net.ipv4.tcp_max_orphans = 262114
```

隐藏版本号

```conf
http {
+    server_tokens off;
}
```

隐藏 X-Powered-By，需要修改 `php.ini`

```conf
expose_php = Off
```

禁止 Scrapy 等爬虫工具的抓取、禁止指定 UA 及 UA 为空的访问、禁止非 GET|HEAD|POST 方式的抓取

```conf
server {
    #禁止Scrapy等爬虫工具的抓取
    if ($http_user_agent ~* "Scrapy|Sogou web spider|Baiduspider") {
        return 403;
    }

    #禁止指定UA及UA为空的访问
    if ($http_user_agent ~ "FeedDemon|JikeSpider|Indy Library|Alexa Toolbar|AskTbFXTV|AhrefsBot|CrawlDaddy|CoolpadWebkit|Java|Feedly|UniversalFeedParser|ApacheBench|Microsoft URL Control|Swiftbot|ZmEu|oBot|jaunty|Python-urllib|lightDeckReports Bot|YYSpider|DigExt|YisouSpider|HttpClient|MJ12bot|heritrix|EasouSpider|LinkpadBot|Ezooms|^$" ) {
        return 403;
    }

    #禁止非GET|HEAD|POST方式的抓取
    if ($request_method !~ ^(GET|HEAD|POST)$) {
        return 403;
    }
}
```
