___TERMS_OF_SERVICE___

By creating or modifying this file you agree to Google Tag Manager's Community
Template Gallery Developer Terms of Service available at
https://developers.google.com/tag-manager/gallery-tos (or such other URL as
Google may provide), as modified from time to time.


___INFO___

{
  "type": "TAG",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "HubSpot Form Tracking",
  "brand": {
    "id": "niko-karppinen",
    "displayName": "Niko Karppinen"
  },
  "description": "Tracks successful HubSpot form submissions and pushes configurable form metadata to the dataLayer, with optional category, type and name parsing.",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "TEXT",
    "name": "endpoint",
    "displayName": "Lookup endpoint",
    "simpleValueType": true,
    "defaultValue": "https://forms-api.example.com",
    "alwaysInSummary": true
  },
  {
    "type": "SELECT",
    "name": "eventNameType",
    "displayName": "dataLayer event name",
    "macrosInSelect": true,
    "selectItems": [
      {
        "value": "hubspot_form_success",
        "displayValue": "HubSpot Form Success"
      },
      {
        "value": "generate_lead",
        "displayValue": "Generate Lead"
      },
      {
        "value": "form_submit",
        "displayValue": "Form Submit"
      },
      {
        "value": "custom",
        "displayValue": "Custom"
      }
    ],
    "simpleValueType": true,
    "defaultValue": "hubspot_form_success",
    "alwaysInSummary": false
  },
  {
    "type": "TEXT",
    "name": "customEventName",
    "displayName": "Custom event name",
    "simpleValueType": true,
    "enablingConditions": [
      {
        "paramName": "eventNameType",
        "paramValue": "custom",
        "type": "EQUALS"
      }
    ]
  },
  {
    "type": "CHECKBOX",
    "name": "customizeDataLayerSettings",
    "checkboxText": "Customize dataLayer output",
    "simpleValueType": true,
    "defaultValue": false
  },
  {
    "type": "GROUP",
    "name": "dataLayerOutputSettings",
    "displayName": "dataLayer output settings",
    "groupStyle": "NO_ZIPPY",
    "subParams": [
      {
        "type": "TEXT",
        "name": "formIdParameter",
        "displayName": "Form ID parameter",
        "simpleValueType": true,
        "defaultValue": "hubspot_form_id"
      },
      {
        "type": "TEXT",
        "name": "formNameParameter",
        "displayName": "Form name parameter",
        "simpleValueType": true,
        "defaultValue": "hubspot_form_name"
      },
      {
        "type": "TEXT",
        "name": "instanceIdParameter",
        "displayName": "Instance ID parameter",
        "simpleValueType": true,
        "defaultValue": "hubspot_form_instance_id"
      },
      {
        "type": "CHECKBOX",
        "name": "splitFormName",
        "checkboxText": "Split form name into category, type and name",
        "simpleValueType": true,
        "defaultValue": false
      },
      {
        "type": "GROUP",
        "name": "formAdditionalSettings",
        "displayName": "Form additional settings",
        "groupStyle": "NO_ZIPPY",
        "subParams": [
          {
            "type": "GROUP",
            "name": "formCategorySettings",
            "displayName": "Category settings",
            "groupStyle": "NO_ZIPPY",
            "subParams": [
              {
                "type": "TEXT",
                "name": "formCategoryParameter",
                "displayName": "Form category parameter",
                "simpleValueType": true,
                "defaultValue": "hubspot_form_category"
              },
              {
                "type": "TEXT",
                "name": "formCategorySeparator",
                "displayName": "Category / type separator",
                "simpleValueType": true,
                "defaultValue": ":",
                "help": "Character used between category and type. Example: Support : Return Request"
              }
            ]
          },
          {
            "type": "GROUP",
            "name": "typeAndNameSettings",
            "displayName": "Type settings",
            "groupStyle": "NO_ZIPPY",
            "subParams": [
              {
                "type": "TEXT",
                "name": "formTypeParameter",
                "displayName": "Form type parameter",
                "simpleValueType": true,
                "defaultValue": "hubspot_form_type"
              },
              {
                "type": "TEXT",
                "name": "formNameSeparator",
                "displayName": "Type / name separator",
                "simpleValueType": true,
                "defaultValue": "|",
                "help": "Character used between type and name. Example: Return Request | Start a Return"
              }
            ]
          }
        ],
        "enablingConditions": [
          {
            "paramName": "splitFormName",
            "paramValue": true,
            "type": "EQUALS"
          }
        ]
      }
    ],
    "enablingConditions": [
      {
        "paramName": "customizeDataLayerSettings",
        "paramValue": true,
        "type": "EQUALS"
      }
    ]
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

const injectScript = require('injectScript');
const encodeUriComponent = require('encodeUriComponent');


/*
 * -------------------------------------------------------
 * TRACKER CONFIGURATION
 * -------------------------------------------------------
 *
 * Update TRACKER_VERSION when you release a new
 * browser tracker version.
 */

const TRACKER_VERSION = '1';

const TRACKER_PATH =
  '/hubspot-form-tracker.js';


/*
 * -------------------------------------------------------
 * BASIC SETTINGS
 * -------------------------------------------------------
 */

const endpoint = data.endpoint;

let eventName =
  data.eventNameType;

if (data.eventNameType === 'custom') {
  eventName =
    data.customEventName;
}

if (!endpoint || !eventName) {
  data.gtmOnFailure();
  return;
}


/*
 * -------------------------------------------------------
 * DATALAYER OUTPUT SETTINGS
 * -------------------------------------------------------
 */

const customizeDataLayerSettings =
  data.customizeDataLayerSettings === true;


/*
 * Default output parameter names.
 */

const formIdParameter =
  data.formIdParameter ||
  'hubspot_form_id';

const formNameParameter =
  data.formNameParameter ||
  'hubspot_form_name';

const instanceIdParameter =
  data.instanceIdParameter ||
  'hubspot_form_instance_id';


/*
 * -------------------------------------------------------
 * FORM NAME SPLITTING
 * -------------------------------------------------------
 *
 * Disabled by default.
 *
 * Expected naming convention:
 *
 * Category : Type | Name
 *
 * Example:
 *
 * Support : Return Request | Start a Return
 */

const splitFormName =
  customizeDataLayerSettings &&
  data.splitFormName === true;


/*
 * Category settings.
 */

const formCategoryParameter =
  data.formCategoryParameter ||
  'hubspot_form_category';

const formCategorySeparator =
  data.formCategorySeparator ||
  ':';


/*
 * Type settings.
 */

const formTypeParameter =
  data.formTypeParameter ||
  'hubspot_form_type';

const formNameSeparator =
  data.formNameSeparator ||
  '|';


/*
 * -------------------------------------------------------
 * ENDPOINT
 * -------------------------------------------------------
 */

let baseUrl =
  endpoint;

if (
  baseUrl.charAt(
    baseUrl.length - 1
  ) === '/'
) {
  baseUrl =
    baseUrl.substring(
      0,
      baseUrl.length - 1
    );
}


/*
 * -------------------------------------------------------
 * TRACKER URL
 * -------------------------------------------------------
 */

let scriptUrl =
  baseUrl +
  TRACKER_PATH +
  '?v=' +
  TRACKER_VERSION +
  '&event=' +
  encodeUriComponent(eventName);


/*
 * -------------------------------------------------------
 * CUSTOM DATALAYER SETTINGS
 * -------------------------------------------------------
 */

if (customizeDataLayerSettings) {

  scriptUrl =
    scriptUrl +
    '&customizeDataLayerSettings=1' +
    '&formIdParameter=' +
    encodeUriComponent(
      formIdParameter
    ) +
    '&formNameParameter=' +
    encodeUriComponent(
      formNameParameter
    ) +
    '&instanceIdParameter=' +
    encodeUriComponent(
      instanceIdParameter
    );

} else {

  scriptUrl =
    scriptUrl +
    '&customizeDataLayerSettings=0';
}


/*
 * -------------------------------------------------------
 * FORM NAME SPLITTING
 * -------------------------------------------------------
 *
 * Always send splitFormName explicitly.
 *
 * Default:
 * splitFormName=0
 */

if (splitFormName) {

  scriptUrl =
    scriptUrl +
    '&splitFormName=1' +

    /*
     * Category settings.
     */

    '&formCategoryParameter=' +
    encodeUriComponent(
      formCategoryParameter
    ) +

    '&formCategorySeparator=' +
    encodeUriComponent(
      formCategorySeparator
    ) +

    /*
     * Type settings.
     */

    '&formTypeParameter=' +
    encodeUriComponent(
      formTypeParameter
    ) +

    '&formNameSeparator=' +
    encodeUriComponent(
      formNameSeparator
    );

} else {

  scriptUrl =
    scriptUrl +
    '&splitFormName=0';
}


/*
 * -------------------------------------------------------
 * LOAD TRACKER
 * -------------------------------------------------------
 */

injectScript(
  scriptUrl,
  data.gtmOnSuccess,
  data.gtmOnFailure,
  scriptUrl
);


___WEB_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "inject_script",
        "versionId": "1"
      },
      "param": [
        {
          "key": "urls",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "https://forms-api.example.com/*"
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios: []


___NOTES___

Created on 9/20/2026, 7:04:39 PM


