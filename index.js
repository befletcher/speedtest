var speedtest = require('./speedtest');

var options = {
  host: 's3.amazonaws.com'
  , path: '/zilla-nodetest/amaranth-5.jpg'
  // set to 0 or just remove it to run the test only once and stop
  , minutes: 5
}

speedtest.run(options);