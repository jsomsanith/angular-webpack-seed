/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

/* eslint-disable angular/module-getter */

import angular from 'angular';

const configureDebug = (mainModule, config) => {
    mainModule.config(($compileProvider) => {
        'ngInject';
        $compileProvider.debugInfoEnabled(config.enableDebug);
    });
};

const configureServer = (mainModule, config) => {
    mainModule.run((RestURLs) => {
        'ngInject';
        RestURLs.setServerUrl(config.serverUrl);
    });
};

const configureCopyrights = (mainModule, config) => {
    mainModule.value('copyRights', config.copyRights);
};

export function configure(mainModule) {
    return function fetchConfiguration(env) {
        const initInjector = angular.injector(['ng']);
        const $http = initInjector.get('$http');

        return $http.get(`/assets/config/config.${env}.json`)
            .then((response) => response.data)
            .then((config) => {
                configureDebug(mainModule, config);
                return config;
            })
            .then((config) => {
                configureServer(mainModule, config);
                return config;
            })
            .then((config) => {
                configureCopyrights(mainModule, config);
                return config;
            });
    };
}

export function bootstrapApplication(modules) {
    angular
        .element(document)
        .ready(() => angular.bootstrap(document, modules));
}

/* eslint-enable angular/module-getter */
