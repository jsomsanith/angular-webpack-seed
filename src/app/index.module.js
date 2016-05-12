/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

/* eslint-disable angular/window-service */
/* eslint-disable angular/module-setter */

import { configure, bootstrapApplication } from './bootstrap';

import angular from 'angular';
import APP_MODULE from './components/app/app.module';
import CONFIG_MODULE from './services/config/config.module';

require('./index.scss');

(() => {
    // TODO change module name (don't forget to change it in app.conf.js too !)
    const mainModule = angular.module('talend-app', [
        APP_MODULE,     // app root component module
        CONFIG_MODULE,  // app configuration module
    ]);

    window.fetchConfiguration = configure(mainModule);
    window.bootstrapApplication = bootstrapApplication;
})();

/* eslint-enable angular/window-service */
/* eslint-enable angular/module-setter */
