---
title: "मैंने यह ब्लॉग कोडिंग एजेंट्स की मदद से कैसे बनाया"
description: "techmeat.dev की शुरुआत की कहानी: एक स्वतःस्फूर्त विचार और skills के एक सेट से लेकर Astro, Cloudflare Pages, ब्रेनस्टॉर्मिंग और ब्लॉग के पहले संस्करण तक।"
pubDate: 2026-04-28
tags: [ai-coding, astro, bun]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
locale: hi
prFileId: 4c5cd53d47786cb773e03447538d4dc361a6ab834bb37d2ed99825e438341479
---

मेरा एक ब्लॉग पहले भी था। अच्छा-खासा ट्रैफ़िक, स्पष्ट विषय, असली निजी अनुभव: मैं फ्रंटएंड और उन चीज़ों के बारे में लिखता था जिन्हें मैंने ख़ुद हाथों से किया था। फिर बहुत ज़रूरी न होने वाले कारणों से मैंने उसे बनाए रखना बंद कर दिया, और साथ ही डोमेन भी खो दिया।

बहुत समय तक लगता रहा कि कहानी बस ख़त्म हो गई। लेकिन आज फिर लिखने का मन हुआ — अब फ्रंटएंड के पेशे के बारे में नहीं, बल्कि इस बारे में कि मैं कोडिंग एजेंट्स की मदद से असली प्रोजेक्ट्स कैसे बनाता हूँ। डेवलपमेंट के भविष्य पर अमूर्त बहसों के बिना — ठोस प्रक्रियाओं, ग़लतियों और निर्णयों के ज़रिये।

इस तरह [techmeat.dev](https://techmeat.dev/) सामने आया।

## मैंने यह शुरू किया ही क्यों

विचार स्वतःस्फूर्त था। मेरे पास इस्तेमाल न हुए tokens जमा होते जा रहे थे, कुछ परिकल्पनाएँ थीं जिन्हें परखना था, और मैंने तय किया कि एक छोटा लेकिन असली प्रोजेक्ट जोड़ूँ: एक ब्लॉग जिसमें इसके बनने की प्रक्रिया ही पहली सामग्री बन जाए।

एजेंट्स के साथ मेरा सामान्य workflow कहीं ज़्यादा विस्तृत है: योजना, समीक्षा और चेकपॉइंट्स के कई चरण। यहाँ मैंने जान-बूझकर उसे सरल बनाया। मैं देखना चाहता था कि अगर आप दिशा जल्दी तय कर दें, संदर्भ तैयार कर दें और शुरुआती काम का बड़ा हिस्सा एजेंट को सौंप दें, तो कितनी दूर तक जा सकते हैं।

यह कोई आदर्श प्रक्रिया नहीं है, बल्कि एक प्रायोगिक संस्करण है। ज़्यादा सख़्त तरीक़े पर शायद मैं अलग से लिखूँगा।

## तैयारी: skills, संदर्भ और प्रोजेक्ट के नियम

सबसे पहले मैंने ज़रूरी skills इंस्टॉल किए। ऐसे प्रोजेक्ट के लिए यह जितना दिखता है उससे ज़्यादा मायने रखता है: «एक ब्लॉग बना दो» काम का बहुत कमज़ोर निर्देश है। एजेंट को साफ़ नियम चाहिए: कौन-सी तकनीकें इस्तेमाल करनी हैं, कंटेंट कहाँ रखना है, SEO के बारे में कैसे सोचना है, डिज़ाइन को कैसे संभालना है, बिना ज़रूरत क्या नहीं करना है। शुरुआती सेट कार्यपुस्तिका [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md) में दर्ज है।

इसके बाद मैंने `CLAUDE.md` शुरू किया — प्रोजेक्ट के बेस संदर्भ वाली फ़ाइल। मसौदा रूसी में था, पर वर्किंग संदर्भ के लिए मैंने उसे तुरंत अंग्रेज़ी में अनुवाद किया, ताकि वह सभी locales और अलग-अलग टूल्स में बराबर काम आए।

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

फिर मैंने `CLAUDE.md` को `AGENTS.md` में कॉपी कर दिया। मैं प्रोजेक्ट को किसी एक एजेंट से बाँधना नहीं चाहता: अगर कल मैं किसी दूसरे टूल में डेवलपमेंट जारी रखूँ, तो बेस नियम कोड के पास ही रहें।

## पहला बूट: सिर्फ़ नींव

मैंने एजेंट से तुरंत पन्ने या डिज़ाइन बनाने को नहीं कहा। शुरुआत में मुझे एक सही तकनीकी नींव चाहिए थी: Cloudflare Pages के लिए तैयार Astro प्रोजेक्ट, साफ़ संरचना के साथ, बिना अतिरिक्त पहल के।

प्रॉम्प्ट जान-बूझकर तंग था:

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

पहली रिक्वेस्ट जितनी तंग होगी, इस बात की संभावना उतनी कम रहती है कि एजेंट वहाँ प्रोजेक्ट को «सुधारना» शुरू करे जहाँ अभी कोई फ़ैसला हुआ ही नहीं। इससे काफ़ी नर्व बचते हैं: मुझे एक भरोसेमंद शुरुआती बिंदु चाहिए था, सुंदर मॉकअप नहीं।

## समय से पहले डिज़ाइन के बजाय ब्रेनस्टॉर्मिंग

फिर मैंने Superpowers ऑन किया और ब्रेनस्टॉर्मिंग शुरू की, ख़ासकर यह कहकर कि डिज़ाइन की चर्चा न हो। इस चरण में तय करना था कि ब्लॉग एक product के रूप में किन हिस्सों से बना है, यह नहीं कि वह कैसा दिखता है।

प्रॉम्प्ट इस तरह था:

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

ब्रेनस्टॉर्मिंग में लगभग एक घंटा लगा। इतने छोटे प्रोजेक्ट के लिए यह बहुत लगता है, पर उस वक़्त की भरपाई हो गई: इसके बिना मेरे पास सुसंगत प्लान और आर्किटेक्चर स्पेसिफ़िकेशन नहीं होते। एजेंट ने ब्लॉग को पन्नों, साझा ब्लॉक्स, भाषा मॉडल और कंटेंट संरचना में बाँटने में मदद की।

नतीजे में दो आंतरिक artefacts निकले: पहले संस्करण की [प्लान](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) और [आर्किटेक्चर स्पेसिफ़िकेशन](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md)।

## स्वायत्त डेवलपमेंट, समीक्षा और फ़िक्स

ब्रेनस्टॉर्मिंग के बाद मुझे बस दिशा से सहमत होना था और एजेंट को काम करने देना था। बेस संरचना का बड़ा हिस्सा ख़ुद-ब-ख़ुद आ गया: रूट्स, Markdown कंटेंट, locales, कॉम्पोनेंट्स, RSS, tags और अनुवादों के लिए इन्फ़्रास्ट्रक्चर।

बिल्कुल हाथ लगाए बिना भी काम नहीं चला। मैंने कुछ सुधारात्मक प्रॉम्प्ट्स जोड़े: भाषाओं की सूची स्पष्ट की, छोटे bugs ठीक करने को कहा और उन ब्योरों को कसने को कहा जिन्हें एजेंट पहली बार में नज़रअंदाज़ कर गया था।

फिर मैंने GPT-5.5 से कोड का रिव्यू करवाने और तुरंत फ़िक्स लागू करने को कहा। मैं प्रक्रिया में मुश्किल से ही दख़ल हुआ: एजेंट ने कई उपयोगी सुधार पाए, उन्हें लागू किया और जाँचें चलाईं। ईमानदारी से कहूँ तो इस संस्करण को मैंने लगभग पूरा vibe-code कर दिया, जिसे मैं आम तौर पर टालने की कोशिश करता हूँ। यहाँ यह मंज़ूर था: प्रोजेक्ट छोटा है, ग़लती की क़ीमत कम है, और मक़सद ही था इस तरीक़े की सीमाओं की जाँच करना।

यहाँ साफ़ दिखता है कि मैं AI coding को आम तौर पर कैसे देखता हूँ। एजेंट कोई जादुई «मेरे लिए प्रोडक्ट बना दो» बटन नहीं है, बल्कि बहुत तेज़ निष्पादक है, जिसे ढाँचों, संदर्भ और समय-समय पर समीक्षा की ज़रूरत होती है। अच्छे ढाँचों के साथ वह कच्चे काम का बड़ा भार उतार लेता है। धुँधले ढाँचों के साथ वह उसी रफ़्तार से अनिश्चितता पैदा करने लगता है।

## मैंने डिज़ाइन क्यों टाला

पहले चरण में डिज़ाइन को मैंने जान-बूझकर शामिल नहीं किया। दृश्य पक्ष के लिए मेरी एक अलग प्रक्रिया है, और मैं उसे अलग से ही पूरा करना चाहता था, ताकि आर्किटेक्चर, कंटेंट और इंटरफ़ेस एक ही काम में मिल न जाएँ।

इसी वजह से ब्लॉग का पहला संस्करण एक तकनीकी ढाँचे जैसा दिखता है: रूट्स, लोकलाइज़ेशन, पोस्ट्स, tags और प्रकाशन इन्फ़्रास्ट्रक्चर पहले से हैं, और दृश्य प्रणाली नहीं है — और यह ठीक है। कभी-कभी पहले एक काम करता हुआ प्रोजेक्ट पाना और फिर शांति से सोचना कि वह कैसा दिखे और महसूस हो, ज़्यादा फ़ायदेमंद होता है।

## इस ब्लॉग से मैं क्या जाँचना चाहता हूँ

techmeat.dev मेरे लिए बस नोट्स का गोदाम नहीं, एक काम की प्रयोगशाला है। मुझे यह दिलचस्प लगता है कि जब आपके बग़ल में हर वक़्त एक कोडिंग एजेंट बैठा हो तो डेवलपमेंट कैसे बदलता है: कहाँ वह काम तेज़ करता है, कहाँ छुपे जोखिम पैदा करता है, और कहाँ ऐसा हल दिखाने में मदद करता है जिस तक मैं अकेले बहुत बाद में पहुँचता।

ख़ासकर तीन चीज़ें मेरा ध्यान खींचती हैं।

**प्रक्रिया।** «एजेंट ने कोड लिखा» नहीं, बल्कि उससे पहले और बाद में क्या हुआ: कौन-से प्रॉम्प्ट्स काम आए, कौन-सी पाबंदियाँ लगानी पड़ीं, कौन-से फ़ैसले इंसान के पास ही छोड़ने अच्छे हैं।

**गुणवत्ता।** अगर आप योजना और रिव्यू नहीं रखते तो AI-assisted development आसानी से पैच-दर-पैच की धारा बन जाता है। मैं सफल नतीजे भी दिखाना चाहता हूँ, और वे जगहें भी जहाँ एजेंट ने ग़लती की या जहाँ मेरी समस्या-कथन काफ़ी सटीक नहीं थी।

**दोहराने की क्षमता।** अगर अगले प्रोजेक्ट पर तरीक़े को दोहराया नहीं जा सकता, तो वह प्रक्रिया नहीं, एक बार का करतब है। इसलिए मैं सिर्फ़ अंतिम कोड नहीं, बल्कि कार्य-योजनाएँ भी दर्ज करूँगा: काम कैसे रखा गया, कौन-सी फ़ाइलें बनीं, कौन-से टूल्स शामिल हुए, फ़ैसले कैसे लिए गए।

## आगे क्या

अगला चरण है डिज़ाइन। इस पोस्ट का अगला भाग ठीक उसी पर होगा: मैंने उसे कैसे किया, कौन-से फ़ैसले लिए, अंत में क्या निकला। हालाँकि वह वास्तव में कैसा दिखेगा, यह अभी मैं ख़ुद भी नहीं जानता।

फ़िलहाल, इतिहास के लिए, यह सहेज रखें कि ब्लॉग आज कैसा दिखता है:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/eo8KNkGzBBM?si=KVKJ1hHw26kDkmtZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
