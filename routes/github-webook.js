const express = require('express')
const router = express.Router()
const childProcess = require("child_process");
const execSync = require('child_process').execSync;

router.post('/webhook', (req, res)=>{
  let sender = req.body.sender;
  let branch = req.body.ref;
  if(['ping','push'].indexOf(req.headers['x-github-event']) > -1) deploy(res);
  else return res.send(500);
});

function deploy(res) {
  execSync("chmod +x ./deploy.sh", {
    encoding: 'utf8'
  });
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
