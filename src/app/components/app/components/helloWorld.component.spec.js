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
