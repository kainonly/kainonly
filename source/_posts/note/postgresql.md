---
title: PostgreSQL 优化
categories: 手记
tags: postgsql
---

POSTGRESQL 参数

| 选项                         | 默认值 | 说明                                                                                       | 是否优化 | 原因                                                                   |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------- |
| max_connections              | 100    | 允许客户端连接的最大数目                                                                   | 否       | 因为在测试的过程中，100 个连接已经足够                                 |
| fsync                        | on     | 强制把数据同步更新到磁盘                                                                   | 是       | 因为系统的 IO 压力很大，为了更好的测试其他配置的影响，把改参数改为 off |
| shared_buffers               | 24MB   | 决定有多少内存可以被 PostgreSQL 用于缓存数据（推荐内存的 1/4，不超过内存的 1/2)            | 是       | 在 IO 压力很大的情况下，提高该值可以减少 IO                            |
| work_mem                     | 1MB    | 使内部排序和一些复杂的查询都在这个 buffer 中完成，不够要适可而止，每个连接都要用这么大的   | 是       | 有助提高排序等操作的速度，并且减低 IO                                  |
| effective_cache_size         | 128MB  | 优化器假设一个查询可以用的最大内存，和 shared_buffers 无关（推荐内存的 1/2)                | 是       | 设置稍大，优化器更倾向使用索引扫描而不是顺序扫描                       |
| maintenance_work_mem         | 16MB   | 这里定义的内存只是被 VACUUM 等耗费资源较多的命令调用时使用                                 | 是       | 把该值调大，能加快命令的执行                                           |
| wal_buffer                   | 768kB  | 日志缓存区的大小                                                                           | 是       | 可以降低 IO，如果遇上比较多的并发短事务，应该和 commit_delay 一起用    |
| checkpoint_segments          | 3      | 设置 wal log 的最大数量数（一个 log 的大小为 16M）                                         | 是       | 默认的 48M 的缓存是一个严重的瓶颈，基本上都要设置为 10 以上            |
| checkpoint_completion_target | 0.5    | 表示 checkpoint 的完成时间要在两个 checkpoint 间隔时间的 N%内完成                          | 是       | 能降低平均写入的开销                                                   |
| commit_delay                 | 0      | 事务提交后，日志写到 wal log 上到 wal_buffer 写入到磁盘的时间间隔。需要配合 commit_sibling | 是       | 能够一次写入多个事务，减少 IO，提高性能                                |
| commit_siblings              | 5      | 设置触发 commit_delay 的并发事务数，根据并发事务多少来配置                                 | 是       | 减少 IO，提高性能                                                      |

<!-- more -->

POSTGRESQL 扩展

| EXTEND NAME | SQL                           |
| ----------- | ----------------------------- |
| UUID        | create extension "uuid-ossp"; |
