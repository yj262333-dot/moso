import React, { useState, useEffect } from 'react';

// Full 100 Questions Dataset
// h = Hindi Question, e = English Question, oh = Options (Hindi), oe = Options (English), a = Correct Answer Index (0-3)
const questionsData = [
  { id: 1, h: "एक होल का साइज 50.000+0.005+0.025 mm है और शाफ्ट का साइज 50.000+0.030+0.040 mm है। इस फिट (Fit) में 'Minimum Interference' का मान क्या होगा?", e: "A hole size is 50.000+0.005+0.025 mm and shaft size is 50.000+0.030+0.040 mm. What will be the value of 'Minimum Interference' in this fit?", oh: ["0.015 mm", "0.005 mm", "0.035 mm", "0.020 mm"], oe: ["0.015 mm", "0.005 mm", "0.035 mm", "0.020 mm"], a: 1 },
  { id: 2, h: "भारतीय मानक प्रणाली (IS) के अनुसार, बुनियादी टॉलरेंस (Fundamental Tolerances) के 18 ग्रेड कहाँ से कहाँ तक नामित होते हैं?", e: "According to the Indian Standard (IS) system, the 18 grades of Fundamental Tolerances are designated from where to where?", oh: ["IT1 से IT18", "ITO से IT17", "IT01, ITO से IT16", "IT01 से IT15"], oe: ["IT1 to IT18", "ITO to IT17", "IT01, ITO to IT16", "IT01 to IT15"], a: 2 },
  { id: 3, h: "एक वर्नियर माइक्रोमीटर में वर्नियर स्केल के 10 डिवीज़न, थिम्बल स्केल के 9 डिवीज़न के बराबर हैं। यदि थिम्बल के 1 भाग का मान 0.01 mm है, तो इस यंत्र का अल्पतमांक (Least Count) क्या होगा?", e: "In a vernier micrometer, 10 divisions of the vernier scale are equal to 9 divisions of the thimble scale. If the value of 1 division of the thimble is 0.01 mm, what will be the least count of this instrument?", oh: ["0.01 mm", "0.02 mm", "0.0001 mm", "0.001 mm"], oe: ["0.01 mm", "0.02 mm", "0.0001 mm", "0.001 mm"], a: 3 },
  { id: 4, h: "डायल टेस्ट इंडिकेटर (Plunger Type) में प्लंजर की रैखिक गति को सूचक की घूर्णन गति में बदलने के लिए किस गियर मैकेनिज्म का उपयोग किया जाता है?", e: "Which gear mechanism is used in a Dial Test Indicator (Plunger Type) to convert the linear motion of the plunger into rotary motion of the pointer?", oh: ["रैक और पिनियन मैकेनिज्म", "लीवर और स्क्रॉल मैकेनिज्म", "वर्म और वर्म व्हील", "बेवल गियर मैकेनिज्म"], oe: ["Rack and pinion mechanism", "Lever and scroll mechanism", "Worm and worm wheel", "Bevel gear mechanism"], a: 0 },
  { id: 5, h: "किस विशेष 'Jig' का उपयोग पतली और अनियमित आकार की शीट या वर्कपीस को बिना किसी बेस प्लेट के दोनों तरफ से क्लैंप करके ड्रिलिंग करने के लिए किया जाता है?", e: "Which special 'Jig' is used for drilling thin and irregularly shaped sheets or workpieces by clamping them from both sides without any base plate?", oh: ["चैनल जिग", "सैंडविच जिग", "बॉक्स जिग", "इंडेक्सिंग जिग"], oe: ["Channel jig", "Sandwich jig", "Box jig", "Indexing jig"], a: 1 },
  { id: 6, h: "जिग और फिक्स्चर डिज़ाइन में '3-2-1 प्रिंसिपल' का उपयोग वर्कपीस के कितने डिग्रियों के मूवमेंट (Degrees of Freedom) को प्रतिबंधित करने के लिए किया जाता है?", e: "In jig and fixture design, the '3-2-1 principle' is used to restrict how many degrees of freedom of the workpiece?", oh: ["9 डिग्रियों को", "6 डिग्रियों को", "12 डिग्रियों को", "3 डिग्रियों को"], oe: ["9 degrees", "6 degrees", "12 degrees", "3 degrees"], a: 0 },
  { id: 7, h: "मिलिंग फिक्स्चर में कटर को वर्कपीस के सापेक्ष सही स्थिति में सेट करने और फीड देने से पहले जाँच करने के लिए किसका उपयोग किया जाता है?", e: "In a milling fixture, what is used to set the cutter in the correct position relative to the workpiece and check it before feeding?", oh: ["गाइड बुश और प्लग गेज", "लोकेटिंग पिन और क्लैंप", "सेटिंग ब्लॉक और फीलर गेज", "टेम्पलेट और स्क्राइबर"], oe: ["Guide bush and plug gauge", "Locating pin and clamp", "Setting block and feeler gauge", "Template and scriber"], a: 2 },
  { id: 8, h: "अत्यधिक उच्च गति और बहुत कम रेडियल स्पेस वाले अनुप्रयोगों (जैसे एयरक्राफ्ट टर्बाइन या सुपरचार्जर शाफ्ट) के लिए किस बेयरिंग को प्राथमिकता दी जाती है?", e: "Which bearing is preferred for applications with extremely high speed and very low radial space (like aircraft turbines or supercharger shafts)?", oh: ["थ्रस्ट बॉल बेयरिंग", "नीडल रोलर बेयरिंग", "टेपर रोलर बेयरिंग", "सॉलिड स्लीव बेयरिंग"], oe: ["Thrust ball bearing", "Needle roller bearing", "Taper roller bearing", "Solid sleeve bearing"], a: 1 },
  { id: 9, h: "गेज और ब्लॉक की अत्यधिक सटीक सतह फिनिशिंग के लिए 'Lapping' प्रक्रिया में किस कठोरतम कृत्रिम अपघर्षक (Artificial Abrasive) का उपयोग किया जाता है, जो केवल टंगस्टन कार्बाइड को भी लैप कर सकता है?", e: "Which hardest artificial abrasive is used in the 'Lapping' process for highly precise surface finishing of gauges and blocks, which can even lap tungsten carbide?", oh: ["बोरॉन कार्बाइड", "सिलिकॉन कार्बाइड", "एल्युमीनियम ऑक्साइड", "जिरकोनिया एल्युमिना"], oe: ["Boron carbide", "Silicon carbide", "Aluminum oxide", "Zirconia alumina"], a: 0 },
  { id: 10, h: "उच्च दाब वाली स्टीम और हाइड्रोलिक पाइप लाइनों में द्रव के प्रवाह को पूरी तरह सीधे (बिना किसी दिशा परिवर्तन या थ्रॉटलिंग प्रतिरोध के) गुजरने देने के लिए किस वाल्व का चयन किया जाता है?", e: "Which valve is selected in high-pressure steam and hydraulic pipelines to allow fluid flow completely straight (without any change in direction or throttling resistance)?", oh: ["ग्लोब वाल्व", "नीडल वाल्व", "गेट वाल्व", "प्लग वाल्व"], oe: ["Globe valve", "Needle valve", "Gate valve", "Plug valve"], a: 2 },
  { id: 11, h: "लेथ मशीन पर अत्यधिक अनियमित और असंतुलित भारी जॉब (जैसे क्रैंकशाफ्ट) की टर्निंग करते समय, जॉब को फोर-जॉ चक में पकड़ने के बाद फेस प्लेट पर संतुलित करने के लिए किसका प्रयोग आवश्यक है?", e: "While turning a highly irregular and unbalanced heavy job (like a crankshaft) on a lathe, what is necessary to balance the job on the face plate after chucking it in a four-jaw chuck?", oh: ["स्टडी REST", "काउंटर वेट (Counter Weights)", "टेलस्टॉक डेड सेंटर", "ड्राइविंग डॉग"], oe: ["Steady REST", "Counter Weights", "Tailstock dead center", "Driving dog"], a: 1 },
  { id: 12, h: "स्टील की 'Austenite' संरचना को बहुत धीमी गति से भट्टी के अंदर ही ठंडा करने पर कौन सा अंतिम विन्यास प्राप्त होता है जो अत्यधिक नरम और डक्टाइल होता है?", e: "What final structure is obtained when the 'Austenite' structure of steel is cooled very slowly inside the furnace, making it extremely soft and ductile?", oh: ["मार्टेंसाइट", "पियरलाइट (Pearlite)", "बेनाइट", "सीमेंटाइट"], oe: ["Martensite", "Pearlite", "Bainite", "Cementite"], a: 1 },
  { id: 13, h: "'Epicyclic Gear Train' का मुख्य अनुप्रयोग कहाँ देखने को मिलता है जहाँ बहुत ही सीमित स्थान पर अत्यधिक उच्च टॉर्क और गति परिवर्तन की आवश्यकता होती है?", e: "Where is the main application of 'Epicyclic Gear Train' seen where extremely high torque and speed changes are required in a very limited space?", oh: ["ऑटोमोबाइल गियरबॉक्स और डिफरेंशियल", "साधारण लेथ हेडस्टॉक", "पाइप थ्रेडिंग मशीन", "शेपर मशीन ड्राइव"], oe: ["Automobile gearbox and differential", "Ordinary lathe headstock", "Pipe threading machine", "Shaper machine drive"], a: 0 },
  { id: 14, h: "किस विशेष क्लच का उपयोग केवल एक ही दिशा में शक्ति संचारित करने के लिए किया जाता है, और विपरीत दिशा में वह स्वतंत्र रूप से घूमता है (जैसे साइकिल का फ्रीव्हील)?", e: "Which special clutch is used to transmit power in only one direction, and freewheels in the opposite direction (like a bicycle freewheel)?", oh: ["कोन क्लच", "ओवर-रनिंग क्लच (One-way clutch)", "सेन्ट्रिफ्यूगल क्लच", "डॉग क्लच"], oe: ["Cone clutch", "Over-running clutch (One-way clutch)", "Centrifugal clutch", "Dog clutch"], a: 1 },
  { id: 15, h: "पाइप फिटिंग वाल्वों में, रिपेयरिंग के दौरान बिना पूरी पाइपलाइन को खाली किए केवल इंटरनल पैकिंग बदलने की सुविधा देने वाले मैकेनिज्म को क्या कहा जाता है?", e: "In pipe fitting valves, what is the mechanism called that allows changing only the internal packing during repairs without emptying the entire pipeline?", oh: ["थ्रॉटलिंग सीट", "बैक-सीटिंग मैकेनिज्म (Back-seating)", "बाईपास वाल्व", "ग्लैंड नट असेंबली"], oe: ["Throttling seat", "Back-seating mechanism", "Bypass valve", "Gland nut assembly"], a: 1 },
  { id: 16, h: "वर्नियर बेवल प्रोटेक्टर में, यदि मुख्य स्केल की रीडिंग 32 डिग्री है और वर्नियर स्केल का 9वाँ भाग मुख्य स्केल की वामावर्त दिशा की रेखा से बिल्कुल मिल रहा है, तो कुल कोण क्या होगा?", e: "In a vernier bevel protector, if the main scale reading is 32 degrees and the 9th division of the vernier scale exactly aligns with a main scale line in counter-clockwise direction, what is the total angle?", oh: ["32°09′", "32°15′", "32°45′", "31°55′"], oe: ["32°09′", "32°15′", "32°45′", "31°55′"], a: 2 },
  { id: 17, h: "एक 200 mm लंबे 'Sine Bar' का उपयोग करके 30° का कोण मापा जाना है। इसके लिए स्लिप गेज के ब्लॉक की कुल ऊंचाई (H) कितनी होनी चाहिए? (sin 30°=0.5)", e: "An angle of 30° is to be measured using a 200 mm long 'Sine Bar'. What should be the total height (H) of the slip gauge blocks for this? (sin 30° = 0.5)", oh: ["100 mm", "50 mm", "150 mm", "200 mm"], oe: ["100 mm", "50 mm", "150 mm", "200 mm"], a: 0 },
  { id: 18, h: "ग्राइंडिंग व्हील की 'Loading' और 'Glazing' दोनों समस्याओं को एक ही बार में दूर करके नए और तीखे एब्रेसिव ग्रेन्स को बाहर निकालने की कंबाइंड मैकेनिकल प्रक्रिया क्या कहलाती है?", e: "What is the combined mechanical process called that removes both 'Loading' and 'Glazing' issues of a grinding wheel at once and exposes new sharp abrasive grains?", oh: ["ट्रूइंग (Truing)", "लैपिंग", "ड्रेसिंग (Dressing)", "टर्निंग"], oe: ["Truing", "Lapping", "Dressing", "Turning"], a: 2 },
  { id: 19, h: "किस गियर व्हील का उपयोग दो ऐसे नॉन-इंटरसेक्टिंग और नॉन-पैरेलल शाफ्ट्स के बीच शक्ति संचारित करने के लिए किया जाता है जो अलग-अलग तलों (Planes) में स्थित होते हैं?", e: "Which gear wheel is used to transmit power between two non-intersecting and non-parallel shafts located in different planes?", oh: ["हाइपॉइड गियर (Hypoid Gears)", "हेरिंगबोन गियर", "मिटर गियर", "हेलिकल गियर"], oe: ["Hypoid Gears", "Herringbone gear", "Miter gear", "Helical gear"], a: 0 },
  { id: 20, h: "लेथ मशीन पर भारी मात्रा में धातु को बहुत तेजी से हटाने (Rough Turning) के लिए सिंगल पॉइंट कटिंग टूल में कौन सा एंगल सबसे महत्वपूर्ण भूमिका निभाता है जो चिप्स के प्रवाह को नियंत्रित करता है?", e: "Which angle in a single point cutting tool plays the most important role in controlling chip flow for rapidly removing a large amount of metal (Rough Turning) on a lathe?", oh: ["साइड रेक एंगल (Side Rake Angle)", "एंड क्लीयरेंस एंगल", "लिप एंगल", "नोज़ रेडियस"], oe: ["Side Rake Angle", "End Clearance Angle", "Lip angle", "Nose radius"], a: 0 },
  { id: 21, h: "'Anodizing' प्रक्रिया का उपयोग विशेष रूप से किस धातु की सतह पर एक सुरक्षात्मक और संक्षारण-रोधी ऑक्साइड की परत चढ़ाने के लिए किया जाता है?", e: "'Anodizing' process is specifically used to apply a protective and anti-corrosive oxide layer on the surface of which metal?", oh: ["कॉपर", "जिंक", "कास्ट आयरन", "एल्युमीनियम"], oe: ["Copper", "Zinc", "Cast iron", "Aluminum"], a: 3 },
  { id: 22, h: "मापन विज्ञान में 'Taylor's Principle' विशेष रूप से किसके डिज़ाइन और अनुप्रयोग से संबंधित है?", e: "In metrology, 'Taylor's Principle' is specifically related to the design and application of what?", oh: ["लिमिट गेज (Go and No-Go Gauges)", "माइक्रोमीटर थिम्बल", "डायल टेस्ट इंडिकेटर", "साइन बार रोलर्स"], oe: ["Limit Gauges (Go and No-Go Gauges)", "Micrometer thimble", "Dial test indicator", "Sine bar rollers"], a: 0 },
  { id: 23, h: "किस विशिष्ट 'Fit' के अंतर्गत इंटरनेशनल ऑर्गनाइजेशन फॉर स्टैंडरडाइजेशन (ISO) प्रणाली में H7/g6 को वर्गीकृत किया जाता है?", e: "Under which specific 'Fit' is H7/g6 classified in the International Organization for Standardization (ISO) system?", oh: ["प्रिसिजन रनिंग क्लीयरेंस फिट", "इंटरफेरेंस फिट", "ट्रांजिशन फिट", "फोर्स फिट"], oe: ["Precision running clearance fit", "Interference fit", "Transition fit", "Force fit"], a: 0 },
  { id: 24, h: "लेथ मशीन पर लंबी लीड वाली 'Multi-start Thread' काटते समय, मशीन के लीड स्क्रू की गति और स्पिंडल की गति का अनुपात किस पर निर्भर करता है?", e: "While cutting a long lead 'Multi-start Thread' on a lathe machine, the ratio of the machine's lead screw speed and the spindle speed depends on what?", oh: ["चूड़ी की पिच (Pitch) पर", "चूड़ी की गहराई पर", "चूड़ी की लीड (Lead) पर", "टूल के आकार पर"], oe: ["On the pitch of the thread", "On the depth of thread", "On the lead of the thread", "On the tool size"], a: 2 },
  { id: 25, h: "शाफ्ट के साथ हब के सापेक्ष कोणीय गति (Angular Movement) को पूरी तरह रोकते हुए केवल अक्षीय गति (Axial Sliding) की अनुमति देने वाली 'Key' को क्या कहा जाता है?", e: "What is the 'Key' called that completely prevents angular movement relative to the hub with the shaft while allowing only axial movement (Axial Sliding)?", oh: ["वुडरफ की", "फेदर की (Feather Key)", "जिब हेड की", "फ्लैट सैडल की"], oe: ["Woodruff key", "Feather Key", "Gib head key", "Flat saddle key"], a: 1 },
  { id: 26, h: "स्टील के पुर्जों को कार्बन-समृद्ध वातावरण में गर्म करके उनकी सतह पर कार्बन की मात्रा बढ़ाने की प्रक्रिया 'Carburizing' कहलाती है। इसके बाद पुर्जे में पूर्ण कठोरता प्राप्त करने के लिए कौन सा चरण अनिवार्य है?", e: "Heating steel parts in a carbon-rich environment to increase carbon on the surface is 'Carburizing'. What step is mandatory after this to achieve full hardness in the part?", oh: ["एनीलिंग", "नॉर्मलाइजिंग", "शमन और तपन (Quenching & Tempering)", "नाइट्राइडिंग"], oe: ["Annealing", "Normalizing", "Quenching & Tempering", "Nitriding"], a: 2 },
  { id: 27, h: "किस 'Bearing Lubrication Method' के अंतर्गत तेल की एक निरंतर पतली फिल्म को बाहरी दबाव के बिना, केवल शाफ्ट की तेज घूर्णन गति के कारण उत्पन्न हाइड्रोडायनामिक दबाव से बनाए रखा जाता है?", e: "Under which 'Bearing Lubrication Method' is a continuous thin film of oil maintained by the hydrodynamic pressure generated purely by the fast rotational speed of the shaft, without external pressure?", oh: ["थिक-फिल्म लुब्रिकेशन (Thick-film/Hydrodynamic)", "बाउंड्री लुब्रिकेशन", "हाइड्रोस्टेटिक लुब्रिकेशन", "स्प्लैश लुब्रिकेशन"], oe: ["Thick-film/Hydrodynamic Lubrication", "Boundary lubrication", "Hydrostatic lubrication", "Splash lubrication"], a: 0 },
  { id: 28, h: "यदि एक नए रीमर से सुराख करने के बाद सुराख का आकार बड़ा बन जाता है और उसकी सतह पर बहुत अधिक खरोंचें (Scratches) आती हैं, तो इसका मुख्य तकनीकी कारण क्या है?", e: "If a hole becomes oversized and gets excessive scratches on its surface after reaming with a new reamer, what is the main technical reason for this?", oh: ["रीमर का व्यास कम होना", "रीमर के दांतों पर 'Built-up Edge' का बनना या अत्यधिक चिप्स का फंसना", "कूलेंट का बहुत ज्यादा उपयोग", "फीड रेट का बहुत कम होना"], oe: ["Reamer diameter being less", "Formation of 'Built-up Edge' on reamer teeth or excessive chip clogging", "Too much coolant use", "Feed rate being very low"], a: 1 },
  { id: 29, h: "एक के बाद एक कई स्लिप गेजों को आपस में रगड़कर जोड़ने (Wringing) के बाद, उनके बीच काम करने वाला कौन सा आणविक बल उन्हें गिरने से रोकता है?", e: "After joining multiple slip gauges by rubbing them against each other (Wringing), which molecular force acting between them prevents them from falling?", oh: ["गुरुत्वाकर्षण बल", "घर्षण बल", "आसंजन और वायुमंडलीय दाब (Cohesion, Adhesion & Atmospheric pressure)", "चुंबकीय बल"], oe: ["Gravitational force", "Frictional force", "Cohesion, Adhesion & Atmospheric pressure", "Magnetic force"], a: 2 },
  { id: 30, h: "अत्यधिक उच्च तापमान और उच्च दाब वाली केमिकल पाइपलाइनों में फ्लैंज जोड़ों के बीच लीकेज को पूरी तरह रोकने के लिए किस सामग्री के 'Gasket' का उपयोग किया जाता है?", e: "Which material 'Gasket' is used to completely prevent leakage between flange joints in extremely high-temperature and high-pressure chemical pipelines?", oh: ["रबर", "साधारण कागज", "सिंथेटिक टेफ्लॉन या स्पाइरल घाव धातु (Spiral Wound Metallic/Teflon)", "चमड़ा (Leather)"], oe: ["Rubber", "Ordinary paper", "Synthetic Teflon or Spiral Wound Metallic/Teflon", "Leather"], a: 2 },
  { id: 31, h: "एक ओपन बेल्ट ड्राइव (Drive) में बड़ी पुली का व्यास 400 mm और छोटी पुली का व्यास 200 mm है। यदि दोनों शाफ्ट्स के केंद्रों के बीच की दूरी 2000 mm है, तो बेल्ट की कुल लंबाई ज्ञात करने का सही गणितीय सूत्र क्या होगा?", e: "In an open belt drive, the diameter of large pulley is 400 mm and small pulley is 200 mm. If the distance between the centers of both shafts is 2000 mm, what is the correct mathematical formula to find the total belt length?", oh: ["L = 2C + (π/2)(D+d) + (D-d)²/4C", "L = 2C + π(D+d)", "L = C + 4π(D-d)", "L = 2C + (π/2)(D+d) + (D+d)²/4C"], oe: ["L = 2C + (π/2)(D+d) + (D-d)²/4C", "L = 2C + π(D+d)", "L = C + 4π(D-d)", "L = 2C + (π/2)(D+d) + (D+d)²/4C"], a: 0 },
  { id: 32, h: "MIG वेल्डिंग में प्रयुक्त होने वाले वायर इलेक्ट्रोड पर तांबे (Copper) की एक बहुत पतली परत क्यों चढ़ाई जाती है?", e: "Why is a very thin layer of Copper applied to the wire electrode used in MIG welding?", oh: ["वेल्डिंग का तापमान कम करने के लिए", "जंग से बचाने और बेहतर विद्युत चालकता (Electrical Contact) सुनिश्चित करने के लिए", "वायर को कठोर बनाने के लिए", "गैस के प्रवाह को रोकने के लिए"], oe: ["To reduce welding temperature", "To prevent rust and ensure better electrical contact", "To harden the wire", "To prevent gas flow"], a: 1 },
  { id: 33, h: "ग्रे कास्ट आयरन की मशीनिंग या वेल्डिंग के बाद उसमें दरारें पड़ने से बचाने के लिए वेल्डिंग से ठीक पहले कौन सी तापीय प्रक्रिया अत्यंत आवश्यक है?", e: "To prevent cracks in grey cast iron after machining or welding, which thermal process is extremely necessary right before welding?", oh: ["तीव्र शमन (Rapid Quenching)", "एनीलिंग", "प्री-हीटिंग (Pre-heating) 250°C से 300°C तक", "सायनाइडिंग"], oe: ["Rapid Quenching", "Annealing", "Pre-heating up to 250°C - 300°C", "Cyaniding"], a: 2 },
  { id: 34, h: "लेथ मशीन पर लंबे टेपर शाफ्ट को 'Tailstock Offset Method' द्वारा टर्न करते समय, ऑफसेट की अधिकतम मात्रा ज्ञात करने का सही सूत्र क्या है (जहाँ L= जॉब की कुल लंबाई, l= टेपर की लंबाई, D= बड़ा व्यास, d= छोटा व्यास)?", e: "While turning a long taper shaft on a lathe via 'Tailstock Offset Method', what is the formula to find maximum offset amount (L=Total length, l=Taper length, D=Major dia, d=Minor dia)?", oh: ["x = (D-d)/2 * l/L", "x = (D-d)/2", "x = (D-d)/l", "x = (D-d)/2 * L/l"], oe: ["x = (D-d)/2 * l/L", "x = (D-d)/2", "x = (D-d)/l", "x = (D-d)/2 * L/l"], a: 3 },
  { id: 35, h: "एक ग्राइंडिंग व्हील के विनिर्देशन (Specification) मार्क 'A46K5V' में अक्षर 'K' व्हील की किस विशेषता को वैज्ञानिक रूप से परिभाषित करता है?", e: "In a grinding wheel specification mark 'A46K5V', the letter 'K' scientifically defines which characteristic of the wheel?", oh: ["व्हील का एब्रेसिव प्रकार", "व्हील की ओपन संरचना", "विट्रीफाइड बॉन्ड", "व्हील का मध्यम श्रेणी का ग्रेड (Medium Grade)"], oe: ["Abrasive type of the wheel", "Open structure of the wheel", "Vitrified bond", "Medium Grade of the wheel"], a: 3 },
  { id: 36, h: "टीआईजी (TIG) वेल्डिंग में अत्यधिक उच्च तापमान पर भी बिना पिघले स्थिर आर्क बनाए रखने के लिए किस धातु के इलेक्ट्रोड का उपयोग किया जाता है जिसका गलनांक 3422°C होता है?", e: "In TIG welding, which metal electrode with a melting point of 3422°C is used to maintain a stable arc without melting even at extremely high temperatures?", oh: ["क्रोमियम", "टंगस्टन (Tungsten)", "टाइटेनियम", "वैनेडियम"], oe: ["Chromium", "Tungsten", "Titanium", "Vanadium"], a: 1 },
  { id: 37, h: "मास्टर गेज (Reference Gauge) को वर्किंग गेज की तुलना में अत्यधिक शुद्ध बनाए रखा जाता है। इंटरनेशनल स्टैंडर्ड के अनुसार मास्टर गेज की विनिर्माण टॉलरेंस वर्किंग गेज का कितना हिस्सा होती है?", e: "Master gauge (Reference Gauge) is maintained to be highly accurate compared to a working gauge. According to Int. Standards, the manufacturing tolerance of the master gauge is what fraction of the working gauge?", oh: ["समान होती है", "50% होती है", "वर्किंग गेज की टॉलरेंस का 1/10 भाग (10%)", "5 गुना अधिक होती है"], oe: ["It is equal", "It is 50%", "1/10th part (10%) of the working gauge tolerance", "It is 5 times more"], a: 2 },
  { id: 38, h: "किस विशिष्ट फिटिंग स्थिति में 'Maximum Clearance' की गणना करने के लिए होल के अधिकतम साइज में से शाफ्ट का कौन सा साइज घटाया जाता है?", e: "In which specific fitting situation is which shaft size subtracted from the maximum hole size to calculate the 'Maximum Clearance'?", oh: ["शाफ्ट का अधिकतम साइज", "होल का न्यूनतम साइज", "शाफ्ट का न्यूनतम साइज (Minimum size of shaft)", "बेसिक साइज"], oe: ["Maximum size of shaft", "Minimum size of hole", "Minimum size of shaft", "Basic size"], a: 2 },
  { id: 39, h: "पाइप फिटिंग में प्रयोग होने वाले 'Non-Return Valve' (NRV) के अंदर द्रव के प्रवाह को विपरीत दिशा में जाने से रोकने के लिए कौन सा पार्ट स्वतः बंद हो जाता है?", e: "In a 'Non-Return Valve' (NRV) used in pipe fitting, which part automatically closes to prevent the flow of fluid in the opposite direction?", oh: ["ग्लैंड नट", "वाल्व स्टेम", "स्विंग डिस्क या लिफ्ट प्लग (Lift Plug/Disk)", "हैंड व्हील"], oe: ["Gland nut", "Valve stem", "Swing disk or Lift Plug/Disk", "Hand wheel"], a: 2 },
  { id: 40, h: "मशीन टूल स्पिंडल्स और ऑटोमोबाइल व्हील हब्स में जहाँ भारी रेडियल और एक्सियल शॉक लोड दोनों एक साथ काम करते हैं, किस एंटी-फ्रिक्शन बेयरिंग का उपयोग अनिवार्य है?", e: "In machine tool spindles and automobile wheel hubs where heavy radial and axial shock loads work together, which anti-friction bearing is mandatory to use?", oh: ["थ्रस्ट बॉल बेयरिंग", "नीडल रोलर बेयरिंग", "टेपर रोलर बेयरिंग (Taper Roller Bearing)", "सॉलिड बुश बेयरिंग"], oe: ["Thrust ball bearing", "Needle roller bearing", "Taper Roller Bearing", "Solid bush bearing"], a: 2 },
  { id: 41, h: "इंजन सिलेंडरों के बोर की सुपर-फिनिशिंग के लिए 'Honing' ऑपरेशन करते समय होनिंग हेड की रोटरी स्पीड और रेसिप्रोकेटिंग स्पीड के अनुपात को सटीकता से सेट करने का मुख्य उद्देश्य क्या प्राप्त करना है?", e: "When performing 'Honing' for super-finishing engine cylinder bores, what is the main objective of accurately setting the ratio of rotary speed and reciprocating speed of the honing head?", oh: ["धातु को बहुत तेजी से काटना", "20° से 45° का सटीक 'Cross-Hatch Pattern' और सही ज्यामिति", "होनिंग स्टोन को घिसने से बचाना", "सुराख का व्यास कम करना"], oe: ["Cut metal very fast", "An accurate 'Cross-Hatch Pattern' of 20° to 45° and correct geometry", "Save honing stone from wear", "Reduce hole diameter"], a: 1 },
  { id: 42, h: "गैस कार्बोराइजिंग प्रक्रिया में स्टील के पुर्जों को भट्टी के अंदर किस हाइड्रोकार्बन गैस के प्रवाह के बीच 900°C पर गर्म किया जाता है?", e: "In the gas carburizing process, steel parts are heated at 900°C inside the furnace amidst the flow of which hydrocarbon gas?", oh: ["अमोनिया गैस", "कार्बन डाइऑक्साइड", "मीथेन या प्रोपेन गैस (Methane/Propane)", "ऑक्सीजन गैस"], oe: ["Ammonia gas", "Carbon dioxide", "Methane/Propane gas", "Oxygen gas"], a: 2 },
  { id: 43, h: "एक बाहरी मीट्रिक थ्रेड (M16×2) के 'Effective Diameter' (पिच व्यास) की अत्यधिक शुद्धता से जाँच करने के लिए किस गेज या विधि का उपयोग किया जाता है?", e: "Which gauge or method is used to highly accurately check the 'Effective Diameter' (pitch diameter) of an external metric thread (M16×2)?", oh: ["थ्रेड रिंग गेज", "थ्री-वायर विधि के साथ आउटसाइड माइक्रोमीटर (Three-wire method)", "थ्रेड प्लग गेज", "स्क्रू पिच गेज"], oe: ["Thread ring gauge", "Outside micrometer with three-wire method", "Thread plug gauge", "Screw pitch gauge"], a: 1 },
  { id: 44, h: "शेड्यूल नंबर (Schedule Number) पाइप की किस भौतिक और तकनीकी विशेषता को निर्दिष्ट करने के लिए उपयोग किया जाता है?", e: "Schedule Number is used to specify which physical and technical characteristic of a pipe?", oh: ["पाइप की कुल लंबाई", "पाइप की दीवार की मोटाई और दाब क्षमता (Wall Thickness)", "पाइप की सामग्री का ग्रेड", "पाइप का आंतरिक व्यास"], oe: ["Total pipe length", "Wall thickness and pressure capacity of the pipe", "Material grade of pipe", "Internal diameter of pipe"], a: 1 },
  { id: 45, h: "हैवी ड्यूटी ट्रांसमिशन और हाई-स्पीड शाफ्ट्स पर बिना किसी विफलता के गियर को लॉक करने के लिए किस 'Key' का उपयोग किया जाता है जिसके दोनों सिरे गोल होते हैं और शाफ्ट के की-वे में पूरी तरह समाहित होती है?", e: "Which 'Key', rounded at both ends and fully enclosed in the shaft keyway, is used to lock gears on heavy-duty transmissions and high-speed shafts without failure?", oh: ["वुडरफ की", "फेदर की या पैरेलल संक की (Parallel Sunk Key)", "फ्लैट सैडल की", "टेपर पिन की"], oe: ["Woodruff key", "Feather key or Parallel Sunk Key", "Flat saddle key", "Taper pin key"], a: 1 },
  { id: 46, h: "लेथ मशीन के हेडस्टॉक स्पिंडल के अंदरूनी मोर्स टेपर (Morse Taper) से कम शंक वाले ड्रिल को स्पिंडल में सीधे फिट करने के लिए किस एक्सेसरी का उपयोग किया जाता है?", e: "Which accessory is used to fit a drill directly into the lathe headstock spindle if the drill shank is smaller than the spindle's internal Morse Taper?", oh: ["ड्रिल सॉकेट (Drill Socket)", "ड्रिल स्लीव", "ड्रिल चक", "थ्री-जॉ चक"], oe: ["Drill Socket", "Drill Sleeve", "Drill chuck", "Three-jaw chuck"], a: 1 },
  { id: 47, h: "वर्नियर हाइट गेज की सहायता से किसी शुद्ध जॉब पर 0.02 mm की सटीकता से मार्किंग करने के लिए इसके मूवेबल स्लाइडर के साथ किस विशेष स्क्राइबर का होना अनिवार्य है?", e: "To mark an accurate job with 0.02 mm precision using a vernier height gauge, which special scriber must be attached to its movable slider?", oh: ["स्ट्रेट स्क्राइबर", "बेंट स्क्राइबर", "ऑफसेट स्क्राइबर (Offset Scriber)", "नाइफ एज स्क्राइबर"], oe: ["Straight scriber", "Bent scriber", "Offset Scriber", "Knife edge scriber"], a: 2 },
  { id: 48, h: "फाइलिंग करते समय 'Pinning of File' (दांतों में धातु के कणों का फंसना) के कारण जॉब की सतह पर स्क्रैच आते हैं। इस दोष को रोकने के लिए फाइल की सतह पर काम शुरू करने से पहले क्या लगाया जाता है?", e: "While filing, 'Pinning of File' (metal particles clogging teeth) causes scratches on the job surface. To prevent this defect, what is applied to the file surface before starting work?", oh: ["सॉल्युबल ऑयल", "ग्रीस", "चॉक पाउडर (Chalk)", "पानी"], oe: ["Soluble oil", "Grease", "Chalk powder", "Water"], a: 2 },
  { id: 49, h: "शीट मेटल वर्क में अत्यधिक मोड़ने (Deep Drawing) पर चादर के कोनों पर धातु के इकट्ठा होने और मुड़ने (Wrinkling) के दोष को रोकने के लिए बेंडिंग लाइन के अंत में कौन सा कट लगाया जाता है?", e: "In sheet metal work, to prevent the defect of metal gathering and wrinkling at the corners of a sheet upon deep drawing, what cut is made at the end of the bending line?", oh: ["स्क्वायर नॉच", "वी-नॉच", "रिलीफ होल या विशेष स्लिट्स (Relief Cut)", "स्ट्रेट स्लॉट"], oe: ["Square notch", "V-notch", "Relief hole or special slits (Relief Cut)", "Straight slot"], a: 2 },
  { id: 50, h: "'Hydrodynamic Lubrication' प्रणाली में जब शाफ्ट स्थिर अवस्था से घूमना शुरू करती है, तो उस क्षण बेयरिंग में किस प्रकार की घर्षण स्थिति उत्पन्न होती है?", e: "In a 'Hydrodynamic Lubrication' system, when the shaft starts rotating from a stationary state, what type of friction condition arises in the bearing at that moment?", oh: ["फ्लूइड फिल्म घर्षण", "शून्य घर्षण", "बाउंड्री या सॉलिड घर्षण (Boundary/Solid Friction)", "रोलिंग घर्षण"], oe: ["Fluid film friction", "Zero friction", "Boundary or Solid Friction", "Rolling friction"], a: 2 },
  { id: 51, h: "हाइड्रोलिक पाइप मोड़ने वाली मशीन (Hydraulic Pipe Bender) में पाइप को बिना विकृत किए 90° पर मोड़ते समय न्यूट्रल एक्सिस पर क्या प्रभाव पड़ता है?", e: "When bending a pipe at 90° without deforming it in a Hydraulic Pipe Bender, what effect does it have on the neutral axis?", oh: ["न्यूट्रल एक्सिस की लंबाई बढ़ जाती है", "न्यूट्रल एक्सिस की लंबाई घट जाती है", "न्यूट्रल एक्सिस की लंबाई अपरिवर्तित रहती है (Remains unchanged)", "न्यूट्रल एक्सिस पूरी तरह नष्ट हो जाती है"], oe: ["Length of neutral axis increases", "Length of neutral axis decreases", "Length of neutral axis remains unchanged", "Neutral axis is completely destroyed"], a: 2 },
  { id: 52, h: "मशीन के पुर्जों की सतह को अत्यधिक कठोर और अंदर के हिस्से (Core) को टफ बनाए रखने की तापीय प्रक्रिया 'Case Hardening' कहलाती है। इंडक्शन हार्डनिंग विधि में हीटिंग के लिए किस सिद्धांत का उपयोग किया जाता है?", e: "The thermal process of keeping machine part surfaces very hard and the core tough is 'Case Hardening'. Which principle is used for heating in the induction hardening method?", oh: ["केमिकल रिएक्शन", "उच्च आवृत्ति प्रत्यावर्ती धारा और भंवर धाराएँ (High-frequency Eddy Currents)", "गैस फ्लेम", "भट्टी की थर्मल रेडिएशन"], oe: ["Chemical reaction", "High-frequency Alternating Current and Eddy Currents", "Gas flame", "Thermal radiation of furnace"], a: 1 },
  { id: 53, h: "इंटरनेशनल सिस्टम (ISO) के अनुसार, लिमिट और फिट्स की प्रणाली में कुल कितने बुनियादी विचलनों (Fundamental Deviations) को होल और शाफ्ट के लिए अलग-अलग निर्धारित किया गया है?", e: "According to the International System (ISO), how many total Fundamental Deviations have been defined separately for holes and shafts in the limits and fits system?", oh: ["18", "25", "16", "28 (A से ZC तक)"], oe: ["18", "25", "16", "28 (A to ZC)"], a: 3 },
  { id: 54, h: "टॉर्क कनवर्टर (Torque Converter) और फ्लूइड कपलिंग में शक्ति का संचरण इनपुट शाफ्ट से आउटपुट शाफ्ट तक विशुद्ध रूप से किसके माध्यम से होता है?", e: "In a Torque Converter and Fluid Coupling, power transmission from the input shaft to the output shaft occurs purely through what?", oh: ["गियर्स के सीधे संपर्क से", "फ्रिक्शन क्लच प्लेट से", "द्रव की गतिज ऊर्जा (Kinetic Energy of Fluid) द्वारा", "चेन ड्राइव से"], oe: ["Direct contact of gears", "Friction clutch plate", "Kinetic Energy of Fluid", "Chain drive"], a: 2 },
  { id: 55, h: "विमानों के ढांचों (Aircraft Structures) और पतली चादरों के जोड़ों में जहाँ अत्यधिक कंपन होता है और भार बहुत कम रखना होता है, किस रिवेट का उपयोग किया जाता है?", e: "Which rivet is used in aircraft structures and thin sheet joints where there is excessive vibration and weight must be kept very low?", oh: ["स्नैप हेड रिवेट", "एल्युमीनियम या डीयूरालमिन की पॉप/ब्लाइंड रिवेट (Duralumin Pop Rivet)", "काउंटरशंक हेड रिवेट", "पैन हेड रिवेट"], oe: ["Snap head rivet", "Aluminum or Duralumin Pop/Blind Rivet", "Countersunk head rivet", "Pan head rivet"], a: 1 },
  { id: 56, h: "इंजीनियरिंग ड्राइंग और मापन में 'Upper Deviation' की सही तकनीकी परिभाषा क्या है?", e: "What is the correct technical definition of 'Upper Deviation' in engineering drawing and measurement?", oh: ["अधिकतम साइज और न्यूनतम साइज का अंतर", "एक्चुअल साइज और बेसिक साइज का अंतर", "अधिकतम लिमिट साइज और बेसिक साइज का बीजगणितीय अंतर", "टॉलरेंस का आधा भाग"], oe: ["Difference between max and min size", "Difference between actual and basic size", "Algebraic difference between maximum limit size and basic size", "Half part of tolerance"], a: 2 },
  { id: 57, h: "एक साइन बार की ऊपरी सतह की समतलता (Flatness) और दोनों रोलर्स के व्यास की शुद्धता को बहुत उच्च स्तर पर बनाए रखने के लिए इसकी मैन्युफैक्चरिंग के बाद कौन सी अंतिम फिनिशिंग प्रक्रिया की जाती है?", e: "To maintain the flatness of a sine bar's top surface and the precision of both rollers' diameters at a very high level, what final finishing process is done after its manufacturing?", oh: ["प्रिसिजन ग्राइंडिंग और लैपिंग (Precision Grinding and Lapping)", "होनिंग", "टर्निंग", "स्क्रैपिंग"], oe: ["Precision Grinding and Lapping", "Honing", "Turning", "Scraping"], a: 0 },
  { id: 58, h: "पाइप फिटिंग असेंबली में बड़े व्यास वाले पाइपों को अत्यधिक कसने या खोलने के लिए किस रिंच का उपयोग किया जाता है जो पाइप की सतह पर खरोंच नहीं आने देती और चमड़े या नायलॉन की बेल्ट से बनी होती है?", e: "Which wrench is used in pipe fitting assemblies for excessively tightening or loosening large diameter pipes, which does not scratch the pipe surface and is made of a leather or nylon belt?", oh: ["स्टिलसन पाइप रिंच", "चेन पाइप रिंच", "मंकी रिंच", "स्ट्रैप रिंच (Strap Wrench)"], oe: ["Stillson pipe wrench", "Chain pipe wrench", "Monkey wrench", "Strap Wrench"], a: 3 },
  { id: 59, h: "इलेक्ट्रॉनिक्स और बारीक सोल्डरिंग कार्यों में उपयोग होने वाले कोर-सोल्डर (Rosin-core solder) के अंदर flux के रूप में प्रयुक्त 'Rosin' किस प्राकृतिक पदार्थ से प्राप्त किया जाता है?", e: "'Rosin' used as a flux inside rosin-core solder for electronics and fine soldering work is obtained from which natural substance?", oh: ["पेट्रोलियम बाय-प्रोडक्ट", "जिंक अयस्क", "पेड़ों के रेजिन या गोंद (Resin from pine trees)", "समुद्री साल्ट"], oe: ["Petroleum by-product", "Zinc ore", "Resin from pine trees", "Sea salt"], a: 2 },
  { id: 60, h: "लुब्रिकेटिंग तेल का 'Pour Point' तापमान वह बिंदु है जिस पर तेलः", e: "The 'Pour Point' temperature of lubricating oil is the point at which the oil:", oh: ["आग पकड़ लेता है", "वाष्पित होना शुरू होता है", "अत्यधिक गाढ़ा होकर बहना बंद कर देता है (Ceases to flow)", "पानी के साथ मिल जाता है"], oe: ["Catches fire", "Starts evaporating", "Becomes excessively thick and ceases to flow", "Mixes with water"], a: 2 },
  { id: 61, h: "एक मशीन की फाउंडेशन असेंबली में कंपन (Vibrations) के कारण नट को ढीला होने से पूरी तरह रोकने के लिए किस लॉकिंग नट के ऊपर एक पतली कटी हुई स्लॉटेड संरचना होती है जिसमें स्प्लिट पिन फंसाई जाती है?", e: "To completely prevent a nut from loosening due to vibrations in a machine's foundation assembly, which locking nut has a thin slotted structure on top in which a split pin is inserted?", oh: ["स्लॉटेड नट या कैसल नट (Castle Nut/Slotted Nut)", "लॉक नट", "विंग नट", "फ्लैंज नट"], oe: ["Slotted Nut or Castle Nut", "Lock nut", "Wing nut", "Flange nut"], a: 0 },
  { id: 62, h: "लेथ मशीन के 'Apron Mechanism' में फीड रॉड से ऑटोमैटिक क्रॉस फीड या लोंगिट्यूडिनल फीड प्राप्त करने के लिए किस गियर सेट और क्लच अरेंजमेंट का उपयोग किया जाता है?", e: "Which gear set and clutch arrangement is used in the 'Apron Mechanism' of a lathe machine to obtain automatic cross feed or longitudinal feed from the feed rod?", oh: ["टम्बलर गियर सेट", "हाफ नट मैकेनिज्म", "वर्म, वर्म व्हील और ड्रॉप वॉर्म मैकेनिज्म (Drop Worm Mechanism)", "चेंज गियर ट्रेन"], oe: ["Tumbler gear set", "Half nut mechanism", "Worm, worm wheel and Drop Worm Mechanism", "Change gear train"], a: 2 },
  { id: 63, h: "ग्राइंडिंग व्हील के निर्माण में प्रयुक्त होने वाले 'Resinoid Bond' को अंतर्राष्ट्रीय मानकों के अनुसार किस अक्षर द्वारा प्रदर्शित किया जाता है?", e: "The 'Resinoid Bond' used in manufacturing a grinding wheel is represented by which letter according to international standards?", oh: ["R", "V", "B", "E"], oe: ["R", "V", "B", "E"], a: 2 },
  { id: 64, h: "वर्नियर कैलिपर के डेप्थ बार (Depth Bar) का उपयोग करते समय होने वाली 'Parallax Error' को पूरी तरह समाप्त करने के लिए आधुनिक उद्योगों में किस यंत्र को प्राथमिकता दी जा रही है?", e: "To completely eliminate the 'Parallax Error' occurring while using the depth bar of a vernier caliper, which instrument is being preferred in modern industries?", oh: ["डिजिटल वर्नियर कैलिपर (Digital Vernier)", "डायल कैलिपर", "आउटसाइड माइक्रोमीटर", "इनसाइड कैलिपर"], oe: ["Digital Vernier Caliper", "Dial caliper", "Outside micrometer", "Inside caliper"], a: 0 },
  { id: 65, h: "सिल्वर ब्रेजिंग (Silver Brazing) में स्पैल्टर के रूप में चांदी, तांबा और जस्ता का मिश्रण प्रयुक्त होता है। इसमें चांदी (Silver) मिलाने का मुख्य तकनीकी उद्देश्य क्या है?", e: "In Silver Brazing, a mixture of silver, copper, and zinc is used as a spelter. What is the main technical purpose of adding silver to it?", oh: ["जोड़ को चमकाना", "मेल्टिंग पॉइंट को कम करना और जोड़ की तरलता (Fluidity) बढ़ाना", "जोड़ को भारी बनाना", "फ्लक्स की आवश्यकता समाप्त करना"], oe: ["To polish the joint", "To lower the melting point and increase fluidity of the joint", "To make the joint heavy", "To eliminate the need for flux"], a: 1 },
  { id: 66, h: "पाइप लाइन में सीधे जा रहे प्रवाह को 90° पर मोड़ने और साथ ही पाइप का व्यास कम करने के लिए किस सिंगल फिटिंग का उपयोग किया जाता है?", e: "Which single fitting is used in a pipeline to bend the straight flow at 90° and simultaneously reduce the pipe diameter?", oh: ["एसेन्ट्रिक रिड्यूसर", "रिड्यूसिंग एल्बो (Reducing Elbow)", "रिड्यूसिंग टी", "हाफ कपलिंग"], oe: ["Eccentric reducer", "Reducing Elbow", "Reducing tee", "Half coupling"], a: 1 },
  { id: 67, h: "टॉलरेंस के 18 ग्रेड्स में से IT5 से IT11 तक के ग्रेड्स का उपयोग मुख्य रूप से औद्योगिक विनिर्माण में किस कार्य के लिए किया जाता है?", e: "Out of the 18 grades of tolerance, IT5 to IT11 grades are mainly used in industrial manufacturing for what purpose?", oh: ["गेज ब्लॉक निर्माण के लिए", "रफ कास्टिंग कार्यों के लिए", "सामान्य मशीनिंग और फिट्स (General Engineering/Fits) के लिए", "केवल प्रयोगशाला उपकरणों के लिए"], oe: ["For gauge block manufacturing", "For rough casting jobs", "For general machining and fits (General Engineering/Fits)", "Only for laboratory equipment"], a: 2 },
  { id: 68, h: "सतह की विषमता (Surface Roughness) को मापने की वैज्ञानिक प्रणालियों में 'Ra' मान का पूर्ण रूप क्या है?", e: "What is the full form of the 'Ra' value in scientific systems for measuring surface roughness?", oh: ["Radius of Absolute roughness", "Roughness Average / Arithmetic Mean Deviation", "Root average", "Random Alignment value"], oe: ["Radius of Absolute roughness", "Roughness Average / Arithmetic Mean Deviation", "Root average", "Random Alignment value"], a: 1 },
  { id: 69, h: "हाई-स्पीड स्टील (HSS) से बने कटिंग टूल्स में टंगस्टन, क्रोमियम और वैनेडियम का सामान्य प्रामाणिक अनुपात क्या होता है?", e: "What is the general standard ratio of Tungsten, Chromium, and Vanadium in cutting tools made of High-Speed Steel (HSS)?", oh: ["4:18:1", "18:4:1", "1:4:18", "10:5:2"], oe: ["4:18:1", "18:4:1", "1:4:18", "10:5:2"], a: 1 },
  { id: 70, h: "बिजली के उपकरणों और तेल में लगी आग (Class B & C) को बुझाने के लिए किस अग्निशामक का उपयोग किया जाता है जो ऑक्सीजन की सप्लाई को काटकर आग को दबा देता है और कोई अवशेष नहीं छोड़ता?", e: "Which fire extinguisher is used to extinguish fires involving electrical equipment and oil (Class B & C) that suppresses the fire by cutting off the oxygen supply and leaves no residue?", oh: ["सोडा एसिड प्रकार", "पानी की बौछार", "फोम प्रकार", "कार्बन डाइऑक्साइड या सीटीसी (CO2/CTC)"], oe: ["Soda acid type", "Water spray", "Foam type", "Carbon Dioxide or CTC (CO2/CTC)"], a: 3 },
  // Non-Technical (Haryana GK, Math, Reasoning, Computer)
  { id: 71, h: "हरियाणा के किस ऐतिहासिक स्थान पर भारत का पहला 'PM-Mitra' मेगा टेक्सटाइल पार्क स्थापित करने की घोषणा की गई है?", e: "At which historical place in Haryana has the establishment of India's first 'PM-Mitra' Mega Textile Park been announced?", oh: ["धारूहेड़ा", "पानीपत", "मानेसर (गुरुग्राम)", "हिसार"], oe: ["Dharuhera", "Panipat", "Manesar (Gurugram)", "Hisar"], a: 1 },
  { id: 72, h: "हरियाणा के किस जिले में देश का पहला 'Aviation Hub' (उड्डयन केंद्र) विकसित किया गया है जहाँ महाराजा अग्रसेन अंतर्राष्ट्रीय हवाई अड्डा स्थित है?", e: "In which district of Haryana is the country's first 'Aviation Hub' being developed, where Maharaja Agrasen International Airport is located?", oh: ["अम्बाला", "करनाल", "रोहतक", "हिसार"], oe: ["Ambala", "Karnal", "Rohtak", "Hisar"], a: 3 },
  { id: 73, h: "'Haryana State Seed Certification Agency' का मुख्यालय कहाँ स्थित है?", e: "Where is the headquarters of 'Haryana State Seed Certification Agency' located?", oh: ["पंचकुला", "करनाल", "हिसार", "रोहतक"], oe: ["Panchkula", "Karnal", "Hisar", "Rohtak"], a: 0 },
  { id: 74, h: "वर्ष 2024 के हरियाणा विधानसभा चुनाव में कुल कितनी महिलाएँ विधायक चुनी गईं, जो अब तक का एक महत्वपूर्ण रिकॉर्ड है?", e: "In the 2024 Haryana Assembly Elections, how many women MLAs were elected in total, which is an important record so far?", oh: ["9", "11", "13", "15"], oe: ["9", "11", "13", "15"], a: 2 },
  { id: 75, h: "हरियाणा के किस जिले को 'शहीदों का शहर' कहा जाता है, जहाँ से 1857 की क्रांति के महानायक राव तुला राम संबंधित थे?", e: "Which district of Haryana is called the 'City of Martyrs', from where Rao Tula Ram, the hero of the 1857 revolution, belonged?", oh: ["झज्जर", "अम्बाला", "रेवाड़ी", "पानीपत"], oe: ["Jhajjar", "Ambala", "Rewari", "Panipat"], a: 2 },
  { id: 76, h: "(Math) यदि दो संख्याओं का योग 25 है और उनका अंतर 13 है, तो उन दोनों संख्याओं का गुणनफल (Product) क्या होगा?", e: "(Math) If the sum of two numbers is 25 and their difference is 13, then what will be the product of those two numbers?", oh: ["114", "108", "156", "120"], oe: ["114", "108", "156", "120"], a: 0 },
  { id: 77, h: "(Reasoning) यदि किसी निश्चित कूट भाषा में 'FITTER' को 'GJUUGS' लिखा जाता है, तो उसी भाषा में 'TURNER' को क्या लिखा जाएगा?", e: "(Reasoning) If in a certain code language 'FITTER' is written as 'GJUUGS', then how will 'TURNER' be written in the same language?", oh: ["UVSOFS", "UVSNFS", "UVSPFS", "UTROFS"], oe: ["UVSOFS", "UVSNFS", "UVSPFS", "UTROFS"], a: 0 },
  { id: 78, h: "हरियाणा की प्रसिद्ध 'हथनीकुंड बैराज' परियोजना यमुनानगर में किस वर्ष पुराने ताजेवाला बैराज के स्थान पर पूर्ण रूप से चालू की गई थी?", e: "In which year was Haryana's famous 'Hathnikund Barrage' project fully commissioned in Yamunanagar in place of the old Tajewala Barrage?", oh: ["1975", "1966", "1999", "2005"], oe: ["1975", "1966", "1999", "2005"], a: 2 },
  { id: 79, h: "नीरज चोपड़ा ने पेरिस पैरालंपिक / ओलंपिक खेलों के चक्र में भारत के लिए लगातार दूसरा पदक जीता। उनका संबंध हरियाणा के किस गाँव से है?", e: "Neeraj Chopra won the second consecutive medal for India in the Paris Olympic cycle. Which village in Haryana does he belong to?", oh: ["खांडरा (पानीपत)", "बलाली (चरखी दादरी)", "नाहरी (सोनीपत)", "शाहबाद (कुरुक्षेत्र)"], oe: ["Khandra (Panipat)", "Balali (Charkhi Dadri)", "Nahari (Sonipat)", "Shahbad (Kurukshetra)"], a: 0 },
  { id: 80, h: "हरियाणा के किस स्थान को 'कपिस्थल' के नाम से जाना जाता था, जिसे भगवान हनुमान की जन्मस्थली माना जाता है?", e: "Which place in Haryana was known as 'Kapisthal', which is considered the birthplace of Lord Hanuman?", oh: ["करनाल", "कुरुक्षेत्र", "कैथल", "जींद"], oe: ["Karnal", "Kurukshetra", "Kaithal", "Jind"], a: 2 },
  { id: 81, h: "(Math) एक ठोस धात्विक गोले की त्रिज्या 3 cm है। इसे पिघलाकर 0.2 cm व्यास का एक तार बनाया जाता है। तार की कुल लंबाई क्या होगी?", e: "(Math) The radius of a solid metallic sphere is 3 cm. It is melted and drawn into a wire of 0.2 cm diameter. What will be the total length of the wire?", oh: ["36 मीटर", "18 मीटर", "360 मीटर", "180 मीटर"], oe: ["36 meters", "18 meters", "360 meters", "180 meters"], a: 0 },
  { id: 82, h: "घग्गर नदी हरियाणा के किस जिले से होकर राज्य में प्रवेश करती है और ओटू बैराज का निर्माण करती है?", e: "Through which district of Haryana does the Ghaggar river enter the state and form the Ottu Barrage?", oh: ["अम्बाला", "पंचकुला (कालका)", "सिरसा", "फतेहाबाद"], oe: ["Ambala", "Panchkula (Kalka)", "Sirsa", "Fatehabad"], a: 1 },
  { id: 83, h: "हरियाणा की 'सुखना झील' जो कि अब चंडीगढ़ का एक मुख्य हिस्सा है, का निर्माण किस वर्ष किया गया था और इसके मुख्य वास्तुकार कौन थे?", e: "In which year was Haryana's 'Sukhna Lake', which is now a major part of Chandigarh, built and who was its chief architect?", oh: ["1958, ली कार्बुज़िए", "1966, नेक चंद", "1950, एडविन लुटियंस", "1970, अल्बर्ट मेयर"], oe: ["1958, Le Corbusier", "1966, Nek Chand", "1950, Edwin Lutyens", "1970, Albert Mayer"], a: 0 },
  { id: 84, h: "(Reasoning) श्रृंखला में लुप्त पद ज्ञात करें: 3, 7, 15, 31, 63, ?", e: "(Reasoning) Find the missing term in the series: 3, 7, 15, 31, 63, ?", oh: ["95", "125", "127", "131"], oe: ["95", "125", "127", "131"], a: 2 },
  { id: 85, h: "हरियाणा के किस मुख्यमंत्री का कार्यकाल राज्य में सबसे लंबा (लगातार और कुल मिलाकर दोनों संदर्भों में सबसे प्रभावशाली) रहा है?", e: "Which Chief Minister of Haryana has had the longest tenure (most influential both continuously and overall) in the state?", oh: ["भजन लाल", "बंसी लाल", "देवी लाल", "भूपेंद्र सिंह हुड्डा"], oe: ["Bhajan Lal", "Bansi Lal", "Devi Lal", "Bhupinder Singh Hooda"], a: 0 },
  { id: 86, h: "'केंद्रीय मृदा लवणता अनुसंधान संस्थान' (CSSRI) हरियाणा के किस शहर में स्थित है?", e: "In which city of Haryana is the 'Central Soil Salinity Research Institute' (CSSRI) located?", oh: ["हिसार", "करनाल", "रोहतक", "कुरुक्षेत्र"], oe: ["Hisar", "Karnal", "Rohtak", "Kurukshetra"], a: 1 },
  { id: 87, h: "हरियाणा का कौन सा जिला विशेष रूप से 'मिट्टी के बर्तनों' (Pottery) और क्ले आर्ट के लिए राष्ट्रीय स्तर पर पहचाना जाता है?", e: "Which district of Haryana is specifically recognized nationally for 'Pottery' and clay art?", oh: ["झज्जर", "रोहतक", "गुरुग्राम (सिकंदरपुर)", "फरीदाबाद"], oe: ["Jhajjar", "Rohtak", "Gurugram (Sikanderpur)", "Faridabad"], a: 0 },
  { id: 88, h: "(Math) एक वस्तु को ₹450 में बेचने पर एक दुकानदार को 10% की हानि होती है। 10% का लाभ कमाने के लिए उसे वस्तु को किस मूल्य पर बेचना चाहिए?", e: "(Math) By selling an article for ₹450, a shopkeeper makes a loss of 10%. At what price should he sell the article to make a profit of 10%?", oh: ["₹500", "₹600", "₹550", "₹525"], oe: ["₹500", "₹600", "₹550", "₹525"], a: 2 },
  { id: 89, h: "हरियाणा सरकार की 'चिरायु योजना' का मुख्य उद्देश्य राज्य के नागरिकों को क्या प्रदान करना है?", e: "What is the main objective of Haryana Government's 'Chirayu Yojana' to provide to the citizens of the state?", oh: ["मुफ्त शिक्षा", "₹5 लाख तक का मुफ्त स्वास्थ्य बीमा (Health Insurance)", "सौर ऊर्जा सब्सिडी", "बेरोजगारी भत्ता"], oe: ["Free education", "Free Health Insurance up to ₹5 lakh", "Solar energy subsidy", "Unemployment allowance"], a: 1 },
  { id: 90, h: "भौगोलिक दृष्टि से हरियाणा का कौन सा जिला तीन ओर से राजस्थान राज्य से घिरा हुआ है?", e: "Geographically, which district of Haryana is surrounded by the state of Rajasthan on three sides?", oh: ["महेंद्रगढ़", "रेवाड़ी", "सिरसा", "मेवात"], oe: ["Mahendragarh", "Rewari", "Sirsa", "Mewat"], a: 0 },
  { id: 91, h: "कंप्यूटर नेटवर्किंग में 'IPv6' (Internet Protocol version 6) एड्रेस का साइज कितने बिट्स का होता है?", e: "In computer networking, what is the size of an 'IPv6' (Internet Protocol version 6) address in bits?", oh: ["32 बिट्स", "128 बिट्स", "64 बिट्स", "256 बिट्स"], oe: ["32 bits", "128 bits", "64 bits", "256 bits"], a: 1 },
  { id: 92, h: "MS Word 2019 में, किसी वाक्य को बिना माउस के केवल कीबोर्ड शॉर्टकट से 'Subscript' (जैसे H2O में 2) करने की शॉर्टकट कुंजी क्या है?", e: "In MS Word 2019, what is the shortcut key to format a sentence as 'Subscript' (like 2 in H2O) using only the keyboard without a mouse?", oh: ["Ctrl + Shift + +", "Alt + Shift + S", "Ctrl + =", "Ctrl + Shift + <"], oe: ["Ctrl + Shift + +", "Alt + Shift + S", "Ctrl + =", "Ctrl + Shift + <"], a: 2 },
  { id: 93, h: "कंप्यूटर सुरक्षा में 'Ransomware' का मुख्य कार्य क्या होता है?", e: "What is the main function of 'Ransomware' in computer security?", oh: ["कंप्यूटर की गति बढ़ाना", "फाइलों को एन्क्रिप्ट करके उन्हें खोलने के बदले फिरौती (Money) मांगना", "ईमेल को डिलीट करना", "विज्ञापनों को दिखाना"], oe: ["Speed up the computer", "Encrypt files and demand a ransom (Money) in exchange for opening them", "Delete emails", "Show advertisements"], a: 1 },
  { id: 94, h: "किस कंप्यूटर पीढ़ी (Generation) में पहली बार 'Core microprocessors' और 'Ultrashort-scale integration' (ULSI) तकनीक का उपयोग शुरू हुआ?", e: "In which computer generation was the use of 'Core microprocessors' and 'Ultrashort-scale integration' (ULSI) technology first started?", oh: ["चौथी पीढ़ी", "तीसरी पीढ़ी", "पाँचवीं पीढ़ी", "दूसरी पीढ़ी"], oe: ["Fourth generation", "Third generation", "Fifth generation", "Second generation"], a: 2 },
  { id: 95, h: "कंप्यूटर की मुख्य मेमोरी (RAM) और प्रोसेसर (CPU) के बीच डेटा ट्रांसफर की गति के अंतर को कम करने के लिए किस अत्यंत तीव्र गति वाली स्टेटिक मेमोरी का उपयोग किया जाता है?", e: "To reduce the difference in data transfer speed between a computer's main memory (RAM) and the processor (CPU), which extremely high-speed static memory is used?", oh: ["वर्चुअल मेमोरी", "फ्लैश ड्राइव", "कैश मेमोरी (Cache Memory)", "रोम"], oe: ["Virtual memory", "Flash drive", "Cache Memory", "ROM"], a: 2 },
  { id: 96, h: "डेटाबेस मैनेजमेंट सिस्टम में 'SQL' का पूर्ण रूप क्या होता है?", e: "What is the full form of 'SQL' in Database Management System?", oh: ["Structured Query Language", "Simple Queue System", "Standard Query Logic", "Sequential Query Law"], oe: ["Structured Query Language", "Simple Queue System", "Standard Query Logic", "Sequential Query Law"], a: 0 },
  { id: 97, h: "MS Excel में किसी एक्टिव सेल के अंदर लगे फॉर्मूले को एडिट करने या उसकी पूरी सामग्री को देखने के लिए कीबोर्ड की किस फंक्शन की (Function Key) का उपयोग किया जाता है?", e: "In MS Excel, which keyboard Function Key is used to edit a formula applied inside an active cell or to view its entire contents?", oh: ["F1", "F5", "F2", "F9"], oe: ["F1", "F5", "F2", "F9"], a: 2 },
  { id: 98, h: "कंप्यूटर आर्किटेक्चर में, कर्सर के ठीक बाईं ओर (Left side) के एक पूरे शब्द (Word) को एक साथ मिटाने के लिए किस की-कॉम्बिनेशन का उपयोग किया जाता है?", e: "In computer architecture, which key combination is used to delete an entire word completely at once just to the left side of the cursor?", oh: ["Backspace", "Shift + Delete", "Ctrl + Backspace", "Ctrl + Delete"], oe: ["Backspace", "Shift + Delete", "Ctrl + Backspace", "Ctrl + Delete"], a: 2 },
  { id: 99, h: "सुपर कंप्यूटर की गति को मापने के लिए सामान्यतः किस इकाई (Unit) का उपयोग किया जाता है?", e: "Which unit is generally used to measure the speed of a supercomputer?", oh: ["MIPS", "FLOPS (Floating Point Operations Per Second)", "Mbps", "GHz"], oe: ["MIPS", "FLOPS (Floating Point Operations Per Second)", "Mbps", "GHz"], a: 1 },
  { id: 100, h: "इनमें से कौन सा एक ओपन-सोर्स (Open-source) ऑपरेटिंग सिस्टम का उदाहरण है जिसका सोर्स कोड इंटरनेट पर मुफ्त उपलब्ध है?", e: "Which of the following is an example of an open-source operating system whose source code is freely available on the Internet?", oh: ["Windows 11", "macOS", "Linux (Ubuntu)", "MS Office 365"], oe: ["Windows 11", "macOS", "Linux (Ubuntu)", "MS Office 365"], a: 2 }
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(100 * 60); // 100 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [language, setLanguage] = useState('hi'); // 'hi' or 'en'
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleOptionSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    
    questionsData.forEach((q, index) => {
      if (answers[index] === q.a) {
        correctCount++;
      }
    });

    const accuracy = ((correctCount / questionsData.length) * 100).toFixed(2);
    // Mock Rank logic: Calculate rank out of 1000 candidates based on score. 
    // Higher score = better (lower) rank number.
    const mockRank = Math.max(1, 1000 - (correctCount * 10) + Math.floor(Math.random() * 20));

    setResults({
      score: correctCount,
      total: questionsData.length,
      accuracy,
      rank: mockRank
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const q = questionsData[currentQuestionIndex];
  const questionText = language === 'hi' ? q.h : q.e;
  const optionsList = language === 'hi' ? q.oh : q.oe;

  if (showAnalysis) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <h2>Test Analysis</h2>
        <button onClick={() => setShowAnalysis(false)} style={btnStyle}>Back to Results</button>
        <button onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')} style={{...btnStyle, marginLeft: '10px', background: '#555'}}>
          Translate to {language === 'hi' ? 'English' : 'Hindi'}
        </button>
        <hr />
        {questionsData.map((quest, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === quest.a;
          const isAttempted = userAnswer !== undefined;

          return (
            <div key={quest.id} style={{ marginBottom: '20px', padding: '15px', border: `2px solid ${isAttempted ? (isCorrect ? 'green' : 'red') : 'gray'}`, borderRadius: '5px' }}>
              <h4>Q{quest.id}. {language === 'hi' ? quest.h : quest.e}</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {(language === 'hi' ? quest.oh : quest.oe).map((opt, oIdx) => {
                  let bgColor = 'transparent';
                  if (oIdx === quest.a) bgColor = '#d4edda'; // Correct answer highlights green
                  else if (oIdx === userAnswer && !isCorrect) bgColor = '#f8d7da'; // Wrong chosen answer highlights red

                  return (
                    <li key={oIdx} style={{ padding: '8px', background: bgColor, borderRadius: '4px', marginBottom: '5px' }}>
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </li>
                  );
                })}
              </ul>
              <p>
                <strong>Status:</strong> {isAttempted ? (isCorrect ? '✅ Correct' : '❌ Incorrect') : '⚠️ Unattempted'}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  if (isSubmitted && results) {
    return (
      <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h2>Test Submitted Successfully!</h2>
        <h1>Score: {results.score} / {results.total}</h1>
        <h3>Accuracy: {results.accuracy}%</h3>
        <h3>Your Rank: {results.rank} out of 1000 candidates</h3>
        
        <div style={{ marginTop: '30px' }}>
          <button onClick={() => setShowAnalysis(true)} style={btnStyle}>View Test Analysis</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Time Left: <span style={{ color: timeLeft < 600 ? 'red' : 'black' }}>{formatTime(timeLeft)}</span></h2>
        <div>
          <button onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')} style={{...btnStyle, background: '#333', marginRight: '10px'}}>
            Translate: {language === 'hi' ? 'Eng' : 'हिन्दी'}
          </button>
          <button onClick={handleSubmit} style={{...btnStyle, background: '#d9534f'}}>Submit Test</button>
        </div>
      </div>

      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <h3>Question {currentQuestionIndex + 1} of 100</h3>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{questionText}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          {optionsList.map((opt, idx) => (
            <label key={idx} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', background: answers[currentQuestionIndex] === idx ? '#e9ecef' : 'white' }}>
              <input 
                type="radio" 
                name="option" 
                checked={answers[currentQuestionIndex] === idx} 
                onChange={() => handleOptionSelect(idx)}
                style={{ marginRight: '10px' }}
              />
              {String.fromCharCode(65 + idx)}. {opt}
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button 
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} 
          disabled={currentQuestionIndex === 0}
          style={btnStyle}
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentQuestionIndex(prev => Math.min(questionsData.length - 1, prev + 1))} 
          disabled={currentQuestionIndex === questionsData.length - 1}
          style={btnStyle}
        >
          Next
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h4>Question Palette</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {questionsData.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentQuestionIndex(idx)}
              style={{
                width: '35px', height: '35px', 
                background: currentQuestionIndex === idx ? '#007bff' : answers[idx] !== undefined ? '#28a745' : '#e0e0e0',
                color: currentQuestionIndex === idx || answers[idx] !== undefined ? 'white' : 'black',
                border: 'none', borderRadius: '4px', cursor: 'pointer'
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '10px 20px',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
};