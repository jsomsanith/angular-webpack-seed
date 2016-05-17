/**
 * Used in karma conf file, we do 2 configurations here : 
 * 1- set angular test environment (needed to have for example the TestComponentBuilder)
 * 2- require all the unit tests files
 */

import { setBaseTestProviders } from '@angular/core/testing';
import { TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS } from '@angular/platform-browser-dynamic/testing';

// set angular test environment
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

// require all *.spec.js files
var context = require.context('../src', true, /\.spec\.js$/);
context.keys().forEach(context);