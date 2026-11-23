import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "hi" | "kn";

export const translations = {
  en: {
    home: "Home", how: "How It Works", classification: "Classification", upload: "Upload",
    faq: "FAQ", contact: "Contact", signIn: "Sign in", openPlatform: "Open Platform",
    powered: "Powered by Machine Learning", detect: "Detect & Classify", weeds: "Weeds Instantly",
    heroDescription: "AI-powered weed detection for precision agriculture. Upload an image and get instant classification results using deep learning models.",
    uploadImage: "Upload Image", learnMore: "Learn More", process: "Process",
  },
  hi: {
    home: "होम", how: "यह कैसे काम करता है", classification: "वर्गीकरण", upload: "अपलोड",
    faq: "सामान्य प्रश्न", contact: "संपर्क", signIn: "साइन इन", openPlatform: "प्लेटफ़ॉर्म खोलें",
    powered: "मशीन लर्निंग द्वारा संचालित", detect: "तुरंत पहचानें और वर्गीकृत करें", weeds: "खरपतवार",
    heroDescription: "सटीक कृषि के लिए AI-संचालित खरपतवार पहचान। फोटो अपलोड करें और डीप लर्निंग से तुरंत नतीजे पाएं।",
    uploadImage: "फोटो अपलोड करें", learnMore: "और जानें", process: "प्रक्रिया",
  },
  kn: {
    home: "ಮುಖಪುಟ", how: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", classification: "ವರ್ಗೀಕರಣ", upload: "ಅಪ್ಲೋಡ್",
    faq: "ಪ್ರಶ್ನೋತ್ತರ", contact: "ಸಂಪರ್ಕ", signIn: "ಸೈನ್ ಇನ್", openPlatform: "ವೇದಿಕೆಯನ್ನು ತೆರೆಯಿರಿ",
    powered: "ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಮೂಲಕ ನಡೆಸಲ್ಪಡುತ್ತಿದೆ", detect: "ತ್ವರಿತವಾಗಿ ಪತ್ತೆ ಮಾಡಿ ಮತ್ತು ವರ್ಗೀಕರಿಸಿ", weeds: "ಕಳೆಗಳು",
    heroDescription: "ನಿಖರ ಕೃಷಿಗಾಗಿ AI ಆಧಾರಿತ ಕಳೆ ಪತ್ತೆ. ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಡೀಪ್ ಲರ್ನಿಂಗ್ ಮೂಲಕ ತ್ವರಿತ ಫಲಿತಾಂಶ ಪಡೆಯಿರಿ.",
    uploadImage: "ಚಿತ್ರ ಅಪ್ಲೋಡ್", learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ", process: "ಪ್ರಕ್ರಿಯೆ",
  },
} as const;

export const landingTranslations = {
  en: {
    how: {
      label: "Process",
      title: "How It Works",
      description: "Our machine learning pipeline processes images in real time for accurate weed identification.",
      steps: [
        ["Upload Image", "Take or upload a photo of a weed from your field or garden."],
        ["ML Processing", "Our CNN model analyzes texture, shape, and color."],
        ["Classification", "The model identifies the weed species and confidence score."],
        ["Get Results", "See the identification, risk level, and treatment guidance."],
      ],
    },
    stats: ["Classification Accuracy", "Weed Species", "Processing Time", "Images Processed"],
    gallery: {
      label: "Database",
      title: "Weed Classification",
      description: "Our model can identify and classify these weed species.",
      risk: { Low: "Low Risk", Medium: "Medium Risk", High: "High Risk" },
      weeds: [
        ["Dandelion", "Common perennial weed with yellow flowers and deep taproots."],
        ["Crabgrass", "Fast-spreading annual grass that thrives in warm weather."],
        ["Chickweed", "Low-growing annual with small white flowers, common in cool weather."],
        ["Purslane", "Succulent annual that thrives in hot, dry conditions."],
        ["Thistle", "Spiny perennial weed with deep roots that spreads aggressively."],
        ["Bindweed", "Twining perennial vine that is difficult to control."],
      ],
    },
    upload: {
      label: "Try It",
      title: "Upload & Detect",
      description: "Upload a weed image and our AI model will classify it.",
      drop: "Drop your image here",
      browse: "or click to browse — PNG, JPG up to 10 MB",
      analyzing: "Analyzing with AI...",
      classify: "Classify Weed",
      results: "Classification Results",
      treatment: "Treatment:",
      saved: "Saved",
      save: "Save to History",
      signInToSave: "Sign in to save",
      another: "Classify Another",
      saveSuccess: "Saved to your history",
      tooLarge: "Image must be under 10 MB",
      rateLimit: "Rate limit reached. Try again in a moment.",
      credits: "AI credits exhausted. Add funds in workspace settings.",
    },
    about: {
      label: "Technology",
      title: "About the Project",
      description: "Weed Vision AI combines machine learning with web technologies to help farmers and researchers identify invasive weeds quickly and accurately.",
      features: [
        ["Deep Learning", "Convolutional neural networks trained on labeled weed images."],
        ["Database", "Stores classification history, uploads, and model metadata."],
        ["Available Anywhere", "Responsive experience for desktop, tablet, and mobile."],
        ["AI Powered", "Machine learning helps identify weed species from images."],
      ],
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        ["How accurate is Weed Vision AI?", "Accuracy depends on image quality, lighting, and plant maturity. The model provides likely matches and confidence scores."],
        ["What image formats are supported?", "PNG, JPG, and WebP up to 10 MB. For best results, take a sharp close-up of one plant."],
        ["Is my uploaded data stored?", "Images are sent to the AI service for classification. Sign in to save results to your history."],
        ["Can I use this for commercial farms?", "Yes. The platform is designed for farms of different sizes. Contact us about integrations."],
        ["Which weeds does the model recognise?", "The gallery shows examples including dandelion, crabgrass, chickweed, purslane, thistle, and bindweed."],
      ],
    },
    contact: {
      label: "Get In Touch",
      title: "Talk to Our Team",
      description: "Questions about using the platform or working with us? Send a message.",
      name: "Name",
      email: "Email",
      message: "Message",
      sending: "Sending...",
      send: "Send Message",
      sent: "Message sent! We'll get back to you soon.",
    },
    footer: { home: "Home", how: "How It Works", classification: "Classification", upload: "Upload", tagline: "Machine Learning for Precision Agriculture" },
  },
  hi: {
    how: {
      label: "प्रक्रिया",
      title: "यह कैसे काम करता है",
      description: "हमारी मशीन लर्निंग प्रणाली खरपतवारों की सटीक पहचान के लिए तस्वीरों का विश्लेषण करती है।",
      steps: [
        ["तस्वीर अपलोड करें", "अपने खेत या बगीचे के खरपतवार की तस्वीर लें या अपलोड करें।"],
        ["AI विश्लेषण", "मॉडल पत्तियों की बनावट, आकार और रंग का विश्लेषण करता है।"],
        ["वर्गीकरण", "मॉडल खरपतवार की प्रजाति और विश्वास स्कोर बताता है।"],
        ["परिणाम पाएं", "पहचान, जोखिम स्तर और उपचार सुझाव देखें।"],
      ],
    },
    stats: ["वर्गीकरण की सटीकता", "खरपतवार प्रजातियां", "प्रसंस्करण समय", "विश्लेषित तस्वीरें"],
    gallery: {
      label: "डेटाबेस",
      title: "खरपतवार वर्गीकरण",
      description: "हमारा मॉडल इन खरपतवार प्रजातियों की पहचान और वर्गीकरण कर सकता है।",
      risk: { Low: "कम जोखिम", Medium: "मध्यम जोखिम", High: "उच्च जोखिम" },
      weeds: [
        ["डैंडेलियन", "पीले फूलों और गहरी जड़ों वाला आम बारहमासी खरपतवार।"],
        ["क्रैबग्रास", "गर्म मौसम में तेजी से फैलने वाली घास।"],
        ["चिकवीड", "छोटे सफेद फूलों वाला कम ऊंचाई का वार्षिक पौधा।"],
        ["पर्सलेन", "गर्मी और सूखे में पनपने वाला रसीला वार्षिक पौधा।"],
        ["थिसल", "कांटेदार पत्तियों और गहरी जड़ों वाला फैलने वाला खरपतवार।"],
        ["बाइंडवीड", "लिपटने वाली बारहमासी बेल जिसे नियंत्रित करना कठिन है।"],
      ],
    },
    upload: {
      label: "आजमाएं",
      title: "अपलोड करें और पहचानें",
      description: "खरपतवार की तस्वीर अपलोड करें और हमारा AI मॉडल उसे वर्गीकृत करेगा।",
      drop: "अपनी तस्वीर यहां छोड़ें",
      browse: "या चुनने के लिए क्लिक करें — PNG, JPG, अधिकतम 10 MB",
      analyzing: "AI विश्लेषण कर रहा है...",
      classify: "खरपतवार पहचानें",
      results: "वर्गीकरण परिणाम",
      treatment: "उपचार:",
      saved: "सहेजा गया",
      save: "इतिहास में सहेजें",
      signInToSave: "सहेजने के लिए साइन इन करें",
      another: "दूसरी तस्वीर पहचानें",
      saveSuccess: "आपके इतिहास में सहेजा गया",
      tooLarge: "तस्वीर 10 MB से छोटी होनी चाहिए",
      rateLimit: "सीमा पूरी हो गई। थोड़ी देर बाद फिर प्रयास करें।",
      credits: "AI क्रेडिट समाप्त हो गए हैं।",
    },
    about: {
      label: "तकनीक",
      title: "परियोजना के बारे में",
      description: "Weed Vision AI किसानों और शोधकर्ताओं को तेजी से खरपतवार पहचानने में मदद करने के लिए मशीन लर्निंग और वेब तकनीक का उपयोग करता है।",
      features: [
        ["डीप लर्निंग", "लेबल की गई खरपतवार तस्वीरों से प्रशिक्षित मॉडल।"],
        ["डेटाबेस", "पहचान इतिहास, अपलोड और मॉडल की जानकारी सहेजता है।"],
        ["हर डिवाइस पर उपलब्ध", "डेस्कटॉप, टैबलेट और मोबाइल के लिए अनुकूल।"],
        ["AI संचालित", "तस्वीरों से खरपतवार प्रजातियों की पहचान में मदद।"],
      ],
    },
    faq: {
      label: "सामान्य प्रश्न",
      title: "अक्सर पूछे जाने वाले प्रश्न",
      items: [
        ["Weed Vision AI कितना सटीक है?", "सटीकता तस्वीर, रोशनी और पौधे की उम्र पर निर्भर करती है। मॉडल संभावित पहचान और विश्वास स्कोर देता है।"],
        ["कौन से तस्वीर प्रारूप समर्थित हैं?", "10 MB तक PNG, JPG और WebP। बेहतर नतीजों के लिए एक पौधे की साफ नजदीकी तस्वीर लें।"],
        ["क्या मेरी तस्वीरें सहेजी जाती हैं?", "तस्वीरें पहचान के लिए AI सेवा को भेजी जाती हैं। परिणाम इतिहास में सहेजने के लिए साइन इन करें।"],
        ["क्या इसे व्यावसायिक खेतों में उपयोग कर सकते हैं?", "हां, यह अलग-अलग आकार के खेतों के लिए बनाया गया है। एकीकरण के लिए हमसे संपर्क करें।"],
        ["मॉडल किन खरपतवारों को पहचानता है?", "गैलरी में डैंडेलियन, क्रैबग्रास, चिकवीड, पर्सलेन, थिसल और बाइंडवीड के उदाहरण हैं।"],
      ],
    },
    contact: {
      label: "संपर्क करें",
      title: "हमारी टीम से बात करें",
      description: "प्लेटफ़ॉर्म या सहयोग के बारे में सवाल हैं? हमें संदेश भेजें।",
      name: "नाम",
      email: "ईमेल",
      message: "संदेश",
      sending: "भेज रहे हैं...",
      send: "संदेश भेजें",
      sent: "संदेश भेज दिया गया है। हम जल्द जवाब देंगे।",
    },
    footer: { home: "होम", how: "यह कैसे काम करता है", classification: "वर्गीकरण", upload: "अपलोड", tagline: "सटीक कृषि के लिए मशीन लर्निंग" },
  },
  kn: {
    how: {
      label: "ಪ್ರಕ್ರಿಯೆ",
      title: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
      description: "ಕಳೆಗಳನ್ನು ನಿಖರವಾಗಿ ಗುರುತಿಸಲು ನಮ್ಮ ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ವ್ಯವಸ್ಥೆ ಚಿತ್ರಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.",
      steps: [
        ["ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ", "ನಿಮ್ಮ ಹೊಲ ಅಥವಾ ತೋಟದ ಕಳೆಯ ಚಿತ್ರವನ್ನು ತೆಗೆದು ಅಪ್ಲೋಡ್ ಮಾಡಿ."],
        ["AI ವಿಶ್ಲೇಷಣೆ", "ಮಾದರಿಯು ಎಲೆಗಳ ವಿನ್ಯಾಸ, ಆಕಾರ ಮತ್ತು ಬಣ್ಣವನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ."],
        ["ವರ್ಗೀಕರಣ", "ಕಳೆಯ ಜಾತಿ ಮತ್ತು ವಿಶ್ವಾಸದ ಮಟ್ಟವನ್ನು ಮಾದರಿ ತಿಳಿಸುತ್ತದೆ."],
        ["ಫಲಿತಾಂಶ ಪಡೆಯಿರಿ", "ಗುರುತು, ಅಪಾಯದ ಮಟ್ಟ ಮತ್ತು ಚಿಕಿತ್ಸೆಯ ಸಲಹೆಗಳನ್ನು ನೋಡಿ."],
      ],
    },
    stats: ["ವರ್ಗೀಕರಣದ ನಿಖರತೆ", "ಕಳೆಗಳ ಜಾತಿಗಳು", "ವಿಶ್ಲೇಷಣೆಯ ಸಮಯ", "ವಿಶ್ಲೇಷಿಸಿದ ಚಿತ್ರಗಳು"],
    gallery: {
      label: "ದತ್ತಸಂಚಯ",
      title: "ಕಳೆಗಳ ವರ್ಗೀಕರಣ",
      description: "ಈ ಕಳೆಗಳ ಜಾತಿಗಳನ್ನು ನಮ್ಮ ಮಾದರಿ ಗುರುತಿಸಿ ವರ್ಗೀಕರಿಸುತ್ತದೆ.",
      risk: { Low: "ಕಡಿಮೆ ಅಪಾಯ", Medium: "ಮಧ್ಯಮ ಅಪಾಯ", High: "ಹೆಚ್ಚಿನ ಅಪಾಯ" },
      weeds: [
        ["ಡ್ಯಾಂಡೆಲಿಯನ್", "ಹಳದಿ ಹೂವು ಮತ್ತು ಆಳವಾದ ಬೇರುಗಳಿರುವ ಸಾಮಾನ್ಯ ಬಹುವಾರ್ಷಿಕ ಕಳೆ."],
        ["ಕ್ರ್ಯಾಬ್‌ಗ್ರಾಸ್", "ಬಿಸಿ ವಾತಾವರಣದಲ್ಲಿ ವೇಗವಾಗಿ ಹರಡುವ ವಾರ್ಷಿಕ ಹುಲ್ಲು."],
        ["ಚಿಕ್‌ವೀಡ್", "ತಂಪಾದ ಹವೆಯಲ್ಲಿ ಕಾಣುವ ಸಣ್ಣ ಬಿಳಿ ಹೂವುಗಳಿರುವ ಕಳೆ."],
        ["ಪರ್ಸ್ಲೇನ್", "ಬಿಸಿ ಮತ್ತು ಒಣ ವಾತಾವರಣದಲ್ಲಿ ಬೆಳೆಯುವ ರಸಭರಿತ ಸಸ್ಯ."],
        ["ಥಿಸಲ್", "ಮುಳ್ಳಿನ ಎಲೆಗಳು ಮತ್ತು ಆಳವಾದ ಬೇರುಗಳಿರುವ ಆಕ್ರಮಣಕಾರಿ ಕಳೆ."],
        ["ಬೈಂಡ್‌ವೀಡ್", "ನಿಯಂತ್ರಿಸಲು ಕಷ್ಟವಾದ ಸುತ್ತಿಕೊಂಡು ಬೆಳೆಯುವ ಬಹುವಾರ್ಷಿಕ ಬಳ್ಳಿ."],
      ],
    },
    upload: {
      label: "ಪ್ರಯತ್ನಿಸಿ",
      title: "ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಪತ್ತೆಹಚ್ಚಿ",
      description: "ಕಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ; ನಮ್ಮ AI ಮಾದರಿ ಅದನ್ನು ವರ್ಗೀಕರಿಸುತ್ತದೆ.",
      drop: "ನಿಮ್ಮ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಬಿಡಿ",
      browse: "ಅಥವಾ ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ — PNG, JPG, ಗರಿಷ್ಠ 10 MB",
      analyzing: "AI ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...",
      classify: "ಕಳೆಯನ್ನು ವರ್ಗೀಕರಿಸಿ",
      results: "ವರ್ಗೀಕರಣದ ಫಲಿತಾಂಶಗಳು",
      treatment: "ಚಿಕಿತ್ಸೆ:",
      saved: "ಉಳಿಸಲಾಗಿದೆ",
      save: "ಇತಿಹಾಸಕ್ಕೆ ಉಳಿಸಿ",
      signInToSave: "ಉಳಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
      another: "ಮತ್ತೊಂದು ಕಳೆಯನ್ನು ವರ್ಗೀಕರಿಸಿ",
      saveSuccess: "ನಿಮ್ಮ ಇತಿಹಾಸಕ್ಕೆ ಉಳಿಸಲಾಗಿದೆ",
      tooLarge: "ಚಿತ್ರವು 10 MB ಗಿಂತ ಚಿಕ್ಕದಾಗಿರಬೇಕು",
      rateLimit: "ಮಿತಿ ತಲುಪಿದೆ. ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      credits: "AI ಕ್ರೆಡಿಟ್‌ಗಳು ಮುಗಿದಿವೆ.",
    },
    about: {
      label: "ತಂತ್ರಜ್ಞಾನ",
      title: "ಯೋಜನೆಯ ಬಗ್ಗೆ",
      description: "ರೈತರು ಮತ್ತು ಸಂಶೋಧಕರು ಆಕ್ರಮಣಕಾರಿ ಕಳೆಗಳನ್ನು ತ್ವರಿತವಾಗಿ ಗುರುತಿಸಲು Weed Vision AI ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಮತ್ತು ವೆಬ್ ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸುತ್ತದೆ.",
      features: [
        ["ಡೀಪ್ ಲರ್ನಿಂಗ್", "ಲೇಬಲ್ ಮಾಡಿದ ಕಳೆ ಚಿತ್ರಗಳಿಂದ ತರಬೇತಿ ಪಡೆದ ಮಾದರಿ."],
        ["ದತ್ತಸಂಚಯ", "ವರ್ಗೀಕರಣದ ಇತಿಹಾಸ, ಅಪ್ಲೋಡ್‌ಗಳು ಮತ್ತು ಮಾದರಿಯ ಮಾಹಿತಿಯನ್ನು ಉಳಿಸುತ್ತದೆ."],
        ["ಎಲ್ಲ ಸಾಧನಗಳಲ್ಲೂ ಲಭ್ಯ", "ಡೆಸ್ಕ್‌ಟಾಪ್, ಟ್ಯಾಬ್ಲೆಟ್ ಮತ್ತು ಮೊಬೈಲ್‌ನಲ್ಲಿ ಬಳಸಬಹುದು."],
        ["AI ಆಧಾರಿತ", "ಚಿತ್ರಗಳಿಂದ ಕಳೆಗಳ ಜಾತಿಗಳನ್ನು ಗುರುತಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ."],
      ],
    },
    faq: {
      label: "ಪ್ರಶ್ನೋತ್ತರ",
      title: "ಪದೇಪದೇ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು",
      items: [
        ["Weed Vision AI ಎಷ್ಟು ನಿಖರವಾಗಿದೆ?", "ಚಿತ್ರದ ಗುಣಮಟ್ಟ, ಬೆಳಕು ಮತ್ತು ಸಸ್ಯದ ಬೆಳವಣಿಗೆಯ ಹಂತದ ಮೇಲೆ ನಿಖರತೆ ಅವಲಂಬಿತವಾಗಿದೆ. ಮಾದರಿ ಸಂಭವನೀಯ ಗುರುತು ಮತ್ತು ವಿಶ್ವಾಸದ ಮಟ್ಟವನ್ನು ನೀಡುತ್ತದೆ."],
        ["ಯಾವ ಚಿತ್ರ ರೂಪಗಳನ್ನು ಬಳಸಬಹುದು?", "10 MB ವರೆಗೆ PNG, JPG ಮತ್ತು WebP. ಉತ್ತಮ ಫಲಿತಾಂಶಕ್ಕಾಗಿ ಒಂದು ಸಸ್ಯದ ಸ್ಪಷ್ಟ ಹತ್ತಿರದ ಚಿತ್ರ ತೆಗೆದುಕೊಳ್ಳಿ."],
        ["ನನ್ನ ಚಿತ್ರಗಳನ್ನು ಉಳಿಸಲಾಗುತ್ತದೆಯೇ?", "ವರ್ಗೀಕರಣಕ್ಕಾಗಿ ಚಿತ್ರಗಳನ್ನು AI ಸೇವೆಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ಫಲಿತಾಂಶಗಳನ್ನು ಇತಿಹಾಸದಲ್ಲಿ ಉಳಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ."],
        ["ವಾಣಿಜ್ಯ ಕೃಷಿಗೆ ಬಳಸಬಹುದೇ?", "ಹೌದು. ವಿವಿಧ ಗಾತ್ರದ ಕೃಷಿ ಭೂಮಿಗಳಿಗೆ ಈ ವೇದಿಕೆ ಸೂಕ್ತವಾಗಿದೆ. ಸಂಪರ್ಕಕ್ಕಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ."],
        ["ಮಾದರಿ ಯಾವ ಕಳೆಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ?", "ಗ್ಯಾಲರಿಯಲ್ಲಿ ಡ್ಯಾಂಡೆಲಿಯನ್, ಕ್ರ್ಯಾಬ್‌ಗ್ರಾಸ್, ಚಿಕ್‌ವೀಡ್, ಪರ್ಸ್ಲೇನ್, ಥಿಸಲ್ ಮತ್ತು ಬೈಂಡ್‌ವೀಡ್ ಉದಾಹರಣೆಗಳಿವೆ."],
      ],
    },
    contact: {
      label: "ಸಂಪರ್ಕಿಸಿ",
      title: "ನಮ್ಮ ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ",
      description: "ವೇದಿಕೆಯ ಬಳಕೆ ಅಥವಾ ಸಹಯೋಗದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ.",
      name: "ಹೆಸರು",
      email: "ಇಮೇಲ್",
      message: "ಸಂದೇಶ",
      sending: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
      send: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
      sent: "ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ. ಶೀಘ್ರದಲ್ಲೇ ಉತ್ತರಿಸುತ್ತೇವೆ.",
    },
    footer: { home: "ಮುಖಪುಟ", how: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", classification: "ವರ್ಗೀಕರಣ", upload: "ಅಪ್ಲೋಡ್", tagline: "ನಿಖರ ಕೃಷಿಗಾಗಿ ಮೆಷಿನ್ ಲರ್ನಿಂಗ್" },
  },
} as const;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return stored === "hi" || stored === "kn" ? stored : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (nextLanguage: Language) => setLanguageState(nextLanguage);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
