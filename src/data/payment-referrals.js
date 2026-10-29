// GA4 "List unwanted referrals" rows. `match` is GA4's own match type, `value` goes into its field as is.
// Regex rows run as a full match on the referral domain, so subdomains are listed in the pattern.
// `samples` are hostnames the regex must match; test/referral-exclusions.test.mjs checks them.
// `group` puts the row into one section of the list; a section can be merged into one regex row.
// `service` ties a row to one entry in `services`: the row shows only when that service is in use.
// Rows without a service always show.
// One row per domain: a new subdomain or TLD of a domain that already has a regex row goes into that
// regex, not into a new row. The test rejects rows that another row already covers.
// Labels shown in the list are in the language files
export const matchTypes = {
  regex: { ga4: "matches RegEx" },
  contains: { ga4: "contains" },
};

// Order here is the order of the sections in the list; their names are in the language files
export const groups = ["banks", "payments", "cards", "international"];

export const services = {
  shopify: "Shopify",
  checkout: "Checkout Finland",
  paypal: "PayPal",
  paytrail: "Paytrail",
  mobilepay: "MobilePay / Vipps",
  klarna: "Klarna",
  stripe: "Stripe",
  adyen: "Adyen",
  nets: "Nets",
};

const contains = (value, group, service) => ({ match: "contains", value, group, service });
const regex = (value, samples, group, service) => ({ match: "regex", value, samples, group, service });

export const rows = [
  // Banks and identification
  regex("(?:(ebank|auth|ftn)\\.)?aktia\\.fi", ["aktia.fi", "ebank.aktia.fi", "ftn.aktia.fi"], "banks"),
  regex("(?:(ostalaskulla|op\\-lasku\\.rahoitus|verkkomaksu|saml\\-idp)\\.)?op\\.fi", ["op.fi", "op-lasku.rahoitus.op.fi", "verkkomaksu.op.fi", "saml-idp.op.fi"], "banks"),
  regex("(?:(auth)\\.)?nordicapigateway\\.com", ["auth.nordicapigateway.com"], "banks"),
  regex("(?:(epmt|tupas|identify)\\.)?nordea\\.(fi|com)", ["epmt.nordea.fi", "identify.nordea.com"], "banks"),
  regex("(?:(verkkomaksu|tupas|tunnistus)\\.)?poppankki\\.fi", ["tupas.poppankki.fi", "tunnistus.poppankki.fi"], "banks"),
  regex("(?:(verkkomaksu|tupas|tunnistus)\\.)?saastopankki\\.fi", ["verkkomaksu.saastopankki.fi", "tunnistus.saastopankki.fi"], "banks"),
  regex("(?:(verkkomaksu|tupas|tunnistus)\\.)?handelsbanken\\.fi", ["tunnistus.handelsbanken.fi"], "banks"),
  regex("(?:(verkkomaksu|tunnistus)\\.)?omasp\\.fi", ["verkkomaksu.omasp.fi", "tunnistus.omasp.fi"], "banks"),
  regex("(?:(verkkopankki[12]?|business|ebanking|publicmobilepay|userapi2|webpayments)\\.)?danskebank\\.(fi|com)", ["verkkopankki1.danskebank.fi", "verkkopankki.danskebank.fi", "userapi2.danskebank.com", "webpayments.danskebank.fi", "danskebank.com"], "banks"),
  contains("online.alandsbanken.fi", "banks"),
  contains("online.s-pankki.fi", "banks"),
  contains("tunnistautuminen.suomi.fi", "banks"),
  contains("id.signicat.com", "banks"),
  contains("pay.siirto.fi", "banks"),

  // Payment services
  regex("(?:(public|products|pay)\\.)?mobilepay\\.(dk|fi)", ["public.mobilepay.dk", "pay.mobilepay.fi"], "payments", "mobilepay"),
  regex("(?:(pay|api)\\.)?checkout\\.fi", ["pay.checkout.fi"], "payments", "checkout"),
  regex("(services|pay|payment).paytrail.com", ["services.paytrail.com"], "payments", "paytrail"),
  regex("(?:(pay|checkout|cards\\-eu|checkout\\-eu|checkout\\-client)\\.)?klarna\\.com", ["cards-eu.klarna.com"], "payments", "klarna"),
  regex("(?:(epayment|ident)\\.)?nets\\.eu", ["epayment.nets.eu", "ident.nets.eu"], "payments", "nets"),
  regex("(live|acs\\-live\\-eu|checkoutshopper\\-live)\\.adyen\\.com", ["live.adyen.com", "checkoutshopper-live.adyen.com"], "payments", "adyen"),
  contains("klarnapayments.com", "payments", "klarna"),
  contains("hooks.stripe.com", "payments", "stripe"),
  contains("eu.adyen.link", "payments", "adyen"),
  contains("paypal.com", "payments", "paypal"),
  contains("checkout.shopify.com", "payments", "shopify"),
  contains("myshopify.com", "payments", "shopify"),
  contains("maksuturva.fi", "payments"),
  contains("vismapay.com", "payments"),
  contains("paymenthighway.io", "payments"),
  contains("svea.com", "payments"),
  contains("payment.quickpay.net", "payments"),
  contains("checkout.reepay.com", "payments"),
  contains("payex.com", "payments"),
  contains("services.epassi.fi", "payments"),
  contains("checkout.smartum.fi", "payments"),
  contains("edenred.fi", "payments"),
  contains("secure.jousto.com", "payments"),
  contains("checkout.walleypay.com", "payments"),

  // Card authentication (3D Secure) processors, whole domain unless the host is a single one
  regex("(?:(acs1|acs2|dmp2)\\.)?luottokunta\\.fi", ["acs1.luottokunta.fi"], "cards"),
  regex("safekey\\-[23]\\.americanexpress\\.com", ["safekey-2.americanexpress.com", "safekey-3.americanexpress.com"], "cards"),
  contains("wlp-acs.com", "cards"),
  contains("modirum.com", "cards"),
  contains("enfuce.com", "cards"),
  contains("arcot.com", "cards"),
  contains("securecode.com", "cards"),
  contains("verifiedbyvisa.com", "cards"),
  contains("gpesecure.com", "cards"),
  contains("mycardsecure.com", "cards"),
  contains("cardinalcommerce.com", "cards"),
  contains("foriseu-vbv.mycardplace.com", "cards"),
  contains("3ds.nexigroup.com", "cards"),
  contains("authentication-acs.marqeta.com", "cards"),
  contains("acs.apata.io", "cards"),
  contains("pay.eewosecure.com", "cards"),
  contains("3dsecure.no", "cards"),
  contains("acs2.swedbank.se", "cards"),
  contains("acs.revolut.com", "cards"),

  // International services and banks
  contains("diensten.asnbank.nl", "international"),
  contains("betalen.rabobank.nl", "international"),
  contains("acs2-3dsecure.creditmutuel.fr", "international"),
  contains("acs4.privatbank.ua", "international"),
  contains("secure.helpscout.net", "international"),
  contains("acs.luminorgroup.com", "international"),
  contains("edb.com", "international"),
];

// GA4 reads regex with RE2: no lookaround, no backreferences, \p only as \p{...}
export const isRe2Safe = (pattern) => !/\(\?<?[=!]|\\[1-9]|\\[pP](?!\{)/.test(pattern);

// Does an existing row already match this host? Regex rows match the whole host, contains rows any part of it.
export const rowMatches = (row, host) =>
  row.match === "contains" ? host.includes(row.value) : new RegExp(`^(?:${row.value})$`).test(host);
