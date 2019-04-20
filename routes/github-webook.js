const express = require('express')
const router = express.Router()

router.post('/webhook', (req, res)=>{
  let sender = req.body.sender;
  let branch = req.body.ref;
  if(['ping','push'].indexOf(req.headers['X-GitHub-Event']) > -1) deploy(res);
  else return res.send(500);
});

function deploy(res) {
  childProcess.exec("./deploy.sh", function(err, stdout, stderr) {
    console.log('STDERR', stderr);
    if (err) {
      console.error(err);
      return res.send(500);
    }
    console.log('STDOUT', stdout);
    res.status(200).send('OK');
  });
}

module.exports = router;
