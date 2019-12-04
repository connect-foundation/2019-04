const requireRegexp = /require[(]{1}['"]{1}[a-zA-Z-/.0-9]*['"]{1}[)]{1}/g;
const pathRegexp = /['"]{1}[a-zA-Z0-9./_-]+['"]{1}/;
const maskQuotationRegexp = /['"]{1}/g;

module.exports = { requireRegexp, pathRegexp, maskQuotationRegexp };
