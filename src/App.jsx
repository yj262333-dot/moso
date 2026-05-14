import React, { useState, useEffect } from 'react';

const MockTestPlatform = () => {
  const questions = [
    {
      id: 1,
      question: "'Interchangeability' प्राप्त करने के लिए मास प्रोडक्शन में किस शब्दावली का उपयोग किया जाता है?",
      options: ["विचलन (Deviation)", "टॉलरेंस (Tolerance)", "लिमिट्स (Limits)", "अलाउंस (Allowance)"],
      answer: "टॉलरेंस (Tolerance)",
    },
    {
      id: 2,
      question: "यदि किसी होल का साइज 25.000-0.000+0.021 mm है और शाफ्ट का साइज 25.000+0.022+0.035 mm है, तो यह किस प्रकार का 'Fit' होगा?",
      options: ["क्लीयरेंस फिट", "ट्रांजिशन फिट", "इंटरफेरेंस फिट", "लूज फिट"],
      answer: "इंटरफेरेंस फिट",
    },
    {
      id: 3,
      question: "वर्नियर माइक्रोमीटर का अल्पतमांक (Least Count) क्या होता है?",
      options: ["0.01 mm", "0.02 mm", "0.001 mm", "0.002 mm"],
      answer: "0.001 mm",
    },
    {
      id: 4,
      question: "डायल टेस्ट इंडिकेटर (DTI) के 'प्लंजर' की लीनियर गति को पॉइंटर की रोटरी गति में बदलने के लिए किस मैकेनिज्म का उपयोग होता है?",
      options: ["क्विक रिटर्न मैकेनिज्म", "रैक और पिनियन", "वर्म और व्हील", "बेवल गियर"],
      answer: "रैक और पिनियन",
    },
    {
      id: 5,
      question: "किस 'जिग' (Jig) में बेस प्लेट नहीं होती और इसे सीधे वर्कपीस पर सेट किया जाता है?",
      options: ["प्लेट जिग", "चैनल जिग", "बॉक्स जिग", "पोस्ट जिग"],
      answer: "प्लेट जिग",
    },
    {
      id: 6,
      question: "जिग में 'रिन्यूएबल बुश' (Renewable Bush) का उपयोग कब किया जाता है?",
      options: ["जब एक ही होल में एक से अधिक ऑपरेशन करने हों", "जब जिग को हल्का बनाना हो", "जब वर्कपीस बहुत कठोर हो", "ड्रिल को गाइड करने की जरूरत न हो"],
      answer: "जब एक ही होल में एक से अधिक ऑपरेशन करने हों",
    },
    {
      id: 7,
      question: "फिक्स्चर (Fixture) में 'सेटिंग ब्लॉक' का मुख्य कार्य क्या है?",
      options: ["वर्कपीस को पकड़ना", "कटर को वर्कपीस के सापेक्ष सेट करना", "चिप्स को बाहर निकालना", "वर्कपीस को लोकेट करना"],
      answer: "कटर को वर्कपीस के सापेक्ष सेट करना",
    },
    {
      id: 8,
      question: "नीडल रोलर बेयरिंग (Needle Roller Bearing) की लंबाई और व्यास का अनुपात क्या होता है?",
      options: ["1:1", "2:1", "5:1 से 10:1 के बीच", "0.5:1"],
      answer: "5:1 से 10:1 के बीच",
    },
    {
      id: 9,
      question: "'Lapping Abrasive' में सबसे कठोर पदार्थ कौन सा है?",
      options: ["सिलिकॉन कार्बाइड", "एल्युमीनियम ऑक्साइड", "बोरोन कार्बाइड", "हीरा (Diamond)"],
      answer: "हीरा (Diamond)",
    },
    {
      id: 10,
      question: "पाइप फिटिंग में 'ग्लोब वाल्व' (Globe Valve) का मुख्य उपयोग क्या है?",
      options: ["पानी के प्रवाह को केवल बंद या चालू करना", "पानी के प्रवाह को नियंत्रित (Throttling) करना", "केवल एक दिशा में प्रवाह देना", "वायुदाब कम करना"],
      answer: "पानी के प्रवाह को नियंत्रित (Throttling) करना",
    },
    {
      id: 11,
      question: "लेथ मशीन पर 'एसेन्ट्रिक टर्निंग' (Eccentric Turning) करने के लिए किस एक्सेसरी का उपयोग किया जाता है?",
      options: ["थ्री जॉ चक", "फोर जॉ चक (Independent Chuck)", "कोलेट चक", "मैग्नेटिक चक"],
      answer: "फोर जॉ चक (Independent Chuck)",
    },
    {
      id: 12,
      question: "स्टील की 'टेम्परिंग' (Tempering) क्यों की जाती है?",
      options: ["कठोरता बढ़ाने के लिए", "भंगुरता (Brittleness) कम करने और टफनेस बढ़ाने के लिए", "स्केल हटाने के लिए", "डक्टिलिटी बढ़ाने के लिए"],
      answer: "भंगुरता (Brittleness) कम करने और टफनेस बढ़ाने के लिए",
    },
    {
      id: 13,
      question: "किस 'गियर' का उपयोग बिजली को 90° पर संचारित करने के लिए किया जाता है जहाँ शाफ्ट इंटरसेक्ट (काटती) करती हैं?",
      options: ["स्पर गियर", "हेलिकल गियर", "बेवल गियर", "रैक और पिनियन"],
      answer: "बेवल गियर",
    },
    {
      id: 14,
      question: "'Sintered Bronze' बेयरिंग को क्या कहा जाता है?",
      options: ["सॉलिड बेयरिंग", "सेल्फ-लुब्रिकेटेड बेयरिंग", "भ्रस्ट बेयरिंग", "एंटी-फ्रिक्शन बेयरिंग"],
      answer: "सेल्फ-लुब्रिकेटेड बेयरिंग",
    },
    {
      id: 15,
      question: "पाइप को मोड़ते समय उसे चपटा होने से बचाने के लिए अंदर क्या भरा जाता है?",
      options: ["पानी", "रेत (Sand)", "तेल", "हवा"],
      answer: "रेत (Sand)",
    },
    {
      id: 16,
      question: "वर्नियर बेवल प्रोटेक्टर में 23 डिग्री को कितने वर्नियर डिवीज़न में बांटा जाता है?",
      options: ["12", "24", "25", "50"],
      answer: "12",
    },
    {
      id: 17,
      question: "किस माइक्रोमीटर में 'जीरो एरर' (Zero Error) नेगेटिव होती है?",
      options: ["जब थिम्बल की जीरो डेटम लाइन के आगे निकल जाए", "जब थिम्बल की जीरो डेटम लाइन के पीछे रह जाए", "जब एनविल घिस जाए", "इनमें से कोई नहीं"],
      answer: "जब थिम्बल की जीरो डेटम लाइन के आगे निकल जाए",
    },
    {
      id: 18,
      question: "'Taper Pin Reamer' का टेपर अनुपात क्या होता है?",
      options: ["1:20", "1:50", "1:100", "1:10"],
      answer: "1:50",
    },
    {
      id: 19,
      question: "थ्री जॉ चक (Three Jaw Chuck) को और किस नाम से जाना जाता है?",
      options: ["इंडिपेंडेंट चक", "सेल्फ-सेंटरिंग चक", "कॉम्बिनेशन चक", "कोलेट चक"],
      answer: "सेल्फ-सेंटरिंग चक",
    },
    {
      id: 20,
      question: "'Clarity of Vision' के लिए ग्राइंडिंग व्हील की ड्रेसिंग प्रक्रिया क्या कहलाती है?",
      options: ["ट्रूइंग", "ड्रेसिंग", "ग्लेजिंग", "लोडिंग"],
      answer: "ट्रूइंग",
    },
    {
      id: 21,
      question: "किस धातु की कोटिंग को 'शेरार्डाइजिंग' (Sherardizing) कहा जाता है?",
      options: ["जिंक पाउडर के साथ गर्म करना", "टिन की परत", "निकल प्लेटिंग", "क्रोमियम प्लेटिंग"],
      answer: "जिंक पाउडर के साथ गर्म करना",
    },
    {
      id: 22,
      question: "'Cosine Error' किस मापक यंत्र से संबंधित है?",
      options: ["माइक्रोमीटर", "डायल टेस्ट इंडिकेटर", "वर्नियर कैलिपर", "स्लिप गेज"],
      answer: "डायल टेस्ट इंडिकेटर",
    },
    {
      id: 23,
      question: "पाइप फिटिंग में 'एसेन्ट्रिक रिड्यूसर' (Eccentric Reducer) का उपयोग कहाँ होता है?",
      options: ["वर्टिकल पाइप लाइन में", "हॉरिजॉन्टल पाइप लाइन में 'एयर पॉकेट' से बचने के लिए", "पाइप की दिशा बदलने के लिए", "हाई प्रेशर के लिए"],
      answer: "हॉरिजॉन्टल पाइप लाइन में 'एयर पॉकेट' से बचने के लिए",
    },
    {
      id: 24,
      question: "लेथ मशीन के लीड स्क्रू में कौन सी चूड़ी (Thread) होती है?",
      options: ["V-Thread", "Square Thread", "Acme Thread", "Buttress Thread"],
      answer: "Acme Thread",
    },
    {
      id: 25,
      question: "किस प्रकार की 'की' (Key) का उपयोग केवल लाइट ड्यूटी ट्रांसमिशन के लिए किया जाता है और शाफ्ट पर कोई की-वे नहीं होता?",
      options: ["फ्लैट सैडल की", "हॉलो सैडल की", "वुडरफ की", "संक की"],
      answer: "हॉलो सैडल की",
    },
    {
      id: 26,
      question: "'Limit Gauge' के 'Go' और 'No-Go' सिरे में क्या समानता है?",
      options: ["दोनों की लंबाई समान होती है", "दोनों एक ही तरफ होते हैं (प्रोग्रेसिव गेज में)", "दोनों का व्यास समान होता है", "दोनों हार्ड नहीं होते"],
      answer: "दोनों एक ही तरफ होते हैं (प्रोग्रेसिव गेज में)",
    },
    {
      id: 27,
      question: "एल्युमीनियम की रिमिंग (Reaming) के लिए सबसे उपयुक्त कूलेंट कौन सा है?",
      options: ["सॉल्युबल ऑयल", "मिट्टी का तेल (Kerosene)", "सूखा (Dry)", "पानी"],
      answer: "मिट्टी का तेल (Kerosene)",
    },
    {
      id: 28,
      question: "किस रिवेटिंग दोष में रिवेट के दोनों तरफ हेड सेंटर में नहीं होते?",
      options: ["रिवेट बहुत छोटी होना", "रिवेट की लंबाई अधिक होना", "सुराख का लंबवत (Perpendicular) न होना", "बहुत भारी हैमर का प्रयोग"],
      answer: "सुराख का लंबवत (Perpendicular) न होना",
    },
    {
      id: 29,
      question: "शीट मेटल वर्क में 'स्टेक' (Stake) का क्या कार्य है?",
      options: ["चादर काटना", "सपोर्टिंग टूल के रूप में कार्य करना", "सुराख करना", "मार्किंग करना"],
      answer: "सपोर्टिंग टूल के रूप में कार्य करना",
    },
    {
      id: 30,
      question: "बेल्ट ड्राइव में 'क्रीप' (Creep) का मुख्य कारण क्या है?",
      options: ["पुली का व्यास कम होना", "बेल्ट का पुली पर फिसलना", "बेल्ट के तनाव में अंतर के कारण असमान विस्तार और संकुचन", "बेल्ट का पुराना होना"],
      answer: "बेल्ट के तनाव में अंतर के कारण असमान विस्तार और संकुचन",
    },
    {
      id: 31,
      question: "किस पुली का उपयोग 'क्रॉस बेल्ट ड्राइव' में शाफ्ट की दिशा बदलने के लिए होता है?",
      options: ["लूज पुली", "फास्ट पुली", "जॉकी पुली", "इनमें से कोई नहीं"],
      answer: "फास्ट पुली",
    },
    {
      id: 32,
      question: "ब्रेजिंग (Brazing) में फ्लक्स के रूप में किसका प्रयोग होता है?",
      options: ["अमोनियम क्लोराइड", "सुहागा (Borax)", "रेजिन", "जिंक क्लोराइड"],
      answer: "सुहागा (Borax)",
    },
    {
      id: 33,
      question: "कास्ट आयरन में कार्बन की मात्रा कितनी होती है?",
      options: ["0.1 से 0.5%", "0.5 से 1.5%", "2 से 4%", "5 से 10%"],
      answer: "2 से 4%",
    },
    {
      id: 34,
      question: "लेथ पर 'फॉलोअर स्टडी' (Follower Steady) कहाँ बांधी जाती है?",
      options: ["बेड पर", "टेलस्टॉक पर", "सैडल (Saddle) पर", "हेडस्टॉक पर"],
      answer: "सैडल (Saddle) पर",
    },
    {
      id: 35,
      question: "ग्राइंडिंग व्हील में 'ग्रेड' (Grade) क्या दर्शाता है?",
      options: ["एब्रेसिव का आकार", "व्हील की कठोरता (Bond की पकड़)", "व्हील की संरचना", "व्हील का व्यास"],
      answer: "व्हील की कठोरता (Bond की पकड़)",
    },
    {
      id: 36,
      question: "किस वेल्डिंग प्रक्रिया में 'नॉन-कंज्यूमेबल इलेक्ट्रोड' का प्रयोग होता है?",
      options: ["MIG वेल्डिंग", "TIG वेल्डिंग", "आर्क वेल्डिंग", "गैस वेल्डिंग"],
      answer: "TIG वेल्डिंग",
    },
    {
      id: 37,
      question: "'Sine Bar' का साइज किसके द्वारा निर्दिष्ट किया जाता है?",
      options: ["रोलर्स के केंद्रों के बीच की दूरी", "रोलर का व्यास", "साइन बार की चौड़ाई", "साइन बार की ऊंचाई"],
      answer: "रोलर्स के केंद्रों के बीच की दूरी",
    },
    {
      id: 38,
      question: "किस 'फिट' में टॉलरेंस ज़ोन पूरी तरह से एक-दूसरे के ऊपर होते हैं?",
      options: ["क्लीयरेंस", "इंटरफेरेंस", "ट्रांजिशन", "इनमें से कोई नहीं"],
      answer: "ट्रांजिशन",
    },
    {
      id: 39,
      question: "पाइप फिटिंग में 'चेक वाल्व' (Check Valve) का दूसरा नाम क्या है?",
      options: ["गेट वाल्व", "नॉन-रिटर्न वाल्व (NRV)", "बटरफ्लाई वाल्व", "ग्लोब वाल्व"],
      answer: "नॉन-रिटर्न वाल्व (NRV)",
    },
    {
      id: 40,
      question: "बेयरिंग बुश में 'ऑयल ग्रूव्स' (Oil Grooves) क्यों काटे जाते हैं?",
      options: ["वजन कम करने के लिए", "लुब्रिकेंट को समान रूप से वितरित करने के लिए", "बेयरिंग को सुंदर दिखाने के लिए", "हीट निकालने के लिए"],
      answer: "लुब्रिकेंट को समान रूप से वितरित करने के लिए",
    },
    {
      id: 41,
      question: "'Honing' स्टिक्स को लुब्रिकेट करने के लिए क्या उपयोग किया जाता है?",
      options: ["ग्रीस", "केरोसिन (मिट्टी का तेल)", "सॉल्युबल ऑयल", "पानी"],
      answer: "केरोसिन (मिट्टी का तेल)",
    },
    {
      id: 42,
      question: "लेथ बेड की गाइडवेज़ को आमतौर पर किस प्रक्रिया द्वारा हार्ड किया जाता है?",
      options: ["नाइट्राइडिंग", "फ्लेम हार्डनिंग", "साइनाइडिंग", "केस हार्डनिंग"],
      answer: "फ्लेम हार्डनिंग",
    },
    {
      id: 43,
      question: "किस गेज का उपयोग रेडियस और फिलट की जाँच के लिए होता है?",
      options: ["फीलर गेज", "रेडियस गेज", "रिंग गेज", "स्नैप गेज"],
      answer: "रेडियस गेज",
    },
    {
      id: 44,
      question: "'V-Belt' का क्रॉस-सेक्शन आकार कैसा होता है?",
      options: ["आयताकार", "वर्गाकार", "समलंबाकार (Trapezoidal)", "वृत्ताकार"],
      answer: "समलंबाकार (Trapezoidal)",
    },
    {
      id: 45,
      question: "शाफ्ट के साथ गियर को लॉक करने के लिए किस 'की' (Key) का उपयोग किया जाता है जो शाफ्ट के आधे सुराख में फिट होती है?",
      options: ["वुडरफ की", "जिब हेड की", "फेदर की", "संक की"],
      answer: "संक की",
    },
    {
      id: 46,
      question: "ड्रिलिंग मशीन में 'स्लीव' (Sleeve) का उपयोग कब किया जाता है?",
      options: ["जब ड्रिल का टेपर शैंक स्पिंडल से छोटा हो", "जब ड्रिल का टेपर शैंक स्पिंडल से बड़ा हो", "जब ड्रिल चक खराब हो", "जब सीधी शैंक वाली ड्रिल हो"],
      answer: "जब ड्रिल का टेपर शैंक स्पिंडल से छोटा हो",
    },
    {
      id: 47,
      question: "'Surface Gauge' का दूसरा नाम क्या है?",
      options: ["यूनिवर्सल कैलिपर", "स्क्राइबिंग ब्लॉक", "मार्किंग ब्लॉक", "B और C दोनों"],
      answer: "B और C दोनों",
    },
    {
      id: 48,
      question: "'Safe Edge File' का उपयोग कहाँ किया जाता है?",
      options: ["फ्लैट सतह के लिए", "किसी संलग्न सतह (Adjacent Surface) को खराब होने से बचाने के लिए", "सॉफ्ट धातु के लिए", "फिनिशिंग के लिए"],
      answer: "किसी संलग्न सतह (Adjacent Surface) को खराब होने से बचाने के लिए",
    },
    {
      id: 49,
      question: "शीट मेटल में 'बेंडिंग' के दौरान चादर के फटने से बचने के लिए क्या किया जाता है?",
      options: ["चादर को गरम करना", "'रिलीफ होल' (Relief Hole) बनाना", "चादर को पतला करना", "तेल लगाना"],
      answer: "'रिलीफ होल' (Relief Hole) बनाना",
    },
    {
      id: 50,
      question: "किस बेयरिंग का उपयोग 'हैवी शॉक लोड' के लिए किया जाता है?",
      options: ["बॉल बेयरिंग", "रोलर बेयरिंग", "स्फेरिकल रोलर बेयरिंग", "सिंथेटिक बेयरिंग"],
      answer: "स्फेरिकल रोलर बेयरिंग",
    },
    {
      id: 51,
      question: "पाइप वाइस (Pipe Vice) में पाइप को कितने बिंदुओं पर पकड़ा जाता है?",
      options: ["2", "3", "4", "6"],
      answer: "4",
    },
    {
      id: 52,
      question: "स्टील में 'हार्डनेस' (Hardness) बढ़ाने के लिए किस तत्व का प्रयोग किया जाता है?",
      options: ["सिलिकॉन", "कार्बन", "मैंगनीज", "सल्फर"],
      answer: "कार्बन",
    },
    {
      id: 53,
      question: "'Master Gauge' की सटीकता क्या होती है?",
      options: ["0.01 mm", "0.001 mm", "0.0001 mm", "वर्किंग गेज से 10 गुना अधिक सटीक"],
      answer: "वर्किंग गेज से 10 गुना अधिक सटीक",
    },
    {
      id: 54,
      question: "क्लच का मुख्य कार्य क्या है?",
      options: ["गति बढ़ाना", "इंजन को गियरबॉक्स से जोड़ना या अलग करना", "टॉर्क कम करना", "इंजन बंद करना"],
      answer: "इंजन को गियरबॉक्स से जोड़ना या अलग करना",
    },
    {
      id: 55,
      question: "रिवेटिंग करते समय दो चादरों को करीब लाने के लिए किस टूल का उपयोग होता है?",
      options: ["रिवेट सेट", "रिवेट स्नैप", "ड्रिफ्ट", "डॉली"],
      answer: "रिवेट सेट",
    },
    {
      id: 56,
      question: "'Basic Size' और 'Actual Size' के बीच के बीजगणितीय अंतर को क्या कहते हैं?",
      options: ["अपर डेविएशन", "लोअर डेविएशन", "एक्चुअल डेविएशन", "फंडामेंटल डेविएशन"],
      answer: "एक्चुअल डेविएशन",
    },
    {
      id: 57,
      question: "TRY SQUARE की शुद्धता जाँचने के लिए किस सतह का उपयोग करते हैं?",
      options: ["सरफेस प्लेट", "मास्टर ट्राई स्क्वायर", "स्टील रूल", "वर्नियर हाइट गेज"],
      answer: "मास्टर ट्राई स्क्वायर",
    },
    {
      id: 58,
      question: "पाइप कटर में कितने कटिंग व्हील होते हैं?",
      options: ["1", "3", "1 कटिंग व्हील और 2 रोलर", "केवल रोलर"],
      answer: "1 कटिंग व्हील और 2 रोलर",
    },
    {
      id: 59,
      question: "सोल्डरिंग आयरन की बिट किस धातु की बनी होती है?",
      options: ["लोहा", "तांबा (Copper)", "पीतल", "टिन"],
      answer: "तांबा (Copper)",
    },
    {
      id: 60,
      question: "'Flash Point' लुब्रिकेंट का वह तापमान है जिस पर:",
      options: ["तेल जम जाता है", "तेल आग पकड़ लेता है और जलता रहता है", "तेल केवल क्षण भर के लिए चमकता है (Vapor flashes)", "तेल बहना बंद कर देता है"],
      answer: "तेल केवल क्षण भर के लिए चमकता है (Vapor flashes)",
    },
    {
      id: 61,
      question: "किस बोल्ट का उपयोग भारी मशीनों को कंक्रीट फाउंडेशन में स्थिर करने के लिए होता है?",
      options: ["टी-बोल्ट", "आई-बोल्ट", "रैग बोल्ट (Rag Bolt)", "हुक बोल्ट"],
      answer: "रैग बोल्ट (Rag Bolt)",
    },
    {
      id: 62,
      question: "लेथ मशीन पर 'थ्रेडिंग' के समय 'Half Nut' को किसके साथ लगाया जाता है?",
      options: ["फीड रॉड", "लीड स्क्रू", "स्पिंडल", "रैक"],
      answer: "लीड स्क्रू",
    },
    {
      id: 63,
      question: "ग्राइंडिंग व्हील में 'लोडिंग' का क्या अर्थ है?",
      options: ["व्हील का टूटना", "धातु के कणों का व्हील के छिद्रों में फंसना", "व्हील का चिकना हो जाना", "व्हील का असंतुलित होना"],
      answer: "धातु के कणों का व्हील के छिद्रों में फंसना",
    },
    {
      id: 64,
      question: "'Standard Wire Gauge' (SWG) में नंबर बढ़ने पर चादर की मोटाई पर क्या प्रभाव पड़ता है?",
      options: ["बढ़ती है", "घटती है", "स्थिर रहती है", "पहले बढ़ती है फिर घटती है"],
      answer: "घटती है",
    },
    {
      id: 65,
      question: "ब्रेजिंग में प्रयुक्त 'Spelter' किसका मिश्रण है?",
      options: ["लेड और टिन", "तांबा और जस्ता (Copper & Zinc)", "तांबा और निकल", "सोना और चांदी"],
      answer: "तांबा और जस्ता (Copper & Zinc)",
    },
    {
      id: 66,
      question: "पाइप लाइन में 'यूनियन' लगाने का सही स्थान क्या है?",
      options: ["केवल अंत में", "केवल पंप के पास", "जहाँ भविष्य में पाइप लाइन को अलग करने की जरूरत हो", "टी-जंक्शन पर"],
      answer: "जहाँ भविष्य में पाइप लाइन को अलग करने की जरूरत हो",
    },
    {
      id: 67,
      question: "'Fundamental Tolerance' के कितने ग्रेड होते हैं?",
      options: ["12", "18", "25", "10"],
      answer: "18",
    },
    {
      id: 68,
      question: "वर्नियर हाइट गेज के किस भाग पर मेन स्केल अंकित होता है?",
      options: ["बीम", "बेस", "स्लाइडर", "स्क्राइबर"],
      answer: "बीम",
    },
    {
      id: 69,
      question: "'Invar Steel' में निकल की मात्रा कितनी होती है?",
      options: ["10%", "36%", "50%", "75%"],
      answer: "36%",
    },
    {
      id: 70,
      question: "आग बुझाने के लिए 'CO2' प्रकार के अग्निशामक का उपयोग मुख्य रूप से किस श्रेणी की आग के लिए होता है?",
      options: ["श्रेणी A", "श्रेणी B और C (खासकर बिजली)", "श्रेणी D (धातु)", "केवल कागज की आग"],
      answer: "श्रेणी B और C (खासकर बिजली)",
    },
    {
      id: 71,
      question: "हरियाणा के किस शहर को 'साइंस सिटी' और 'मिक्सी सिटी' के नाम से जाना जाता है?",
      options: ["करनाल", "अम्बाला", "कुरुक्षेत्र", "रोहतक"],
      answer: "अम्बाला",
    },
    {
      id: 72,
      question: "हरियाणा विधानसभा का डिजाइन किस फ्रांसीसी वास्तुकार ने तैयार किया था?",
      options: ["एडविन लुटियंस", "ली कार्बूजिए", "हर्बर्ट बेकर", "नेक चंद"],
      answer: "ली कार्बूजिए",
    },
    {
      id: 73,
      question: "'म्हारा गाँव, जगमग गाँव' योजना हरियाणा में कब शुरू की गई थी?",
      options: ["1 जुलाई 2015", "15 अगस्त 2014", "1 जनवरी 2016", "2 अक्टूबर 2017"],
      answer: "1 जुलाई 2015",
    },
    {
      id: 74,
      question: "हाल ही में हरियाणा के किस खिलाड़ी ने पेरिस ओलंपिक/पैरालिंपिक में स्वर्ण पदक जीता?",
      options: ["नीरज चोपड़ा", "सुमित अंतिल", "मनु भाकर", "विनेश फौगाट"],
      answer: "सुमित अंतिल",
    },
    {
      id: 75,
      question: "हरियाणा का सबसे बड़ा वन्यजीव अभयारण्य कौन सा है?",
      options: ["अबूबशहर", "कलेसर", "छिलछिला", "बीर शिकारगाह"],
      answer: "अबूबशहर",
    },
    {
      id: 76,
      question: "यदि 10 आदमी एक काम को 20 दिन में करते हैं, तो 25 आदमी उसी काम को कितने दिन में करेंगे?",
      options: ["4 दिन", "8 दिन", "10 दिन", "12 दिन"],
      answer: "8 दिन",
    },
    {
      id: 77,
      question: "श्रृंखला को पूरा करें: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "48"],
      answer: "42",
    },
    {
      id: 78,
      question: "हरियाणा में 'पिंजौर गार्डन' का निर्माण किसने करवाया था?",
      options: ["औरंगजेब", "फिदाई खान", "महाराजा पटियाला", "शाहजहां"],
      answer: "फिदाई खान",
    },
    {
      id: 79,
      question: "हरियाणा के किस जिले में 'उत्तर भारत का पहला परमाणु संयंत्र' स्थापित किया जा रहा है?",
      options: ["फतेहाबाद (गोरखपुर)", "हिसार", "भिवानी", "महेंद्रगढ़"],
      answer: "फतेहाबाद (गोरखपुर)",
    },
    {
      id: 80,
      question: "हरियाणा साहित्य अकादमी की मुख्य पत्रिका कौन सी है?",
      options: ["हरियाणा संवाद", "हरिप्रभा", "हरिगंधा", "शब्द बूंद"],
      answer: "हरिगंधा",
    },
    {
      id: 81,
      question: "एक वृत्त का व्यास 14 cm है, उसका क्षेत्रफल क्या होगा?",
      options: ["154cm2", "616cm2", "44cm2", "196cm2"],
      answer: "154cm2",
    },
    {
      id: 82,
      question: "महम का किला हरियाणा के किस जिले में स्थित है?",
      options: ["झज्जर", "रोहतक", "भिवानी", "हिसार"],
      answer: "रोहतक",
    },
    {
      id: 83,
      question: "हरियाणा के किस स्थान को 'हरियाणा का गया' कहा जाता है?",
      options: ["पेहोवा", "कुरुक्षेत्र", "सफीदों", "पुंडरी"],
      answer: "पेहोवा",
    },
    {
      id: 84,
      question: "यदि COLD को DPME लिखा जाता है, तो HEAT को क्या लिखा जाएगा?",
      options: ["IFBU", "JGCV", "IDBT", "GDBU"],
      answer: "IFBU",
    },
    {
      id: 85,
      question: "हरियाणा की पहली महिला पर्वतारोही कौन थी जिसने माउंट एवरेस्ट फतह किया?",
      options: ["संतोष यादव", "अनीता कुंडू", "शिवांगी पाठक", "ममता खरब"],
      answer: "संतोष यादव",
    },
    {
      id: 86,
      question: "शेख चिल्ली का मकबरा कहाँ स्थित है जिसे 'हरियाणा का ताजमहल' कहते हैं?",
      options: ["पानीपत", "थानेसर", "नारनौल", "हांसी"],
      answer: "थानेसर",
    },
    {
      id: 87,
      question: "हरियाणा तिलक' साप्ताहिक पत्र के संपादक कौन थे?",
      options: ["श्री राम शर्मा", "नेकीराम शर्मा", "छोटूराम", "बनारसी दास"],
      answer: "श्री राम शर्मा",
    },
    {
      id: 88,
      question: "25 का 20% कितना होगा?",
      options: ["5", "10", "15", "2.5"],
      answer: "5",
    },
    {
      id: 89,
      question: "हरियाणा में हाल ही में हुए विधानसभा चुनाव (2024) में किस पार्टी को पूर्ण बहुमत मिला?",
      options: ["कांग्रेस", "भाजपा (BJP)", "इनेलो", "जेजेपी"],
      answer: "भाजपा (BJP)",
    },
    {
      id: 90,
      question: "अरावली की पहाड़ियां हरियाणा के किस भाग में स्थित हैं?",
      options: ["उत्तर-पूर्वी", "दक्षिण-पश्चिमी", "उत्तर-पश्चिमी", "मध्य भाग"],
      answer: "दक्षिण-पश्चिमी",
    },
    {
      id: 91,
      question: "कंप्यूटर में 'HTTP' का पूर्ण रूप क्या है?",
      options: ["Hyper Text Transfer Protocol", "High Text Transfer Process", "Hyper Terminal Text Protocol", "Hyper Text Total Protocol"],
      answer: "Hyper Text Transfer Protocol",
    },
    {
      id: 92,
      question: "कीबोर्ड पर 'F1' से 'F12' तक की कुंजियों को क्या कहा जाता है?",
      options: ["न्यूमेरिकल कीज़", "फंक्शन कीज़", "कंट्रोल कीज़", "टॉगल कीज़"],
      answer: "फंक्शन कीज़",
    },
    {
      id: 93,
      question: "किसी ईमेल पते में 'user@example.com' में 'example.com' क्या है?",
      options: ["यूजर नेम", "डोमेन नेम", "प्रोटोकॉल", "पासवर्ड"],
      answer: "डोमेन नेम",
    },
    {
      id: 94,
      question: "सॉफ्टवेयर का वह समूह जो कंप्यूटर के हार्डवेयर को नियंत्रित करता है, क्या कहलाता है?",
      options: ["एप्लीकेशन सॉफ्टवेयर", "ऑपरेटिंग सिस्टम", "यूटिलिटी सॉफ्टवेयर", "ब्राउज़र"],
      answer: "ऑपरेटिंग सिस्टम",
    },
    {
      id: 95,
      question: "MS Excel में 'Cells' के समूह को क्या कहा जाता है?",
      options: ["चार्ट", "रेंज (Range)", "फॉर्मूला", "वर्क बुक"],
      answer: "रेंज (Range)",
    },
    {
      id: 96,
      question: "एक किलोबाइट (1 KB) में कितने बाइट्स होते हैं?",
      options: ["1000", "1024", "512", "2048"],
      answer: "1024",
    },
    {
      id: 97,
      question: "इनमें से कौन सा 'वोलाटाइल' (Volatile) मेमोरी का उदाहरण है?",
      options: ["ROM", "RAM", "Hard Disk", "Pen Drive"],
      answer: "RAM",
    },
    {
      id: 98,
      question: "कट (Cut) किए गए टेक्स्ट को वापस लाने (Paste) के लिए किस शॉर्टकट का उपयोग होता है?",
      options: ["Ctrl + C", "Ctrl + X", "Ctrl + V", "Ctrl + Z"],
      answer: "Ctrl + V",
    },
    {
      id: 99,
      question: "URL का क्या अर्थ है?",
      options: ["Uniform Resource Locator", "Unique Resource Link", "United Radio Link", "Universal Resource Locator"],
      answer: "Uniform Resource Locator",
    },
    {
      id: 100,
      question: "कंप्यूटर को रीबूट करने के लिए कौन सा 'की कॉम्बिनेशन' उपयोग किया जाता है?",
      options: ["Ctrl+Alt+Del", "Ctrl+Shift+Esc", "Alt+F4", "Shift+Del"],
      answer: "Ctrl+Alt+Del",
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(105 * 60);
  const [rankData, setRankData] = useState({ rank: 0, total: 0 });

  useEffect(() => {
    if (!submitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !submitted) {
      submitTest();
    }
  }, [timeLeft, submitted]);

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });
    return score;
  };

  const submitTest = () => {
    const score = calculateScore();
    const previousAttempts = JSON.parse(localStorage.getItem("mockRanks") || "[]");
    const updatedAttempts = [...previousAttempts, score].sort((a, b) => b - a);
    localStorage.setItem("mockRanks", JSON.stringify(updatedAttempts));
    const rank = updatedAttempts.indexOf(score) + 1;
    setRankData({ rank, total: updatedAttempts.length });
    setSubmitted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">HSSC Group 5 Mock Test</h1>
            <p className="opacity-90">{questions.length} Questions | 1 Hour 45 Minutes</p>
          </div>
          <div className="bg-white text-blue-700 px-5 py-3 rounded-2xl font-bold text-xl">
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {!submitted ? (
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-semibold">
                Question {currentQuestion + 1} / {questions.length}
              </div>
              <div className="flex gap-2 flex-wrap">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`w-8 h-8 rounded-lg text-sm ${
                      answers[idx] ? "bg-green-500 text-white" : 
                      currentQuestion === idx ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6 border">
              <h2 className="text-xl font-semibold mb-6 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>
              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      answers[currentQuestion] === option
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
                className="px-6 py-3 rounded-2xl bg-gray-200 hover:bg-gray-300"
              >
                Previous
              </button>
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={submitTest}
                  className="px-8 py-3 rounded-2xl bg-green-500 text-white hover:bg-green-600"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1))}
                  className="px-8 py-3 rounded-2xl bg-blue-500 text-white hover:bg-blue-600"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-10 text-center">
            <h2 className="text-4xl font-bold mb-4">Test Completed</h2>
            <div className="bg-gray-100 rounded-3xl p-8 max-w-xl mx-auto">
              <p className="text-2xl font-semibold mb-3">Score: {calculateScore()} / {questions.length}</p>
              <p className="text-xl mb-2">Rank: #{rankData.rank}</p>
              <p className="text-lg text-gray-600 mb-6">Out of {rankData.total} attempts</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                  setCurrentQuestion(0);
                  setTimeLeft(105 * 60);
                }}
                className="px-8 py-3 rounded-2xl bg-purple-500 text-white hover:bg-purple-600"
              >
                Attempt Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockTestPlatform;