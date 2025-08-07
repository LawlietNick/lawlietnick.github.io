---
title: "Cookiebot guide"
description: "Simplified and Prettified guide"
date: "Aug 07 2025"
---

## Step 1 - Add Google Consent Mode v2 to website's code

Paste the following code as high in to the 	**\<head\>** of the page as possible. In wordpress this should be loaded before 	**wp_head** loop

```js
<!-- The initial config of Consent Mode v2 -->
<script type="text/javascript" data-cookieconsent="ignore">
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('consent', 'default', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 1500,
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', false);
</script>
```

## Step 2 - Add Cookiebot code to website's code
Paste the following code as high in to the 	**\<head\>** of the page as possible. If GTM is added using plugin such as [Google Tag Manager for Wordpress](https://wordpress.org/plugins/duracelltomi-google-tag-manager/). If you do not want the automated blocking mode you can use [async/defer](https://support.cookiebot.com/hc/en-us/articles/360009074960-Automatic-cookie-blocking)

```js
<script 
type="text/javascript" 
id="Cookiebot" 
src="https://consent.cookiebot.com/uc.js" 
data-cbid="YOUR COOKIEBOT ID HERE"
data-blockingmode="auto"
data-culture="en"
></script>

```
When you want to show the banner in different languages, example for different language versions and you do not want automatic language detection to be used.

| Language | Code in 'data-culture' |
| :---- | :-- |
Arabic | AR
Bulgarian | BG
Catalan | CA
Czech | CS
Welsh | CY
Danish | DA
Deutsch | DE
Greek (modern) | EL
English | EN
Spanish | ES
Estonian | ET
Basque | EU
Finnish | FI
French | FR
Irish | GA
Hebrew | HE
Hindi | HI
Croatian | HR
Hungarian | HU
Indonesian | ID
Icelandic | IS
Italian | IT
Japanese | JA
Korean | KO
Lithuanian | LT
Latvian | LV
Macedonian | MK
Malay | MS
Norwegian Bokmål | NB
Dutch | NL
Polish | PL
Portuguese | PT
Brazilian Portuguese | PT-BR
Romanian | RO
Russian | RU
Sinhalese | SI
Slovak | SK
Slovenian | SL
Albanian | SQ
Serbian | SR
Swedish | SV
Tamil | TA
Thai | TH
Turkish | TR
Ukrainian | UK
Vietnamese | VI
Chinese | ZH
Traditional Chinese | ZH-HANT

## Step 3 - Add Cookiebot declaration code to website's cookie listing page

Paste the following code as to the page that lists cookies.

```js

<script 
type="text/javascript"
id="CookieDeclaration"
src="https://consent.cookiebot.com/YOUR COOKIEBOT ID HERE/cd.js" 
defer
data-culture="en"
></script>
```

## Step 4 - Add "renew consent"-button
If you want to have a renew button in different location than the default floating button on the left site. A button can be added to website's footer. Copy following code and add styling if needed.

```html

<button onclick="javascript:Cookiebot.renew();">
  Renew Consent
</button>
```         

## Step 5 - Check Google Consent Mode in Console
1. Before accepting any cookies open Console and Copy following code to console.
After excecution you should see denied for all except security_storage.

```js

// Helper functions for status string and color
const consentStatusString = status => status === undefined ? "" : status ? "granted" : "denied";
const consentStatusColor = status => status === "granted" ? "color: #4AF626" : "color: #ef2929";
    
(() => {
  if (!("google_tag_data" in window) || !window.google_tag_data?.ics?.entries) {
    console.log("No Consent Mode data found");
    return;
  }
    
  const consentEntries = window.google_tag_data.ics.entries;
    
  // Process each consent entry, except 'wait_for_update'
  for (const entry in consentEntries) {
    if (entry === 'wait_for_update') continue; // Skip 'wait_for_update'

    const defaultStatus = consentStatusString(consentEntries[entry]['default']);
    const updateStatus = consentStatusString(consentEntries[entry]['update']);
    
    console.log(`%c${entry}`, 'font-weight: bold; font-size: 14px;');
    
    // Check and log default status
    if (defaultStatus !== "") {
      console.log(`\tdefault: %c${defaultStatus}`, consentStatusColor(defaultStatus));
    } else {
      console.log(`\tdefault: not found`);
    }
    
    // Check and log update status
    if (updateStatus !== "") {
      console.log(`\tupdate: %c${updateStatus}`, consentStatusColor(updateStatus));
    } else {
      console.log(`\tupdate: not found`);
    }
  }
    
  // Check and display 'wait_for_update' if it exists
  if ('wait_for_update' in consentEntries) {
    console.log(`%cwait_for_update`, 'font-weight: bold; font-size: 14px;');
    
    // Safely access the data layer for the initial configuration
    const initialConfig = window.dataLayer?.find(item => item[0] === 'consent' && item[1] === 'default');
    const waitForUpdate = initialConfig?.[2]?.wait_for_update ?? 'not found';
    
    // Apply a specific color to the wait_for_update value
    console.log(`\tdefault: %c${waitForUpdate}`, 'color: #FFA500'); // Using orange color as an example
  }
})();
```
