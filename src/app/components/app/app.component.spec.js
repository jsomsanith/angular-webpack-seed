/*  ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https://github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================*/

describe('App component', () => {
    let createElement;
    let scope;
    let element;

    beforeEach(angular.mock.module('talend-app.app'));

    beforeEach(inject(($rootScope, $compile) => {
        scope = $rootScope.$new(true);

        createElement = () => {
            const template = '<app></app>';
            element = $compile(template)(scope);
            scope.$digest();
        };
    }));

    afterEach(() => {
        scope.$destroy();
        element.remove();
    });

    it('should render hello', () => {
        // when
        createElement();

        // then
        expect(element.find('.app').length).toBe(1);
        expect(element.find('.app').text().trim()).toBe('Hello world from');
    });
});
