module.exports = {
  apps: [
    {
      name: 'combinei-api',
      script: './dist/main.js',
      namespace: 'combinei',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      key: '~/.ssh/CombineiApp.pem',
      user: 'bitnami',
      host: '18.230.188.16',
      ref: 'origin/dev',
      repo: 'git@github.com:combinei/api.git',
      path: '/home/bitnami/htdocs/combinei/api',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
