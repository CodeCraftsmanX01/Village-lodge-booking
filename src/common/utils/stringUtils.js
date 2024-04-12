/* eslint-disable */
'use strict';

function _interopDefault(ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ramda = require('ramda');
var moment = _interopDefault(require('moment'));
var momentTimezone = _interopDefault(require('moment-timezone'));
var momentRange = require('moment-range');
var forEach = _interopDefault(require('lodash/forEach'));
var get = _interopDefault(require('lodash/get'));
var isString = _interopDefault(require('lodash/isString'));

var DEFAULT_COUNTRY_CODE = "US";

var TIMEZONE_MAP = {
    // US TIME ZONES
    PST: "America/Los_Angeles",
    PDT: "America/Los_Angeles",
    EST: "America/New_York",
    EDT: "America/New_York",
    CST: "America/Chicago",
    CDT: "America/Chicago",
    MST: "America/Denver",
    MDT: "America/Denver",
    AKST: "US/Alaska",
    AKDT: "US/Alaska",
    AST: "US/Alaska",
    ADT: "US/Alaska",
    // UK TIME ZONES
    BST: "Europe/Belfast",
    GMT: "Europe/Belfast",
    BS: "Europe/Belfast",
    GM: "Europe/Belfast"
};
var getTimeZoneNameFromCode = function getTimeZoneNameFromCode(tzCode) {
    return TIMEZONE_MAP[tzCode];
};

var currencyDisplayMap = function currencyDisplayMap(currency) {
    return {
        USD: "symbol",
        CAD: "code",
        GBP: "symbol",
        EUR: "symbol",
        AED: "symbol",
        OMR: "symbol",
        BHD: "symbol"
    }[currency];
};

var getCompanyMapObjectFromCompanyCode = function getCompanyMapObjectFromCompanyCode(country) {
    return {
        US: {
            companyCode: "COPART",
            locale: "en-US",
            distanceUnit: "mi",
            format: "MM/DD/YYYY",
            region: "America/Los_Angeles",
            currency: "USD",
            name: "USA"
        },
        UK: {
            companyCode: "COPARTUK",
            locale: "en-GB",
            distanceUnit: "km",
            format: "DD/MM/YYYY",
            region: "Europe/Belfast",
            currency: "GBP",
            name: "UK"
        },
        IR: {
            // need more clarity on the details for this country
            companyCode: "COPARTUK",
            locale: "en-GB",
            distanceUnit: "km",
            format: "DD/MM/YYYY",
            region: "Europe/Belfast",
            currency: "EUR",
            name: "IR"
        },
        ME: {
            // need more clarity on the details for this country
            companyCode: "COPARTUK",
            locale: "en-GB",
            distanceUnit: "km",
            format: "DD/MM/YYYY",
            region: "Europe/Belfast",
            currency: "AED",
            name: "MEA"
        },
        CA: {
            companyCode: "COPART",
            locale: "en-US",
            distanceUnit: "km",
            region: "America/Los_Angeles",
            format: "MM/DD/YYYY",
            currency: "CAD",
            name: "CANADA"
        },
        DE: {
            companyCode: "COPART",
            locale: "de-DE",
            distanceUnit: "km",
            format: "DD/MM/YYYY",
            region: "Europe/Berlin",
            currency: "EUR",
            name: "GERMANY"
        },
        ES: {
            companyCode: "COPART",
            locale: "de-DE",
            distanceUnit: "km",
            format: "DD/MM/YYYY",
            region: "Europe/Belfast",
            currency: "EUR",
            name: "SPAIN"
        },
        IN: {
            companyCode: "COPART",
            locale: "en-IN",
            distanceUnit: "km",
            region: "Asia/Kolkata",
            format: "MM/DD/YYYY",
            currency: "INR",
            name: "INDIA"
        },
        GB: {
            companyCode: "COPARTUK",
            locale: "en-GB",
            distanceUnit: "km",
            format: "DD/MM/YYYY",
            region: "Europe/Belfast",
            currency: "GBP",
            name: "GB"
        }
    }[country || "US"];
};

var EXTRACT_NUMERALS = /[^0-9\.]+/g;
var CURRENCY_STRIP_DOWN_REGEX_UK = EXTRACT_NUMERALS;
var CURRENCY_STRIP_DOWN_REGEX_US = /^[\$-]?(\d+)[,]?(\d{0,3}\.?\d*)/;
var VIN_REGEX = "^[A-HJ-NPR-Z\\d]{8}[\\dX][A-HJ-NPR-Z\\d]{2}\\d{6}$";
var CFR_REMOVE_LOT_NUMBER_REGEX = /(\/call-for-release)\/\d+/;
var PHONE_STRIP_DOWN = /\D/g;
var CANADA_ZIP1_REGEX = /[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz]{1}/;
var CANADA_ZIP2_REGEX = /\d{1}[A-Za-z]{1}\d{1}/;
var US_ZIP1_REGEX = /\d{5}/;
var US_ZIP2_REGEX = /\d{4}/;
var UK_ZIP1_REEGX = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y])))))$/;
var UK_ZIP2_REEGX = /^([0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2})$/;
var MEA_IRE_ZIP1_REGEX = /^[A-Za-z0-9]{1,5}$/;
var MEA_IRE_ZIP2_REGEX = /^[a-z0-9]+$/i;
var LOT_NUMBER_VALID_REGEX = /^\d+$/;
var FIND_ALL_UNDERSCORES = /_+/g;
var FIND_FIRST_LETTER_REGEX = /\w\S*/g;
var MATCH_BAVED_VALUE = /\*/;
var LOT_REVIEW_URL = /(\/lot-review)\/\d+/;
var COPART_EMAIL = /@copart.com$/;
var EMAIL_REGEX = /^([a-zA-Z0-9À-ž%+-_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9À-ž\-]+\.)+))([a-zA-ZÀ-ž]{2,4}|[0-9]{1,3})(\]?)$/;
var CURRENCY_PATTERN = /^[-]?[€£₹$]?\d+(\.\d+$|$)/;

/**
  Following dates will be detected by this regex:
  1992-12-02
  1992/12/02
  1992.12.02
  Following date will not be detected by this regex:
  19921202
*/
var YYYYMMDDDateRegex = /([12]\d{3}[\/\-\.](0[1-9]|1[0-2])[\/\-\.](0[1-9]|[12]\d|3[01]))/;

var obtainBundleNameFromHTML = function obtainBundleNameFromHTML(html) {
    var matchedArray = html.match(/bundle-(.*).js/i);
    return matchedArray ? matchedArray[0] : "";
};
var US_DATE_FORMAT = "MM/DD/YYYY";
var UK_DATE_FORMAT = "DD/MM/YYYY";
var US_PHONE_TEMPLATE = "(***) ***-****x******";
var UK_PHONE_TEMPLATE = "*** **** **** x ******";

var CURRENCY_STRIP_DOWN_REGEX = function CURRENCY_STRIP_DOWN_REGEX() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return {
        US: CURRENCY_STRIP_DOWN_REGEX_US,
        UK: CURRENCY_STRIP_DOWN_REGEX_UK
    }[countryCode];
};

var currencyReplaceValue = function currencyReplaceValue() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return {
        US: "$1$2",
        UK: ""
    }[countryCode];
};

var DATE_FORMAT = function DATE_FORMAT() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return {
        US: US_DATE_FORMAT,
        UK: UK_DATE_FORMAT
    }[countryCode];
};

var PHONE_TEMPLATE = function PHONE_TEMPLATE() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return {
        US: US_PHONE_TEMPLATE,
        UK: UK_PHONE_TEMPLATE
    }[countryCode];
};

var AREA_CODE_LENGTH = function AREA_CODE_LENGTH() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return {
        US: 3,
        UK: 3
    }[countryCode];
};

var LINE_VALUE_LENGTH = function LINE_VALUE_LENGTH() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return {
        US: 7,
        UK: 7
    }[countryCode];
};

var PHONE_EXTENSION_LENGTH = function PHONE_EXTENSION_LENGTH() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return {
        US: 6,
        UK: 6
    }[countryCode];
};

var ZIP1_LENGTH = function ZIP1_LENGTH() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return {
        US: 5,
        UK: 4
    }[countryCode];
};

var ZIP2_LENGTH = function ZIP2_LENGTH() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return {
        US: 4,
        UK: 3
    }[countryCode];
};

var urlIsLR = function urlIsLR(url) {
    return url.match(LOT_REVIEW_URL);
};
var urlIsCFR = function urlIsCFR(url) {
    return url.match(CFR_REMOVE_LOT_NUMBER_REGEX);
};

var removeLotNumberForCFR = function removeLotNumberForCFR(url) {
    if (urlIsCFR(url)) {
        return url.replace(CFR_REMOVE_LOT_NUMBER_REGEX, "$1");
    }
    return url;
};

var hasText = function hasText(key, val) {
    var reg = new RegExp("" + val, "i");
    var match = key && key.toString().match(reg);
    return !!match; // need true/false for propSatisfies predicate
};

var isLotNumber = function isLotNumber(value) {
    var val = String(value);
    var match = val.match(/\d{8}/);
    return match && match[0] === val;
};

var stripDownPhoneInput = function stripDownPhoneInput(phone) {
    return phone.replace(PHONE_STRIP_DOWN, "");
};

var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
    return string && string.replace(FIND_FIRST_LETTER_REGEX, function (match) {
        return match && "" + match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
    });
};

var beautifyRoleText = function beautifyRoleText(string) {
    return ramda.complement(ramda.isNil)(string) && string.replace(FIND_ALL_UNDERSCORES, " ");
};

var isTheValueBaved = function isTheValueBaved(value) {
    return ramda.test(MATCH_BAVED_VALUE, value);
};

var getValueAfterBaveValidation = function getValueAfterBaveValidation(value, returnValue) {
    return isTheValueBaved(value) ? returnValue : value;
};

var isValidEmail = function isValidEmail(value) {
    return EMAIL_REGEX.test(value);
};

var countryCodeToDialCodeMapper = function countryCodeToDialCodeMapper() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    switch (countryCode.toLowerCase()) {
        case "de":
        case "deu":
            return "49";
        case "es":
        case "esp":
            return "34";
        case "in":
        case "ind":
            return "91";
        default:
            return "";
    }
};

var zipLengths = function zipLengths() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "USA";
    return {
        USA: 5,
        UK: 4,
        CAN: 3
    }[countryCode.toUpperCase()];
};

var integerOnly = "^\\d*$";
// to be used insdie regex constructor
var integerMaxLength = function integerMaxLength(maxLength) {
    return "^\\d{0," + maxLength + "}$";
};

var regex = /*#__PURE__*/Object.freeze({
    EXTRACT_NUMERALS: EXTRACT_NUMERALS,
    CURRENCY_STRIP_DOWN_REGEX_UK: CURRENCY_STRIP_DOWN_REGEX_UK,
    CURRENCY_STRIP_DOWN_REGEX_US: CURRENCY_STRIP_DOWN_REGEX_US,
    VIN_REGEX: VIN_REGEX,
    CFR_REMOVE_LOT_NUMBER_REGEX: CFR_REMOVE_LOT_NUMBER_REGEX,
    PHONE_STRIP_DOWN: PHONE_STRIP_DOWN,
    CANADA_ZIP1_REGEX: CANADA_ZIP1_REGEX,
    CANADA_ZIP2_REGEX: CANADA_ZIP2_REGEX,
    US_ZIP1_REGEX: US_ZIP1_REGEX,
    US_ZIP2_REGEX: US_ZIP2_REGEX,
    UK_ZIP1_REEGX: UK_ZIP1_REEGX,
    UK_ZIP2_REEGX: UK_ZIP2_REEGX,
    MEA_IRE_ZIP1_REGEX: MEA_IRE_ZIP1_REGEX,
    MEA_IRE_ZIP2_REGEX: MEA_IRE_ZIP2_REGEX,
    LOT_NUMBER_VALID_REGEX: LOT_NUMBER_VALID_REGEX,
    FIND_ALL_UNDERSCORES: FIND_ALL_UNDERSCORES,
    FIND_FIRST_LETTER_REGEX: FIND_FIRST_LETTER_REGEX,
    MATCH_BAVED_VALUE: MATCH_BAVED_VALUE,
    LOT_REVIEW_URL: LOT_REVIEW_URL,
    COPART_EMAIL: COPART_EMAIL,
    EMAIL_REGEX: EMAIL_REGEX,
    CURRENCY_PATTERN: CURRENCY_PATTERN,
    YYYYMMDDDateRegex: YYYYMMDDDateRegex,
    obtainBundleNameFromHTML: obtainBundleNameFromHTML,
    US_DATE_FORMAT: US_DATE_FORMAT,
    UK_DATE_FORMAT: UK_DATE_FORMAT,
    US_PHONE_TEMPLATE: US_PHONE_TEMPLATE,
    UK_PHONE_TEMPLATE: UK_PHONE_TEMPLATE,
    CURRENCY_STRIP_DOWN_REGEX: CURRENCY_STRIP_DOWN_REGEX,
    currencyReplaceValue: currencyReplaceValue,
    DATE_FORMAT: DATE_FORMAT,
    PHONE_TEMPLATE: PHONE_TEMPLATE,
    AREA_CODE_LENGTH: AREA_CODE_LENGTH,
    LINE_VALUE_LENGTH: LINE_VALUE_LENGTH,
    PHONE_EXTENSION_LENGTH: PHONE_EXTENSION_LENGTH,
    ZIP1_LENGTH: ZIP1_LENGTH,
    ZIP2_LENGTH: ZIP2_LENGTH,
    urlIsLR: urlIsLR,
    removeLotNumberForCFR: removeLotNumberForCFR,
    hasText: hasText,
    isLotNumber: isLotNumber,
    stripDownPhoneInput: stripDownPhoneInput,
    capitalizeFirstLetter: capitalizeFirstLetter,
    beautifyRoleText: beautifyRoleText,
    isTheValueBaved: isTheValueBaved,
    getValueAfterBaveValidation: getValueAfterBaveValidation,
    isValidEmail: isValidEmail,
    countryCodeToDialCodeMapper: countryCodeToDialCodeMapper,
    zipLengths: zipLengths,
    integerOnly: integerOnly,
    integerMaxLength: integerMaxLength
});

var momentRange$1 = momentRange.extendMoment(moment);

var FORMATS = {
    SLASH_MONTH_DATE: "MM/DD/YYYY",
    HYPHEN_YEAR_DATE: "YYYY-MM-DD",
    HYPHEN_MONTH_DATE: "MM-DD-YYYY",
    SLASH_YEAR_DATETIME: "MM/DD/YYYY HH:mm:ss",
    HYPEN_YEAR_DATETIMEZONE: "YYYY-MM-DDTHH:mm:ssZ",
    SPACE_DOW_DATETIME: "ddd MMM DD YYYY HH:mm:ss",
    SPACE_DOW_DATETIMEZONE: "ddd MMM DD YYYY HH:mm:ssZ z",
    HYPHEN_YEAR_DATETIME: "YYYY-MM-DDTHH:mm:ss",
    COLON_HOUR_TIME: "HH:mm:ss",
    HYPHEN_YEAR_DATETIME_NO_T: "YYYY-MM-DD HH:mm:ss"
};
// function to format date and time in UTC to yard's time zone default 'America/Los_Angeles'
var dafaultTimeZone = "America/Los_Angeles";

var formatDateTimeToCustomTimeZone = function formatDateTimeToCustomTimeZone(time) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FORMATS.SLASH_YEAR_DATETIME;
    var timeZone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dafaultTimeZone;
    return moment(time).tz(timeZone).format(format);
};

var nowInUTC = function nowInUTC() {
    return moment.utc();
};

var defaultFormat = function defaultFormat() {
    return getCompanyMapObjectFromCompanyCode(DEFAULT_COUNTRY_CODE).format;
};

var getDateFormat = function getDateFormat(countryCode) {
    return getCompanyMapObjectFromCompanyCode(countryCode || DEFAULT_COUNTRY_CODE).format;
};

var getDefaultDateRegion = function getDefaultDateRegion() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_COUNTRY_CODE;
    return getCompanyMapObjectFromCompanyCode(countryCode).region;
};

var addDaysToToday = function addDaysToToday(numberofDays) {
    return moment.utc().add(numberofDays, "d").toDate();
};

var subtractDaysFromToday = function subtractDaysFromToday(numberofDays) {
    return moment.utc().subtract(numberofDays, "d").toDate();
};

var dateValueToPacificMidnight = function dateValueToPacificMidnight(value) {
    var momentTz = moment(value, FORMATS.SLASH_MONTH_DATE).tz("America/Los_Angeles");
    var offSet = Math.abs(momentTz.utcOffset()) / 60 || 0;
    return moment.utc(value, FORMATS.SLASH_MONTH_DATE).set({ hour: offSet, minute: 0, second: 0 }).format();
};

// converts value from date picker to date for lot review
var formatDatePickerValueToDateLR = function formatDatePickerValueToDateLR(value) {
    return value && dateValueToPacificMidnight(value);
};

// function to format date to MM/DD/YYYY pacific
var formatDateInPacific = function formatDateInPacific(value) {
    return moment.tz(value, dafaultTimeZone).format(FORMATS.SLASH_MONTH_DATE);
};

// returns a max Date based on a date ignoring time zone.
var getMaxDate = function getMaxDate(date) {
    var maxDate = date && formatDateInPacific(date);
    return new Date(maxDate);
};

var isSameOrBefore = function isSameOrBefore(date1, date2) {
    var comparisonParameter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "milliseconds";
    return moment(date1, FORMATS.HYPHEN_MONTH_DATE).isSameOrBefore(moment(date2, FORMATS.HYPHEN_MONTH_DATE), comparisonParameter);
};

var isBefore = function isBefore(date1, date2) {
    var comparisonParameter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "milliseconds";
    return moment(date1, FORMATS.SPACE_DOW_DATETIME).isBefore(moment(date2, FORMATS.SPACE_DOW_DATETIME), comparisonParameter);
};

var getLesserDateValue = function getLesserDateValue(date1, date2) {
    return isSameOrBefore(date1, date2) ? date1 : date2;
};

var getBiggerDateValue = function getBiggerDateValue(date1, date2) {
    return isSameOrBefore(date1, date2) ? date2 : date1;
};

// TODO revisit why this needs to wrap with Date
var formatDateForCFR = function formatDateForCFR(date) {
    return new Date(moment(date).format());
};

// get number of days between two dates
var getNumberOfDays = function getNumberOfDays(date1, date2) {
    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DATE_FORMAT();

    var a = moment.utc(date1, format);
    var b = moment.utc(date2, format);
    return b.diff(a, "days") + 1;
};

// Currently being used in CFR to set the date if the existing date value is greater than min Date. Eg storageToDate and secondStorageFromDate.
var getValidatedDate = function getValidatedDate(date, minDate) {
    if (date) {
        return moment.utc(date, DATE_FORMAT()).isAfter(moment.utc(minDate, DATE_FORMAT())) ? date : moment.utc(minDate, DATE_FORMAT()).add(1, "days").format(DATE_FORMAT());
    }
    return date;
};

var getStartDateValueDTLE = function getStartDateValueDTLE(date) {
    return moment.utc(date, DATE_FORMAT()).startOf("day").format();
};

var getEndDateValueDTLE = function getEndDateValueDTLE(date) {
    return moment.utc(date, DATE_FORMAT()).endOf("day").format();
};

// input is in UTC // output is in UTC // takes zone's date in UTC and returns zone's start date in UTC
var getZoneStartDateUTC = function getZoneStartDateUTC(_ref) {
    var date = _ref.date,
        timeZone = _ref.timeZone;
    return moment.utc(moment.tz(date, getTimeZoneNameFromCode(timeZone)).startOf("day")).format();
};

// input is in UTC // output is in UTC // takes zone's date in UTC and returns zone's end date in UTC
var getZoneEndDateUTC = function getZoneEndDateUTC(_ref2) {
    var date = _ref2.date,
        timeZone = _ref2.timeZone;
    return moment.utc(moment.tz(date, getTimeZoneNameFromCode(timeZone)).endOf("day")).format();
};

// input is in local date // output is in UTC // returns local Start date as UTC
var getLocalStartDateUTC = function getLocalStartDateUTC(_ref3) {
    var date = _ref3.date,
        timeZone = _ref3.timeZone;

    var dateNoOffset = moment(date).format(FORMATS.HYPHEN_YEAR_DATE);
    return getZoneStartDateUTC({ date: dateNoOffset, timeZone: timeZone });
};

// input is in local Date // output is in UTC // returns local End date as UTC
var getLocalEndDateUTC = function getLocalEndDateUTC(_ref4) {
    var date = _ref4.date,
        timeZone = _ref4.timeZone;

    var dateNoOffset = moment(date).format(FORMATS.HYPHEN_YEAR_DATE);
    return getZoneEndDateUTC({ date: dateNoOffset, timeZone: timeZone });
};

// input is in UTC Date // output is in localDate (MM/DD/YYYY OR DD/MM/YYYY)
var getLocalStartDate = function getLocalStartDate(_ref5) {
    var date = _ref5.date,
        timeZone = _ref5.timeZone;
    return moment.tz(date, getTimeZoneNameFromCode(timeZone)).startOf("day").format(getDateFormat());
};

// input is in UTC Date // output is in localDate
var getLocalEndDate = function getLocalEndDate(_ref6) {
    var date = _ref6.date,
        timeZone = _ref6.timeZone;
    return moment.tz(date, getTimeZoneNameFromCode(timeZone)).endOf("day").format(getDateFormat());
};

// adds given years to the date specified, needs a Date() object as first input and
// years to add in second - a number
var addYearsToDate = function addYearsToDate(date, yearsToAdd) {
    var currentYear = date.getUTCFullYear();
    return new Date(date.setFullYear(currentYear + yearsToAdd));
};

var formatDate = function formatDate(format, value) {
    return moment(value).format(format);
};

var getISODate = function getISODate(date) {
    var formattedDate = "" + moment(date).tz("UTC").format(FORMATS.HYPEN_YEAR_DATETIMEZONE);
    return formattedDate.replace(formattedDate.substr(-6), "Z");
};

// convert date based on yard's time zone // input: time in UTC //output: date in given yard's time zone
var formatDateToYardTimeZone = function formatDateToYardTimeZone(date, format) {
    var timeZone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : dafaultTimeZone;
    return moment(date).tz(timeZone).format(format);
};

// input is in local date // output is boolean
// returns true if date Supplied is greater than Equal to Today

var isDayGreaterThanEqToday = function isDayGreaterThanEqToday(_ref7) {
    var date = _ref7.date,
        timeZone = _ref7.timeZone,
        _ref7$today = _ref7.today,
        today = _ref7$today === undefined ? new Date() : _ref7$today;

    var dateNow = moment(today, FORMATS.SPACE_DOW_DATETIME).tz(getTimeZoneNameFromCode(timeZone)).startOf("day");
    var dateNoOffset = moment(date, FORMATS.SPACE_DOW_DATETIME).format(FORMATS.HYPHEN_YEAR_DATE);
    var eachDay = moment.tz(dateNoOffset, getTimeZoneNameFromCode(timeZone)).startOf("day");
    return eachDay.valueOf() >= dateNow.valueOf();
};

var startingDuration = moment.duration(0, "seconds");

var addDuration = function addDuration(duration1, duration2) {
    return duration1.add(duration2, "seconds");
};

var isBeforeToday = function isBeforeToday(date) {
    return isBefore(date, moment(), "day");
};

var isSameOrBeforeToday = function isSameOrBeforeToday(date) {
    return isSameOrBefore(date, moment(), "day");
};

var isSameOrBeforeDate = function isSameOrBeforeDate(date1, date2) {
    return isSameOrBefore(date1, moment(date2).format(FORMATS.HYPHEN_YEAR_DATE), "day");
};

// Returns a boolean after verifying if date is in the range of fromDate and toDate
var isDateWithinRange = function isDateWithinRange(date, fromDate, toDate) {
    return momentRange$1(date).within(momentRange$1.range(fromDate, toDate));
};

// Method to subtract months specified by the parameter numberofMonths from the given date
var subtractMonthsFromDate = function subtractMonthsFromDate(date, numberOfMonths) {
    return moment(date).subtract(numberOfMonths, "M");
};

/* This method checks if date falls in between n months ago
from the referenceDate and the referenceDate */
var isDateWithinPastNMonths = function isDateWithinPastNMonths(dt, refDate, n) {
    var date = moment(dt, [FORMATS.SLASH_MONTH_DATE, FORMATS.HYPHEN_YEAR_DATE]);
    var referenceDate = moment(refDate, [FORMATS.HYPHEN_MONTH_DATE, FORMATS.HYPHEN_YEAR_DATE]);
    var dateNmonthsAgoFromReferenceDate = subtractMonthsFromDate(referenceDate, n);
    return isDateWithinRange(date, dateNmonthsAgoFromReferenceDate, referenceDate);
};

var getMinDateDTLE = function getMinDateDTLE(date) {
    return new Date(moment.utc(date).format("llll"));
};

// ***** Utils moved from utils/string.js below******

// function to format time to HH:mm:ss
var formatTime = function formatTime(value) {
    return moment(value, [FORMATS.SPACE_DOW_DATETIMEZONE, FORMATS.HYPEN_YEAR_DATETIMEZONE]).tz(dafaultTimeZone).format(FORMATS.COLON_HOUR_TIME);
};

// function to format date time to MM/DD/YYYY HH:mm:ss z pacific
var formatDateTimeInPacific = function formatDateTimeInPacific(value, format) {
    return momentTimezone.tz(value, dafaultTimeZone).format(format);
};

// function to format date to normal form ignoring timeZone
var formatDateIgnoringTimeZone = function formatDateIgnoringTimeZone(value) {
    return value ? moment(value, [FORMATS.SPACE_DOW_DATETIMEZONE, FORMATS.HYPEN_YEAR_DATETIMEZONE]).utc().format(DATE_FORMAT()) : null;
};

// function to format dtle datepicker value
var formatDatePickerValueDTLE = function formatDatePickerValueDTLE(value) {
    return value ? moment(value, DATE_FORMAT()).format("L") : null;
};

// function to format date Time to Specific Timezone Code to MM/DD/YYYY HH:mm:ss z TIMEZONE
var formatDateTimeInZone = function formatDateTimeInZone(value, timeZone, format) {
    return moment(value, [FORMATS.HYPEN_YEAR_DATETIMEZONE]).tz(getTimeZoneNameFromCode(timeZone)).format(format);
};

// function to format date Time to Specific Timezone Name to MM/DD/YYYY HH:mm:ss z TIMEZONE
var formatDateTimeUsingZoneName = function formatDateTimeUsingZoneName() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var timeZone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dafaultTimeZone;
    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DATE_FORMAT();
    return momentTimezone.tz(value, timeZone).format(format);
};

// function to format date to Specific Timezone to MM/DD/YYYY
var formatDateInZone = function formatDateInZone(value, timeZone) {
    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultFormat();
    return momentTimezone.tz(value, getTimeZoneNameFromCode(timeZone)).format(format);
};

// converts our input field value from date fields to the way lot review WS accepts it
var formatValueToDate = function formatValueToDate(value) {
    return value ? moment(value, "YYYYMMDD").utc().format() : null;
};

// converts value from datepicker to date to save pickupClearance
var formatDatePickerValueToDate = function formatDatePickerValueToDate(value) {
    return value ? moment(value, DATE_FORMAT()).format() : null;
};

// ***** Utils moved from utils/string.js above******

var getNumberOfDiffInDaysUpToToday = function getNumberOfDiffInDaysUpToToday(assignmentDate) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DATE_FORMAT();
    return getNumberOfDays(assignmentDate, moment.utc(), format) - 1;
};

var setTimeForDateValues = function setTimeForDateValues(date) {
    if (date === null) {
        // to avoid null/cleared dates from being saved with garbage values
        return date;
    }
    var timeOffset = moment().format("THH:mm:ssZ");
    // return moment(date).tz(timeZone).format('YYYY-MM-DDTHH:mm:ssZ')
    return "" + moment(date).format("YYYY-MM-DD") + timeOffset;
};

var getDateObjectWithoutTimeZone = function getDateObjectWithoutTimeZone(value) {
    return moment(value).toDate();
};

var getDateObjectWithoutTimeZoneLocal = function getDateObjectWithoutTimeZoneLocal(value) {
    return moment(value).local().toDate();
};

/**
 * This util function gives us a date object with details from date formatted based on a timezone given
 * We are using this in G stack, to format the date in yard timezone
 * Called in:  `core/DatePicker.js`
 */
var getDateObjectInYardTimeZone = function getDateObjectInYardTimeZone(value, timeZone) {
    if (timeZone) {
        var dateObject = moment(value).tz(timeZone).format(FORMATS.HYPHEN_YEAR_DATETIME);
        var localTimeZoneOffsetFromUTC = moment(value).format("Z");
        var newDateObject = "" + dateObject + localTimeZoneOffsetFromUTC;
        return moment(newDateObject).toDate();
    }
    return getDateObjectWithoutTimeZone(value);
};

var getCurrentYear = function getCurrentYear() {
    return new Date().getFullYear();
};

var getCurrentTimeInSeconds = function getCurrentTimeInSeconds() {
    return parseInt(new Date().getTime() / 1000, 10);
};

var getOneYearFromNow = function getOneYearFromNow() {
    return getCurrentYear() + 1;
};

var getYearFromField = function getYearFromField(field) {
    return new Date(field).getFullYear();
};

var formatDateString = function formatDateString(date) {
    return moment(date).format("DD MMM, YYYY");
};

// returns max date year for first registration date depending on Model Year
var getMaxRegistrationDate = function getMaxRegistrationDate(modelYear) {
    if (modelYear.value) {
        var currentYear = new Date().getFullYear();
        var year = Math.min(modelYear.value + 5, currentYear);
        // setting max date to 31st december of the selected Year
        return year === currentYear ? new Date() : new Date(new Date().setFullYear(year, 11, 31));
    }
    return new Date();
};

var getNextDate = function getNextDate(date) {
    return moment(date).add(1, "days").toDate();
};

var getDateOnlyFromMoment = function getDateOnlyFromMoment(dateMoment) {
    return moment(dateMoment.format(DATE_FORMAT()), DATE_FORMAT()).local().toDate();
};

var getDateOnly = function getDateOnly(dateOrString) {
    return moment(moment(dateOrString).format(DATE_FORMAT())).toDate();
};

function getMaxOfTwoDates(date1, date2) {
    var date1Moment = moment(date1, [FORMATS.HYPHEN_YEAR_DATETIME_NO_T, FORMATS.HYPHEN_YEAR_DATE]).local();
    var date2Moment = moment(date2, [FORMATS.HYPHEN_YEAR_DATETIME_NO_T, FORMATS.HYPHEN_YEAR_DATE]).local();
    if (date1Moment.isBefore(date2Moment)) {
        return getDateOnlyFromMoment(date2Moment);
    }
    return getDateOnlyFromMoment(date1Moment);
}

function addDaysToDate(date, numberOfDays) {
    return moment(date).utc().add(numberOfDays, "d").toDate();
}

var getDateWithNoOffset = function getDateWithNoOffset(date) {
    return date ? moment(date).format("YYYY-MM-DD") : "";
};

var getIsDateNotInList = function getIsDateNotInList(list) {
    return function (date) {
        return !ramda.map(function (item) {
            return formatDateIgnoringTimeZone(item);
        }, list).includes(formatDateIgnoringTimeZone(date));
    };
};

var convertUTCDateTimeUsingTimeZone = function convertUTCDateTimeUsingTimeZone(dateTimeValue, timeZone) {
    return momentTimezone.tz(dateTimeValue, timeZone);
};

/**
 * This function validates if a date string or date object is valid or not.
 * @param {string|Date} date the date string or date object that needs to be validated.
 * @returns {boolean} true if valid, false if not.
 */
var validateDate = function validateDate(date) {
    return new Date(date).toString().indexOf("Invalid") === -1;
};

/**
 * This function sorts the data by a paramter in provided order.
 * @param {Array} list of objects to sort.
 * @param {String} parameter with which sort needs to be done.
 * @param {boolean} a boolean flag to determine sorting order, true for ascending, false for descending
 * @returns {Array} sorted list.
 */
var sortByDate = function sortByDate(list, ByParam, isAscending) {
    var orderedList = list.filter(function (listItem) {
        return validateDate(listItem[ByParam]);
    }).concat(list.filter(function (listItem) {
        return !validateDate(listItem[ByParam]);
    }));
    return orderedList.sort(function (a, b) {
        return isAscending ? new Date(a[ByParam]) - new Date(b[ByParam]) : new Date(b[ByParam]) - new Date(a[ByParam]);
    });
};

var formatDateByCountryCode = function formatDateByCountryCode(countryCode) {
    return function (value) {
        return moment.utc(value, FORMATS.SPACE_DOW_DATETIME).format(getDateFormat(countryCode));
    };
};

var date = /*#__PURE__*/Object.freeze({
    formatDateTimeToCustomTimeZone: formatDateTimeToCustomTimeZone,
    nowInUTC: nowInUTC,
    defaultFormat: defaultFormat,
    getDateFormat: getDateFormat,
    getDefaultDateRegion: getDefaultDateRegion,
    addDaysToToday: addDaysToToday,
    subtractDaysFromToday: subtractDaysFromToday,
    formatDatePickerValueToDateLR: formatDatePickerValueToDateLR,
    formatDateInPacific: formatDateInPacific,
    getMaxDate: getMaxDate,
    isSameOrBefore: isSameOrBefore,
    isBefore: isBefore,
    getLesserDateValue: getLesserDateValue,
    getBiggerDateValue: getBiggerDateValue,
    formatDateForCFR: formatDateForCFR,
    getNumberOfDays: getNumberOfDays,
    getValidatedDate: getValidatedDate,
    getStartDateValueDTLE: getStartDateValueDTLE,
    getEndDateValueDTLE: getEndDateValueDTLE,
    getZoneStartDateUTC: getZoneStartDateUTC,
    getZoneEndDateUTC: getZoneEndDateUTC,
    getLocalStartDateUTC: getLocalStartDateUTC,
    getLocalEndDateUTC: getLocalEndDateUTC,
    getLocalStartDate: getLocalStartDate,
    getLocalEndDate: getLocalEndDate,
    addYearsToDate: addYearsToDate,
    formatDate: formatDate,
    getISODate: getISODate,
    formatDateToYardTimeZone: formatDateToYardTimeZone,
    isDayGreaterThanEqToday: isDayGreaterThanEqToday,
    startingDuration: startingDuration,
    addDuration: addDuration,
    isBeforeToday: isBeforeToday,
    isSameOrBeforeToday: isSameOrBeforeToday,
    isSameOrBeforeDate: isSameOrBeforeDate,
    isDateWithinRange: isDateWithinRange,
    subtractMonthsFromDate: subtractMonthsFromDate,
    isDateWithinPastNMonths: isDateWithinPastNMonths,
    getMinDateDTLE: getMinDateDTLE,
    formatTime: formatTime,
    formatDateTimeInPacific: formatDateTimeInPacific,
    formatDateIgnoringTimeZone: formatDateIgnoringTimeZone,
    formatDatePickerValueDTLE: formatDatePickerValueDTLE,
    formatDateTimeInZone: formatDateTimeInZone,
    formatDateTimeUsingZoneName: formatDateTimeUsingZoneName,
    formatDateInZone: formatDateInZone,
    formatValueToDate: formatValueToDate,
    formatDatePickerValueToDate: formatDatePickerValueToDate,
    getNumberOfDiffInDaysUpToToday: getNumberOfDiffInDaysUpToToday,
    setTimeForDateValues: setTimeForDateValues,
    getDateObjectWithoutTimeZone: getDateObjectWithoutTimeZone,
    getDateObjectWithoutTimeZoneLocal: getDateObjectWithoutTimeZoneLocal,
    getDateObjectInYardTimeZone: getDateObjectInYardTimeZone,
    getCurrentYear: getCurrentYear,
    getCurrentTimeInSeconds: getCurrentTimeInSeconds,
    getOneYearFromNow: getOneYearFromNow,
    getYearFromField: getYearFromField,
    formatDateString: formatDateString,
    getMaxRegistrationDate: getMaxRegistrationDate,
    getNextDate: getNextDate,
    getDateOnly: getDateOnly,
    getMaxOfTwoDates: getMaxOfTwoDates,
    addDaysToDate: addDaysToDate,
    getDateWithNoOffset: getDateWithNoOffset,
    getIsDateNotInList: getIsDateNotInList,
    convertUTCDateTimeUsingTimeZone: convertUTCDateTimeUsingTimeZone,
    validateDate: validateDate,
    sortByDate: sortByDate,
    formatDateByCountryCode: formatDateByCountryCode
});

var substitute = function substitute(template, obj) {
    return template.replace(/\${([a-z0-9_]+)}/gi, function (match, capture) {
        return obj[capture];
    });
};

// Checks if value (string/array/object) exists
var exists = ramda.complement(ramda.anyPass([ramda.isNil, ramda.isEmpty]));

var isBlank = function isBlank(val) {
    return val == null || typeof val === "string" && !val.trim().length;
};

var getTimeZone = function getTimeZone(country) {
    var result = "";
    switch (country) {
        case "IND":
            result = "Asia/Kolkata";
            break;
        case "DEU":
            result = "Europe/Berlin";
            break;
        case "ESP":
            result = "Europe/Madrid";
            break;
        default:
            result = "America/Los_Angeles";
    }
    return result;
};

var getTimeZoneAbbreviation = function getTimeZoneAbbreviation(country) {
    var result = "";
    switch (country) {
        case "IND":
            result = "IST";
            break;
        case "DEU":
            result = "CEST";
            break;
        case "ESP":
            result = "CEST";
            break;
        default:
            result = "PST";
    }
    return result;
};

var getStandardTimezone = function getStandardTimezone() {
    var split = new Date().toString().split(" ");
    return "" + split[split.length - 1].replace(/[()]/g, "");
};

var showEditTzDate = function showEditTzDate(date, cntryCd) {
    return momentTimezone(new Date(date.getTime() + date.getTimezoneOffset() * 60000)).tz(getTimeZone(cntryCd))._d;
};

var getLocalISODate = function getLocalISODate(date) {
    return isString(date) ? date : new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
};

// function to format date to normal form

var formatTimeIgnoringTimeZone = function formatTimeIgnoringTimeZone(value) {
    return moment.utc(value).format("HH:mm:ss");
};

// function to format date to MM/DD/YYYY pacific
var formatDateInPacific$1 = function formatDateInPacific(value) {
    return moment.tz(value, "America/Los_Angeles").format("MM/DD/YYYY");
};

var formatSearchFilterDates = function formatSearchFilterDates(date, isToDate) {
    if (isToDate) {
        date.setMilliseconds(date.getMilliseconds() + ((24 * 60 - date.getTimezoneOffset()) * 60 * 1000 - 1));
    } else {
        date.setMilliseconds(date.getMilliseconds() - date.getTimezoneOffset() * 60 * 1000);
    }
    return date.toISOString();
};

var arrayToString = function arrayToString(array, path, delimiter) {
    var result = "";
    forEach(array, function (object) {
        var message = get(object, path);
        result = ramda.isNil(message) ? result : result + " " + message + delimiter;
    });
    return result;
};

var formatDateForCountry = function formatDateForCountry(value, country) {
    if (!value) {
        return "";
    }
    var timezone = getTimeZone(country);
    return momentTimezone(value, "YYYY-MM-DDTHH:mm:ssZ").tz(timezone).format("DD MMM, YYYY");
};

// custom function to format Date
var formatDateCustom = function formatDateCustom(date) {
    var tzSuffix = "T" + new Date().toISOString().split("T")[1];
    var year = date.getFullYear();
    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; // add 0 padding for single digits
    var day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate(); // add 0 padding for single digits
    return year + "-" + month + "-" + day + tzSuffix;
};

// Contracts custom date formatter need to check if the above method is sufficient
// export const formatDateCustom = (date) => {
//   const currentDate = new Date()
//   date.setHours(currentDate.getHours())
//   date.setMinutes(currentDate.getMinutes())
//   date.setSeconds(currentDate.getSeconds())
//   return date.toISOString()
// }

// custom function to format ISO Date in utc
var formatDateCustomUtc = function formatDateCustomUtc(date) {
    var tzSuffix = "T" + new Date().toISOString().split("T")[1].split(".")[0];
    var year = date.getFullYear();
    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; // add 0 padding for single digits
    var day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate(); // add 0 padding for single digits
    return year + "-" + month + "-" + day + tzSuffix + " UTC";
};

var formatDateUsingFormatString = function formatDateUsingFormatString(value, formatString) {
    var string = formatString || DATE_FORMAT;
    return isString(value) ? moment(value).utc().format(string) : moment(new Date(value)).format(string);
};

var dateCheck = function dateCheck(fromDate, toDate) {
    var cDate = formatDateUsingFormatString(new Date().toISOString(), "DD MMM, YYYY");
    return !!(moment(cDate).isSameOrAfter(fromDate, "day") && moment(cDate).isBefore(toDate, "day"));
};

var liveDateCheck = function liveDateCheck(fromDate, toDate) {
    var cDate = formatDateUsingFormatString(new Date().toISOString(), "DD MMM, YYYY");
    return !!(moment(cDate).isSameOrAfter(fromDate, "day") && moment(cDate).isSameOrBefore(toDate, "day"));
};

var futureDateCheck = function futureDateCheck(fromDate) {
    var cDate = formatDateUsingFormatString(new Date().toISOString(), "DD MMM, YYYY");
    return moment(cDate).isBefore(fromDate, "day");
};

// function to format date time to MM/DD/YYYY HH:mm:ss z pacific
var formatDateTimeInPacific$1 = function formatDateTimeInPacific(value, format) {
    return momentTimezone.tz(value, "America/Los_Angeles").format(format);
};

// function to format date to normal form ignoring timeZone
var formatDateIgnoringTimeZone$1 = function formatDateIgnoringTimeZone(value) {
    return value ? moment.utc(value).format(DATE_FORMAT) : null;
};

// function to format dtle datepicker value
var formatDatePickerValueDTLE$1 = function formatDatePickerValueDTLE(value) {
    return value ? moment(value, DATE_FORMAT).format("L") : null;
};

// function to format date Time to Specific Timezone to MM/DD/YYYY HH:mm:ss z TIMEZONE
var formatDateTimeInZone$1 = function formatDateTimeInZone(value, timeZone, format) {
    return momentTimezone.tz(value, getTimeZoneNameFromCode[timeZone]).format(format);
};

// converts our input field value from date fields to the way lot review WS accepts it
var formatValueToDate$1 = function formatValueToDate(value) {
    return value ? moment(value, "YYYYMMDD").utc().format() : null;
};

// converts value from datepicker to date to save pickupClearance
var formatDatePickerValueToDate$1 = function formatDatePickerValueToDate(value) {
    return value ? moment(value, DATE_FORMAT).format() : null;
};

// function to add padding to the values in the below function

function padding(value) {
    return ("0" + value).slice(-2);
}

// convert minutes to hh:mm to be displayed with call for release follow up due in time
var convertMinutesToHours = function convertMinutesToHours(minutes) {
    var minutesCoverted = minutes;
    var hours = Math.floor(minutes / 60);
    minutesCoverted = minutes % 60;
    return padding(hours) + ":" + padding(minutesCoverted);
};

// convert time given in hh:mm to minutes to be able to send them to the web service
var convertfollowUpInMinutes = function convertfollowUpInMinutes(value) {
    var hourArray = value.split(":");
    var minutesFromhours = Number(hourArray[0]) * 60;
    var minutes = hourArray[1];
    return Number(minutesFromhours) + Number(minutes);
};

// convert follow up from value entered to display in hh:mm
var formatFollowupEntry = function formatFollowupEntry(value) {
    var numeric = value.replace(/\D+/, "");
    var hours = "00";
    var minutes = "00";
    if (numeric.length > 2) {
        minutes = numeric.slice(-2);
        hours = Math.floor(numeric.length / 2) > 1 ? numeric.slice(0, 2) : ("0" + numeric).slice(0, 1);
    } else {
        hours = "00";
        minutes = ("00" + numeric).slice(-2);
    }
    return hours + ":" + minutes;
};

/*
 * Takes a string value and maxLength.
 * Returns an array of 2 split values if the length of string is more than maxLength
 * Returns the value otherwise
*/
var splitStringAtIndex = function splitStringAtIndex(value, maxLength) {
    var length = value.length;

    if (length > maxLength) {
        var part1 = value.substring(0, maxLength);
        var part2 = value.substring(maxLength);
        return [part1, part2];
    }
    return [value];
};

var trimEmail = function trimEmail(value) {
    return value.replace(/ /g, "");
};

/*
  Takes an object and the fields that need to be used to create string
  in given order. Then uses joinString to join the fields. Omits fields
  that are not mentioned in the fields array and fields that are not present
  in the object. Useful for creating address string from address object.
*/
var flattenObject = function flattenObject() {
    var fieldsObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var fieldsArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var joinString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ", ";

    var validFieldsArray = fieldsArray.map(function (field) {
        return ramda.propOr("", field, fieldsObj);
    }).filter(function (field) {
        return field;
    });
    return ramda.join(joinString, validFieldsArray);
};

var string = /*#__PURE__*/Object.freeze({
    substitute: substitute,
    exists: exists,
    isBlank: isBlank,
    getTimeZone: getTimeZone,
    getTimeZoneAbbreviation: getTimeZoneAbbreviation,
    getStandardTimezone: getStandardTimezone,
    showEditTzDate: showEditTzDate,
    getLocalISODate: getLocalISODate,
    formatTimeIgnoringTimeZone: formatTimeIgnoringTimeZone,
    formatDateInPacific: formatDateInPacific$1,
    formatSearchFilterDates: formatSearchFilterDates,
    arrayToString: arrayToString,
    formatDateForCountry: formatDateForCountry,
    formatDateCustom: formatDateCustom,
    formatDateCustomUtc: formatDateCustomUtc,
    formatDateUsingFormatString: formatDateUsingFormatString,
    dateCheck: dateCheck,
    liveDateCheck: liveDateCheck,
    futureDateCheck: futureDateCheck,
    formatDateTimeInPacific: formatDateTimeInPacific$1,
    formatDateIgnoringTimeZone: formatDateIgnoringTimeZone$1,
    formatDatePickerValueDTLE: formatDatePickerValueDTLE$1,
    formatDateTimeInZone: formatDateTimeInZone$1,
    formatValueToDate: formatValueToDate$1,
    formatDatePickerValueToDate: formatDatePickerValueToDate$1,
    convertMinutesToHours: convertMinutesToHours,
    convertfollowUpInMinutes: convertfollowUpInMinutes,
    formatFollowupEntry: formatFollowupEntry,
    splitStringAtIndex: splitStringAtIndex,
    trimEmail: trimEmail,
    flattenObject: flattenObject
});

var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
    } else {
        return Array.from(arr);
    }
};

var copyToClipboard = function copyToClipboard(text) {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
};

var toObject = function toObject(form) {
    if (!form || form.nodeName !== "FORM") {
        return {};
    }
    var obj = {};
    var j = 0;
    var elements = form.elements;

    for (var i = elements.length - 1; i >= 0; i -= 1) {
        var currentElement = elements[i];
        if (currentElement.name === "") {
            continue; /* eslint-disable-line no-continue */
        }
        switch (currentElement.nodeName) {
            case "INPUT":
                switch (currentElement.type) {
                    case "text":
                    case "email":
                    case "hidden":
                    case "password":
                    case "button":
                    case "reset":
                    case "submit":
                        obj[currentElement.name] = currentElement.value;
                        break;
                    case "checkbox":
                    case "radio":
                        if (currentElement.checked) {
                            obj[currentElement.name] = currentElement.value;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case "TEXTAREA":
                obj[currentElement.name] = currentElement.value;
                break;
            case "SELECT":
                switch (currentElement.type) {
                    case "select-one":
                        obj[currentElement.name] = currentElement.value;
                        break;
                    case "select-multiple":
                        {
                            if (currentElement.options && currentElement.options.length) {
                                for (j = currentElement.options.length - 1; j >= 0; j -= 1) {
                                    if (currentElement.options[j].selected) {
                                        obj[currentElement.name] = currentElement.options[j].value;
                                    }
                                }
                            }

                            break;
                        }

                    default:
                        break;
                }
                break;
            case "BUTTON":
                switch (currentElement.type) {
                    case "reset":
                    case "submit":
                    case "button":
                        obj[currentElement.name] = currentElement.value;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
    return obj;
};

var objectToQuery = function objectToQuery(obj) {
    var parts = [];
    Object.keys(obj).forEach(function (elem) {
        if (Array.isArray(obj[elem])) {
            [].concat(toConsumableArray(new Set(obj[elem]))).map(function (val) {
                return parts.push(encodeURIComponent(elem) + "=" + encodeURIComponent(val));
            });
        } else {
            parts.push(encodeURIComponent(elem) + "=" + encodeURIComponent(obj[elem]));
        }
    });
    return parts.join("&");
};

var serialize = function serialize(form) {
    var obj = toObject(form);
    return objectToQuery(obj);
};

var isClean = function isClean(x) {
    return !(ramda.isNil(x) || x === "");
};
var cleanData = function cleanData(data) {
    return ramda.filter(isClean, data);
};

var removeEmpty = function removeEmpty(obj) {
    var nonEmptyObj = {};
    Object.keys(obj).forEach(function (elem) {
        if (obj[elem] && !(obj[elem] === "A")) {
            nonEmptyObj[elem] = obj[elem];
        }
    });
    return nonEmptyObj;
};

var dotToObj = function dotToObj(obj) {
    var newObj = {};
    Object.keys(obj).forEach(function (k) {
        var parts = k.split(".");
        var parentKey = parts.shift();
        newObj[parentKey] = parts.reverse().reduce(function (o, i) {
            var res = {};
            res[i] = o;
            return res;
        }, obj[k]);
    });
    return newObj;
};

var form = /*#__PURE__*/Object.freeze({
    copyToClipboard: copyToClipboard,
    toObject: toObject,
    objectToQuery: objectToQuery,
    serialize: serialize,
    cleanData: cleanData,
    removeEmpty: removeEmpty,
    dotToObj: dotToObj
});

var index = (function (locales, currentLanguage) {
    return function (text) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        if (!text) {
            return "";
        }
        var translatedPhrases = locales[currentLanguage];
        var translation = typeof translatedPhrases[text] === "function" ? translatedPhrases[text](args) : translatedPhrases[text];
        if (translation !== undefined && translation !== null) return translation;

        var arr = text.split(".");

        if (ramda.isEmpty(arr)) {
            return text.toString();
        }
        if (arr && arr.length === 1) {
            var translatedValue = translatedPhrases[text];
            return translatedValue ? translatedValue.toString() : text.toString();
        }
        if (arr.length > 1) {
            arr.map(function (object) {
                if (translatedPhrases) {
                    translatedPhrases = translatedPhrases[object];
                }
                return translatedPhrases;
            });
        }
        return translatedPhrases ? translatedPhrases.toString() : text;
    };
});

// export default (text) => locales[currentLocale][text]

// IMPORTANT:
// you MUST call forceUpdate() on the topmost Component
// after calling this function to prevent the incorrect
// language from showing
var changeLocale = function changeLocale(languageCode
    // currentLocale = languageCode;
) {
    return languageCode;
};

var locale = /*#__PURE__*/Object.freeze({
    default: index,
    changeLocale: changeLocale
});

var countryLocaleMapper = function countryLocaleMapper(cntryCode) {
    return {
        DEU: "de-DE",
        ESP: "de-DE",
        IND: "en-IN",
        USA: "en-US"
    }[cntryCode];
};

var formatCurrency = function formatCurrency(value, currencyStyle) {
    var clocale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : countryLocaleMapper("USA");
    return "" + new Intl.NumberFormat(clocale, {
        style: "currency",
        currency: "" + currencyStyle,
        currencyDisplay: "" + (currencyDisplayMap(currencyStyle) || "symbol")
    }).format(value);
};

var zeroDollars = function zeroDollars(currencyCode) {
    return formatCurrency(0, currencyCode);
};

var stripDownCurrency = function stripDownCurrency() {
    var currencyValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return currencyValue.toString().replace(CURRENCY_STRIP_DOWN_REGEX, currencyReplaceValue);
};

/*
  This function rounds off a given currency field value to 2 declimals by default.
  2 decimals is a standard for payment fields across other applications as well.
*/
var roundCurrency = function roundCurrency(value) {
    var roundOffDecimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return +(+value || 0).toFixed(roundOffDecimal);
};

var currency = /*#__PURE__*/Object.freeze({
    countryLocaleMapper: countryLocaleMapper,
    zeroDollars: zeroDollars,
    stripDownCurrency: stripDownCurrency,
    roundCurrency: roundCurrency,
    default: formatCurrency
});

var minimumLength = function minimumLength(length, value, message) {
    return !isBlank(value) && String(value).trim().length < length ? message : undefined;
};

var isFieldRequired = function isFieldRequired(editable, required, value, message) {
    return required && editable && isBlank(value) ? message : undefined;
};

var maximumValue = function maximumValue(maximumNumber, value, message) {
    return !isBlank(value) && value > maximumNumber ? message : undefined;
};

var minimumValue = function minimumValue(minimumNumber, value, message) {
    return !isBlank(value) && value < minimumNumber ? message : undefined;
};

var isValueInOptions = function isValueInOptions(allValues, value, message) {
    return isBlank(value) || allValues.includes(value) ? undefined : message;
};

var isCurrency = function isCurrency(value, message) {
    return isBlank(value) || CURRENCY_PATTERN.test(String(value).trim()) ? undefined : message;
};

var isInteger = function isInteger(value, message) {
    return !isBlank(value) && /\D/.test(String(value).trim()) ? message : undefined;
};

var isDecimal = function isDecimal(value, requiredMessage, minDecimalMessage) {
    var retMessage = !isBlank(value) && /([^\d.]+|\..*\.)/.test(String(value).trim()) ? requiredMessage : undefined;
    if (!retMessage || retMessage === "") {
        retMessage = !isBlank(value) && /^[0-9]+\.[0-9]{3,}$/.test(String(value).trim()) ? minDecimalMessage : undefined;
    }
    return retMessage;
};

var checkIfEmailIsValid = function checkIfEmailIsValid(value, message) {
    return isBlank(value) || isValidEmail(value) ? undefined : message;
};

var phoneNumberValidation = function phoneNumberValidation(value) {
    var isRequired = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var countryCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var requiredMessage = arguments[3];
    var minLengthMessage = arguments[4];
    var maxLengthMessage = arguments[5];

    var dialCode = countryCodeToDialCodeMapper(countryCode);
    var text = value && value.toString().replace(/\D/g, "");
    if ((isBlank(text) || text === dialCode) && isRequired) {
        return requiredMessage;
    }
    if (!isBlank(text)) {
        if (text !== dialCode && text.length < 9) {
            return minLengthMessage;
        }
        if (text.length > 15) {
            return maxLengthMessage;
        }
    }
    return "";
};

var compose = function compose(validators) {
    return validators.reduceRight(function (combined, fn) {
        return function (val) {
            return fn(val) || combined(val);
        };
    }, function () {
        return undefined;
    });
};

var validate = /*#__PURE__*/Object.freeze({
    minimumLength: minimumLength,
    isFieldRequired: isFieldRequired,
    maximumValue: maximumValue,
    minimumValue: minimumValue,
    isValueInOptions: isValueInOptions,
    isCurrency: isCurrency,
    isInteger: isInteger,
    isDecimal: isDecimal,
    checkIfEmailIsValid: checkIfEmailIsValid,
    phoneNumberValidation: phoneNumberValidation,
    compose: compose
});

// -----------------------------------
//  Utility to create unique id on UI
// -----------------------------------
var generateUiId = function generateUiId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
};

var common = /*#__PURE__*/Object.freeze({
    generateUiId: generateUiId
});

var index$1 = {
    date: date,
    string: string,
    form: form,
    regex: regex,
    locale: locale,
    currency: currency,
    validate: validate,
    common: common
    // case: casing,
};

module.exports = index$1;
//# sourceMappingURL=frontendutil.cjs.js.map
