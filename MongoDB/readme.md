# MongoDB 文档数据库

  [官网](https://docs.mongodb.com/manual/)

## NoSQL

- `EDBMS`: 关系型数据库，都是表，使用SQL(结构性查询语言)(都是表)
- `NoSQL`: 非关系型数据库，轻量、开源、不提供`SQL`功能的关系数据库。

## MongoDB

  ### [安装](https://www.mongodb.com/try/download/community)
  
  <details>
    <summary>安装</summary>
    <pre><blockcode>
      # 进入 /usr/local
      cd /usr/local
    </blockcode></pre>
    <pre><blockcode>
      # 下载
      sudo curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-5.0.5.tgz
    </blockcode></pre>
    <pre><blockcode>
      # 解压
      sudo tar -zxvf mongodb-macos-x86_64-5.0.5.tgz
    </blockcode></pre>
    <pre><blockcode>
      # 重命名为 mongodb 目录
      sudo mv mongodb-macos-x86_64-5.0.5/ mongodb
    </blockcode></pre>
    <pre><blockcode>
      cd /usr/local/mongodb
    </blockcode></pre>
    <pre><blockcode>
      ls 查看目录
      /bin/install_compass 安装compass工具
      /bin/mongo mongo客户端脚本
      /bin/mongod 启动mongo服务脚本
      /bin/mongos 分片式路由脚本
    </blockcode></pre>
  </details>

  ### 启动
  
  <details>
    <summary>前台启动：MongoDB启动进程后会占用当前的终端窗口</summary>
    <pre><blockcode>
      # --dbpath 设置数据存放目录
      # --logpath 设置日志存放目录
      # --logappend 以追加的方式
      # --port 端口，默认27017
      # --bind_ip 绑定的ip，默认127.0.0.1
    </blockcode></pre>
    <pre><blockcode>
      # 必须保证logpath和dbpath的目录存在，先创建目录
      sudo mkdir -p /usr/local/mongodb/data/db/
      sudo mkdir -p /usr/local/mongodb/logs
      sudo touch /usr/local/mongodb/logs/mongodb.log
    </blockcode></pre>
    <pre><blockcode>
      # 启动mongo服务
      sudo bin/mongod --dbpath /usr/local/mongodb/data/db/ --logpath /usr/local/mongodb/logs/mongodb.log --logappend --port 27017 --bind_ip 0.0.0.0
    </blockcode></pre>
    <pre><blockcode>
      # 测试：ps aux|grep mongo
      # 连接
      # 在开启进程的前提下，新建终端
      cd /usr/local/mongodb
      # 测试
      bin/mongo
      show dbs
      exit
      ps -ef | grep mongodb
    </blockcode></pre>
  </details>

  <details>
    <summary>后台启动--fork</summary>
    <pre><blockcode>
      # 进入
      cd /usr/local/mongodb
    </blockcode></pre>
    <pre><blockcode>
      sudo bin/mongod --dbpath /usr/local/mongodb/data/db/ --logpath /usr/local/mongodb/logs/mongodb.log --logappend --port 27017 --bind_ip 0.0.0.0 --fork
    </blockcode></pre>
    <pre><blockcode>
      # 结束加--shutdown（就是不管用）
      sudo bin/mongod --dbpath /usr/local/mongodb/data/db/ --logpath /usr/local/mongodb/logs/mongodb.log --logappend --port 27017 --bind_ip 0.0.0.0 --fork --shutdown
    </blockcode></pre>
    <pre><blockcode>  
      # 或者
      kill -9 进程号
    </blockcode></pre>
    <pre><blockcode>
      # 配置文件(没成功)
      # bin目录下加一个mongodb.conf配置文件
      vim bin/mongodb.conf
      保存 :wq
      bin/mongod -f bin/mongodb.conf
      测试
      bin/mongo
      结束
      bin/mongod -f bin/mongodb.conf --shutdown
    </blockcode></pre>
    <pre><blockcode>
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
    </blockcode></pre>
  </details>

  <details>
    <summary>配置环境变量：export PATH=/usr/local/mongodb/bin:$PATH</summary>
    <pre><blockcode>
      $vim /etc/profile
      # 加一行
      $ export MONGODB_NAME=/usr/local/mongodb
      # 下面一行：
      $ MONGODB_NAME/bin/
      $ :wq退出
      source /etc/profile
    </blockcode></pre>
  </details>

  <details>
    <summary>其它操作</summary>
    清除：cls
    连接：sudo bin/mongod --dbpath /usr/local/mongodb/data/db/ --logpath /usr/local/mongodb/logs/mongodb.log --logappend --port 27017 --bind_ip 0.0.0.0
    执行以下都可关闭服务(必须先切换到admin)：db.showdownSever()或者db.runCommand('shutdown')
    检查：ps -ef | grep mongodb
  </details>
  

  ### 核心概念

  - 三个概念
    - 数据库`DataBse`：存放集合；通过不同的数据库隔离不同应用数据。
    - 集合`Collection`：类似数组（类似关系型数据库`RDBMS`中的表），存放文档
    - 文档`Document`：存储和操作的内容都是文档，使用`BSON`对象来存储复杂的数据类型。
  

    <details>
      <summary>对比</summary>

      | SQL术语概念                      | MongoDB术语概念                   |
      | -------------------------------- | --------------------------------- |
      | database（数据库）               | database（数据库                  |
      | table（表）                      | collection（集合）                |
      | row（行）                        | document or BSON document（文档） |
      | column（列）                     | field（字段）                     |
      | index（索引）                    | index（索引）                     |
      | table joins（表连接）            | 嵌入的文档和连接                  |
      | 指定任意唯一的列或列组合作为主键 | 主键被自动设置为_id字段           |
      | group by（聚合）                 | 聚合操作                          |
    </details>
    <details>
      <summary>数据类型</summary>

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
    </details>

### 基本操作
  [官网](https://docs.mongodb.com/manual/crud/)

  #### 库
    
  - 查看所有库：`show dbs`
  - 创建库/切换库：`use 库名`，没有集合的库默认不显示
  - 查看当前所在库：`db`
  - 删除库：`db.dropDatabase()`，默认删除当前选中的库，删了之后还是会在当前库
  - 保留库：
    - `admin`：`root`数据库，将用户添加到这个数据库中，用户自动继承所有数据库的权限；列出所有数据库或者关闭服务器必须在这个库中进行。
    - `local`：数据永远不会复制，可以用来存储限于本地单独服务器的任意集合。
    - `config`：当`Mongo`用于分片设置时，`config`数据库在内部使用，用于保存分片的相关信息。
  - 默认使用`test`库

  #### 集合
  
  - 查看所有集合：`show collections`或者`show tables`
  - 创建集合：`db.createCollection('集合名称', [options])`或者插入数据时，会自动创建集合
    <details>
      <summary>options可以是如下参数（用处不大）</summary>

      | 字段   | 类型 | 描述                                                                                                                                                |
      | ------ | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
      | capped | 布尔 | （可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。当该值为 true 时，必须指定 size 参数。 |
      | size   | 数值 | （可选）为固定集合指定一个最大值，即字节数。如果 capped 为 true，也需要指定该字段。                                                                 |
      | max    | 数值 | （可选）指定固定集合中包含文档的最大数量。                                                                                                          |
    </details>
  - 删除集合：`db.集合名称.drop()`

  #### 文档

  - 插入文档
    - 单条文档（当前集合名称可以不存在）：`db.集合名称.insert({"name": "xxx", "age": 10, "bir": "2022-2-16"})`
    - 多条文档：`db.集合名称.insertMany([])`或者`db.集合名称.insert([])`
      ```json
        db.collection.insertMany(
          [ <document 1> , <document 2>, ... ],
          {
              writeConcern: <document>,
              ordered: <boolean>
          }
        )
      ```
      - `document`：要写入的文档。
      - `writeConcern`：写入策略，默认为 1，即要求确认写操作，0 是不要求。
      - `ordered`：指定是否按顺序写入，默认`true`，按顺序写入。
    - 脚本方式：可以直接在数据库里写
      ```json
        for(let i = 0; i < 10; i++) {
          db.collection.insert({"name": "xxx", "age": 10, "bir": "2022-2-16"})
        }
      ```

  `注意：在mongodb中每个文档都会有一个_id作为唯一标识，_id默认会自动生成，如果手动指定将使用手动指定的值作为_id的值`

  - 查询文档：`db.集合名称.find()`
  - 删除文档：
  ```json
    db.集合名称.remove(
      <query>, 
      { 
        justOne: <boolean>, 
        writeConcern: <document> 
      }
    )

    // 删除所有要传空对象
    db.集合名称.remove({})

    // 条件删除
    db.集合名称.remove({_id: 1})

    // 自动生成的主键会是_id: ObjectId('4e7020cb7cac81af7136236b')的形式
    db.集合名称.remove({_id: ObjectId('4e7020cb7cac81af7136236b')})
  ```
    - `query`:（可选）删除的文档的条件。
    - `justOne`: （可选）如果设为`true`或`1`，则只删除一个文档，如果不设置该参数，或使用默认值`false`，则删除所有匹配条件的文档。
    - `writeConcern`:（可选）抛出异常的级别。
  - 更新文档：默认更新会先将文档删除，再将文档插入(但是`_id`是会保存的)，若要保留原始文档，需要在`update`写`$set`
    ```json
      db.集合名称.update(
        <query>,
        <update>,
        { 
          upsert: <boolean>, 
          multi: <boolean>, 
          writeConcern: <document> 
        }
      )

      // 保留原始文档
      db.集合名称.update({_id: 11}, {$set: {_id: 12}})
    ```
    - `query`: `update`的查询条件，类似`sql update`查询内`where`后面的。
    - `update`: `update`的对象和一些更新的操作符（如`$,$inc...`）等，也可以理解为`sql update`查询内`set`后面的
    - `upsert`: 可选，如果不存在`update`的记录，是否插入`objNew`，`true`为插入，默认是`false`，不插入。
    - `multi`: 可选，`mongodb`默认是`false`，只更新找到的第一条记录，如果这个参数为`true`，就把按条件查出来多条记录全部更新。
    - `writeConcern`:可选，抛出异常的级别。
  - 文档查询：以非机构化的方式来显示所有文档，`db.集合名称.find(query, projection)`；若要以格式化的方式显示所有文档，`db.集合名称.find().pretty()`
    - `query`：可选，使用查询操作符指定查询条件
    - `projection`：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值，只需省略该参数即可（默认省略）。
  
    查询分类：
    <details>
      <summary>和sql对比</summary>

      | 操作        | 格式                                                                            | 范例                                                                                           | RDBMS中的类似语句                                              |
      | ----------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
      | 等于        | {\<key\>:\<value\>}                                                             | db.col.find({"by":"菜鸟教程"}).pretty()                                                        | WHERE by = '菜鸟教程'                                          |
      | 小于        | {\<key\>:{`$lt`:\<value\>}}                                                     | db.col.find({"likes":{$lt:50}}).pretty()                                                       | WHERE likes < 50                                               |
      | 小于或等于  | {\<key\>:{`$lte`:\<value\>}}                                                    | db.col.find({"likes":{$lte:50}}).pretty()                                                      | WHERE likes <= 50                                              |
      | 大于        | {\<key\>:{`$gt`:\<value\>}}                                                     | db.col.find({"likes":{$gt:50}}).pretty()                                                       | WHERE likes > 50                                               |
      | 大于或等于  | {\<key\>:{`$gte`:\<value\>}}                                                    | db.col.find({"likes":{$gte:50}}).pretty()                                                      | WHERE likes >= 50                                              |
      | 不等于      | {\<key\>:{`$ne`:\<value\>}}                                                     | db.col.find({"likes":{$ne:50}}).pretty()                                                       | WHERE likes != 50                                              |
      | AND         | {\<key1\>:\<value1\>, \<key2\>:\<value2\>, ...}                                 | db.col.find({"by":"菜鸟教程", "title":"MongoDB 教程"}).pretty()                                | WHERE by='菜鸟教程' AND title='MongoDB 教程'                   |
      | OR          | {`$or`: [{\<key1\>:\<value1\>}, {\<key2\>:\<value2\>}]}                         | db.col.find({$or:[{"by":"菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()                      | WHERE by='菜鸟教程' OR title='MongoDB 教程                     |
      | AND和OR联用 | {\<key\>:\<value\>, `$or`: [{\<key1\>:\<value1\>}, {\<key2\>:\<value2\>}, ...]} | db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty() | WHERE likes>50 AND (by = '菜鸟教程' OR title = 'MongoDB 教程') |
    </details>
    - 如果一个字段的查询条件出现多次，默认查询后面的条件
    - 对于同一个字段的或查询，使用`$in`：`db.集合名称.find({age: {$in: [10, 20]}})`
    - 对于同一个字段的且查询，使用`$all`：`db.集合名称.find({age: {$all: [10, 20]}})`
    - 支持数组类型中的某个元素查询：`db.集合名称.find({likes: '看电视'})`会查找出`likes`中包含看电视的所有元素
    - 按照数组的长度查询`$size`：`db.集合名称.find({likes: {$size: 3}})`
    - 模糊查询：使用正则表达式，`db.集合名称.find({name: /良/, likes: /女/})`
    - 排序：`db.集合名称.find().sort({name: 1, age: 1})`，`1`升序，`-1`降序
    - 分页：`db.集合名称.find().sort({条件}).skip(start).limit(rows)`，`skip()`方法来跳过指定数量的数据，`limit()`方法指定读取的记录条数
    - 总条数：`db.集合名称.count()`；某个条件的总条数：`db.集合名称.find({name: 'xxx'}).count()`
    - 去重：`db.集合名称.distinct('字段')`，返回的是剩下的这个字段的数组
    - 指定返回字段：`db.集合名称.find({条件}, {name: 1， age: 1})`，`1`表示返回，`0`表示不返回，`1`和`0`不能同时使用
    - 按照数据类型查询`$type`：`db.col.find({"title" : {$type : 2}})`或`db.col.find({"title" : {$type : 'string'}})`
      <details>
        <summary>类型表</summary>

        | 类型                             | 数字                  |
        | -------------------------------- | --------------------- |
        | Double(默认整数和小数都是Double) | 1                     |
        | String                           | 2                     |
        | Object                           | 3                     |
        | Array                            | 4                     |
        | Binary data                      | 5                     |
        | Undefined                        | 6(已废弃。)           |
        | Object id                        | 7                     |
        | Boolean                          | 8                     |
        | Date                             | 9                     |
        | Null                             | 10                    |
        | Regular Expression               | 11                    |
        | JavaScript                       | 13                    |
        | Symbol                           | 14                    |
        | JavaScript (with scope)          | 15                    |
        | 32-bit integer                   | 16                    |
        | Timestamp                        | 17                    |
        | 64-bit integer                   | 18                    |
        | Min key                          | 255 （Query with -1） |
        | Max key                          | 127                   |
      </details>
    - 索引(提高效率)：在集合层面上定义了索引，并支持对集合中的任何字段或文档的子字段进行索引；`_id`会被自动创建索引
      - 操作
        - 创建索引：`db.集合名称.createIndex(keys, options)`


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
