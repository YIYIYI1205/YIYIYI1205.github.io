@symph/react：集成了reudx和react-router、MVC：model层，继承BaseReactModel，并且用类装饰器注册成ReactModel，用参数装饰器注入fetchService和其它依赖的model实例；vc是由controller共同完成，
@symph/server：后端框架，MVC：C是controller，写一些对外接口，注册成controller，通过容器组件注入service的实例；M是service服务，写一些方法，注册成component，通过容器组件注入service实例；而V是view，多由前端完成

npm run joy-dev 启动服务，进行全局扫描，生成路由json文件，通过componentName找到组件容器的名称