---
title: CMQ 消息队列 NODE SDK
toc: true
---

[![npm](https://img.shields.io/npm/v/cmq-sdk.svg?style=flat-square)](https://www.npmjs.com/package/cmq-sdk)
[![Travis (.org)](https://img.shields.io/travis/kainonly/cmq-node-sdk.svg?style=flat-square)](https://travis-ci.org/kainonly/cmq-node-sdk)
[![Coveralls github](https://img.shields.io/coveralls/github/kainonly/cmq-node-sdk.svg?style=flat-square)](https://coveralls.io/github/kainonly/cmq-node-sdk)
[![node](https://img.shields.io/node/v/cmq-sdk.svg?style=flat-square)](https://www.npmjs.com/package/cmq-sdk)
[![Downloads](https://img.shields.io/npm/dm/cmq-sdk.svg?style=flat-square)](https://www.npmjs.com/package/cmq-sdk)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/kainonly/cmq-nodejs-sdk/master/LICENSE)

## 安装

```shell
npm install cmq-sdk --save
```

## 创建客户端

```typescript
import { CMQ } from "cmq-sdk";

const cmq = CMQ.NEW({
  path: "/v2/index.php",
  signatureMethod: "HmacSHA256",
  extranet: true,
  secretId: "<secretId>",
  secretKey: "<secretKey>",
  region: "gz",
});

// If Javascript
//
// const { CMQ } = require('cmq-sdk');
//
// const client = CMQ.NEW({
//   path: '/v2/index.php',
//   signatureMethod: 'HmacSHA256',
//   extranet: true,
//   secretId: '<secretId>',
//   secretKey: '<secretKey>',
//   region: 'gz',
// });
```

- path `string` 云 API 的请求固定路径，当前固定为 `/v2/index.php`
- signatureMethod `string` 加密方式，目前支持 `HmacSHA256` 和 `HmacSHA1`
- extranet `boolean` 是否为公网，用来决定请求地址
- secretId `string` 云 API 密钥 SecretId
- secretKey `string` 云 API 密钥 SecretKey
- region `string` 地域参数，gz（广州），sh（上海），bj（北京），shjr（上海金融），szjr（深圳金融），hk（香港），cd（成都），ca(北美)，usw（美西），sg（新加坡）

创建好客户端即可操作使用，例如：创建一个 `test` 队列

```typescript
client
  .createQueue({
    queueName: "test",
  })
  .then((response) => {
    // response
  });

// Or use async/await
try {
  const response = await client.createQueue({
    queueName: "test",
  });
} catch (e) {
  // error
}
```

## API 文档

SDK 遵循官网接口开发，详细可查看腾讯云 CMQ https://cloud.tencent.com/document/api/406/5852

### 创建队列

- createQueue(options: CreateQueueOptions)
  - options `CreateQueueOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - maxMsgHeapNum `number` 最大堆积消息数
    - pollingWaitSeconds `number` 消息接收长轮询等待时间
    - visibilityTimeout `number` 消息可见性超时
    - maxMsgSize `number` 消息最大长度
    - msgRetentionSeconds `number` 消息保留周期
    - rewindSeconds `number` 队列是否开启回溯消息能力
  - return `Promise<CreateQueueResponse>`

```typescript
const res = await cmq.createQueue({
  queueName: "test",
});
```

### 获取队列列表

- listQueue(options: ListQueueOptions)
  - options `ListQueueOptions`
    - searchWord `string` 用于过滤队列列表，后台用模糊匹配的方式来返回符合条件的队列列表
    - offset `number` 分页时本页获取队列列表的起始位置
    - limit `number` 分页时本页获取队列的个数
  - return `Promise<ListQueueResponse>`

```typescript
const res = await cmq.listQueue({});
```

### 获取队列属性

- getQueueAttributes(options: GetQueueAttributesOptions)
  - options `GetQueueAttributesOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
  - return `Promise<GetQueueAttributesResponse>`

```typescript
const res = await cmq.getQueueAttributes({
  queueName: "test",
});
```

### 修改队列属性

- setQueueAttributes(options: SetQueueAttributesOptions)
  - options `SetQueueAttributesOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - maxMsgHeapNum `number` 最大堆积消息数
    - pollingWaitSeconds `number` 消息接收长轮询等待时间
    - visibilityTimeout `number` 消息可见性超时
    - maxMsgSize `number` 消息最大长度
    - msgRetentionSeconds `number` 消息保留周期
    - rewindSeconds `number` 队列是否开启回溯消息能力
  - return `Promise<SetQueueAttributesResponse>`

```typescript
const res = await cmq.setQueueAttributes({
  queueName: "test",
  maxMsgHeapNum: 5000000,
});
```

### 删除队列

- deleteQueue(options: DeleteQueueOptions)
  - options `DeleteQueueOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
  - return `Promise<DeleteQueueResponse>`

```typescript
const res = await cmq.deleteQueue({
  queueName: "test",
});
```

### 回溯队列

- rewindQueue(options: RewindQueueOptions)
  - options `RewindQueueOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - startConsumeTime `number(unixtime)` 设定该时间，则（Batch）receiveMessage 接口，会按照生产消息的先后顺序消费该时间戳以后的消息
  - return `Promise<RewindQueueResponse>`

```typescript
// 需要在消息删除后执行
const time = parseInt((new Date().getTime() / 1000).toString());
const res = await cmq.rewindQueue({
  queueName: "test",
  startConsumeTime: time - 1800,
});
```

### 发送消息

- sendMessage(options: SendMessageOptions)
  - options `SendMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - msgBody `string|object` 消息正文，数组时会自动转为 json 字符串
    - delaySeconds `number` 需要延时多久用户才可见该消息
  - return `Promise<SendMessageResponse>`

```typescript
const res = await cmq.sendMessage({
  queueName: "send",
  msgBody: {
    name: "kain",
  },
});
```

### 批量发送消息

- batchSendMessage(options: BatchSendMessageOptions)
  - options `BatchSendMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - msgBody `array` 消息正文
    - delaySeconds `number` 需要延时多久用户才可见该消息
  - return `Promise<BatchSendMessageResponse>`

```typescript
const res = await cmq.batchSendMessage({
  queueName: "send",
  msgBody: [
    { type: "a1", name: "cc" },
    { type: "a2", name: "xy" },
  ],
});
```

### 消费消息

- receiveMessage(options: ReceiveMessageOptions)
  - options `ReceiveMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - pollingWaitSeconds `number` 本次请求的长轮询等待时间
  - return `Promise<ReceiveMessageResponse>`

```typescript
const res = await cmq.receiveMessage({
  queueName: "send",
});
```

### 批量消费消息

- batchReceiveMessage(options: BatchReceiveMessageOptions)
  - options `BatchReceiveMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - numOfMsg `number` 本次消费的消息数量，取值范围 1 - 16
    - pollingWaitSeconds `number` 本次请求的长轮询等待时间
  - return `Promise<BatchReceiveMessageResponse>`

```typescript
const res = await cmq.batchReceiveMessage({
  queueName: "send",
  numOfMsg: 16,
});
```

### 删除消息

- deleteMessage(options: DeleteMessageOptions)
  - options `DeleteMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - receiptHandle `string` 上次消费返回唯一的消息句柄，用于删除消息
  - return `Promise<DeleteMessageResponse>`

```typescript
const res1 = await cmq.receiveMessage({
  queueName: "send",
});
if (res1.code !== 0) return;
const res2 = await cmq.deleteMessage({
  queueName: "send",
  receiptHandle: res1.receiptHandle,
});
```

### 批量删除消息

- batchDeleteMessage(options: BatchDeleteMessageOptions)
  - options `BatchDeleteMessageOptions`
    - queueName `string` 队列名字，在单个地域同一帐号下唯一
    - receiptHandle `array` 上次消费返回唯一的消息句柄，用于删除消息
  - return `Promise<BatchDeleteMessageResponse>`

```typescript
const res1 = await cmq.batchReceiveMessage({
  queueName: "send",
  numOfMsg: 16,
});
if (res1.code !== 0) return;
const receiptHandles = res1.msgInfoList.map((v) => v.receiptHandle);
const res2 = await cmq.batchDeleteMessage({
  queueName: "send",
  receiptHandle: receiptHandles,
});
```

### 创建主题

- createTopic(options: CreateTopicOptions)
  - options `CreateTopicOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - maxMsgSize `number` 消息最大长度
    - filterType `number` 用于指定主题的消息匹配策略，filterType =1 或为空， 表示该主题下所有订阅使用 filterTag 标签过滤，filterType =2 表示用户使用 bindingKey 过滤
  - return `Promise<CreateTopicResponse>`

```typescript
const res = await cmq.createTopic({
  topicName: "test-topic",
});
```

### 修改主题属性

- setTopicAttributes(options: SetTopicAttributesOptions):
  - options `SetTopicAttributesOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - maxMsgSize `number` 消息最大长度
  - return `Promise<SetTopicAttributesResponse>`

```typescript
const res = await cmq.setTopicAttributes({
  topicName: "test-topic",
  maxMsgSize: 131072,
});
```

### 获取主题列表

- listTopic(options: ListTopicOptions)
  - options `ListTopicOptions`
    - searchWord `string` 用于过滤主题列表，后台用模糊匹配的方式来返回符合条件的主题列表
    - offset `number` 分页时本页获取主题列表的起始位置
    - limit `number` 分页时本页获取主题的个数
  - return `Promise<ListTopicResponse>`

```typescript
const res = await cmq.listTopic({});
```

### 获取主题属性

- getTopicAttributes(options: GetTopicAttributesOptions)
  - options `GetTopicAttributesOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
  - return `Promise<GetTopicAttributesResponse>`

```typescript
const res = await cmq.getTopicAttributes({
  topicName: "test-topic",
});
```

### 删除主题

- deleteTopic(options: DeleteTopicOptions)
  - options `DeleteTopicOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
  - return `Promise<DeleteTopicResponse>`

```typescript
const res = await cmq.deleteTopic({
  topicName: "test-topic",
});
```

### 发布消息

- publishMessage(options: PublishMessageOptions)
  - options `PublishMessageOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - msgBody `string|object` 消息正文，数组时会自动转为 json 字符串
    - msgTag `array` 消息过滤标签
    - routingKey `string` 表示发送消息的路由路径
  - return `Promise<PublishMessageResponse>`

```typescript
const res = await cmq.publishMessage({
  topicName: "beta-topic",
  msgBody: {
    name: "kain",
  },
});
```

### 批量发布消息

- batchPublishMessage(options: BatchPublishMessageOptions)
  - options `BatchPublishMessageOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - msgBody `array` 消息正文
    - msgTag `array` 消息过滤标签
    - routingKey `string` 表示发送消息的路由路径
  - return `Promise<BatchPublishMessageResponse>`

```typescript
const res = await cmq.batchPublishMessage({
  topicName: "beta-topic",
  msgBody: [
    { type: "a1", name: "11" },
    { type: "a2", name: "22" },
  ],
});
```

### 创建订阅

- subscribe(options: SubscribeOptions)
  - options `SubscribeOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
    - protocol `string` 订阅的协议，目前支持两种协议：HTTP、Queue
    - endpoint `string` 接收投递消息的 endpoint
    - notifyStrategy `string` 向 endpoint 推送消息出现错误时，CMQ 推送服务器的重试策略。BACKOFF_RETRY，退避重试；EXPONENTIAL_DECAY_RETRY，指数衰退重试
    - notifyContentFormat `string` 推送内容的格式。取值：（1）JSON。（2）SIMPLIFIED，即 raw 格式
    - filterTag `array` 消息标签（用于消息过滤)
    - bindingKey `array` 订阅接收消息的过滤策略
  - return `Promise<SubscribeResponse>`

```typescript
const res = await cmq.subscribe({
  topicName: "sub-topic",
  subscriptionName: "test",
  protocol: "queue",
  endpoint: "normal",
  filterTag: ["mytag"],
});
```

### 获取订阅列表

- listSubscriptionByTopic(options: ListSubscriptionByTopicOptions)
  - options `ListSubscriptionByTopicOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - searchWord `string` 用于过滤订阅列表，后台用模糊匹配的方式来返回符合条件的订阅列表
    - offset `number` 分页时本页获取订阅列表的起始位置
    - limit `number` 分页时本页获取订阅的个数
  - return `Promise<ListSubscriptionByTopicResponse>`

```typescript
const res = await cmq.listSubscriptionByTopic({
  topicName: "sub-topic",
});
```

### 修改订阅属性

- setSubscriptionAttributes(options: SetSubscriptionAttributesOptions)
  - options `SetSubscriptionAttributesOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
    - notifyStrategy `string` 向 endpoint 推送消息出现错误时，CMQ 推送服务器的重试策略。BACKOFF_RETRY，退避重试；EXPONENTIAL_DECAY_RETRY，指数衰退重试
    - notifyContentFormat `string` 推送内容的格式。取值：（1）JSON。（2）SIMPLIFIED，即 raw 格式
    - filterTag `array` 消息标签（用于消息过滤)
    - bindingKey `array` 订阅接收消息的过滤策略
  - return `Promise<SetSubscriptionAttributesResponse>`

```typescript
const res = await cmq.setSubscriptionAttributes({
  topicName: "sub-topic",
  subscriptionName: "test",
  notifyStrategy: "BACKOFF_RETRY",
});
```

### 删除订阅

- unsubscribe(options: UnsubscribeOptions)
  - options `UnsubscribeOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
  - return `Promise<UnsubscribeResponse>`

```typescript
const res = await cmq.unsubscribe({
  topicName: "sub-topic",
  subscriptionName: "test",
});
```

### 获取订阅属性

- getSubscriptionAttributes(options: GetSubscriptionAttributesOptions)
  - options `GetSubscriptionAttributesOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
  - return `Promise<GetSubscriptionAttributesResponse>`

```typescript
const res = await cmq.getSubscriptionAttributes({
  topicName: "sub-topic",
  subscriptionName: "test",
});
```

### 清空订阅标签

- clearSubscriptionFilterTags(options: ClearSubscriptionFilterTagsOptions)
  - options `ClearSubscriptionFilterTagsOptions`
    - topicName `string` 主题名字，在单个地域同一帐号下唯一
    - subscriptionName `string` 订阅名字，在单个地域同一帐号的同一主题下唯一
  - return `Promise<ClearSubscriptionFilterTagsResponse>`

```typescript
const res = await cmq.clearSubscriptionFilterTags({
  topicName: "sub-topic",
  subscriptionName: "test",
});
```
