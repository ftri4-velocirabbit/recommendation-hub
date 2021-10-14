const engine = require('./engine');
const recAppFetchUtil = require('./recAppFetchUtil');

const URL = 'http://localhost:8080';

let name = 'm';
let username = 'm';
let email = 'm@m.co';
let password = 'kjhKJH87698';


// IIFE to use async-await
(async () => {
  let cookie;

  function hitFeedEndpoint() {
    recAppFetchUtil.fetchFeed(URL, cookie);
  }

  function hitSearchEndpoint() {
    recAppFetchUtil.fetchSearch(URL, cookie, 'a');
  }

  try {
    cookie = await recAppFetchUtil.createNewUser(URL, name, email, username, password);

    const commands = [
      ['RUN', [hitFeedEndpoint, hitFeedEndpoint, hitFeedEndpoint, hitFeedEndpoint, hitFeedEndpoint]],
      ['SKIP', 10000],
      ['RUN', [hitSearchEndpoint]],
      ['RUN', [hitFeedEndpoint, hitFeedEndpoint, hitFeedEndpoint, hitFeedEndpoint, hitFeedEndpoint]],
      ['REPEAT', 10],

      ['SKIP', 60 * 1000],

      ['RUN', [hitSearchEndpoint, hitSearchEndpoint, hitSearchEndpoint, hitSearchEndpoint, hitSearchEndpoint]],
      ['SKIP', 10000],
      ['RUN', [hitFeedEndpoint]],
      ['RUN', [hitSearchEndpoint, hitSearchEndpoint, hitSearchEndpoint, hitSearchEndpoint, hitSearchEndpoint]],
      ['REPEAT', 10],

      ['SKIP', 60 * 1000],
    ];

    console.log('Starting simulation...');
    engine.start(commands, 10000);

    setTimeout(() => {
      engine.stop();
      console.log('Simulation has stopped...');
    }, 30 * 60 * 1000); // 30 minutes

  } catch (error) {
    console.log('\n\n\n');
    console.log(error);
    console.log('\n\n\n');
  }
})();
