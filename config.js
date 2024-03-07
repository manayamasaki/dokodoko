//config.js
//postgersql
module.exports = {
    database: process.env.PGNAME,
    user: process.env.PGUSER,
    password: process.env.PGPASS,
    host: process.env.PGHOST,
  
    ssl: {
      rejectUnauthorized: false
    },
    max: 10,
};

