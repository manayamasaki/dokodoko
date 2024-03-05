function add_user(email,password) {
    const  pg  = require("pg");
    const pool = new pg.Pool({
    // Render.comのDBの接続情報
    database: "mydb_tj0i",
    user: "umeba",
    password: "IyVwHPcpnQDdqFVf460Qup10onpwyuN2",
    host: "dpg-cna9ladjm4es73c792ug-a.singapore-postgres.render.com",
  
    ssl: {
      rejectUnauthorized: false,
    },
    max: 10,
  });

  //postgresqlに接続
  pool.connect();

  //ユーザー追加
  const query = {
    text: "INSERT INTO users VALUES ($1, $2, $3)",
    values: [6, email,password],
  };
  pool
    .query(query)
    .then((res) => {
      console.log("test");
      pool.end();
      return;
    })
    .catch((e) => {
        console.error(e.stack);
        return;
    });
    
  }

  add_user("test_user","test_pass");
  
    

  