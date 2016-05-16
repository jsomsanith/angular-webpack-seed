/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

import { Component } from '@angular/core';
import AppStyle from './app.scss';

@Component({
    selector: 'app',
    template: `
        <div class="app">
            Hello world from
            <img src="/assets/images/logo.png" class="logo">
        </div>
    `,
    stylesUrl: [AppStyle],
})
export default class AppComponent {}
