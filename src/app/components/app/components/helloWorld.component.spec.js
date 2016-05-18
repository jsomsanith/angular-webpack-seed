/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

import { describe, expect, it, async, inject, beforeEachProviders } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';

// Load the implementations that should be tested
import HelloWorldComponent from './helloWorld.component';

describe('App', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [HelloWorldComponent]);

    it('should render "Hello World" message',
        async(inject([TestComponentBuilder], (tcb) =>
            tcb.createAsync(HelloWorldComponent)
                .then((fixture) => {
                    // fixture.detectChanges();
                    // expect(fixture.componentInstance.editing).toBe(true);

                    const nativeElement = fixture.nativeElement;
                    expect(nativeElement.textContent.trim()).toBe('Hello world from');
                })
        ))
    );
});
