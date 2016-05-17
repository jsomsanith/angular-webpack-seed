import { describe, expect, it, async, inject } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';

// Load the implementations that should be tested
import AppComponent from './app.component';

describe('App', () => {
    // provide our implementations or mocks to the dependency injector
    // beforeEachProviders(() => [AppComponent]);

    it('should render "Hello World" message',
        async(inject([TestComponentBuilder], (tcb) =>
            tcb.createAsync(AppComponent)
                .then((fixture) => {
                    // fixture.detectChanges();
                    // expect(fixture.componentInstance.editing).toBe(true);

                    const nativeElement = fixture.nativeElement;
                    expect(nativeElement.textContent.trim()).toBe('Hello world from');
                })
        ))
    );
});
