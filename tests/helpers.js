/* Declare chai plugins */
import chai from 'chai';

import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());


/* Setup jsDOM */
import { jsdom } from 'jsdom';

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
