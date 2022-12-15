# git

## 配置

- 全局配置用户信息
  
  ```json
  git config --global user.name
  git config --global user.email
  ```

- 查看：`git config --list`

## 操作

- 新建分支并切换：`git checkout -b`
- 删除分支：`git branch -d`
- 绕过`eslint`检查：后面加`--no-verify`
- 未`git add`时删除本地文件：`git checkout .`；`git checkout -- 文件名`
- 未`git commit`时删除`add`后的文件：`git reset HEAD .`；`git reset HEAD 文件名`
- 未`push`时删除`commit`后的文件：`git reset --hard HEAD^`；`git reset --hard 任意版本号`
- 查看`commit`提交历史：`git log`

## 提交规范

- `feat`：新功能（`feature`）
- `fix`：修补`bug`
- `docs`：文档（`documentation`）
- `style`： 格式（不影响代码运行的变动）
- `refactor`：重构（即不是新增功能，也不是修改`bug`的代码变动）
- `test`：增加测试
- `chore`：构建过程或辅助工具的变动