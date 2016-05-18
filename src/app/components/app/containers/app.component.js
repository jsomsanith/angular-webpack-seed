/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

import { Component, Inject, ApplicationRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import AppStyle from './app.scss';
import HelloWorld from '../components/helloWorld.component';
import TalendButton from '../components/button.component';
import Counter from '../components/counter.component';

import { NgRedux } from 'ng2-redux';
import { bindActionCreators } from 'redux';
import { Observable } from 'rxjs';
import * as counterActionCreator from '../../../actions/counterActions';

/**
 * Container component, shouldn't do anything else than bind value and action from store and pass
 * them down to children components
 */
@Component({
    selector: 'app',
    pipes: [AsyncPipe],
    template: `
        <div class="app">
            <hello-world></hello-world>
            <talend-button label="super"></talend-button>
            <counter [counter]="counter" [increment]="increment"></counter>
            <counter [counter]="counter" [increment]="asyncIncrement"></counter>
        </div>
    `,
    directives: [HelloWorld, TalendButton, Counter],
    stylesUrl: [AppStyle],
})
export default class AppComponent {

    constructor(@Inject('ngRedux') NgRedux, @Inject(ApplicationRef) ApplicationRef) {
        this.ngRedux = NgRedux;
        this.applicationRef = ApplicationRef;
    }

    ngOnInit() {
        this.disconnect = this.ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
        // help component to update when modification to state are made from redux dev tools
        // https://github.com/gaearon/redux-devtools
        if (process.env.NODE_ENV === 'developpement') {
            this.unsubscribe = this.ngRedux.subscribe(() => {
                this.applicationRef.tick();
            });
        }
    }

    ngOnDestroy() {
        this.disconnect();
        if (process.env.NODE_ENV === 'developpement') {
            this.unsubscribe();
        }
    }

    /**
     * bind a subslection of redux store state on to this component
     */
    mapStateToThis(state) {
        return {
            counter: state.counter,
        };
    }
    /**
     * bind dispatchable action creators on to this component
     */
    mapDispatchToThis(dispatch) {
        return bindActionCreators(counterActionCreator, dispatch);
    }
}
