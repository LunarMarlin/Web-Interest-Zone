module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'bootstrap.js',
      cwd: './back-end',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      },
    }, {
      name: 'frontend', // 应用名称
      script: 'npx', // 使用 serve 启动静态文件服务器
      args: '-s dist -l 5173', // 静态文件目录和端口
      cwd: './front-end/dist', // 前端构建文件所在目录
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};