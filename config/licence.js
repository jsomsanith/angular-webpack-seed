var _ = require('lodash');

module.exports = function getLicence() {
    var licenceTemplate = _.template(
        '============================================================================\n' +
        '\n' +
        ' Copyright (C) 2006-<%= year %> Talend Inc. - www.talend.com\n' +
        '\n' +
        ' This source code is available under agreement available at\n' +
        ' https://github.com/Talend/data-prep/blob/master/LICENSE\n' +
        '\n' +
        ' You should have received a copy of the agreement\n' +
        ' along with this program; if not, write to Talend SA\n' +
        ' 9 rue Pages 92150 Suresnes, France\n' +
        '\n' +
        ' ============================================================================');
    return licenceTemplate({year: new Date().getFullYear()});
};