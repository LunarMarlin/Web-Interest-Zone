花了很多个小时做pm2部署和打包，问题一直没有解决，最后卡在部署前端时pm2报错无法识别jsx——哪怕npm run build打包后生成的dist文件里不涉及main.jsx。本身对部署打包部分的知识就不了解，其他几种方式看起来也很复杂，ppt和课程录像除了告知部署方式外没有任何帮助，不想再说什么。

没有实现使用PM2的部署，打开方式按照开发中的运行方式：使用Windows终端进入到Web下的front-end和back-end文件夹执行npm run dev（同时执行二者）在运行中的front-end终端输入o回车打开网页

此Web应用使用了postgre SQL，导出的sql文件在Web/database-dump

必要的数据库配置——导入data.sql文件：
---
安装postgre后在Windows终端：
psql -U postgres -d postgres
（输入密码回车，密码不会显示）
CREATE USER testuser WITH PASSWORD '123456';
CREATE DATABASE interestzone WITH OWNER testuser;
GRANT ALL PRIVILEGES ON DATABASE interestzone TO testuser;
ctrl C 退出
psql -U testuser -d interestzone -f "C:\Users\Username\Desktop\Web\database-dump\data.sql"
---
注意以上的账号名称testuser、密码123456、数据库名interestzone###不可以###更改
最后一行-f后为sql文件路径，需要自行更改
---

数据库内有一些测试内容，如果需要可以自行清空所有table数据

---

功能简述：

在内容的输入框中粘贴可以插入剪贴板中的图片

同时多用户登录可以通过多个无痕浏览页面实现

点击用户名进入个人页面查看其发布的posts

初始显示一个页面的内容，鼠标滚轮向下加载更多内容
