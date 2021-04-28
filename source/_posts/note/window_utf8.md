---
title: Window 终端设置 UTF8
categories: 手记
tags: window
---

CMD 设置

- 1. 首先，`win+R --> regedit` 打开注册表
- 2. 在路径 `计算机\HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe` 中找到 `CodePage`
- 3. 数据数值修改为 `0000fde9`

<!-- more -->

PowerShell 设置

- 1. 创建一个 PowerShell 配置文件，打开 PowerShell 执行 `New-Item $PROFILE -ItemType File -Force`
- 2. 修改创建的配置文件 `Microsoft.PowerShell_profile.ps1`，加入内容

```powershell
[System.Console]::OutputEncoding=[System.Text.Encoding]::GetEncoding(65001)
```

!> 无法加载文件 X:\Users\...\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1，因为在此系
。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。

修改 PowerShell 的执行策略 `Execution Policy`，执行 `Set-ExecutionPolicy Unrestricted`
