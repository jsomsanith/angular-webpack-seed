import { beforeEachProviders, it } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';

// Load the implementations that should be tested
import AppComponent from './app.component';

describe('App', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [AppComponent]);

    it('should show blog editor div when New is clicked...',
        injectAsync([TestComponentBuilder], (tcb) =>
            tcb
                .createAsync(AppComponent)
                .then((fixture) => {
                    // fixture.detectChanges();
                    // expect(fixture.componentInstance.editing).toBe(true);

                    const nativeElement = fixture.nativeElement;
                    expect(nativeElement.textContent).toBe(false);
                })
    ));
});
