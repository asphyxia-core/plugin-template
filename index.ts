import { example, changeName, randomNumber } from './handlers/example';

export function register() {
  /* Register game code */
  R.GameCode('NULL');

  /* A plugin can have multiple contributors. */
  R.Contributor('Your Name', 'http://your-link.com');
  R.Contributor('Others Name');

  /* Register plugin configuration */
  R.Config('event', {
    type: 'string',
    default: 'EVENT_1',
    options: ['EVENT_1', 'EVENT_2'],
  });

  /*
    Register user-provided datafile
    This will allow user to upload their own data to the root of your plugin
    This file, for example, will be uploaded to "plugins/example@identifier/uploaded/data.xml"
   */
  R.DataFile('uploaded/data.xml');

  /* Register your routes */
  R.Route('example.method', example);

  /*
    Register a unhandled handler that print all unhandled methods.
    You should remove it before you publish your plugin,
      unless you have specific reason not to.
   */
  R.Unhandled();

  /* Insert or clear a existing document in plugin space */
  DB.Upsert({ clicked: { $exists: true } }, { $set: { clicked: 0 } });

  /* Register a event and increment the click counter */
  R.WebUIEvent('click', async data => {
    console.log('WebUI Button Clicked');
    await DB.Update({ clicked: { $exists: true } }, { $inc: { clicked: 1 } });
  });

  /* Register a event and increment the click counter */
  R.WebUIEvent('change', changeName);

  /* Register a event that respond with a random number */
  R.WebUIEvent('random', randomNumber);

  /* Use --dev argument to enable console output. */
  console.log('Plugin Registered');

  /*
    You can check the version of CORE using CORE_VERSION_MAJOR and CORE_VERSION_MINOR
    Note: these value can be undefined, which means the CORE is version v1.18 and under
   */
  console.log(`Core Version: v${CORE_VERSION_MAJOR}.${CORE_VERSION_MINOR}`);
}
