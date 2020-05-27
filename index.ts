import { example, changeName } from './handlers/example';

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

  /* Use --dev argument to enable console output. */
  console.log('Plugin Registered');
}
