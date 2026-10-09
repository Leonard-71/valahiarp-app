import { Metadata } from "next";
import { AlertTriangle, XCircle, Bomb, BookOpen, ShieldCheck } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Regulament",
  description: "Regulamentul serverului Valahia RP",
};

export default async function RulesPage() {
  const rulesData = [
    {
      id: "intro-general-zones",
      title: "INTRODUCERE",
      icon: BookOpen,
      isMainAccordion: true,
      children: [
        {
          id: "intro-generalitati",
          title: "★ REGULI GENERALE",
          children: [
            {
              question: "Reguli generale",
              answer:
                "• Este interzis să folosești nume/prenume cu caracter obscen.\n• Sunt interzise injuriile despre familie, morți, etc.\n• Este interzisă defăimarea/umilirea jucătorilor.\n• Nu aveți dreptul să omorâți jucătorii ce se află în zonele verzi sau în locațiile legale de craft.\n• Instigarea altor persoane la ură sau la încălcarea regulilor din regulament se va pedepsi cu sancțiune în funcție de gravitate.\n• Cetățeni au obligația să dețină buletinul și licența de la obținerea materiei prime până la produsul finit.\n• În calitate de cetățean ai obligația de a respecta regulile impuse de Poliție.\n• Persoanele care parăsesc banda/tribul nu au dreptul de a intra timp de 7 zile în facțiunile de stat.",
            },
          ],
        },
        {
          id: "intro-zone-verzi-neutre",
          title: "★ ZONE VERZI & ZONE NEUTRE",
          children: [
            {
              question: "Reguli pentru Zone Verzi & Zone Neutre",
              answer:
                "• În zonele verzi și în zonele crafturilor legale nu puteți fi jefuit.",
            },
          ],
        },
        {
          id: "intro-zone-rosii",
          title: "★ ZONE ROȘII ★",
          children: [
            {
              question: "Reguli pentru Zone Roșii",
              answer:
                "• În aceste zone trebuie să aveți mare grijă pentru că se aplică legea sălbăticiei.",
            },
          ],
        },
      ],
    },
    {
      id: "generalitati-main",
      title: "GENERALITĂȚI",
      icon: XCircle,
      isMainAccordion: true,
      children: [
        {
          id: "metagaming",
          title: "★ METAGAMING",
          children: [
            {
              question: "Definire și exemple",
              answer:
                "• **Este interzis!** Metagaming-ul reprezintă folosirea informațiilor obținute în afara jocului (**OOC**) într-o situație din joc (**IC**), ca de exemplu Discord, stream, locuri de respawn sau alte mijloace.\n• Se consideră metagaming dacă **recunoști un personaj doar după voce**, fără să fi interacționat anterior în roleplay.\n• Se consideră metagaming când **recunoști o persoană după voce** deși are bandană, mască sau și-a schimbat hainele, barba și părul.\n• Se consideră metagaming când **aștepți în zona neutră** noaptea o persoană care revine de la respawn.\n• Se consideră metagaming când **folosești numele OOC în IC**.\n• Se consideră metagaming când două sau mai multe persoane **desfășoară o activitate împreună dar nu comunică IC** (folosesc alte mijloace OOC).\n• Se consideră metagaming când **angajezi pe cineva într-o facțiune fără un minim de roleplay**.\n• Se consideră metagaming când **abordezi o persoană fără informații IC**.\n• Evită să aplici cunoștințe din afara jocului în acțiunile personajului tău.",
            },
          ],
        },
        {
          id: "rdm",
          title: "★ RANDOM DEATH MATCH (RDM)",
          children: [
            {
              question: "Definire și exemple",
              answer:
                "• **Este interzis!** RDM înseamnă să omori o persoană sau mai multe **fără motiv valid** sau **fără roleplay anterior**.\n• Exemple: omori **NPC-uri în oraș** fără ca acestea să fie agresive; omori **playeri/NPC-uri trecând cu calul/căruța** peste ei cu intenția de a-i omorî; **somezi animalul de companie** să omoare fără RP și motiv întemeiat.",
            },
          ],
        },
        {
          id: "revengekill",
          title: "★ REVENGEKILL",
          children: [
            {
              question: "Definire și exemple",
              answer:
                "• **Este interzis!** Revii după respawn la locul morții pentru a **ucide persoana** care te-a omorât.\n• Exemple: te întorci înainte de **30 de minute** de la respawn pentru a ucide; după respawn **cauți persoana fără informații IC** și o omori în mai puțin de 30 de minute.",
            },
          ],
        },
        {
          id: "mixing",
          title: "★ MIXING",
          children: [
            {
              question: "Definire și exemple",
              answer:
                "• **Este interzis!** Mixing înseamnă folosirea informațiilor **OOC în IC** sau invers.\n• Exemplu: ești într-o locație și **chemi pe chat** o altă persoană să vină la tine.",
            },
          ],
        },
        {
          id: "pk",
          title: "★ PLAYER KILL (PK)",
          children: [
            {
              question: "Definire și exemple",
              answer:
                "• PK este când personajul tău este ucis/incapacitat și trebuie să **uiți parțial sau total** anumite informații sau evenimente.\n• Exemple: un player părăsește o facțiune și liderul decide că **trebuie să uite** informațiile; după respawn **uiți acțiunile** care au dus la moartea ta.",
            },
          ],
        },
        {
          id: "no-fear",
          title: "★ NO FEAR",
          children: [
            {
              question: "Definire",
              answer:
                "• Non-fear înseamnă că un jucător **nu manifestă teamă** sau o reacție adecvată la amenințări/violente/pericole, încălcând principiile de roleplay autentic.",
            },
          ],
        },
        {
          id: "ck",
          title: "★ CARACTER KILL (CK)",
          children: [
            {
              question: "Definire și exemple",
              answer:
                "• CK este când personajul tău din roleplay este **ucis sau incapacitat**.\n• Atenție: CK se aplică **doar cu acordul fondatorilor**, cu **motiv bine întemeiat**, în urma unui **RolePlay complex** și de durată.\n• Exemple: în RP ești amenințat cu moartea și **spui să te omoare**; o persoană din facțiune de stat este **coruptă**.",
            },
          ],
        },
        {
          id: "bug-abuse",
          title: "★ BUG-ABUSE",
          children: [
            {
              question: "Interzicere",
              answer:
                "• **Este interzis!** Dacă găsiți un bug, contactați **STAFF** sau deschideți ticket pe **Discord**. Abuzul de bug se sancționează **în funcție de gravitate**.",
            },
          ],
        },
        {
          id: "troll",
          title: "★ TROLL",
          children: [
            {
              question: "Definire",
              answer:
                "• Unul sau mai mulți jucători **strică roleplay-ul** altora pentru atenție. Include și **încălcarea intenționată** a regulilor/regulamentului.",
            },
          ],
        },
        {
          id: "reclama",
          title: "★ RECLAMĂ",
          children: [
            {
              question: "Interzicere",
              answer:
                "• **Este strict interzis** să faceți reclamă pe **chat-ul din joc** sau pe **Discord** la alte comunități/servere.",
            },
          ],
        },
        {
          id: "drop-rob-kill",
          title: "★ DROP & KILL / ROB & KILL",
          children: [
            {
              question: "Interzicere",
              answer:
                "• **Este STRICT INTERZIS** să forțezi pe cineva să **arunce bunurile** și apoi să-l omori. Dacă ai forțat pe cineva să arunce bunurile, **trebuie să îl lași în viață**.\n• **Este STRICT INTERZIS** să omori un jucător **după ce l-ai jefuit**; dacă l-ai omorât, ai obligația să **îi pui în inventar** toate itemele/banii/aurul jefuite.",
            },
          ],
        },
        {
          id: "transactions-ooc",
          title: "★ TRANZACȚII OOC",
          children: [
            {
              question: "Interzicere",
              answer:
                "• Casele, fermele, abonamentele, armele, caii, căruțele și alte beneficii **achiziționate OOC** sau care aparțin unei facțiuni **nu pot fi transferate** către alți jucători/membri staff în schimbul unor bunuri **IC**.",
            },
          ],
        },
        {
          id: "ooc-in-ic",
          title: "★ DESCHIDERE OOC ÎN IC",
          children: [
            {
              question: "Definire",
              answer:
                "• Reprezintă momentul când ieși din pielea personajului și ești aceeași persoană cu cea din fața calculatorului.\n• Vorbitul despre lucruri **nerelevante IC** (Discord, grafica jocului, butoane, informații din afara jocului) se consideră **OOC în IC**.\n• Chat-ul serverului este **strict OOC** și nu poate fi folosit în scopuri IC.",
            },
          ],
        },
        {
          id: "roleplay-scarbos",
          title: "★ ROLEPLAY SCÂRBOS",
          children: [
            {
              question: "Interzicere",
              answer:
                "• **Este interzis** roleplay-ul scârbos în orice mod, **cu excepția acordului ambelor persoane**.\n• Un limbaj/comportament indecent (jigniri, scene amoroase etc.) este permis **doar cu acordul explicit** al participanților.",
            },
          ],
        },
        {
          id: "provoking",
          title: "★ PROVOKING",
          children: [
            {
              question: "Interzicere",
              answer:
                "• **Este STRICT INTERZIS** să luați la mișto **polițiștii în zonele verzi**, indiferent de situație.\n• **Este strict interzis** să vă bateți sau să provocați cetățenii în **zonele verzi**.\n• Nu aveți voie să **provocați** (înjurii, jigniri, loviri fără motiv) alți playeri fără un **RolePlay** în spate – se consideră provoking.",
            },
          ],
        },
        {
          id: "ticket",
          title: "★ TICKET și TICKET ÎN RP",
          children: [
            {
              question: "Reguli",
              answer:
                "• **Este interzis** să faci ticket **în timpul unui roleplay** – orice roleplay se poate termina.\n• Ticketele care **nu descriu problema** sunt închise direct de admin.\n• Sunt interzise **ticketele multiple** cu același motiv de la aceeași acțiune.\n• Nu vor fi luate în considerare ticketele fără **dovezi suficiente** (audio/video/poze). Este **obligatoriu** să aveți dovezi.\n• Este interzis să faceți tickete dacă **au trecut mai mult de 24h** de la acțiune; rezolvarea poate dura **până la 48h**.",
            },
          ],
        },
        {
          id: "disconnect-failrp",
          title: "★ DISCONNECT ÎN RP & FAIL RP",
          children: [
            {
              question: "Interzicere",
              answer:
                "• **Este interzis** să îți dai disconnect când: ești **urmărit/căutat**, ești **implicat într-un roleplay**, **ai jefuit pe cineva** și vrei să scapi, sau când te afli într-o zonă în care poliția face **razie/control**.",
            },
          ],
        },
        {
          id: "cheats",
          title: "★ HACK-URI, MODURI ȘI SOFTWARE DE CHEAT",
          children: [
            {
              question: "Interzicere",
              answer:
                "• **Interzis (fără excepții):** hack-uri/programe de avantaj (aimbot/triggerbot, ESP/wallhack/radar, speedhack, teleport, auto-loot, scripturi/macro-uri, injectoare, trainer-e, meniuri cheat).\n• **Interzis:** reshade/graphic packs sau setări care elimină vegetație, ceață, contraste etc. care **măresc artificial vizibilitatea**; crosshair extern/overlay.\n• În general, sunt interzise **orice software/setare/dispozitiv/practică** care oferă avantaje neloiale sau **modifică clientul/serverul** (exploaturi, editare fișiere, boost/cheat services, vânzare/împrumut conturi, hardware macros).",
            },
          ],
        },
      ],
    },

    {
      id: "jafuri",
      title: "JAFURI",
      icon: Bomb,
      isMainAccordion: true,
      children: [
        {
          id: "jaf-cetateni",
          title: "★  JAF ASUPRA CETĂȚENILOR",
          children: [
            {
              question: "Reguli pentru jafuri asupra cetățenilor",
              answer:
                "• Jaful asupra cetățenilor poate fi desfășurat între orele **21:00 și 06:00 în IC**.\n• Jaful poate fi dat de **minim o persoană**, indiferent de armele deținute (fie că este cuțit, arc sau altă armă).\n• Pentru a jefui este necesar să fie adoptat un **minim de RP (joc de rol)** în interacțiunea cu persoana pe care intenționezi să o jefuiești.\n• Jafurile asupra jucătorilor în **zonele verzi** și în **locațiile legale de craft** sunt strict interzise indiferent de oră.\n• Nu puteți jefui pe **teritoriul caselor, moșiilor, fermelor și conacelor**.\n• Nu puteți jefui jucătorii ce muncesc la **minele/pădurile din zonele verzi si neutre**.\n• Este interzis să jefuiți **doctorii**, excepție face zona roșie (doctorii pot fi jefuiți).\n• **Purtarea bandanei nu este obligatorie**.\n• Nu poți forța o persoană să îți dea lucrurile personale pe care le are într-un cal sau căruță, sau să își cheme calul și căruța în RP.\n• Nu puteți jefui o persoană până nu v-ați asigurat **perimetrul de lângă voi** ca în momentul în care băgați mâna în buzunarele acestuia nimeni nu vă mai poate ataca. Iar dacă în timpul în care acțiunea de jaf este în desfășurare și intervine altcineva, va trebui să vă opriți din jaf ca să vă salvați viața.\n• Odată ce ai jefuit o persoană **nu ai dreptul să o și omori**.",
            },
          ],
        },
        {
          id: "jaf-magazine-banci",
          title: "★ JAF MAGAZINE, BANCI, GALERIE TABLOURI",
          children: [
            {
              question: "Reguli pentru jafuri la magazine, bănci și galerie tablouri",
              answer:
                "• Doar **bandele oficiale** pot da jafuri la bănci.\n• La jaful de **magazine** sau la cel dintr-o **galerie de tablouri**, cetățenii care nu fac parte dintr-un clan sau o bandă se pot grupa în echipe de **maximum 4 persoane** pentru a comite jaful.\n• Nu este permis ca două clanuri, două bande, sau un clan și cetățeni independenți să se alăture pentru a comite jaful, la fel cum nici un civil nu se poate alătura unei bande pentru a da jaful.\n• Dacă încercați să jefuiți **banca/magazinul/galeria de tablouri** și nu reușiți pentru că nu sunt destui polițiști sau din oricare alt motiv, sunteți obligați să părăsiți orașul într-un timp cât mai scurt fără a mai putea interveni timp de **30 de minute OOC** la o altă acțiune în același oraș.\n• La orice tip de jaf din această categorie sunteți obligați să purtați **bandană**.\n• **Bandana trebuie pusă înainte de a intra în zona verde**.\n• Bandiții sunt obligați să aibă asupra lor **ustensilele necesare** (gloante, dinamită, lockpick, săgeți, arme, etc.). Nu aveți dreptul să scoateți căruța/calul pentru a le folosi inventarele lor, puteți să le folosiți doar ca mijloc de transport.\n• Este interzis să depuneți banii în **banca din orașul în care ați dat jaful**, să îi trimiteți prin telegramă sau să oferiți banii unui cetățean din oraș.\n• **Persoana ce începe jaful trebuie să rămână în interiorul clădirii** până la finalizarea acțiunii (momentul în care pleacă cu banii sau renunță la jaf).\n• La jaf cu ostatic, toți bandiții sunt obligați să stea în interiorul clădirii iar ostaticul în fața acesteia și **nimeni nu are voie să deschidă focul** (nici bandiții și nici polițiștii).\n• Ostaticul poate fi luat doar din fața bancii/magazinului/galeriei de tablouri sau din interiorul clădirii ce o jefuiți și trebuie să nu facă parte din gruparea ce dă jaful.\n• Nu puteți răpi sau jefui persoane în cadrul unei acțiuni de jaf, ele pot fi folosite doar ca ostatici.\n• În urma unui jaf, polițiștii sunt obligați să confiște banii (în afară de aur), toate armele și obiecte precum cutiile de gloanțe, săgeți, lockpick, dinamită din inventarul banditului.\n• Polițiștii pot lega bandiții în timpul jafului, îl pot duce în celula din secția de poliție după care se pot întoarce să continue acțiunea.\n• Este interzis să participați la acțiuni de jaf la bancă, magazin sau galerie de tablouri cu **ghiozdane/rănițe/genti echipate**.",
            },
          ],
        },
        {
          id: "jaf-organe-lege",
          title: "★ JAFUL ASUPRA UNUI ORGAN AL LEGII",
          children: [
            {
              question: "Reguli pentru jaful asupra organelor legii",
              answer:
                "• **Polițiștii nu pot fi jefuiți și nici răpiți** la acțiuni precum: jaf de bancă, magazine, galerie de tablouri sau profanare de morminte.\n• **Polițiștii nu pot fi răpiți din orașele protejate (zonele verzi)**, excepție fac orașele din **zonele roșii** și **neutre**.\n• Carcanul ce are înscriptii de poliție trebuie predat **GUVERNATORILOR** într-un timp cât mai scurt în cazul în care negocierea cu omul legii a eșuat. Contactul cu **GUVERNATORII** se face **OOC**. Dacă polițistul cere o armă nouă și banditul nu predă arma GUVERNATORULUI, banditul o va pierde la următorul restart. **GUVERNATORII** vor plăti pentru armă **500 $**.",
            },
          ],
        },
        {
          id: "profanare-morminte",
          title: "★ PROFANAREA DE MORMINTE",
          children: [
            {
              question: "Reguli pentru profanarea de morminte",
              answer:
                "• În cadrul acestei acțiuni **nu puteți jefui**, **nu puteți lua ostatici** și **nu puteți răpi** cetățenii (polițiști, doctori, fermieri etc.).\n• Cetățenii care nu fac parte dintr-un clan sau o bandă se pot grupa în echipe de **maximum 4 persoane** pentru a comite acțiunea de profanare.\n• La această acțiune sunteți obligați să purtați **bandană**, aceasta trebuie pusă **înainte de a intra în zona verde**.\n• Când mergeți să profanați un cimitir și există alt/alți bandit/bandiți deja acolo, aveți **obligația de a părăsi cimitirul**.\n• La profanarea mormintelor este **interzisă folosirea calului sau căruței în oraș**. După finalizare, bandiții trebuie să părăsească orașul timp de **30 de minute OOC**.\n• În timpul profanării, bandiții trebuie să rămână **în cimitir**, iar **focul nu se deschide** fără un **minim de roleplay**.\n• Indiferent de numărul bandiților/polițiștilor, **nu puteți deschide focul** fără un **minim de RP**.\n• În urma profanării, polițiștii sunt obligați să confiște **armele**, **uneltele folosite** (lopată, bani, bijuterii, carpe, minereuri, informații legendare) și **alte obiecte obținute** din acțiune.\n• Dacă încercați să profanați mormintele și nu reușiți pentru că **nu sunt destui polițiști** sau din oricare alt motiv, sunteți obligați să părăsiți orașul într-un timp cât mai scurt fără a mai putea interveni timp de **30 de minute OOC** la o altă acțiune în același oraș.\n• **Nu puteți răpi sau jefui persoane** în cadrul unei acțiuni de profanare, nici nu le puteți lua ostatici.\n• Este **interzis** să participați la acțiunea de profanare de morminte cu **ghiozdane/rănițe/genti echipate**.",
            },
          ],
        },
        {
          id: "jaf-zona-rosie",
          title: "★ JAF ÎN ZONA ROȘIE",
          children: [
            {
              question: "Reguli pentru jaf în zona roșie",
              answer:
                "• Jaful este permis **pe tot parcursul zilei și al nopții**.\n• În zonele roșii puteți jefui inclusiv **doctorii** și **polițiștii**.\n• Nu puteți jefui o persoană până nu v-ați asigurat **perimetrul de lângă voi** astfel încât, în momentul în care băgați mâna în buzunarele acesteia, nimeni să nu vă poată ataca. Dacă pe durata jafului intervine altcineva, **opriți jaful** pentru a vă salva viața.\n• Pentru un **RP avansat** puteți **răpi orice persoană**.\n• Orice persoană poate **deschide focul fără RP**, ținând cont că zona este **rău famată**.",
            },
          ],
        },
      ],
    },

    {
      id: "rapiri",
      title: "RAPIRI",
      isMainAccordion: true,
      icon: AlertTriangle,
      children: [
        {
          id: "rapiri-section",
          title: "★ REGULI GENERALE",
          children: [
            {
              question: "Reguli privind răpirile",
              answer:
                "• Răpirile sunt permise astfel:\n  – în **zonele neutre între orele 21:00 și 06:00** (excepție: **doctorii** pot fi răpiți doar din **zona roșie**);\n  – în **zonele roșii** puteți răpi **la orice oră** din zi și din noapte.\n• Dacă răpiți un **om al legii**, contravaloarea maximă ce poate fi solicitată de la **Departamentul de Poliție** este:\n  – **MAREȘAL**: **2000 $**;\n  – **MAREȘAL ADJUNCT**: **1250 $**;\n  – **ȘERIF**: **850 $**;\n  – **AJUTOR DE ȘERIF**: **500 $**.\n• **Nu puteți cere** ca recompensă pentru un om al legii: **ștergerea de dosare**, **eliminarea de bandiți** de pe panoul cu persoane căutate, **arme** sau **alte obiecte materiale** intrate în posesia poliției.\n• În cazul răpirilor **nu sunt permise** solicitări de bani **prin telegramă**.\n• Dacă ați răpit o persoană, **nu puteți intra** cu ea în **zonele verzi** și **locurile protejate** (mină, pădure, locuri de craft legal).\n• Un **RP de răpire** nu poate fi mai lung de **60 de minute OOC**; se poate extinde **doar dacă persoana este de acord** cu RP-ul.",
            },
          ],
        },
      ],
    },

    {
      id: "no-fear",
      title: "NO FEAR",
      isMainAccordion: true,
      icon: XCircle,
      children: [
        {
          id: "no-fear-section",
          title: "★ REGULI GENERALE",
          children: [
            {
              question: "Reguli generale privind No Fear",
              answer:
                "• Se consideră **NO-FEAR** în momentul în care nu te supui poliției (ex.: refuzul de a te legitima sau de a urma ordinele).\n• Se consideră **NO-FEAR** în momentul în care, fiind amenințat cu arma/lasou, nu te conformezi cerințelor banditului/polițistului (excepție: acțiune 1 vs 1, armă vs armă).\n• Se consideră **NO-FEAR** dacă, după ce ai fost legat cu lasoul, încerci să te dezlegi cât timp mai sunt persoane în apropiere; te poți dezlega doar după ce te-ai asigurat că nu e nimeni în zonă.\n• În orașe, în zonele de craft legale, în zonele gri pe timp de zi și în zonele verzi (dacă nu are loc jaf sau profanare), toți cetățenii și bandiții trebuie să se supună poliției la razii și controale; în caz contrar se consideră **NO-FEAR**.\n• Nu poți jefui o persoană până nu ți-ai asigurat perimetrul de lângă tine astfel încât, în momentul în care bagi mâna în buzunarele acesteia, nimeni să nu te poată ataca; dacă în timpul jafului intervine altcineva, acțiunea de jefuit trebuie oprită.\n• Se consideră **NO-FEAR** atunci când alegi mai degrabă să mori decât să dai curs unui RP (adică să-ți ceri moartea; se sancționează cu CK).\n• Se consideră **NO-FEAR** atunci când în oraș are loc un jaf, iar tu, ca cetățean, refuzi să părăsești zona, alegând să îți pui viața în pericol.",
            },
          ],
        },
      ],
    },

    {
      id: "politie",
      title: "POLIȚIE",
      isMainAccordion: true,
      icon: ShieldCheck,
      children: [
        {
          id: "politie-section",
          title: "★ REGULI GENERALE",
          children: [
            {
              question: "Reguli generale pentru Poliție",
              answer:
                "• Atât timp cât te afli în serviciu nu poți practica alte slujbe în afară de cea de polițist.\n• În cazul în care un polițist este prins desfășurând acțiuni ilegale, va fi obligat să își încheie cariera de polițist și va fi sancționat conform codului penal.\n• Aveți obligația de a nu vinde calul și căruța primite în scopul desfășurării activității de polițist.\n• Ordinul dat de un grad superior trebuie respectat și executat.\n• La orice acțiune polițistul este obligat să încerce imobilizarea bandiților sub orice formă (legarea cu lasoul, încătușare, punerea bandiților în căruța de transport deținuți).\n• Un polițist nu are dreptul să confiște lucruri aflate în posesia infractorului decât în secția de poliție, în urma întocmirii dosarului.\n• Polițistul nu poate sancționa fără o dovadă clară un cetățean pe baza unor bănuieli.\n• Dacă sunt mai puțini de 3 polițiști pot merge în razie însă nu sunt obligați.\n• La un jaf cu ostatic polițiștii sunt obligați să nu pună în pericol viața acestuia (nu au dreptul să deschidă focul).\n• La profanarea de morminte, indiferent de numărul bandiților, nu puteți deschide focul fără un minim de RP.\n• Poliția nu are dreptul să șteargă dosare sau persoanele căutate de pe panou decât dacă un mareșal sau mareșal adjunct consideră că a trecut suficient timp pentru reabilitarea infractorului (minim 30 de zile OOC de la comiterea ultimei infracțiuni).\n• Polițiștii au obligația de a efectua razii zilnice dar nu mai des de 2 ore OOC la aceeași locație.\n• Un polițist nu are dreptul de a fi corupt. Corupția se pedepsește OOC.\n• Polițiștii pot lega bandiții în timpul unui jaf, îi pot duce în celula din secția de poliție după care se pot întoarce să continue acțiunea.",
            },
          ],
        },
      ],
    },
  ];

  const getCategoryHint = (_categoryId: string) => {
    return `Apasă pe numele secțiunii pentru a vedea regulile.`;
  };

  const getSectionHint = (_sectionId: string) => {
    return `Apasă pentru a extinde și a vedea informațiile.`;
  };

  return (
      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto max-w-4xl py-12">
          <div className="mb-12 text-center">
            <h1 className="font-display title-burnt mb-4 text-4xl md:text-5xl">
              Regulament Valahia RP
            </h1>
            <p className="text-muted-foreground text-lg">
              Familiarizează-te cu regulile serverului pentru o experiență
              optimă
            </p>
          </div>

          <div className="space-y-8">
            {rulesData.map((category) => {
              const IconComponent = category.icon;

              if ((category as any).isMainAccordion) {
                return (
                  <div key={category.id} className="space-y-4">
                    <Accordion type="single" collapsible className="glass-panel w-full rounded-xl px-4">
                      <AccordionItem value={category.id}>
                        <AccordionTrigger className="group text-foreground font-display text-2xl no-underline hover:no-underline [&>svg]:text-[#c4b6a8]">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                              <IconComponent className="text-ember h-6 w-6" />
                              {category.title}
                            </div>
                            <span className="text-muted-foreground ml-9 text-sm font-normal group-data-[state=open]:hidden no-underline hover:no-underline decoration-transparent" style={{ textDecoration: 'none' }}>
                              {getCategoryHint(category.id)}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="ml-12">
                            <Accordion type="multiple" className="w-full">
                              {category.children.map((section) => (
                                <AccordionItem key={section.id} value={section.id}>
                                  <AccordionTrigger className="group text-foreground text-lg font-medium no-underline hover:no-underline [&>svg]:text-[#c4b6a8]">
                                    <div className="flex flex-col">
                                      <span>{section.title}</span>
                                      <span className="text-muted-foreground ml-0 text-sm font-normal group-data-[state=open]:hidden no-underline hover:no-underline decoration-transparent" style={{ textDecoration: 'none' }}>
                                        {getSectionHint(section.id)}
                                      </span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="space-y-4">
                                      {section.children.map((qa, index) => (
                                        <div
                                          key={index}
                                          className="glass-panel rounded-lg border-l-4 border-l-[#c9432b] p-4"
                                        >
                                          <h4 className="text-ember mb-2 text-lg font-semibold">
                                            {qa.question}
                                          </h4>
                                          <p className="text-muted-foreground text-base leading-relaxed">
                                            {qa.answer.split('\n').map((line, i) => (
                                              <span key={i} className={`block mb-2 ${line.trim().startsWith('–') ? 'ml-4' : ''}`}>
                                                {line.split('**').map((part, index) =>
                                                  index % 2 === 1 ? (
                                                    <strong key={index}>{part}</strong>
                                                  ) : (
                                                    part
                                                  )
                                                )}
                                              </span>
                                            ))}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                );
              }

              return (
                <div key={category.id} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <IconComponent className="text-ember h-6 w-6" />
                    <h2 className="font-display text-2xl">
                      {category.title}
                    </h2>
                  </div>

                  {(category as any).allowMultiple ? (
                    <Accordion
                      type="multiple"
                      className="w-full"
                      {...((category as any).defaultOpen && { defaultValue: (category as any).defaultOpen })}
                    >
                      {category.children.map((section) => (
                        <AccordionItem key={section.id} value={section.id}>
                          <AccordionTrigger className="group text-foreground text-lg font-medium no-underline hover:no-underline [&>svg]:text-[#c4b6a8]">
                            <div className="flex flex-col">
                              <span>{section.title}</span>
                              <span className="text-muted-foreground ml-0 text-sm font-normal group-data-[state=open]:hidden no-underline hover:no-underline decoration-transparent" style={{ textDecoration: 'none' }}>
                                {getSectionHint(section.id)}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              {section.children.map((qa, index) => (
                                <div
                                  key={index}
                                  className="glass-panel rounded-lg border-l-4 border-l-[#c9432b] p-4"
                                >
                                  <h4 className="text-ember mb-2 text-lg font-semibold">
                                    {qa.question}
                                  </h4>
                                  <p className="text-muted-foreground text-base leading-relaxed">
                                    {qa.answer.split('\n').map((line, i) => (
                                      <span key={i} className={`block mb-2 ${line.trim().startsWith('–') ? 'ml-8' : ''}`}>
                                        {line.split('**').map((part, index) =>
                                          index % 2 === 1 ? (
                                            <strong key={index}>{part}</strong>
                                          ) : (
                                            part
                                          )
                                        )}
                                      </span>
                                    ))}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {category.children.map((section) => (
                        <AccordionItem key={section.id} value={section.id}>
                          <AccordionTrigger className="group text-foreground text-lg font-medium no-underline hover:no-underline [&>svg]:text-[#c4b6a8]">
                            <div className="flex flex-col">
                              <span>{section.title}</span>
                              <span className="text-muted-foreground ml-0 text-sm font-normal group-data-[state=open]:hidden no-underline hover:no-underline decoration-transparent" style={{ textDecoration: 'none' }}>
                                {getSectionHint(section.id)}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              {section.children.map((qa, index) => (
                                <div
                                  key={index}
                                  className="glass-panel rounded-lg border-l-4 border-l-[#c9432b] p-4"
                                >
                                  <h4 className="text-ember mb-2 text-lg font-semibold">
                                    {qa.question}
                                  </h4>
                                  <p className="text-muted-foreground text-base leading-relaxed">
                                    {qa.answer.split('\n').map((line, i) => (
                                      <span key={i} className={`block mb-2 ${line.trim().startsWith('–') ? 'ml-8' : ''}`}>
                                        {line.split('**').map((part, index) =>
                                          index % 2 === 1 ? (
                                            <strong key={index}>{part}</strong>
                                          ) : (
                                            part
                                          )
                                        )}
                                      </span>
                                    ))}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </div>
              );
            })}
          </div>

          <div className="glass-panel mt-12 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-6 w-6 text-amber-500" />
              <div>
                <h3 className="font-display mb-2">
                  Important
                </h3>
                <p className="text-muted-foreground">
                  Acest regulament este în continuă evoluție. Staff-ul se
                  rezervă dreptul de a modifica regulile pentru a îmbunătăți
                  experiența comunității. Ultima actualizare:{" "}
                  <strong>{new Date().toLocaleDateString("ro-RO")}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
