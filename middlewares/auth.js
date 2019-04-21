

module.exports.isAuth = (req, res, next) => {
  const ACTION = `[isAuthenticated]`;
  // Get user token
  // console.log("info", `[AUTH]${ACTION} - user session`, req.session);
  if(req.session.user){
    next();
  }else{
    res.redirect('/login');
  }
};

module.exports.isAuthAPI = (req, res, next) => {
  const ACTION = `[isAuthenticated]`;
  // Get user token
  // console.log("info", `[AUTH]${ACTION} - user session`, req.session);
  if(req.session.user){
    next();
  }else{
    res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

module.exports.isAfterAuthAPI = (req, res, next) => {
  const ACTION = `[isAuthenticated]`;
  // Get user token
  // console.log("info", `[AUTH]${ACTION} - user session`, req.session);
  if(req.session.user){
    res.status(400).json({
      message: 'Already logged in.'
    });
  }else{
    next();
  }
};

module.exports.hasSession = (req, res, next) => {
  const ACTION = `[hasSession]`;
  // Get user token
  // console.log("info", `[AUTH]${ACTION} - user session`, req.session);
  if(req.session.user){
    res.redirect('/');
  }else{
    next();
  }
};
