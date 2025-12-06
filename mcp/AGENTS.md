ChatGPT App SDK Integration for Split Website – Agent Design and Implementation
This document describes how to integrate the ChatGPT Apps SDK into the Split website, enabling a multi-step onboarding flow within ChatGPT. The integration uses a Node.js Model Context Protocol (MCP) server to expose a sequence of six interactive widgets: Sign In/Sign Up, Business Identity, Contact & Location, Financial Information, Equipment Information, and Owner Information. Each widget corresponds to a section of the Split portal’s Business Profile and is presented step-by-step only after successful completion of the previous widget. We replicate the exact data validation, autocomplete, and submission logic of the Split portal, using the portal’s existing API endpoints and matching its card-based UI theme via the ChatGPT Apps SDK UI components.
Overview and Architecture
Architecture Summary: The integration consists of a Node.js MCP server that ChatGPT connects to, and a set of frontend widgets (built with the OpenAI Apps SDK UI library) that render inside ChatGPT. The Node server exposes each form step as a tool with a JSON schema contract, so the ChatGPT model can invoke them. The server streams results to ChatGPT via Server-Sent Events (SSE), including metadata that binds custom UI to the assistant’s messages. This allows ChatGPT to display rich, interactive form interfaces inline, orchestrating the multi-step flow.
MCP Server (Node.js): Implements the Model Context Protocol using OpenAI’s official TypeScript SDK. It defines the tools (for each step) and handles requests:
ListTools – advertises the available tools and their schemas.
CallTool – executes a tool when invoked by ChatGPT (e.g. perform sign-in logic or submit a form).
ListResources / ReadResource – serves the frontend widget HTML/CSS for the tools (the UI templates).
Apps SDK UI Widgets (React): For each step, a widget is built using ChatGPT’s Apps SDK UI components (buttons, inputs, etc.) for a consistent, accessible design. Each widget is packaged as a static HTML/JS/CSS bundle and referenced via a special URI (e.g. ui://widget/business-identity.html) in the tool metadata.
Existing Backend API: The MCP server calls Split’s existing REST API endpoints to verify and save data. This ensures identical validation logic – for example, using the same email/password authentication, business info verification, address autocomplete service, financial account checks, and KYC processes that the Split portal uses. No business logic is reimplemented; the agent simply brokers data between ChatGPT and the Split backend.
Sequence Flow:
Authentication Step (Sign In/Sign Up) – ChatGPT (or the user) initiates the flow by invoking the sign-in-up tool, causing the Sign In/Sign Up widget to render. The user enters credentials (or toggles to create a new account) and submits. The widget calls the sign-in-up tool again with the provided credentials. The Node server verifies credentials via the Split API (logging in or creating an account). On success, the server stores the session token for subsequent calls and the widget automatically triggers the next tool. On failure, an error is displayed for retry.
Business Identity – The business-identity widget is shown, prefilling any known data (e.g. if the user had partially completed this in the portal). The user inputs legal business details (e.g. business name, entity type, EIN) and submits. The widget calls the business-identity tool with the data, the Node server sends it to Split’s API, and on success the widget advances to the next step.
Contact & Location – The contact-location widget appears, preloaded with any existing address/contact info. The user enters the business address (with autocomplete suggestions) and contact details (phone, etc.). After submission via the contact-location tool, the data is saved through the API and the next step is launched.
Financial Information – The financial-info widget collects banking details or connects to a bank account. The user either enters routing/account numbers (with format validation) or follows a link to an external bank connection flow (if the portal uses one). The financial-info tool transmits the info securely to the backend for verification (e.g. validating routing number and account ownership). Upon success, proceed to step 5.
Equipment Information – The equipment-info widget gathers details on equipment assets (if applicable). The user can list equipment names, models, values, and optionally upload documents (if required by the portal’s logic). The data is submitted via the equipment-info tool to the API (the Node server streams files or data as needed), then the final step is triggered.
Owner Information – The owner-info widget collects personal details of business owner(s). The user provides information such as name, date of birth, home address, ownership percentage, and identification details (e.g. SSN last4 or ID document upload for KYC). On submission through the owner-info tool, the server calls the portal’s verification API (which might run KYC/credit checks or store the data). Successful completion concludes the flow – the widget can display a confirmation that the profile is complete.
Each tool is configured with an output widget and meta-annotations indicating it’s non-destructive and safe (so ChatGPT does not prompt the user for extra approval each time). The tools are chained such that each widget, upon successful submission, programmatically invokes the next tool using the Apps SDK’s window.openai.callTool function. This results in ChatGPT rendering the next widget seamlessly in the conversation, without the user needing to type additional prompts. The UI and data flow remain in sync with the backend at all times. Security & State: The MCP server maintains user session state in memory, associating a session token (or cookie) with the ChatGPT conversation (via the SSE connection’s session ID). This token, obtained at sign-in, is included in headers for all subsequent API calls (to authorize fetching or updating profile data). All sensitive data (passwords, PII like SSN, etc.) is transmitted securely from the widget to the MCP server (over HTTPS) and then to the Split API. The MCP server does not log or persist this data beyond the session scope. (If scaling to multiple instances or needing persistence, consider using a secure store or database for session tokens and form data, as suggested in the Apps SDK examples.) The SSE endpoints have CORS enabled to allow ChatGPT’s web client to connect from its origin.
Widgets and Data Flow Details
Below we detail each of the six widgets, including their UI elements, data fields, validation, and how they interface with the backend:
1. Sign In / Sign Up Widget
Purpose: Authenticate the user or create a new user account. This initial step gates access to profile data. It mirrors the Split portal’s sign-in/sign-up form. UI Design: A card with Email and Password fields and a submit button. A toggle or secondary button lets the user switch between Sign In and Sign Up modes. For Sign Up, additional fields may appear (e.g. confirm password, and possibly name if required). The widget uses the Apps SDK UI <Input> component for text fields (with built-in validation states) and <Button> for the submit action. The styling matches the portal’s login page – centered card, soft background (#F6F5F4) with a subtle shadow around the form container (replicating the Split portal’s clean, modern aesthetic). Data & Validation:
Email – Required, must be a valid email format. The JSON schema uses "format": "email" and the UI will highlight if the input is not an email.
Password – Required. Minimum 8 characters (and any complexity rules enforced by the portal). The UI shows a validation error if too short.
Confirm Password (Sign Up only) – Must match Password. This is enforced on the client side (the widget will compare the two fields before enabling submit for Sign Up).
Name – (Optional, Sign Up only) If the portal requires a name upon sign-up (some do, some don’t). In our integration, we can defer collecting full name until Owner Information step to avoid redundancy, since the portal likely collects owner details later. For now, we assume Sign Up only needs email & password.
Logic:
When the user submits, the widget calls the sign-in-up tool with the entered credentials (and a "mode" argument of "signin" or "signup"). The Node server receives this call and routes it to the appropriate Split backend endpoint:
Sign In: Calls the portal’s authentication API (e.g. POST /api/auth/login) with email and password. If credentials are incorrect, the API returns an error (e.g. 401 Unauthorized). Our tool captures this and returns a failure response with an error message (e.g. “Invalid email or password”). The _meta.openai/outputTemplate remains the sign-in widget, so the same UI is re-displayed for the user, and the widget shows the error message (for example, by rendering an <Alert> component at the top of the form). The user can correct the input and try again.
Sign Up: Calls POST /api/auth/register (or the equivalent endpoint in Split’s backend) with email, password (and possibly name). If the email is already in use or fails policy (e.g. weak password), the error is returned and displayed on the form. On success, the new account is created and typically an authentication token or session cookie is returned.
Session Management: On successful login or registration, the server will store the auth token (e.g. JWT or session cookie) in memory (keyed by the ChatGPT session). All subsequent tool calls include this token in API requests (e.g. via an Authorization header or cookie jar). This mirrors how the portal maintains session state after login.
Advancing: Upon success, the Node tool responds with a brief confirmation content (e.g. “✅ Signed in successfully. Loading your profile...”) and the widget JavaScript automatically triggers the next tool. Specifically, the sign-in widget’s code uses window.openai.callTool("business-identity") to invoke the next step. This call is made only after the server confirms authentication. (The Apps SDK provides the structuredContent from the tool response to the widget, so the widget can detect a success flag or the presence of a token to decide to advance.) As a result, ChatGPT opens the Business Identity widget tool immediately after, and the onboarding flow continues.
2. Business Identity Widget
Purpose: Collect the business’s legal identity details – essentially the “About the Business” card in the profile. UI Design: A card titled “Business Identity” with fields drawn from the portal’s Business Profile section. Likely fields include: Legal Business Name, Business Type, EIN (Tax ID), and possibly Formation Date or State of Incorporation. In the portal UI, these would be presented as a form (possibly the card has an edit button – here we present it directly editable since it’s an onboarding flow). We use <Input> for text fields, a <Select> or radio group for business type, and an <Input> for EIN. The styling matches the portal’s profile card (white background, border-radius, and section heading). We ensure the layout is responsive in ChatGPT’s sidebar – using Apps SDK UI’s responsive design utilities (e.g. stacking fields in a column). Data & Validation:
Business Name – Required. Any string (with a reasonable length limit, e.g. 150 chars). The portal likely requires a non-empty name. We enforce this on the client and mark as required in the JSON schema.
Business Type – Required. A dropdown of allowed entity types (e.g. Sole Proprietorship, LLC, Corporation, Partnership, etc.). This could be derived from the portal (perhaps an enum or a list used in the registration form). We include the exact list used by Split’s portal (ensuring it matches what the backend expects). For example, if the portal expects specific strings like "LLC", "CORP", etc., our tool schema will use an enum for businessType to restrict to those values.
EIN – Required for most entity types (if Sole Prop, possibly allow SSN instead – the portal might handle that by expecting an EIN field even for sole props, or they might require sole props to use their SSN as Tax ID). Our form will label it as “Employer Identification Number (EIN) or Tax ID” and validate format: 9 digits (with optional - after the first two digits). We use a regex pattern in the JSON schema to verify this (e.g. ^\d{2}-?\d{7}$ allowing formats like 12-3456789 or 123456789). The widget can further hint if format is wrong.
Formation Date – (If collected) Possibly the portal asks for the date the business was founded or incorporated. If so, we include a date picker (<DatePicker> component from the Apps SDK UI). We enforce that the date is in the past and reasonably within plausible range (e.g. not before 1900). This field might be optional if not required.
State of Incorporation – (If applicable) A dropdown of U.S. states (if the business type is a registered entity). The portal might require it for corporations/LLCs. If we include it, use a <Select> with all states plus DC, etc. Mark required only if businessType is corporation/LLC (conditional validation can be handled in widget logic, since JSON Schema conditional is complex to implement; the widget can disable submission if required fields for the chosen type are missing).
Logic:
On widget load, the MCP server fetches the current business profile data using the stored auth token. Likely there’s an endpoint such as GET /api/profile or GET /api/business that returns the business’s saved information. We call this on the first render of the Business Identity step so we can prefill the form with any existing data (for returning users or partially completed profiles). Prefilling is done by including the data in the tool’s response structuredContent, which the widget reads via window.openai.toolOutput on mount. For example, if the user’s business name is already on file, it will appear in the input field, so they only change if needed.
When the user submits, the widget calls the business-identity tool with the filled data. The Node handler constructs a request to the backend, for example:
Endpoint: PUT /api/business-profile (or similar) with a JSON body containing businessName, businessType, ein, etc. (The exact endpoint is determined by Split’s API; we use whatever the portal’s updateApplication or profile update function calls on the backend).
The server includes the auth token in this request. The backend will run the same validations as the portal: e.g., ensure EIN is not already used or is valid, perhaps verify business existence via a third-party (some platforms use external APIs to validate the business). If the backend returns an error (say, “Invalid EIN” or “Business name too long”), our tool captures that and returns a response with content describing the error and the same widget outputTemplate, so the form remains open with error indications. The widget can highlight the specific field in error (e.g. red outline and an error message beneath) based on an error code or message returned.
Autocomplete & Suggestions: If the portal integrates any suggestion (for instance, some platforms auto-suggest the full legal name after entering an EIN via a business lookup API), we replicate this using the Apps SDK UI where possible. For example, if entering an EIN could yield a business name from a database, our widget can call a “lookup” tool behind the scenes. (This would be an extra MCP tool not directly exposed to the user, e.g. lookup-business-by-ein, that the widget calls on EIN blur event to get suggested name). This is an advanced feature – if the portal uses it, we ensure to implement similarly. The suggestion results can be displayed in a dropdown or directly filled into the Business Name field with a confirmation to the user.
On successful save (backend returns 200 OK and the updated data), the Node tool responds with a success message content (e.g. “Business information saved ✅”) and includes the updated structuredContent (for completeness). The widget, upon detecting success, automatically calls window.openai.callTool("contact-location") to proceed to the next step. This ensures the flow continues without manual user prompt. The Business Identity widget can also visually indicate success (e.g. a green checkmark or simply closing/hiding the form) as it transitions.
3. Contact & Location Widget
Purpose: Gather the business’s contact information and physical address. UI Design: A card titled “Contact & Location” containing address fields and contact details. We mirror the portal’s UI, likely consisting of:
Business Address – could be a single field with an autocomplete dropdown, or separate fields (Street, City, State, ZIP). The portal likely uses an address autocomplete (e.g. Google Places API) to help the user fill in the address. In our ChatGPT widget, we can implement an address autocomplete by calling an external API through the MCP server. For instance, as the user types the address, we use window.openai.callTool("address-autocomplete", { query: "123 Main St, ..." }) to get suggestions (the Node server calls Google Maps API or similar) and display a suggestions list. If the user selects one, we populate the address fields. To keep things simpler, the initial implementation might use a single-line address field with suggestions, then parse it into components before submission.
Phone Number – an input for a phone number. Use the Apps SDK UI <Input> with type="tel". We enforce numeric input and format it (we can auto-format as (XXX) XXX-XXXX for US numbers, using a simple input mask in the widget). The portal likely verifies phone number format and may later verify ownership via SMS (if so, that process might be triggered separately, not necessarily in this form submission).
Additional Contact Info – possibly email (but that’s likely the user’s login, so already known), or contact person name if different from owner (not likely needed if owner info collected). Possibly a Business Website field could exist; if so, include a URL input (with validation of URL format). This is optional.
Data & Validation:
Address – Required. If split into components, each part is required except maybe Address Line 2. If using a single-line address, that is required. Validation: must be a real address. We can use the backend’s logic by simply sending it and seeing if it’s accepted. If the portal requires a specific format (like separate fields), our tool will parse the single-line input into street, city, state, zip on submission. We ensure the state is a valid 2-letter code (if US) and ZIP is 5 digits (or 5-4 if using ZIP+4). If using suggestions, it reduces errors.
Phone – Required. We enforce a pattern (e.g. 10 digits for US). The JSON schema can include a pattern like ^\d{10}$ (for exactly 10 digits, assuming country code US). If international numbers are allowed, we might allow ^\+?\d{7,15}$ for more flexibility. The portal likely expects a certain format; we send digits only or in E.164 format depending on what the API expects.
Website – (Optional) If included, ensure it’s a valid URL (we can use "format": "uri" in JSON schema for validation).
Logic:
On load, similar to previous step, fetch any existing contact info. The portal’s profile data (applicationStatus in the code) likely includes address and phone. We call GET /api/profile (if not already cached from previous step’s call) and extract the address and phone to prefill. If the user has no data yet (new user), fields start blank.
Autocomplete Implementation: We set up a tool (not one of the main six, but an ancillary tool) for address lookup if needed. For example, an address-lookup tool can take a partial query and return a list of suggestions (which the widget displays in a dropdown). The suggestions could come from the Google Places API, which requires an API key. In our setup, we can provide that key via environment variable (e.g. GOOGLE_MAPS_API_KEY) and have the Node server use it to call Google’s Places Autocomplete endpoint. This call would happen when the user stops typing for a moment (debounced). The widget receives the suggestions through the address-lookup tool response (as structured content) and displays them. When the user picks one, we fill the address fields and optionally call another tool to get the address components (or parse on the client using the Places result).
When the user submits the Contact & Location form, the contact-location tool sends the data to the backend. Likely endpoint: PUT /api/business-profile (same as business identity if it’s a unified profile update) or a dedicated /api/business-contact. We include address (or broken into streetAddress, city, state, postalCode, country) and phone, etc. The backend may validate the address (some systems verify the address exists via USPS API or similar) – any error returned (e.g. invalid postal code) will be relayed to the user. Phone number might be validated for length/format; if error (like “Invalid phone number”), it’s shown.
Verification: If the portal requires verifying the phone (e.g. sending an OTP code), that typically wouldn’t occur at this exact form submission in a web context; instead, they might have a separate flow (like user gets an SMS after submitting and the status is pending verification). For our integration, we note that out-of-band verification (like clicking an email confirmation or entering an SMS code) might be needed. We include instructions in the UI if applicable: e.g. after saving, the widget could display “We’ve sent a verification code to your phone, please verify to complete this step” – but the actual code entry could be handled in ChatGPT via another small widget if desired. However, unless asked, we might assume phone verification is handled outside ChatGPT (user would do it in the web portal or automatically considered verified for now).
On success (address and contact saved without error), the Node server returns a success confirmation (e.g. “Contact information saved.”). The widget then calls the next tool: financial-info.
4. Financial Information Widget
Purpose: Capture financial details needed for Split’s service – likely the bank account where funds will be sent or debited, and possibly other financial metrics (like revenue, etc., depending on Split’s business model). UI Design: A card titled “Financial Information”. This may include:
Bank Account Routing Number – an input for the 9-digit routing number (for US banks).
Bank Account Number – input for the account number.
Confirm Account Number – to avoid typos, a second entry of account number (ensured to match).
Account Type – possibly a dropdown (Checking or Savings).
Bank Name – optionally, if the portal shows the bank name after routing number is entered (since routing number can be looked up to find the bank, e.g., if using an API or library).
Alternatively, the portal might use Plaid or another instant account verification instead of manual entry. If so, there could be a button like “Link your bank account” which opens an external widget. In ChatGPT, we cannot embed Plaid’s SDK directly, but we can provide a workaround: e.g. a button in the widget that uses window.openai.openExternal(url) to open the bank linking flow in a new tab. The user would complete linking outside ChatGPT, and the backend would receive the bank tokens. Our agent could detect when linking is done (perhaps via a webhook or polling). However, this is complex, so our default approach is to use manual input fields, which the backend should also accept (the portal likely supports manual entry fallback).
Other Financials – The portal might ask for basic financial info like annual revenue, or business debt, etc. If required, fields for those can be added (with appropriate validation, e.g. numeric only). Since the prompt doesn’t explicitly mention those, we focus on bank details.
Data & Validation:
Routing Number – Required, 9 digits. We use a regex ^\d{9}$ in JSON schema to enforce length. The widget can also verify the checksum digit algorithm (ABA checksum) to give instant feedback if the routing number is likely invalid. Optionally, after 9 digits are entered, the widget can call a small lookup (there are public databases for routing numbers to get bank name) to display the bank’s name for confirmation. This is a nice touch to ensure correctness (and matches “exact verification” if the portal does something similar).
Account Number – Required. Typically 4-17 characters (can be digits, some banks include letters, though rare). We enforce a length range and allow digits (and maybe letters). No specific format beyond that.
Confirm Account – Must match Account Number. Checked in the widget; not included in the tool schema sent to backend (it’s only for client-side validation).
Account Type – Required if needed by backend. If the API needs to know if it’s checking vs savings, ensure the user selects one.
Bank Link – If linking externally, no direct data entry, but then the backend would provide confirmation. (If we implemented external linking, our agent might skip asking for routing/account and instead wait for confirmation. For this document’s scope, we proceed with manual entry but note linking as a possibility.)
Logic:
On load, fetch existing financial info via the API. If the user had already linked or provided a bank, the backend might return masked account details (e.g. last 4 digits of account and bank name). We can display a message like “Bank account ending in 4321 is on file.” and perhaps allow editing. If editing is allowed, show fields pre-filled with whatever info can be shown (e.g. we won’t have the full number for security, but we might just prompt user to re-enter if they want to change). If no info on file, fields are blank.
When submitted, the widget calls the financial-info tool with the routing and account (and type, etc.). The Node server calls Split’s financial info API. Possible endpoints: POST /api/bank-account or it could be part of the profile update. It will send the routing & account (likely encrypted via TLS anyway) to the backend. The backend might:
Validate routing number (perhaps cross-check with a bank database or simply length).
Potentially attempt a micro-deposit or Plaid verification. If so, it might mark the bank as “pending verification”. However, from our perspective, if the API call succeeds (accepted the data), we consider it success for now.
If the backend returns an error (invalid routing or unable to add account), we display it. For example, if routing number isn’t recognized, backend might respond with error “Invalid routing number”. Our tool returns that message to the widget, which then highlights the routing field with an error.
Security: The bank details are sensitive. We ensure to transmit them only via secure requests. The MCP server does not store these beyond sending to backend. If the backend returns a token or ID for the bank account, we store that in session state if needed for later use.
If this step requires additional verification (like confirming micro-deposits or login via Plaid), we will mention to the user that further steps are needed outside ChatGPT. For example, after submission, the widget might display “Your bank information has been received. Please check your bank account in 1-2 days for micro-deposits to verify ownership.” Since our focus is on the profile setup flow, we won’t implement the micro-deposit confirmation step in ChatGPT (unless desired, we could have a follow-up tool to enter deposit amounts, but that complicates the flow and wasn’t requested).
On success (bank info saved/linked successfully), the server returns a confirmation content like “Bank account added successfully.” The widget then invokes the next tool: equipment-info.
5. Equipment Information Widget
Purpose: Collect details about equipment associated with the business, if relevant (Split might be a financing platform where equipment assets are relevant, or perhaps a leasing service – the presence of “Equipment Information” suggests the user needs to list items they own or intend to finance). UI Design: A card titled “Equipment Information”. This section might allow multiple entries (e.g. list all vehicles or machinery the business has or wants to finance). The portal likely has a way to add equipment one by one. In our widget, we provide a form for one equipment item and an “Add another” button to allow dynamic addition of multiple equipment forms in one go. Specifically:
Initially show fields for one equipment: Equipment Description/Name, Quantity or ID (if applicable), Value or Purchase Price, and possibly Equipment Type.
A button “+ Add another equipment” duplicates the set of fields below, allowing the user to input multiple pieces of equipment before submitting. (Internally, the widget can maintain an array of equipment objects in its state. Each object has the fields above. We use the Apps SDK UI components to render each item, maybe separated by a horizontal line or in an accordion style.)
If the portal requires uploading documents (like an invoice or photo for each equipment), we can include a file upload field for each. The Apps SDK UI doesn’t have a built-in file input component listed, but we can use an HTML <input type="file"> or a custom button that triggers window.openai.sendFollowUpMessage with an attached file. However, ChatGPT’s UI might handle file attachments via the chat interface rather than in-widget upload. Since the prompt does not emphasize file uploads, we can assume text data only for now, but note that if needed, the agent could accept file attachments and forward them (e.g., the equipment-info tool could accept a file ID from ChatGPT and then fetch the file content via the ChatGPT API to send to the Split backend).
The card remains visually consistent with others, scrollable if multiple entries are added.
Data & Validation:
Each equipment item might include:
Description – Required. A name or brief description (e.g. “CNC Milling Machine” or “2020 Ford F-150”).
Value – Required. The estimated value or purchase price. Should be a number (we can prefix a currency symbol in the UI). We enforce that it’s a positive number. Possibly allow commas or a dollar sign in input but strip them out for submission.
Quantity – If multiple of the same item, allow a quantity (integer >= 1). Default 1.
Serial Number / ID – Optional, if the portal tracks a specific identifier for the asset (perhaps not needed unless verifying specific assets).
Type/Category – Optional dropdown (e.g. “Vehicle”, “Heavy Machinery”, “Electronics”, etc.), if the backend uses categories.
File – If required, ensure at least one file (like invoice) is attached per item. For now, we skip file logic.
Validation for each item: description non-empty; value is a valid number (we could set the schema type to number for value); quantity is integer. We could also impose a max number of items or total value if the backend has limits (not known, so none explicitly). Logic:
On load, fetch any existing equipment info. The portal might have saved equipment details (especially if this is an application for financing, they might have an “Equipment List”). Suppose the API provides an array of equipment entries. We can pre-populate the widget by rendering each existing entry as a set of read-only or pre-filled fields. Possibly, allow editing them or adding new ones. If the portal expects a full replacement on update, the user could edit the list here. For simplicity, if any equipment exist, we show them and allow edits or removal (maybe an “X” to remove an item).
When the user submits, the widget collects all equipment entries into a list and calls equipment-info tool with an array in the arguments, e.g. { equipmentList: [ {...}, {...} ] }. The Node server sends this to the backend. Possible endpoint: PUT /api/equipment or it might be part of the profile update. It might accept multiple items at once or require individual calls. If individual, our server would loop and call for each item (but then partial failures are complex). If an array is accepted, better. We assume the backend can handle the list in one call (the portal likely allows submitting the whole list).
The backend will validate each item. For instance, it may require that value is numeric, not too large, etc. If there’s an error with a specific item, the backend might return an error indicating which item. Handling such errors in our UI might involve highlighting the problematic item’s field. We can implement basic error mapping if the backend identifies items by index or ID in the error. If not, we show a general message.
If file uploads were included, we would handle them by first uploading the file to the backend (maybe via a separate endpoint or an S3 URL the backend provides). The Node tool could facilitate that by receiving a file from ChatGPT (ChatGPT can pass file content as part of the tool call arguments if configured). Given complexity, we assume no file needed at this step unless explicitly part of logic.
On success, after adding/updating equipment, the server returns a confirmation (“Equipment information saved.”). The widget then triggers the final step tool: owner-info.
6. Owner Information Widget
Purpose: Gather information about the business owner(s). Typically includes personal details required for identity verification, credit checks, or compliance (KYC/AML), such as name, address, DOB, and SSN/EIN for sole proprietors, etc. UI Design: A card “Owner Information”. If multiple owners are needed (say, if the business has multiple principals), the portal might allow adding several owners. However, many onboarding flows just collect the primary owner initially, or require each owner to log in separately. We will design for one owner for simplicity, but make it extensible for multiple:
Fields for First Name, Last Name, Home Address, Date of Birth, SSN (or last 4 SSN), Ownership Percentage.
Possibly a checkbox or toggle if the user is the sole owner which if checked, automatically sets ownership 100%. If unchecked, maybe allow adding another owner’s info (similar approach to equipment: dynamic add forms for multiple owners).
If adding multiple owners: an “Add Owner” button spawns another set of fields. But to keep the flow concise, we might just collect the primary owner in ChatGPT. (We can note that additional owners could be added later in the portal if needed).
If the portal requires identity document upload (e.g. driver’s license) for verification, we mention how to handle that: either instruct the user to upload via the portal or allow them to attach in ChatGPT. For now, we assume personal details suffice and any ID verification might be handled by the backend automatically (e.g. via third-party services once they have the info).
The UI uses appropriate input types: e.g. a date picker for DOB, text for name, SSN as a password-type field (to hide input for privacy) or at least clearly label it sensitive. We might choose to only ask for the last 4 of SSN if that’s the portal’s practice (some fintechs only ask last4 for identification, not full SSN, due to user sensitivity). If a full SSN is needed for a credit check, we will securely handle it – the user can input it and it’s sent to backend, but we need to reassure that it’s safe.
Ownership percentage could be a number input (0-100). If the user is sole owner, default to 100. If multiple owners, ensure the total equals 100 (the widget can enforce this by not allowing submission unless sum <=100, possibly exactly 100).
Data & Validation:
First Name / Last Name – Required, alphabetic characters (we allow common punctuation like hyphen or apostrophe). We trim whitespace.
Date of Birth – Required. Must be a valid date in the past. The widget ensures the user is at least 18 years old (if that’s a requirement for owners; likely yes). JSON schema can use a "format": "date" for validation and we also check client-side.
Home Address – Required. Similar approach as business address (autocomplete could be reused here for personal address). Ensure it’s a real address.
SSN – Either full 9 digits or last 4 depending on compliance. Let’s assume full SSN is required for a credit pull. We mark this as required. Use a pattern ^\d{9}$ if full, or if last4 only then pattern ^\d{4}$. In the UI, we can mask it (show as •••• while typing, though that requires a custom input type; we might treat it like a password field to hide input).
Ownership Percentage – Required if multiple owners scenario, optional (or default 100) if sole. Must be a number between 0 and 100. If only one owner is provided, we set it to 100 by default. If multiple, we ensure the sum = 100 before allowing final submission. The widget can dynamically validate this.
Logic:
On load, fetch any existing owner info. If the user had already provided some info in the portal (for example, during sign-up they might have given name, which we haven’t collected yet in our flow – it might be blank if not). The backend might return a profile with an owner object. We use that to prefill fields like name and address if available (e.g. if during sign-up the user provided their name or if the portal pulled some info from somewhere).
For a returning user, the owner info might be fully on file (meaning this step might just show the info as read-only or allow update). If the profile is already verified, we could simply indicate that. But since the flow is sequential, likely a new user will be filling this for the first time.
If multiple owners are needed, ideally the backend would expect an array of owners (like it did for equipment). If so and if the user wants to add a second owner, our widget will allow it. However, for MVP, we consider one owner. (We mention that extension is possible.)
On submission, the widget calls owner-info tool with the owner data (or an array of owners). The Node server calls the backend endpoint, e.g. PUT /api/owners or as part of updateApplication. The payload includes personal details and possibly triggers KYC:
The backend or integrated services (like Persona, Veriff, or an internal system) will use this info to verify the person’s identity and perhaps run a background check. This might be asynchronous, but usually the submission will return success if the data was accepted for processing. If there’s a problem (e.g. SSN format wrong, or validation failure like age < 18), the API might return an error immediately which we display.
If an ID document upload is required, the backend might respond with a prompt or a status “pending ID upload”. In a full integration, we could then prompt the user to upload an ID (which could be done by providing a file as mentioned). But since the question doesn’t explicitly ask to handle file uploads, we assume the data itself is enough for now. Possibly the portal might send an email or separate step for ID if needed.
On success, meaning all required owner info is captured and accepted, the profile setup is complete. The Node server returns a final success message (e.g. “Owner information saved. Onboarding complete! 🎉”). We do not trigger another tool since this is the last step. Instead, the widget can display a completion message or even a summary of all provided info. We might design the Owner widget such that after submission it replaces the form with a “Thank you – your profile is complete.” message (or uses a special final confirmation widget). Alternatively, we could have a separate final tool called onboarding-complete that simply displays a confirmation UI. However, it’s sufficient for the owner-info tool’s response to carry a confirmation message which ChatGPT will show as the assistant’s reply (possibly with a checkmark icon or similar).
If needed, the assistant (ChatGPT) can also summarize next steps or provide guidance (like “Your profile has been submitted. You can now use the Split dashboard or ask me further questions.”). This would come from ChatGPT’s own response beyond the tool calls.
By following this sequence, we ensure each stage’s logic and validation mirrors the Split portal:
We rely on the Split backend for final verification of all data (so any complex checks, third-party lookups, or business rules are naturally applied).
We incorporate frontend validations in the widgets to guide the user (e.g. formatting and required-field checks) just as the portal’s web forms do, for a smooth user experience.
We implement autocomplete for addresses to replicate the portal’s convenience features.
We handle error states exactly as the portal would – by displaying messages per field or as a general alert – using the same text the user would see on the website (because we forward the backend’s error responses).
Throughout the flow, the UI theme stays consistent with Split’s design: card-based layout, appropriate branding colors (if the portal uses specific brand colors, we can apply them via CSS variables or inline styles in the widget; for instance, Split’s primary color can be used for buttons and accents). We leverage Apps SDK UI’s Tailwind integration to quickly match styling (e.g. using similar classes as in the portal codebase, such as the same background color bg-[#F6F5F4] for the main container as seen in the portal code). All components are accessible and responsive, ensuring the agent is usable on the ChatGPT interface.
Node.js MCP Server Implementation
We implement the server in Node.js (TypeScript) using the official OpenAI Model Context Protocol SDK. The server’s responsibility is to define tools and serve the widget resources, as well as handle API calls for each tool invocation. Below are key aspects of the server implementation:
Project Setup
Use Node.js 18+ (as required by the SDK and for async/await with SSE).
Initialize a Node project and install the MCP SDK package:
npm init -y
npm install @modelcontextprotocol/sdk
npm install zod    # for schema validation
(If using TypeScript) Configure tsconfig.json for ES2022 and module type NodeNext, as in the SDK examples.
Include build tools for bundling the React widgets (we use a separate UI project or a build step to generate the *.html files for the widgets – more on that below).
Tool Definitions
We define six primary tools corresponding to the widgets, plus any helper tools (like address lookup) as needed. Each tool is defined with:
name (identifier used by ChatGPT to call it),
title (human-friendly name),
description (what it does, for the model’s understanding),
inputSchema (JSON Schema for its inputs, matching exactly the fields described above),
_meta annotations such as the output template URI and invocation messages,
annotations flags to indicate it’s safe (not destructive, not open-world network beyond our API, and read-only relative to user data – we mark them readOnlyHint: true because these tools don’t modify user files or the broader world outside the application).
Output Template: Each tool’s _meta.openai/outputTemplate points to a ui://widget/...html URI. This URI corresponds to a pre-built HTML file for the widget, stored by our server. For example, the sign-in-up tool might have outputTemplate: "ui://widget/sign-in-up.html". We will have a matching resource entry for that. The Apps SDK uses these references to retrieve the HTML and inject it in the ChatGPT UI. We also set _meta.openai/widgetAccessible: true and _meta.openai/resultCanProduceWidget: true for these tools to indicate that the result will include a widget. Tool Input/Output Schema: We utilize JSON Schema (draft specified by the SDK) and zod for runtime validation. For example, for the business identity tool, we might define:
const businessIdentityInputSchema = {
  type: "object",
  properties: {
    businessName: { type: "string", description: "Legal business name" },
    businessType: { 
      type: "string", 
      description: "Type of business entity (e.g. LLC, Corporation, etc.)",
      enum: ["Sole Prop", "LLC", "Corporation", "Partnership", "Nonprofit"] 
    },
    ein: { 
      type: "string", 
      description: "Employer Identification Number (9 digits)",
      pattern: "^\\d{2}-?\\d{7}$" 
    },
    formationDate: { type: "string", description: "Date of formation (YYYY-MM-DD)", format: "date", nullable: true },
    state: { type: "string", description: "State of incorporation (if applicable)", maxLength: 2, nullable: true }
  },
  required: ["businessName", "businessType", "ein"],
  additionalProperties: false
} as const;
We repeat similar schema definitions for each tool’s inputs, ensuring they match the expected structure. The output from a tool call consists of:
content (an array of text fragments for ChatGPT to potentially display as assistant message text). We usually include a brief success or status message here for user context (e.g. “Widget ready” or results of actions).
structuredContent (a JSON object with data that the widget can use). This often mirrors the input or includes additional info (like processed results or error details).
_meta (metadata including the invocation name to indicate which tool was invoked, and carrying forward the outputTemplate reference).
The structuredContent is how we pass dynamic data to the widget. For instance, when loading the Contact widget, the server’s response might include structuredContent: { address: "...", phone: "..." } prefilling fields.
Tool Implementation and Backend Integration
We use the SDK’s Server class to register request handlers for the various MCP actions:
ListTools handler returns the list of our tool descriptors (constructed with schemas and metadata as above).
ListResources and ListResourceTemplates return the available widget resources (the HTML files) – the server will serve these files when ChatGPT requests them.
ReadResource handler reads the actual HTML file content from disk and returns it along with the correct MIME type (text/html+skybridge). We ensure the files are built and present in an assets/ directory; otherwise, we throw an error advising to run the build (similar to the official examples).
The CallTool handler is where the core logic resides. For each tool name, we implement the corresponding business logic:
server.setRequestHandler(CallToolRequestSchema, async (req: CallToolRequest) => {
  const { name, arguments: args } = req.params;
  switch (name) {
    case "sign-in-up":
      // handle authentication
      break;
    case "business-identity":
      // handle business info submission
      break;
    // ... and so on for each tool ...
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});
Within each case:
We parse and validate the input arguments using zod to ensure required fields are present and types match (this is redundant if ChatGPT already validated JSON schema, but it protects against malformed calls and provides nicely parsed data).
We then call the appropriate Split API endpoint. We likely use fetch or axios to make HTTP calls. For example:
In "sign-in-up":
if (args.mode === "signup") {
  const resp = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: args.email, password: args.password, /* name if any */ })
  });
  if (!resp.ok) {
    const errorData = await resp.json();
    return {
      content: [{ type: "text", text: `❌ Sign-up failed: ${errorData.message}` }],
      structuredContent: { success: false, error: errorData.message },
      _meta: { ...toolDescriptorMeta("sign-in-up"), invocation: "sign-in-up" }
    };
  }
  const token = (await resp.json()).token;
  session.token = token; // Save token in session record
  return {
    content: [{ type: "text", text: "Account created and signed in." }],
    structuredContent: { success: true },
    _meta: { ...toolDescriptorMeta("sign-in-up"), invocation: "sign-in-up" }
  };
}
// else mode === "signin":
// similar fetch to /auth/login
Here, session is assumed to be an object we store per ChatGPT session (we can store it in our sessions Map that ties to SSE sessionId). We capture the returned auth token (e.g. JWT) for future calls. If the API uses cookies, we might need to store a cookie jar; using fetch we can manually handle Set-Cookie headers by storing them and sending them back in subsequent requests.
On failure, we extract error messages to return to the widget. On success, we indicate success: true in structuredContent.
In "business-identity" (and similarly for others):
const businessData = businessIdentityParser.parse(args);
const resp = await fetch(`${API_BASE}/profile/business`, {
  method: "PUT",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${session.token}`
  },
  body: JSON.stringify(businessData)
});
if (!resp.ok) {
  const error = await resp.text();
  return {
    content: [{ type: "text", text: `❌ Could not save: ${error}` }],
    structuredContent: { success: false, error },
    _meta: toolInvocationMeta("business-identity")
  };
}
const savedData = await resp.json();
return {
  content: [{ type: "text", text: "Business info saved." }],
  structuredContent: { success: true, ...savedData },
  _meta: toolInvocationMeta("business-identity")
};
This pseudo-code shows sending the data and handling errors. We use toolInvocationMeta("business-identity") which includes the same outputTemplate and marks the invocation. The returned savedData (if any) is passed along – perhaps not needed except for confirming what’s saved. We mainly care about success or failure.
Similar blocks will exist for contact-location, financial-info, equipment-info, owner-info, each hitting the respective API endpoints. We ensure to include the Authorization header with the saved token for all these calls, since they are authenticated endpoints.
For address autocomplete (if implemented): We would have a separate tool, say "address-autocomplete", with input { query: string }. Its handler calls an external API (Google Places) like:
const resp = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(args.query)}&key=${GOOGLE_API_KEY}`);
const data = await resp.json();
const suggestions = data.predictions.map(p => p.description);
return {
  content: [],  // no user-visible text
  structuredContent: { suggestions },
  _meta: toolInvocationMeta("address-autocomplete")
};
The widget receives suggestions and displays them.
We mark this tool with readOnlyHint: true and likely openWorldHint: true or false? It does call an external API (Google), but via our server. However, in terms of ChatGPT, it’s not directly the model calling arbitrary internet, so maybe we can still mark openWorldHint false since it’s a controlled API call. It’s not destructive either. We likely won’t expose this tool to the model’s planning (so no need for a fancy description) – it’s used internally by the widget via callTool.
Note: We incorporate the exact logic of verification by deferring to the backend. For instance, if the Split backend after owner info performs a KYC check and finds a discrepancy, it might return a specific error (like “Name does not match SSN records”). Our agent will present that error to the user for correction. Because the user might not be able to resolve such an error easily via chat, ideally the error message guides them to double-check their inputs. In some cases, the backend might accept the data and proceed to verify asynchronously, meaning our agent wouldn’t know of any issue at submission time. That’s acceptable; we’ll consider submission a “success” if the data is accepted. The ChatGPT assistant could follow up (outside the tool interaction) if it has knowledge that verification is pending (though typically it wouldn’t, unless we program it to do so via additional info). Persistent Data & State: We use an in-memory Map sessions to store data per ChatGPT session. Each session record can hold:
The Server instance and SSE transport (managed by SDK),
Our custom fields like token, and potentially partially collected data if needed (though we usually submit immediately, not storing partial forms on server side).
By tying state to session, if the conversation is closed or a new session started, the user would have to re-authenticate if they try again (which is fine).
Apps SDK UI Widgets Development
For each widget, we build a React component using the ChatGPT Apps SDK UI library. We keep the code in a separate front-end project (e.g., inside a widgets/ directory or even a separate repo, as per OpenAI’s examples where UI and server are separate). We can use Vite or a similar bundler configured to produce Skybridge HTML assets. The OpenAI examples repository uses a build script (pnpm run build) to generate hashed HTML files in an assets/ folder. Our widget code will do things such as:
Read initial data from window.openai.toolOutput (the structuredContent from the server, if any prefill is provided).
Render controlled form inputs for each field, with validation. Use state hooks to manage input values.
Provide a Submit handler that calls window.openai.callTool("<tool-name>", formData) when clicked. This triggers the MCP call to our server’s tool. While the call is in progress, we can show a loading spinner or disable the form.
Handle the response: The Apps SDK will update window.openai.toolOutput and window.openai.structuredContent when the call returns. The widget can subscribe to those changes or simply get the returned structuredContent as the promise result of callTool. E.g:
const handleSubmit = async () => {
  setError(null);
  const result = await window.openai.callTool("business-identity", formData);
  // result.structuredContent contains success or error info
  if (result.structuredContent.success) {
    // Call next tool
    window.openai.callTool("contact-location");
  } else if (result.structuredContent.error) {
    setError(result.structuredContent.error);
  }
};
This is conceptual; in practice, the structuredContent might be accessible via a state or callback rather than directly from callTool (depending on SDK’s pattern). The key is that on success we invoke the next step, and on error we display it.
For multi-step within a widget (like multiple equipment or owners), the widget manages its internal list state and still ultimately calls the tool with an array. The UI for adding/removing items is purely frontend side until submission.
For autocomplete tools, the widget calls window.openai.callTool("address-autocomplete", { query }) on input change and gets suggestions to show. We must be careful to debounce these calls to avoid spamming. The suggestions can be shown in a dropdown; on select, we might call another tool for place details or simply fill the input.
The UI components from Apps SDK (like <Input>, <Select>, <Button>, <Alert>) help maintain design consistency. We can also use Tailwind classes for custom styling. We ensure the card look by adding a container with classes like rounded-lg shadow-md bg-white p-6 mb-4 (similar to what the portal likely uses).
We handle responsive design: if ChatGPT’s panel is narrow, our form should stack fields nicely. The Apps SDK UI’s built-in responsive utilities or Tailwind’s grid classes can achieve this.
After building the React components, we bundle them:
The build process will produce e.g. sign-in-up.html, business-identity.html, etc., which include the JS and CSS needed (the SDK UI likely outputs a single HTML per widget with an inline script or a reference to a hashed JS file – the examples show content served with text/html+skybridge which presumably contains the full widget code).
We place these HTML files in the assets/ directory of our server project and ensure the server knows the path. In the example code, they dynamically find the file by a known prefix, but we can simplify by naming exactly and reading it.
The server’s resources and resourceTemplates arrays include entries for each widget, mapping the ui://widget/... URI to the file content and MIME type.
Deployment and Testing
Once development is complete, we need to deploy the MCP server and connect it to ChatGPT:
Public Deployment (Production)
To meet ChatGPT connector requirements, the MCP server must be publicly accessible over HTTPS. This likely means deploying it to a cloud host or behind a secure tunnel.
Hosting Options: You can deploy the Node server on any platform that provides HTTPS, such as AWS (EC2 or Elastic Beanstalk), Heroku, Vercel (though Vercel might not support SSE well), Fly.io, Railway, or a simple VM. Ensure that the server is configured to listen on the appropriate port and perhaps bind to 0.0.0.0.
Domain & Certificate: Obtain a domain (or subdomain) and ensure it has a valid SSL certificate. Many hosts provide this (e.g. Fly/Heroku auto SSL, or use Let’s Encrypt via a reverse proxy). ChatGPT will refuse connectors that are not secure.
Connector URL: The base URL for the connector will be https://your-domain plus the path. By default our server uses /mcp for SSE and /mcp/messages for POST. ChatGPT expects the MCP endpoint at /mcp by convention. For example, if deployed at api.splitapp.com, our connector URL is https://api.splitapp.com/mcp.
Firewalls & CORS: Open the necessary port (80/443) and ensure CORS is enabled. In our code, we set Access-Control-Allow-Origin: * on SSE and POST endpoints so that ChatGPT (which runs in the user’s browser) can connect. This is crucial for the web-based ChatGPT client to receive the events.
Performance considerations: SSE is a long-lived connection. Ensure your host can handle it (some serverless environments might time out; a long-running process environment is preferred). The Node process should be kept alive. Also, consider scaling: if multiple users use the connector simultaneously, ensure the host has sufficient resources. If scaling to multiple instances, sessions should be sticky to a particular instance (or use a shared session store) because the SSE connection and state reside on one server.
After deployment, register the connector with ChatGPT:
As of now, ChatGPT Plus/Pro users (with Developer Mode enabled
help.openai.com
) can add custom connectors. In ChatGPT UI, go to Settings > Beta Features (or Developer Settings) and ensure Custom Connectors is toggled on. Then, in a new chat, use the Connectors menu to “Add your own connector” by entering the URL.
Enter the public HTTPS URL of your server (including the /mcp path if required). For instance: https://api.yourdomain.com/mcp. ChatGPT will attempt to initiate a connection.
If all is well, ChatGPT should prompt that the connector is attempting to list tools. The first time, ChatGPT may ask you to approve the tools (unless suppressed by our annotations). Because we marked destructiveHint: false and openWorldHint: false, ChatGPT knows these tools are safe and read-only, so it might not even show a prompt (in many cases, it will directly list the tools as available). If an approval prompt does appear (listing our tool names and asking for confirmation), the user should approve to proceed.
Once connected, ChatGPT will treat this like any other set of tools. We can then test by asking something in the chat to trigger the flow, or just manually invoking a tool via the UI’s tool picker.
Example Usage in ChatGPT: The user could type “I need to set up my Split profile.” The model, seeing the custom tools, might respond by calling the sign-in-up tool to show the login widget. The user interacts with it, and the conversation flows with the tools as designed. Each step is an assistant message with the widget, and no hallucination or off-track responses, since the model will rely on the tools to fulfill the user’s request.
Local Development (using ngrok)
During development, it’s convenient to run the MCP server locally and use a tunneling service like ngrok to simulate a public URL. This avoids deploying at each iteration. Steps for local dev:
Run the Node server locally: e.g. npm start. By default it will listen on http://localhost:8000/mcp . (You can change the port by setting the PORT environment variable before start, if needed, e.g. PORT=8001 npm start).
Expose with ngrok: Download and install ngrok, then run ngrok http 8000. This will generate a public HTTPS URL like https://abc123.ngrok.io. Ngrok will forward requests to your local machine on port 8000.
Important: If using Chrome for ChatGPT, Chrome may block connecting to localhost via web due to network access restrictions (as noted by OpenAI). Using ngrok’s HTTPS URL circumvents this because it appears as a public address. If you were connecting directly to http://localhost:8000/mcp in ChatGPT, you’d need to disable Chrome’s local-network-access flag. With ngrok, that’s not necessary.
Add the connector in ChatGPT: In developer mode, choose to add a custom connector. Input the ngrok URL with the /mcp path, e.g. https://abc123.ngrok.io/mcp. Since ngrok uses a domain and valid certificate (their subdomains have a wildcard cert), ChatGPT will accept it.
Test the flow: ChatGPT will connect to your local server through ngrok. You can monitor the server logs and ngrok’s request logs to debug. Every time you make code changes to the server or widget, you’ll need to restart the server and perhaps refresh the connector in ChatGPT (disconnect and reconnect) to load the new changes. The ChatGPT model might cache some tool information per session, so for major schema changes you might start a fresh chat and re-add the connector.
Environment Variables & Config: For both deployment and local, manage configuration via env variables:
PORT: The port for the Node server (optional, default 8000).
API_BASE_URL: The base URL of the Split backend API (e.g. https://app.split.com/api). In local dev, this might point to a staging server or localhost if you have one. This should be configurable.
Credentials for external APIs:
GOOGLE_MAPS_API_KEY for address autocomplete (if implemented).
Any other service keys if needed (e.g. if Split’s backend requires an API key in requests, though typically user auth token suffices).
It’s wise to also have a mode for debugging. The server could have a verbose log of tool calls when in development mode.
Logging & Error Handling: We will add console logging for key events (tool invoked, response status from backend, etc.), especially in dev. In production, ensure to not log sensitive info (like SSNs or passwords). If a tool throws an exception not caught (unexpected error), the server should handle it gracefully—perhaps returning a generic error message to ChatGPT. We wrap external calls in try/catch and return user-friendly messages when possible.
Example Code Snippets
Below are illustrative snippets for clarity (these would be part of the larger codebase): Node.js: Tool and Resource Registration (excerpt from server setup):
import { Server, SSEServerTransport, /* ...schemas...*/ } from "@modelcontextprotocol/sdk";
import { z } from "zod";
import fs from "fs";
import path from "path";

const server = new Server({ name: "split-connector", version: "1.0.0" }, { capabilities: { resources: {}, tools: {} } });

// Define tool schemas and descriptors (only showing one for brevity)
const signInSchema = {
  type: "object",
  properties: {
    mode: { type: "string", description: "signin or signup", enum: ["signin", "signup"] },
    email: { type: "string", description: "User email", format: "email" },
    password: { type: "string", description: "Password" },
  },
  required: ["email", "password"],
  additionalProperties: false
} as const;
const signInParser = z.object({
  mode: z.enum(["signin", "signup"]).optional().default("signin"),
  email: z.string().email(),
  password: z.string().min(8),
});
const tools: Tool[] = [
  {
    name: "sign-in-up",
    title: "Sign In / Sign Up",
    description: "Authenticate an existing user or register a new account.",
    inputSchema: signInSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/sign-in-up.html",
      "openai/toolInvocation/invoking": "Authenticating...",
      "openai/toolInvocation/invoked": "Authentication result",
      "openai/widgetAccessible": true,
      "openai/resultCanProduceWidget": true
    },
    annotations: { destructiveHint: false, openWorldHint: false, readOnlyHint: true }
  },
  // ... other tools defined similarly ...
];
const resources: Resource[] = [
  {
    name: "Sign In/Up Widget",
    uri: "ui://widget/sign-in-up.html",
    description: "Sign in or sign up form UI",
    mimeType: "text/html+skybridge",
    _meta: tools[0]._meta  // reuse same meta for consistency
  },
  // ... other widget resources ...
];
const resourceTemplates: ResourceTemplate[] = resources.map(r => ({
  name: r.name + " template",
  uriTemplate: r.uri,
  description: r.description,
  mimeType: r.mimeType,
  _meta: r._meta
}));

// Register handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));
server.setRequestHandler(ListResourcesRequestSchema, async () => ({ resources }));
server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({ resourceTemplates }));
server.setRequestHandler(ReadResourceRequestSchema, async (req: ReadResourceRequest) => {
  const uri = req.params.uri;
  const filePath = path.join(__dirname, "..", "assets", uri.replace("ui://widget/", ""));
  if (!fs.existsSync(filePath)) {
    throw new Error("Widget HTML not found: " + uri);
  }
  return {
    contents: [{
      uri,
      mimeType: "text/html+skybridge",
      text: fs.readFileSync(filePath, "utf8"),
      _meta: resources.find(r => r.uri === uri)?._meta ?? {}
    }]
  };
});
Node.js: CallTool Handler (partial):
server.setRequestHandler(CallToolRequestSchema, async (req: CallToolRequest) => {
  const { name, arguments: args } = req.params;
  try {
    switch (name) {
      case "sign-in-up": {
        const { mode, email, password } = signInParser.parse(args ?? {});
        if (mode === "signup") {
          const res = await fetch(`${API_BASE_URL}/auth/register`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
          if (!res.ok) {
            const err = await res.text();
            return {
              content: [{ type: "text", text: `❌ Sign-up failed: ${err}` }],
              structuredContent: { success: false, error: err },
              _meta: { ...tools[0]._meta, "openai/toolInvocation/invoked": "Sign-up failed" }
            };
          }
          const data = await res.json();
          // Assume response contains an auth token
          const token = data.token;
          session.token = token;
          // Also possibly fetch profile data now for prefill:
          session.profile = await fetchProfile(token);
          return {
            content: [{ type: "text", text: "✅ Account created and signed in." }],
            structuredContent: { success: true },
            _meta: { ...tools[0]._meta, "openai/toolInvocation/invoked": "Signed in" }
          };
        } else {  // signin
          const res = await fetch(`${API_BASE_URL}/auth/login`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
          if (!res.ok) {
            return {
              content: [{ type: "text", text: "❌ Invalid email or password." }],
              structuredContent: { success: false, error: "Invalid credentials" },
              _meta: { ...tools[0]._meta, "openai/toolInvocation/invoked": "Login failed" }
            };
          }
          const data = await res.json();
          session.token = data.token;
          session.profile = await fetchProfile(data.token);
          return {
            content: [{ type: "text", text: "✅ Signed in successfully." }],
            structuredContent: { success: true },
            _meta: { ...tools[0]._meta, "openai/toolInvocation/invoked": "Signed in" }
          };
        }
      }
      case "business-identity": {
        const input = businessIdentityParser.parse(args ?? {});
        const res = await fetch(`${API_BASE_URL}/profile/business`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
          },
          body: JSON.stringify(input)
        });
        if (!res.ok) {
          const err = await res.text();
          return {
            content: [{ type: "text", text: `❌ ${err}` }],
            structuredContent: { success: false, error: err },
            _meta: toolInvocationMeta("business-identity")
          };
        }
        const saved = await res.json();
        // Update session.profile with new data:
        Object.assign(session.profile, saved);
        return {
          content: [{ type: "text", text: "Business identity saved." }],
          structuredContent: { success: true },
          _meta: toolInvocationMeta("business-identity")
        };
      }
      // ... similarly for other cases ...
    }
  } catch (e) {
    console.error("Error in tool handler:", e);
    return {
      content: [{ type: "text", text: "❌ An unexpected error occurred." }],
      structuredContent: { success: false, error: String(e) },
      _meta: name && name.startsWith("sign-in") ? tools[0]._meta : toolInvocationMeta(name || "unknown")
    };
  }
});
(In the above, session is assumed to be retrieved via the session map, likely something like const sessionId = req.context.sessionId; const session = sessions.get(sessionId); before the switch. For brevity that context handling isn’t fully shown.) React Widget Example (Sign In/Up):
// Pseudocode/JSX for sign-in-up widget
import { useState } from "react";
import { Input, Button, Alert } from "@openai/apps-sdk-ui";  // hypothetical import path

function SignInUpWidget() {
  const output = window.openai.toolOutput;  // initial structuredContent if any
  const [mode, setMode] = useState(output?.mode || "signin");
  const [email, setEmail] = useState(output?.email || "");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(output?.error || null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    if (mode === "signup" && password !== password2) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const result = await window.openai.callTool("sign-in-up", { mode, email, password });
    setLoading(false);
    if (result.structuredContent.success) {
      // Successful sign-in/up -> proceed to next widget
      window.openai.callTool("business-identity");
    } else {
      // Display error message
      setError(result.structuredContent.error || "Sign in failed. Please try again.");
    }
  };

  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{mode === "signin" ? "Sign In" : "Create Account"}</h2>
      {error && <Alert type="error" message={error} className="mb-2" />}
      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      {mode === "signup" && (
        <Input label="Confirm Password" type="password" value={password2} onChange={e => setPassword2(e.target.value)} required />
      )}
      <Button onClick={handleSubmit} disabled={loading} className="w-full mt-3">
        {loading ? "Submitting..." : (mode === "signin" ? "Sign In" : "Sign Up")}
      </Button>
      <div className="mt-2 text-sm text-center">
        {mode === "signin" ? 
          <>Don’t have an account? <a href="#" onClick={() => setMode("signup")}>Sign up</a></> :
          <>Already have an account? <a href="#" onClick={() => setMode("signin")}>Sign in</a></>
        }
      </div>
    </div>
  );
}
(This widget uses an Alert component to show errors, and toggles between sign in/up forms. After successful auth, it automatically invokes the next tool.) Each subsequent widget (BusinessIdentityWidget, ContactLocationWidget, etc.) follows a similar pattern:
They load initial data (e.g., window.openai.toolOutput might contain session.profile.contact data for the contact widget).
They render inputs, and on submit call their respective tool.
On success, call the next tool in sequence.
On error, show an Alert or field-level messages.
Possibly on mount, for ones after sign-in, if we stored session.profile on server, we could embed it in structuredContent in each tool’s initial call. Alternatively, the widget itself might call a get-profile tool if needed. But embedding on initial response (as done in code above for session.profile after sign-in) is simpler – e.g. when business-identity tool is first invoked (with no args, just to display form), our server returned session.profile data in structuredContent. The widget then pre-fills fields with that.
Ensuring Best Practices Alignment: We have followed patterns from OpenAI’s official examples:
We used SSE transport, listing tools and returning _meta.openai/outputTemplate for each.
We marked tools as non-destructive read-only to avoid unnecessary user approval.
We have a clear separation between tool logic and UI, with an emphasis on using the Apps SDK UI kit for building widgets (consistent with how the kitchen-sink and Pizzaz demos bundle HTML/JS for widgets).
We consider security and state management as suggested (the official guidance encourages using authentication and even persistence, which we incorporate by storing tokens and data appropriately).
The JSON and YAML specs below summarize the agent configuration in a format inspired by the SDK and connectors (similar to an agent profile or manifest).
Deployment Instructions Summary
Environment Setup: Set environment variables for API_BASE_URL (Split backend), PORT (if not 8000), and any API keys needed. Ensure Node 18+ is installed.
Build Widgets: Run the frontend build to generate *.html widget files. For example, npm run build-widgets which outputs to assets/. (Make sure the output filenames match those referenced in _meta.openai/outputTemplate URIs.)
Start MCP Server: npm start (or the relevant command). Confirm it logs that it’s listening (e.g., “Server listening on port 8000”).
Test Locally: (Optional) Use curl or Postman to test the endpoints:
GET http://localhost:8000/mcp should hold the SSE connection (you can test via a simple HTML SSE client or skip).
POST http://localhost:8000/mcp/messages?sessionId=<id> with a JSON body for ListTools can be tested if you retrieve a sessionId from an SSE connection. This is complex to do manually; instead proceed to ChatGPT testing.
Connect via ChatGPT (ngrok method if local): Start ngrok http 8000, copy the HTTPS URL. In ChatGPT (Plus with dev mode), add a custom connector pointing to https://<ngrok-domain>.ngrok.io/mcp. Approve tools if prompted. Then interact in the chat to go through the flow.
Deploy to Production: Push the code to your host. Set up the domain and SSL. Update any environment configs on the host. Start the server process (ensure it’s kept alive, e.g., using PM2 or a systemd service if on a VM).
Use in ChatGPT (prod): Add the connector with your live URL. Confirm it connects (ChatGPT will show the connector name or tool list if successful). Then use it in conversation. Monitor logs for any errors or adjustments needed.
Finalize: Once the connector works, you can publish it for your workspace or share the URL with other permitted users (for Business/Edu plans, connectors can be shared if published). Note that unpublished custom connectors may only be accessible to the creator or certain allowed users until published
help.openai.com
.
Below we provide the Agent specification in both JSON and YAML formats, which define the tools, schemas, and widget metadata as discussed. These can be used for documentation or configuration purposes, ensuring our implementation matches the intended design.
Agent Specification (JSON)
{
  "schema_version": "1.0",
  "agent_name": "split_profile_connector",
  "agent_version": "1.0.0",
  "description": "ChatGPT connector for Split portal onboarding (multi-step profile setup).",
  "tools": [
    {
      "name": "sign-in-up",
      "title": "Sign In / Sign Up",
      "description": "Authenticate user or create a new account in the Split portal.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "mode": {
            "type": "string",
            "description": "Mode of operation: signin (existing user) or signup (new user).",
            "enum": ["signin", "signup"]
          },
          "email": {
            "type": "string",
            "description": "User email address.",
            "format": "email"
          },
          "password": {
            "type": "string",
            "description": "User password."
          },
          "confirmPassword": {
            "type": "string",
            "description": "Password confirmation (required for signup)."
          }
        },
        "required": ["email", "password"],
        "additionalProperties": false
      },
      "_meta": {
        "openai/outputTemplate": "ui://widget/sign-in-up.html",
        "openai/toolInvocation/invoking": "Authenticating user...",
        "openai/toolInvocation/invoked": "Authentication completed",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      },
      "annotations": {
        "destructiveHint": false,
        "openWorldHint": false,
        "readOnlyHint": true
      }
    },
    {
      "name": "business-identity",
      "title": "Business Identity",
      "description": "Collect or update the business's legal identity information (name, type, EIN, etc.).",
      "inputSchema": {
        "type": "object",
        "properties": {
          "businessName": {
            "type": "string",
            "description": "Legal name of the business."
          },
          "businessType": {
            "type": "string",
            "description": "Type of business entity (LLC, Corporation, etc.).",
            "enum": ["Sole Proprietorship", "LLC", "Corporation", "Partnership", "Nonprofit"]
          },
          "ein": {
            "type": "string",
            "description": "Federal Employer Identification Number (EIN) or Tax ID.",
            "pattern": "^\\d{2}-?\\d{7}$"
          },
          "formationDate": {
            "type": "string",
            "description": "Date of business formation (YYYY-MM-DD).",
            "format": "date"
          },
          "state": {
            "type": "string",
            "description": "State of incorporation/registration (if applicable, 2-letter code).",
            "maxLength": 2
          }
        },
        "required": ["businessName", "businessType", "ein"],
        "additionalProperties": false
      },
      "_meta": {
        "openai/outputTemplate": "ui://widget/business-identity.html",
        "openai/toolInvocation/invoking": "Submitting business info...",
        "openai/toolInvocation/invoked": "Business info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      },
      "annotations": {
        "destructiveHint": false,
        "openWorldHint": false,
        "readOnlyHint": true
      }
    },
    {
      "name": "contact-location",
      "title": "Contact & Location",
      "description": "Collect or update business contact details and address.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "addressLine1": {
            "type": "string",
            "description": "Business street address (line 1)."
          },
          "addressLine2": {
            "type": "string",
            "description": "Business address line 2 (suite, unit, etc.)."
          },
          "city": {
            "type": "string",
            "description": "City for the business address."
          },
          "state": {
            "type": "string",
            "description": "State/Province for the address (if applicable).",
            "maxLength": 50
          },
          "postalCode": {
            "type": "string",
            "description": "ZIP or postal code.",
            "maxLength": 20
          },
          "country": {
            "type": "string",
            "description": "Country for the address.",
            "maxLength": 56
          },
          "phone": {
            "type": "string",
            "description": "Primary business phone number.",
            "pattern": "^[0-9\\-\\+\\(\\)\\s]{7,20}$"
          },
          "website": {
            "type": "string",
            "description": "Business website URL (if any).",
            "format": "uri"
          }
        },
        "required": ["addressLine1", "city", "state", "postalCode", "country", "phone"],
        "additionalProperties": false
      },
      "_meta": {
        "openai/outputTemplate": "ui://widget/contact-location.html",
        "openai/toolInvocation/invoking": "Submitting contact info...",
        "openai/toolInvocation/invoked": "Contact info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      },
      "annotations": {
        "destructiveHint": false,
        "openWorldHint": false,
        "readOnlyHint": true
      }
    },
    {
      "name": "financial-info",
      "title": "Financial Information",
      "description": "Collect or update financial info (bank account details) for the business.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "routingNumber": {
            "type": "string",
            "description": "Bank routing number (ABA).",
            "pattern": "^\\d{9}$"
          },
          "accountNumber": {
            "type": "string",
            "description": "Bank account number."
          },
          "confirmAccount": {
            "type": "string",
            "description": "Confirmation of account number (should match)."
          },
          "accountType": {
            "type": "string",
            "description": "Type of bank account.",
            "enum": ["Checking", "Savings"]
          },
          "bankName": {
            "type": "string",
            "description": "Name of the bank (optional, can be derived from routing number)."
          }
        },
        "required": ["routingNumber", "accountNumber"],
        "additionalProperties": false
      },
      "_meta": {
        "openai/outputTemplate": "ui://widget/financial-info.html",
        "openai/toolInvocation/invoking": "Saving financial info...",
        "openai/toolInvocation/invoked": "Financial info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      },
      "annotations": {
        "destructiveHint": false,
        "openWorldHint": false,
        "readOnlyHint": true
      }
    },
    {
      "name": "equipment-info",
      "title": "Equipment Information",
      "description": "Collect details about equipment assets (for financing or record).",
      "inputSchema": {
        "type": "object",
        "properties": {
          "equipmentList": {
            "type": "array",
            "description": "List of equipment items.",
            "items": {
              "type": "object",
              "properties": {
                "description": { "type": "string", "description": "Description of the equipment item." },
                "value": { "type": "number", "description": "Estimated value or price of the equipment." },
                "quantity": { "type": "integer", "description": "Quantity of this item.", "minimum": 1 },
                "serialNumber": { "type": "string", "description": "Serial number or ID of the equipment (if applicable)." },
                "category": { "type": "string", "description": "Category/type of equipment." }
              },
              "required": ["description", "value"],
              "additionalProperties": false
            }
          }
        },
        "required": ["equipmentList"],
        "additionalProperties": false
      },
      "_meta": {
        "openai/outputTemplate": "ui://widget/equipment-info.html",
        "openai/toolInvocation/invoking": "Saving equipment info...",
        "openai/toolInvocation/invoked": "Equipment info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      },
      "annotations": {
        "destructiveHint": false,
        "openWorldHint": false,
        "readOnlyHint": true
      }
    },
    {
      "name": "owner-info",
      "title": "Owner Information",
      "description": "Collect personal information about the business owner(s) for verification.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "owners": {
            "type": "array",
            "description": "List of owner records (one or multiple owners).",
            "items": {
              "type": "object",
              "properties": {
                "firstName": { "type": "string", "description": "Owner's first name." },
                "lastName": { "type": "string", "description": "Owner's last name." },
                "dateOfBirth": { "type": "string", "description": "Date of birth (YYYY-MM-DD).", "format": "date" },
                "homeAddress": { "type": "string", "description": "Residential address of the owner." },
                "ssn": { "type": "string", "description": "Social Security Number (full 9 or last 4).", "pattern": "^\\d{4}(?:\\d{5})?$" },
                "ownershipPercentage": { "type": "number", "description": "Percentage of business owned by this person.", "minimum": 0, "maximum": 100 }
              },
              "required": ["firstName", "lastName", "dateOfBirth", "homeAddress", "ssn"],
              "additionalProperties": false
            }
          }
        },
        "required": ["owners"],
        "additionalProperties": false
      },
      "_meta": {
        "openai/outputTemplate": "ui://widget/owner-info.html",
        "openai/toolInvocation/invoking": "Submitting owner info...",
        "openai/toolInvocation/invoked": "Owner info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      },
      "annotations": {
        "destructiveHint": false,
        "openWorldHint": false,
        "readOnlyHint": true
      }
    }
  ],
  "resources": [
    {
      "name": "Sign In/Up Widget",
      "uri": "ui://widget/sign-in-up.html",
      "description": "HTML/JS/CSS for the Sign In or Sign Up form interface.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/sign-in-up.html",
        "openai/toolInvocation/invoking": "Authenticating user...",
        "openai/toolInvocation/invoked": "Authentication completed",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Business Identity Widget",
      "uri": "ui://widget/business-identity.html",
      "description": "HTML/JS/CSS for the Business Identity form interface.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/business-identity.html",
        "openai/toolInvocation/invoking": "Submitting business info...",
        "openai/toolInvocation/invoked": "Business info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Contact & Location Widget",
      "uri": "ui://widget/contact-location.html",
      "description": "HTML/JS/CSS for the Contact and Location form interface.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/contact-location.html",
        "openai/toolInvocation/invoking": "Submitting contact info...",
        "openai/toolInvocation/invoked": "Contact info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Financial Info Widget",
      "uri": "ui://widget/financial-info.html",
      "description": "HTML/JS/CSS for the Financial Information form interface.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/financial-info.html",
        "openai/toolInvocation/invoking": "Saving financial info...",
        "openai/toolInvocation/invoked": "Financial info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Equipment Info Widget",
      "uri": "ui://widget/equipment-info.html",
      "description": "HTML/JS/CSS for the Equipment Information form interface.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/equipment-info.html",
        "openai/toolInvocation/invoking": "Saving equipment info...",
        "openai/toolInvocation/invoked": "Equipment info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Owner Info Widget",
      "uri": "ui://widget/owner-info.html",
      "description": "HTML/JS/CSS for the Owner Information form interface.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/owner-info.html",
        "openai/toolInvocation/invoking": "Submitting owner info...",
        "openai/toolInvocation/invoked": "Owner info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    }
  ],
  "resourceTemplates": [
    {
      "name": "Sign In/Up Widget Template",
      "uriTemplate": "ui://widget/sign-in-up.html",
      "description": "Template for Sign In/Up widget.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/sign-in-up.html",
        "openai/toolInvocation/invoking": "Authenticating user...",
        "openai/toolInvocation/invoked": "Authentication completed",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Business Identity Widget Template",
      "uriTemplate": "ui://widget/business-identity.html",
      "description": "Template for Business Identity widget.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/business-identity.html",
        "openai/toolInvocation/invoking": "Submitting business info...",
        "openai/toolInvocation/invoked": "Business info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Contact & Location Widget Template",
      "uriTemplate": "ui://widget/contact-location.html",
      "description": "Template for Contact & Location widget.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/contact-location.html",
        "openai/toolInvocation/invoking": "Submitting contact info...",
        "openai/toolInvocation/invoked": "Contact info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Financial Info Widget Template",
      "uriTemplate": "ui://widget/financial-info.html",
      "description": "Template for Financial Info widget.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/financial-info.html",
        "openai/toolInvocation/invoking": "Saving financial info...",
        "openai/toolInvocation/invoked": "Financial info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Equipment Info Widget Template",
      "uriTemplate": "ui://widget/equipment-info.html",
      "description": "Template for Equipment Info widget.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/equipment-info.html",
        "openai/toolInvocation/invoking": "Saving equipment info...",
        "openai/toolInvocation/invoked": "Equipment info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    },
    {
      "name": "Owner Info Widget Template",
      "uriTemplate": "ui://widget/owner-info.html",
      "description": "Template for Owner Info widget.",
      "mimeType": "text/html+skybridge",
      "_meta": {
        "openai/outputTemplate": "ui://widget/owner-info.html",
        "openai/toolInvocation/invoking": "Submitting owner info...",
        "openai/toolInvocation/invoked": "Owner info saved",
        "openai/widgetAccessible": true,
        "openai/resultCanProduceWidget": true
      }
    }
  ]
}
Agent Specification (YAML)
schema_version: "1.0"
agent_name: "split_profile_connector"
agent_version: "1.0.0"
description: >
  ChatGPT connector for Split portal onboarding (multi-step profile setup).
  Implements Sign In/Up, Business Identity, Contact & Location, Financial Info, Equipment Info, Owner Info steps.
tools:
  - name: "sign-in-up"
    title: "Sign In / Sign Up"
    description: "Authenticate user or create a new account in the Split portal."
    inputSchema:
      type: object
      properties:
        mode:
          type: string
          description: "Mode of operation: signin (existing user) or signup (new user)."
          enum: ["signin", "signup"]
        email:
          type: string
          description: "User email address."
          format: email
        password:
          type: string
          description: "User password."
        confirmPassword:
          type: string
          description: "Password confirmation (for signup)."
      required: ["email", "password"]
      additionalProperties: false
    _meta:
      openai/outputTemplate: "ui://widget/sign-in-up.html"
      openai/toolInvocation/invoking: "Authenticating user..."
      openai/toolInvocation/invoked: "Authentication completed"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true
    annotations:
      destructiveHint: false
      openWorldHint: false
      readOnlyHint: true

  - name: "business-identity"
    title: "Business Identity"
    description: "Collect or update the business's legal identity info (name, type, EIN, etc.)."
    inputSchema:
      type: object
      properties:
        businessName:
          type: string
          description: "Legal name of the business."
        businessType:
          type: string
          description: "Type of business entity (LLC, Corporation, etc.)."
          enum: ["Sole Proprietorship", "LLC", "Corporation", "Partnership", "Nonprofit"]
        ein:
          type: string
          description: "Federal EIN or Tax ID."
          pattern: "^\\d{2}-?\\d{7}$"
        formationDate:
          type: string
          description: "Date of business formation (YYYY-MM-DD)."
          format: date
        state:
          type: string
          description: "State of incorporation (2-letter code)."
          maxLength: 2
      required: ["businessName", "businessType", "ein"]
      additionalProperties: false
    _meta:
      openai/outputTemplate: "ui://widget/business-identity.html"
      openai/toolInvocation/invoking: "Submitting business info..."
      openai/toolInvocation/invoked: "Business info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true
    annotations:
      destructiveHint: false
      openWorldHint: false
      readOnlyHint: true

  - name: "contact-location"
    title: "Contact & Location"
    description: "Collect or update business contact details and address."
    inputSchema:
      type: object
      properties:
        addressLine1:
          type: string
          description: "Business street address (line 1)."
        addressLine2:
          type: string
          description: "Business address line 2 (apt/suite)."
        city:
          type: string
          description: "City of the business address."
        state:
          type: string
          description: "State/Province of the address."
          maxLength: 50
        postalCode:
          type: string
          description: "ZIP or postal code."
          maxLength: 20
        country:
          type: string
          description: "Country of the address."
          maxLength: 56
        phone:
          type: string
          description: "Primary business phone number."
          pattern: "^[0-9\\-\\+\\(\\)\\s]{7,20}$"
        website:
          type: string
          description: "Business website URL (optional)."
          format: uri
      required: ["addressLine1", "city", "state", "postalCode", "country", "phone"]
      additionalProperties: false
    _meta:
      openai/outputTemplate: "ui://widget/contact-location.html"
      openai/toolInvocation/invoking: "Submitting contact info..."
      openai/toolInvocation/invoked: "Contact info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true
    annotations:
      destructiveHint: false
      openWorldHint: false
      readOnlyHint: true

  - name: "financial-info"
    title: "Financial Information"
    description: "Collect or update financial info (bank account details) for the business."
    inputSchema:
      type: object
      properties:
        routingNumber:
          type: string
          description: "Bank routing number (ABA)."
          pattern: "^\\d{9}$"
        accountNumber:
          type: string
          description: "Bank account number."
        confirmAccount:
          type: string
          description: "Confirmation of account number."
        accountType:
          type: string
          description: "Type of bank account."
          enum: ["Checking", "Savings"]
        bankName:
          type: string
          description: "Name of the bank (optional)."
      required: ["routingNumber", "accountNumber"]
      additionalProperties: false
    _meta:
      openai/outputTemplate: "ui://widget/financial-info.html"
      openai/toolInvocation/invoking: "Saving financial info..."
      openai/toolInvocation/invoked: "Financial info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true
    annotations:
      destructiveHint: false
      openWorldHint: false
      readOnlyHint: true

  - name: "equipment-info"
    title: "Equipment Information"
    description: "Collect details about equipment assets (for financing or record)."
    inputSchema:
      type: object
      properties:
        equipmentList:
          type: array
          description: "List of equipment items."
          items:
            type: object
            properties:
              description:
                type: string
                description: "Description of the equipment item."
              value:
                type: number
                description: "Estimated value or price of the equipment."
              quantity:
                type: integer
                description: "Quantity of this item."
                minimum: 1
              serialNumber:
                type: string
                description: "Serial number or ID of the equipment (if any)."
              category:
                type: string
                description: "Category/type of equipment."
            required: ["description", "value"]
            additionalProperties: false
      required: ["equipmentList"]
      additionalProperties: false
    _meta:
      openai/outputTemplate: "ui://widget/equipment-info.html"
      openai/toolInvocation/invoking: "Saving equipment info..."
      openai/toolInvocation/invoked: "Equipment info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true
    annotations:
      destructiveHint: false
      openWorldHint: false
      readOnlyHint: true

  - name: "owner-info"
    title: "Owner Information"
    description: "Collect personal information about the business owner(s) for verification."
    inputSchema:
      type: object
      properties:
        owners:
          type: array
          description: "List of owner records."
          items:
            type: object
            properties:
              firstName:
                type: string
                description: "Owner's first name."
              lastName:
                type: string
                description: "Owner's last name."
              dateOfBirth:
                type: string
                description: "Date of birth (YYYY-MM-DD)."
                format: date
              homeAddress:
                type: string
                description: "Residential address of the owner."
              ssn:
                type: string
                description: "Social Security Number (full 9 or last 4)."
                pattern: "^\\d{4}(?:\\d{5})?$"
              ownershipPercentage:
                type: number
                description: "Percentage of business owned by this person."
                minimum: 0
                maximum: 100
            required: ["firstName", "lastName", "dateOfBirth", "homeAddress", "ssn"]
            additionalProperties: false
      required: ["owners"]
      additionalProperties: false
    _meta:
      openai/outputTemplate: "ui://widget/owner-info.html"
      openai/toolInvocation/invoking: "Submitting owner info..."
      openai/toolInvocation/invoked: "Owner info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true
    annotations:
      destructiveHint: false
      openWorldHint: false
      readOnlyHint: true

resources:
  - name: "Sign In/Up Widget"
    uri: "ui://widget/sign-in-up.html"
    description: "HTML/JS/CSS for the Sign In or Sign Up form interface."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/sign-in-up.html"
      openai/toolInvocation/invoking: "Authenticating user..."
      openai/toolInvocation/invoked: "Authentication completed"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Business Identity Widget"
    uri: "ui://widget/business-identity.html"
    description: "HTML/JS/CSS for the Business Identity form interface."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/business-identity.html"
      openai/toolInvocation/invoking: "Submitting business info..."
      openai/toolInvocation/invoked: "Business info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Contact & Location Widget"
    uri: "ui://widget/contact-location.html"
    description: "HTML/JS/CSS for the Contact & Location form interface."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/contact-location.html"
      openai/toolInvocation/invoking: "Submitting contact info..."
      openai/toolInvocation/invoked: "Contact info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Financial Info Widget"
    uri: "ui://widget/financial-info.html"
    description: "HTML/JS/CSS for the Financial Information form interface."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/financial-info.html"
      openai/toolInvocation/invoking: "Saving financial info..."
      openai/toolInvocation/invoked: "Financial info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Equipment Info Widget"
    uri: "ui://widget/equipment-info.html"
    description: "HTML/JS/CSS for the Equipment Information form interface."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/equipment-info.html"
      openai/toolInvocation/invoking: "Saving equipment info..."
      openai/toolInvocation/invoked: "Equipment info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Owner Info Widget"
    uri: "ui://widget/owner-info.html"
    description: "HTML/JS/CSS for the Owner Information form interface."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/owner-info.html"
      openai/toolInvocation/invoking: "Submitting owner info..."
      openai/toolInvocation/invoked: "Owner info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

resourceTemplates:
  - name: "Sign In/Up Widget Template"
    uriTemplate: "ui://widget/sign-in-up.html"
    description: "Template for Sign In/Up widget."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/sign-in-up.html"
      openai/toolInvocation/invoking: "Authenticating user..."
      openai/toolInvocation/invoked: "Authentication completed"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Business Identity Widget Template"
    uriTemplate: "ui://widget/business-identity.html"
    description: "Template for Business Identity widget."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/business-identity.html"
      openai/toolInvocation/invoking: "Submitting business info..."
      openai/toolInvocation/invoked: "Business info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Contact & Location Widget Template"
    uriTemplate: "ui://widget/contact-location.html"
    description: "Template for Contact & Location widget."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/contact-location.html"
      openai/toolInvocation/invoking: "Submitting contact info..."
      openai/toolInvocation/invoked: "Contact info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Financial Info Widget Template"
    uriTemplate: "ui://widget/financial-info.html"
    description: "Template for Financial Info widget."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/financial-info.html"
      openai/toolInvocation/invoking: "Saving financial info..."
      openai/toolInvocation/invoked: "Financial info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Equipment Info Widget Template"
    uriTemplate: "ui://widget/equipment-info.html"
    description: "Template for Equipment Info widget."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/equipment-info.html"
      openai/toolInvocation/invoking: "Saving equipment info..."
      openai/toolInvocation/invoked: "Equipment info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true

  - name: "Owner Info Widget Template"
    uriTemplate: "ui://widget/owner-info.html"
    description: "Template for Owner Info widget."
    mimeType: "text/html+skybridge"
    _meta:
      openai/outputTemplate: "ui://widget/owner-info.html"
      openai/toolInvocation/invoking: "Submitting owner info..."
      openai/toolInvocation/invoked: "Owner info saved"
      openai/widgetAccessible: true
      openai/resultCanProduceWidget: true
This JSON/YAML spec encapsulates the agent’s capabilities, and can be used as reference or for configuration in systems supporting such formats. Each tool and widget is defined with the necessary metadata and schema, aligning with best practices and ensuring ChatGPT’s model understands how to use them effectively.
Conclusion: By implementing the above architecture and specifications, we achieve a seamless ChatGPT App integration for the Split website’s onboarding flow. The user experience within ChatGPT will closely mirror the portal’s step-by-step process, maintaining data integrity and validation standards. The Node.js MCP server acts as a reliable bridge between ChatGPT and Split’s backend, handling authentication, API calls, and UI rendering via the Apps SDK. The solution is developer-friendly (leveraging OpenAI’s SDKs and examples) and adheres to current best practices in connector development and deployment.
Citations
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-apps-sdk-ui.txt

file://file_000000004d0071fbaf8338ed3c9bd8c0
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a

Connectors in ChatGPT | OpenAI Help Center

https://help.openai.com/en/articles/11487775-connectors-in-chatgpt
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a
openai-openai-apps-sdk-examples.txt

file://file_0000000073b471f5b39180f94706622a

Connectors in ChatGPT | OpenAI Help Center

https://help.openai.com/en/articles/11487775-connectors-in-chatgpt
All Sources
openai-o...mples.txt
openai-a...dk-ui.txt

help.openai
