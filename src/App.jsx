import React, { useState, useEffect, useCallback } from 'react';

// Complete 100 Questions with full English and Hindi translations
const questions = [
  { id: 1, q: "In python, _________ is raised when an operator is supplied with a value of incorrect data type.", q_hi: "पायथन में, _________ को उठाया जाता है जब किसी ऑपरेटर को गलत डेटा प्रकार के मान के साथ आपूर्ति की जाती है।", options: ["TypeError", "NameError", "ValueError", "SyntaxError"], options_hi: ["टाइपएरर", "नेमएरर", "वैल्यूएरर", "सिंटैक्सएरर"], ans: 0 },
  { id: 2, q: "Gram, Centimeter and Second are measuring units in:", q_hi: "ग्राम, सेंटीमीटर और सेकंड _________ में मापने इकाईयाँ हैं।", options: ["MKS", "FPS", "CGS", "None of these"], options_hi: ["MKS", "FPS", "CGS", "इनमें से कोई नहीं"], ans: 2 },
  { id: 3, q: "The ampere-hour efficiency of a lead acid cell is normally between:", q_hi: "लेड एसिड सेल की एम्पीयर-घंटा दक्षता सामान्यतः किसके बीच होती है?", options: ["20-25%", "40-50%", "60-65%", "90-95%"], options_hi: ["20-25%", "40-50%", "60-65%", "90-95%"], ans: 3 },
  { id: 4, q: "Magnetization current in a transformer produces _________ in transformer core.", q_hi: "एक ट्रांसफॉर्मर में चुंबकीकरण धारा ट्रांसफॉर्मर कोर में _________ उत्पन्न करती है।", options: ["Eddy current", "Flux", "Power", "None of these"], options_hi: ["एड़ी करंट", "फ्लक्स", "शक्ति", "इनमें से कोई नहीं"], ans: 1 },
  { id: 5, q: "The reaction 2RX + 2Na (Dry ether) -> R-R + 2NaX is a _________ reaction.", q_hi: "अभिक्रिया 2RX + 2Na (Dry ether) -> R-R + 2NaX एक _________ अभिक्रिया है।", options: ["Wurtz-Fittig", "Fittig", "Wurtz", "Kolbe’s"], options_hi: ["वुर्ज-फिटिग", "फिटिग", "वुर्ज", "कोल्बे"], ans: 2 },
  { id: 6, q: "According to _________ law, the electric flux passing through any closed surface is equal to the total charge enclosed by the surface.", q_hi: "_________ नियम के अनुसार, किसी भी बंद सतह से गुजरने वाला विद्युत प्रवाह, सतह द्वारा संलग्न कुल आवेश के बराबर होता है।", options: ["Coulomb's", "Gauss'", "Fleming's", "Kirchoff's"], options_hi: ["कूलंब का", "गॉस का", "फ्लेमिंग का", "किरचॉफ का"], ans: 1 },
  { id: 7, q: "According to Ohm's law, current flowing in a circuit is inversely proportional to:", q_hi: "ओम के नियम के अनुसार, किसी परिपथ में प्रवाहित धारा किसके व्युत्क्रमानुपाती होती है?", options: ["Voltage", "Power", "Resistance", "All of the above"], options_hi: ["वोल्टेज", "पावर", "प्रतिरोध", "उपर्युक्त सभी"], ans: 2 },
  { id: 8, q: "Machine generating a.c. e.m.f. are called as:", q_hi: "ए.सी. ई.एम.एफ. उत्पन्न करने वाली मशीन को क्या कहा जाता है?", options: ["Alternators", "Transformers", "Modulators", "None of these"], options_hi: ["अल्टरनेटर्स", "ट्रान्सफॉर्मर्स", "माड्युलेटर्स", "इनमें से कोई नहीं"], ans: 0 },
  { id: 9, q: "Which of the following is not a multi-user/multitasking operating system?", q_hi: "निम्न में से कौन-सा मल्टी-यूज़र / मल्टीटास्किंग ऑपरेटिंग सिस्टम नहीं है?", options: ["UNIX", "Virtual Machines (VMS)", "Mainframe", "MS-DOS"], options_hi: ["यूनिक्स", "वर्चुअल मशिन्स (वीएमएस)", "मेनफ्रेम", "एमएस-डॉस"], ans: 3 },
  { id: 10, q: "The type of earthing suitable for sandy areas is:", q_hi: "रेतीले क्षेत्रों के लिए उपयुक्त अर्थिंग का प्रकार है:", options: ["Horizontal strip earthing", "Rod earthing", "Plate earthing", "Pipe earthing"], options_hi: ["क्षैतिज पट्टी अर्थिंग", "छड़ अर्थिंग", "प्लेट अर्थिंग", "पाइप अर्थिंग"], ans: 1 },
  { id: 11, q: "Which of the following is not a traffic sign?", q_hi: "निम्नलिखित में से कौन-सा यातायात चिन्ह नहीं है ?", options: ["Mandatory/regulatory signs", "Cautionary signs", "Movement signs", "Information signs"], options_hi: ["अनिवार्य/नियामक चिन्ह", "सावधान करने वाले चिन्ह", "गति-विधि के चिन्ह", "सूचना चिन्ह"], ans: 2 },
  { id: 12, q: "Which city is known as Queen of the Arabian Sea?", q_hi: "किस शहर को अरब सागर की रानी के रूप में जाना जाता है ?", options: ["Diu", "Kochi", "Mumbai", "None of the above"], options_hi: ["दीव", "कोच्चि", "मुंबई", "उपर्युक्त में से कोई नहीं"], ans: 1 },
  { id: 13, q: "A 6 pole induction motor is supplied by a 10 pole alternator which is driven at 600 rpm. If the motor is running at 970 rpm, determine the percentage slip.", q_hi: "एक 6 पोल इंडक्शन मोटर की आपूर्ति 10 पोल अल्टरनेटर द्वारा की जाती है जो 600 rpm पर संचालित होती है। यदि मोटर 970 rpm पर चल रही है, तो प्रतिशत स्लिप निर्धारित करें ।", options: ["1%", "2%", "3%", "5%"], options_hi: ["1%", "2%", "3%", "5%"], ans: 2 },
  { id: 14, q: "With amount of current (I), resistance (R) and time of current flow (T), the formula for converting electrical energy to heat energy (H) is:", q_hi: "विद्युत धारा की मात्रा (I), प्रतिरोध (R) और विद्युत धारा प्रवाह के समय (T) के साथ विद्युत ऊर्जा को ऊष्मा ऊर्जा (H) में परिवर्तित करने का सूत्र है", options: ["H = IRT", "H = I²RT", "H = IR", "H = V/R"], options_hi: ["H = IRT", "H = I²RT", "H = IR", "H = V/R"], ans: 1 },
  { id: 15, q: "The practical voltage source has emf of E volts and internal resistance is r ohms. If it supplies a load current of I amperes, the terminal voltage is:", q_hi: "व्यावहारिक वोल्टेज स्रोत में E वोल्ट का emf है और आंतरिक प्रतिरोध r ओम है। यदि यह I एम्पीयर की लोड धारा की आपूर्ति करता है, तो टर्मिनल वोल्टेज क्या है ?", options: ["E", "E/r", "Ir", "E - Ir"], options_hi: ["E", "E/r", "Ir", "E - Ir"], ans: 3 },
  { id: 16, q: "Which of the following type of instruments are non-directional and can be used for measuring both AC and DC values of current and voltage?", q_hi: "निम्नलिखित में से कौन-सा प्रकार का उपकरण गैर-दिशात्मक है और इसका उपयोग करंट और वोल्टेज के AC और DC दोनों मानों को मापने के लिए किया जा सकता है ?", options: ["Moving iron type", "Moving coil type", "Dynamometer type", "Induction type"], options_hi: ["गतिशील लौह प्रकार", "गतिमान कुंडल प्रकार", "डायनेमोमीटर प्रकार", "प्रेरण प्रकार"], ans: 0 },
  { id: 17, q: "The members of rhodophyceae are commonly called:", q_hi: "रोडोफाइकी के सदस्य सामान्यतः कहलाते हैं ।", options: ["Red algae", "Green algae", "Blue algae", "Brown algae"], options_hi: ["लाल शैवाल", "हरी शैवाल", "नीली शैवाल", "भूरी शैवाल"], ans: 0 },
  { id: 18, q: "The top and bottom horizontal portion of the transformer core is:", q_hi: "ट्रांसफार्मर कोर का ऊपरी और निचला क्षैतिज भाग है", options: ["Yoke", "Limb", "Winding", "Conservator"], options_hi: ["योक", "लिम्ब", "वाइन्डिंग", "कन्सर्वेटर"], ans: 0 },
  { id: 19, q: "In delta connected system, the relation between the line current IL and phase current Iph is:", q_hi: "डेल्टा कनेक्टेड सिस्टम में लाइन करंट IL और फेज़ करंट Iph के बीच संबंध होता है", options: ["IL = Iph", "IL = Iph/√3", "IL = √3Iph", "IL = 3Iph"], options_hi: ["IL = Iph", "IL = Iph/√3", "IL = √3Iph", "IL = 3Iph"], ans: 2 },
  { id: 20, q: "The average value of sine wave is _________ times the peak value.", q_hi: "साइन तरंग का औसत मान पीक मान का _________ गुना है।", options: ["1.414", "0.637", "0.5", "1.732"], options_hi: ["1.414", "0.637", "0.5", "1.732"], ans: 1 },
  { id: 21, q: "Capacitance is a ratio of:", q_hi: "धारिता का अनुपात है", options: ["Voltage to voltage", "Voltage to charge", "Charge to voltage", "Charge to charge"], options_hi: ["वोल्टेज का वोल्टेज से", "वोल्टेज का चार्ज से", "चार्ज का वोल्टेज से", "चार्ज का चार्ज से"], ans: 2 },
  { id: 22, q: "The term 'Ecosystem' was first coined by:", q_hi: "'इकोसिस्टम' शब्द सबसे पहले किसके द्वारा गढ़ा गया था ?", options: ["Sir Arthur G. Tansley", "Salim Ali", "James Hansen", "Rachel Carson"], options_hi: ["सर आर्थर जी. टांसले", "सलीम अली", "जेम्स हैनसेन", "राचेल कार्सन"], ans: 0 },
  { id: 23, q: "_________ is used to measure the width of wires.", q_hi: "_________ का उपयोग तारों की चौड़ाई मापने के लिए किया जाता है।", options: ["Try square", "Mallet", "Wire gauge", "None of these"], options_hi: ["ट्राई स्क्वायर", "लकड़ी का हथौड़ा (मैलेट)", "तार गेज", "इनमें से कोई नहीं"], ans: 2 },
  { id: 24, q: "The shunt resistance in an ammeter is usually:", q_hi: "एमीटर में शंट प्रतिरोध आमतौर पर होता है", options: ["less than meter resistance", "equal to meter resistance", "more than meter resistance", "of any value"], options_hi: ["मीटर प्रतिरोध से कम", "मीटर प्रतिरोध के बराबर", "मीटर प्रतिरोध से अधिक", "किसी भी मूल्य का"], ans: 0 },
  { id: 25, q: "The reciprocal of impedance of a circuit is called:", q_hi: "किसी परिपथ की प्रतिबाधा का व्युत्क्रम कहलाता है", options: ["Resistance", "Inductance", "Capacitance", "Admittance"], options_hi: ["प्रतिरोध", "प्रेरकता", "धारिता", "प्रवेश"], ans: 3 },
  { id: 26, q: "The seeds of the Internet were planted in:", q_hi: "इंटरनेट के बीज _________ में बोए गए थे।", options: ["1891", "1991", "1969", "1990"], options_hi: ["1891", "1991", "1969", "1990"], ans: 2 },
  { id: 27, q: "The resistance of a lamp is 10 ohms and current through it is 2A. Its power is:", q_hi: "एक लैंप का प्रतिरोध 10 ओम है और इसके माध्यम से धारा 2A है। इसकी शक्ति है", options: ["10 W", "20 W", "30 W", "40 W"], options_hi: ["10 W", "20 W", "30 W", "40 W"], ans: 3 },
  { id: 28, q: "A transformer operates at maximum efficiency when:", q_hi: "एक ट्रांसफार्मर अधिकतम दक्षता पर तब कार्य करता है जब", options: ["Core losses is minimum", "Iron losses is minimum", "Copper losses is minimum", "Copper loss = Iron loss"], options_hi: ["कोर की हानि न्यूनतम होती है", "लोहे की हानि न्यूनतम होती है", "तांबे की हानि न्यूनतम होती है", "तांबे की हानि = लोहे की हानि"], ans: 3 },
  { id: 29, q: "The percentage errors in the measurement of mass and speed are 2% and 3% respectively. Maximum error in the estimation of the kinetic energy is:", q_hi: "द्रव्यमान और गति के माप में प्रतिशत त्रुटि क्रमशः 2% और 3% हैं। द्रव्यमान और गति को मापने के द्वारा प्राप्त गतिज ऊर्जा के अनुमान में अधिकतम त्रुटि कितनी होगी ?", options: ["11%", "8%", "5%", "1%"], options_hi: ["11%", "8%", "5%", "1%"], ans: 1 },
  { id: 30, q: "This ability of a charged particle to do the work is called:", q_hi: "किसी आवेशित कण की कार्य करने की क्षमता को क्या कहा जाता है ?", options: ["Coulomb", "Electrical power", "Electric potential", "Electrical resistance"], options_hi: ["कूलम्ब", "विद्युतीय शक्ति", "विद्युत संभाव्यता", "विद्युतीय प्रतिरोध"], ans: 2 },
  { id: 31, q: "'5S' is a system used in:", q_hi: "'5S' प्रणाली का प्रयोग _________ में किया जाता है।", options: ["Production practices", "Safety practices", "House-keeping practices", "Electrical manufacturing"], options_hi: ["उत्पादन प्रथाओं में", "सुरक्षा प्रथाओं में", "गृह-व्यवस्था की प्रथाओं में", "विद्युत विनिर्माण में"], ans: 2 },
  { id: 32, q: "Under this Mughal ruler, Haryana came under the control of Britishers:", q_hi: "इस मुगल शासक के अधीन होने पर, हरियाणा ब्रिटिशों के नियंत्रण में आया", options: ["Mohammad Shah", "Shah Alam", "Ahmed Shah", "Bahadur Shah Jaffer"], options_hi: ["मोहम्मद शाह", "शाह आलम", "अहमद शाह", "बहादुर शाह जफर"], ans: 1 },
  { id: 33, q: "Which type of wire joint is found in the junction box?", q_hi: "जंक्शन बॉक्स में किस प्रकार का तार जोड़ पाया जाता है ?", options: ["Rattail joint", "Plain tap joint", "Aerial tap joint", "None of these"], options_hi: ["रैटेल जॉइंट", "प्लेन टैप जॉइंट", "एरियल टैप जॉइंट", "इनमें से कोई नहीं"], ans: 0 },
  { id: 34, q: "The average power delivered to an impedance (4-j3) by a current 5cos(100πt+100) A is:", q_hi: "विद्युत 5 cos (100πt+100) A द्वारा प्रतिबाधा (4 - j3) को दी गई औसत शक्ति है", options: ["44.2 W", "50 W", "62.5 W", "125 W"], options_hi: ["44.2 W", "50 W", "62.5 W", "125 W"], ans: 1 },
  { id: 35, q: "In DC generators, the effect of the magnetic field set up by the armature current on the distribution of the flux under main poles is known as:", q_hi: "डीसी जनरेटर में, मुख्य ध्रुवों के नीचे प्रवाह के वितरण पर आर्मेचर धारा द्वारा स्थापित चुंबकीय क्षेत्र के प्रभाव को क्या कहा जाता है ?", options: ["Armature resistance", "Armature effect", "Armature reaction", "None of these"], options_hi: ["आर्मेचर प्रतिरोध", "आर्मेचर प्रभाव", "आर्मेचर प्रतिक्रिया", "इनमें से कोई नहीं"], ans: 2 },
  { id: 36, q: "The end from which elements are added or deleted is called _________ of the stack.", q_hi: "जिस छोर से तत्वों को जोड़े या हटाए जाते हैं, उसे स्टैक का _________ कहा जाता है।", options: ["Top", "Bottom", "Front", "Rear"], options_hi: ["टॉप", "बॉटम", "फ्रन्ट", "रीयर"], ans: 0 },
  { id: 37, q: "Unknown frequency can be measured using:", q_hi: "अज्ञात आवृत्ति _________ का उपयोग करके मापा जा सकता है।", options: ["Anderson's bridge", "Maxwell's bridge", "De Sauty's bridge", "Wien's bridge"], options_hi: ["एंडरसन का पुल", "मैक्सवेल का पुल", "डी सॉटी का पुल", "वियन का पुल"], ans: 3 },
  { id: 38, q: "Sign of children near road shows possibility of _________ nearby.", q_hi: "सड़क के पास बच्चों का चिन्ह आस-पास _________ की संभावना दर्शाता है ।", options: ["School", "Park", "Home", "Hospital"], options_hi: ["स्कूल", "पार्क", "घर", "अस्पताल"], ans: 0 },
  { id: 39, q: "Moradabad is famous for:", q_hi: "मुरादाबाद किसके लिए प्रसिद्ध है ?", options: ["Brass industry", "Sandal oil", "Newsprint factory", "Penicillin factory"], options_hi: ["पीतल उद्योग", "चंदन का तेल", "अखबारी कागज का कारखाना", "पेनिसिलिन का कारखाना"], ans: 0 },
  { id: 40, q: "In domestic wiring, a switch is always placed in the:", q_hi: "घरेलू वायरिंग में एक स्विच हमेशा कहाँ लगाया जाता है ?", options: ["Earth wire", "Neutral wire", "Live wire", "None of these"], options_hi: ["अर्थ वायर", "तटस्थ तार", "विद्युत्मय तार", "इनमें से कोई नहीं"], ans: 2 },
  { id: 41, q: "6 ohm and 4 ohm resistors are connected in parallel through 240V supply. Total current flowing through the circuit is:", q_hi: "6 ओम और 4 ओम प्रतिरोधक 240 V आपूर्ति के माध्यम से समानांतर में जुड़े हुए हैं। परिपथ के माध्यम से प्रवाहित होने वाली कुल विद्युत धारा है", options: ["10 A", "100 A", "24 A", "None of these"], options_hi: ["10 A", "100 A", "24 A", "इनमें से कोई नहीं"], ans: 1 },
  { id: 42, q: "Gurugram-Manesar-Bawal region of Haryana is famous for the production of:", q_hi: "हरियाणा का गुरुग्राम-मानेसर-बावल क्षेत्र _________ के उत्पादन हेतु प्रसिद्ध है ।", options: ["Pharmaceuticals", "Sugar", "Cotton", "Automobiles"], options_hi: ["फार्मास्यूटिकल", "चीनी", "सूत", "ऑटोमोबाईल"], ans: 3 },
  { id: 43, q: "The equipment connected between the conductor and ground, to discharge the excessive voltages to earth is:", q_hi: "अत्यधिक वोल्टेज को पृथ्वी पर डिस्चार्ज करने के लिए कंडक्टर और जमीन के बीच जुड़ा उपकरण है", options: ["Current transformer", "Voltage transformer", "Relay", "Lighting arrester"], options_hi: ["करंट ट्रांसफॉर्मर", "वोल्टेज ट्रांसफॉर्मर", "रिले", "लाइटिंग अरेस्टर"], ans: 3 },
  { id: 44, q: "A 2 HP motor 3 hours daily, 100 W lamp 12 hours daily and 1000 W heater 3 hours daily. Total energy consumed in 30 days is:", q_hi: "एक कारखाने में, निम्नलिखित उपकरण चालू हैं : 2 HP मोटर प्रतिदिन 3 घंटे, 100 W लैंप प्रतिदिन 12 घंटे और 1000 W हीटर प्रतिदिन 3 घंटे । 30 दिनों के एक महीने में खपत की गई ऊर्जा की कुल मात्रा कितनी है ?", options: ["134.28 kWh", "36 kWh", "90 kWh", "260.28 kWh"], options_hi: ["134.28 kWh", "36 kWh", "90 kWh", "260.28 kWh"], ans: 3 },
  { id: 45, q: "The first battle of Tarain was fought in:", q_hi: "तराइन का प्रथम युद्ध कब लड़ा गया था ?", options: ["1192", "1191", "1121", "1091"], options_hi: ["1192", "1191", "1121", "1091"], ans: 1 },
  { id: 46, q: "In measuring instruments, under equilibrium condition, controlling torque (Tc) and deflecting torque (Td) are:", q_hi: "मापने वाले उपकरणों में संतुलन की स्थिति के तहत नियंत्रित बलाघूर्ण (Tc) और विक्षेपित बलाघूर्ण (Td) होते हैं", options: ["Tc = Td", "Tc > Td", "Tc < Td", "None of these"], options_hi: ["Tc = Td", "Tc > Td", "Tc < Td", "इनमें से कोई नहीं"], ans: 0 },
  { id: 47, q: "What is the frequency of an ac current i = 42.42 sin(628t)?", q_hi: "ac धारा i = 42.42 sin 628t की आवृत्ति क्या है ?", options: ["50 Hz", "100 Hz", "200 Hz", "628 Hz"], options_hi: ["50 Hz", "100 Hz", "200 Hz", "628 Hz"], ans: 1 },
  { id: 48, q: "In python, each dictionary item is a key value pair, separated through:", q_hi: "पायथन में, प्रत्येक शब्दकोश आइटम एक महत्वपूर्ण मूल्य जोड़ी है, जिसे _________ द्वारा अलग किया जाता है ।", options: [";", ",", "+", ":"], options_hi: [";", ",", "+", ":"], ans: 3 },
  { id: 49, q: "The EMF induced in a conductor is measured by:", q_hi: "किसी चालक में प्रेरित ई.एम.एफ. किसके द्वारा मापा जाता है ?", options: ["Ohm", "Watt", "Volt", "Ampere"], options_hi: ["ओम", "वॉट", "वोल्ट", "एम्पीयर"], ans: 2 },
  { id: 50, q: "_________ is switching device capable of making, carrying and breaking electric current under normal and overload conditions.", q_hi: "_________ स्विचिंग डिवाइस सामान्य और अधिभार स्थितियों के तहत विद्युत धारा को बनाने, ले जाने और तोड़ने में सक्षम है।", options: ["Fuse", "HRC fuse", "Lighting arrestor", "Contactor"], options_hi: ["फ्यूज", "एच.आर.सी. फ्यूज", "प्रकाश बन्दी", "संपर्ककर्ता"], ans: 3 },
  { id: 51, q: "Which alphabet will come in the place of question mark? D, K, S, B, L, ?", q_hi: "प्रश्न चिह्न के स्थान पर कौन-सा अक्षर आएगा ? D, K, S, B, L, ?", options: ["X", "Y", "Z", "W"], options_hi: ["X", "Y", "Z", "W"], ans: 3 },
  { id: 52, q: "Which of the following materials is a good semiconductor?", q_hi: "निम्नलिखित में से कौन-सा पदार्थ एक अच्छा अर्धचालक है ?", options: ["Copper", "Mica", "Porcelain", "Germanium"], options_hi: ["ताँबा", "अभ्रक", "चीनी-मिट्टी", "जर्मेनियम"], ans: 3 },
  { id: 53, q: "The polarity of voltage drop across a resistor is determined by:", q_hi: "किसी प्रतिरोधक में वोल्टेज ड्रॉप की ध्रुवीयता किसके द्वारा निर्धारित की जाती है ?", options: ["The value of resistor", "The value of current", "Direction of current in resistor", "The polarity of source"], options_hi: ["प्रतिरोधक का मान", "विद्युत धारा का मान", "प्रतिरोधक में विद्युत धारा की दिशा", "स्रोत की ध्रुवीयता"], ans: 2 },
  { id: 54, q: "The ancient sites of Kunal and Banawali in Fatehabad district of Haryana are located on the banks of river:", q_hi: "हरियाणा के फतेहाबाद जिले में कुणाल और बनावली के प्राचीन स्थल _________ नदी के किनारे स्थित हैं।", options: ["Yamuna", "Markanda", "Ghaggar", "Saraswati"], options_hi: ["यमुना", "मार्कंडा", "घग्घर", "सरस्वती"], ans: 3 },
  { id: 55, q: "Hysteresis loss is a type of:", q_hi: "हिस्टैरिसीस हानि एक प्रकार है", options: ["Copper loss", "Iron loss", "Mechanical loss", "Friction loss"], options_hi: ["तांबे की हानि", "लोहे की हानि", "यांत्रिक हानि", "घर्षण हानि"], ans: 1 },
  { id: 56, q: "For a 'P' pole lap wound armature of DC machine, the number of parallel paths are equal to:", q_hi: "DC मशीन के 'P' पोल लैप वाउण्ड आर्मेचर के लिए समानांतर पथों की संख्या किसके बराबर होती है ?", options: ["2", "2P", "P", "P/2"], options_hi: ["2", "2P", "P", "P/2"], ans: 2 },
  { id: 57, q: "A _________ is used to make or break an electrical circuit.", q_hi: "विद्युत परिपथ को बनाने या तोड़ने के लिए _________ का उपयोग किया जाता है ।", options: ["Switch", "Fuse", "Potentiometer", "Wattmeter"], options_hi: ["स्विच", "फ्यूज", "विभवमापी", "वॉटमीटर"], ans: 0 },
  { id: 58, q: "The Champaran Satyagraha was organised against the British:", q_hi: "अंग्रेजों के खिलाफ चंपारण सत्याग्रह का आयोजन किस लिए किया गया था ?", options: ["For increasing salary", "Against refusal of remission", "For forcing farmers to grow Indigo", "To protest against Jallianwalabagh"], options_hi: ["मिल श्रमिकों के वेतन में वृद्धि के लिए", "राजस्व में छूट से इनकार के विरुद्ध", "किसानों को नील की खेती के लिए मजबूर करने पर", "जलियांवाला बाग नरसंहार के खिलाफ विरोध प्रदर्शन के लिए"], ans: 2 },
  { id: 59, q: "A type of protection which depends only the magnitude of current, without taking any cognizance of its phase angle, is known as:", q_hi: "एक प्रकार की सुरक्षा जो इसके चरण कोण का संज्ञान लिए बिना केवल धारा के परिमाण पर निर्भर करती है, कहलाती है", options: ["Over current protection", "Directional over current protection", "Non-directional over current protection", "Directional under current protection"], options_hi: ["अत्यधिक विद्युत धारा संरक्षण", "दिशीय अत्यधिक विद्युत धारा संरक्षण", "अदिशीय अत्यधिक विद्युत धारा संरक्षण", "दिशीय न्यून विद्युत धारा संरक्षण"], ans: 2 },
  { id: 60, q: "In a diode, flow of current is:", q_hi: "डायोड में धारा का प्रवाह होता है", options: ["Unidirectional", "Bidirectional", "Reverse", "None of these"], options_hi: ["एकदिशीय", "द्विदिशीय", "रिवर्स", "इनमें से कोई नहीं"], ans: 0 },
  { id: 61, q: "Diversity factor is the ratio of the sum of individual maximum demands to the _________ on the power station.", q_hi: "विविधता कारक पावर स्टेशन पर व्यक्तिगत अधिकतम मांगों के योग और _________ का अनुपात है ।", options: ["Maximum demand", "Total demand", "Minimum demand", "Individual demand"], options_hi: ["अधिकतम मांग", "कुल मांग", "न्यूनतम मांग", "व्यक्तिगत मांग"], ans: 0 },
  { id: 62, q: "In Haryana, Surajkund crafts fair is held every year in the month of:", q_hi: "हरियाणा में सूरजकुंड हस्तशिल्प मेला प्रति वर्ष _________ माह में लगता है।", options: ["January", "February", "March", "April"], options_hi: ["जनवरी", "फरवरी", "मार्च", "अप्रैल"], ans: 1 },
  { id: 63, q: "Conductance is measured in the unit:", q_hi: "चालकता को _________ इकाई में मापा जाता है।", options: ["Siemens", "Joule", "Lux", "Lux/m"], options_hi: ["सीमेंस", "जौल", "लक्स", "लक्स/मी."], ans: 0 },
  { id: 64, q: "Which of the following is not a class of permanent magnet material used for electric machines?", q_hi: "निम्नलिखित में से कौन-सा विद्युत मशीनों के लिए प्रयुक्त स्थायी चुंबक सामग्री का एक वर्ग नहीं है ?", options: ["Alnicos", "Ceramics", "Silicon", "Samarium cobalt"], options_hi: ["अल्निकोस", "सिरामिक्स", "सिलिकॉन", "समैरियम कोबाल्ट"], ans: 2 },
  { id: 65, q: "In 4 point starter, the No Volt Release (NVR) coil is connected in the:", q_hi: "4 प्वाइंट स्टार्टर में नो वोल्ट रिलीज (NVR) कॉइल किससे जुड़ा होता है ?", options: ["Field circuit", "Armature circuit", "Across supply line through protective resistance", "Both (A) and (B)"], options_hi: ["फील्ड सर्किट", "आर्मेचर सर्किट", "सुरक्षात्मक प्रतिरोध के माध्यम से आपूर्ति लाइन के पार", "(A) और (B) दोनों"], ans: 2 },
  { id: 66, q: "Which number will come in the place of question mark? 9, 13, 22, 31, ?", q_hi: "प्रश्न चिह्न के स्थान पर कौन-सी संख्या आएगी ? 9, 13, 22, 31, ?", options: ["38", "39", "40", "44"], options_hi: ["38", "39", "40", "44"], ans: 2 },
  { id: 67, q: "Distribution board is also known as a:", q_hi: "वितरण बोर्ड को _________ के नाम से भी जाना जाता है ।", options: ["Breaker panel", "Panel board", "Electric panel", "All of these"], options_hi: ["ब्रेकर पैनल", "पैनल बोर्ड", "विद्युत पैनल", "ये सभी"], ans: 3 },
  { id: 68, q: "_________ is used to insert a new element to the queue at the rear end.", q_hi: "पीछे के सिरे पर क्यू में एक नया तत्व सम्मिलित करने के लिए _________ का उपयोग किया जाता है।", options: ["DEQUEUE", "QUEUE", "DELETE", "ENQUEUE"], options_hi: ["DEQUEUE", "QUEUE", "DELETE", "ENQUEUE"], ans: 3 },
  { id: 69, q: "Radiation is a _________ hazard.", q_hi: "विकिरण एक _________ खतरा है।", options: ["Physical", "Chemical", "Biological", "Mechanical"], options_hi: ["भौतिक", "रासायनिक", "जैविक", "यांत्रिक"], ans: 0 },
  { id: 70, q: "Python allows us to join two strings using concatenation operator plus which is denoted by symbol:", q_hi: "पायथन हमें कॉन्कैटिनेशन ऑपरेटर प्लस का उपयोग करके दो स्ट्रिंग्स में शामिल होने की अनुमति देता है जिसे प्रतीक _________ द्वारा दर्शाया जाता है।", options: ["+", "*", "$", "%"], options_hi: ["+", "*", "$", "%"], ans: 0 },
  { id: 71, q: "Tree system of wiring is most suitable for:", q_hi: "वायरिंग की ट्री प्रणाली किसके लिए सबसे उपयुक्त है ?", options: ["Godown wiring", "Industrial wiring", "Domestic wiring", "Multi-storied building"], options_hi: ["गोदाम की वायरिंग", "औद्योगिक वायरिंग", "घरेलू वायरिंग", "बहुमंजिला भवन"], ans: 3 },
  { id: 72, q: "For all practical purposes, potential of earth is taken as:", q_hi: "सभी व्यावहारिक उद्देश्यों के लिए पृथ्वी के पोटेन्शियल को किस रूप में लिया जाता है ?", options: ["Infinity", "Zero", "One", "None of these"], options_hi: ["अनंत", "शून्य", "एक", "इनमें से कोई नहीं"], ans: 1 },
  { id: 73, q: "Statement: B < O = R ≤ N, R > A ≥ T = E. Conclusions: I. E > N, II. B > T.", q_hi: "कथन: B < O = R ≤ N, R > A ≥ T = E. निष्कर्ष: I. E > N, II. B > T.", options: ["Only I follows", "Only II follows", "Neither I nor II follows", "Both I and II follow"], options_hi: ["केवल I अनुसरण करता है", "केवल II अनुसरण करता है", "न तो I न ही II अनुसरण करता है", "I और II दोनों अनुसरण करते हैं"], ans: 2 },
  { id: 74, q: "A transmission line is said to be an ideal line if:", q_hi: "एक ट्रांसमिशन लाइन को आदर्श लाइन कहा जाता है यदि", options: ["R = 0, G = 0", "RG = L/C", "With a large value of R and G", "RG = √C/L"], options_hi: ["R = 0, G = 0", "RG = L/C", "R और G के बड़े मान के साथ", "RG = √C/L"], ans: 0 },
  { id: 75, q: "An energymeter is _________ instrument.", q_hi: "ऊर्जामीटर _________ उपकरण है ।", options: ["Recording", "Indicating", "Integrating", "None of these"], options_hi: ["रिकॉर्डिंग", "इंडिकेटिंग", "इंटिग्रेटिंग", "इनमें से कोई नहीं"], ans: 2 },
  { id: 76, q: "In python _________ is used to create a list containing a sequence of integers from start to stop value.", q_hi: "पायथन में _________ का उपयोग, स्टार्ट वैल्यू से स्टॉप वैल्यू तक अनुक्रम वाली सूची बनाने के लिए किया जाता है ।", options: ["for", "range()", "while", "continue"], options_hi: ["for", "range()", "while", "continue"], ans: 1 },
  { id: 77, q: "The _________ is a discharge of electricity through a combination of ionized air and vaporized conductor material.", q_hi: "_________ आयनित वायु और वाष्पयुक्त सामग्री के संयोजन के माध्यम से बिजली का निर्वहन है ।", options: ["Fuse", "Power arc", "MCB", "None of these"], options_hi: ["फ्यूज", "पावर आर्क", "एम.सी.बी.", "इनमें से कोई नहीं"], ans: 1 },
  { id: 78, q: "Which of the following circuit breakers doesn't use air or gas as one of their medium?", q_hi: "निम्नलिखित में से कौन-सा सर्किट ब्रेकर अपने माध्यम के रूप में हवा या गैस का उपयोग नहीं करता है ?", options: ["Miniature circuit breaker", "Bulk oil circuit breaker", "Air blast circuit breaker", "SF6 circuit breaker"], options_hi: ["मिनिएचर सर्किट ब्रेकर", "बल्क ऑईल सर्किट ब्रेकर", "एयर ब्लास्ट सर्किट ब्रेकर", "SF6 सर्किट ब्रेकर"], ans: 1 },
  { id: 79, q: "The Udanakootam is the intimate group of the King in the administration of:", q_hi: "उड़नकूटम किसके शासनकाल में राजा का अंतरंग समूह होता था ?", options: ["Pandyas", "Cholas", "Kadambas", "Vardhanas"], options_hi: ["पांड्य", "चोल", "कदंब", "वर्धन"], ans: 1 },
  { id: 80, q: "_________ is an electrical breakdown of a gas that produces a prolonged electrical discharge.", q_hi: "_________ गैस का विद्युत विखंडन है जो लंबे समय तक विद्युत निर्वहन उत्पन्न करता है।", options: ["Electric spark", "Air blast", "Air brake", "Electric arc"], options_hi: ["बिजली की चिंगारी", "वायु विस्फोट", "एयर ब्रेक", "इलेक्ट्रिक आर्क"], ans: 3 },
  { id: 81, q: "The direction of force in a motoring action is determined by:", q_hi: "मोटरिंग क्रिया में बल की दिशा किसके द्वारा निर्धारित होती है ?", options: ["Fleming's right hand rule", "Fleming's left hand rule", "End rule", "Right hand thumb rule"], options_hi: ["फ्लेमिंग का दाहिना हाथ नियम", "फ्लेमिंग का बाएँ हाथ का नियम", "अंत नियम", "दाहिने हाथ के अंगूठे का नियम"], ans: 1 },
  { id: 82, q: "The shape of warning traffic sign is:", q_hi: "चेतावनी ट्राफिक चिन्ह का आकार क्या होता है ?", options: ["Circular", "Square", "Rectangular", "Triangular"], options_hi: ["गोलाकार", "वर्गाकार", "आयताकार", "त्रिकोणीय"], ans: 3 },
  { id: 83, q: "The simplified form of tan⁻¹(x/y) - tan⁻¹((x-y)/(x+y)) is equal to:", q_hi: "tan⁻¹(x/y) - tan⁻¹((x-y)/(x+y)) का सरलीकृत रूप है", options: ["0", "π/4", "π/2", "π"], options_hi: ["0", "π/4", "π/2", "π"], ans: 1 },
  { id: 84, q: "The device that converts optical energy into electrical energy is:", q_hi: "वह उपकरण जो ऑप्टिकल ऊर्जा को विद्युत ऊर्जा में परिवर्तित करता है", options: ["LED", "Photo detector", "Solar cell", "PIN diode"], options_hi: ["एलईडी", "फोटो डिटेक्टर", "सौर सेल", "पिन डायोड"], ans: 2 },
  { id: 85, q: "_________ is a joint formed by joining two pieces of metal edge to edge.", q_hi: "धातु के दो टुकड़ों को किनारे से किनारे तक जोड़कर बना जोड़ है", options: ["Lap joint", "Butt joint", "Tee joint", "Corner joint"], options_hi: ["लैप जोड़", "बट जोड़", "टी जोड़", "कॉर्नर जोड़"], ans: 1 },
  { id: 86, q: "Which of the following is the ideal value of earthing resistance used for large power stations?", q_hi: "बड़े विद्युत स्टेशनों के लिए उपयोग किए जाने वाले अर्थिंग प्रतिरोध का आदर्श मान निम्नलिखित में से कौन-सा है ?", options: ["1 ohm", "0.5 ohm", "5 ohm", "10 ohm"], options_hi: ["1 ओम", "0.5 ओम", "5 ओम", "10 ओम"], ans: 1 },
  { id: 87, q: "Among five characteristics of big data, _________ represents the rate at which the data under consideration are being generated and stored.", q_hi: "बिग डेटा की पांच विशेषताओं में से, _________ उस दर को दर्शाता है जिस पर विचाराधीन डेटा सृजित और संग्रहीत किया जाता है।", options: ["Volume", "Velocity", "Variety", "Veracity"], options_hi: ["वॉल्यूम", "वेलॉसिटी", "वेराइटी", "वेरासिटी"], ans: 1 },
  { id: 88, q: "Fuse is always connected in _________ to the circuit.", q_hi: "फ़्यूज़ हमेशा सर्किट से _________ में जुड़ा होता है।", options: ["Parallel", "Neutral", "Series", "No such specification"], options_hi: ["समानांतर", "तटस्थ", "श्रृंखला", "ऐसी कोई विशिष्टता नहीं है"], ans: 2 },
  { id: 89, q: "The sides of an equilateral triangle are increasing at the rate of 4 cm/sec. The rate at which its area is increasing, when the side is 14 cm is:", q_hi: "एक समबाहु त्रिभुज की भुजाएँ 4 सेमी/से. की दर से बढ़ रही हैं। यदि इसकी भुजा 14 सेमी है, तो क्षेत्रफल के बढ़ने की दर है", options: ["10√3 cm²/sec", "14√3 cm²/sec", "28√3 cm²/sec", "14 cm²/sec"], options_hi: ["10√3 सेमी²/से.", "14√3 सेमी²/से.", "28√3 सेमी²/से.", "14 सेमी²/से."], ans: 2 },
  { id: 90, q: "In 3 phase systems, 3 voltages have same magnitude and frequency but with a phase difference of _________ degrees.", q_hi: "3 चरण प्रणालियों में, 3 वोल्टेज में समान परिमाण और आवृत्ति होती है लेकिन _________ डिग्री के चरण अंतर होते हैं ।", options: ["30", "60", "90", "120"], options_hi: ["30", "60", "90", "120"], ans: 3 },
  { id: 91, q: "The value of resistance is measured by:", q_hi: "प्रतिरोध का मान किसके द्वारा मापा जाता है ?", options: ["Wattmeter", "Ohmmeter", "Voltmeter", "Currentmeter"], options_hi: ["वॉटमीटर", "ओममीटर", "वोल्टमीटर", "करंटमीटर"], ans: 1 },
  { id: 92, q: "Data which have no well-defined structure but maintains internal tags or markings to separate data elements are called:", q_hi: "वह डेटा जिसमें कोई अच्छी तरह से परिभाषित संरचना नहीं है लेकिन डेटा तत्वों को अलग करने के लिए आंतरिक टैग या चिह्नों को बनाए रखता है, जिसे _________ कहा जाता है।", options: ["Structured data", "Unstructured data", "Semi-structured data", "Organized data"], options_hi: ["संरचित डेटा", "असंरचित डेटा", "अर्ध-संरचित डेटा", "संगठित डेटा"], ans: 2 },
  { id: 93, q: "Which safety device should be used while driving a two-wheeler?", q_hi: "दो-पहिया वाहन चलाते समय किस सुरक्षा उपकरण का उपयोग करना चाहिए ?", options: ["Helmet", "Seatbelt", "Airbag", "None of the above"], options_hi: ["हेल्मेट", "सीटबेल्ट", "एयरबैग", "उपरोक्त में से कोई नहीं"], ans: 0 },
  { id: 94, q: "This instrument of Haryana is in the shape of cup containing 2 cymbals and made up of brass:", q_hi: "हरियाणा का यह यंत्र पीतल से बने 2 झांझ वाले कप की आकृति का होता है", options: ["Manjira", "Taasha", "Dholak", "Sarangi"], options_hi: ["मंजीरा", "ताशा", "ढ़ोलक", "सारंगी"], ans: 0 },
  { id: 95, q: "The current in an open circuit is:", q_hi: "खुले परिपथ में धारा कितनी होती है ?", options: ["normally very high", "usually high enough to blow the fuse", "zero", "slightly below normal"], options_hi: ["सामान्यतः बहुत अधिक", "आमतौर पर सर्किट फ्यूज़ को ब्लो करने के लिए पर्याप्त ऊँचा होता है", "शून्य", "सामान्य से थोड़ा नीचे"], ans: 2 },
  { id: 96, q: "_________ is amount of luminous flux given out in a space represented by one unit solid angle by a source having an intensity of one candle power in all directions.", q_hi: "_________ को कैन्डल शक्ति की तीव्रता वाले स्रोत द्वारा एक इकाई ठोस कोण द्वारा दर्शाए गए स्थान में दिए गए ल्यूमिनस फ्लक्स की मात्रा के रूप में परिभाषित किया जाता है।", options: ["Lumen", "Luminous intensity", "Light", "Candela"], options_hi: ["ल्यूमेन", "ल्यूमिनस इंटेन्सिटि", "लाइट", "कैन्डेला"], ans: 0 },
  { id: 97, q: "In a dynamometer wattmeter, the fixed coil is:", q_hi: "डायनेमोमीटर वॉटमीटर में स्थिर कुण्डली होती है", options: ["Current coil", "Potential coil", "Voltage coil", "Resistance coil"], options_hi: ["विद्युत कुंडल", "संभावित कुंडल", "वोल्टेज कुंडल", "प्रतिरोध कुंडल"], ans: 0 },
  { id: 98, q: "The layout of this wiring is done under the plaster of the wall of the building:", q_hi: "इस वायरिंग का लेआउट बिल्डिंग की दीवार के प्लास्टर के नीचे किया जाता है", options: ["Conduit wiring", "Cleat wiring", "Casing-capping", "Concealed wiring"], options_hi: ["कंड्यूट वायरिंग", "क्लीट वायरिंग", "केसिंग-केपिंग", "कंसील्ड वायरिंग"], ans: 3 },
  { id: 99, q: "The probability of happening of an event A is 0.5 and that of B is 0.3. If A and B are mutually exclusive events, then the probability of happening neither A nor B is:", q_hi: "एक घटना A के होने की प्रायिकता 0.5 है और B की 0.3 है। यदि A और B परस्पर अनन्य घटनाएँ हैं, तो न तो A न ही B होने की प्रायिकता है", options: ["0.4", "0.5", "0.2", "0.9"], options_hi: ["0.4", "0.5", "0.2", "0.9"], ans: 2 },
  { id: 100, q: "1 yard is equivalent of _________ feet.", q_hi: "1 गज _________ फीट के बराबर है।", options: ["1", "2", "3", "4"], options_hi: ["1", "2", "3", "4"], ans: 2 }
];

const App = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100 * 60); // 100 Minutes in seconds
  const [results, setResults] = useState({ score: 0, accuracy: 0, rank: 0, unattempted: 0 });
  const [lang, setLang] = useState('en'); // 'en' or 'hi'

  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      handleSubmit();
      return;
    }
    let timer;
    if (!isSubmitted) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleOptionChange = (qId, optionIdx) => {
    if (!isSubmitted) {
      setUserAnswers({ ...userAnswers, [qId]: optionIdx });
    }
  };

  const handleSubmit = useCallback(() => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.ans) correctCount++;
    });

    const totalAttempted = Object.keys(userAnswers).length;
    const accuracy = totalAttempted > 0 ? (correctCount / totalAttempted) * 100 : 0;
    const unattempted = questions.length - totalAttempted;
    
    const mockTotalCandidates = 5000;
    const rank = Math.floor(mockTotalCandidates - (correctCount / questions.length) * mockTotalCandidates) + 1;

    setResults({ score: correctCount, accuracy, rank, unattempted });
    setIsSubmitted(true);
  }, [userAnswers]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <header style={{ position: 'sticky', top: 0, background: '#fff', padding: '15px', borderBottom: '2px solid #ddd', zIndex: 100, boxShadow: '0 4px 6px -6px #222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ margin: 0 }}>HSSC CET ALM Mock Test</h2>
          <button 
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{ padding: '8px 15px', background: '#e0a800', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            A / अ  {lang === 'en' ? 'Translate to Hindi' : 'Translate to English'}
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', color: timeLeft < 300 && !isSubmitted ? '#d9534f' : '#333' }}>
          <strong>{isSubmitted ? (lang === 'en' ? "Test Finished" : "परीक्षण समाप्त") : `⏳ Time Remaining: ${formatTime(timeLeft)}`}</strong>
          <strong>📊 Attempted: {Object.keys(userAnswers).length} / {questions.length}</strong>
        </div>
      </header>

      {!isSubmitted ? (
        <main style={{ marginTop: '20px' }}>
          {questions.map((q, index) => {
            const displayQuestion = lang === 'hi' && q.q_hi ? q.q_hi : q.q;
            return (
              <div key={q.id} style={{ margin: '20px 0', padding: '20px', borderRadius: '8px', background: '#f8f9fa', border: '1px solid #e9ecef' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}><strong>Q{index + 1}:</strong> {displayQuestion}</p>
                {q.options.map((opt, i) => {
                  const displayOption = lang === 'hi' && q.options_hi ? q.options_hi[i] : opt;
                  return (
                    <label key={i} style={{ display: 'block', margin: '10px 0', cursor: 'pointer', padding: '10px', background: '#fff', borderRadius: '5px', border: '1px solid #ced4da' }}>
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={userAnswers[q.id] === i}
                        onChange={() => handleOptionChange(q.id, i)}
                        style={{ marginRight: '10px' }}
                      /> 
                      {displayOption}
                    </label>
                  );
                })}
              </div>
            );
          })}
          <button 
            onClick={handleSubmit}
            style={{ padding: '15px 30px', background: '#007bff', color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: '20px' }}
          >
            {lang === 'hi' ? "टेस्ट सबमिट करें" : "Submit Test"}
          </button>
        </main>
      ) : (
        <section style={{ marginTop: '30px' }}>
          <div style={{ textAlign: 'center', padding: '40px', border: '3px solid #28a745', borderRadius: '15px', background: '#f8fff9', marginBottom: '30px' }}>
            <h2 style={{ color: '#28a745', fontSize: '2rem', margin: '0 0 20px 0' }}>{lang === 'hi' ? "परीक्षा परिणाम" : "Test Results"}</h2>
            <div style={{ fontSize: '1.2rem', lineHeight: '2' }}>
              <p><strong>{lang === 'hi' ? "कुल अंक:" : "Total Score:"}</strong> {results.score} / {questions.length}</p>
              <p><strong>{lang === 'hi' ? "छोड़े गए प्रश्न:" : "Unattempted:"}</strong> {results.unattempted}</p>
              <p><strong>{lang === 'hi' ? "सटीकता:" : "Accuracy:"}</strong> {results.accuracy.toFixed(2)}%</p>
              <p><strong>{lang === 'hi' ? "अनुमानित रैंक:" : "Estimated Rank:"}</strong> #{results.rank} {lang === 'hi' ? "(5,000 उम्मीदवारों में से)" : "out of 5,000 candidates"}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '25px' }}>
              <button 
                onClick={() => window.location.reload()} 
                style={{ padding: '12px 25px', background: '#6c757d', color: '#fff', fontSize: '1.1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                {lang === 'hi' ? "फिर से टेस्ट दें" : "Retake Test"}
              </button>
              <button 
                onClick={() => setShowReview(!showReview)} 
                style={{ padding: '12px 25px', background: '#17a2b8', color: '#fff', fontSize: '1.1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                {showReview ? (lang === 'hi' ? "विश्लेषण छुपाएं" : "Hide Analysis") : (lang === 'hi' ? "उत्तरों की समीक्षा करें" : "Review Answers")}
              </button>
            </div>
          </div>

          {showReview && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>{lang === 'hi' ? "विस्तृत विश्लेषण" : "Detailed Analysis"}</h3>
              {questions.map((q, index) => {
                const isUnattempted = userAnswers[q.id] === undefined;
                const isCorrect = userAnswers[q.id] === q.ans;
                const displayQuestion = lang === 'hi' && q.q_hi ? q.q_hi : q.q;
                
                let containerStyle = { margin: '20px 0', padding: '20px', borderRadius: '8px', border: '1px solid #ccc' };
                if (isUnattempted) {
                  containerStyle.background = '#fff3cd'; 
                  containerStyle.borderColor = '#ffeeba';
                } else if (isCorrect) {
                  containerStyle.background = '#d4edda'; 
                  containerStyle.borderColor = '#c3e6cb';
                } else {
                  containerStyle.background = '#f8d7da'; 
                  containerStyle.borderColor = '#f5c6cb';
                }

                return (
                  <div key={q.id} style={containerStyle}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
                      <strong>Q{index + 1}:</strong> {displayQuestion}
                      <span style={{ marginLeft: '15px', fontSize: '0.9rem', fontWeight: 'bold', color: isUnattempted ? '#856404' : isCorrect ? '#155724' : '#721c24' }}>
                        [{isUnattempted ? (lang === 'hi' ? "प्रयास नहीं किया" : "Unattempted") : isCorrect ? (lang === 'hi' ? "सही" : "Correct") : (lang === 'hi' ? "गलत" : "Incorrect")}]
                      </span>
                    </p>
                    
                    {q.options.map((opt, i) => {
                      const displayOption = lang === 'hi' && q.options_hi ? q.options_hi[i] : opt;
                      let optStyle = { display: 'block', margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ced4da', background: '#fff' };
                      
                      if (i === q.ans) {
                        optStyle.background = '#c3e6cb';
                        optStyle.borderColor = '#28a745';
                        optStyle.fontWeight = 'bold';
                      } else if (i === userAnswers[q.id]) {
                        optStyle.background = '#f5c6cb';
                        optStyle.borderColor = '#dc3545';
                        optStyle.textDecoration = 'line-through';
                      }

                      return (
                        <div key={i} style={optStyle}>
                          <input
                            type="radio"
                            readOnly
                            checked={userAnswers[q.id] === i}
                            style={{ marginRight: '10px' }}
                          /> 
                          {displayOption}
                          {i === q.ans && <span style={{ marginLeft: '10px', color: '#155724' }}>✓ {lang === 'hi' ? "सही उत्तर" : "Correct Answer"}</span>}
                          {i === userAnswers[q.id] && i !== q.ans && <span style={{ marginLeft: '10px', color: '#721c24' }}>✗ {lang === 'hi' ? "आपकी पसंद" : "Your Choice"}</span>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default App;