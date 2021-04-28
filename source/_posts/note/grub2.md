---
title: grub2 引导 Linux 系统
categories: 手记
tags: linux
---

这个是我的 linux 分区，可以根据需要调整

```shell
set root=(hd0,gpt5)
```

你的 linux 内核,可以通过 Tab 补全，告知 Grub 内核镜像在分区中的位置，以及根文件系统的位置

```shell
linux /boot/vmlinuz-4.17.1-24 root=/dev/sda5
```

同样可以用 tab 补全。设置虚拟文件系统 initial ramdisk 文件的位置

```shell
initrd /boot/initrd.img-4.17.1-24
```
