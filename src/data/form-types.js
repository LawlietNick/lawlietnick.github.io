// Controlled form taxonomy.
// Pushed to the dataLayer as `form_full_name`, in the format
// "Category : Type | Form Name" — see formValue() below.
// Category and Type come from this list. Form Name is free text from whoever
// built the form. The two delimiters differ on purpose: the uncontrolled name
// is fenced by " | ", so a colon inside a name can never corrupt the category
// or type. Spacing is part of the value — "Lead:Contact" is a different string.

export const DELIM_TYPE = " : ";
export const DELIM_NAME = " | ";

/** Build the tracked value. Delimiters inside segments are stripped, not escaped. */
export function formValue(category, type, name = "") {
  const clean = (s) => String(s).replace(/[|:]/g, "").replace(/\s+/g, " ").trim();
  const base = `${clean(category)}${DELIM_TYPE}${clean(type)}`;
  return name.trim() ? `${base}${DELIM_NAME}${clean(name)}` : base;
}

export const formCategories = [
  {
    "id": "Lead",
    "blurb": "A visitor expresses commercial interest in a product, service or potential purchase by providing information or requesting a next step. Includes existing customers showing interest in an additional product, service or purchase.",
    "action": "Raising a hand",
    "hint": "Commercial interest",
    "examples": "Contact sales, demo request, quote, gated download"
  },
  {
    "id": "Subscribe",
    "blurb": "Marketing permission, given or withdrawn.",
    "action": "Asking for messages",
    "hint": "Marketing permission",
    "examples": "Newsletter signup, unsubscribe, job alerts"
  },
  {
    "id": "Transaction",
    "blurb": "Money committed, or a booking that delivers a paid service.",
    "action": "Committing money",
    "hint": "Money, or a paid booking",
    "examples": "Checkout, payment, booking, donation"
  },
  {
    "id": "Account",
    "blurb": "Existing users managing their access. Not conversions — exclude these from conversion reporting.",
    "action": "Managing an account",
    "hint": "Existing users — not conversions",
    "examples": "Sign up, log in, password reset"
  },
  {
    "id": "Application",
    "blurb": "A formal submission that someone assesses and then approves or rejects.",
    "action": "Being assessed",
    "hint": "Someone assesses and decides",
    "examples": "Job application, financing, course enrolment"
  },
  {
    "id": "Event",
    "blurb": "Registering to attend something, online or in person.",
    "action": "Attending something",
    "hint": "Attendance",
    "examples": "Conference registration, webinar signup, cancellation"
  },
  {
    "id": "Support",
    "blurb": "An existing customer with a problem that expects a resolution.",
    "action": "Reporting a problem",
    "hint": "Expects a resolution",
    "examples": "Support ticket, bug report, complaint, return"
  },
  {
    "id": "Feedback",
    "blurb": "An opinion offered. No resolution expected.",
    "action": "Giving an opinion",
    "hint": "No resolution expected",
    "examples": "Feedback box, survey, poll, product review"
  },
  {
    "id": "Engagement",
    "blurb": "The visitor actively participates, contributes or refers someone without expressing their own purchase intent.",
    "action": "Taking part",
    "hint": "No purchase intent",
    "examples": "Referral, competition entry, nomination, vote"
  },
  {
    "id": "Corporate",
    "blurb": "Stakeholders who are not customers: press, investors, analysts.",
    "action": "Press or investor",
    "hint": "Press, investors, analysts",
    "examples": "Media enquiry, investor contact"
  },
  {
    "id": "Compliance",
    "blurb": "Legally sensitive requests. Track that they happened, never what they contain.",
    "action": "A legal right",
    "hint": "Legally sensitive",
    "examples": "GDPR request, whistleblowing report"
  },
  {
    "id": "Other",
    "blurb": "Escape hatch. If this exceeds 5% of submissions, the taxonomy has a gap.",
    "action": "None of these",
    "hint": "Escape hatch",
    "examples": "Nothing above fits"
  }
];

export const formTypes = [
  {
    "category": "Lead",
    "type": "Sales Enquiry",
    "id": "lead.sales_enquiry",
    "description": "Asks to speak to sales about buying, pricing or fit, without requesting a specific format like a demo or quote",
    "examples": [
      "Contact Sales",
      "Talk to Sales",
      "Enterprise Enquiry",
      "Speak to an Advisor"
    ],
    "confusedWith": "Lead Contact",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Contact",
    "id": "lead.contact",
    "description": "Sends a general, unrouted message to the company that is not a specific sales enquiry",
    "examples": [
      "General Contact",
      "Contact Us EN",
      "Helsinki Office Contact"
    ],
    "confusedWith": "Lead Sales Enquiry",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Callback Request",
    "id": "lead.callback_request",
    "description": "Visitor asks sales or service to contact them; no message content, just contact details and a reason",
    "examples": [
      "Request a Callback",
      "Sales Callback Pricing Page"
    ],
    "confusedWith": "Lead Contact",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Demo Request",
    "id": "lead.demo_request",
    "description": "Requests a guided demonstration of a product that a salesperson runs",
    "examples": [
      "Book a Demo",
      "Enterprise Demo Request"
    ],
    "confusedWith": "Lead Trial Request",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Trial Request",
    "id": "lead.trial_request",
    "description": "Requests a free or evaluation trial that a salesperson sets up; a self-serve signup with no human is Account Registration",
    "examples": [
      "Start 14-Day Trial",
      "Guided Trial Request"
    ],
    "confusedWith": "Account Registration",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Quote Request",
    "id": "lead.quote_request",
    "description": "Requests a price quote or cost estimate that a person prepares and returns (RFQ)",
    "examples": [
      "Industrial Pumps RFQ",
      "Request a Quote Logistics"
    ],
    "confusedWith": "Lead Calculator Submission",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Sample Request",
    "id": "lead.sample_request",
    "description": "Requests a physical product sample for evaluation; common in manufacturing and materials",
    "examples": [
      "Order Material Samples",
      "Free Fabric Sample"
    ],
    "confusedWith": "Lead Brochure Request",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Consultation Booking",
    "id": "lead.consultation_booking",
    "description": "Books an advisory session or assessment as part of a sales process",
    "examples": [
      "Book a Free Consultation",
      "30-min Strategy Call"
    ],
    "confusedWith": "Transaction Booking",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Site Survey Booking",
    "id": "lead.site_survey_booking",
    "description": "Books a professional to visit the visitor's home, site or premises to assess or measure before quoting",
    "examples": [
      "Book a Free Site Survey",
      "Home Assessment Booking",
      "Arrange a Measure-Up"
    ],
    "confusedWith": "Lead Consultation Booking",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Visit Booking",
    "id": "lead.visit_booking",
    "description": "Books an in-person appointment to visit, view or try a product, property or sales location",
    "examples": [
      "Book a Test Drive",
      "Book a Viewing",
      "Showroom Appointment"
    ],
    "confusedWith": "Lead Site Survey Booking",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Gated Content",
    "id": "lead.gated_content",
    "description": "Submits contact details in exchange for content: PDF, guide, webinar, report. Lower purchase intent than the other lead types",
    "examples": [
      "SEO Guide Download",
      "2026 Benchmark Report",
      "GA4 Webinar Signup"
    ],
    "confusedWith": "Lead Brochure Request",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Brochure Request",
    "id": "lead.brochure_request",
    "description": "Requests a printed brochure, catalogue or price list sent by post",
    "examples": [
      "Order Product Catalogue 2026",
      "Request Price List"
    ],
    "confusedWith": "Lead Gated Content",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Calculator Submission",
    "id": "lead.calculator_submission",
    "description": "Completes a price, ROI, savings or configurator tool and provides contact details to receive the result; an ungated calculator is an event, not a form submission",
    "examples": [
      "Solar Savings Calculator",
      "ROI Calculator Enterprise"
    ],
    "confusedWith": "Lead Quote Request",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Dealer Locator Enquiry",
    "id": "lead.dealer_locator_enquiry",
    "description": "Contacts a specific dealer, reseller, branch or location found via a locator",
    "examples": [
      "Contact Dealer Tampere",
      "Find a Reseller Enquiry"
    ],
    "confusedWith": "Lead Contact",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Booking Enquiry",
    "id": "lead.booking_enquiry",
    "description": "Asks whether something is free on specific dates or in a specific quantity, before booking",
    "examples": [
      "Check Availability",
      "Group Booking Enquiry",
      "Venue Availability Request"
    ],
    "confusedWith": "Transaction Booking",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Availability Alert",
    "id": "lead.availability_alert",
    "description": "Asks to be notified when a specific product, service or place becomes available, is released, or changes price",
    "examples": [
      "Notify Me When Back in Stock",
      "Join the Waitlist",
      "Early Access Signup",
      "Price Drop Alert"
    ],
    "confusedWith": "Lead Booking Enquiry",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Valuation Request",
    "id": "lead.valuation_request",
    "description": "Asks what an item, property or business the visitor already owns is worth",
    "examples": [
      "What's My Car Worth",
      "Free Property Valuation",
      "Part-Exchange Estimate"
    ],
    "confusedWith": "Lead Quote Request",
    "note": ""
  },
  {
    "category": "Lead",
    "type": "Financing Enquiry",
    "id": "lead.financing_enquiry",
    "description": "Asks about payment terms, finance options or affordability before any formal application",
    "examples": [
      "Finance Options Enquiry",
      "Check My Eligibility",
      "Leasing Enquiry"
    ],
    "confusedWith": "Application Credit",
    "note": ""
  },
  {
    "category": "Subscribe",
    "type": "Newsletter",
    "id": "subscribe.newsletter",
    "description": "Gives an email address to receive recurring newsletters or updates",
    "examples": [
      "Footer Newsletter",
      "Blog Sidebar Signup",
      "Newsletter FI"
    ],
    "confusedWith": "Lead Gated Content",
    "note": ""
  },
  {
    "category": "Subscribe",
    "type": "SMS Opt-in",
    "id": "subscribe.sms_opt_in",
    "description": "Gives a phone number to receive marketing messages by SMS or a messaging app",
    "examples": [
      "SMS Alerts Signup",
      "WhatsApp Updates Opt-in"
    ],
    "confusedWith": "Subscribe Newsletter",
    "note": ""
  },
  {
    "category": "Subscribe",
    "type": "Unsubscribe",
    "id": "subscribe.unsubscribe",
    "description": "Opts out of newsletters or email communications",
    "examples": [
      "Email Preference Centre Opt Out",
      "One-Click Unsubscribe"
    ],
    "confusedWith": "Account Profile Update",
    "note": ""
  },
  {
    "category": "Subscribe",
    "type": "Job Alert",
    "id": "subscribe.job_alert",
    "description": "Subscribes to notifications about new job openings matching set criteria",
    "examples": [
      "Job Alerts Engineering",
      "Careers Alert Signup"
    ],
    "confusedWith": "Application Job",
    "note": ""
  },
  {
    "category": "Transaction",
    "type": "Order",
    "id": "transaction.order",
    "description": "Submits the information needed to place an order and buy online",
    "examples": [
      "Checkout Step 3",
      "Quick Order Form"
    ],
    "confusedWith": "Transaction Payment",
    "note": ""
  },
  {
    "category": "Transaction",
    "type": "Payment",
    "id": "transaction.payment",
    "description": "Submits payment details to complete a transaction",
    "examples": [
      "Card Payment Checkout",
      "Invoice Payment"
    ],
    "confusedWith": "Transaction Order",
    "note": ""
  },
  {
    "category": "Transaction",
    "type": "Pre-Order",
    "id": "transaction.pre_order",
    "description": "Orders and commits to a product before its release date",
    "examples": [
      "Pre-Order Model X 2026",
      "Reserve Yours Now"
    ],
    "confusedWith": "Lead Availability Alert",
    "note": ""
  },
  {
    "category": "Transaction",
    "type": "Booking",
    "id": "transaction.booking",
    "description": "Reserves or books a service, appointment or accommodation being delivered",
    "examples": [
      "Table Reservation",
      "Hotel Room Booking Helsinki"
    ],
    "confusedWith": "Lead Consultation Booking",
    "note": ""
  },
  {
    "category": "Transaction",
    "type": "Booking Cancellation",
    "id": "transaction.booking_cancellation",
    "description": "Cancels or changes an existing reservation for a service, appointment or accommodation",
    "examples": [
      "Cancel My Booking",
      "Change My Reservation"
    ],
    "confusedWith": "Event Registration Cancellation",
    "note": ""
  },
  {
    "category": "Transaction",
    "type": "Donation",
    "id": "transaction.donation",
    "description": "Gives a financial donation to a non-profit or cause",
    "examples": [
      "One-Off Donation",
      "Monthly Giving Christmas Appeal"
    ],
    "confusedWith": "Transaction Payment",
    "note": ""
  },
  {
    "category": "Transaction",
    "type": "Subscription Upgrade",
    "id": "transaction.subscription_upgrade",
    "description": "Moves an existing subscription or membership to a higher tier or adds paid capacity",
    "examples": [
      "Upgrade to Pro",
      "Add Seats Billing"
    ],
    "confusedWith": "Account Profile Update",
    "note": ""
  },
  {
    "category": "Transaction",
    "type": "Subscription Pause",
    "id": "transaction.subscription_pause",
    "description": "Pauses or puts an existing subscription on hold without cancelling it",
    "examples": [
      "Pause My Plan",
      "Hold My Deliveries"
    ],
    "confusedWith": "Transaction Subscription Cancellation",
    "note": ""
  },
  {
    "category": "Transaction",
    "type": "Subscription Cancellation",
    "id": "transaction.subscription_cancellation",
    "description": "Cancels or downgrades an existing subscription or membership",
    "examples": [
      "Cancel Subscription",
      "Downgrade to Free"
    ],
    "confusedWith": "Transaction Subscription Upgrade",
    "note": ""
  },
  {
    "category": "Account",
    "type": "Registration",
    "id": "account.registration",
    "description": "Creates a user account or customer profile; self-serve",
    "examples": [
      "Create Account Checkout",
      "Sign Up Free Plan"
    ],
    "confusedWith": "Lead Trial Request",
    "note": "Merged: Sign Up + Customer Registration"
  },
  {
    "category": "Account",
    "type": "Login",
    "id": "account.login",
    "description": "Enters credentials to reach a secure area",
    "examples": [
      "Login My Account",
      "SSO Login"
    ],
    "confusedWith": "Account Registration",
    "note": "Exclude from conversion reporting"
  },
  {
    "category": "Account",
    "type": "Password Reset",
    "id": "account.password_reset",
    "description": "Verifies identity and sets new login credentials",
    "examples": [
      "Forgot Password",
      "Reset Password Confirm"
    ],
    "confusedWith": "Account Login",
    "note": "Exclude from conversion reporting"
  },
  {
    "category": "Account",
    "type": "Profile Update",
    "id": "account.profile_update",
    "description": "Changes personal details, contact information or preferences on an existing account",
    "examples": [
      "Update Contact Details",
      "Notification Preferences"
    ],
    "confusedWith": "Transaction Subscription Upgrade",
    "note": "Exclude from conversion reporting"
  },
  {
    "category": "Account",
    "type": "Closure",
    "id": "account.closure",
    "description": "Closes or deletes an existing user account",
    "examples": [
      "Close My Account",
      "Delete My Account"
    ],
    "confusedWith": "Compliance Data Subject Request",
    "note": "Exclude from conversion reporting; track it as a churn signal"
  },
  {
    "category": "Application",
    "type": "Job",
    "id": "application.job",
    "description": "Applies for an advertised position, usually with CV and cover letter",
    "examples": [
      "Apply Senior Analyst Helsinki",
      "Open Application"
    ],
    "confusedWith": "Subscribe Job Alert",
    "note": "Split out of generic Application"
  },
  {
    "category": "Application",
    "type": "Credit",
    "id": "application.credit",
    "description": "Applies for financing, a loan, a mortgage, a credit account or an insurance policy",
    "examples": [
      "Car Finance Application",
      "Mortgage Pre-Approval"
    ],
    "confusedWith": "Transaction Payment",
    "note": "Split out of generic Application"
  },
  {
    "category": "Application",
    "type": "Grant",
    "id": "application.grant",
    "description": "Applies for a grant, bursary or funding award that someone assesses",
    "examples": [
      "Grant Application 2026",
      "Apply for Funding"
    ],
    "confusedWith": "Application Credit",
    "note": ""
  },
  {
    "category": "Application",
    "type": "Course",
    "id": "application.course",
    "description": "Applies or enrols for a course, programme, degree or certification",
    "examples": [
      "Enrol Data Analytics 2026",
      "MSc Admission Application"
    ],
    "confusedWith": "Event Registration",
    "note": "Split out of generic Application"
  },
  {
    "category": "Application",
    "type": "Partner",
    "id": "application.partner",
    "description": "Applies to become a reseller, distributor, partner or approved supplier",
    "examples": [
      "Become a Reseller",
      "Supplier Registration"
    ],
    "confusedWith": "Lead Contact",
    "note": ""
  },
  {
    "category": "Application",
    "type": "Membership",
    "id": "application.membership",
    "description": "Applies to join an organisation as a member or volunteer",
    "examples": [
      "Join as a Member",
      "Volunteer Signup"
    ],
    "confusedWith": "Account Registration",
    "note": ""
  },
  {
    "category": "Application",
    "type": "Tender",
    "id": "application.tender",
    "description": "Submits a bid, tender or proposal in response to a procurement process",
    "examples": [
      "Tender Response Ref 2026-04",
      "Submit a Proposal",
      "Procurement Response"
    ],
    "confusedWith": "Lead Quote Request",
    "note": ""
  },
  {
    "category": "Event",
    "type": "Registration",
    "id": "event.registration",
    "description": "Registers to attend a conference, seminar or workshop in person",
    "examples": [
      "Nordic Business Forum 2026",
      "Seminar Signup Helsinki"
    ],
    "confusedWith": "Event Webinar Registration",
    "note": ""
  },
  {
    "category": "Event",
    "type": "Webinar Registration",
    "id": "event.webinar_registration",
    "description": "Registers for an online session, livestream or virtual event",
    "examples": [
      "GA4 Webinar 12 March",
      "Live Demo Session Signup"
    ],
    "confusedWith": "Lead Gated Content",
    "note": ""
  },
  {
    "category": "Event",
    "type": "Registration Cancellation",
    "id": "event.registration_cancellation",
    "description": "Cancels or changes an existing registration for an event",
    "examples": [
      "Cancel My Place",
      "Change My Registration"
    ],
    "confusedWith": "Transaction Subscription Cancellation",
    "note": ""
  },
  {
    "category": "Support",
    "type": "Request",
    "id": "support.request",
    "description": "Submits a request for help or assistance to customer service or technical support",
    "examples": [
      "Submit Ticket",
      "Contact Support Billing"
    ],
    "confusedWith": "Support Bug Report",
    "note": ""
  },
  {
    "category": "Support",
    "type": "Bug Report",
    "id": "support.bug_report",
    "description": "Reports a defect, error or malfunction in a product, site or application",
    "examples": [
      "Report a Bug",
      "In-App Issue Report"
    ],
    "confusedWith": "Support Complaint",
    "note": ""
  },
  {
    "category": "Support",
    "type": "Complaint",
    "id": "support.complaint",
    "description": "Files a formal complaint or claim about a product, service or experience",
    "examples": [
      "File a Complaint",
      "Product Complaint Form"
    ],
    "confusedWith": "Feedback General",
    "note": "Replaces \"Reclamation\""
  },
  {
    "category": "Support",
    "type": "Return or Refund",
    "id": "support.return_or_refund",
    "description": "Requests goods returned or money back: a product return, exchange, RMA, or a refund for a service, booking or digital purchase",
    "examples": [
      "Start a Return",
      "RMA Request",
      "Request a Refund"
    ],
    "confusedWith": "Support Warranty Claim",
    "note": ""
  },
  {
    "category": "Support",
    "type": "Warranty Registration",
    "id": "support.warranty_registration",
    "description": "Registers a purchased product to activate its warranty",
    "examples": [
      "Register Your Product",
      "Warranty Activation"
    ],
    "confusedWith": "Support Warranty Claim",
    "note": ""
  },
  {
    "category": "Support",
    "type": "Warranty Claim",
    "id": "support.warranty_claim",
    "description": "Claims repair or replacement under an existing warranty",
    "examples": [
      "Submit Warranty Claim",
      "Claim Under Warranty",
      "Repair Request"
    ],
    "confusedWith": "Support Return or Refund",
    "note": ""
  },
  {
    "category": "Support",
    "type": "Insurance Claim",
    "id": "support.insurance_claim",
    "description": "Files a claim against an existing insurance policy",
    "examples": [
      "Report a Claim Motor",
      "Travel Claim Form"
    ],
    "confusedWith": "Application Credit",
    "note": ""
  },
  {
    "category": "Feedback",
    "type": "General",
    "id": "feedback.general",
    "description": "Submits comments, suggestions or opinions about a product, service or site",
    "examples": [
      "Site Feedback Widget",
      "Suggestion Box"
    ],
    "confusedWith": "Support Complaint",
    "note": "Merged: Feedback + Feedback/Suggestion"
  },
  {
    "category": "Feedback",
    "type": "Survey",
    "id": "feedback.survey",
    "description": "Completes a structured, multi-question survey for research purposes",
    "examples": [
      "NPS Survey Q1 2026",
      "Post-Purchase Survey"
    ],
    "confusedWith": "Feedback Poll",
    "note": ""
  },
  {
    "category": "Feedback",
    "type": "Poll",
    "id": "feedback.poll",
    "description": "Votes in a single-question poll or vote",
    "examples": [
      "Homepage Poll Feature Vote",
      "Quick Poll",
      "Vote on the Next Feature"
    ],
    "confusedWith": "Feedback Survey",
    "note": ""
  },
  {
    "category": "Feedback",
    "type": "Product Review",
    "id": "feedback.product_review",
    "description": "Submits a written review or rating for a specific product or service",
    "examples": [
      "Write a Review PDP",
      "Post-Delivery Review Request"
    ],
    "confusedWith": "Feedback General",
    "note": ""
  },
  {
    "category": "Feedback",
    "type": "Testimonial",
    "id": "feedback.testimonial",
    "description": "Submits a quote or story about working with the company, usually solicited for marketing use",
    "examples": [
      "Share Your Story",
      "Customer Testimonial Form"
    ],
    "confusedWith": "Feedback Product Review",
    "note": ""
  },
  {
    "category": "Corporate",
    "type": "Press Enquiry",
    "id": "corporate.press_enquiry",
    "description": "Journalist or media contact requesting comment, materials or an interview",
    "examples": [
      "Media Enquiry",
      "Press Contact Form"
    ],
    "confusedWith": "Lead Contact",
    "note": ""
  },
  {
    "category": "Corporate",
    "type": "Investor Enquiry",
    "id": "corporate.investor_enquiry",
    "description": "Investor, analyst or shareholder requesting financial or IR information",
    "examples": [
      "Investor Contact",
      "IR Information Request"
    ],
    "confusedWith": "Lead Contact",
    "note": ""
  },
  {
    "category": "Compliance",
    "type": "Data Subject Request",
    "id": "compliance.data_subject_request",
    "description": "Exercises a GDPR right: data access, correction, portability or erasure",
    "examples": [
      "Privacy Request Form",
      "Delete My Data"
    ],
    "confusedWith": "",
    "note": "SENSITIVE - track submission only; no field values; no identifier"
  },
  {
    "category": "Compliance",
    "type": "Accessibility Report",
    "id": "compliance.accessibility_report",
    "description": "Reports an accessibility barrier encountered on the site or in a service",
    "examples": [
      "Report an Accessibility Barrier",
      "Accessibility Feedback"
    ],
    "confusedWith": "Support Bug Report",
    "note": "Required feedback mechanism under the European Accessibility Act; a reply is expected"
  },
  {
    "category": "Compliance",
    "type": "Whistleblowing Report",
    "id": "compliance.whistleblowing",
    "description": "Reports misconduct, fraud or an ethics violation, often anonymously",
    "examples": [
      "Report a Concern",
      "Speak Up",
      "Ethics Hotline Form"
    ],
    "confusedWith": "",
    "note": "SENSITIVE - count only; no user ID; no identifying page path; no session stitching"
  },
  {
    "category": "Other",
    "type": "Other",
    "id": "other",
    "description": "A form that does not match any defined type",
    "examples": [
      "Uncategorised Form",
      "Unclassified Form"
    ],
    "confusedWith": "",
    "note": "Review trigger: if this exceeds 5% of submissions the taxonomy has a gap"
  },
  {
    "category": "Engagement",
    "type": "Referral",
    "id": "engagement.referral",
    "description": "Refers another person or company, usually under a referral or affiliate programme",
    "examples": [
      "Refer a Friend",
      "Partner Referral Submission"
    ],
    "confusedWith": "",
    "note": ""
  },
  {
    "category": "Engagement",
    "type": "Competition Entry",
    "id": "engagement.competition_entry",
    "description": "Enters a competition, prize draw, sweepstake or award nomination",
    "examples": [
      "Summer Prize Draw 2026",
      "Award Nomination Form"
    ],
    "confusedWith": "Feedback Poll",
    "note": ""
  }
];
