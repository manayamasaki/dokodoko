//config.js
//postgersql
module.exports = {
    database: PGNAME,
    user: PGUSER,
    password: PGPASS,
    host: PGHOST,
  
    ssl: {
      rejectUnauthorized: false
    },
    max: 10,
};

