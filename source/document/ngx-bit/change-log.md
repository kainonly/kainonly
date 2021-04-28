---
title: 更新日志
toc: true
---

## 11.3.0

新增 `bit-transport` 批量上传按钮

## 11.2.0

优化路由定位

### Breaking Changes

- 操作库弃用 `getSelectorFormUrl(url: string, match: any[])`
- `bit-cross-level` 与 `crossLevel(selector: string): void` 分别变更为 `bit-history` 与 `history(key: string): void`
- Routes `path` 标准化，由 `/{any}` 变更为 `/any`

## 11.1.3

SearchOption 增加 Format，例如：

```typescript
{ field: 'time', op: 'between', value: [], format: 'unixtime' }
```

## 11.1.2

解除 `<bit-search-start>` 限制

## 11.1.1

完善 `BitSupportService` 下 `unsubscribe`，修复退出登录后面包屑未清零的问题

## 11.1.0

### Breaking Changes

- 废弃模块 `NgxBitModule` ，按功能需要导入服务提供商
- 废弃管道 `UndefinedPipe` `EmptyArrayPipe` `EmptyObjectPipe`，替代为符合业务场景的 `EmptyPipe` 是否为空
- 废弃管道 `LocalePipe` `JSONParsePipe`，合并为 `ObjectPipe` 转化为对象（或指定语言显示）
- 废弃操作库函数 `emptyArray` `emptyObject`，合并为 `empty` 是否为空
- 废弃操作库函数 `factoryBitConfig`，配置生产替换为服务提供商工厂模式
- 标准化公共语言包，部分组件语言包索引变更（库组件语言包索引统一为 `PascalCase` ，项目组件建议使用 `camelCase`）
- 移除 `ajv` `sweetalert2` `@ngx-pwa/local-storage` 等第三方库，同时废弃操作库 `validate`
- 提示确认 `BitSwalService` 作为可选项，使用需安装 `sweetalert2`
- 功能支持 `BitSupportService` 作为可选项，使用需要安装 `@ngx-pwa/local-storage`
- `nzIconService.changeAssetsSource` 需要自行调用
- `SearchOption` 废弃 `must`，替换为 `exclude` 作为排除值，默认为 `['', 0, null]`

### New Features

- 丰富统一配置，增加更多配置项定义
- 丰富上传指令 `nz-upload[bitUpload]` 业务功能，支持：阿里云 OSS、腾讯云 COS、华为云 OBS 直传对象存储
- 增加语言包模板函数 `print` 、管道 `PrintPipe` 与组件 `<bit-print></bit-print>`
- 增加页头填充 `<bit-header></bit-header>` 顶部公告 `nz-alert[bitBanner]`

## 11.0.1

增加指令选择器，精确监听事件，例如：`input[bitSearchStart]` 下 `click` 事件不在触发

- `selector: '[bitSearchClear]'` 变更为 `selector: 'button[bitSearchClear]'`
- `selector: '[bitSearchStart]'` 变更为 `selector: 'input[bitSearchStart],button[bitSearchStart]'`
- `selector: '[bitStatusChange]'` 变更为 `selector: 'nz-switch[bitStatusChange]'`
- `selector: '[bitUpload]'` 变更为 `selector: 'nzUpload[bitUpload]'`

## 11.0.0

升级所有组件至 Angular 11

## 10.2.0

更新异步验证器，允许定制

- handle `Observable<boolean>` 返回验证结果
- field `string` 自定义返回
- dueTime `number` 防抖动延时，默认 `500` ms

```typescript
// 原来的方式
asyncValidator(req: Observable<any>, field = 'duplicated'): Observable<any>

// 更新的方式
asyncValidator(handle: Observable<boolean>, field = 'duplicated', dueTime = 500): Observable<any>
```

## 10.1.1

增加初始化完成 `ready` 订阅，解决在获取本地存储后合并 search 时的异步处理

## 10.1.0

- 增加环境配置字段

```typesript
export interface BitConfig {
  url: {
    api: string,
    static: string,
    icon?: string
  };
  api: {
    namespace: string,
    upload: string,
    withCredentials: boolean
  };
++  curd: {
++    get: string,
++    lists: string,
++    originLists: string,
++    add: string,
++    edit: string,
++    status: string,
++    delete: string
++  };
  col: {
    [key: string]: any
  };
  locale: {
    default: string,
    mapping: Map<number, string>
    bind: Map<string, any>
  };
  i18n: {
    default: string,
    contain: string[],
    switch: I18nOption[]
  };
  page: number;
}
```

它将决定请求服务中默认的 path，因此需要在环境文件中定义配置

```typescript
const bit = factoryBitConfig({
    ...
  curd: {
    get: '/get',
    lists: '/lists',
    originLists: '/originLists',
    add: '/add',
    edit: '/edit',
    status: '/edit',
    delete: '/delete'
  },
    ...
});
```

- `BitHttpService` 中加入 `order` 排序字段，改良默认 `path` 设置
- 增加排序字段 `order` 设置、提供 `toQuery()` 函数返回 `[]SearchOption`
