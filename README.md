会在之后一两天更新ReadMe内容，请稍等

暂时没有实现使用PM2的部署，打开方式请使用Windows终端进入到Web下的front-end和back-end文件夹执行npm run dev（同时执行二者）在运行中的front-end终端输入o并回车打开网页

此Web应用使用了postgre SQL，导出的sql文件在Web/database-dump

必要的数据库环境配置：

安装postgre后在Windows终端：

psql -U postgres -d postgres
（输入密码回车，密码不会显示）
CREATE USER testuser WITH PASSWORD '123456';
CREATE DATABASE interestzone WITH OWNER testuser;
GRANT ALL PRIVILEGES ON DATABASE interestzone TO testuser;
ctrl C 退出
psql -U testuser -d interestzone -f "C:\Users\Username\Desktop\Web\database-dump\data.sql"

注意以上的账号名称testuser、密码123456、数据库名interestzone###不可以###更改
最后一行-f后为sql文件路径，需要自行更改

数据库内有一些测试内容，如果需要可以自行清空所有table数据

在内容的输入框中粘贴可以插入剪贴板中的图片

同时多用户登录可以通过多个无痕浏览页面实现
