module.exports = (app, passport)=>{
    app.get('/' , (req,res)=>{
        res.render('signup');
    });

    app.get('/login' , (req,res)=>{
        res.render('login');
    });

    app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

    app.post('/logout' , passport.authenticate('local' , {failureRedirect:'/login'}) , (req,res)=>{
        res.redirect('/profile');
    });

    app.get('/logout' , (req,res)=>{
        req.logout();
        res.redirect('/');
    });

    app.get('/profile' , require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
        res.render('profile', {user:req.user});
    });
}