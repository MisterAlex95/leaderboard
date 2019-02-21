module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'deploy',
      host: 'alexdana.me',
      ref: 'origin/develop',
      repo: 'git@github.com:misteralex95/leaderboard.git',
      path: '/home/deploy/leaderboard',
      'pre-deploy': '. ~/.bashrc && docker kill $(docker ps -q) && docker rm $(docker ps -a -q)',
      'post-deploy': '. ~/.bashrc && docker build -t leaderboard . && docker run -d --net redis-node -p 3001:3001 --name instance_node leaderboard',
      // 'post-deploy' : '. ~/.bashrc && npm install && pm2 reload ecosystem.config.js --env production && npm run bundle',
      env: {
        NODE_ENV: 'production',
      }
    },
    staging: {
      user: 'deploy',
      host: 'alexdana.me',
      ref: 'origin/develop',
      repo: 'git@github.com:misteralex95/leaderboard.git',
      path: '/home/deploy/leaderboard',
      'pre-deploy': '. ~/.bashrc && docker kill $(docker ps -q) && docker rm $(docker ps -a -q)',
      'post-deploy': '. ~/.bashrc &&  docker build -t leaderboard . && docker run -d --net redis-node -p 3001:3001 --name instance_node leaderboard',
      // 'post-deploy': '. ~/.bashrc && npm install && pm2 reload ecosystem.config.js --env staging && npm run bundle',
      env: {
        NODE_ENV: 'staging',
      }
    }
  }
};
