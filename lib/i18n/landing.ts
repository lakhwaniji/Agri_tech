import type { Locale } from "./translations";

// Copy for the public landing page (app/page.tsx), in all 6 app languages.
export type LandingCopy = {
  nav: { how: string; services: string; satellite: string; login: string };
  badge: string;
  title1: string;
  title2: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
  trust: [string, string, string];
  phone: { greeting: string; farms: string; scan: string; cover: string; co2: string; tiles: [string, string, string] };
  chips: { mappedTitle: string; mappedBody: string; ureaTitle: string; ureaBody: string };
  how: { label: string; title: string; stepOf: string; steps: { title: string; body: string; headline: string; detail: string }[] };
  services: { label: string; title: string; intro: string; live: string; soon: string; pilot: string; items: { title: string; body: string }[] };
  sat: { label: string; title: string; body: string; points: [string, string, string]; ndvi: string; cover: string };
  final: { title: string; body: string; cta: string };
  footer: { place: string; privacy: string; agent: string };
};

const en: LandingCopy = {
  nav: { how: "How it works", services: "Services", satellite: "Satellite", login: "Log in" },
  badge: "Agri + Fintech for every Indian farm",
  title1: "Every farm, mapped.",
  title2: "Every farmer, financed.",
  subtitle:
    "AyaOne digitises your land with GPS boundaries and satellite crop health, then opens the door to fair credit, quality inputs delivered home, and carbon income — in your language.",
  cta: "Get started — it's free",
  ctaSecondary: "See how it works",
  trust: ["Login with your phone", "6 Indian languages", "Data stored in India"],
  phone: { greeting: "नमस्ते, good morning", farms: "Gopal's farms", scan: "Satellite scan", cover: "Tree cover · NDVI 0.28", co2: "44 t CO₂ stored", tiles: ["FarmGate", "Advisory", "Market"] },
  chips: { mappedTitle: "Boundary mapped", mappedBody: "Agent visit · done", ureaTitle: "Urea · 45 kg", ureaBody: "Delivered to your village" },
  how: {
    label: "How it works",
    title: "From your phone to your field — in four steps.",
    stepOf: "Step {n} of 4",
    steps: [
      { title: "Register with your phone", body: "Log in with a one-time code. Name, village and pincode — that's it.", headline: "No paperwork. No office visit.", detail: "Sign up in your own language with just a mobile number. District and state fill in automatically from the pincode." },
      { title: "An agent maps your farm", body: "Book a visit. Our field agent walks your boundary and records it with GPS.", headline: "Clear, digital proof of your land.", detail: "Every corner of the plot is captured as GPS coordinates, with soil details and crop type — the base for every other service." },
      { title: "Satellite checks crop health", body: "Sentinel-2 imagery gives a green score, tree cover and carbon estimate.", headline: "Your field, measured from space.", detail: "Clear-sky satellite passes from the last 90 days are analysed pixel by pixel, with clouds removed, so the numbers are reliable." },
      { title: "Unlock credit, inputs and carbon", body: "Fair loans, urea delivered home, and carbon-credit programmes.", headline: "Data that works for the farmer.", detail: "A mapped, scored farm opens doors: better loan terms, quality fertiliser at fair prices, and a share in carbon income." },
    ],
  },
  services: {
    label: "One app",
    title: "Everything a farm needs, in one place.",
    intro: "Built with farmers and field agents for the way rural India actually works.",
    live: "Live", soon: "Coming soon", pilot: "Pilot",
    items: [
      { title: "FarmGate", body: "Register every plot with GPS boundaries, book agent visits and track progress from request to green score." },
      { title: "AI crop advisory", body: "Advice on what to grow and how much fertiliser to use, tuned to your soil, season and local weather." },
      { title: "Marketplace", body: "Urea, seeds and inputs at fair prices, delivered to your village — no middlemen." },
      { title: "Wallet & loans", body: "Check loan eligibility using your farm data and receive payments straight to your wallet." },
      { title: "Weather for your plot", body: "Forecasts tied to your farm's exact location, with alerts before rain or heat." },
      { title: "Carbon credits", body: "Sustainable practices, measured by satellite, turned into a new source of farm income." },
    ],
  },
  sat: {
    label: "Satellite green score",
    title: "Your farm, seen from space. Clouds filtered out.",
    body: "Once your boundary is mapped, AyaOne reads Sentinel-2 imagery for your exact plot — picking the clearest pass from the last 90 days and ignoring every cloudy pixel — to measure crop health, tree cover and the carbon your land stores.",
    points: ["Proof of land and crop for loans and insurance", "Fertiliser advice matched to what's really growing", "A path to carbon-credit income for green farms"],
    ndvi: "NDVI", cover: "tree cover",
  },
  final: { title: "Grow a sustainable future — starting with your farm.", body: "Register with your phone number. A field agent maps your land, and you're in.", cta: "Get started" },
  footer: { place: "Chennai, India", privacy: "Privacy", agent: "Field agent login" },
};

const hi: LandingCopy = {
  nav: { how: "कैसे काम करता है", services: "सेवाएं", satellite: "सैटेलाइट", login: "लॉग इन" },
  badge: "हर भारतीय खेत के लिए कृषि + फिनटेक",
  title1: "हर खेत का नक्शा।",
  title2: "हर किसान को वित्त।",
  subtitle: "AyaOne GPS सीमाओं और सैटेलाइट फसल-स्वास्थ्य से आपकी ज़मीन को डिजिटल बनाता है, फिर उचित कर्ज़, घर तक पहुंचने वाले अच्छे इनपुट और कार्बन आय का रास्ता खोलता है — आपकी भाषा में।",
  cta: "शुरू करें — मुफ़्त है",
  ctaSecondary: "देखें कैसे काम करता है",
  trust: ["फ़ोन से लॉग इन", "6 भारतीय भाषाएं", "डेटा भारत में सुरक्षित"],
  phone: { greeting: "नमस्ते, सुप्रभात", farms: "गोपाल के खेत", scan: "सैटेलाइट स्कैन", cover: "पेड़ आवरण · NDVI 0.28", co2: "44 t CO₂ संग्रहित", tiles: ["फार्मगेट", "सलाह", "बाज़ार"] },
  chips: { mappedTitle: "सीमा मैप हुई", mappedBody: "एजेंट विज़िट · पूरी", ureaTitle: "यूरिया · 45 kg", ureaBody: "आपके गांव तक डिलीवरी" },
  how: {
    label: "कैसे काम करता है",
    title: "आपके फ़ोन से आपके खेत तक — चार कदमों में।",
    stepOf: "कदम {n} / 4",
    steps: [
      { title: "फ़ोन से रजिस्टर करें", body: "OTP से लॉग इन करें। नाम, गांव और पिनकोड — बस।", headline: "कोई कागज़ी काम नहीं। दफ़्तर नहीं जाना।", detail: "सिर्फ़ मोबाइल नंबर से अपनी भाषा में जुड़ें। ज़िला और राज्य पिनकोड से अपने आप भर जाते हैं।" },
      { title: "एजेंट खेत का नक्शा बनाता है", body: "विज़िट बुक करें। हमारा फील्ड एजेंट GPS से आपकी सीमा दर्ज करता है।", headline: "आपकी ज़मीन का साफ़, डिजिटल सबूत।", detail: "खेत का हर कोना GPS निर्देशांक के रूप में दर्ज होता है, मिट्टी और फसल की जानकारी के साथ।" },
      { title: "सैटेलाइट फसल की सेहत जांचता है", body: "Sentinel-2 से ग्रीन स्कोर, पेड़ आवरण और कार्बन अनुमान।", headline: "आपका खेत, अंतरिक्ष से मापा गया।", detail: "पिछले 90 दिनों की साफ़ तस्वीरें पिक्सेल-दर-पिक्सेल जांची जाती हैं, बादल हटाकर, ताकि आंकड़े भरोसेमंद हों।" },
      { title: "कर्ज़, इनपुट और कार्बन पाएं", body: "उचित कर्ज़, घर तक यूरिया, और कार्बन-क्रेडिट कार्यक्रम।", headline: "डेटा जो किसान के काम आए।", detail: "मैप और स्कोर किया खेत बेहतर कर्ज़, उचित दाम पर खाद और कार्बन आय में हिस्सा दिलाता है।" },
    ],
  },
  services: {
    label: "एक ऐप", title: "खेत की हर ज़रूरत, एक जगह।", intro: "किसानों और फील्ड एजेंटों के साथ, ग्रामीण भारत के हिसाब से बनाया गया।",
    live: "चालू", soon: "जल्द आ रहा है", pilot: "पायलट",
    items: [
      { title: "फार्मगेट", body: "GPS सीमाओं के साथ हर खेत रजिस्टर करें, एजेंट विज़िट बुक करें और प्रगति देखें।" },
      { title: "AI फसल सलाह", body: "क्या उगाएं और कितनी खाद डालें — आपकी मिट्टी, मौसम और स्थानीय हवा-पानी के अनुसार।" },
      { title: "बाज़ार", body: "यूरिया, बीज और इनपुट उचित दाम पर, आपके गांव तक — बिना बिचौलियों के।" },
      { title: "वॉलेट और कर्ज़", body: "खेत के डेटा से कर्ज़ की पात्रता जांचें और भुगतान सीधे वॉलेट में पाएं।" },
      { title: "आपके खेत का मौसम", body: "आपके खेत की सटीक जगह का पूर्वानुमान, बारिश या गर्मी से पहले अलर्ट।" },
      { title: "कार्बन क्रेडिट", body: "सैटेलाइट से मापी गई टिकाऊ खेती, आय का नया स्रोत बनती है।" },
    ],
  },
  sat: {
    label: "सैटेलाइट ग्रीन स्कोर", title: "आपका खेत, अंतरिक्ष से। बादल हटाकर।",
    body: "सीमा मैप होने के बाद AyaOne आपके खेत की Sentinel-2 तस्वीरें पढ़ता है — पिछले 90 दिनों की सबसे साफ़ तस्वीर चुनकर, हर बादल वाले पिक्सेल को छोड़कर — फसल की सेहत, पेड़ आवरण और कार्बन मापने के लिए।",
    points: ["कर्ज़ और बीमा के लिए ज़मीन और फसल का सबूत", "असल फसल के हिसाब से खाद की सलाह", "हरे खेतों के लिए कार्बन-क्रेडिट आय का रास्ता"],
    ndvi: "NDVI", cover: "पेड़ आवरण",
  },
  final: { title: "टिकाऊ भविष्य उगाएं — अपने खेत से शुरुआत करें।", body: "फ़ोन नंबर से रजिस्टर करें। फील्ड एजेंट आपकी ज़मीन मैप करेगा, और आप जुड़ गए।", cta: "शुरू करें" },
  footer: { place: "चेन्नई, भारत", privacy: "गोपनीयता", agent: "फील्ड एजेंट लॉग इन" },
};

const ta: LandingCopy = {
  nav: { how: "எப்படி செயல்படுகிறது", services: "சேவைகள்", satellite: "செயற்கைக்கோள்", login: "உள்நுழை" },
  badge: "ஒவ்வொரு இந்திய பண்ணைக்கும் விவசாயம் + நிதி",
  title1: "ஒவ்வொரு பண்ணையும் வரைபடத்தில்.",
  title2: "ஒவ்வொரு விவசாயிக்கும் நிதி.",
  subtitle: "AyaOne GPS எல்லைகள் மற்றும் செயற்கைக்கோள் பயிர் ஆரோக்கியத்துடன் உங்கள் நிலத்தை டிஜிட்டலாக்கி, நியாயமான கடன், வீட்டுக்கே வரும் தரமான இடுபொருட்கள், கார்பன் வருமானத்திற்கு வழி திறக்கிறது — உங்கள் மொழியில்.",
  cta: "தொடங்குங்கள் — இலவசம்",
  ctaSecondary: "எப்படி செயல்படுகிறது",
  trust: ["தொலைபேசி மூலம் உள்நுழைவு", "6 இந்திய மொழிகள்", "தரவு இந்தியாவில்"],
  phone: { greeting: "வணக்கம், காலை வணக்கம்", farms: "கோபாலின் பண்ணைகள்", scan: "செயற்கைக்கோள் ஸ்கேன்", cover: "மர பரப்பு · NDVI 0.28", co2: "44 t CO₂ சேமிப்பு", tiles: ["ஃபார்ம்கேட்", "ஆலோசனை", "சந்தை"] },
  chips: { mappedTitle: "எல்லை வரையப்பட்டது", mappedBody: "முகவர் வருகை · முடிந்தது", ureaTitle: "யூரியா · 45 kg", ureaBody: "உங்கள் கிராமத்திற்கே டெலிவரி" },
  how: {
    label: "எப்படி செயல்படுகிறது",
    title: "உங்கள் தொலைபேசியிலிருந்து உங்கள் வயலுக்கு — நான்கு படிகளில்.",
    stepOf: "படி {n} / 4",
    steps: [
      { title: "தொலைபேசியில் பதிவு செய்யுங்கள்", body: "OTP மூலம் உள்நுழையுங்கள். பெயர், கிராமம், பின்கோடு — அவ்வளவுதான்.", headline: "காகித வேலை இல்லை. அலுவலகம் போக வேண்டாம்.", detail: "மொபைல் எண் மட்டும் போதும், உங்கள் மொழியில். மாவட்டமும் மாநிலமும் பின்கோடிலிருந்து தானாக நிரம்பும்." },
      { title: "முகவர் உங்கள் பண்ணையை வரைகிறார்", body: "வருகையை முன்பதிவு செய்யுங்கள். எங்கள் களமுகவர் GPS மூலம் எல்லையைப் பதிவு செய்வார்.", headline: "உங்கள் நிலத்திற்கான தெளிவான டிஜிட்டல் சான்று.", detail: "நிலத்தின் ஒவ்வொரு மூலையும் GPS ஆயத்தொலைவுகளாக, மண் மற்றும் பயிர் விவரங்களுடன் பதிவாகிறது." },
      { title: "செயற்கைக்கோள் பயிர் ஆரோக்கியம்", body: "Sentinel-2 படங்கள் பசுமை மதிப்பெண், மர பரப்பு, கார்பன் மதிப்பீடு தருகின்றன.", headline: "உங்கள் வயல், விண்வெளியிலிருந்து அளவிடப்பட்டது.", detail: "கடந்த 90 நாட்களின் தெளிவான படங்கள், மேகங்களை நீக்கி, பிக்ஸல் வாரியாக ஆய்வு செய்யப்படுகின்றன." },
      { title: "கடன், இடுபொருள், கார்பன்", body: "நியாயமான கடன், வீட்டுக்கே யூரியா, கார்பன்-கிரெடிட் திட்டங்கள்.", headline: "விவசாயிக்கு உதவும் தரவு.", detail: "வரையப்பட்ட, மதிப்பிடப்பட்ட பண்ணைக்கு சிறந்த கடன், நியாய விலை உரம், கார்பன் வருமானத்தில் பங்கு." },
    ],
  },
  services: {
    label: "ஒரே செயலி", title: "பண்ணைக்கு தேவையான அனைத்தும், ஒரே இடத்தில்.", intro: "விவசாயிகள் மற்றும் களமுகவர்களுடன், கிராமப்புற இந்தியாவுக்காக உருவாக்கப்பட்டது.",
    live: "இயக்கத்தில்", soon: "விரைவில்", pilot: "முன்னோட்டம்",
    items: [
      { title: "ஃபார்ம்கேட்", body: "GPS எல்லைகளுடன் ஒவ்வொரு நிலத்தையும் பதிவு செய்து, முகவர் வருகையை முன்பதிவு செய்யுங்கள்." },
      { title: "AI பயிர் ஆலோசனை", body: "என்ன பயிரிடுவது, எவ்வளவு உரம் — உங்கள் மண், பருவம், வானிலைக்கு ஏற்ப." },
      { title: "சந்தை", body: "யூரியா, விதைகள், இடுபொருட்கள் நியாய விலையில் உங்கள் கிராமத்திற்கே." },
      { title: "வாலெட் & கடன்", body: "பண்ணை தரவைக் கொண்டு கடன் தகுதியை சரிபாருங்கள், பணம் நேரடியாக வாலெட்டில்." },
      { title: "உங்கள் நிலத்தின் வானிலை", body: "உங்கள் பண்ணையின் சரியான இடத்திற்கான முன்னறிவிப்பு, மழை அல்லது வெப்பத்திற்கு முன் எச்சரிக்கை." },
      { title: "கார்பன் கிரெடிட்", body: "செயற்கைக்கோள் அளவிடும் நிலையான விவசாயம், புதிய வருமான ஆதாரமாகிறது." },
    ],
  },
  sat: {
    label: "செயற்கைக்கோள் பசுமை மதிப்பெண்", title: "உங்கள் பண்ணை, விண்வெளியிலிருந்து. மேகங்கள் இல்லாமல்.",
    body: "எல்லை வரையப்பட்டதும், AyaOne உங்கள் நிலத்தின் Sentinel-2 படங்களைப் படிக்கிறது — கடந்த 90 நாட்களின் தெளிவான படத்தைத் தேர்ந்து, மேக பிக்ஸல்களைத் தவிர்த்து — பயிர் ஆரோக்கியம், மர பரப்பு, கார்பனை அளவிட.",
    points: ["கடன் மற்றும் காப்பீட்டிற்கு நிலம், பயிர் சான்று", "உண்மையில் வளர்வதற்கு ஏற்ற உர ஆலோசனை", "பசுமை பண்ணைகளுக்கு கார்பன் வருமான வழி"],
    ndvi: "NDVI", cover: "மர பரப்பு",
  },
  final: { title: "நிலையான எதிர்காலத்தை வளர்ப்போம் — உங்கள் பண்ணையிலிருந்து.", body: "தொலைபேசி எண்ணுடன் பதிவு செய்யுங்கள். களமுகவர் நிலத்தை வரைவார், நீங்கள் இணைந்துவிட்டீர்கள்.", cta: "தொடங்குங்கள்" },
  footer: { place: "சென்னை, இந்தியா", privacy: "தனியுரிமை", agent: "களமுகவர் உள்நுழைவு" },
};

const te: LandingCopy = {
  nav: { how: "ఎలా పనిచేస్తుంది", services: "సేవలు", satellite: "ఉపగ్రహం", login: "లాగిన్" },
  badge: "ప్రతి భారతీయ పొలానికి వ్యవసాయం + ఫిన్‌టెక్",
  title1: "ప్రతి పొలం మ్యాప్‌లో.",
  title2: "ప్రతి రైతుకు ఆర్థిక సహాయం.",
  subtitle: "AyaOne GPS సరిహద్దులు, ఉపగ్రహ పంట ఆరోగ్యంతో మీ భూమిని డిజిటల్ చేసి, న్యాయమైన రుణం, ఇంటికే నాణ్యమైన ఇన్‌పుట్‌లు, కార్బన్ ఆదాయానికి దారి తెరుస్తుంది — మీ భాషలో.",
  cta: "ప్రారంభించండి — ఉచితం",
  ctaSecondary: "ఎలా పనిచేస్తుందో చూడండి",
  trust: ["ఫోన్‌తో లాగిన్", "6 భారతీయ భాషలు", "డేటా భారతదేశంలోనే"],
  phone: { greeting: "నమస్తే, శుభోదయం", farms: "గోపాల్ పొలాలు", scan: "ఉపగ్రహ స్కాన్", cover: "చెట్ల విస్తీర్ణం · NDVI 0.28", co2: "44 t CO₂ నిల్వ", tiles: ["ఫార్మ్‌గేట్", "సలహా", "మార్కెట్"] },
  chips: { mappedTitle: "సరిహద్దు మ్యాప్ అయింది", mappedBody: "ఏజెంట్ సందర్శన · పూర్తి", ureaTitle: "యూరియా · 45 kg", ureaBody: "మీ గ్రామానికే డెలివరీ" },
  how: {
    label: "ఎలా పనిచేస్తుంది",
    title: "మీ ఫోన్ నుండి మీ పొలం వరకు — నాలుగు దశల్లో.",
    stepOf: "దశ {n} / 4",
    steps: [
      { title: "ఫోన్‌తో నమోదు చేయండి", body: "OTP తో లాగిన్ అవ్వండి. పేరు, గ్రామం, పిన్‌కోడ్ — అంతే.", headline: "కాగితాలు లేవు. ఆఫీసుకు వెళ్లనక్కర్లేదు.", detail: "మొబైల్ నంబర్‌తో మీ భాషలో చేరండి. జిల్లా, రాష్ట్రం పిన్‌కోడ్ నుండి ఆటోమేటిక్‌గా నిండుతాయి." },
      { title: "ఏజెంట్ మీ పొలాన్ని మ్యాప్ చేస్తారు", body: "సందర్శన బుక్ చేయండి. మా ఫీల్డ్ ఏజెంట్ GPS తో సరిహద్దు నమోదు చేస్తారు.", headline: "మీ భూమికి స్పష్టమైన డిజిటల్ రుజువు.", detail: "పొలంలోని ప్రతి మూల GPS కోఆర్డినేట్లుగా, నేల మరియు పంట వివరాలతో నమోదవుతుంది." },
      { title: "ఉపగ్రహం పంట ఆరోగ్యం చూస్తుంది", body: "Sentinel-2 చిత్రాలు గ్రీన్ స్కోర్, చెట్ల విస్తీర్ణం, కార్బన్ అంచనా ఇస్తాయి.", headline: "మీ పొలం, అంతరిక్షం నుండి కొలవబడింది.", detail: "గత 90 రోజుల స్పష్టమైన చిత్రాలు, మేఘాలు తీసివేసి, పిక్సెల్ వారీగా విశ్లేషించబడతాయి." },
      { title: "రుణం, ఇన్‌పుట్‌లు, కార్బన్", body: "న్యాయమైన రుణాలు, ఇంటికే యూరియా, కార్బన్-క్రెడిట్ కార్యక్రమాలు.", headline: "రైతుకు ఉపయోగపడే డేటా.", detail: "మ్యాప్ చేసిన, స్కోర్ ఉన్న పొలానికి మెరుగైన రుణాలు, న్యాయ ధరకు ఎరువులు, కార్బన్ ఆదాయంలో వాటా." },
    ],
  },
  services: {
    label: "ఒకే యాప్", title: "పొలానికి కావలసినవన్నీ, ఒకే చోట.", intro: "రైతులు, ఫీల్డ్ ఏజెంట్లతో కలిసి, గ్రామీణ భారతదేశం కోసం నిర్మించబడింది.",
    live: "అందుబాటులో", soon: "త్వరలో", pilot: "పైలట్",
    items: [
      { title: "ఫార్మ్‌గేట్", body: "GPS సరిహద్దులతో ప్రతి పొలాన్ని నమోదు చేసి, ఏజెంట్ సందర్శనలు బుక్ చేయండి." },
      { title: "AI పంట సలహా", body: "ఏమి పండించాలి, ఎంత ఎరువు — మీ నేల, సీజన్, వాతావరణానికి తగినట్లు." },
      { title: "మార్కెట్", body: "యూరియా, విత్తనాలు, ఇన్‌పుట్‌లు న్యాయ ధరకు మీ గ్రామానికే." },
      { title: "వాలెట్ & రుణాలు", body: "పొలం డేటాతో రుణ అర్హత చూడండి, చెల్లింపులు నేరుగా వాలెట్‌లో." },
      { title: "మీ పొలం వాతావరణం", body: "మీ పొలం ఖచ్చితమైన స్థానానికి సూచన, వర్షం లేదా వేడికి ముందు హెచ్చరిక." },
      { title: "కార్బన్ క్రెడిట్స్", body: "ఉపగ్రహంతో కొలిచిన సుస్థిర వ్యవసాయం, కొత్త ఆదాయ వనరుగా మారుతుంది." },
    ],
  },
  sat: {
    label: "ఉపగ్రహ గ్రీన్ స్కోర్", title: "మీ పొలం, అంతరిక్షం నుండి. మేఘాలు లేకుండా.",
    body: "సరిహద్దు మ్యాప్ అయ్యాక, AyaOne మీ పొలానికి Sentinel-2 చిత్రాలను చదువుతుంది — గత 90 రోజుల స్పష్టమైన చిత్రాన్ని ఎంచుకుని, మేఘ పిక్సెల్‌లను వదిలి — పంట ఆరోగ్యం, చెట్ల విస్తీర్ణం, కార్బన్ కొలవడానికి.",
    points: ["రుణం, బీమాకు భూమి మరియు పంట రుజువు", "నిజంగా పెరుగుతున్న పంటకు తగిన ఎరువు సలహా", "పచ్చని పొలాలకు కార్బన్ ఆదాయ మార్గం"],
    ndvi: "NDVI", cover: "చెట్ల విస్తీర్ణం",
  },
  final: { title: "సుస్థిర భవిష్యత్తును పెంచండి — మీ పొలం నుండే.", body: "ఫోన్ నంబర్‌తో నమోదు చేయండి. ఫీల్డ్ ఏజెంట్ మీ భూమిని మ్యాప్ చేస్తారు, మీరు చేరిపోయారు.", cta: "ప్రారంభించండి" },
  footer: { place: "చెన్నై, భారతదేశం", privacy: "గోప్యత", agent: "ఫీల్డ్ ఏజెంట్ లాగిన్" },
};

const kn: LandingCopy = {
  nav: { how: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", services: "ಸೇವೆಗಳು", satellite: "ಉಪಗ್ರಹ", login: "ಲಾಗಿನ್" },
  badge: "ಪ್ರತಿ ಭಾರತೀಯ ಹೊಲಕ್ಕೆ ಕೃಷಿ + ಫಿನ್‌ಟೆಕ್",
  title1: "ಪ್ರತಿ ಹೊಲ ನಕ್ಷೆಯಲ್ಲಿ.",
  title2: "ಪ್ರತಿ ರೈತನಿಗೆ ಹಣಕಾಸು.",
  subtitle: "AyaOne GPS ಗಡಿಗಳು ಮತ್ತು ಉಪಗ್ರಹ ಬೆಳೆ ಆರೋಗ್ಯದಿಂದ ನಿಮ್ಮ ಭೂಮಿಯನ್ನು ಡಿಜಿಟಲ್ ಮಾಡಿ, ನ್ಯಾಯಯುತ ಸಾಲ, ಮನೆಬಾಗಿಲಿಗೆ ಗುಣಮಟ್ಟದ ಒಳಸುರಿ ಮತ್ತು ಕಾರ್ಬನ್ ಆದಾಯಕ್ಕೆ ದಾರಿ ತೆರೆಯುತ್ತದೆ — ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ.",
  cta: "ಪ್ರಾರಂಭಿಸಿ — ಉಚಿತ",
  ctaSecondary: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ನೋಡಿ",
  trust: ["ಫೋನ್ ಮೂಲಕ ಲಾಗಿನ್", "6 ಭಾರತೀಯ ಭಾಷೆಗಳು", "ಡೇಟಾ ಭಾರತದಲ್ಲೇ"],
  phone: { greeting: "ನಮಸ್ಕಾರ, ಶುಭೋದಯ", farms: "ಗೋಪಾಲ್ ಅವರ ಹೊಲಗಳು", scan: "ಉಪಗ್ರಹ ಸ್ಕ್ಯಾನ್", cover: "ಮರದ ಹೊದಿಕೆ · NDVI 0.28", co2: "44 t CO₂ ಸಂಗ್ರಹ", tiles: ["ಫಾರ್ಮ್‌ಗೇಟ್", "ಸಲಹೆ", "ಮಾರುಕಟ್ಟೆ"] },
  chips: { mappedTitle: "ಗಡಿ ನಕ್ಷೆ ಆಗಿದೆ", mappedBody: "ಏಜೆಂಟ್ ಭೇಟಿ · ಮುಗಿದಿದೆ", ureaTitle: "ಯೂರಿಯಾ · 45 kg", ureaBody: "ನಿಮ್ಮ ಹಳ್ಳಿಗೇ ಡೆಲಿವರಿ" },
  how: {
    label: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    title: "ನಿಮ್ಮ ಫೋನ್‌ನಿಂದ ನಿಮ್ಮ ಹೊಲದವರೆಗೆ — ನಾಲ್ಕು ಹಂತಗಳಲ್ಲಿ.",
    stepOf: "ಹಂತ {n} / 4",
    steps: [
      { title: "ಫೋನ್ ಮೂಲಕ ನೋಂದಾಯಿಸಿ", body: "OTP ಮೂಲಕ ಲಾಗಿನ್ ಆಗಿ. ಹೆಸರು, ಹಳ್ಳಿ, ಪಿನ್‌ಕೋಡ್ — ಅಷ್ಟೇ.", headline: "ಕಾಗದಪತ್ರ ಇಲ್ಲ. ಕಚೇರಿಗೆ ಹೋಗಬೇಕಿಲ್ಲ.", detail: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯಿಂದ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಸೇರಿ. ಜಿಲ್ಲೆ ಮತ್ತು ರಾಜ್ಯ ಪಿನ್‌ಕೋಡ್‌ನಿಂದ ತಾನಾಗಿಯೇ ತುಂಬುತ್ತವೆ." },
      { title: "ಏಜೆಂಟ್ ನಿಮ್ಮ ಹೊಲದ ನಕ್ಷೆ ಮಾಡುತ್ತಾರೆ", body: "ಭೇಟಿ ಬುಕ್ ಮಾಡಿ. ನಮ್ಮ ಫೀಲ್ಡ್ ಏಜೆಂಟ್ GPS ಮೂಲಕ ಗಡಿ ದಾಖಲಿಸುತ್ತಾರೆ.", headline: "ನಿಮ್ಮ ಭೂಮಿಗೆ ಸ್ಪಷ್ಟ ಡಿಜಿಟಲ್ ಪುರಾವೆ.", detail: "ಹೊಲದ ಪ್ರತಿ ಮೂಲೆಯೂ GPS ನಿರ್ದೇಶಾಂಕಗಳಾಗಿ, ಮಣ್ಣು ಮತ್ತು ಬೆಳೆ ವಿವರಗಳೊಂದಿಗೆ ದಾಖಲಾಗುತ್ತದೆ." },
      { title: "ಉಪಗ್ರಹ ಬೆಳೆ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ", body: "Sentinel-2 ಚಿತ್ರಗಳು ಗ್ರೀನ್ ಸ್ಕೋರ್, ಮರದ ಹೊದಿಕೆ, ಕಾರ್ಬನ್ ಅಂದಾಜು ನೀಡುತ್ತವೆ.", headline: "ನಿಮ್ಮ ಹೊಲ, ಬಾಹ್ಯಾಕಾಶದಿಂದ ಅಳೆಯಲಾಗಿದೆ.", detail: "ಕಳೆದ 90 ದಿನಗಳ ಸ್ಪಷ್ಟ ಚಿತ್ರಗಳನ್ನು, ಮೋಡಗಳನ್ನು ತೆಗೆದು, ಪಿಕ್ಸೆಲ್ ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತದೆ." },
      { title: "ಸಾಲ, ಒಳಸುರಿ ಮತ್ತು ಕಾರ್ಬನ್", body: "ನ್ಯಾಯಯುತ ಸಾಲ, ಮನೆಗೆ ಯೂರಿಯಾ, ಕಾರ್ಬನ್-ಕ್ರೆಡಿಟ್ ಕಾರ್ಯಕ್ರಮಗಳು.", headline: "ರೈತನಿಗೆ ಉಪಯೋಗವಾಗುವ ಡೇಟಾ.", detail: "ನಕ್ಷೆ ಮತ್ತು ಸ್ಕೋರ್ ಆದ ಹೊಲಕ್ಕೆ ಉತ್ತಮ ಸಾಲ, ನ್ಯಾಯ ಬೆಲೆಯ ಗೊಬ್ಬರ, ಕಾರ್ಬನ್ ಆದಾಯದಲ್ಲಿ ಪಾಲು." },
    ],
  },
  services: {
    label: "ಒಂದೇ ಆ್ಯಪ್", title: "ಹೊಲಕ್ಕೆ ಬೇಕಾದದ್ದೆಲ್ಲ, ಒಂದೇ ಕಡೆ.", intro: "ರೈತರು ಮತ್ತು ಫೀಲ್ಡ್ ಏಜೆಂಟ್‌ಗಳೊಂದಿಗೆ, ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
    live: "ಲಭ್ಯ", soon: "ಶೀಘ್ರದಲ್ಲೇ", pilot: "ಪೈಲಟ್",
    items: [
      { title: "ಫಾರ್ಮ್‌ಗೇಟ್", body: "GPS ಗಡಿಗಳೊಂದಿಗೆ ಪ್ರತಿ ಹೊಲ ನೋಂದಾಯಿಸಿ, ಏಜೆಂಟ್ ಭೇಟಿ ಬುಕ್ ಮಾಡಿ." },
      { title: "AI ಬೆಳೆ ಸಲಹೆ", body: "ಏನು ಬೆಳೆಯಬೇಕು, ಎಷ್ಟು ಗೊಬ್ಬರ — ನಿಮ್ಮ ಮಣ್ಣು, ಋತು, ಹವಾಮಾನಕ್ಕೆ ತಕ್ಕಂತೆ." },
      { title: "ಮಾರುಕಟ್ಟೆ", body: "ಯೂರಿಯಾ, ಬೀಜ, ಒಳಸುರಿ ನ್ಯಾಯ ಬೆಲೆಗೆ ನಿಮ್ಮ ಹಳ್ಳಿಗೇ." },
      { title: "ವಾಲೆಟ್ ಮತ್ತು ಸಾಲ", body: "ಹೊಲದ ಡೇಟಾದಿಂದ ಸಾಲ ಅರ್ಹತೆ ನೋಡಿ, ಪಾವತಿ ನೇರವಾಗಿ ವಾಲೆಟ್‌ಗೆ." },
      { title: "ನಿಮ್ಮ ಹೊಲದ ಹವಾಮಾನ", body: "ನಿಮ್ಮ ಹೊಲದ ನಿಖರ ಸ್ಥಳದ ಮುನ್ಸೂಚನೆ, ಮಳೆ ಅಥವಾ ಬಿಸಿಲಿಗೆ ಮುನ್ನ ಎಚ್ಚರಿಕೆ." },
      { title: "ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್", body: "ಉಪಗ್ರಹ ಅಳೆಯುವ ಸುಸ್ಥಿರ ಕೃಷಿ, ಹೊಸ ಆದಾಯದ ಮೂಲವಾಗುತ್ತದೆ." },
    ],
  },
  sat: {
    label: "ಉಪಗ್ರಹ ಗ್ರೀನ್ ಸ್ಕೋರ್", title: "ನಿಮ್ಮ ಹೊಲ, ಬಾಹ್ಯಾಕಾಶದಿಂದ. ಮೋಡಗಳಿಲ್ಲದೆ.",
    body: "ಗಡಿ ನಕ್ಷೆ ಆದ ನಂತರ, AyaOne ನಿಮ್ಮ ಹೊಲದ Sentinel-2 ಚಿತ್ರಗಳನ್ನು ಓದುತ್ತದೆ — ಕಳೆದ 90 ದಿನಗಳ ಸ್ಪಷ್ಟ ಚಿತ್ರ ಆರಿಸಿ, ಮೋಡದ ಪಿಕ್ಸೆಲ್‌ಗಳನ್ನು ಬಿಟ್ಟು — ಬೆಳೆ ಆರೋಗ್ಯ, ಮರದ ಹೊದಿಕೆ, ಕಾರ್ಬನ್ ಅಳೆಯಲು.",
    points: ["ಸಾಲ ಮತ್ತು ವಿಮೆಗೆ ಭೂಮಿ, ಬೆಳೆ ಪುರಾವೆ", "ನಿಜವಾಗಿ ಬೆಳೆಯುತ್ತಿರುವುದಕ್ಕೆ ತಕ್ಕ ಗೊಬ್ಬರ ಸಲಹೆ", "ಹಸಿರು ಹೊಲಗಳಿಗೆ ಕಾರ್ಬನ್ ಆದಾಯದ ದಾರಿ"],
    ndvi: "NDVI", cover: "ಮರದ ಹೊದಿಕೆ",
  },
  final: { title: "ಸುಸ್ಥಿರ ಭವಿಷ್ಯ ಬೆಳೆಸಿ — ನಿಮ್ಮ ಹೊಲದಿಂದಲೇ.", body: "ಫೋನ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ನೋಂದಾಯಿಸಿ. ಫೀಲ್ಡ್ ಏಜೆಂಟ್ ನಿಮ್ಮ ಭೂಮಿ ನಕ್ಷೆ ಮಾಡುತ್ತಾರೆ, ನೀವು ಸೇರಿದಿರಿ.", cta: "ಪ್ರಾರಂಭಿಸಿ" },
  footer: { place: "ಚೆನ್ನೈ, ಭಾರತ", privacy: "ಗೌಪ್ಯತೆ", agent: "ಫೀಲ್ಡ್ ಏಜೆಂಟ್ ಲಾಗಿನ್" },
};

const ml: LandingCopy = {
  nav: { how: "എങ്ങനെ പ്രവർത്തിക്കുന്നു", services: "സേവനങ്ങൾ", satellite: "ഉപഗ്രഹം", login: "ലോഗിൻ" },
  badge: "ഓരോ ഇന്ത്യൻ കൃഷിയിടത്തിനും കൃഷി + ഫിൻടെക്",
  title1: "ഓരോ കൃഷിയിടവും മാപ്പിൽ.",
  title2: "ഓരോ കർഷകനും സാമ്പത്തിക സഹായം.",
  subtitle: "AyaOne GPS അതിരുകളും ഉപഗ്രഹ വിള ആരോഗ്യവും ഉപയോഗിച്ച് നിങ്ങളുടെ ഭൂമി ഡിജിറ്റലാക്കി, ന്യായമായ വായ്പ, വീട്ടിലെത്തുന്ന ഗുണമേന്മയുള്ള ഇൻപുട്ടുകൾ, കാർബൺ വരുമാനം എന്നിവയ്ക്ക് വഴി തുറക്കുന്നു — നിങ്ങളുടെ ഭാഷയിൽ.",
  cta: "തുടങ്ങൂ — സൗജന്യം",
  ctaSecondary: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
  trust: ["ഫോൺ വഴി ലോഗിൻ", "6 ഇന്ത്യൻ ഭാഷകൾ", "ഡാറ്റ ഇന്ത്യയിൽ തന്നെ"],
  phone: { greeting: "നമസ്കാരം, സുപ്രഭാതം", farms: "ഗോപാലിന്റെ കൃഷിയിടങ്ങൾ", scan: "ഉപഗ്രഹ സ്കാൻ", cover: "മരാവരണം · NDVI 0.28", co2: "44 t CO₂ സംഭരണം", tiles: ["ഫാംഗേറ്റ്", "ഉപദേശം", "മാർക്കറ്റ്"] },
  chips: { mappedTitle: "അതിർത്തി മാപ്പ് ചെയ്തു", mappedBody: "ഏജന്റ് സന്ദർശനം · പൂർത്തിയായി", ureaTitle: "യൂറിയ · 45 kg", ureaBody: "നിങ്ങളുടെ ഗ്രാമത്തിലേക്ക് ഡെലിവറി" },
  how: {
    label: "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    title: "നിങ്ങളുടെ ഫോണിൽ നിന്ന് വയലിലേക്ക് — നാല് ഘട്ടങ്ങളിൽ.",
    stepOf: "ഘട്ടം {n} / 4",
    steps: [
      { title: "ഫോണിൽ രജിസ്റ്റർ ചെയ്യൂ", body: "OTP വഴി ലോഗിൻ ചെയ്യൂ. പേര്, ഗ്രാമം, പിൻകോഡ് — അത്രമാത്രം.", headline: "കടലാസ് പണിയില്ല. ഓഫീസിൽ പോകേണ്ട.", detail: "മൊബൈൽ നമ്പർ മാത്രം മതി, നിങ്ങളുടെ ഭാഷയിൽ. ജില്ലയും സംസ്ഥാനവും പിൻകോഡിൽ നിന്ന് സ്വയം നിറയും." },
      { title: "ഏജന്റ് കൃഷിയിടം മാപ്പ് ചെയ്യുന്നു", body: "സന്ദർശനം ബുക്ക് ചെയ്യൂ. ഫീൽഡ് ഏജന്റ് GPS ഉപയോഗിച്ച് അതിർത്തി രേഖപ്പെടുത്തും.", headline: "നിങ്ങളുടെ ഭൂമിക്ക് വ്യക്തമായ ഡിജിറ്റൽ തെളിവ്.", detail: "കൃഷിയിടത്തിന്റെ ഓരോ മൂലയും GPS കോർഡിനേറ്റുകളായി, മണ്ണ്, വിള വിവരങ്ങളോടെ രേഖപ്പെടുത്തുന്നു." },
      { title: "ഉപഗ്രഹം വിള ആരോഗ്യം പരിശോധിക്കുന്നു", body: "Sentinel-2 ചിത്രങ്ങൾ ഗ്രീൻ സ്കോർ, മരാവരണം, കാർബൺ കണക്ക് നൽകുന്നു.", headline: "നിങ്ങളുടെ വയൽ, ബഹിരാകാശത്ത് നിന്ന് അളന്നത്.", detail: "കഴിഞ്ഞ 90 ദിവസത്തെ വ്യക്തമായ ചിത്രങ്ങൾ, മേഘങ്ങൾ ഒഴിവാക്കി, പിക്സൽ തോറും വിശകലനം ചെയ്യുന്നു." },
      { title: "വായ്പ, ഇൻപുട്ട്, കാർബൺ", body: "ന്യായമായ വായ്പ, വീട്ടിലേക്ക് യൂറിയ, കാർബൺ-ക്രെഡിറ്റ് പദ്ധതികൾ.", headline: "കർഷകന് ഉപകരിക്കുന്ന ഡാറ്റ.", detail: "മാപ്പ് ചെയ്ത, സ്കോർ ഉള്ള കൃഷിയിടത്തിന് മികച്ച വായ്പ, ന്യായവിലയ്ക്ക് വളം, കാർബൺ വരുമാനത്തിൽ പങ്ക്." },
    ],
  },
  services: {
    label: "ഒരേ ആപ്പ്", title: "കൃഷിയിടത്തിന് വേണ്ടതെല്ലാം, ഒരിടത്ത്.", intro: "കർഷകരോടും ഫീൽഡ് ഏജന്റുമാരോടും ചേർന്ന്, ഗ്രാമീണ ഇന്ത്യയ്ക്കായി നിർമ്മിച്ചത്.",
    live: "ലഭ്യം", soon: "ഉടൻ വരുന്നു", pilot: "പൈലറ്റ്",
    items: [
      { title: "ഫാംഗേറ്റ്", body: "GPS അതിരുകളോടെ ഓരോ കൃഷിയിടവും രജിസ്റ്റർ ചെയ്ത്, ഏജന്റ് സന്ദർശനം ബുക്ക് ചെയ്യൂ." },
      { title: "AI വിള ഉപദേശം", body: "എന്ത് കൃഷി ചെയ്യണം, എത്ര വളം — നിങ്ങളുടെ മണ്ണ്, സീസൺ, കാലാവസ്ഥ അനുസരിച്ച്." },
      { title: "മാർക്കറ്റ്", body: "യൂറിയ, വിത്ത്, ഇൻപുട്ടുകൾ ന്യായവിലയ്ക്ക് നിങ്ങളുടെ ഗ്രാമത്തിലേക്ക്." },
      { title: "വാലറ്റ് & വായ്പ", body: "കൃഷിയിട ഡാറ്റ ഉപയോഗിച്ച് വായ്പാ യോഗ്യത നോക്കൂ, പണം നേരിട്ട് വാലറ്റിലേക്ക്." },
      { title: "നിങ്ങളുടെ കൃഷിയിടത്തിലെ കാലാവസ്ഥ", body: "കൃത്യമായ സ്ഥലത്തിനുള്ള പ്രവചനം, മഴയ്ക്കോ ചൂടിനോ മുമ്പ് മുന്നറിയിപ്പ്." },
      { title: "കാർബൺ ക്രെഡിറ്റ്", body: "ഉപഗ്രഹം അളക്കുന്ന സുസ്ഥിര കൃഷി, പുതിയ വരുമാന സ്രോതസ്സാകുന്നു." },
    ],
  },
  sat: {
    label: "ഉപഗ്രഹ ഗ്രീൻ സ്കോർ", title: "നിങ്ങളുടെ കൃഷിയിടം, ബഹിരാകാശത്ത് നിന്ന്. മേഘങ്ങളില്ലാതെ.",
    body: "അതിർത്തി മാപ്പ് ചെയ്താൽ, AyaOne നിങ്ങളുടെ കൃഷിയിടത്തിന്റെ Sentinel-2 ചിത്രങ്ങൾ വായിക്കുന്നു — കഴിഞ്ഞ 90 ദിവസത്തെ ഏറ്റവും വ്യക്തമായത് തിരഞ്ഞെടുത്ത്, മേഘ പിക്സലുകൾ ഒഴിവാക്കി — വിള ആരോഗ്യം, മരാവരണം, കാർബൺ എന്നിവ അളക്കാൻ.",
    points: ["വായ്പയ്ക്കും ഇൻഷുറൻസിനും ഭൂമി, വിള തെളിവ്", "യഥാർത്ഥത്തിൽ വളരുന്നതിന് അനുസരിച്ച വള ഉപദേശം", "പച്ചയായ കൃഷിയിടങ്ങൾക്ക് കാർബൺ വരുമാന വഴി"],
    ndvi: "NDVI", cover: "മരാവരണം",
  },
  final: { title: "സുസ്ഥിര ഭാവി വളർത്താം — നിങ്ങളുടെ കൃഷിയിടത്തിൽ നിന്ന്.", body: "ഫോൺ നമ്പറിൽ രജിസ്റ്റർ ചെയ്യൂ. ഫീൽഡ് ഏജന്റ് ഭൂമി മാപ്പ് ചെയ്യും, നിങ്ങൾ ചേർന്നു.", cta: "തുടങ്ങൂ" },
  footer: { place: "ചെന്നൈ, ഇന്ത്യ", privacy: "സ്വകാര്യത", agent: "ഫീൽഡ് ഏജന്റ് ലോഗിൻ" },
};

export const landingCopy: Record<Locale, LandingCopy> = { en, hi, ta, te, kn, ml };
