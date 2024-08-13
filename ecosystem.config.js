module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'serve',
      args: '-s build',
      cwd: './front-end',
      env: {
        PORT: 3000,
      },
    },
    {
      name: 'backend',
      script: './back-end/bootstrap.js',
      cwd: './back-end',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};