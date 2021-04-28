---
title: 辅助 ThinkPHP 框架的工具集合
toc: true
---

辅助 ThinkPHP 快速集成 CURD API 的工具集

[![Packagist Version](https://img.shields.io/packagist/v/kain/think-bit.svg?style=flat-square)](https://github.com/kainonly/think-bit)
[![Packagist](https://img.shields.io/packagist/dt/kain/think-bit.svg?color=blue&style=flat-square)](https://github.com/kainonly/think-bit)
[![PHP from Packagist](https://img.shields.io/packagist/php-v/kain/think-bit.svg?color=blue&style=flat-square)](https://github.com/kainonly/think-bit)
[![Packagist](https://img.shields.io/packagist/l/kain/think-bit.svg?color=blue&style=flat-square)](https://github.com/kainonly/think-bit)

## 安装

```shell
composer require kain/think-bit
```

### 扩展配置

首先需要将 `config/app.php` 配置文件更新与新增相关定义

```php
return [

    // 应用名称
    'app_name' => Env::get('app.name', null),
    // 应用标识
    'app_id' => Env::get('app.id', null),
    // 应用密钥
    'app_secret' => Env::get('app.secret', null),
    // 应用地址
    'app_host' => Env::get('app.host', 'http://localhost:8000'),
    // 管理后台域名
    'app_backstage' => Env::get('app.backstage', 'http://localhost:4200'),
];
```

### 相关扩展

从 `kain/think-bit` 版本 `>= 6.0.6` 组件开始独立组件，并逐步遵循 `PSR` 规范与 `PHP` 严格模式

- [kain/think-extra](https://packagist.org/packages/kain/think-extra) ThinkPHP 工具扩展库
- [kain/think-support](https://packagist.org/packages/kain/think-support) ThinkPHP 依赖与功能支持库
- [kain/think-redis](https://packagist.org/packages/kain/think-redis) ThinkPHP Redis 扩展
- [kain/think-amqp](https://packagist.org/packages/kain/think-amqp) ThinkPHP RabbitMQ 消息队列 AMQP 操作类
- [kain/think-elastic](https://packagist.org/packages/kain/think-elastic) ThinkPHP ElasticSearch 扩展
- [kain/think-aliyun-extra](https://packagist.org/packages/kain/think-aliyun-extra) ThinkPHP 阿里云相关扩展
- [kain/think-huaweicloud-extra](https://packagist.org/packages/kain/think-huaweicloud-extra) ThinkPHP 华为云相关扩展

### 依赖安装

在容器项目中可以使用 `docker-compose` 编排

```yml
version: '3.7'
services:
  dev:
    image: composer
    command: 'composer update --prefer-dist -o --ignore-platform-reqs'
    volumes:
      - /composer:/tmp
      - ./:/app
  update:
    image: composer
    command: 'composer update --prefer-dist -o --no-dev --ignore-platform-reqs'
    volumes:
      - /composer:/tmp
      - ./:/app
```

然后执行 `composer` 更新

```shell
docker-compose run --rm --no-deps update
```

## CURD 模型库

### CurdController 模型控制器

CurdController 辅助 CURD 模型库的主控制器属性都继承于此，CurdController 控制器已经包含了默认的 BaseController，开发中可以再渡继承处理，例如

```php
use think\bit\CurdController;

abstract class Base extends CurdController
{
    protected $middleware = ['cors', 'json', 'post', 'auth'];

    protected function initialize()
    {
        if ($this->request->isPost()) {
            $this->post = $this->request->post();
        }
    }
}
```

#### 公共属性

- model `string` 模型名称
- post `array` 请求body，默认 `[]`

#### 获取列表数据请求属性

- origin_lists_default_validate `array` 列表数据默认验证，默认

```php
[
    'where' => 'array'
];
```

- origin_lists_before_result `array` 默认前置返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

- origin_lists_condition `array` 列表查询条件，默认 `[]`
- origin_lists_condition_query `Closure|null` 列表查询闭包条件，默认 `null`
- origin_lists_orders `array` 列表数据排序，默认

```php
[
    'create_time' => 'desc'
];
```

- origin_lists_field `array` 列表数据指定返回字段，默认 `[]`
- origin_lists_without_field `array` 列表数据指定排除的返回字段，默认

```php
[
    'update_time', 
    'create_time'
];
```

#### 获取分页数据请求属性

- lists_default_validate `array` 分页数据默认验证器，默认

```php
[
    'page' => 'require',
    'page.limit' => 'require|number|between:1,50',
    'page.index' => 'require|number|min:1',
    'where' => 'array'
];
```

- lists_before_result `array` 分页数据前置返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

- lists_condition `array` 分页数据查询条件，默认 `[]`
- lists_condition_query `Closure|null` 分页数据查询闭包条件，默认 `null`
- lists_orders `array` 分页数据排序，默认

```php
[
    'create_time' => 'desc'
];
```

- lists_field `array` 分页数据限制字段，默认 `[]`
- lists_without_field `array` 分页数据指定排除的返回字段，默认

```php
[
    'update_time', 
    'create_time'
];
```

#### 获取单条数据请求属性

- get_default_validate `array` 单条数据默认验证器，默认

```php
[
    'id' => 'requireWithout:where|number',
    'where' => 'requireWithout:id|array'
];
```

- get_before_result `array` 单条数据前置返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

- get_condition `array` 单条数据查询条件，默认 `[]`
- get_field `array` 单条数据限制字段，默认 `[]`
- get_without_field `array` 单条数据指定排除的返回字段，默认

```php
[
    'update_time', 
    'create_time'
];
```

#### 新增数据请求属性

- add_model `string` 分离新增模型名称，默认 `null`
- add_default_validate `array` 新增数据默认验证器，默认 `[]`
- add_auto_timestamp `bool` 自动更新字段 `create_time` `update_time` 的时间戳，默认 `true`
- add_before_result `array` 新增数据前置返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

- add_after_result `array` 新增数据后置返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:after_fail'
];
```

- add_fail_result `array` 新增数据失败返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:insert_fail'
];
```

#### 修改数据请求属性

- edit_model `string` 分离编辑模型名称，默认 `null`
- edit_default_validate `array` 编辑默认验证器，默认

```php
[
    'id' => 'require|number',
    'switch' => 'require|bool'
];
```

- edit_auto_timestamp `bool` 自动更新字段 `update_time` 的时间戳，默认 `true`
- edit_switch `boolean` 是否仅为状态编辑，默认 `false`
- edit_before_result `array` 编辑前置返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

- edit_condition `array` 编辑查询条件，默认 `[]`
- edit_fail_result `array` 编辑失败返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:fail'
];
```

- edit_after_result `array` 编辑后置返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:after_fail'
];
```

#### 删除数据请求属性

- delete_model `string` 分离删除模型名称，默认 `null`
- delete_default_validate `array` 删除默认验证器，默认

```php
[
    'id' => 'require'
];
```

- delete_before_result `array` 删除前置返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

- delete_condition `array` 删除查询条件，默认 `[]`
- delete_prep_result `array` 事务开始之后数据写入之前返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:prep_fail'
];
```

- delete_fail_result `array` 删除失败返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:fail'
];
```

- delete_after_result `array` 删除后置返回结果，默认

```php
[
    'error' => 1,
    'msg' => 'error:after_fail'
];
```

### GetModel 获取单个数据

GetModel 获取单条数据的通用请求处理，请求 `body` 可使用 id 或 where 字段进行查询，二者选一

- id `int|string` 主键
- where `array` 查询条件

where 必须使用数组查询方式来定义，例如

```json
{
    "where":[
        ["name", "=", "van"]
    ]
}
```

如果查询条件为 JSON 

```json
{
    "where":[
        ["extra->nickname", "=", "kain"]
    ]
}
```

将 think\bit\common\GetModel 引入，然后定义模型 model 的名称（即表名称）

```php
use app\system\controller\BaseController;
use think\bit\common\GetModel;

class AdminClass extends BaseController {
    use GetModel;

    protected $model = 'admin';
}
```

自定义验证器为 get_default_validate ，验证器与ThinkPHP验证器使用一致，默认为

```php
[
    'id' => 'require'
];
```

也可以在控制器中针对性修改

```php
use app\system\controller\BaseController;
use think\bit\common\GetModel;

class AdminClass extends BaseController {
    use GetModel;

    protected $model = 'admin';
    protected $get_default_validate = [
        'id' => 'require',
        'name' => 'require'
    ];
}
```

如自定义前置处理，则需要继承生命周期 think\bit\lifecycle\GetBeforeHooks

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\GetBeforeHooks;
use think\bit\common\GetModel;

class AdminClass extends BaseController implements GetBeforeHooks {
    use GetModel;

    protected $model = 'admin';

    public function getBeforeHooks(): bool
    {
        return true;
    }
}
```

getBeforeHooks 的返回值为 `false` 则在此结束执行，并返回 get_before_result 属性的值，默认为：

```php
protected $get_before_result = [
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

在生命周期函数中可以通过重写自定义前置返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\GetBeforeHooks;
use think\bit\common\GetModel;

class AdminClass extends BaseController implements GetBeforeHooks {
    use GetModel;

    protected $model = 'admin';

    public function getBeforeHooks(): bool
    {
        $this->get_before_result = [
            'error'=> 1,
            'msg'=> 'error:only'
        ];
        return false;
    }
}
```

如需要给接口在后端就设定固定条件，只需要重写 get_condition，默认为

```php
$get_condition = [];
```

例如加入企业主键限制

```php
use app\system\controller\BaseController;
use think\bit\common\GetModel;

class AdminClass extends BaseController {
    use GetModel;

    protected $model = 'admin';
    protected $get_condition = [
        ['enterprise', '=', 1]
    ];
}
```

如果接口的查询条件较为特殊，可以重写 get_condition_query

```php
use app\system\controller\BaseController;
use think\bit\common\GetModel;
use think\App;
use think\db\Query;

class AdminClass extends BaseController {
    use GetModel;

    protected $model = 'admin';
    
    public function construct(App $app = null)
    {
        parent::construct($app);
        $this->get_condition_query = function (Query $query) {
            $query->json(['schema'])
        };
    }
}
```

在条件查询下使用排序，只需要重写 get_orders，默认为

```php
$get_orders = ['create_time' => 'desc'];
```

多属性排序

```php
use app\system\controller\BaseController;
use think\bit\common\GetModel;

class AdminClass extends BaseController {
    use GetModel;

    protected $model = 'admin';
    protected $lists_orders = ['age', 'create_time' => 'desc'];
}
```

排序同样允许请求 `body` 来合并定义，例如：

- order `object` 排序条件

```json
{
    "order": {
        "age": "desc"
    }
}
```

如需要给接口指定返回字段，只需要重写 get_field 或 get_without_field，默认为

```php
$get_field = [];
$get_without_field = ['update_time', 'create_time'];
```

`*get_field 即指定显示字段，get_without_field 为排除的显示字段，二者无法共用*`

例如返回除 update_time 修改时间所有的字段

```php
use app\system\controller\BaseController;
use think\bit\common\GetModel;

class AdminClass extends BaseController {
    use GetModel;

    protected $model = 'admin';
    protected $get_without_field = ['update_time'];
}
```

如自定义返回结果，则需要继承生命周期 think\bit\lifecycle\GetCustom

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\GetCustom;
use think\bit\common\GetModel;

class AdminClass extends BaseController implements GetCustom {
    use GetModel;

    protected $model = 'admin';

    public function getCustomReturn(array $data): array
    {
        return [
            'error' => 0,
            'data' => $data
        ];
    }
}
```

getCustomReturn 需要返回整体的响应结果

```php
[
    'error' => 0,
    'data' => []
];
```

- data `array` 原数据

### OriginListsModel 获取列表数据

OriginListsModel 列表数据的通用请求处理，请求 `body` 使用数组查询方式来定义

- where `array` 查询条件

`*请求中的 where 还会与 origin_lists_condition 合并条件*`

where 必须使用数组查询方式来定义，例如

```json
{
    "where":[
        ["name", "=", "kain"]
    ]
}
```

如果条件中包含模糊查询

```json
{
    "where":[
        ["name", "like", "%v%"]
    ]
}
```

如果查询条件为 JSON 

```json
{
    "where":[
        ["extra->nickname", "=", "kain"]
    ]
}
```

将 think\bit\common\OriginListsModel 引入，然后定义模型 model 的名称（即表名称）

```php
use app\system\controller\BaseController;
use think\bit\common\OriginListsModel;

class AdminClass extends BaseController {
    use OriginListsModel;

    protected $model = 'admin';
}
```

创建验证器场景 validate/AdminClass， 并加入场景 `origin`

```php
use think\Validate;

class AdminClass extends Validate
{
    protected $rule = [
        'status' => 'require',
    ];

    protected $scene = [
        'origin' => ['status'],
    ];
}
```

可定义固定条件属性 origin_lists_condition，默认为 `[]`

```php
use app\system\controller\BaseController;
use think\bit\common\OriginListsModel;

class NoBodyClass extends BaseController {
    use OriginListsModel;

    protected $model = 'nobody';
    protected $origin_lists_condition = [
        ['status', '=', 1]
    ];
}
```

如果接口的查询条件较为特殊，可以重写 origin_lists_condition_query

```php
use app\system\controller\BaseController;
use think\bit\common\OriginListsModel;
use think\App;
use think\db\Query;

class NoBodyClass extends BaseController {
    use OriginListsModel;

    protected $model = 'nobody';
    
    public function construct(App $app = null)
    {
        parent::construct($app);
        $this->origin_lists_condition_query = function (Query $query) {
            $query->whereOr([
                'type' => 1
            ]);
        };
    }
}
```

如自定义前置处理，则需要继承生命周期 think\bit\lifecycle\OriginListsBeforeHooks

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\OriginListsBeforeHooks;
use think\bit\common\OriginListsModel;

class AdminClass extends BaseController implements OriginListsBeforeHooks {
    use OriginListsModel;

    protected $model = 'admin';

    public function originListsBeforeHooks(): bool
    {
        return true;
    }
}
```

originListsBeforeHooks 的返回值为 `false` 则在此结束执行，并返回 origin_lists_before_result 属性的值，默认为：

```php
protected $origin_lists_before_result = [
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

在生命周期函数中可以通过重写自定义前置返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\OriginListsBeforeHooks;
use think\bit\common\OriginListsModel;

class AdminClass extends BaseController implements OriginListsBeforeHooks {
    use OriginListsModel;

    protected $model = 'admin';

    public function originListsBeforeHooks(): bool
    {
        $this->origin_lists_before_result = [
            'error'=> 1,
            'msg'=> 'error:only'
        ];
        return false;
    }
}
```

如需要给接口在后端就设定固定条件，只需要重写 origin_lists_condition，默认为

```php
$origin_lists_condition = [];
```

例如加入企业主键限制

```php
use app\system\controller\BaseController;
use think\bit\common\OriginListsModel;

class AdminClass extends BaseController {
    use OriginListsModel;

    protected $model = 'admin';
    protected $origin_lists_condition = [
        ['enterprise', '=', 1]
    ];
}
```

如果需要列表按条件排序，只需要重写 origin_lists_orders，默认为

```php
protected $origin_lists_orders = ['create_time' => 'desc'];
```

多属性排序

```php
use app\system\controller\BaseController;
use think\bit\common\OriginListsModel;

class AdminClass extends BaseController {
    use OriginListsModel;

    protected $model = 'admin';
    protected $origin_lists_orders =  ['age', 'create_time' => 'desc'];
}
```

排序同样允许请求 `body` 来合并定义，例如：

- order `object` 排序条件

```json
{
    "order": {
        "age": "desc"
    }
}
```

如需要给接口限制返回字段，只需要重写 origin_lists_field，默认为

```php
protected $origin_lists_field = [];
protected $origin_lists_without_field = ['update_time', 'create_time'];
```

例如返回除 update_time 修改时间所有的字段

```php
use app\system\controller\BaseController;
use think\bit\common\OriginListsModel;

class AdminClass extends BaseController {
    use OriginListsModel;

    protected $model = 'admin';
    protected $origin_lists_without_field = ['update_time'];
}
```

如自定义返回结果，则需要继承生命周期 think\bit\lifecycle\OriginListsCustom

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\OriginListsCustom;
use think\bit\common\OriginListsModel;

class AdminClass extends BaseController implements OriginListsCustom {
    use OriginListsModel;

    protected $model = 'admin';

    public function originListsCustomReturn(Array $lists): array
    {
        return [
            'error' => 0,
            'data' => $lists
        ];
    }
}
```

originListsCustomReturn 需要返回整体的响应结果

```php
return json([
    'error' => 0,
    'data' => []
]);
```

- data `array` 原数据

### ListsModel 获取分页数据

ListsModel 分页数据的通用请求处理，请求 `body` 使用数组查询方式来定义

- where `array` 查询条件

`*请求中的 where 还会与 lists_condition 合并条件*`

where 必须使用数组查询方式来定义，例如

```json
{
    "where":[
        ["name", "=", "kain"]
    ]
}
```

如果条件中包含模糊查询

```json
{
    "where":[
        ["name", "like", "%v%"]
    ]
}
```

如果查询条件为 JSON 

```json
{
    "where":[
        ["extra->nickname", "=", "kain"]
    ]
}
```

将 think\bit\common\ListsModel 引入，然后定义模型 model 的名称（即表名称）

```php
use app\system\controller\BaseController;
use think\bit\common\ListsModel;

class AdminClass extends BaseController {
    use ListsModel;

    protected $model = 'admin';
}
```

如自定义前置处理，则需要调用生命周期 think\bit\lifecycle\ListsBeforeHooks

```php
use app\system\controller\BaseController;use think\bit\common\ListsModel;
use think\bit\lifecycle\ListsBeforeHooks;

class AdminClass extends BaseController implements ListsBeforeHooks {
    use ListsModel;

    protected $model = 'admin';

    public function listsBeforeHooks(): bool
    {
        return true;
    }
}
```

listsBeforeHooks 的返回值为 `false` 则在此结束执行，并返回 lists_before_result 属性的值，默认为：

```php
$lists_before_result = [
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

在生命周期函数中可以通过重写自定义前置返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\ListsBeforeHooks;
use think\bit\common\ListsModel;

class AdminClass extends BaseController implements ListsBeforeHooks {
    use ListsModel;

    protected $model = 'admin';

    public function listsBeforeHooks(): bool
    {
        $this->lists_before_result = [
            'error'=> 1,
            'msg'=> 'error:only'
        ];
        return false;
    }
}
```

如需要给接口在后端就设定固定条件，只需要重写 lists_condition，默认为

```php
$lists_condition = [];
```

例如加入企业主键限制

```php
use app\system\controller\BaseController;
use think\bit\common\ListsModel;

class AdminClass extends BaseController {
    use ListsModel;

    protected $model = 'admin';
    protected $lists_condition = [
        ['enterprise', '=', 1]
    ];
}
```

如果接口的查询条件较为特殊，可以重写 lists_condition_query

```php
use app\system\controller\BaseController;
use think\bit\common\ListsModel;
use think\App;
use think\db\Query;

class AdminClass extends BaseController {
    use ListsModel;

    protected $model = 'admin';
    
    public function construct(App $app = null)
    {
        parent::construct($app);
        $this->lists_condition_query = function (Query $query) {
            $query->whereOr([
                'type' => 1
            ]);
        };
    }
}
```

如果需要列表按条件排序，只需要重写 lists_orders，默认为

```php
$lists_orders = ['create_time' => 'desc'];
```

多属性排序

```php
use app\system\controller\BaseController;
use think\bit\common\ListsModel;

class AdminClass extends BaseController {
    use ListsModel;

    protected $model = 'admin';
    protected $lists_orders = ['age', 'create_time' => 'desc'];
}
```

排序同样允许请求 `body` 来合并定义，例如：

- order `object` 排序条件

```json
{
    "order": {
        "age": "desc"
    }
}
```

如需要给接口限制返回字段，只需要重写 lists_field 或 lists_without_field，默认为

```php
$lists_field = [];
$lists_without_field = ['update_time', 'create_time'];
```

例如返回除 update_time 修改时间所有的字段

```php
use app\system\controller\BaseController;
use think\bit\common\ListsModel;

class AdminClass extends BaseController {
    use ListsModel;

    protected $model = 'admin';
    protected $lists_without_field = ['update_time'];
}
```

如自定义返回结果，则需要继承生命周期 think\bit\lifecycle\ListsCustom

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\ListsCustom;
use think\bit\common\ListsModel;

class AdminClass extends BaseController implements ListsCustom {
    use ListsModel;

    protected $model = 'admin';

    public function listsCustomReturn(Array $lists, int $total): array 
    {
        return [
            'error' => 0,
            'data' => [
                'lists' => $lists,
                'total' => $total,
            ]
        ];
    }
}
```

listsCustomReturn 需要返回整体的响应结果

```php
return [
    'error' => 0,
    'data' => [
        'lists' => [],
        'total' => [],
    ]
];
```

- data `array` 原数据

### AddModel 新增数据

AddModel 新增数据的通用请求处理

将 think\bit\common\AddModel 引入，然后定义模型 model 的名称（即表名称）

```php
use app\system\controller\BaseController;
use think\bit\common\AddModel;

class AdminClass extends BaseController {
    use AddModel;

    protected $model = 'admin';
}
```

创建验证器场景 validate/AdminClass， 并加入场景 `add`

```php
use think\Validate;

class AdminClass extends Validate
{
    protected $rule = [
        'name' => 'require',
    ];

    protected $scene = [
        'add' => ['name'],
    ];
}
```

如自定义前置处理（发生在验证之后与数据写入之前），则需要继承生命周期 think\bit\lifecycle\AddBeforeHooks

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\AddBeforeHooks;
use think\bit\common\AddModel;

class AdminClass extends BaseController implements AddBeforeHooks {
    use AddModel;

    protected $model = 'admin';

    public function addBeforeHooks(): bool 
    {
        return true;
    }
}
```

addBeforeHooks 的返回值为 `false` 则在此结束执行，并返回 add_before_result 属性的值，默认为：

```php
[
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

在生命周期函数中可以通过重写自定义前置返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\AddBeforeHooks;
use think\bit\common\AddModel;

class AdminClass extends BaseController implements AddBeforeHooks {
    use AddModel;

    protected $model = 'admin';

    public function addBeforeHooks(): bool
    {
        $this->add_before_result = [
            'error'=> 1,
            'msg'=> 'error:only'
        ];
        return false;
    }
}
```

如自定义后置处理（发生在写入成功之后与提交事务之前），则需要调用生命周期 think\bit\lifecycle\AddAfterHooks

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\AddAfterHooks;
use think\bit\common\AddModel;

class AdminClass extends BaseController implements AddAfterHooks {
    use AddModel;

    protected $model = 'admin';

    public function addAfterHooks($pk): bool
    {
        return true;
    }
}
```

pk 为模型写入后返回的主键，addAfterHooks 的返回值为 `false` 则在此结束执行进行事务回滚，并返回 add_after_result 属性的值，默认为：

```php
[
    'error' => 1,
    'msg' => 'error:after_fail'
];
```

在生命周期函数中可以通过重写自定义后置返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\AddAfterHooks;
use think\bit\common\AddModel;

class AdminClass extends BaseController implements AddAfterHooks {
    use AddModel;

    protected $model = 'admin';

    public function addAfterHooks($pk): bool
    {
        $this->add_after_result = [
            'error'=> 1,
            'msg'=> 'error:redis'
        ];
        return false;
    }
}
```

### EditModel 编辑数据

EditModel 修改数据的通用请求处理，请求 `body` 可使用 id 或 where 字段进行查询，二者选一

- id `int|string` 主键
- where `array` 查询条件

where 必须使用数组查询方式来定义，例如

```json
{
    "where":[
        ["name", "=", "van"]
    ]
}
```

如果查询条件为 JSON 

```json
{
    "where":[
        ["extra->nickname", "=", "kain"]
    ]
}
```

将 think\bit\common\EditModel 引入，然后定义模型 model 的名称（即表名称）

```php
use app\system\controller\BaseController;
use think\bit\common\EditModel;

class AdminClass extends BaseController {
    use EditModel;

    protected $model = 'admin';
}
```

自定义删除验证器为 edit_default_validate，默认为

```php
[
    'id' => 'require',
    'switch' => 'bool'
];
```

也可以在控制器中针对性修改

```php
use app\system\controller\BaseController;
use think\bit\common\EditModel;

class AdminClass extends BaseController {
    use EditModel;

    protected $model = 'admin';
    protected $edit_default_validate = [
        'id' => 'require',
        'switch' => 'bool',
        'status' => 'require',
    ];
}
```

应创建验证器场景 validate/AdminClass，edit_switch 为 `false` 下有效， 并加入场景 `edit`

```php
use think\Validate;

class AdminClass extends Validate
{
    protected $rule = [
        'name' => 'require',
    ];

    protected $scene = [
        'edit' => ['name'],
    ];
}
```

如自定义前置处理（发生在验证之后与数据写入之前），则需要继承生命周期 think\bit\lifecycle\EditBeforeHooks

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\EditBeforeHooks;
use think\bit\common\EditModel;

class AdminClass extends BaseController implements EditBeforeHooks {
    use EditModel;

    protected $model = 'admin';

    public function editBeforeHooks() :bool 
    {
        return true;
    }
}
```

editBeforeHooks 的返回值为 `false` 则在此结束执行，并返回 edit_before_result 属性的值，默认为：

```php
[
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

在生命周期函数中可以通过重写自定义前置返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\EditBeforeHooks;
use think\bit\common\EditModel;

class AdminClass extends BaseController implements EditBeforeHooks {
    use EditModel;

    protected $model = 'admin';

    public function editBeforeHooks(): bool
    {
        $this->edit_before_result = [
            'error'=> 1,
            'msg'=> 'error:only'
        ];
        return false;
    }
}
```

如自定义后置处理（发生在写入成功之后与提交事务之前），则需要继承生命周期 think\bit\lifecycle\EditAfterHooks

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\EditAfterHooks;
use think\bit\common\EditModel;

class AdminClass extends BaseController implements EditAfterHooks {
    use EditModel;

    protected $model = 'admin';

    public function editAfterHooks(): bool
    {
        return true;
    }
}
```

editAfterHooks 的返回值为 `false` 则在此结束执行进行事务回滚，并返回 edit_after_result 属性的值，默认为：

```php
[
    'error' => 1,
    'msg' => 'error:after_fail'
];
```

在生命周期函数中可以通过重写自定义后置返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\EditAfterHooks;
use think\bit\common\EditModel;

class AdminClass extends BaseController implements EditAfterHooks {
    use EditModel;

    protected $model = 'admin';

    public function editAfterHooks(): bool
    {
        $this->edit_after_result = [
            'error'=> 1,
            'msg'=> 'error:redis'
        ];
        return false;
    }
}
```

### DeleteModel 删除数据

DeleteModel 删除数据的通用请求处理，请求 `body` 可使用 id 或 where 字段进行查询，二者选一

- id `int|string` 主键
- where `array` 查询条件

where 必须使用数组查询方式来定义，例如

```json
{
    "where":[
        ["name", "=", "van"]
    ]
}
```

如果查询条件为 JSON 

```json
{
    "where":[
        ["extra->nickname", "=", "kain"]
    ]
}
```

将 think\bit\common\DeleteModel 引入，然后定义模型 model 的名称（即表名称）

```php
use app\system\controller\BaseController;
use think\bit\common\DeleteModel;

class AdminClass extends BaseController {
    use DeleteModel;

    protected $model = 'admin';
}
```

自定义删除验证器为 delete_validate，默认为

```php
[
    'id' => 'require'
];
```

也可以在控制器中针对性修改

```php
use app\system\controller\BaseController;
use think\bit\common\DeleteModel;

class AdminClass extends BaseController {
    use DeleteModel;

    protected $model = 'admin';
    protected $delete_validate = [
        'id' => 'require',
        'name' => 'require'
    ];
}
```

如自定义前置处理（发生在验证之后与数据删除之前），则需要继承生命周期 think\bit\lifecycle\DeleteBeforeHooks

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\DeleteBeforeHooks;
use think\bit\common\DeleteModel;

class AdminClass extends BaseController implements DeleteBeforeHooks {
    use DeleteModel;

    protected $model = 'admin';

    public function deleteBeforeHooks(): bool
    {
        return true;
    }
}
```

deleteBeforeHooks 的返回值为 `false` 则在此结束执行，并返回 delete_before_result 属性的值，默认为：

```php
[
    'error' => 1,
    'msg' => 'error:before_fail'
];
```

在生命周期函数中可以通过重写自定义前置返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\DeleteBeforeHooks;
use think\bit\common\DeleteModel;

class AdminClass extends BaseController implements DeleteBeforeHooks {
    use DeleteModel;

    protected $model = 'admin';

    public function deleteBeforeHooks(): bool
    {
        $this->delete_before_result = [
            'error'=> 1,
            'msg'=> 'error:only'
        ];
        return false;
    }
}
```

如该周期处理，则需要继承生命周期 think\bit\lifecycle\DeletePrepHooks

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\DeletePrepHooks;
use think\bit\common\DeleteModel;

class AdminClass extends BaseController implements DeletePrepHooks {
    use DeleteModel;

    protected $model = 'admin';

    public function deletePrepHooks(): bool
    {
        return true;
    }
}
```

deletePrepHooks 的返回值为 `false` 则在此结束执行进行事务回滚，并返回 delete_prep_result 属性的值，默认为：

```php
[
    'error' => 1,
    'msg' => 'error:prep_fail'
];
```

在生命周期函数中可以通过重写自定义返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\DeletePrepHooks;
use think\bit\common\DeleteModel;

class AdminClass extends BaseController implements DeletePrepHooks {
    use DeleteModel;

    protected $model = 'admin';

    public function deletePrepHooks(): bool
    {
        $this->delete_prep_result = [
            'error'=> 1,
            'msg'=> 'error:insert'
        ];
        return false;
    }
}
```

如自定义后置处理（发生在数据删除成功之后与提交事务之前），则需要继承生命周期 think\bit\lifecycle\DeleteAfterHooks

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\DeleteAfterHooks;
use think\bit\common\DeleteModel;

class AdminClass extends BaseController implements DeleteAfterHooks {
    use DeleteModel;

    protected $model = 'admin';

    public function deleteAfterHooks(): bool
    {
        return true;
    }
}
```

deleteAfterHooks 的返回值为 `false` 则在此结束执行进行事务回滚，并返回 delete_after_result 属性的值，默认为：

```php
[
    'error' => 1,
    'msg' => 'error:after_fail'
];
```

在生命周期函数中可以通过重写自定义后置返回

```php
use app\system\controller\BaseController;
use think\bit\lifecycle\DeleteAfterHooks;
use think\bit\common\DeleteModel;

class AdminClass extends BaseController implements DeleteAfterHooks {
    use DeleteModel;

    protected $model = 'admin';

    public function deleteAfterHooks(): bool
    {
        $this->delete_after_result = [
            'error'=> 1,
            'msg'=> 'error:redis'
        ];
        return false;
    }
}
```

## Extra 扩展

### Hash 密码

Hash 用于密码加密与验证，此服务必须安装 `kain/think-extra`，需要添加配置 `config/hashing.php`

```php
return [

    // 散列类型
    'driver' => 'argon2id',
    // Bcrypt 配置
    'bcrypt' => [
        'rounds' => env('BCRYPT_ROUNDS', 10),
    ],
    // Argon2i 与Argon2id 配置
    'argon' => [
        'memory' => 1024,
        'threads' => 2,
        'time' => 2,
    ],

];
```

- driver `bcrypt|argon|argon2id` 加密算法
- bcrypt `array` bcrypt 的配置
- argon `array` argon2i 与 argon2id 的配置

安装后服务将自动注册可通过依赖注入使用

```php
use think\extra\contract\HashInterface;

class Index extends BaseController
{
    public function index(HashInterface $hash)
    {
        $hash->create('123456');
    }
}
```

#### 加密密码 

- create(string $password, array $options = [])
  - password `string` 密码
  - options `array` 加密参数

```php
use think\support\facade\Hash;

Hash::create('123456789');
```

#### 验证密码

- check(string $password, string $hashPassword): bool
  - password `string` 密码
  - hashPassword `string` 散列密码

```php
use think\support\facade\Hash;

$hash = Hash::create('123456789');

// "$argon2id$v=19$m=65536,t=4,p=1$QmlpMEpNY2x3S0FMZ1phVg$XBhTEMcblOge1svlB2/5NNieCDfoT1BvJDinuyBwkKQ"

Hash::check('12345678', $hash);

// false

Hash::check('123456789', $hash);

// true
```

### Cipher 数据加密

Cipher 可以将字符串或数组进行加密解密的服务，此服务必须安装 `kain/think-extra`，需要添加配置 `app_secret` 与 `app_id` 到 `config/app.php`

```php
return [

    'app_id' => env('app.id', null),
    'app_secret' => env('app.secret', null),

];
```

- app_id `string` 应用ID
- app_secret `string` 应用密钥

安装后服务将自动注册可通过依赖注入使用

```php
use think\extra\contract\CipherInterface;

class Index extends BaseController
{
    public function index(CipherInterface $cipher)
    {
        $cipher->encrypt('123');
    }
}
```

#### 加密数据内容

- encrypt($context): string
  - context `string|array` 数据
  - return `string` 密文

```php
use think\support\facade\Cipher;

Cipher::encrypt('123');

// FLgXf5EXF6eGEqphO3WVJQ==

Cipher::encrypt([
    'name' => 'kain'
]);

// IyGcnXqDT6ersFhAKdduUQ==
```

#### 解密数据

- decrypt(string $ciphertext, bool $auto_conver = true)
  - ciphertext `string` 密文
  - auto_conver `bool` 数据属于数组时是否自动转换
  - return `string|array` 解密内容

```php
use think\support\facade\Cipher;

$result = Cipher::encrypt([
    'name' => 'kain'
]);

Cipher::decrypt($result);

// array:1 [▼
//   "name" => "kain"
// ]
```

### Token 令牌

Token 是 JSON Web Token 方案的功能服务，此服务必须安装 `kain/think-extra`，首先更新配置 `config/token.php`

```php
return [
    'system' => [
        'issuer' => 'system',
        'audience' => 'someone',
        'expires' => 3600,
    ],
];
```

当中 `system` `xsrf` 就是 `Token` 的 Label 标签，可以自行定义名称

- issuer `string` 发行者
- audience `string` 听众
- expires `int` 有效时间

安装后服务将自动注册可通过依赖注入使用

```php
use think\extra\contract\TokenInterface;

class Index extends BaseController
{
    public function index(TokenInterface $token)
    {
        $token->create('system', '12345678', 'a1b2');
    }
}
```

#### 生成令牌

- create(string $scene, string $jti, string $ack, array $symbol = []): Plain
  - scene `string` 场景标签
  - jti `string` Token ID
  - ack `string` Token 确认码
  - symbol `array` 标识组
  - return `Lcobucci\JWT\Token\Plain`

```php
use think\support\facade\Token;

$token = Token::create('system', '12345678', 'a1b2');

dump($token->toString());

// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkua2Fpbm9ubHkuY29tIiwiYXVkIjoiY29uc29sZS5rYWlub25seS5jb20iLCJqdGkiOiIxMjM0NTY3OCIsImFjayI6ImExYjIiLCJzeW1ib2wiOltdLCJleHAiOiIxNjA2MzY3MzQyLjUxMjA2MSJ9.YTIaJU2fBWIssxCu752DAM6yUlWOzJCTJFdsdkT18-0 ◀"
```

#### 获取令牌对象

- get(string $jwt): Plain
  - jwt `string` 字符串令牌
  - return `Lcobucci\JWT\Token\Plain`

```php
use think\support\facade\Token;

$jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkua2Fpbm9ubHkuY29tIiwiYXVkIjoiY29uc29sZS5rYWlub25seS5jb20iLCJqdGkiOiIxMjM0NTY3OCIsImFjayI6ImExYjIiLCJzeW1ib2wiOltdLCJleHAiOiIxNjA2MzY3MzQyLjUxMjA2MSJ9.YTIaJU2fBWIssxCu752DAM6yUlWOzJCTJFdsdkT18-0';

$token = Token::get($jwt);

dump($token);

// Lcobucci\JWT\Token\Plain {#78 ▼
//   -headers: Lcobucci\JWT\Token\DataSet {#87 ▼
//     -data: array:2 [▶]
//     -encoded: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
//   }
//   -claims: Lcobucci\JWT\Token\DataSet {#88 ▼
//     -data: array:6 [▶]
//     -encoded: "eyJpc3MiOiJhcGkua2Fpbm9ubHkuY29tIiwiYXVkIjoiY29uc29sZS5rYWlub25seS5jb20iLCJqdGkiOiIxMjM0NTY3OCIsImFjayI6ImExYjIiLCJzeW1ib2wiOltdLCJleHAiOiIxNjA2MzY3MzQyLjUxMjA2 ▶"
//   }
//   -signature: Lcobucci\JWT\Token\Signature {#90 ▼
//     -hash: b"a2\x1A%Mƒ\x05b,│\x10«´Øâ\x00╬▓RUÄ╠Éô$WlvD§¾Ý"
//     -encoded: "YTIaJU2fBWIssxCu752DAM6yUlWOzJCTJFdsdkT18-0"
//   }
// }
```

#### 验证令牌有效性

- verify(string $scene, string $jwt): stdClass
  - scene `string` 场景标签
  - jwt `string` 字符串令牌
  - return `stdClass`
    - expired `bool` 是否过期
    - token `Lcobucci\JWT\Token\Plain` 令牌对象

```php
use think\support\facade\Token;

$jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkua2Fpbm9ubHkuY29tIiwiYXVkIjoiY29uc29sZS5rYWlub25seS5jb20iLCJqdGkiOiIxMjM0NTY3OCIsImFjayI6ImExYjIiLCJzeW1ib2wiOltdLCJleHAiOiIxNjA2MzY3MzQyLjUxMjA2MSJ9.YTIaJU2fBWIssxCu752DAM6yUlWOzJCTJFdsdkT18-0';
$result = Token::verify('system', $jwt);

dump($result);
//{#94 ▼
//  +"expired": false
//  +"token": Lcobucci\JWT\Token\Plain {#89 ▼
//    -headers: Lcobucci\JWT\Token\DataSet {#90 ▼
//      -data: array:2 [▶]
//      -encoded: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"
//    }
//    -claims: Lcobucci\JWT\Token\DataSet {#91 ▼
//      -data: array:6 [▶]
//      -encoded: "eyJpc3MiOiJhcGkua2Fpbm9ubHkuY29tIiwiYXVkIjoiY29uc29sZS5rYWlub25seS5jb20iLCJqdGkiOiIxMjM0NTY3OCIsImFjayI6ImExYjIiLCJzeW1ib2wiOltdLCJleHAiOiIxNjA2MzY3MzQyLjUxMjA2 ▶"
//    }
//    -signature: Lcobucci\JWT\Token\Signature {#93 ▼
//      -hash: b"a2\x1A%Mƒ\x05b,│\x10«´Øâ\x00╬▓RUÄ╠Éô$WlvD§¾Ý"
//      -encoded: "YTIaJU2fBWIssxCu752DAM6yUlWOzJCTJFdsdkT18-0"
//    }
//  }
//}
```

### Utils 工具集

Utils 常用工具集合，此服务必须安装 `kain/think-extra`， 安装后服务将自动注册可通过依赖注入使用

```php
use think\extra\contract\UtilsInterface;

class Index extends BaseController
{
    public function index(UtilsInterface $utils)
    {
        return $utils
            ->jump('提交成功', 'index/index')
            ->success();
    }
}
```

#### 跳转回调工具

- jump(string $msg, string $url = '', string $type = 'html'): Jump
  - msg `string` 跳转信息
  - url `string` 回调Url
  - type `int` 返回类型 `html` 或`json`

```php
use think\support\facade\Utils;

class Index extends BaseController
{
    public function index()
    {
        return Utils::jump('提交成功', 'index/index')
            ->success();
    }
}
```

### Helper 助手

Helper 助手函数扩展，此服务必须安装 `kain/think-extra`

#### 生成 uuid v4

- uuid()
  - return `UuidInterface`

```php
$uuid = uuid();

dump($uuid);

// Uuid {#50 ▼
//   #codec: StringCodec {#53 ▼
//     -builder: DefaultUuidBuilder {#52 ▼
//       -converter: DegradedNumberConverter {#51}
//     }
//   }
//   #fields: array:6 [▼
//     "time_low" => "a2bcf1d5"
//     "time_mid" => "2be3"
//     "time_hi_and_version" => "4dc6"
//     "clock_seq_hi_and_reserved" => "8c"
//     "clock_seq_low" => "d4"
//     "node" => "937835a18a8b"
//   ]
//   #converter: DegradedNumberConverter {#51}
// }

dump($uuid->toString());

// "a2bcf1d5-2be3-4dc6-8cd4-937835a18a8b"
```

#### Stringy字符串操作工具

- stringy($str = '', $encoding = null)
  - str `string`
  - encoding `string`
  - return `Stringy\Stringy`，更多操作可参考 [danielstjules/Stringy](https://github.com/danielstjules/Stringy)

```php
stringy('abc');
```

## Component 组件

### Redis 缓存

Redis 缓存使用 [Predis](https://github.com/nrk/predis) 做为依赖，还需要安装 `kain/think-redis`

```shell
composer require kain/think-redis
```

安装后服务将自动注册，然后需要更新配置 `config/database.php`，例如：

```php
return [

    'redis' => [
        'default' => [
            // 服务器地址
            'host' => Env::get('redis.host', '127.0.0.1'),
            // 密码
            'password' => Env::get('redis.password', null),
            // 端口
            'port' => Env::get('redis.port', 6379),
            // 数据库号
            'database' => Env::get('redis.db', 0),
        ]
    ],
    
];
```

- scheme `string` 连接协议，支持 `tcp` `unix` `http`
- host `string` 目标服务器的IP或主机名
- port `int` 目标服务器的TCP / IP端口
- path `string` 使用 `unix socket` 的文件路径
- database `int` 逻辑数据库
- password `string` 身份验证口令
- async `boolean` 指定是否以非阻塞方式建立与服务器的连接
- persistent `boolean` 指定在脚本结束其生命周期时是否应保持基础连接资源处于打开状态
- timeout `float` 用于连接到Redis服务器的超时
- read_write_timeout `float` 在对基础网络资源执行读取或写入操作时使用的超时
- alias `string` 通过别名来标识连接
- weight `integer` 集群权重
- iterable_multibulk `boolean` 当设置为true时，Predis将从Redis返回multibulk作为迭代器实例而不是简单的PHP数组
- throw_errors `boolean` 设置为true时，Redis生成的服务器错误将转换为PHP异常

#### 测试写入一个缓存 

- client(string $name = 'default')
  - name `string` 配置标识
  - return `Predis\Client`

```php
use think\support\facade\Redis;

Redis::client()->set('name', 'abc')
```

使用 `pipeline` 批量执行一万条写入

```php
use think\support\facade\Redis;

Redis::client()->pipeline(function (Pipeline $pipeline) {
    for ($i = 0; $i < 10000; $i++) {
        $pipeline->set('test:' . $i, $i);
    }
});
```

面向缓存使用事务处理

```php
use think\support\facade\Redis;

// success
Redis::client()->transaction(function (MultiExec $multiExec) {
    $multiExec->set('name:a', 'a');
    $multiExec->set('name:b', 'b');
});

// failed
Redis::client()->transaction(function (MultiExec $multiExec) {
    $multiExec->set('name:a', 'a');
    // mock exception
    throw new Exception('error');
    $multiExec->set('name:b', 'b');
});
```

### AMQP 消息队列

AMQP 消息队列操作类使用 [kain/simplify-amqp](https://github.com/kainonly/simplify-amqp) 做为依赖，首先使用 `composer` 安装操作服务

```shell
composer require kain/think-amqp
```

安装后服务将自动注册，然后需要更新配置 `config/queue.php`，例如：

```php
return [

    'rabbitmq' => [
        'default' => [
            // 服务器地址
            'hostname' => Env::get('rabbitmq.host', 'localhost'),
            // 端口号
            'port' => Env::get('rabbitmq.port', 5672),
            // 虚拟域
            'virualhost' => Env::get('rabbitmq.virualhost', '/'),
            // 用户名
            'username' => Env::get('rabbitmq.username', 'guest'),
            // 密码
            'password' => Env::get('rabbitmq.password', 'guest'),
        ]
    ]

];
```

#### AMQP 客户端 

- client(string $name = 'default')
  - name `string` 配置标识
  - return `simplify\amqp\AMQPClient`

#### 创建默认信道

- channel(Closure $closure, string $name = 'default', array $options = [])
  - closure `Closure` 信道处理
  - name `string` 配置标识
  - options `array` 操作配置
    - transaction `boolean` 开启事务，默认 `false`
    - channel_id `string` 定义信道ID，默认 `null`
    - reply_code `int` 回复码，默认 `0`
    - reply_text `string` 回复文本，默认 `''`
    - method_sig `array` 默认 `[0,0]`

```php
use think\support\facade\AMQP;
use simplify\amqp\AMQPManager;

AMQP::channel(function (AMQPManager $manager) {
    // Declare
    $manager->queue('test')
        ->setDeclare([
            'durable' => true
        ]);

    // Or delete
    $manager->queue('test')
        ->delete();
});
```

#### 创建包含事务的信道

- channeltx(Closure $closure, string $name = 'default', array $options = [])

```php
use think\support\facade\AMQP;
use simplify\amqp\AMQPManager;

AMQP::channeltx(function (AMQPManager $manager) {
    $manager->publish(
        AMQPManager::message(
            json_encode([
                "name" => "test"
            ])
        ),
        '',
        'test'
    );
    // 当返回为 false 时，将不提交发布消息
    return true;
});
```

关于 `simplify\amqp\AMQPManager` 对象完整使用可查看 [simplify-amqp](https://github.com/kainonly/simplify-amqp) 的单元测试 `tests` 目录

### ElasticSearch 全文搜索

ElasticSearch 可对数据进行全文搜索或针对数据分析查询，首先使用 `composer` 安装操作服务

```shell
composer require kain/think-elastic
```

安装后服务将自动注册，然后需要更新配置 `config/database.php`

```php
return [

    'elasticsearch' => [
        'default' => [
            // 集群连接
            'hosts' => explode(',', Env::get('elasticsearch.hosts', 'localhost:9200')),
            // 重试次数
            'retries' => 0,
            // 公共CA证书
            'SSLVerification' => null,
            // 开启日志
            'logger' => null,
            // 配置 HTTP Handler
            'handler' => null,
            // 设置连接池
            'connectionPool' => Elasticsearch\ConnectionPool\StaticNoPingConnectionPool::class,
            // 设置选择器
            'selector' => Elasticsearch\ConnectionPool\Selectors\RoundRobinSelector::class,
            // 设置序列化器
            'serializer' => Elasticsearch\Serializers\SmartSerializer::class
        ]
    ]

];
```

- hosts `array` 集群连接
- retries `int` 重试次数
- SSLVerification `string` 公共CA证书
- logger `LoggerInterface` 开启日志
- handler `mixed` 配置 HTTP Handler
- connectionPool `AbstractConnectionPool|string` 设置连接池
- selector `SelectorInterface|string` 设置选择器
- serializer `SerializerInterface|string` 设置序列化器

#### 客户端

- client(string $label = 'default')
  - label `string` 配置label
  - return `Elasticsearch\Client`

```php
use think\support\facade\ES;

$response = ES::client()->index([
    'index' => 'test',
    'id' => 'test',
    'body' => [
        'value' => 1
    ]
]);

// ^ array:8 [▼
//   "_index" => "test"
//   "_type" => "_doc"
//   "_id" => "test"
//   "_version" => 1
//   "result" => "created"
//   "_shards" => array:3 [▼
//     "total" => 2
//     "successful" => 1
//     "failed" => 0
//   ]
//   "_seq_no" => 0
//   "_primary_term" => 1
// ]
```

获取文档

```php
use think\support\facade\ES;

$response = ES::client()->get([
    'index' => 'test',
    'id' => 'test'
]);

// ^ array:8 [▼
//   "_index" => "test"
//   "_type" => "_doc"
//   "_id" => "test"
//   "_version" => 1
//   "_seq_no" => 0
//   "_primary_term" => 1
//   "found" => true
//   "_source" => array:1 [▼
//     "value" => 1
//   ]
// ]
```

搜索文档

```php
use think\support\facade\ES;

$response = ES::client()->search([
    'index' => 'test',
    'body' => [
        'query' => [
            'match' => [
                'value' => 1
            ]
        ]
    ]
]);

// ^ array:4 [▼
//   "took" => 4
//   "timed_out" => false
//   "_shards" => array:4 [▼
//     "total" => 1
//     "successful" => 1
//     "skipped" => 0
//     "failed" => 0
//   ]
//   "hits" => array:3 [▼
//     "total" => array:2 [▼
//       "value" => 1
//       "relation" => "eq"
//     ]
//     "max_score" => 1.0
//     "hits" => array:1 [▼
//       0 => array:5 [▼
//         "_index" => "test"
//         "_type" => "_doc"
//         "_id" => "test"
//         "_score" => 1.0
//         "_source" => array:1 [▼
//           "value" => 1
//         ]
//       ]
//     ]
//   ]
// ]
```

删除文档

```php
use think\support\facade\ES;

$response = ES::client()->delete([
    'index' => 'test',
    'id' => 'test'
]);

// ^ array:8 [▼
//   "_index" => "test"
//   "_type" => "_doc"
//   "_id" => "test"
//   "_version" => 2
//   "result" => "deleted"
//   "_shards" => array:3 [▼
//     "total" => 2
//     "successful" => 1
//     "failed" => 0
//   ]
//   "_seq_no" => 1
//   "_primary_term" => 1
// ]
```

删除索引

```php
use think\support\facade\ES;

$response = ES::client()->indices()->delete([
    'index' => 'test',
]);

// ^ array:1 [▼
//   "acknowledged" => true
// ]
```

创建索引

```php
use think\support\facade\ES;

$response = ES::client()->indices()->create([
    'index' => 'test'
]);

// ^ array:3 [▼
//   "acknowledged" => true
//   "shards_acknowledged" => true
//   "index" => "test"
// ]
```

`think-elastic` 使用了 [elasticsearch/elasticsearch](https://packagist.org/packages/elasticsearch/elasticsearch) ，更多方法可查看 [Elasticsearch-PHP](https://www.elastic.co/guide/en/elasticsearch/client/php-api/current/index.html) 完整文档

### 阿里云相关扩展

阿里云相关扩展是针对阿里云库的统一简化，首先使用 `composer` 安装操作服务

```shell
composer require kain/think-aliyun-extra
```

安装后服务将自动注册，然后需要更新配置 `config/aliyun.php`，例如：

```php
return [

    'accessKeyId' => env('aliyun.id'),
    'accessKeySecret' => env('aliyun.secret'),
    'oss' => [
        'endpoint' => env('aliyun.oss_endpoint'),
        'extranet' => env('aliyun.oss_extranet'),
        'bucket' => env('aliyun.oss_bucket')
    ]

];
```

- accessKeyId `string` 阿里云 keyid
- accessKeySecret `string` 阿里云 key secret
- oss
  - endpoint `string` 对象存储endpoint
  - extranet `string` 对象存储外网地址
  - bucket `string` 桶名

#### 获取对象存储客户端

- Oss::getClient(bool $extranet = false): OssClient

#### 上传至阿里云对象存储

- Oss::put(string $name): string
  - name `string` File 请求文件
  - return `string` 对象名称

```php
use think\support\facade\Oss;

public function uploads()
{
    try {
        $saveName = Oss::put('image');
        return [
            'error' => 0,
            'data' => [
                'savename' => $saveName,
            ]
        ];
    } catch (\Exception $e) {
        return [
            'error' => 1,
            'msg' => $e->getMessage()
        ];
    }
}
```

### 华为云相关扩展

华为云相关扩展是针对华为云库的统一简化，首先使用 `composer` 安装操作服务

```shell
composer require kain/think-huaweicloud-extra
```

安装后服务将自动注册，然后需要更新配置 `config/huaweicloud.php`，例如：

```php
return [

    'accessKeyId' => env('huaweicloud.id'),
    'accessKeySecret' => env('huaweicloud.secret'),
    'obs' => [
        'endpoint' => env('huaweicloud.obs_endpoint'),
        'bucket' => env('huaweicloud.obs_bucket')
    ]

];
```

- accessKeyId `string` 华为云 keyid
- accessKeySecret `string` 华为云 key secret
- obs
  - endpoint `string` 对象存储endpoint
  - bucket `string` 桶名

#### 获取对象存储客户端

- Obs::getClient(): ObsClient

#### 上传至华为云对象存储

- Obs::put(string $name): string
  - name `string` File 请求文件
  - return `string` 对象名称

```php
use think\support\facade\Obs;

public function uploads()
{
    try {
        $saveName = Obs::put('image');
        return [
            'error' => 0,
            'data' => [
                'savename' => $saveName,
            ]
        ];
    } catch (\Exception $e) {
        return [
            'error' => 1,
            'msg' => $e->getMessage()
        ];
    }
}
```

## Middleware 中间件

### CORS 跨站设置

使用CORS中间定义跨站的请求策略，你需要在主配置或对应的模块下创建配置 `config/cors.php`，例如：

```php
return [

    'allow_origin' => [
        'http://localhost:3000',
    ],
    'allow_credentials' => false,
    'allow_methods' => ['GET', 'OPTIONS', 'POST', 'PUT'],
    'expose_headers' => [],
    'allow_headers' => ['Content-Type', 'X-Requested-With', 'X-Token'],
    'max_age' => 0,

];
```

- allow_origin `array` 允许访问该资源的外域 URI，对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符 `['*']`
- allow_credentials `boolean` 允许浏览器读取response的内容
- expose_headers `array` 允许浏览器访问的头放入白名单
- allow_headers `string` 允许携带的首部字段
- allow_methods `array` 允许使用的 HTTP 方法
- max_age `int` preflight请求的结果能够被缓存多久


注册中间件 `config/middleware.php`

```php
return [
    'cors' => \think\bit\middleware\Cors::class
];
```

在控制器中引入

```php
abstract class BaseController
{

    protected $middleware = ['cors'];

}
```

### Auth 鉴权验证

AuthVerify 鉴权验证是一个抽象定义中间件，使用时需要根据场景继承定义，例如

```php
class SystemAuthVerify extends AuthVerify
{
    protected $scene = 'system';

    protected function hook(stdClass $symbol): bool
    {
        $data = AdminRedis::create()->get($symbol->user);
        if (empty($data)) {
            $this->hookResult = [
                'error' => 1,
                'msg' => 'freeze'
            ];
            return false;
        }
        return true;
    }
}
```

- scene `string` 场景标签
- hook(stdClass $symbol): bool 中间件钩子

然后在将中间件注册在应用的 `middleware.php` 配置下

```php
return [
    'auth' => \app\system\middleware\SystemAuthVerify::class
];
```

在控制器中重写 `$middleware`

```php
namespace app\system\controller;

class Index extends BaseController
{
    protected $middleware = ['auth'];

    public function index()
    {
        return [];
    }
}
```

### 全局返回 JSON

强制响应为 JSON，省略每个 Action 都要设置响应输出，首先加入 `middleware.php`

```php
return [
    'json' => \think\bit\middleware\JsonResponse::class,
];
```

在控制器中重写 `$middleware`

```php
namespace app\index\controller;

use app\index\BaseController;

class Index extends BaseController
{
    protected $middleware = ['json'];

    public function index()
    {
        return [];
    }
}
```

### 过滤 POST 请求

将 Restful API 请求全局统一为 `POST` 类型，首先加入 `middleware.php`

```php
return [
    'post' => \think\bit\middleware\FilterPostRequest::class,
];
```

在控制器中重写 `$middleware`

```php
namespace app\index\controller;

use app\index\BaseController;

class Index extends BaseController
{
    protected $middleware = ['post'];

    public function index()
    {
        return [];
    }
}
```

## Func 功能

### Auth 登录鉴权

Auth 创建登录后将 Token 字符串存储在Cookie 中，通过主控制去引用该特性

```php
use app\system\controller\BaseController;
use think\support\traits\Auth;

class Main extends BaseController
{
    use Auth;
}
```

#### 设置令牌自动刷新的总时效 

- refreshTokenExpires(): int
  - return `int` 默认 `604800`，单位< 秒 >

```php
use app\system\controller\BaseController;
use think\support\traits\Auth;

class Main extends BaseController
{
    use Auth;

    protected function refreshTokenExpires()
    {
        return 7200;
    }
}
```

#### 创建登录鉴权 

- create(string $scene, array $symbol = []): array
  - scene `string` 场景标签
  - symbol `array` 标识
  - return `array`

在登录验证成功后调用

```php
use app\system\controller\BaseController;
use think\support\traits\Auth;

class Main extends BaseController
{
    use Auth;

    public function login()
    {
        // $raws = ...
        // ...
        // 登录验证成功

        return $this->create('system', [
            'user' => $raws['username'],
            'role' => explode(',', $raws['role'])
        ]);
    }
}
```

#### 验证登录

- authVerify(string $scene): array
  - scene `string` 场景标签

```php
use app\system\controller\BaseController;
use think\support\traits\Auth;

class Main extends BaseController
{
    use Auth;

    public function verify()
    {
        return $this->authVerify('system');
    }
}
```

#### 验证返回钩子

- authHook(array $symbol): array
  - symbol `array` 标识

```php
use app\system\controller\BaseController;
use think\support\traits\Auth;

class Main extends BaseController
{
    use Auth;

    protected function authHook(array $symbol): array
    {
        $data = AdminRedis::create()->get($symbol['user']);
        if (empty($data)) {
            return [
                'error' => 1,
                'msg' => 'freeze'
            ];
        }
        return [
            'error' => 0,
            'msg' => 'ok'
        ];
    }
}
```

#### 销毁登录鉴权

- destory(string $scene): array
  - scene `string` 场景标签

```php
use app\system\controller\BaseController;
use think\support\traits\Auth;

class Main extends BaseController
{
    use Auth;

    public function logout()
    {
        return $this->destory('system');
    }
}
```

### RedisModel 缓存模型

使用 RedisModel 定义缓存模型，目的是将分散的缓存操作统一定义，例如：设定Acl访问控制表的缓存模型

```php
class Acl extends RedisModel
{
    protected $key = 'system:acl';
    private $rows = [];

    /**
     * 清除缓存
     * @return bool
     */
    public function clear()
    {
        return (bool)$this->redis->del([$this->key]);
    }

    /**
     * @param string $key 访问控制键
     * @param int $policy 控制策略
     * @return array
     * @throws \Exception
     */
    public function get(string $key, int $policy)
    {
        if (!$this->redis->exists($this->key)) {
            $this->update($key);
        } else {
            $this->rows = json_decode($this->redis->hget($this->key, $key), true);
        }

        switch ($policy) {
            case 0:
                return explode(',', $this->rows['read']);
            case 1:
                return array_merge(
                    explode(',', $this->rows['read']),
                    explode(',', $this->rows['write'])
                );
            default:
                return [];
        }
    }

    /**
     * 更新缓存
     * @param string $key 访问控制键
     * @throws \Exception
     */
    private function update(string $key)
    {
        $lists = Db::name('acl')
            ->where('status', '=', 1)
            ->field(['key', 'write', 'read'])
            ->select();

        if (empty($lists)) {
            return;
        }

        $this->redis->pipeline(function (Pipeline $pipeline) use ($key, $lists) {
            foreach ($lists as $index => $value) {
                $pipeline->hset($this->key, $value['key'], json_encode([
                    'write' => $value['write'],
                    'read' => $value['read']
                ]));
                if ($key == $value['key']) {
                    $this->rows = [
                        'write' => $value['write'],
                        'read' => $value['read']
                    ];
                }
            }
        });
    }
}
```

当对应的 `acl` 表数据发生变更时，执行 `clear()` 来清除缓存

```php
Acl::create()->clear();
```

通过缓存模型自定义的获取规则获取对应的数据，例如：查访问键 `admin` 对应的数据，如缓存不存在则生成缓存并返回数据

```php
Acl::create()->get('admin', 0);
```

如果同时要执行多个缓存模型，可以注入事务对象

```php
Redis::transaction(function (MultiExec $multiExec) {
    Someone1::create($multiExec)->factory();
    Someone2::create($multiExec)->factory();
    Someone3::create($multiExec)->factory();
});
```

#### SMS 短信验证

手机短信验证码缓存类

##### 设置手机验证码缓存

- factory(string $phone, string $code, int $timeout = 120): string
  - phone `string` 手机号
  - code `string` 验证码
  - timeout `int` 超时时间，默认60秒
  - return `bool`

```php
Sms::create()->factory('12345678910', '13125');
```

##### 验证手机验证码

- check(string $phone, string $code, bool $once = false): bool
- phone `string` 手机号
- code `string` 验证码
- once `bool` 验证成功后失效，默认`false`
- return `bool`

```php
$sms = Sms::create();
$checked = $sms->check('12345678910', '11224');
dump($checked);
// false
$checked = $sms->check('12345678910', '13125');
dump($checked);
// true
$checked = $sms->check('12345678910', '13125', true);
dump($checked);
// true
$checked = $sms->check('12345678910', '13125');
dump($checked);
// false
```

##### 获取验证时间 

- time(string $phone): array
  - phone `string` 手机号
  - return `array`

```php
$sms = Sms::create();
$sms->factory('12345678910', '13125', 3600);

$data = $sms->time('12345678910');
dump($data);
// array (size=2)
//   'publish_time' => int 1548644216
//   'timeout' => int 3600
```

- publish_time `int` 指发布时间
- timeout `int` 指有效时间

#### Refresh Token 缓存

Refresh Token 是用于自动刷新、验证对应 Token 的缓存模型

##### 生产 Refresh Token

- factory(string $jti, string $ack, int $expires): string
  - jti `string` JSON Web Token ID
  - ack `string` Token ID 验证码
  - expires `int` 存在时间，单位<秒>
  - return `string`

```php
$jti = Ext::uuid()->toString();
$ack = Str::random();

RefreshToken::create()->factory($jti, $ack, 86400*7);
```

##### 验证 Token 的 Token ID 有效性 

- verify(string $jti, string $ack): bool
  - jti `string` JSON Web Token ID
  - ack `string` Token ID 验证码
  - return `bool`

```php
RefreshToken::create()->verify($jti, $ack);
```

##### 清除 Token 对应的 Refresh Token

- clear(string $jti, string $ack): bool
  - jti `string` JSON Web Token ID
  - ack `string` Token ID 验证码
  - return `bool`

```php
RefreshToken::create()->clear($jti, $ack);
```

## 推荐库

- [topthink/think-helper](https://www.kancloud.cn/manual/thinkphp6_0/1149630) Think 助手工具库
- [guzzlehttp/guzzle](http://docs.guzzlephp.org/en/stable/) GuzzleHttp 请求库
- [nesbot/carbon](https://carbon.nesbot.com/docs/) Carbon 时间处理库
- [overtrue/wechat](https://www.easywechat.com/docs) EasyWechat 微信第三方库
- [overtrue/easy-sms](https://github.com/overtrue/easy-sms) EasySMS 短信库
- [overtrue/pinyin](https://github.com/overtrue/pinyin) Pinyin 拼音库
- [casbin/casbin](https://github.com/php-casbin/php-casbin/blob/master/README_CN.md) PHP-Casbin 授权库
- [swiftmailer/swiftmailer](https://swiftmailer.symfony.com/docs/introduction.html) swiftmailer 邮件库