/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

require('./app.scss');

const AppComponent = {
    template: `
        <div class="app">
            Hello world from 
            <sc-dropdown>
                <sc-dropdown-trigger>
                    <img src="/assets/images/logo.png" class="logo">
                </sc-dropdown-trigger>
                <sc-dropdown-content>
                    <a href="http://talend.com">Go to website</a>
                </sc-dropdown-content>
            </sc-dropdown>
            
        </div>
    `,
};

export default AppComponent;
