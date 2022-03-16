# typeorm

[文档](https://typeorm.io/#/decorator-reference/column)
https://typeorm.biunav.com/zh/decorator-reference.html#%E5%88%97%E8%A3%85%E9%A5%B0%E5%99%A8

## 使用

- 连接`createConnection`
  ```javascript
    import { createConnection, LessThan, MoreThan } from "typeorm";
    import { User } from "../../client/utils/entity/UserDB";
    import { EmailCodeDB } from "../../client/utils/entity/EmailCodeDB";
    import { CaptchaDB } from "../../client/utils/entity/CaptchaDB";
    createConnection({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      username: "root",
      password: "root",
      database: "test",
      entities: [User, EmailCodeDB, CaptchaDB],
    }).then(async (connection) => {
      const resEmailCode = await connection.manager.find(EmailCodeDB);
      const res2 = await connection.manager.find(CaptchaDB, { expiration: LessThan(date) });
      const res3 = await connection.manager.find(CaptchaDB, { expiration: MoreThan(date) });
      connection.manager.delete(EmailCodeDB, res1EmailCode);
    });
  ```
- 关闭连接
  ```javascript
    const options: ConnectionOptions = {
      driver: {
          type: "postgres",
          host: "localhost",
          username: "test",
          password: "test",
          database: "test"
      },
      logging: {
          // logQueries: true
      },
      autoSchemaSync: true,
      entities: [Post, PostDetails, PostCategory, PostMetadata, PostImage, PostInformation, PostAuthor]
    };
    createConnection(options).then(async connection => {
      await connection.close();
    }, error => console.log("Cannot connect: ", error));
  ```
- 查看连接是否存在
  ```javascript
    const connectionManager = getConnectionManager();
    connectionManager.has("default")
  ```
- 使用`getConnection`
  ```javascript
    import { getConnection } from "typeorm";
    import { User } from "../../client/utils/entity/UserDB";
    import { CaptchaDB } from "../../client/utils/entity/CaptchaDB";
    this.connection = getConnection()
    const captchaDb = new CaptchaDB();
    await this.connection.manager.save(captchaDb);
  ``` 
- 增`connection.manager.save(entity)`
- 删`connection.manager.delete(Entity, options)`
- 改`connection.manager.update(Entity, options)`
- 查`connection.manager.find/findOne(Entity, options)`
  - 大于小于：`connection.manager.find(CaptchaDB, { expiration: LessThan(date) })`（不管用）
  - 或：文档里这面写：`this.connection.manager.findOne(User, { where: [{ username }, { email: username }] })`，报错，实际：`this.connection.manager.findOne(User, { where: $or:[{ username }, { email: username }] })`


- unique无效：在option中加synchronize: true
  ```javascript
    @Column()
    @Index({ unique: true })
  ```
- 事务
  ```javascript
    this.connection
      .transaction(async (transactionalEntityManager) => {
        const res = await transactionalEntityManager.save(user);
        await this.passwordService.addPassword(password, res._id, transactionalEntityManager);
        await this.accountService.addAccount(email, username, res._id, transactionalEntityManager);
      })
      .then(() => {
      })
      .catch((e) => {
      });
  ```
- 创建时间
      @CreateDateColumn()
    createdDate: Date;