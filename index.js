var speedtest = require('./speedtest');

var options = {
  host: 's3.amazonaws.com'
  , path: '/zilla-nodetest/amaranth.png'
  // set to 0 or just remove it to run the test only once and stop
  , minutes: 15
}

speedtest.run(options);