// Generated by CoffeeScript 1.4.0
(function() {
  var childProcess, collections, cronJob, crontab, dbName, execWithOutput, job, outputFolder;

  cronJob = require('cron').CronJob;

  childProcess = require('child_process');

  outputFolder = '/Users/raine/Google Drive/Backup/College Coding Admin';

  dbName = 'ccadmin';

  collections = ['clients', 'payments', 'sessions'];

  crontab = '0 0 * * *';

  console.log("Database: " + dbName);

  console.log("Backup Location: " + outputFolder);

  console.log("Scheduling cronjob for " + crontab);

  job = new cronJob(crontab, function() {
    var collection, timestamp, _i, _len, _results;
    console.log('a');
    timestamp = (new Date()).toISOString();
    execWithOutput("mongodump --db " + dbName + " --out '" + outputFolder + "/" + timestamp + "/dump'");
    _results = [];
    for (_i = 0, _len = collections.length; _i < _len; _i++) {
      collection = collections[_i];
      _results.push(execWithOutput("mongoexport --db " + dbName + " --collection " + collection + " --out '" + outputFolder + "/" + timestamp + "/export/" + collection + ".json'"));
    }
    return _results;
  }, null, true);

  execWithOutput = function(command) {
    var process;
    console.log('Executing child process');
    console.log(command);
    process = childProcess.exec(command, function(error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
      }
      console.log('Child Process STDOUT:');
      return console.log(stdout);
    });
    return process.on('exit', function(code) {
      return console.log('Child process exited with exit code ' + code);
    });
  };

  console.log('Cronjob scheduled.');

}).call(this);
