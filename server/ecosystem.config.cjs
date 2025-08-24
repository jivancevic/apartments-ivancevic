module.exports = {
  apps: [
    {
      name: "apartments-ivancevic-server",
      script: "dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
      },
    },
  ],
};
