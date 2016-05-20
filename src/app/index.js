/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
/* redux related imports */
import { provider } from 'ng2-redux';

import AppComponent from './feature1/app.container';
import configureStore from './store/configureStore';

import UserInjectableActions from './actions/userActions';

/* eslint-disable no-console */

const store = configureStore();

bootstrap(AppComponent,
    [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: HashLocationStrategy }),
        UserInjectableActions,
        provider(store),
    ])
    .catch(err => console.error(err));

/* eslint-enable no-console */
