---
title: EMQ X 容器持久化
categories: 手记
tags:
  - docker
  - emqx
---

EMQX 容器持久化需要将以下目录挂载处理：

- /opt/emqx/data
- /opt/emqx/etc
- /opt/emqx/lib
- /opt/emqx/log

<!-- more -->

假设为 EMQX 配置 compose 编排：

```yaml
version: "3.7"
services:
  emqx:
    image: emqx/emqx
    restart: always
    environment:
      EMQX_NAME: emqx
      EMQX_HOST: 127.0.0.1
      EMQX_ALLOW_ANONYMOUS: "false"
      EMQX_LISTENER__TCP__EXTERNAL: 1883
      EMQX_LISTENER__WS__EXTERNAL: 8083
      EMQX_DASHBOARD__DEFAULT_USER__LOGIN: root
      EMQX_DASHBOARD__DEFAULT_USER__PASSWORD: 123456
    ports:
      - 1883:1883
      - 8083:8083
      - 8081:8081
    volumes:
      - ./emqx/lib:/opt/emqx/lib
      - ./emqx/etc:/opt/emqx/etc
      - ./emqx/data:/opt/emqx/data
      - ./emqx/log:/opt/emqx/log
```

此时，编排的容器不能成功运行，并提示：

```shell
emqx_1             | cat: can't open '/opt/emqx/etc/emqx.conf': No such file or directory
emqx_1             | ls: /opt/emqx/etc/plugins: No such file or directory
```

因此我们要让容器正常的运行起来，首先要屏蔽挂载配置，重新编排

```yaml
version: "3.7"
services:
  emqx:
    image: emqx/emqx
    restart: always
    environment:
      EMQX_NAME: emqx
      EMQX_HOST: 127.0.0.1
      EMQX_ALLOW_ANONYMOUS: "false"
      EMQX_LISTENER__TCP__EXTERNAL: 1883
      EMQX_LISTENER__WS__EXTERNAL: 8083
      EMQX_DASHBOARD__DEFAULT_USER__LOGIN: root
      EMQX_DASHBOARD__DEFAULT_USER__PASSWORD: 123456
    ports:
      - 1883:1883
      - 8083:8083
      - 8081:8081
    # volumes:
    #   - ./emqx/lib:/opt/emqx/lib
    #   - ./emqx/etc:/opt/emqx/etc
    #   - ./emqx/data:/opt/emqx/data
    #   - ./emqx/log:/opt/emqx/log
```

将文件从容器中复制出来，$CONTAINER 换成该容器的 ID：

```shell
docker cp $CONTAINER:/opt/emqx/data ./emqx/
docker cp $CONTAINER:/opt/emqx/etc ./emqx/
docker cp $CONTAINER:/opt/emqx/lib ./emqx/
docker cp $CONTAINER:/opt/emqx/log ./emqx/
```

为其设置权限，需要对应的用户 ID 为 `1000`

```shell
chown -R kain:kain ./emqx
chmod -R 755 ./emqx
```

解除屏蔽的挂载配置，重新编排

```shell
emqx_1             | EMQ X Broker 4.1.4 is running now!
```

经测试，为 EMQX 增加配置后，删除容器再重新创建持久化生效，容器运行正常
