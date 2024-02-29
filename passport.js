// ユーザー情報
const User1 = {
    username: "user1",
    password: "password"
};

const express = require('express');
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(
    {
        // フィールド名が、username, password以外の場合.
        usernameField: 'login-id',
        passwordField: 'password',
        session: false,
    },
    (username, password, done) => {
        // 検証用コールバック.
        if (username !== User1.username) {
            return done(null, false);
        }
        if (password !== User1.password) {
            return done(null, false);
        }
        return done(null, username);
    }
));

app.use(passport.initialize());

app.post('/login', passport.authenticate('local', { successRedirect: 'ok.html',
                                                    failureRedirect: 'login.html',
                                                    session: true,
  }));

  app.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
  });

  const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
  }));

app.use(passport.session());  // <- app.use(passport.initialize()); より後に追加.

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
