export type Locale = "en" | "hi" | "te" | "kn" | "ta" | "ml";

export const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "te", label: "తెలుగు" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ta", label: "தமிழ்" },
  { code: "ml", label: "മലയാളം" },
];

export const defaultLocale: Locale = "en";

export type TranslationKey =
  | "nav.language"
  | "hero.title"
  | "hero.subtitle"
  | "hero.cta"
  | "tabs.fintech"
  | "tabs.agritech"
  | "tabs.unified"
  | "fintech.heading"
  | "fintech.description"
  | "agritech.heading"
  | "agritech.description"
  | "unified.heading"
  | "unified.description"
  | "modules.farmgate"
  | "modules.cropAdvisory"
  | "modules.weather"
  | "modules.marketplace"
  | "modules.wallet"
  | "modules.loanChecker"
  | "comingSoon"
  | "mission.label"
  | "mission.heading"
  | "mission.body"
  | "mission.pillar1.title"
  | "mission.pillar1.body"
  | "mission.pillar2.title"
  | "mission.pillar2.body"
  | "mission.pillar3.title"
  | "mission.pillar3.body"
  | "grid.heading"
  | "grid.banner.title"
  | "grid.banner.body"
  | "grid.title1"
  | "grid.body1"
  | "grid.title2"
  | "grid.body2"
  | "grid.title3"
  | "grid.body3"
  | "grid.title4"
  | "grid.body4"
  | "grid.title5"
  | "grid.body5"
  | "grid.title6"
  | "grid.body6"
  | "cta.heading"
  | "cta.subheading"
  | "cta.button"
  | "login.heading"
  | "login.subtitle"
  | "login.phoneLabel"
  | "login.sendOtp"
  | "login.sending"
  | "login.phoneError"
  | "login.otpHeading"
  | "login.otpSubtitle"
  | "login.otpError"
  | "login.verify"
  | "login.verifying"
  | "login.registerHeading"
  | "login.registerSubtitle"
  | "login.fullNameLabel"
  | "login.fullNamePlaceholder"
  | "login.addressLabel"
  | "login.addressPlaceholder"
  | "login.pincodeLabel"
  | "login.pincodeLoading"
  | "login.pincodeFoundSuffix"
  | "login.pincodeNotFound"
  | "login.registerError"
  | "login.saving"
  | "login.continue"
  | "login.doneHeading"
  | "login.doneSubtitle"
  | "home.welcomeBack"
  | "home.greeting"
  | "home.weatherUnavailable"
  | "home.comingSoon"
  | "home.navHome"
  | "home.navProfile"
  | "farmgate.greeting"
  | "farmgate.intro"
  | "farmgate.labelField"
  | "farmgate.labelPlaceholder"
  | "farmgate.addressField"
  | "farmgate.addressPlaceholder"
  | "farmgate.useLocation"
  | "farmgate.locating"
  | "farmgate.locationError"
  | "farmgate.dateField"
  | "farmgate.timeField"
  | "farmgate.timeMorning"
  | "farmgate.timeAfternoon"
  | "farmgate.timeEvening"
  | "farmgate.reminderTitle"
  | "farmgate.reminderPatta"
  | "farmgate.reminderAadhaar"
  | "farmgate.submit"
  | "farmgate.submitting"
  | "farmgate.formError"
  | "farmgate.confirmHeading"
  | "farmgate.confirmBody"
  | "farmgate.backHome"
  | "farmgate.yourFarms"
  | "farmgate.addAnother"
  | "farmgate.statusRequested"
  | "farmgate.statusScheduled"
  | "farmgate.statusCompleted"
  | "farmgate.statusCancelled"
  | "farmgate.close"
  | "farmgate.mapPending"
  | "farmgate.greenDetailsTitle"
  | "farmgate.treeCover"
  | "farmgate.estimatedO2"
  | "farmgate.greenDetailsPending"
  | "cropAdvisory.whichFarm"
  | "cropAdvisory.whatHelp"
  | "cropAdvisory.optionSuggestions"
  | "cropAdvisory.optionHealth"
  | "cropAdvisory.suggestionsIntro"
  | "cropAdvisory.selectPrompt"
  | "cropAdvisory.selectConfirm"
  | "cropAdvisory.changeCrop"
  | "cropAdvisory.advisory.irrigation"
  | "cropAdvisory.advisory.fertilizer"
  | "cropAdvisory.advisory.pestAlert"
  | "cropAdvisory.health.uploadPrompt"
  | "cropAdvisory.health.uploadBtn"
  | "cropAdvisory.health.analysing"
  | "cropAdvisory.health.disclaimer"
  | "cropAdvisory.health.confidence"
  | "cropAdvisory.health.scanAgain"
  | "cropAdvisory.marketplace.title"
  | "cropAdvisory.marketplace.comingSoon"
  | "cropAdvisory.tractor.label"
  | "cropAdvisory.tractor.cta"
  | "cropAdvisory.back"
  | "cropAdvisory.season.kharif"
  | "cropAdvisory.season.rabi"
  | "cropAdvisory.season.zaid"
  | "cropAdvisory.noFarms"
  | "cropAdvisory.goToFarmgate"
  | "cropAdvisory.uploadError"
  | "cropAdvisory.register.button"
  | "cropAdvisory.register.locating"
  | "cropAdvisory.register.found"
  | "cropAdvisory.register.notFound"
  | "cropAdvisory.register.askAbout"
  | "cropAdvisory.register.getSuggestions"
  | "cropAdvisory.register.inputPlaceholder"
  | "cropAdvisory.register.send"
  | "cropAdvisory.register.thanks"
  | "cropAdvisory.register.saving"
  | "cropAdvisory.register.done";

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    "nav.language": "Language",
    "hero.title": "Welcome to your one-stop solution for Agri + Fintech",
    "hero.subtitle":
      "Finance, technology and sustainability — all in one app, built for Indian farmers.",
    "hero.cta": "Get Started",
    "tabs.fintech": "Fintech",
    "tabs.agritech": "Agritech",
    "tabs.unified": "Unified",
    "fintech.heading": "Smart Finance. Secure Future.",
    "fintech.description":
      "UPI payments, loans, insurance and a digital wallet — built for rural India.",
    "agritech.heading": "Smart Farming. Better Decisions.",
    "agritech.description":
      "AI crop advisory, weather forecasts and a marketplace for every farm need.",
    "unified.heading": "One App. Infinite Possibilities.",
    "unified.description": "Where your farm and your finances grow together.",
    "modules.farmgate": "FarmGate",
    "modules.cropAdvisory": "Crop Advisory",
    "modules.weather": "Weather",
    "modules.marketplace": "Marketplace",
    "modules.wallet": "Wallet",
    "modules.loanChecker": "Loan Eligibility",
    comingSoon: "🚧 Coming soon — currently in development",
    "mission.label": "Our Goal",
    "mission.heading": "Empowering every farmer, in every village",
    "mission.body":
      "We're building one app that brings finance, technology and sustainability together for rural India — so a farmer can check the weather, get crop advice, sell produce and manage money without juggling a dozen different apps.",
    "mission.pillar1.title": "Finance that reaches the last mile",
    "mission.pillar1.body":
      "Payments, loans, insurance and savings designed for farmers who today are often left out of formal banking.",
    "mission.pillar2.title": "Technology farmers can trust",
    "mission.pillar2.body":
      "Crop advisory, weather forecasts and soil insights — simple, local-language guidance instead of guesswork.",
    "mission.pillar3.title": "A fair, connected marketplace",
    "mission.pillar3.body":
      "Buy inputs and sell produce directly, with fewer middlemen and more transparent prices.",
    "grid.heading": "Comprehensive Farmer Services",
    "grid.banner.title": "Unlock 50+ Specialized Services",
    "grid.banner.body":
      "From payment solutions to equipment rentals, everything you need is on this single app.",
    "grid.title1": "AI Crop Health",
    "grid.body1": "Provide AI scan services for enhanced crop health.",
    "grid.title2": "Carbon Credits",
    "grid.body2": "Gain carbon credits and enhance future income.",
    "grid.title3": "Quick Loans",
    "grid.body3": "Easy access to fast, simple loans for every farmer.",
    "grid.title4": "Marketplace",
    "grid.body4":
      "Buy farm inputs and sell your produce, all in one place.",
    "grid.title5": "Farm Management",
    "grid.body5": "Optimize your farm with advanced data and insights.",
    "grid.title6": "Disease Monitoring",
    "grid.body6":
      "Real-time monitoring to prevent crop disease outbreaks.",
    "cta.heading": "Let's get started",
    "cta.subheading":
      "Grow a sustainable future — for your farm, and for the next generation.",
    "cta.button": "Get Started",
    "login.heading": "Welcome to AgriFintech",
    "login.subtitle": "Enter your phone number to get started.",
    "login.phoneLabel": "Phone number",
    "login.sendOtp": "Send OTP",
    "login.sending": "Sending...",
    "login.phoneError": "Enter a valid 10-digit phone number.",
    "login.otpHeading": "Verify your number",
    "login.otpSubtitle": "Enter the code sent to",
    "login.otpError": "Enter the 6-digit code.",
    "login.verify": "Verify",
    "login.verifying": "Verifying...",
    "login.registerHeading": "Tell us about yourself",
    "login.registerSubtitle": "Just the basics — takes a minute.",
    "login.fullNameLabel": "Full name",
    "login.fullNamePlaceholder": "Your name",
    "login.addressLabel": "Address",
    "login.addressPlaceholder": "Village / town, street",
    "login.pincodeLabel": "Pincode",
    "login.pincodeLoading": "Looking up pincode...",
    "login.pincodeFoundSuffix": "detected automatically",
    "login.pincodeNotFound":
      "Couldn't find that pincode — check it and try again.",
    "login.registerError":
      "Fill in your name, address, and a valid pincode.",
    "login.saving": "Saving...",
    "login.continue": "Continue",
    "login.doneHeading": "You're all set",
    "login.doneSubtitle": "Redirecting...",
    "home.welcomeBack": "Welcome back",
    "home.greeting": "Hi,",
    "home.weatherUnavailable": "Weather unavailable right now",
    "home.comingSoon": "coming soon",
    "home.navHome": "Home",
    "home.navProfile": "Profile",
    "farmgate.greeting": "Thank you for initiating a process.",
    "farmgate.intro": "Please fill the required details and schedule a visit.",
    "farmgate.labelField": "Farm name (optional)",
    "farmgate.labelPlaceholder": "e.g. North field",
    "farmgate.addressField": "Visit location",
    "farmgate.addressPlaceholder": "Village / landmark, so our agent can find it",
    "farmgate.useLocation": "Use my current location",
    "farmgate.locating": "Finding your location...",
    "farmgate.locationError": "Couldn't get your location. Please type the address.",
    "farmgate.dateField": "Preferred date",
    "farmgate.timeField": "Preferred time",
    "farmgate.timeMorning": "Morning (9 AM – 12 PM)",
    "farmgate.timeAfternoon": "Afternoon (12 PM – 4 PM)",
    "farmgate.timeEvening": "Evening (4 PM – 7 PM)",
    "farmgate.reminderTitle": "Please keep these ready for the agent's visit",
    "farmgate.reminderPatta": "Patta number (land ownership proof)",
    "farmgate.reminderAadhaar": "Aadhaar ID",
    "farmgate.submit": "Schedule visit",
    "farmgate.submitting": "Scheduling...",
    "farmgate.formError": "Fill in the location, date, and time.",
    "farmgate.confirmHeading": "Visit scheduled",
    "farmgate.confirmBody":
      "Our agent will visit you on the date and time you chose. Please keep your documents ready.",
    "farmgate.backHome": "Back to home",
    "farmgate.yourFarms": "Your farms",
    "farmgate.addAnother": "Schedule another visit",
    "farmgate.statusRequested": "Requested",
    "farmgate.statusScheduled": "Scheduled",
    "farmgate.statusCompleted": "Completed",
    "farmgate.statusCancelled": "Cancelled",
    "farmgate.close": "Close",
    "farmgate.greenDetailsTitle": "Green Details",
    "farmgate.treeCover": "Tree cover",
    "farmgate.estimatedO2": "Estimated O₂ generated",
    "farmgate.greenDetailsPending": "Not analyzed yet — this is generated during the agent's visit.",
    "farmgate.mapPending": "An agent visit is still needed to capture the exact farm location and boundary. The map will appear here once that's done.",
    "cropAdvisory.whichFarm": "Which farm are you asking about?",
    "cropAdvisory.whatHelp": "What can I help with today?",
    "cropAdvisory.optionSuggestions": "Crop Suggestions",
    "cropAdvisory.optionHealth": "Crop Health Check",
    "cropAdvisory.suggestionsIntro": "Best crops for this season in",
    "cropAdvisory.selectPrompt": "Tap a crop to select it for this farm.",
    "cropAdvisory.selectConfirm": "Got it! I've saved",
    "cropAdvisory.changeCrop": "Change crop",
    "cropAdvisory.advisory.irrigation": "Irrigation",
    "cropAdvisory.advisory.fertilizer": "Fertilizer",
    "cropAdvisory.advisory.pestAlert": "Pest Alert",
    "cropAdvisory.health.uploadPrompt": "Upload a photo of the affected crop and I'll analyse it.",
    "cropAdvisory.health.uploadBtn": "Upload photo",
    "cropAdvisory.health.analysing": "Analysing your crop…",
    "cropAdvisory.health.disclaimer": "AI-assisted — not certified agronomic advice",
    "cropAdvisory.health.confidence": "Confidence",
    "cropAdvisory.health.scanAgain": "Scan another photo",
    "cropAdvisory.marketplace.title": "What you might need",
    "cropAdvisory.marketplace.comingSoon": "Coming soon",
    "cropAdvisory.tractor.label": "Tractor Rental",
    "cropAdvisory.tractor.cta": "Rent near you",
    "cropAdvisory.back": "← Back",
    "cropAdvisory.season.kharif": "Kharif Season",
    "cropAdvisory.season.rabi": "Rabi Season",
    "cropAdvisory.season.zaid": "Zaid Season",
    "cropAdvisory.noFarms": "You haven't registered any farms yet.",
    "cropAdvisory.goToFarmgate": "Register a farm",
    "cropAdvisory.uploadError": "Upload failed. Please try again.",
    "cropAdvisory.register.button": "Register a Farm",
    "cropAdvisory.register.locating": "Finding your farm location…",
    "cropAdvisory.register.found": "I found your farm in",
    "cropAdvisory.register.notFound": "Couldn't get your location. I'll use your registered area for suggestions.",
    "cropAdvisory.register.askAbout": "Tell me about your land — soil type, water availability, or what you've grown before. Or tap the button below to see what crops work best here.",
    "cropAdvisory.register.getSuggestions": "Get crop suggestions",
    "cropAdvisory.register.inputPlaceholder": "Describe your land…",
    "cropAdvisory.register.send": "Send",
    "cropAdvisory.register.thanks": "Got it! Based on your location, here are the best crops to grow this season:",
    "cropAdvisory.register.saving": "Registering your farm…",
    "cropAdvisory.register.done": "Your farm is registered!",
  },
  hi: {
    "nav.language": "भाषा",
    "hero.title": "कृषि और फिनटेक के लिए आपका वन-स्टॉप समाधान",
    "hero.subtitle":
      "वित्त, तकनीक और स्थिरता — एक ही ऐप में, भारतीय किसानों के लिए बनाया गया।",
    "hero.cta": "शुरू करें",
    "tabs.fintech": "फिनटेक",
    "tabs.agritech": "एग्रीटेक",
    "tabs.unified": "संयुक्त",
    "fintech.heading": "स्मार्ट फाइनेंस। सुरक्षित भविष्य।",
    "fintech.description":
      "यूपीआई पेमेंट, लोन, बीमा और डिजिटल वॉलेट — ग्रामीण भारत के लिए बनाया गया।",
    "agritech.heading": "स्मार्ट खेती। बेहतर फैसले।",
    "agritech.description":
      "एआई फसल सलाह, मौसम पूर्वानुमान और हर खेत की ज़रूरत के लिए एक मार्केटप्लेस।",
    "unified.heading": "एक ऐप। अनंत संभावनाएं।",
    "unified.description": "जहाँ आपका खेत और आपका पैसा दोनों साथ बढ़ें।",
    "modules.farmgate": "फार्मगेट",
    "modules.cropAdvisory": "फसल सलाह",
    "modules.weather": "मौसम",
    "modules.marketplace": "मार्केटप्लेस",
    "modules.wallet": "वॉलेट",
    "modules.loanChecker": "ऋण पात्रता",
    comingSoon: "🚧 आ रहा है — अभी विकास में है",
    "mission.label": "हमारा लक्ष्य",
    "mission.heading": "हर गांव के हर किसान को सशक्त बनाना",
    "mission.body":
      "हम एक ऐसा ऐप बना रहे हैं जो वित्त, तकनीक और स्थिरता को ग्रामीण भारत के लिए एक साथ लाता है — ताकि किसान कई अलग-अलग ऐप के बिना मौसम देख सके, फसल सलाह ले सके, उपज बेच सके और पैसा प्रबंधित कर सके।",
    "mission.pillar1.title": "हर गांव तक पहुंचने वाला वित्त",
    "mission.pillar1.body":
      "पेमेंट, लोन, बीमा और बचत — उन किसानों के लिए जो अक्सर औपचारिक बैंकिंग से बाहर रह जाते हैं।",
    "mission.pillar2.title": "तकनीक जिस पर किसान भरोसा कर सकें",
    "mission.pillar2.body":
      "फसल सलाह, मौसम पूर्वानुमान और मिट्टी की जानकारी — अनुमान के बजाय सरल, स्थानीय भाषा में मार्गदर्शन।",
    "mission.pillar3.title": "एक उचित, जुड़ा हुआ मार्केटप्लेस",
    "mission.pillar3.body":
      "इनपुट खरीदें और उपज सीधे बेचें — कम बीचवालों और अधिक पारदर्शी दामों के साथ।",
    "grid.heading": "संपूर्ण किसान सेवाएं",
    "grid.banner.title": "50+ विशेष सेवाओं को अनलॉक करें",
    "grid.banner.body":
      "पेमेंट समाधान से लेकर उपकरण किराये तक, आपकी हर ज़रूरत इस एक ऐप में है।",
    "grid.title1": "एआई फसल स्वास्थ्य",
    "grid.body1": "एआई स्कैन से अपनी फसल का स्वास्थ्य बेहतर बनाएं।",
    "grid.title2": "कार्बन क्रेडिट",
    "grid.body2": "कार्बन क्रेडिट कमाएं और भविष्य की आय बढ़ाएं।",
    "grid.title3": "त्वरित लोन",
    "grid.body3": "हर किसान के लिए तेज़ और आसान लोन।",
    "grid.title4": "मार्केटप्लेस",
    "grid.body4": "खेती के सामान खरीदें और अपनी उपज बेचें — एक ही जगह।",
    "grid.title5": "फार्म प्रबंधन",
    "grid.body5": "उन्नत डेटा और जानकारी से अपने खेत को बेहतर बनाएं।",
    "grid.title6": "रोग निगरानी",
    "grid.body6": "फसल रोग को रोकने के लिए रीयल-टाइम मॉनिटरिंग।",
    "cta.heading": "चलिए शुरू करते हैं",
    "cta.subheading": "एक टिकाऊ भविष्य उगाएं — आपके खेत के लिए, और आने वाली पीढ़ी के लिए।",
    "cta.button": "शुरू करें",
    "login.heading": "AgriFintech में आपका स्वागत है",
    "login.subtitle": "शुरू करने के लिए अपना फोन नंबर दर्ज करें।",
    "login.phoneLabel": "फोन नंबर",
    "login.sendOtp": "OTP भेजें",
    "login.sending": "भेजा जा रहा है...",
    "login.phoneError": "एक सही 10-अंकों का फोन नंबर दर्ज करें।",
    "login.otpHeading": "अपना नंबर सत्यापित करें",
    "login.otpSubtitle": "इस नंबर पर भेजा गया कोड दर्ज करें",
    "login.otpError": "6-अंकों का कोड दर्ज करें।",
    "login.verify": "सत्यापित करें",
    "login.verifying": "सत्यापित किया जा रहा है...",
    "login.registerHeading": "अपने बारे में बताएं",
    "login.registerSubtitle": "बस ज़रूरी जानकारी — एक मिनट लगेगा।",
    "login.fullNameLabel": "पूरा नाम",
    "login.fullNamePlaceholder": "आपका नाम",
    "login.addressLabel": "पता",
    "login.addressPlaceholder": "गांव / शहर, गली",
    "login.pincodeLabel": "पिनकोड",
    "login.pincodeLoading": "पिनकोड खोजा जा रहा है...",
    "login.pincodeFoundSuffix": "स्वचालित रूप से पता चला",
    "login.pincodeNotFound":
      "यह पिनकोड नहीं मिला — कृपया जांचें और फिर से प्रयास करें।",
    "login.registerError": "अपना नाम, पता और सही पिनकोड भरें।",
    "login.saving": "सहेजा जा रहा है...",
    "login.continue": "जारी रखें",
    "login.doneHeading": "आप तैयार हैं",
    "login.doneSubtitle": "रीडायरेक्ट किया जा रहा है...",
    "home.welcomeBack": "वापसी पर स्वागत है",
    "home.greeting": "नमस्ते,",
    "home.weatherUnavailable": "अभी मौसम जानकारी उपलब्ध नहीं है",
    "home.comingSoon": "जल्द आ रहा है",
    "home.navHome": "होम",
    "home.navProfile": "प्रोफ़ाइल",
    "farmgate.greeting": "प्रक्रिया शुरू करने के लिए धन्यवाद।",
    "farmgate.intro": "कृपया आवश्यक विवरण भरें और एक विज़िट शेड्यूल करें।",
    "farmgate.labelField": "खेत का नाम (वैकल्पिक)",
    "farmgate.labelPlaceholder": "जैसे, उत्तर वाला खेत",
    "farmgate.addressField": "विज़िट का स्थान",
    "farmgate.addressPlaceholder": "गांव / पहचान चिन्ह, ताकि एजेंट ढूंढ सके",
    "farmgate.useLocation": "मेरा वर्तमान स्थान उपयोग करें",
    "farmgate.locating": "आपका स्थान खोजा जा रहा है...",
    "farmgate.locationError": "आपका स्थान नहीं मिल सका। कृपया पता टाइप करें।",
    "farmgate.dateField": "पसंदीदा तारीख़",
    "farmgate.timeField": "पसंदीदा समय",
    "farmgate.timeMorning": "सुबह (9 - 12 बजे)",
    "farmgate.timeAfternoon": "दोपहर (12 - 4 बजे)",
    "farmgate.timeEvening": "शाम (4 - 7 बजे)",
    "farmgate.reminderTitle": "एजेंट की विज़िट के लिए ये तैयार रखें",
    "farmgate.reminderPatta": "पट्टा नंबर (भूमि स्वामित्व प्रमाण)",
    "farmgate.reminderAadhaar": "आधार आईडी",
    "farmgate.submit": "विज़िट शेड्यूल करें",
    "farmgate.submitting": "शेड्यूल किया जा रहा है...",
    "farmgate.formError": "स्थान, तारीख़ और समय भरें।",
    "farmgate.confirmHeading": "विज़िट शेड्यूल हो गई",
    "farmgate.confirmBody":
      "हमारा एजेंट आपकी चुनी हुई तारीख़ और समय पर आएगा। कृपया अपने दस्तावेज़ तैयार रखें।",
    "farmgate.backHome": "होम पर वापस जाएं",
    "farmgate.yourFarms": "आपके खेत",
    "farmgate.addAnother": "एक और विज़िट शेड्यूल करें",
    "farmgate.statusRequested": "अनुरोध किया गया",
    "farmgate.statusScheduled": "शेड्यूल हो गई",
    "farmgate.statusCompleted": "पूर्ण",
    "farmgate.statusCancelled": "रद्द",
    "farmgate.close": "बंद करें",
    "farmgate.greenDetailsTitle": "ग्रीन विवरण",
    "farmgate.treeCover": "वृक्ष आवरण",
    "farmgate.estimatedO2": "अनुमानित O₂ उत्पादन",
    "farmgate.greenDetailsPending": "अभी विश्लेषण नहीं हुआ — यह एजेंट की विज़िट के दौरान तैयार होता है।",
    "farmgate.mapPending": "खेत का सटीक स्थान और सीमा दर्ज करने के लिए अभी भी एक एजेंट विज़िट की आवश्यकता है। यह होने के बाद नक्शा यहाँ दिखाई देगा।",
    "cropAdvisory.whichFarm": "आप किस खेत के बारे में पूछ रहे हैं?",
    "cropAdvisory.whatHelp": "आज मैं किसमें मदद करूं?",
    "cropAdvisory.optionSuggestions": "फसल सुझाव",
    "cropAdvisory.optionHealth": "फसल स्वास्थ्य जांच",
    "cropAdvisory.suggestionsIntro": "इस मौसम के लिए सबसे उपयुक्त फसलें —",
    "cropAdvisory.selectPrompt": "इस खेत के लिए फसल चुनने के लिए टैप करें।",
    "cropAdvisory.selectConfirm": "ठीक है! मैंने सहेजा",
    "cropAdvisory.changeCrop": "फसल बदलें",
    "cropAdvisory.advisory.irrigation": "सिंचाई",
    "cropAdvisory.advisory.fertilizer": "उर्वरक",
    "cropAdvisory.advisory.pestAlert": "कीट चेतावनी",
    "cropAdvisory.health.uploadPrompt": "प्रभावित फसल की फ़ोटो अपलोड करें, मैं विश्लेषण करूंगा।",
    "cropAdvisory.health.uploadBtn": "फ़ोटो अपलोड करें",
    "cropAdvisory.health.analysing": "आपकी फसल का विश्लेषण हो रहा है…",
    "cropAdvisory.health.disclaimer": "एआई-सहायता — प्रमाणित कृषि विज्ञान सलाह नहीं",
    "cropAdvisory.health.confidence": "सटीकता",
    "cropAdvisory.health.scanAgain": "दूसरी फ़ोटो स्कैन करें",
    "cropAdvisory.marketplace.title": "आपको क्या चाहिए होगा",
    "cropAdvisory.marketplace.comingSoon": "जल्द आ रहा है",
    "cropAdvisory.tractor.label": "ट्रैक्टर किराया",
    "cropAdvisory.tractor.cta": "पास में किराया लें",
    "cropAdvisory.back": "← वापस",
    "cropAdvisory.season.kharif": "खरीफ मौसम",
    "cropAdvisory.season.rabi": "रबी मौसम",
    "cropAdvisory.season.zaid": "जायद मौसम",
    "cropAdvisory.noFarms": "आपने अभी तक कोई खेत पंजीकृत नहीं किया है।",
    "cropAdvisory.goToFarmgate": "खेत पंजीकृत करें",
    "cropAdvisory.uploadError": "अपलोड विफल। कृपया पुनः प्रयास करें।",
    "cropAdvisory.register.button": "खेत पंजीकृत करें",
    "cropAdvisory.register.locating": "आपके खेत का स्थान ढूंढ रहे हैं…",
    "cropAdvisory.register.found": "आपका खेत मिला —",
    "cropAdvisory.register.notFound": "स्थान नहीं मिल सका। मैं आपके पंजीकृत क्षेत्र से सुझाव दूंगा।",
    "cropAdvisory.register.askAbout": "अपनी जमीन के बारे में बताएं — मिट्टी का प्रकार, पानी की उपलब्धता, या पहले क्या उगाया। या नीचे बटन दबाएं।",
    "cropAdvisory.register.getSuggestions": "फसल सुझाव पाएं",
    "cropAdvisory.register.inputPlaceholder": "अपनी जमीन बताएं…",
    "cropAdvisory.register.send": "भेजें",
    "cropAdvisory.register.thanks": "ठीक है! आपके स्थान के आधार पर इस मौसम की सबसे अच्छी फसलें:",
    "cropAdvisory.register.saving": "खेत पंजीकृत हो रहा है…",
    "cropAdvisory.register.done": "आपका खेत पंजीकृत हो गया!",
  },
  te: {
    "nav.language": "భాష",
    "hero.title": "వ్యవసాయం మరియు ఫిన్‌టెక్ కోసం మీ వన్-స్టాప్ సొల్యూషన్",
    "hero.subtitle":
      "ఫైనాన్స్, టెక్నాలజీ మరియు సుస్థిరత — ఒకే యాప్‌లో, భారత రైతుల కోసం రూపొందించబడింది.",
    "hero.cta": "ప్రారంభించండి",
    "tabs.fintech": "ఫిన్‌టెక్",
    "tabs.agritech": "అగ్రిటెక్",
    "tabs.unified": "ఏకీకృత",
    "fintech.heading": "స్మార్ట్ ఫైనాన్స్. సురక్షిత భవిష్యత్తు.",
    "fintech.description":
      "యూపీఐ చెల్లింపులు, రుణాలు, బీమా మరియు డిజిటల్ వాలెట్ — గ్రామీణ భారతదేశం కోసం.",
    "agritech.heading": "స్మార్ట్ వ్యవసాయం. మంచి నిర్ణయాలు.",
    "agritech.description":
      "AI పంట సలహా, వాతావరణ సూచనలు మరియు ప్రతి పొలం అవసరానికి మార్కెట్‌ప్లేస్.",
    "unified.heading": "ఒక యాప్. అనంత అవకాశాలు.",
    "unified.description":
      "మీ పొలం మరియు మీ ఆర్థిక పరిస్థితి కలిసి అభివృద్ధి చెందే చోటు.",
    "modules.farmgate": "ఫార్మ్‌గేట్",
    "modules.cropAdvisory": "పంట సలహా",
    "modules.weather": "వాతావరణం",
    "modules.marketplace": "మార్కెట్‌ప్లేస్",
    "modules.wallet": "వాలెట్",
    "modules.loanChecker": "రుణ అర్హత",
    comingSoon: "🚧 త్వరలో — ఇప్పుడు అభివృద్ధిలో ఉంది",
    "mission.label": "మా లక్ష్యం",
    "mission.heading": "ప్రతి గ్రామంలో ప్రతి రైతును శక్తివంతం చేయడం",
    "mission.body":
      "మేము ఫైనాన్స్, టెక్నాలజీ మరియు సుస్థిరతను గ్రామీణ భారతదేశం కోసం ఒకే యాప్‌లో తెస్తున్నాం — తద్వారా రైతు డజను వేర్వేరు యాప్‌లు ఉపయోగించకుండా వాతావరణం చూడగలడు, పంట సలహా పొందగలడు, ఉత్పత్తులు అమ్మగలడు మరియు డబ్బును నిర్వహించగలడు.",
    "mission.pillar1.title": "చివరి మైలు వరకు చేరే ఫైనాన్స్",
    "mission.pillar1.body":
      "చెల్లింపులు, రుణాలు, బీమా మరియు పొదుపు — అధికారిక బ్యాంకింగ్‌కు దూరంగా ఉండే రైతుల కోసం.",
    "mission.pillar2.title": "రైతులు నమ్మగలిగే టెక్నాలజీ",
    "mission.pillar2.body":
      "పంట సలహా, వాతావరణ సూచనలు మరియు నేల సమాచారం — అంచనాలకు బదులు సరళమైన, స్థానిక భాషా మార్గదర్శకత్వం.",
    "mission.pillar3.title": "న్యాయమైన, అనుసంధానిత మార్కెట్‌ప్లేస్",
    "mission.pillar3.body":
      "ఇన్‌పుట్‌లు కొనండి మరియు ఉత్పత్తులను నేరుగా అమ్మండి — తక్కువ మధ్యవర్తులు, మరింత పారదర్శక ధరలతో.",
    "grid.heading": "సమగ్ర రైతు సేవలు",
    "grid.banner.title": "50+ ప్రత్యేక సేవలను అన్‌లాక్ చేయండి",
    "grid.banner.body":
      "చెల్లింపు పరిష్కారాల నుండి పరికరాల అద్దె వరకు, మీకు అవసరమైనవన్నీ ఈ ఒక్క యాప్‌లో ఉన్నాయి.",
    "grid.title1": "AI పంట ఆరోగ్యం",
    "grid.body1": "AI స్కాన్‌తో మీ పంట ఆరోగ్యాన్ని మెరుగుపరచండి.",
    "grid.title2": "కార్బన్ క్రెడిట్స్",
    "grid.body2": "కార్బన్ క్రెడిట్‌లు పొందండి, భవిష్యత్ ఆదాయాన్ని పెంచండి.",
    "grid.title3": "త్వరిత రుణాలు",
    "grid.body3": "ప్రతి రైతుకు వేగవంతమైన, సులభమైన రుణాలు.",
    "grid.title4": "మార్కెట్‌ప్లేస్",
    "grid.body4":
      "వ్యవసాయ సామగ్రి కొనండి, మీ ఉత్పత్తిని అమ్మండి — ఒకే చోట.",
    "grid.title5": "ఫార్మ్ మేనేజ్‌మెంట్",
    "grid.body5":
      "అధునాతన డేటా మరియు అంతర్దృష్టులతో మీ పొలాన్ని మెరుగుపరచండి.",
    "grid.title6": "వ్యాధి పర్యవేక్షణ",
    "grid.body6": "పంట వ్యాధులను నివారించడానికి రియల్-టైమ్ మానిటరింగ్.",
    "cta.heading": "మనం ప్రారంభిద్దాం",
    "cta.subheading":
      "ఒక సుస్థిర భవిష్యత్తును పెంచండి — మీ పొలం కోసం, మరియు రాబోయే తరం కోసం.",
    "cta.button": "ప్రారంభించండి",
    "login.heading": "AgriFintech కి స్వాగతం",
    "login.subtitle": "ప్రారంభించడానికి మీ ఫోన్ నంబర్ నమోదు చేయండి.",
    "login.phoneLabel": "ఫోన్ నంబర్",
    "login.sendOtp": "OTP పంపండి",
    "login.sending": "పంపుతోంది...",
    "login.phoneError": "సరైన 10-అంకెల ఫోన్ నంబర్ నమోదు చేయండి.",
    "login.otpHeading": "మీ నంబర్‌ను ధృవీకరించండి",
    "login.otpSubtitle": "ఈ నంబర్‌కు పంపిన కోడ్ నమోదు చేయండి",
    "login.otpError": "6-అంకెల కోడ్ నమోదు చేయండి.",
    "login.verify": "ధృవీకరించండి",
    "login.verifying": "ధృవీకరిస్తోంది...",
    "login.registerHeading": "మీ గురించి చెప్పండి",
    "login.registerSubtitle": "కేవలం ప్రాథమిక వివరాలు — ఒక నిమిషం పడుతుంది.",
    "login.fullNameLabel": "పూర్తి పేరు",
    "login.fullNamePlaceholder": "మీ పేరు",
    "login.addressLabel": "చిరునామా",
    "login.addressPlaceholder": "గ్రామం / పట్టణం, వీధి",
    "login.pincodeLabel": "పిన్‌కోడ్",
    "login.pincodeLoading": "పిన్‌కోడ్ వెతుకుతోంది...",
    "login.pincodeFoundSuffix": "స్వయంచాలకంగా గుర్తించబడింది",
    "login.pincodeNotFound":
      "ఆ పిన్‌కోడ్ కనుగొనబడలేదు — తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",
    "login.registerError":
      "మీ పేరు, చిరునామా మరియు సరైన పిన్‌కోడ్ నమోదు చేయండి.",
    "login.saving": "సేవ్ చేస్తోంది...",
    "login.continue": "కొనసాగించండి",
    "login.doneHeading": "మీరు సిద్ధంగా ఉన్నారు",
    "login.doneSubtitle": "మళ్లించబడుతోంది...",
    "home.welcomeBack": "తిరిగి స్వాగతం",
    "home.greeting": "నమస్కారం,",
    "home.weatherUnavailable": "వాతావరణ సమాచారం ఇప్పుడు అందుబాటులో లేదు",
    "home.comingSoon": "త్వరలో వస్తుంది",
    "home.navHome": "హోమ్",
    "home.navProfile": "ప్రొఫైల్",
    "farmgate.greeting": "ప్రక్రియను ప్రారంభించినందుకు ధన్యవాదాలు.",
    "farmgate.intro": "దయచేసి అవసరమైన వివరాలు పూరించి సందర్శనను షెడ్యూల్ చేయండి.",
    "farmgate.labelField": "పొలం పేరు (ఐచ్ఛికం)",
    "farmgate.labelPlaceholder": "ఉదా. ఉత్తర పొలం",
    "farmgate.addressField": "సందర్శన స్థానం",
    "farmgate.addressPlaceholder": "గ్రామం / గుర్తు, ఏజెంట్ కనుగొనడానికి",
    "farmgate.useLocation": "నా ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
    "farmgate.locating": "మీ స్థానాన్ని కనుగొంటోంది...",
    "farmgate.locationError": "మీ స్థానాన్ని కనుగొనలేకపోయాం. దయచేసి చిరునామా టైప్ చేయండి.",
    "farmgate.dateField": "ఇష్టమైన తేదీ",
    "farmgate.timeField": "ఇష్టమైన సమయం",
    "farmgate.timeMorning": "ఉదయం (9 - 12)",
    "farmgate.timeAfternoon": "మధ్యాహ్నం (12 - 4)",
    "farmgate.timeEvening": "సాయంత్రం (4 - 7)",
    "farmgate.reminderTitle": "ఏజెంట్ సందర్శన కోసం వీటిని సిద్ధంగా ఉంచుకోండి",
    "farmgate.reminderPatta": "పట్టా నంబర్ (భూమి యజమాన్య రుజువు)",
    "farmgate.reminderAadhaar": "ఆధార్ ఐడి",
    "farmgate.submit": "సందర్శన షెడ్యూల్ చేయండి",
    "farmgate.submitting": "షెడ్యూల్ చేస్తోంది...",
    "farmgate.formError": "స్థానం, తేదీ మరియు సమయం నమోదు చేయండి.",
    "farmgate.confirmHeading": "సందర్శన షెడ్యూల్ అయింది",
    "farmgate.confirmBody":
      "మీరు ఎంచుకున్న తేదీ మరియు సమయంలో మా ఏజెంట్ మిమ్మల్ని సందర్శిస్తారు. దయచేసి మీ పత్రాలు సిద్ధంగా ఉంచుకోండి.",
    "farmgate.backHome": "హోమ్‌కు తిరిగి వెళ్లండి",
    "farmgate.yourFarms": "మీ పొలాలు",
    "farmgate.addAnother": "మరో సందర్శనను షెడ్యూల్ చేయండి",
    "farmgate.statusRequested": "అభ్యర్థించబడింది",
    "farmgate.statusScheduled": "షెడ్యూల్ అయింది",
    "farmgate.statusCompleted": "పూర్తయింది",
    "farmgate.statusCancelled": "రద్దు చేయబడింది",
    "farmgate.close": "మూసివేయండి",
    "farmgate.greenDetailsTitle": "గ్రీన్ వివరాలు",
    "farmgate.treeCover": "వృక్ష కవరేజ్",
    "farmgate.estimatedO2": "అంచనా O₂ ఉత్పత్తి",
    "farmgate.greenDetailsPending": "ఇంకా విశ్లేషించబడలేదు — ఇది ఏజెంట్ సందర్శన సమయంలో తయారు చేయబడుతుంది.",
    "farmgate.mapPending": "ఖేత్ యొక్క ఖచ్చితమైన స్థానం మరియు సరిహద్దును క్యాప్చర్ చేయడానికి ఏజెంట్ సందర్శన ఇంకా అవసరం. అది పూర్తయిన తర్వాత మ్యాప్ ఇక్కడ కనిపిస్తుంది.",
    "cropAdvisory.whichFarm": "మీరు ఏ పొలం గురించి అడుగుతున్నారు?",
    "cropAdvisory.whatHelp": "ఈరోజు నేను ఏమి సహాయం చేయగలను?",
    "cropAdvisory.optionSuggestions": "పంట సూచనలు",
    "cropAdvisory.optionHealth": "పంట ఆరోగ్య తనిఖీ",
    "cropAdvisory.suggestionsIntro": "ఈ సీజన్‌లో అనువైన పంటలు —",
    "cropAdvisory.selectPrompt": "ఈ పొలానికి పంటను ఎంచుకోవడానికి నొక్కండి.",
    "cropAdvisory.selectConfirm": "సరే! నేను సేవ్ చేశాను",
    "cropAdvisory.changeCrop": "పంటను మార్చండి",
    "cropAdvisory.advisory.irrigation": "నీటిపారుదల",
    "cropAdvisory.advisory.fertilizer": "ఎరువు",
    "cropAdvisory.advisory.pestAlert": "చీడపీడ హెచ్చరిక",
    "cropAdvisory.health.uploadPrompt": "దెబ్బతిన్న పంట యొక్క ఫోటో అప్‌లోడ్ చేయండి, నేను విశ్లేషిస్తాను.",
    "cropAdvisory.health.uploadBtn": "ఫోటో అప్‌లోడ్ చేయండి",
    "cropAdvisory.health.analysing": "మీ పంటను విశ్లేషిస్తోంది…",
    "cropAdvisory.health.disclaimer": "AI-సహాయం — ధృవీకరించిన వ్యవసాయ సలహా కాదు",
    "cropAdvisory.health.confidence": "నిర్ధారణ",
    "cropAdvisory.health.scanAgain": "మరో ఫోటో స్కాన్ చేయండి",
    "cropAdvisory.marketplace.title": "మీకు ఏమి అవసరం కావచ్చు",
    "cropAdvisory.marketplace.comingSoon": "త్వరలో వస్తుంది",
    "cropAdvisory.tractor.label": "ట్రాక్టర్ అద్దె",
    "cropAdvisory.tractor.cta": "దగ్గర్లో అద్దెకు తీసుకోండి",
    "cropAdvisory.back": "← వెనక్కి",
    "cropAdvisory.season.kharif": "ఖరీఫ్ సీజన్",
    "cropAdvisory.season.rabi": "రబీ సీజన్",
    "cropAdvisory.season.zaid": "జాయిద్ సీజన్",
    "cropAdvisory.noFarms": "మీరు ఇంకా ఏ పొలాన్ని నమోదు చేయలేదు.",
    "cropAdvisory.goToFarmgate": "పొలాన్ని నమోదు చేయండి",
    "cropAdvisory.uploadError": "అప్‌లోడ్ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    "cropAdvisory.register.button": "పొలాన్ని నమోదు చేయండి",
    "cropAdvisory.register.locating": "మీ పొలం స్థానాన్ని కనుగొంటోంది…",
    "cropAdvisory.register.found": "మీ పొలం ఇక్కడ కనుగొనబడింది —",
    "cropAdvisory.register.notFound": "స్థానం కనుగొనలేకపోయాం. నమోదిత ప్రాంతం ఉపయోగిస్తాం.",
    "cropAdvisory.register.askAbout": "మీ భూమి గురించి చెప్పండి — మట్టి రకం, నీటి లభ్యత, లేదా ఇంతకుముందు ఏమి పండించారు.",
    "cropAdvisory.register.getSuggestions": "పంట సూచనలు పొందండి",
    "cropAdvisory.register.inputPlaceholder": "మీ భూమిని వివరించండి…",
    "cropAdvisory.register.send": "పంపండి",
    "cropAdvisory.register.thanks": "సరే! మీ స్థానం ఆధారంగా ఈ సీజన్‌లో అత్యుత్తమ పంటలు:",
    "cropAdvisory.register.saving": "పొలం నమోదవుతోంది…",
    "cropAdvisory.register.done": "మీ పొలం నమోదైంది!",
  },
  kn: {
    "nav.language": "ಭಾಷೆ",
    "hero.title": "ಕೃಷಿ ಮತ್ತು ಫಿನ್‌ಟೆಕ್‌ಗಾಗಿ ನಿಮ್ಮ ಒನ್-ಸ್ಟಾಪ್ ಪರಿಹಾರ",
    "hero.subtitle":
      "ಹಣಕಾಸು, ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಸುಸ್ಥಿರತೆ — ಒಂದೇ ಆ್ಯಪ್‌ನಲ್ಲಿ, ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ರೂಪಿಸಲಾಗಿದೆ.",
    "hero.cta": "ಪ್ರಾರಂಭಿಸಿ",
    "tabs.fintech": "ಫಿನ್‌ಟೆಕ್",
    "tabs.agritech": "ಅಗ್ರಿಟೆಕ್",
    "tabs.unified": "ಸಂಯೋಜಿತ",
    "fintech.heading": "ಸ್ಮಾರ್ಟ್ ಫೈನಾನ್ಸ್. ಸುರಕ್ಷಿತ ಭವಿಷ್ಯ.",
    "fintech.description":
      "ಯುಪಿಐ ಪಾವತಿಗಳು, ಸಾಲಗಳು, ವಿಮೆ ಮತ್ತು ಡಿಜಿಟಲ್ ವಾಲೆಟ್ — ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ.",
    "agritech.heading": "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ. ಉತ್ತಮ ನಿರ್ಧಾರಗಳು.",
    "agritech.description":
      "AI ಬೆಳೆ ಸಲಹೆ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಪ್ರತಿ ಹೊಲದ ಅಗತ್ಯಕ್ಕೆ ಮಾರುಕಟ್ಟೆ.",
    "unified.heading": "ಒಂದು ಆ್ಯಪ್. ಅನಂತ ಸಾಧ್ಯತೆಗಳು.",
    "unified.description": "ನಿಮ್ಮ ಹೊಲ ಮತ್ತು ನಿಮ್ಮ ಹಣಕಾಸು ಒಟ್ಟಿಗೆ ಬೆಳೆಯುವ ಸ್ಥಳ.",
    "modules.farmgate": "ಫಾರ್ಮ್‌ಗೇಟ್",
    "modules.cropAdvisory": "ಬೆಳೆ ಸಲಹೆ",
    "modules.weather": "ಹವಾಮಾನ",
    "modules.marketplace": "ಮಾರುಕಟ್ಟೆ",
    "modules.wallet": "ವಾಲೆಟ್",
    "modules.loanChecker": "ಸಾಲ ಅರ್ಹತೆ",
    comingSoon: "🚧 ಶೀಘ್ರದಲ್ಲಿ — ಈಗ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ",
    "mission.label": "ನಮ್ಮ ಗುರಿ",
    "mission.heading": "ಪ್ರತಿ ಗ್ರಾಮದ ಪ್ರತಿ ರೈತನನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು",
    "mission.body":
      "ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ಹಣಕಾಸು, ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಸುಸ್ಥಿರತೆಯನ್ನು ಒಂದೇ ಆ್ಯಪ್‌ನಲ್ಲಿ ತರುತ್ತಿದ್ದೇವೆ — ಇದರಿಂದ ರೈತ ಹಲವು ಆ್ಯಪ್‌ಗಳಿಲ್ಲದೆ ಹವಾಮಾನ ನೋಡಬಹುದು, ಬೆಳೆ ಸಲಹೆ ಪಡೆಯಬಹುದು, ಉತ್ಪನ್ನ ಮಾರಬಹುದು ಮತ್ತು ಹಣ ನಿರ್ವಹಿಸಬಹುದು.",
    "mission.pillar1.title": "ಕೊನೆಯ ಮೈಲಿಗೆ ತಲುಪುವ ಹಣಕಾಸು",
    "mission.pillar1.body":
      "ಪಾವತಿಗಳು, ಸಾಲಗಳು, ವಿಮೆ ಮತ್ತು ಉಳಿತಾಯ — ಔಪಚಾರಿಕ ಬ್ಯಾಂಕಿಂಗ್‌ನಿಂದ ಹೊರಗಿರುವ ರೈತರಿಗಾಗಿ.",
    "mission.pillar2.title": "ರೈತರು ನಂಬಬಹುದಾದ ತಂತ್ರಜ್ಞಾನ",
    "mission.pillar2.body":
      "ಬೆಳೆ ಸಲಹೆ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಮಣ್ಣಿನ ಮಾಹಿತಿ — ಅಂದಾಜುಗಳ ಬದಲು ಸರಳ, ಸ್ಥಳೀಯ ಭಾಷೆಯ ಮಾರ್ಗದರ್ಶನ.",
    "mission.pillar3.title": "ನ್ಯಾಯಯುತ, ಸಂಪರ್ಕಿತ ಮಾರುಕಟ್ಟೆ",
    "mission.pillar3.body":
      "ಪರಿಕರಗಳನ್ನು ಖರೀದಿಸಿ ಮತ್ತು ಉತ್ಪನ್ನವನ್ನು ನೇರವಾಗಿ ಮಾರಿ — ಕಡಿಮೆ ಮಧ್ಯವರ್ತಿಗಳು, ಹೆಚ್ಚು ಪಾರದರ್ಶಕ ಬೆಲೆಗಳೊಂದಿಗೆ.",
    "grid.heading": "ಸಮಗ್ರ ರೈತ ಸೇವೆಗಳು",
    "grid.banner.title": "50+ ವಿಶೇಷ ಸೇವೆಗಳನ್ನು ಅನ್‌ಲಾಕ್ ಮಾಡಿ",
    "grid.banner.body":
      "ಪಾವತಿ ಪರಿಹಾರಗಳಿಂದ ಸಾಧನ ಬಾಡಿಗೆಯವರೆಗೆ, ನಿಮಗೆ ಬೇಕಾದದ್ದೆಲ್ಲ ಈ ಒಂದೇ ಆ್ಯಪ್‌ನಲ್ಲಿ ಇದೆ.",
    "grid.title1": "AI ಬೆಳೆ ಆರೋಗ್ಯ",
    "grid.body1": "AI ಸ್ಕ್ಯಾನ್‌ನೊಂದಿಗೆ ನಿಮ್ಮ ಬೆಳೆ ಆರೋಗ್ಯವನ್ನು ಸುಧಾರಿಸಿ.",
    "grid.title2": "ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳು",
    "grid.body2":
      "ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳನ್ನು ಗಳಿಸಿ, ಭವಿಷ್ಯದ ಆದಾಯವನ್ನು ಹೆಚ್ಚಿಸಿ.",
    "grid.title3": "ತ್ವರಿತ ಸಾಲಗಳು",
    "grid.body3": "ಪ್ರತಿ ರೈತನಿಗೆ ವೇಗದ, ಸುಲಭ ಸಾಲಗಳು.",
    "grid.title4": "ಮಾರುಕಟ್ಟೆ",
    "grid.body4":
      "ಕೃಷಿ ಪರಿಕರಗಳನ್ನು ಖರೀದಿಸಿ, ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ಮಾರಿ — ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ.",
    "grid.title5": "ಫಾರ್ಮ್ ನಿರ್ವಹಣೆ",
    "grid.body5":
      "ಸುಧಾರಿತ ದತ್ತಾಂಶ ಮತ್ತು ಒಳನೋಟಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಹೊಲವನ್ನು ಉತ್ತಮಗೊಳಿಸಿ.",
    "grid.title6": "ರೋಗ ಮೇಲ್ವಿಚಾರಣೆ",
    "grid.body6": "ಬೆಳೆ ರೋಗಗಳನ್ನು ತಡೆಯಲು ರಿಯಲ್-ಟೈಮ್ ಮಾನಿಟರಿಂಗ್.",
    "cta.heading": "ನಾವು ಪ್ರಾರಂಭಿಸೋಣ",
    "cta.subheading":
      "ಸುಸ್ಥಿರ ಭವಿಷ್ಯವನ್ನು ಬೆಳೆಸಿ — ನಿಮ್ಮ ಹೊಲಕ್ಕಾಗಿ, ಮತ್ತು ಮುಂದಿನ ಪೀಳಿಗೆಗಾಗಿ.",
    "cta.button": "ಪ್ರಾರಂಭಿಸಿ",
    "login.heading": "AgriFintech ಗೆ ಸುಸ್ವಾಗತ",
    "login.subtitle": "ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    "login.phoneLabel": "ಫೋನ್ ಸಂಖ್ಯೆ",
    "login.sendOtp": "OTP ಕಳುಹಿಸಿ",
    "login.sending": "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
    "login.phoneError": "ಸರಿಯಾದ 10-ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    "login.otpHeading": "ನಿಮ್ಮ ಸಂಖ್ಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    "login.otpSubtitle": "ಈ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿದ ಕೋಡ್ ನಮೂದಿಸಿ",
    "login.otpError": "6-ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ.",
    "login.verify": "ಪರಿಶೀಲಿಸಿ",
    "login.verifying": "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    "login.registerHeading": "ನಿಮ್ಮ ಬಗ್ಗೆ ತಿಳಿಸಿ",
    "login.registerSubtitle": "ಕೇವಲ ಮೂಲ ವಿವರಗಳು — ಒಂದು ನಿಮಿಷ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.",
    "login.fullNameLabel": "ಪೂರ್ಣ ಹೆಸರು",
    "login.fullNamePlaceholder": "ನಿಮ್ಮ ಹೆಸರು",
    "login.addressLabel": "ವಿಳಾಸ",
    "login.addressPlaceholder": "ಗ್ರಾಮ / ಪಟ್ಟಣ, ಬೀದಿ",
    "login.pincodeLabel": "ಪಿನ್‌ಕೋಡ್",
    "login.pincodeLoading": "ಪಿನ್‌ಕೋಡ್ ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    "login.pincodeFoundSuffix": "ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪತ್ತೆಯಾಗಿದೆ",
    "login.pincodeNotFound":
      "ಆ ಪಿನ್‌ಕೋಡ್ ಕಂಡುಬಂದಿಲ್ಲ — ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    "login.registerError":
      "ನಿಮ್ಮ ಹೆಸರು, ವಿಳಾಸ ಮತ್ತು ಸರಿಯಾದ ಪಿನ್‌ಕೋಡ್ ಭರ್ತಿ ಮಾಡಿ.",
    "login.saving": "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
    "login.continue": "ಮುಂದುವರಿಸಿ",
    "login.doneHeading": "ನೀವು ಸಿದ್ಧರಾಗಿದ್ದೀರಿ",
    "login.doneSubtitle": "ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ...",
    "home.welcomeBack": "ಮರಳಿ ಸ್ವಾಗತ",
    "home.greeting": "ನಮಸ್ಕಾರ,",
    "home.weatherUnavailable": "ಈಗ ಹವಾಮಾನ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ",
    "home.comingSoon": "ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ",
    "home.navHome": "ಹೋಮ್",
    "home.navProfile": "ಪ್ರೊಫೈಲ್",
    "farmgate.greeting": "ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
    "farmgate.intro": "ದಯವಿಟ್ಟು ಅಗತ್ಯ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ಭೇಟಿಯನ್ನು ನಿಗದಿಪಡಿಸಿ.",
    "farmgate.labelField": "ಹೊಲದ ಹೆಸರು (ಐಚ್ಛಿಕ)",
    "farmgate.labelPlaceholder": "ಉದಾ. ಉತ್ತರ ಹೊಲ",
    "farmgate.addressField": "ಭೇಟಿಯ ಸ್ಥಳ",
    "farmgate.addressPlaceholder": "ಗ್ರಾಮ / ಗುರುತು, ಏಜೆಂಟ್ ಕಂಡುಹಿಡಿಯಲು",
    "farmgate.useLocation": "ನನ್ನ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    "farmgate.locating": "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    "farmgate.locationError": "ನಿಮ್ಮ ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ವಿಳಾಸವನ್ನು ಟೈಪ್ ಮಾಡಿ.",
    "farmgate.dateField": "ಆದ್ಯತೆಯ ದಿನಾಂಕ",
    "farmgate.timeField": "ಆದ್ಯತೆಯ ಸಮಯ",
    "farmgate.timeMorning": "ಬೆಳಿಗ್ಗೆ (9 - 12)",
    "farmgate.timeAfternoon": "ಮಧ್ಯಾಹ್ನ (12 - 4)",
    "farmgate.timeEvening": "ಸಂಜೆ (4 - 7)",
    "farmgate.reminderTitle": "ಏಜೆಂಟ್ ಭೇಟಿಗಾಗಿ ಇವುಗಳನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ",
    "farmgate.reminderPatta": "ಪಟ್ಟಾ ಸಂಖ್ಯೆ (ಭೂ ಮಾಲೀಕತ್ವ ಪುರಾವೆ)",
    "farmgate.reminderAadhaar": "ಆಧಾರ್ ಐಡಿ",
    "farmgate.submit": "ಭೇಟಿಯನ್ನು ನಿಗದಿಪಡಿಸಿ",
    "farmgate.submitting": "ನಿಗದಿಪಡಿಸಲಾಗುತ್ತಿದೆ...",
    "farmgate.formError": "ಸ್ಥಳ, ದಿನಾಂಕ ಮತ್ತು ಸಮಯವನ್ನು ಭರ್ತಿ ಮಾಡಿ.",
    "farmgate.confirmHeading": "ಭೇಟಿ ನಿಗದಿಯಾಗಿದೆ",
    "farmgate.confirmBody":
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ದಿನಾಂಕ ಮತ್ತು ಸಮಯದಲ್ಲಿ ನಮ್ಮ ಏಜೆಂಟ್ ನಿಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡುತ್ತಾರೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.",
    "farmgate.backHome": "ಹೋಮ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    "farmgate.yourFarms": "ನಿಮ್ಮ ಹೊಲಗಳು",
    "farmgate.addAnother": "ಇನ್ನೊಂದು ಭೇಟಿಯನ್ನು ನಿಗದಿಪಡಿಸಿ",
    "farmgate.statusRequested": "ವಿನಂತಿಸಲಾಗಿದೆ",
    "farmgate.statusScheduled": "ನಿಗದಿಯಾಗಿದೆ",
    "farmgate.statusCompleted": "ಪೂರ್ಣಗೊಂಡಿದೆ",
    "farmgate.statusCancelled": "ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ",
    "farmgate.close": "ಮುಚ್ಚಿ",
    "farmgate.greenDetailsTitle": "ಗ್ರೀನ್ ವಿವರಗಳು",
    "farmgate.treeCover": "ಮರಗಳ ಹೊದಿಕೆ",
    "farmgate.estimatedO2": "ಅಂದಾಜು O₂ ಉತ್ಪಾದನೆ",
    "farmgate.greenDetailsPending": "ಇನ್ನೂ ವಿಶ್ಲೇಷಿಸಲಾಗಿಲ್ಲ — ಇದು ಏಜೆಂಟ್ ಭೇಟಿಯ ಸಮಯದಲ್ಲಿ ತಯಾರಾಗುತ್ತದೆ.",
    "farmgate.mapPending": "ಜಮೀನಿನ ನಿಖರ ಸ್ಥಳ ಮತ್ತು ಗಡಿಯನ್ನು ಸೆರೆಹಿಡಿಯಲು ಏಜೆಂಟ್ ಭೇಟಿ ಇನ್ನೂ ಬೇಕಾಗಿದೆ. ಅದು ಆದ ನಂತರ ನಕ್ಷೆ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.",
    "cropAdvisory.whichFarm": "ನೀವು ಯಾವ ಹೊಲದ ಬಗ್ಗೆ ಕೇಳುತ್ತಿದ್ದೀರಿ?",
    "cropAdvisory.whatHelp": "ಇಂದು ನಾನು ಏನು ಸಹಾಯ ಮಾಡಲಿ?",
    "cropAdvisory.optionSuggestions": "ಬೆಳೆ ಸಲಹೆಗಳು",
    "cropAdvisory.optionHealth": "ಬೆಳೆ ಆರೋಗ್ಯ ತಪಾಸಣೆ",
    "cropAdvisory.suggestionsIntro": "ಈ ಸೀಸನ್‌ನಲ್ಲಿ ಸೂಕ್ತ ಬೆಳೆಗಳು —",
    "cropAdvisory.selectPrompt": "ಈ ಹೊಲಕ್ಕೆ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ.",
    "cropAdvisory.selectConfirm": "ಸರಿ! ನಾನು ಉಳಿಸಿದ್ದೇನೆ",
    "cropAdvisory.changeCrop": "ಬೆಳೆ ಬದಲಾಯಿಸಿ",
    "cropAdvisory.advisory.irrigation": "ನೀರಾವರಿ",
    "cropAdvisory.advisory.fertilizer": "ಗೊಬ್ಬರ",
    "cropAdvisory.advisory.pestAlert": "ಕೀಟ ಎಚ್ಚರಿಕೆ",
    "cropAdvisory.health.uploadPrompt": "ಹಾನಿಗೊಳಗಾದ ಬೆಳೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ನಾನು ವಿಶ್ಲೇಷಿಸುತ್ತೇನೆ.",
    "cropAdvisory.health.uploadBtn": "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "cropAdvisory.health.analysing": "ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ…",
    "cropAdvisory.health.disclaimer": "AI-ಸಹಾಯ — ಪ್ರಮಾಣೀಕೃತ ಕೃಷಿ ಸಲಹೆ ಅಲ್ಲ",
    "cropAdvisory.health.confidence": "ನಿಖರತೆ",
    "cropAdvisory.health.scanAgain": "ಇನ್ನೊಂದು ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    "cropAdvisory.marketplace.title": "ನಿಮಗೆ ಏನು ಬೇಕಾಗಬಹುದು",
    "cropAdvisory.marketplace.comingSoon": "ಶೀಘ್ರದಲ್ಲಿ ಬರಲಿದೆ",
    "cropAdvisory.tractor.label": "ಟ್ರ್ಯಾಕ್ಟರ್ ಬಾಡಿಗೆ",
    "cropAdvisory.tractor.cta": "ಹತ್ತಿರದಲ್ಲಿ ಬಾಡಿಗೆ ಪಡೆಯಿರಿ",
    "cropAdvisory.back": "← ಹಿಂದೆ",
    "cropAdvisory.season.kharif": "ಖರೀಫ್ ಋತು",
    "cropAdvisory.season.rabi": "ರಬಿ ಋತು",
    "cropAdvisory.season.zaid": "ಜಾಯಿದ್ ಋತು",
    "cropAdvisory.noFarms": "ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಜಮೀನನ್ನು ನೋಂದಾಯಿಸಿಲ್ಲ.",
    "cropAdvisory.goToFarmgate": "ಜಮೀನನ್ನು ನೋಂದಾಯಿಸಿ",
    "cropAdvisory.uploadError": "ಅಪ್‌ಲೋಡ್ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    "cropAdvisory.register.button": "ಜಮೀನನ್ನು ನೋಂದಾಯಿಸಿ",
    "cropAdvisory.register.locating": "ನಿಮ್ಮ ಜಮೀನಿನ ಸ್ಥಳ ಹುಡುಕಲಾಗುತ್ತಿದೆ…",
    "cropAdvisory.register.found": "ನಿಮ್ಮ ಜಮೀನು ಇಲ್ಲಿ ಕಂಡುಬಂತು —",
    "cropAdvisory.register.notFound": "ಸ್ಥಳ ಕಂಡುಬಂದಿಲ್ಲ. ನೋಂದಾಯಿತ ಪ್ರದೇಶ ಬಳಸುತ್ತೇವೆ.",
    "cropAdvisory.register.askAbout": "ನಿಮ್ಮ ಭೂಮಿ ಬಗ್ಗೆ ಹೇಳಿ — ಮಣ್ಣಿನ ಪ್ರಕಾರ, ನೀರಿನ ಲಭ್ಯತೆ, ಅಥವಾ ಮೊದಲು ಏನು ಬೆಳೆದಿದ್ದೀರಿ.",
    "cropAdvisory.register.getSuggestions": "ಬೆಳೆ ಸಲಹೆಗಳು ಪಡೆಯಿರಿ",
    "cropAdvisory.register.inputPlaceholder": "ನಿಮ್ಮ ಭೂಮಿ ವಿವರಿಸಿ…",
    "cropAdvisory.register.send": "ಕಳುಹಿಸಿ",
    "cropAdvisory.register.thanks": "ಸರಿ! ನಿಮ್ಮ ಸ್ಥಳದ ಆಧಾರದಲ್ಲಿ ಈ ಸೀಸನ್‌ನ ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳು:",
    "cropAdvisory.register.saving": "ಜಮೀನು ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ…",
    "cropAdvisory.register.done": "ನಿಮ್ಮ ಜಮೀನು ನೋಂದಾಯಿಸಲಾಗಿದೆ!",
  },
  ta: {
    "nav.language": "மொழி",
    "hero.title": "விவசாயம் மற்றும் ஃபின்டெக்கிற்கான உங்கள் ஒரே தீர்வு",
    "hero.subtitle":
      "நிதி, தொழில்நுட்பம் மற்றும் நிலைத்தன்மை — ஒரே செயலியில், இந்திய விவசாயிகளுக்காக கட்டமைக்கப்பட்டது.",
    "hero.cta": "தொடங்குங்கள்",
    "tabs.fintech": "ஃபின்டெக்",
    "tabs.agritech": "அக்ரிடெக்",
    "tabs.unified": "ஒருங்கிணைந்த",
    "fintech.heading": "சிறந்த நிதி. பாதுகாப்பான எதிர்காலம்.",
    "fintech.description":
      "UPI கொடுப்பனவுகள், கடன்கள், காப்பீடு மற்றும் டிஜிட்டல் பணப்பை — கிராமப்புற இந்தியாவிற்காக.",
    "agritech.heading": "சிறந்த விவசாயம். சிறந்த முடிவுகள்.",
    "agritech.description":
      "AI பயிர் ஆலோசனை, வானிலை முன்னறிவிப்புகள் மற்றும் ஒவ்வொரு விவசாய தேவைக்கும் சந்தை.",
    "unified.heading": "ஒரு செயலி. எண்ணற்ற சாத்தியங்கள்.",
    "unified.description": "உங்கள் வயல் மற்றும் உங்கள் நிதி ஒன்றாக வளரும் இடம்.",
    "modules.farmgate": "ஃபார்ம்கேட்",
    "modules.cropAdvisory": "பயிர் ஆலோசனை",
    "modules.weather": "வானிலை",
    "modules.marketplace": "சந்தை",
    "modules.wallet": "பணப்பை",
    "modules.loanChecker": "கடன் தகுதி",
    comingSoon: "🚧 விரைவில் — இப்போது உருவாக்கப்படுகிறது",
    "mission.label": "எங்கள் இலக்கு",
    "mission.heading": "ஒவ்வொரு கிராமத்திலும் ஒவ்வொரு விவசாயியையும் மேம்படுத்துவது",
    "mission.body":
      "கிராமப்புற இந்தியாவிற்காக நிதி, தொழில்நுட்பம் மற்றும் நிலைத்தன்மையை ஒரே செயலியில் கொண்டு வருகிறோம் — இதனால் ஒரு விவசாயி பல செயலிகள் இல்லாமல் வானிலை பார்க்கலாம், பயிர் ஆலோசனை பெறலாம், விளைபொருட்களை விற்கலாம் மற்றும் பணத்தை நிர்வகிக்கலாம்.",
    "mission.pillar1.title": "கடைசி மைலுக்கும் சென்றடையும் நிதி",
    "mission.pillar1.body":
      "கொடுப்பனவுகள், கடன்கள், காப்பீடு மற்றும் சேமிப்பு — முறையான வங்கியிலிருந்து விலக்கப்பட்ட விவசாயிகளுக்காக.",
    "mission.pillar2.title": "விவசாயிகள் நம்பக்கூடிய தொழில்நுட்பம்",
    "mission.pillar2.body":
      "பயிர் ஆலோசனை, வானிலை முன்னறிவிப்புகள் மற்றும் மண் தகவல் — யூகங்களுக்கு பதிலாக எளிய, உள்ளூர் மொழி வழிகாட்டுதல்.",
    "mission.pillar3.title": "நியாயமான, இணைக்கப்பட்ட சந்தை",
    "mission.pillar3.body":
      "உள்ளீடுகளை வாங்குங்கள் மற்றும் விளைபொருட்களை நேரடியாக விற்பனை செய்யுங்கள் — குறைந்த தரகர்களுடன், மேலும் வெளிப்படையான விலைகளுடன்.",
    "grid.heading": "விரிவான விவசாயி சேவைகள்",
    "grid.banner.title": "50+ சிறப்பு சேவைகளை திறக்கவும்",
    "grid.banner.body":
      "கொடுப்பனவு தீர்வுகளிலிருந்து உபகரண வாடகை வரை, உங்களுக்கு தேவையானவை அனைத்தும் இந்த ஒரே செயலியில் உள்ளன.",
    "grid.title1": "AI பயிர் ஆரோக்கியம்",
    "grid.body1": "AI ஸ்கேனுடன் உங்கள் பயிர் ஆரோக்கியத்தை மேம்படுத்துங்கள்.",
    "grid.title2": "கார்பன் கிரெடிட்டுகள்",
    "grid.body2": "கார்பன் கிரெடிட்டுகள் சம்பாதியுங்கள், எதிர்கால வருமானத்தை அதிகரியுங்கள்.",
    "grid.title3": "விரைவு கடன்கள்",
    "grid.body3": "ஒவ்வொரு விவசாயிக்கும் வேகமான, எளிய கடன்கள்.",
    "grid.title4": "சந்தை",
    "grid.body4":
      "விவசாய உள்ளீடுகளை வாங்குங்கள், உங்கள் விளைபொருட்களை விற்பனை செய்யுங்கள் — ஒரே இடத்தில்.",
    "grid.title5": "பண்ணை மேலாண்மை",
    "grid.body5":
      "மேம்பட்ட தரவு மற்றும் நுண்ணறிவுகளுடன் உங்கள் வயலை மேம்படுத்துங்கள்.",
    "grid.title6": "நோய் கண்காணிப்பு",
    "grid.body6": "பயிர் நோய்களை தடுக்க நிகழ்நேர கண்காணிப்பு.",
    "cta.heading": "தொடங்குவோம்",
    "cta.subheading":
      "ஒரு நிலையான எதிர்காலத்தை வளர்த்துக்கொள்ளுங்கள் — உங்கள் வயலுக்காக, மற்றும் அடுத்த தலைமுறைக்காக.",
    "cta.button": "தொடங்குங்கள்",
    "login.heading": "AgriFintech-க்கு வரவேற்கிறோம்",
    "login.subtitle": "தொடங்க உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்.",
    "login.phoneLabel": "தொலைபேசி எண்",
    "login.sendOtp": "OTP அனுப்பு",
    "login.sending": "அனுப்புகிறது...",
    "login.phoneError": "சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்.",
    "login.otpHeading": "உங்கள் எண்ணை சரிபார்க்கவும்",
    "login.otpSubtitle": "இந்த எண்ணுக்கு அனுப்பப்பட்ட குறியீட்டை உள்ளிடவும்",
    "login.otpError": "6 இலக்க குறியீட்டை உள்ளிடவும்.",
    "login.verify": "சரிபார்க்கவும்",
    "login.verifying": "சரிபார்க்கிறது...",
    "login.registerHeading": "உங்களைப் பற்றி சொல்லுங்கள்",
    "login.registerSubtitle": "அடிப்படை தகவல்கள் மட்டும் — ஒரு நிமிடம் ஆகும்.",
    "login.fullNameLabel": "முழு பெயர்",
    "login.fullNamePlaceholder": "உங்கள் பெயர்",
    "login.addressLabel": "முகவரி",
    "login.addressPlaceholder": "கிராமம் / நகரம், தெரு",
    "login.pincodeLabel": "பின்கோடு",
    "login.pincodeLoading": "பின்கோடு தேடுகிறது...",
    "login.pincodeFoundSuffix": "தானாகவே கண்டறியப்பட்டது",
    "login.pincodeNotFound":
      "அந்த பின்கோடு கிடைக்கவில்லை — சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
    "login.registerError":
      "உங்கள் பெயர், முகவரி மற்றும் சரியான பின்கோடு நிரப்பவும்.",
    "login.saving": "சேமிக்கிறது...",
    "login.continue": "தொடரவும்",
    "login.doneHeading": "நீங்கள் தயார்",
    "login.doneSubtitle": "திருப்பி அனுப்புகிறது...",
    "home.welcomeBack": "மீண்டும் வரவேற்கிறோம்",
    "home.greeting": "வணக்கம்,",
    "home.weatherUnavailable": "இப்போது வானிலை தகவல் கிடைக்கவில்லை",
    "home.comingSoon": "விரைவில் வருகிறது",
    "home.navHome": "முகப்பு",
    "home.navProfile": "சுயவிவரம்",
    "farmgate.greeting": "செயல்முறையை தொடங்கியதற்கு நன்றி.",
    "farmgate.intro": "தயவுசெய்து தேவையான விவரங்களை நிரப்பி ஒரு வருகையை திட்டமிடவும்.",
    "farmgate.labelField": "வயல் பெயர் (விரும்பினால்)",
    "farmgate.labelPlaceholder": "எ.கா. வடக்கு வயல்",
    "farmgate.addressField": "வருகை இடம்",
    "farmgate.addressPlaceholder": "கிராமம் / அடையாளம், முகவர் கண்டுபிடிக்க",
    "farmgate.useLocation": "என் தற்போதைய இருப்பிடத்தை பயன்படுத்து",
    "farmgate.locating": "உங்கள் இருப்பிடத்தை கண்டறிகிறது...",
    "farmgate.locationError":
      "உங்கள் இருப்பிடத்தை கண்டறிய முடியவில்லை. தயவுசெய்து முகவரியை தட்டச்சு செய்யவும்.",
    "farmgate.dateField": "விரும்பிய தேதி",
    "farmgate.timeField": "விரும்பிய நேரம்",
    "farmgate.timeMorning": "காலை (9 AM – 12 PM)",
    "farmgate.timeAfternoon": "மதியம் (12 PM – 4 PM)",
    "farmgate.timeEvening": "மாலை (4 PM – 7 PM)",
    "farmgate.reminderTitle": "முகவரின் வருகைக்காக இவற்றை தயாராக வைத்திருங்கள்",
    "farmgate.reminderPatta": "பட்டா எண் (நில உரிமை சான்று)",
    "farmgate.reminderAadhaar": "ஆதார் ஐடி",
    "farmgate.submit": "வருகையை திட்டமிடு",
    "farmgate.submitting": "திட்டமிடுகிறது...",
    "farmgate.formError": "இடம், தேதி மற்றும் நேரம் நிரப்பவும்.",
    "farmgate.confirmHeading": "வருகை திட்டமிடப்பட்டது",
    "farmgate.confirmBody":
      "நீங்கள் தேர்ந்தெடுத்த தேதி மற்றும் நேரத்தில் எங்கள் முகவர் உங்களை சந்திப்பார். தயவுசெய்து உங்கள் ஆவணங்களை தயாராக வைத்திருங்கள்.",
    "farmgate.backHome": "முகப்பிற்கு திரும்பு",
    "farmgate.yourFarms": "உங்கள் வயல்கள்",
    "farmgate.addAnother": "மற்றொரு வருகையை திட்டமிடு",
    "farmgate.statusRequested": "கோரப்பட்டது",
    "farmgate.statusScheduled": "திட்டமிடப்பட்டது",
    "farmgate.statusCompleted": "முடிந்தது",
    "farmgate.statusCancelled": "ரத்து செய்யப்பட்டது",
    "farmgate.close": "மூடு",
    "farmgate.greenDetailsTitle": "பசுமை விவரங்கள்",
    "farmgate.treeCover": "மரங்களின் மூடல்",
    "farmgate.estimatedO2": "மதிப்பிடப்பட்ட O₂ உற்பத்தி",
    "farmgate.greenDetailsPending":
      "இன்னும் பகுப்பாய்வு செய்யப்படவில்லை — இது முகவரின் வருகையின் போது தயாரிக்கப்படும்.",
    "farmgate.mapPending":
      "வயலின் சரியான இடம் மற்றும் எல்லையை பதிவு செய்ய முகவரின் வருகை இன்னும் தேவை. அது முடிந்தவுடன் வரைபடம் இங்கே தோன்றும்.",
    "cropAdvisory.whichFarm": "நீங்கள் எந்த வயலைப் பற்றி கேட்கிறீர்கள்?",
    "cropAdvisory.whatHelp": "இன்று நான் எதில் உதவட்டும்?",
    "cropAdvisory.optionSuggestions": "பயிர் பரிந்துரைகள்",
    "cropAdvisory.optionHealth": "பயிர் ஆரோக்கிய சோதனை",
    "cropAdvisory.suggestionsIntro": "இந்த பருவத்தில் பொருத்தமான பயிர்கள் —",
    "cropAdvisory.selectPrompt": "இந்த வயலுக்கு பயிர் தேர்ந்தெடுக்க தட்டவும்.",
    "cropAdvisory.selectConfirm": "சரி! நான் சேமித்தேன்",
    "cropAdvisory.changeCrop": "பயிர் மாற்றவும்",
    "cropAdvisory.advisory.irrigation": "நீர்ப்பாசனம்",
    "cropAdvisory.advisory.fertilizer": "உரம்",
    "cropAdvisory.advisory.pestAlert": "பூச்சி எச்சரிக்கை",
    "cropAdvisory.health.uploadPrompt": "பாதிக்கப்பட்ட பயிரின் புகைப்படத்தை பதிவேற்றவும், நான் பகுப்பாய்வு செய்வேன்.",
    "cropAdvisory.health.uploadBtn": "புகைப்படம் பதிவேற்றவும்",
    "cropAdvisory.health.analysing": "உங்கள் பயிரை பகுப்பாய்வு செய்கிறது…",
    "cropAdvisory.health.disclaimer": "AI-உதவி — சான்றளிக்கப்பட்ட வேளாண் ஆலோசனை அல்ல",
    "cropAdvisory.health.confidence": "நம்பகத்தன்மை",
    "cropAdvisory.health.scanAgain": "மற்றொரு புகைப்படம் ஸ்கேன் செய்யவும்",
    "cropAdvisory.marketplace.title": "உங்களுக்கு என்ன தேவைப்படலாம்",
    "cropAdvisory.marketplace.comingSoon": "விரைவில் வருகிறது",
    "cropAdvisory.tractor.label": "டிராக்டர் வாடகை",
    "cropAdvisory.tractor.cta": "அருகில் வாடகைக்கு எடுக்கவும்",
    "cropAdvisory.back": "← திரும்பு",
    "cropAdvisory.season.kharif": "கரீஃப் பருவம்",
    "cropAdvisory.season.rabi": "ரபி பருவம்",
    "cropAdvisory.season.zaid": "ஜாயித் பருவம்",
    "cropAdvisory.noFarms": "நீங்கள் இன்னும் எந்த வயலையும் பதிவு செய்யவில்லை.",
    "cropAdvisory.goToFarmgate": "வயலை பதிவு செய்யவும்",
    "cropAdvisory.uploadError": "பதிவேற்றம் தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.",
    "cropAdvisory.register.button": "வயலை பதிவு செய்யுங்கள்",
    "cropAdvisory.register.locating": "உங்கள் வயல் இடத்தை கண்டறிகிறது…",
    "cropAdvisory.register.found": "உங்கள் வயல் இங்கே கண்டறியப்பட்டது —",
    "cropAdvisory.register.notFound": "இடம் கண்டறிய முடியவில்லை. பதிவு செய்த பகுதி பயன்படுத்துகிறோம்.",
    "cropAdvisory.register.askAbout": "உங்கள் நிலம் பற்றி சொல்லுங்கள் — மண் வகை, நீர் கிடைக்கும் தன்மை, அல்லது முன்பு என்ன விளைவித்தீர்கள்.",
    "cropAdvisory.register.getSuggestions": "பயிர் பரிந்துரைகள் பெறுங்கள்",
    "cropAdvisory.register.inputPlaceholder": "உங்கள் நிலத்தை விவரிக்கவும்…",
    "cropAdvisory.register.send": "அனுப்பு",
    "cropAdvisory.register.thanks": "சரி! உங்கள் இடத்தின் அடிப்படையில் இந்த பருவத்தின் சிறந்த பயிர்கள்:",
    "cropAdvisory.register.saving": "வயல் பதிவாகிறது…",
    "cropAdvisory.register.done": "உங்கள் வயல் பதிவாகிவிட்டது!",
  },
  ml: {
    "nav.language": "ഭാഷ",
    "hero.title": "കൃഷിക്കും ഫിൻടെക്കിനും വേണ്ടിയുള്ള നിങ്ങളുടെ ഒറ്റ പരിഹാരം",
    "hero.subtitle":
      "ധനകാര്യം, സാങ്കേതികവിദ്യ, സ്ഥിരത — ഒരേ ആപ്പിൽ, ഇന്ത്യൻ കർഷകർക്ക് വേണ്ടി നിർമ്മിച്ചത്.",
    "hero.cta": "തുടങ്ങൂ",
    "tabs.fintech": "ഫിൻടെക്",
    "tabs.agritech": "അഗ്രിടെക്",
    "tabs.unified": "ഏകീകൃത",
    "fintech.heading": "സ്മാർട്ട് ഫിനാൻസ്. സുരക്ഷിത ഭാവി.",
    "fintech.description":
      "UPI പേയ്‌മെന്റ്, വായ്പ, ഇൻഷുറൻസ്, ഡിജിറ്റൽ വാലറ്റ് — ഗ്രാമീണ ഇന്ത്യക്ക് വേണ്ടി.",
    "agritech.heading": "സ്മാർട്ട് കൃഷി. മികച്ച തീരുമാനങ്ങൾ.",
    "agritech.description":
      "AI വിള ഉപദേശം, കാലാവസ്ഥ പ്രവചനം, ഓരോ കൃഷിത്തൊഴിൽ ആവശ്യകതയ്ക്കും ഒരു വിപണി.",
    "unified.heading": "ഒരു ആപ്. അനന്തമായ സാധ്യതകൾ.",
    "unified.description": "നിങ്ങളുടെ കൃഷിഭൂമിയും ധനകാര്യവും ഒന്നിച്ചു വളരുന്ന ഇടം.",
    "modules.farmgate": "ഫാർംഗേറ്റ്",
    "modules.cropAdvisory": "വിള ഉപദേശം",
    "modules.weather": "കാലാവസ്ഥ",
    "modules.marketplace": "വിപണി",
    "modules.wallet": "വാലറ്റ്",
    "modules.loanChecker": "വായ്പ യോഗ്യത",
    comingSoon: "🚧 ഉടൻ വരുന്നു — ഇപ്പോൾ വികസിപ്പിക്കുന്നു",
    "mission.label": "ഞങ്ങളുടെ ലക്ഷ്യം",
    "mission.heading": "ഓരോ ഗ്രാമത്തിലെ ഓരോ കർഷകനെയും ശക്തിപ്പെടുത്തൽ",
    "mission.body":
      "ഗ്രാമീണ ഇന്ത്യക്ക് വേണ്ടി ധനകാര്യം, സാങ്കേതികവിദ്യ, സ്ഥിരത എന്നിവ ഒരേ ആപ്പിൽ കൊണ്ടുവരുന്നു — ഇതുവഴി ഒരു കർഷകന് ഒന്നിലധികം ആപ്പുകൾ ഇല്ലാതെ കാലാവസ്ഥ നോക്കാം, വിള ഉപദേശം ലഭിക്കാം, ഉൽപ്പന്നങ്ങൾ വിൽക്കാം, പണം കൈകാര്യം ചെയ്യാം.",
    "mission.pillar1.title": "അവസാന മൈൽ വരെ എത്തുന്ന ധനകാര്യം",
    "mission.pillar1.body":
      "പേയ്‌മെന്റ്, വായ്പ, ഇൻഷുറൻസ്, സമ്പാദ്യം — ഔദ്യോഗിക ബാങ്കിങ്ങിൽ നിന്ന് പലപ്പോഴും ഒഴിവാക്കപ്പെടുന്ന കർഷകർക്ക്.",
    "mission.pillar2.title": "കർഷകർ വിശ്വസിക്കാൻ കഴിയുന്ന സാങ്കേതികവിദ്യ",
    "mission.pillar2.body":
      "വിള ഉപദേശം, കാലാവസ്ഥ പ്രവചനം, മണ്ണ് വിവരങ്ങൾ — ഊഹങ്ങൾക്ക് പകരം ലളിതമായ, പ്രാദേശിക ഭാഷ മാർഗ്ഗനിർദ്ദേശം.",
    "mission.pillar3.title": "ന്യായമായ, ബന്ധിപ്പിക്കപ്പെട്ട വിപണി",
    "mission.pillar3.body":
      "ഇൻപുട്ടുകൾ വാങ്ങൂ, ഉൽപ്പന്നങ്ങൾ നേരിട്ട് വിൽക്കൂ — കുറഞ്ഞ ഇടനിലക്കാർ, കൂടുതൽ സുതാര്യ വിലകൾ.",
    "grid.heading": "സമഗ്ര കർഷക സേവനങ്ങൾ",
    "grid.banner.title": "50-ലധികം സ്പെഷ്യൽ സേവനങ്ങൾ അൺലോക്ക് ചെയ്യൂ",
    "grid.banner.body":
      "പേയ്‌മെന്റ് സൊലൂഷനുകൾ മുതൽ ഉപകരണ വാടകവരെ, ആവശ്യമായതെല്ലാം ഈ ഒരു ആപ്പിലുണ്ട്.",
    "grid.title1": "AI വിള ആരോഗ്യം",
    "grid.body1": "AI സ്‌കാൻ ഉപയോഗിച്ച് വിള ആരോഗ്യം മെച്ചപ്പെടുത്തൂ.",
    "grid.title2": "കാർബൺ ക്രെഡിറ്റുകൾ",
    "grid.body2": "കാർബൺ ക്രെഡിറ്റ് നേടൂ, ഭാവി വരുമാനം വർദ്ധിപ്പിക്കൂ.",
    "grid.title3": "ദ്രുത വായ്പ",
    "grid.body3": "ഓരോ കർഷകനും വേഗമേറിയ, ലളിതമായ വായ്പ.",
    "grid.title4": "വിപണി",
    "grid.body4":
      "കൃഷി ഉൽപ്പന്നങ്ങൾ വാങ്ങൂ, വിൽക്കൂ — ഒരിടത്ത്.",
    "grid.title5": "ഫാം മാനേജ്‌മെന്റ്",
    "grid.body5":
      "വിപുലമായ ഡേറ്റയും ഉൾക്കാഴ്ചകളും ഉപയോഗിച്ച് ഫാം മെച്ചപ്പെടുത്തൂ.",
    "grid.title6": "രോഗ നിരീക്ഷണം",
    "grid.body6": "വിള രോഗം തടയാൻ റിയൽ-ടൈം നിരീക്ഷണം.",
    "cta.heading": "തുടങ്ങൂ",
    "cta.subheading":
      "ഒരു സ്ഥിരമായ ഭാവി കൃഷി ചെയ്യൂ — നിങ്ങളുടെ ഫാമിനു വേണ്ടി, അടുത്ത തലമുറക്കും.",
    "cta.button": "തുടങ്ങൂ",
    "login.heading": "AgriFintech-ലേക്ക് സ്വാഗതം",
    "login.subtitle": "ആരംഭിക്കാൻ ഫോൺ നമ്പർ നൽകൂ.",
    "login.phoneLabel": "ഫോൺ നമ്പർ",
    "login.sendOtp": "OTP അയക്കൂ",
    "login.sending": "അയക്കുന്നു...",
    "login.phoneError": "ശരിയായ 10 അക്ക ഫോൺ നമ്പർ നൽകൂ.",
    "login.otpHeading": "നിങ്ങളുടെ നമ്പർ സ്ഥിരീകരിക്കൂ",
    "login.otpSubtitle": "ഈ നമ്പറിലേക്ക് അയച്ച കോഡ് നൽകൂ",
    "login.otpError": "6 അക്ക കോഡ് നൽകൂ.",
    "login.verify": "സ്ഥിരീകരിക്കൂ",
    "login.verifying": "സ്ഥിരീകരിക്കുന്നു...",
    "login.registerHeading": "നിങ്ങളെ കുറിച്ച് പറയൂ",
    "login.registerSubtitle": "അടിസ്ഥാന വിവരങ്ങൾ മാത്രം — ഒരു മിനിറ്റ് ആകും.",
    "login.fullNameLabel": "പൂർണ്ണ നാമം",
    "login.fullNamePlaceholder": "നിങ്ങളുടെ പേര്",
    "login.addressLabel": "വിലാസം",
    "login.addressPlaceholder": "ഗ്രാമം / നഗരം, തെരുവ്",
    "login.pincodeLabel": "പിൻകോഡ്",
    "login.pincodeLoading": "പിൻകോഡ് തിരയുന്നു...",
    "login.pincodeFoundSuffix": "സ്വയം കണ്ടെത്തി",
    "login.pincodeNotFound":
      "ആ പിൻകോഡ് കിട്ടിയില്ല — പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കൂ.",
    "login.registerError":
      "നിങ്ങളുടെ പേര്, വിലാസം, ശരിയായ പിൻകോഡ് നൽകൂ.",
    "login.saving": "സേവ് ചെയ്യുന്നു...",
    "login.continue": "തുടരൂ",
    "login.doneHeading": "നിങ്ങൾ തയ്യാർ",
    "login.doneSubtitle": "റീഡയറക്ട് ചെയ്യുന്നു...",
    "home.welcomeBack": "തിരികെ സ്വാഗതം",
    "home.greeting": "ഹലോ,",
    "home.weatherUnavailable": "ഇപ്പോൾ കാലാവസ്ഥ വിവരങ്ങൾ ലഭ്യമല്ല",
    "home.comingSoon": "ഉടൻ വരുന്നു",
    "home.navHome": "ഹോം",
    "home.navProfile": "പ്രൊഫൈൽ",
    "farmgate.greeting": "പ്രക്രിയ ആരംഭിച്ചതിനു നന്ദി.",
    "farmgate.intro":
      "ദയവുചെയ്ത് ആവശ്യമായ വിവരങ്ങൾ നൽകി ഒരു സന്ദർശനം ഷെഡ്യൂൾ ചെയ്യൂ.",
    "farmgate.labelField": "ഫാം പേര് (ഐച്ഛിക)",
    "farmgate.labelPlaceholder": "ഉദാ. വടക്കേ പാടം",
    "farmgate.addressField": "സന്ദർശന സ്ഥലം",
    "farmgate.addressPlaceholder": "ഗ്രാമം / അടയാളം, ഏജന്റ് കണ്ടെത്താൻ",
    "farmgate.useLocation": "എന്റെ ഇപ്പോഴത്തെ സ്ഥലം ഉപയോഗിക്കൂ",
    "farmgate.locating": "സ്ഥലം കണ്ടെത്തുന്നു...",
    "farmgate.locationError":
      "സ്ഥലം കണ്ടെത്താനായില്ല. ദയവുചെയ്ത് വിലാസം ടൈപ്പ് ചെയ്യൂ.",
    "farmgate.dateField": "ഇഷ്ടമുള്ള തീയതി",
    "farmgate.timeField": "ഇഷ്ടമുള്ള സമയം",
    "farmgate.timeMorning": "രാവിലെ (9 AM – 12 PM)",
    "farmgate.timeAfternoon": "ഉച്ചയ്ക്ക് (12 PM – 4 PM)",
    "farmgate.timeEvening": "വൈകിട്ട് (4 PM – 7 PM)",
    "farmgate.reminderTitle": "ഏജന്റ് സന്ദർശനത്തിന് ഇവ തയ്യാർ ആക്കൂ",
    "farmgate.reminderPatta": "പട്ടയ നമ്പർ (ഭൂ ഉടമസ്ഥ തെളിവ്)",
    "farmgate.reminderAadhaar": "ആധാർ ഐഡി",
    "farmgate.submit": "സന്ദർശനം ഷെഡ്യൂൾ ചെയ്യൂ",
    "farmgate.submitting": "ഷെഡ്യൂൾ ചെയ്യുന്നു...",
    "farmgate.formError": "സ്ഥലം, തീയതി, സമയം നൽകൂ.",
    "farmgate.confirmHeading": "സന്ദർശനം ഷെഡ്യൂൾ ആയി",
    "farmgate.confirmBody":
      "നിങ്ങൾ തിരഞ്ഞെടുത്ത തീയതിയിലും സമയത്തിലും ഞങ്ങളുടെ ഏജന്റ് സന്ദർശിക്കും. ദയവുചെയ്ത് രേഖകൾ തയ്യാർ ആക്കൂ.",
    "farmgate.backHome": "ഹോമിലേക്ക് തിരിച്ചുപോകൂ",
    "farmgate.yourFarms": "നിങ്ങളുടെ ഫാമുകൾ",
    "farmgate.addAnother": "മറ്റൊരു സന്ദർശനം ഷെഡ്യൂൾ ചെയ്യൂ",
    "farmgate.statusRequested": "അഭ്യർത്ഥിച്ചു",
    "farmgate.statusScheduled": "ഷെഡ്യൂൾ ആയി",
    "farmgate.statusCompleted": "പൂർത്തിയായി",
    "farmgate.statusCancelled": "റദ്ദ് ചെയ്തു",
    "farmgate.close": "അടയ്ക്കൂ",
    "farmgate.greenDetailsTitle": "ഗ്രീൻ വിശദാംശങ്ങൾ",
    "farmgate.treeCover": "വൃക്ഷ ആവരണം",
    "farmgate.estimatedO2": "കണക്കാക്കിയ O₂ ഉൽപ്പാദനം",
    "farmgate.greenDetailsPending":
      "ഇനിയും വിശകലനം ചെയ്തിട്ടില്ല — ഇത് ഏജന്റ് സന്ദർശന സമയത്ത് തയ്യാറാകും.",
    "farmgate.mapPending":
      "ഫാമിന്റെ കൃത്യമായ സ്ഥലവും അതിർത്തിയും പകർത്താൻ ഒരു ഏജന്റ് സന്ദർശനം ഇനിയും ആവശ്യമാണ്. അത് പൂർത്തിയായ ശേഷം ഭൂപടം ഇവിടെ കാണിക്കും.",
    "cropAdvisory.whichFarm": "നിങ്ങൾ ഏത് ഫാമിനെ കുറിച്ച് ചോദിക്കുന്നു?",
    "cropAdvisory.whatHelp": "ഇന്ന് ഞാൻ എന്ത് സഹായിക്കട്ടെ?",
    "cropAdvisory.optionSuggestions": "വിള നിർദ്ദേശങ്ങൾ",
    "cropAdvisory.optionHealth": "വിള ആരോഗ്യ പരിശോധന",
    "cropAdvisory.suggestionsIntro": "ഈ സീസണിൽ അനുയോജ്യമായ വിളകൾ —",
    "cropAdvisory.selectPrompt": "ഈ ഫാമിനായി ഒരു വിള തിരഞ്ഞെടുക്കാൻ ടാപ്പ് ചെയ്യൂ.",
    "cropAdvisory.selectConfirm": "ശരി! ഞാൻ സേവ് ചെയ്തു",
    "cropAdvisory.changeCrop": "വിള മാറ്റൂ",
    "cropAdvisory.advisory.irrigation": "ജലസേചനം",
    "cropAdvisory.advisory.fertilizer": "വളം",
    "cropAdvisory.advisory.pestAlert": "കീടം മുന്നറിയിപ്പ്",
    "cropAdvisory.health.uploadPrompt": "ബാധിതമായ വിളയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യൂ, ഞാൻ വിശകലനം ചെയ്യാം.",
    "cropAdvisory.health.uploadBtn": "ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യൂ",
    "cropAdvisory.health.analysing": "നിങ്ങളുടെ വിള വിശകലനം ചെയ്യുന്നു…",
    "cropAdvisory.health.disclaimer": "AI-സഹായം — സർട്ടിഫൈഡ് കൃഷി ഉപദേശം അല്ല",
    "cropAdvisory.health.confidence": "ആത്മവിശ്വാസം",
    "cropAdvisory.health.scanAgain": "മറ്റൊരു ഫോട്ടോ സ്കാൻ ചെയ്യൂ",
    "cropAdvisory.marketplace.title": "നിങ്ങൾക്ക് ആവശ്യമായേക്കാം",
    "cropAdvisory.marketplace.comingSoon": "ഉടൻ വരുന്നു",
    "cropAdvisory.tractor.label": "ട്രാക്ടർ വാടക",
    "cropAdvisory.tractor.cta": "അടുത്ത് വാടകയ്ക്ക് എടുക്കൂ",
    "cropAdvisory.back": "← തിരികെ",
    "cropAdvisory.season.kharif": "ഖരീഫ് സീസൺ",
    "cropAdvisory.season.rabi": "റബി സീസൺ",
    "cropAdvisory.season.zaid": "സൈദ് സീസൺ",
    "cropAdvisory.noFarms": "നിങ്ങൾ ഇനിയും ഒരു ഫാമും രജിസ്റ്റർ ചെയ്തിട്ടില്ല.",
    "cropAdvisory.goToFarmgate": "ഒരു ഫാം രജിസ്റ്റർ ചെയ്യൂ",
    "cropAdvisory.uploadError": "അപ്‌ലോഡ് പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കൂ.",
    "cropAdvisory.register.button": "ഒരു ഫാം രജിസ്റ്റർ ചെയ്യൂ",
    "cropAdvisory.register.locating": "നിങ്ങളുടെ ഫാം സ്ഥലം കണ്ടെത്തുന്നു…",
    "cropAdvisory.register.found": "നിങ്ങളുടെ ഫാം ഇവിടെ കണ്ടെത്തി —",
    "cropAdvisory.register.notFound": "സ്ഥലം കണ്ടെത്താനായില്ല. രജിസ്റ്റർ ചെയ്ത പ്രദേശം ഉപയോഗിക്കും.",
    "cropAdvisory.register.askAbout": "നിങ്ങളുടെ ഭൂമിയെ കുറിച്ച് പറയൂ — മണ്ണ് തരം, ജല ലഭ്യത, അല്ലെങ്കിൽ നേരത്തെ എന്ത് കൃഷി ചെയ്തു.",
    "cropAdvisory.register.getSuggestions": "വിള നിർദ്ദേശങ്ങൾ നേടൂ",
    "cropAdvisory.register.inputPlaceholder": "നിങ്ങളുടെ ഭൂമി വിവരിക്കൂ…",
    "cropAdvisory.register.send": "അയക്കൂ",
    "cropAdvisory.register.thanks": "ശരി! നിങ്ങളുടെ ലൊക്കേഷൻ അടിസ്ഥാനമാക്കി ഈ സീസണിലെ മികച്ച വിളകൾ:",
    "cropAdvisory.register.saving": "ഫാം രജിസ്റ്റർ ചെയ്യുന്നു…",
    "cropAdvisory.register.done": "നിങ്ങളുടെ ഫാം രജിസ്റ്റർ ആയി!",
  },
};
