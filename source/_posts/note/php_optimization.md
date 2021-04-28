---
title: PHP 缓存优化
categories: 手记
tags: php
---

OPcache 是 PHP 中的 Zend 扩展，可以大大提升 PHP 的性能。 OPcache 通过将 PHP 脚本预编译的字节码存储到共享内存中来提升 PHP 的性能， 存储预编译字节码的好处就是 省去了每次加载和解析 PHP 脚本的开销。

<!-- more -->

## OPcache 配置

接下来，我们需要在 PHP 的配置文件中启用 OPcache（默认是关闭的）

```conf
opcache.enable=1
```

下面我们继续对 OPcache 进行一些优化配置

```conf
opcache.memory_consumption=512
```

这个配置表示你想要分配给 OPcache 的内存空间（单位：MB），设置一个大于 64 的值即可

```conf
opcache.interned_strings_buffer=64
```

这个配置表示你想要分配给实际字符串的空间（单位：MB），设置一个大于 16 的值即可

```conf
opcache.max_accelerated_files=32531
```

这个配置表示可以缓存多少个脚本，将这个值尽可能设置为与项目包含的脚本数接近（或更大）

```conf
opcache.validate_timestamps=0
```

改配置值用于重新验证脚本，如果设置为 0（性能最佳），需要手动在每次 PHP 代码更改后手动清除 OPcache。如果你不想要手动清除，可以将其设置为 1 并通过 opcache.revalidate_freq 配置重新验证间隔，这可能会消耗一些性能，因为需要每隔 x 秒检查更改

```conf
opcache.save_comments=1
```

这个配置会在脚本中保留注释，我推荐开启该选项，因为一些库依赖于这个配置，并且我也找不出什么关闭它的好处

```conf
opcache.fast_shutdown=0
```
