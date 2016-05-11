/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

/**
 * @ngdoc service
 * @name talend-app.config.service:RestURLs // TODO update the module name
 * @description The REST api services url
 */
export default class RestURLs {
    /**
     * @ngdoc method
     * @name setServerUrl
     * @propertyOf talend-app.config.service:RestURLs // TODO update the module name
     * @description Init the api urls with a provided server url
     * @param {string} serverUrl The server url
     */
    setServerUrl(serverUrl) {
        this.serverUrl = serverUrl;

        // TODO configure the backend urls
        // ex :
        // this.datasetUrl = `${serverUrl}/api/datasets`;
    }
}
