/*  ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https://github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================*/

describe('REST urls service', () => {
    // TODO change the module name
    beforeEach(angular.mock.module('talend-app.config'));

    it('should store the server url', inject((RestURLs) => {
        // given
        expect(RestURLs.serverUrl).toBeUndefined();
        const serverUrl = 'http://localhost:8888';

        // when
        RestURLs.setServerUrl(serverUrl);

        // then
        expect(RestURLs.serverUrl).toBe(serverUrl);
    }));
});
