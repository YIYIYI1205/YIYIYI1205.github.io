# MongoDB

  [官网](https://docs.mongodb.com/manual/)

- 文档数据库

## NoSQL

- `EDBMS`: 关系型数据库，都是表，使用SQL(结构性查询语言)(都是表)
- `NoSQL`: 非关系型数据库，轻量、开源、不提供`SQL`功能的关系数据库。

## MongoDB

- 使用`BSON`对象来存储复杂的数据类型。
- 三个概念
  - 数据库：存放集合
  - 集合：类似数组，存放文档
  - 文档：存储和操作的内容都是文档

| SQL术语概念                      | MongoDB术语概念                   |
| -------------------------------- | --------------------------------- |
| database（数据库）               | database（数据库                  |
| table（表）                      | collection（集合）                |
| row（行）                        | document or BSON document（文档） |
| column（列）                     | field（字段）                     |
| index（索引）                    | index（索引）                     |
| table joins（表连接）            | 嵌入的文档和链接                  |
| 指定任意唯一的列或列组合作为主键 | 主键被自动设置为_id字段           |
| group by（聚合）                 | 聚合操作                          |

| 数据类型           | 描述                                     |
| ------------------ | ---------------------------------------- |
| String             | 字符串                                   |
| Integer            | 整数                                     |
| Boolean            | 布尔值）                                 |
| Double             | 双精度浮点值                             |
| Min/Mas keys       | 将一个值与BSON元素的最低值与最高值相对比 |
| Array              | 数组                                     |
| Timestamp          | 时间戳                                   |
| Object             | 内嵌文档                                 |
| Null               | 空值                                     |
| Symbol             | 符号                                     |
| Date               | 日期                                     |
| Object ID          | 对象ID                                   |
| Binary Data        | 二进制                                   |
| Code               | 代码                                     |
| Regular expression | 正则表达式                               |

- 安装

```
    # 进入 /usr/local
    cd /usr/local

    # 下载
    https://www.mongodb.com/try/download/community，copy link
    sudo curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-5.0.5.tgz

    # 解压
    sudo tar -zxvf mongodb-macos-x86_64-5.0.5.tgz

    # 重命名为 mongodb 目录
    sudo mv mongodb-macos-x86_64-5.0.5/ mongodb

    cd /usr/local/mongodb
```

- 启动MongoDB
  - 前台启动：MongoDB启动进程后会占用当前的终端窗口

    ```
        # --dbpath 设置数据存放目录
        # --logpath 设置日志存放目录
        # --logappend 以追加的方式
        # --port 端口，默认27017
        # --bind_ip 绑定的ip，默认127.0.0.1

        # 先创建目录
        sudo mkdir -p /usr/local/mongodb/data/db/
        sudo mkdir -p /usr/local/mongodb/logs
        sudo touch /usr/local/mongodb/logs/mongodb.log

        sudo bin/mongod --dbpath /usr/local/mongodb/data/db/ --logpath /usr/local/mongodb/logs/mongodb.log --logappend --port 27017 --bind_ip 0.0.0.0


        测试：ps aux|grep mongo

        ctrl + c结束进程

        # 在开启进程的前提下，新建终端
        cd /usr/local/mongodb
        # 测试
        bin/mongo
        show dbs
        exit

        ps -ef | grep mongodb
    ```

  - 后台启动：

    ```
        cd /usr/local/mongodb

        sudo bin/mongod --dbpath /usr/local/mongodb/data/db/ --logpath /usr/local/mongodb/logs/mongodb.log --logappend --port 27017 --bind_ip 0.0.0.0 --fork

        # 结束加--shutdown（就是不管用）
        sudo bin/mongod --dbpath /usr/local/mongodb/data/db/ --logpath /usr/local/mongodb/logs/mongodb.log --logappend --port 27017 --bind_ip 0.0.0.0 --fork --shutdown
        
        # 或者
        kill -9 进程号
    ```

    - 配置文件(没成功)
      - `bin`目录下加一个`mongodb.conf`配置文件

      ```
        vim bin/mongodb.conf
        保存 :wq
        bin/mongod -f bin/mongodb.conf
        测试
        bin/mongo
        结束
        bin/mongod -f bin/mongodb.conf --shutdown
      ```

      ```
        # 数据文件存放目录
        dbpath = /usr/local/mongodb/data/db
        # 日志文件存放目录
        logpath = /usr/local/mongodb/logs/mongodb.log
        # 以追加的方式记录日志
        logappend = true
        # 端口默认为 27017
        port = 27017
        # 对访问IP地址不做限制，默认为本机地址
        bind_ip = 0.0.0.0
        # 以守护进程的方式启用，即在后台运行
        fork = true
      ```

  - 清除：cls
  - 连接：mongodb
  - 切换admin数据库：use admin
  - 执行以下都可关闭服务(必须先切换到admin)：db.showdownSever()或者db.runCommand('shutdown')
  - 检查：ps -ef | grep mongodb

- 配置环境变量

  ```
    vim /etc/profile
    加一行
    export MONGODB_NAME=/usr/local/mongodb
    下面一行：
    $MONGODB_NAME/bin/
    :wq退出
    source /etc/profile
  ```

## 用户与权限管理

### 常用权限

| 权限                 | 说明                                                                               |
| -------------------- | ---------------------------------------------------------------------------------- |
| read                 | 允许用户读取指定数据库                                                             |
| readWrite            | 允许用户读写指定数据库                                                             |
| dbAdmin              | 允许用户在指定数据库中执行管理函数，如索引创建、删除、查看统计或访问system.profile |
| useAdmin             | 允许用户向system.users集合写入，可以在指定数据库里创建、删除和管理用户             |
| clusterAdmin         | 允许admin数据库中定义，赋予用户所有分片和复制集相关函数的管理权限                  |
| readAnyDatabase      | 允许admin数据库中定义，赋予用户所有数据库的读权限                                  |
| readWriteAnyDatabase | 允许admin数据库中定义，赋予用户所有数据库的读写权限                                |
| dbAdminAnyDatabase   | 允许admin数据库中定义，赋予用户所有数据库的dbAdmin权限                             |
| userAdminAnyDatabase | 允许admin数据库中定义，赋予用户所有数据库的userAdmin权限                           |
| root                 | 允许admin数据库中定义，超级账号，超级权限                                          |

### 创建管理用户

- `user`:用户名
- `pwd`:密码
- `customData`:存放用户相关的自定义数据，该属性也可忽略
- `roles`:数组类型，配置用户的权限

```
# 查看数据库
show dbs
# 切换数据库
use admin
# 查看用户
show users
# 创建用户(字段不能改)
db.createUser(
      {
        user:"root",
        pwd:"1234567",
        roles:[{role: "userAdminAnyDatabase",db: "admin"}]
      }
  )
# 重新启动服务并开启验证
# 结束服务
db.shutdownServer()
```

删除用户：db.dropUser(<user_name>)
删除所有用户：db.dropAllUser() 可能删了
