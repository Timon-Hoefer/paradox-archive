(()=>{
  const exact=new Map(Object.entries({
    "The Paradox Archive — A Mathematical Journey":"Das Paradox-Archiv — Eine mathematische Reise",
    "The Paradox Archive — Zeno's Gate":"Das Paradox-Archiv — Zenons Tor",
    "The Paradox Archive — A Night at Hilbert's Hotel":"Das Paradox-Archiv — Eine Nacht in Hilberts Hotel",
    "The Paradox Archive — The Oracle's Drop":"Das Paradox-Archiv — Der Fall des Orakels",
    "Chapter IV — The Endless Corridor":"Kapitel IV — Der endlose Korridor",
    "Chapter V — The Final Question":"Kapitel V — Die letzte Frage",
    "The Paradox Archive":"Das Paradox-Archiv",
    "Journey ready":"Reise bereit",
    "Five impossible rooms. One way through.":"Fünf unmögliche Räume. Ein Weg hindurch.",
    "Enter the":"Betritt das",
    "Paradox Archive.":"Paradox-Archiv.",
    "A mathematical journey where the rules are never quite where you expect them. Watch closely. Question the room. Every solved paradox opens the next door.":"Eine mathematische Reise, bei der die Regeln nie ganz dort liegen, wo du sie erwartest. Schau genau hin. Hinterfrage den Raum. Jedes gelöste Paradox öffnet die nächste Tür.",
    "Chapter 01":"Kapitel 01","Chapter 02":"Kapitel 02","Chapter 03":"Kapitel 03","Chapter 04":"Kapitel 04","Chapter 05":"Kapitel 05",
    "Zeno's Gate":"Zenons Tor","Hilbert's Infinite Hotel":"Hilberts unendliches Hotel","The Oracle's Drop":"Der Fall des Orakels","The Endless Corridor":"Der endlose Korridor","The Final Question":"Die letzte Frage",
    "Begin the journey  →":"Reise beginnen  →","Five chapters · progress in order":"Fünf Kapitel · der Reihe nach",
    "Mathematical puzzle experience":"Mathematische Rätselreise","Observe · infer · break the rule":"Beobachten · folgern · Regel brechen",
    "Chapter 01 · Zeno's Gate":"Kapitel 01 · Zenons Tor","Incoming transmission · Archive node 01":"Eingehende Übertragung · Archivknoten 01",
    "Catch what":"Fange, was","cannot":"nicht","be caught.":"gefangen werden kann.",
    "Five impossible seals":"Fünf unmögliche Siegel","protect the Last Theorem. Break them before the Paradox Archive erases itself. The first gate belongs to Zeno.":"schützen das Letzte Theorem. Brich sie, bevor sich das Paradox-Archiv selbst auslöscht. Das erste Tor gehört Zeno.",
    "Every approach leaves it space to escape.":"Jede Annäherung lässt ihm Raum zur Flucht.","Catch the gate to enter the Archive.":"Fange das Tor, um das Archiv zu betreten.",
    "Space available":"Verfügbarer Raum","Start the riddle":"Rätsel starten","Zeno has nowhere to run":"Zeno kann nirgendwohin entkommen",
    "Space collapsed. The gate is finally within reach.":"Der Raum ist kollabiert. Das Tor ist endlich erreichbar.",
    "Zeno is not faster than you. He simply has too much space.":"Zeno ist nicht schneller als du. Er hat einfach zu viel Raum.",
    "Think like a geometer: change the space, not your speed.":"Denke geometrisch: Verändere den Raum, nicht deine Geschwindigkeit.",
    "Seal I broken · Zeno's Gate":"Siegel I gebrochen · Zenons Tor","You did not catch it.":"Du hast es nicht gefangen.","You removed infinity.":"Du hast die Unendlichkeit entfernt.",
    "The gate could always take another step—until there was no space left for a step.":"Das Tor konnte immer noch einen Schritt machen – bis kein Raum mehr für einen Schritt blieb.",
    "You changed the geometry of the problem instead of running faster.":"Du hast die Geometrie des Problems verändert, statt schneller zu laufen.",
    "Enter chapter II · Hilbert's Infinite Hotel →":"Kapitel II betreten · Hilberts unendliches Hotel →","Enter chapter II · The Oracle's Drop →":"Kapitel II betreten · Der Fall des Orakels →",
    "Your journey · Night II":"Deine Reise · Nacht II","Night is falling.":"Die Nacht bricht herein.","You need a room.":"Du brauchst ein Zimmer.",
    "“The infinite! No other question has ever moved so profoundly the spirit of man.”":"„Das Unendliche! Keine andere Frage hat jemals den Geist des Menschen so tief bewegt.“",
    "Beyond Zeno's Gate, the road leads to":"Hinter Zenons Tor führt der Weg zu","Hilbert's Hotel":"Hilberts Hotel",
    ": a hotel with rooms numbered 1, 2, 3, and so on forever. Every numbered room already has a resident. You may rearrange them—but when night falls, the waiting room must be empty and no room may be shared.":": einem Hotel mit den Zimmern 1, 2, 3 und so weiter bis ins Unendliche. Jedes nummerierte Zimmer ist bereits belegt. Du darfst die Gäste umverteilen – doch bei Einbruch der Nacht muss der Warteraum leer sein und kein Zimmer darf doppelt belegt sein.",
    "Rule I":"Regel I","Everyone has a room":"Jeder hat ein Zimmer","Rule II":"Regel II","No room is shared":"Kein Zimmer ist doppelt belegt","Rule III":"Regel III","Waiting room empty":"Warteraum leer",
    "Approach the reception →":"Zur Rezeption →","Chapter 02 · A Night at Hilbert's Hotel":"Kapitel 02 · Eine Nacht in Hilberts Hotel","Chapter 03 · A Night at Hilbert's Hotel":"Kapitel 03 · Eine Nacht in Hilberts Hotel","Your journey · Night III":"Deine Reise · Nacht III","Beyond the Oracle's Chasm, the road leads to":"Hinter dem Abgrund des Orakels führt der Weg zu",
    "Sunset in 00:∞ · Reception refuses no one":"Sonnenuntergang in 00:∞ · Die Rezeption weist niemanden ab","Find yourself a room":"Finde ein Zimmer","before":"vor","nightfall.":"Einbruch der Nacht.",
    "You are currently in the waiting room.":"Du bist gerade im Warteraum.","Rearrange residents, discover a rule that continues beyond the visible corridor, then let night fall.":"Verteile die Gäste neu, entdecke eine Regel, die über den sichtbaren Korridor hinaus gilt, und lass dann die Nacht hereinbrechen.",
    "∞ uncertified":"∞ nicht bestätigt","∞ certified":"∞ bestätigt","Waiting room":"Warteraum","Empty by nightfall":"Bei Nacht leer",
    "Houses continue forever · through":"Die Häuser gehen ewig weiter · bis","Drag residents between rooms. The corridor keeps generating rooms as you travel.":"Ziehe Gäste zwischen den Zimmern. Der Korridor erzeugt unterwegs immer neue Zimmer.",
    "Observed":"Beobachtete","movement":"Bewegung","Create two matching moves to reveal a repeatable pattern.":"Erzeuge zwei passende Züge, um ein wiederholbares Muster sichtbar zu machen.","Create five matching moves to reveal a repeatable pattern.":"Erzeuge fünf passende Züge, um ein wiederholbares Muster sichtbar zu machen.",
    "Repeat to infinity":"Bis ins Unendliche wiederholen","Undo":"Rückgängig","Reset":"Zurücksetzen","Let night fall":"Nacht hereinbrechen lassen",
    "Nightfall inspection":"Kontrolle bei Nacht","Can the hotel sleep?":"Kann das Hotel schlafen?","Return to the lobby":"Zurück zur Lobby",
    "Seal II broken · Hilbert's Hotel":"Siegel II gebrochen · Hilberts Hotel","The waiting room is empty.":"Der Warteraum ist leer.","Infinity still has space.":"Die Unendlichkeit hat noch Platz.",
    "You did not search for the final room—there is none.":"Du hast nicht nach dem letzten Zimmer gesucht – denn es gibt keines.",
    "You created a rule that gives every resident a unique room and still leaves one for you.":"Du hast eine Regel geschaffen, die jedem Gast ein eigenes Zimmer gibt und trotzdem eines für dich freilässt.",
    "Continue the journey · Chapter III →":"Reise fortsetzen · Kapitel III →","Continue the journey · Chapter IV →":"Reise fortsetzen · Kapitel IV →","Seal III broken · Hilbert's Hotel":"Siegel III gebrochen · Hilberts Hotel","The corridor tests your movement beyond every visible room…":"Der Korridor prüft deine Bewegung über jedes sichtbare Zimmer hinaus …",
    "A repeatable movement has appeared. Carry the pattern into infinity.":"Eine wiederholbare Bewegung ist entstanden. Trage das Muster bis in die Unendlichkeit.",
    "Drag this repeated movement onto the infinity symbol.":"Ziehe diese wiederholte Bewegung auf das Unendlichkeitssymbol.","Last movement undone.":"Letzte Bewegung rückgängig gemacht.",
    "EMPTY":"LEER","CLEAR":"FREI","CERTIFIED":"BESTÄTIGT","LOCAL MOVES ONLY":"NUR LOKALE ZÜGE","NO ROOM":"KEIN ZIMMER",
    "No room shared":"Kein Zimmer doppelt belegt","Every move extends to infinity":"Jeder Zug reicht bis ins Unendliche","You have a room":"Du hast ein Zimmer",
    "Your journey · The morning after Hilbert's Hotel":"Deine Reise · Der Morgen nach Hilberts Hotel","Seal every future":"Versiegle jede Zukunft","before the fall.":"vor dem Fall.",
    "At the Chasm of Possible Paths, an oracle guards the road. Its sphere may enter through any of four gates, then follows the braided channels downward.":"Am Abgrund der möglichen Pfade bewacht ein Orakel den Weg. Seine Kugel kann durch jedes der vier Tore eintreten und folgt dann den verflochtenen Kanälen nach unten.",
    "Paths split, cross and reunite.":"Pfade teilen sich, kreuzen sich und laufen wieder zusammen.","It sees the entire network and will exploit any route you leave open.":"Es sieht das gesamte Netz und nutzt jeden Weg, den du offenlässt.",
    "Place four stones anywhere ·":"Platziere vier Steine frei ·","The oracle moves second":"Das Orakel zieht als Zweites","Enter the path lattice →":"In das Pfadgitter eintreten →",
    "Chapter 03 · The Oracle's Drop":"Kapitel 03 · Der Fall des Orakels","Chapter 02 · The Oracle's Drop":"Kapitel 02 · Der Fall des Orakels","Your journey · Beyond Zeno's Gate":"Deine Reise · Hinter Zenons Tor","Chasm of Possible Paths · Oracle online":"Abgrund der möglichen Pfade · Orakel aktiv",
    "Block every route.":"Blockiere jeden Weg.","Not just the":"Nicht nur den","likely one.":"wahrscheinlichen.","The sphere has perfect foresight.":"Die Kugel besitzt perfekte Voraussicht.",
    "Build your barrier before release. If one complete path survives, it will find it.":"Errichte deine Barriere vor dem Start. Bleibt ein vollständiger Weg offen, wird sie ihn finden.",
    "The oracle's laws":"Die Gesetze des Orakels","All channels are live":"Alle Kanäle sind aktiv","Every visible connection can carry the sphere.":"Jede sichtbare Verbindung kann die Kugel tragen.",
    "Total freedom":"Völlige Freiheit","Use any four of the fifteen inner junctions.":"Nutze beliebige vier der fünfzehn inneren Knoten.","Perfect foresight":"Perfekte Voraussicht","One surviving route is enough for escape.":"Ein einziger offener Weg genügt zur Flucht.",
    "Attempts":"Versuche","Braided network ·":"Verflochtenes Netz ·","15 open junctions":"15 offene Knoten","Four open entry gates":"Vier offene Eingangstore","Four roads beyond the chasm":"Vier Wege hinter dem Abgrund",
    "Seal stones":"Siegelsteine","Placed":"Platziert","Choose any four junctions. Several stones may occupy the same vertical channel.":"Wähle beliebige vier Knoten. Mehrere Steine dürfen im selben vertikalen Kanal liegen.",
    "Release the oracle":"Orakel freilassen","Clear barrier":"Barriere leeren","That junction is already sealed.":"Dieser Knoten ist bereits versiegelt.",
    "All stones are ready.":"Alle Steine sind bereit.","One future remained open. The oracle chose it.":"Eine Zukunft blieb offen. Das Orakel wählte sie.",
    "The oracle found a gap. A wall need not be straight—but it must cross every possible descent.":"Das Orakel fand eine Lücke. Eine Mauer muss nicht gerade sein – aber sie muss jeden möglichen Abstieg kreuzen.",
    "The escape path crossed the barrier. A complete cut must connect both sides of the lattice.":"Der Fluchtweg durchquerte die Barriere. Ein vollständiger Schnitt muss beide Seiten des Gitters verbinden.",
    "Move one of your four existing stones to try another junction.":"Verschiebe einen deiner vier Steine auf einen anderen Knoten.","Barrier cleared. Choose any four of the fifteen junctions.":"Barriere geleert. Wähle vier der fünfzehn Knoten.",
    "Seal III broken · Unique minimum cut verified":"Siegel III gebrochen · Eindeutiger minimaler Schnitt bestätigt","Seal II broken · Unique minimum cut verified":"Siegel II gebrochen · Eindeutiger minimaler Schnitt bestätigt","You did not predict the path.":"Du hast den Weg nicht vorhergesagt.","You removed every future.":"Du hast jede Zukunft entfernt.",
    "Your four stones form the network's unique minimum vertex cut.":"Deine vier Steine bilden den eindeutigen minimalen Knotenschnitt des Netzes.","Every possible descent meets the barrier, so perfect foresight is no longer enough.":"Jeder mögliche Abstieg trifft auf die Barriere. Perfekte Voraussicht genügt nicht mehr.",
    "Continue to Chapter IV →":"Weiter zu Kapitel IV →","Your journey · Beyond the Chasm of Possible Paths":"Deine Reise · Hinter dem Abgrund der möglichen Pfade","Your journey · Beyond Hilbert's Hotel":"Deine Reise · Hinter Hilberts Hotel","Beyond Hilbert's Hotel stands a procession of identical rooms.":"Hinter Hilberts Hotel folgt eine Reihe identischer Räume.",
    "The corridor":"Der Korridor","has no end.":"hat kein Ende.","Beyond the oracle's lattice stands a procession of identical rooms. Each door promises progress.":"Hinter dem Gitter des Orakels folgt eine Reihe identischer Räume. Jede Tür verspricht Fortschritt.",
    "Find the exit and continue your journey.":"Finde den Ausgang und setze deine Reise fort.","Enter the first room →":"Den ersten Raum betreten →","Chapter 04 · The Endless Corridor":"Kapitel 04 · Der endlose Korridor",
    "The first threshold":"Die erste Schwelle","The corridor continues":"Der Korridor geht weiter","A path has appeared":"Ein Weg ist erschienen","The exit was behind you.":"Der Ausgang lag hinter dir.",
    "You returned through every room you created. Where the first threshold stood, another door is now open.":"Du bist durch jeden von dir geschaffenen Raum zurückgekehrt. Wo die erste Schwelle stand, ist nun eine andere Tür offen.",
    "Leave the corridor":"Den Korridor verlassen","Seal IV broken · Inverse path restored":"Siegel IV gebrochen · Umgekehrter Pfad wiederhergestellt","Forward built the maze.":"Vorwärts entstand das Labyrinth.","Backward erased it.":"Rückwärts wurde es gelöscht.",
    "The corridor was a stack of your own decisions.":"Der Korridor war ein Stapel deiner eigenen Entscheidungen.","The last room entered was the first one you had to leave.":"Der zuletzt betretene Raum war der erste, den du verlassen musstest.","Face the final question →":"Stelle dich der letzten Frage →",
    "Chapter 05 · The Final Question":"Kapitel 05 · Die letzte Frage","One question remains":"Eine Frage bleibt","What is the answer to life,":"Wie lautet die Antwort auf das Leben,","the universe, and everything?":"das Universum und den ganzen Rest?",
    "You crossed infinity, narrowed possibility and walked backward through your own decisions. The archive asks for one final constant.":"Du hast die Unendlichkeit durchquert, Möglichkeiten eingegrenzt und deine eigenen Entscheidungen rückwärts durchlaufen. Das Archiv verlangt eine letzte Konstante.",
    "The answer is already here.":"Die Antwort ist bereits hier.","Your answer":"Deine Antwort","Enter the answer":"Antwort eingeben","Answer":"Antwort",
    "The final seal is broken":"Das letzte Siegel ist gebrochen","The archive is open. The journey is complete.":"Das Archiv ist offen. Die Reise ist vollendet.","Did you know?":"Wusstest du?",
    "Hall of Fame":"Ruhmeshalle","Newest travellers appear first":"Neueste Reisende stehen oben","Name":"Name","Comment":"Kommentar","Your name":"Dein Name","Your comment · max. 100 characters":"Dein Kommentar · max. 100 Zeichen","Join":"Eintragen",
    "Recorded":"Eingetragen","Your place in the archive is sealed.":"Dein Platz im Archiv ist besiegelt.","Entry locked":"Eintrag gesperrt","Be the first name in the archive.":"Sei der erste Name im Archiv.","The archive remains closed.":"Das Archiv bleibt geschlossen.",
    "One of five seals active":"Eines von fünf Siegeln ist aktiv","Rules for the night":"Regeln für die Nacht","Waiting room drop zone":"Ablagefläche des Warteraums","A corridor that generates more numbered rooms as it is scrolled":"Ein Korridor, der beim Scrollen weitere nummerierte Zimmer erzeugt","Infinity target":"Ziel Unendlichkeit","Drag the repeated pattern to infinity":"Ziehe das wiederholte Muster in die Unendlichkeit",
    "The archive has lost its logic. Recover five mathematical nodes. Each accepts a different kind of proof.":"Das Archiv hat seine Logik verloren. Stelle fünf mathematische Knoten wieder her. Jeder verlangt eine andere Art von Beweis.","Node 01":"Knoten 01","Node 02":"Knoten 02","Node 03":"Knoten 03","Node 04":"Knoten 04","Node 05":"Knoten 05","Initialize session →":"Sitzung initialisieren →","paradox/os · recovery mode":"paradox/os · Wiederherstellungsmodus",
    "Start Journey":"Reise starten","run node_01":"node_01 starten","node_01 // cleared":"node_01 // abgeschlossen","Space collapsed.":"Raum kollabiert.","The gate needed infinite room. You removed the room.":"Das Tor brauchte unendlichen Raum. Du hast den Raum entfernt.","Open node 02 →":"Knoten 02 öffnen →",
    "Path lattice":"Pfadgitter","Run node 02":"Knoten 02 starten","node_02 // live":"node_02 // aktiv","Close the lattice.":"Schließe das Gitter.","network //":"netzwerk //","15 nodes":"15 Knoten","entry":"eingang","exit":"ausgang","blocks":"blöcke","Release":"Start","Clear":"Leeren","minimum vertex cut // verified":"minimaler Knotenschnitt // bestätigt","Every path is closed.":"Jeder Weg ist geschlossen.","Four vertices separate every entry from every exit.":"Vier Knoten trennen jeden Eingang von jedem Ausgang.","Open node 03 →":"Knoten 03 öffnen →",
    "No vacancies.":"Keine Zimmer frei.","Night falls. Hilbert's Hotel has infinitely many numbered rooms—and every one is occupied. Make room for yourself.":"Die Nacht bricht herein. Hilberts Hotel hat unendlich viele nummerierte Zimmer – und jedes ist belegt. Schaffe Platz für dich.","Open reception":"Rezeption öffnen","node_03 // nightfall pending":"node_03 // Nacht steht bevor","node_03 · [ rules ]":"node_03 · [ regeln ]","rules://night":"regeln://nacht","Continue":"Weiter","Make room.":"Schaffe Platz.","Infinity made room.":"Die Unendlichkeit machte Platz.","One rule moved every guest and left no one behind.":"Eine Regel bewegte jeden Gast und ließ niemanden zurück.","Open node 04 →":"Knoten 04 öffnen →",
    "Find the exit.":"Finde den Ausgang.","Each door creates another room. The archive records every step.":"Jede Tür erzeugt einen weiteren Raum. Das Archiv speichert jeden Schritt.","Enter":"Betreten","room_00 // changed":"raum_00 // verändert","The exit is open.":"Der Ausgang ist offen.","Exit":"Verlassen","node_04 // inverse path restored":"node_04 // umgekehrter Pfad wiederhergestellt","Backward erased the maze.":"Rückwärts löschte das Labyrinth.","The last room entered was the first one left.":"Der zuletzt betretene Raum wurde zuerst verlassen.","Open final query →":"Letzte Anfrage öffnen →",
    "Life. Universe. Everything.":"Leben. Universum. Der ganze Rest.","archive // unlocked":"archiv // entsperrt","Session complete.":"Sitzung abgeschlossen.",
    "An apparently endless corridor":"Ein scheinbar endloser Korridor","Enter the next room":"Den nächsten Raum betreten","The open exit":"Der offene Ausgang","A black field containing an almost invisible pixel pattern":"Ein schwarzes Feld mit einem fast unsichtbaren Pixelmuster","Braided directed path network":"Verflochtenes gerichtetes Pfadnetz"
  }));

  const patterns=[
    [/^Waiting (\d+)$/,m=>`Wartend ${m[1]}`],[/^Shared (\d+)$/,m=>`Doppelt belegt ${m[1]}`],[/^Room ([\d.,]+)$/,m=>`Zimmer ${m[1]}`],
    [/^Resident (\d+)$/,m=>`Gast ${m[1]}`],[/^(\d+) still waiting$/,m=>`${m[1]} noch im Warteraum`],[/^(\d+) collisions?$/,m=>`${m[1]} Doppelbelegung${m[1]==='1'?'':'en'}`],
    [/^ROOM (\d+)$/,m=>`ZIMMER ${m[1]}`],[/^You entered Room (\d+)\. The night rules still need to pass\.$/,m=>`Du hast Zimmer ${m[1]} betreten. Die Regeln für die Nacht müssen noch erfüllt werden.`],
    [/^You returned to the waiting room\.$/,()=>`Du bist in den Warteraum zurückgekehrt.`],[/^Resident (\d+) is waiting temporarily\. The room must be empty before night\.$/,m=>`Gast ${m[1]} wartet vorübergehend. Der Warteraum muss vor der Nacht leer sein.`],
    [/^Resident (\d+) moved\. Observe the vacancies and collisions you created\.$/,m=>`Gast ${m[1]} wurde verschoben. Beobachte die freien und doppelt belegten Zimmer.`],
    [/^Pattern certified for the infinite corridor\. (\d+) rooms? (?:is|are) now vacant\.$/,m=>`Muster für den unendlichen Korridor bestätigt. ${m[1]} Zimmer ${m[1]==='1'?'ist':'sind'} jetzt frei.`],
    [/^Stone (\d+) placed in channel (\d+), level (\d+)\. (\d+) remaining\.$/,m=>`Stein ${m[1]} in Kanal ${m[2]}, Ebene ${m[3]} platziert. ${m[4]} verbleibend.`],
    [/^Stone (\d+) placed in channel (\d+), level (\d+)\. All stones are ready\.$/,m=>`Stein ${m[1]} in Kanal ${m[2]}, Ebene ${m[3]} platziert. Alle Steine sind bereit.`],
    [/^Blocker junction, channel (\d+), level (\d+)$/,m=>`Blockierbarer Knoten, Kanal ${m[1]}, Ebene ${m[2]}`],[/^Open entry gate (\d+)$/,m=>`Offenes Eingangstor ${m[1]}`],[/^Exit road (\d+)$/,m=>`Ausgangsweg ${m[1]}`],[/^Seal stone (.+)$/,m=>`Siegelstein ${m[1]}`],
    [/^Room (\d{2})$/,m=>`Raum ${m[1]}`],[/^The ([IVX]+) chamber$/,m=>`Kammer ${m[1]}`]
  ];

  const params=new URL(location.href).searchParams;
  let lang=params.get('lang');
  if(lang!=='de'&&lang!=='en'){try{lang=localStorage.getItem('paradox-archive-language')}catch{};if(lang!=='de')lang='en'}

  const textState=new WeakMap(),attributeState=new WeakMap();
  let controls,restartButton;
  function translateCore(value){if(exact.has(value))return exact.get(value);for(const [pattern,replace] of patterns){const match=value.match(pattern);if(match)return replace(match)}return value}
  function excluded(element){return element?.closest?.('.fame-entry,#pa-language,#pa-transition')}
  function textPair(raw){const lead=raw.match(/^\s*/)[0],tail=raw.match(/\s*$/)[0],core=raw.trim();return{en:raw,de:core?lead+translateCore(core)+tail:raw}}
  function translateText(node){
    if(excluded(node.parentElement))return;
    const raw=node.nodeValue;let state=textState.get(node);
    if(!state||raw!==state.en&&raw!==state.de){state=textPair(raw);textState.set(node,state)}
    const next=lang==='de'?state.de:state.en;if(raw!==next)node.nodeValue=next;
  }
  function translateAttributes(element){
    if(!(element instanceof Element)||excluded(element))return;
    let states=attributeState.get(element);if(!states){states={};attributeState.set(element,states)}
    for(const name of ['placeholder','aria-label','title']){
      if(!element.hasAttribute(name))continue;
      const raw=element.getAttribute(name),known=states[name];
      if(!known||raw!==known.en&&raw!==known.de)states[name]={en:raw,de:translateCore(raw)};
      const next=lang==='de'?states[name].de:states[name].en;if(raw!==next)element.setAttribute(name,next);
    }
  }
  function translateTree(root){
    if(root.nodeType===Node.TEXT_NODE){translateText(root);return}
    if(!(root instanceof Element)&&root!==document.documentElement)return;
    if(root instanceof Element)translateAttributes(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let node;
    while((node=walker.nextNode()))node.nodeType===Node.TEXT_NODE?translateText(node):translateAttributes(node);
  }
  function decorateLinks(root=document){
    for(const anchor of root.querySelectorAll?.('a[href]')||[]){
      const raw=anchor.getAttribute('href');if(!raw||raw.startsWith('#')||raw.startsWith('javascript:'))continue;
      try{const url=new URL(raw,location.href);if(url.protocol!=='file:'&&url.origin!==location.origin)continue;if(lang==='de')url.searchParams.set('lang','de');else url.searchParams.delete('lang');anchor.href=url.href}catch{}
    }
  }
  function updateControls(){
    if(!controls)return;
    controls.setAttribute('aria-label',lang==='de'?'Reise- und Sprachsteuerung':'Journey and language controls');
    restartButton.textContent=lang==='de'?'Neu starten':'Restart';
    for(const button of controls.querySelectorAll('[data-language]'))button.setAttribute('aria-pressed',String(button.dataset.language===lang));
  }
  function choose(next){
    if(next===lang)return;
    lang=next;try{localStorage.setItem('paradox-archive-language',next)}catch{}
    document.documentElement.lang=lang;translateTree(document.documentElement);decorateLinks();updateControls();
    const url=new URL(location.href);if(lang==='de')url.searchParams.set('lang','de');else url.searchParams.delete('lang');
    try{history.replaceState(history.state,'',url.href)}catch{}
    document.dispatchEvent(new CustomEvent('paradox:languagechange',{detail:{language:lang}}));
  }
  function restart(){const url=new URL('zenos-gate.html',location.href);if(lang==='de')url.searchParams.set('lang','de');else url.searchParams.delete('lang');location.href=url.href}
  function addInterface(){
    const style=document.createElement('style');
    style.textContent=':root{--pa-terminal-accent:#d97757;--pa-terminal-font:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}body,button,input,textarea{font-family:var(--pa-terminal-font)!important}.intro-copy,.brief-copy,.journey,.mission,.epilogue p,.reference,.completion,.message{font-family:var(--pa-terminal-font)!important}#pa-language{position:fixed;z-index:2000;right:12px;bottom:12px;display:flex;gap:3px;padding:4px;border:1px solid #46413b;border-radius:8px;background:rgba(24,23,21,.94);box-shadow:0 12px 36px rgba(0,0,0,.24);font:700 10px/1 var(--pa-terminal-font)}#pa-language button{min-width:32px;height:28px;padding:0;border:0;border-radius:5px;background:transparent;color:#99958d;cursor:pointer}#pa-language .pa-restart{min-width:auto;padding:0 10px;margin-right:3px;color:#cbc6bc}#pa-language button[aria-pressed="true"]{background:rgba(217,119,87,.2);color:#f2c1ad}#pa-transition{position:fixed;z-index:5000;inset:0;display:grid;place-items:center;padding:24px;background:#1d1c1a;color:#d6d1c7;font-family:var(--pa-terminal-font)}.pa-terminal-window{width:min(720px,100%);border:1px solid #47423c;border-radius:10px;background:#242320;box-shadow:0 30px 90px rgba(0,0,0,.42);overflow:hidden}.pa-terminal-head{padding:11px 15px;border-bottom:1px solid #3d3934;color:#8e8980;font-size:11px;letter-spacing:.06em}.pa-terminal-output{min-height:190px;padding:24px 20px;font-size:clamp(13px,1.7vw,16px);line-height:1.75}.pa-terminal-line{display:flex;gap:11px;min-height:1.75em}.pa-terminal-prompt{color:var(--pa-terminal-accent)}.pa-terminal-cursor{display:inline-block;width:8px;height:1.05em;margin-left:3px;vertical-align:-.12em;background:var(--pa-terminal-accent);animation:pa-blink .8s steps(1) infinite}@keyframes pa-blink{50%{opacity:0}}@media(prefers-reduced-motion:reduce){.pa-terminal-cursor{animation:none}}';
    style.textContent+=`
      :root{--void:#080b09!important;--ink:#d7dfd7!important;--muted:#78837a!important;--line:rgba(130,232,151,.18)!important;--panel:rgba(8,13,10,.9)!important;--acid:#82e897!important;--blue:#82e897!important;--gold:#d7b46a!important;--violet:#a998e8!important;--good:#82e897!important;--pa-terminal-accent:#82e897;--pa-terminal-bg:#080b09;--pa-terminal-panel:#0d120f;--pa-terminal-dim:#78837a}
      html,body{background:#080b09!important}body{color:var(--ink)!important;background-image:linear-gradient(rgba(130,232,151,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(130,232,151,.025) 1px,transparent 1px)!important;background-size:24px 24px!important}
      body::before{content:"";position:fixed;z-index:1900;inset:0;pointer-events:none;background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(0,0,0,.12) 4px);mix-blend-mode:multiply}
      h1,h2,h3{font-family:var(--pa-terminal-font)!important;font-weight:500!important;letter-spacing:-.035em!important}.intro h1,.brief h1,.briefing h1,.question h1,.epilogue h2,.escape h2{font-size:clamp(24px,4vw,44px)!important;line-height:1.08!important}
      .intro,.epilogue,.ending{background-color:rgba(8,11,9,.97)!important;background-image:linear-gradient(rgba(130,232,151,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(130,232,151,.025) 1px,transparent 1px)!important;background-size:24px 24px!important}
      .intro-inner,.epilogue-card,.epilogue-inner,.escape-card,.ending-inner,.check-card{position:relative;border:1px solid var(--line)!important;border-radius:2px!important;background:rgba(8,13,10,.92)!important;box-shadow:0 24px 80px rgba(0,0,0,.35)!important;padding:clamp(22px,4vw,38px)!important}
      .intro-inner::before,.epilogue-card::before,.epilogue-inner::before,.ending-inner::before,.check-card::before{content:"PARADOX/OS  //  SESSION ACTIVE";display:block;margin:-8px 0 24px;color:var(--pa-terminal-dim);font:500 10px/1.4 var(--pa-terminal-font);letter-spacing:.11em;text-align:left}
      .topbar{background:rgba(8,13,10,.9)!important;border-color:var(--line)!important;color:var(--pa-terminal-dim)!important;font-family:var(--pa-terminal-font)!important}.brand{color:var(--ink)!important;font-weight:500!important}.brand-mark{border:0!important;border-radius:0!important;background:var(--pa-terminal-accent)!important;box-shadow:0 0 14px rgba(130,232,151,.42)!important;transform:none!important}.seal{height:2px!important;border:0!important;border-radius:0!important;background:rgba(130,232,151,.15)!important}.seal.done{background:rgba(130,232,151,.45)!important}.seal.active{background:var(--pa-terminal-accent)!important;box-shadow:0 0 10px rgba(130,232,151,.5)!important}
      .intro-kicker,.kicker,.eyebrow,.solved-label,.epilogue-label,.ending-label,.escape-label{color:var(--pa-terminal-accent)!important;font-family:var(--pa-terminal-font)!important;font-weight:500!important;letter-spacing:.1em!important;text-transform:lowercase!important}
      #fleeing-button,#intro-start,.start,.action,.leave,.submit,.fame-save,.check-close,.repeat-handle,.next-link,.next-seal,.begin{border:1px solid var(--pa-terminal-accent)!important;border-radius:2px!important;background:rgba(130,232,151,.055)!important;color:var(--pa-terminal-accent)!important;box-shadow:none!important;font-family:var(--pa-terminal-font)!important;font-weight:500!important;letter-spacing:.05em!important;text-transform:lowercase!important}
      #fleeing-button:hover,#intro-start:hover,.start:hover,.action:hover,.leave:hover,.submit:hover,.fame-save:hover,.check-close:hover,.repeat-handle:hover,.next-link:hover,.next-seal:hover,.begin:hover{background:rgba(130,232,151,.13)!important;transform:none!important}.release,.night-button,.fame-save{background:var(--pa-terminal-accent)!important;color:#08100a!important}
      input,textarea,.form,.fame-input,.fame-comment{border-radius:2px!important;background:rgba(5,9,7,.92)!important;border-color:var(--line)!important;color:var(--ink)!important;box-shadow:none!important}
      #pa-language{border-color:var(--line);border-radius:2px;background:rgba(8,13,10,.96);box-shadow:none}#pa-language button{border-radius:1px}#pa-language button[aria-pressed="true"]{background:rgba(130,232,151,.15);color:var(--pa-terminal-accent)}
      #pa-transition{background:#080b09;color:var(--ink)}.pa-terminal-window{border-color:var(--line);border-radius:2px;background:var(--pa-terminal-panel);box-shadow:none}.pa-terminal-head{border-color:var(--line);color:var(--pa-terminal-dim)}
      .chapter-index .intro{max-width:680px;padding:28px;border:1px solid var(--line);border-radius:2px;background:rgba(8,13,10,.88)!important}.chapter-index h1{font-size:clamp(34px,6vw,68px)!important;line-height:1!important}.chapter-index .lead{max-width:580px;color:var(--muted);font-family:var(--pa-terminal-font);font-size:15px;line-height:1.65}.chapter-index .journey::before{background:linear-gradient(90deg,var(--pa-terminal-accent),rgba(130,232,151,.18))}.chapter-index .chapter::before{border-radius:0}.chapter-index footer{margin-top:54px;color:var(--pa-terminal-dim);border-color:var(--line)}
      .chapter-zeno .game::before{content:"archive://node_01";position:fixed;left:18px;top:16px;color:var(--pa-terminal-dim);font:500 10px/1 var(--pa-terminal-font);letter-spacing:.1em}.chapter-zeno #fleeing-button{background:#0d120f!important;color:var(--pa-terminal-accent)!important}
      .chapter-oracle .intro-inner{width:min(500px,100%)}.chapter-oracle .game{height:calc(100dvh - 60px);grid-template-columns:minmax(420px,760px) 210px;gap:18px}.chapter-oracle .side.left{display:none}.chapter-oracle .message{display:none!important}.chapter-oracle .board{border-color:var(--line);background:rgba(8,13,10,.42)}.chapter-oracle .tray,.chapter-oracle .status{border-radius:2px;border-color:var(--line);background:rgba(8,13,10,.8)}
      .chapter-hilbert .brief h1{font-size:clamp(22px,3vw,34px)!important}.chapter-hilbert .hilbert-quote{font-size:11px!important;opacity:.58}.chapter-corridor .room-title{font-size:clamp(22px,4vw,40px)!important}.chapter-final .question{justify-content:center!important;gap:41px}.chapter-final .question h1{font-size:clamp(26px,5vw,52px)!important}.chapter-final .ending h2{font-size:clamp(62px,10vw,112px)!important}.chapter-final .reference,.chapter-final .fame{border-color:var(--line)!important}.chapter-final .ending-inner{text-align:center}
      @media(max-width:760px){.intro-inner,.epilogue-card,.epilogue-inner,.ending-inner,.check-card{padding:20px!important}.chapter-oracle .game{height:calc(100dvh - 60px);grid-template-columns:1fr}.chapter-oracle .side.right{position:absolute;right:14px;bottom:14px;width:182px}.chapter-final .question{gap:28px}}
    `;
    document.head.appendChild(style);
    controls=document.createElement('div');controls.id='pa-language';
    restartButton=document.createElement('button');restartButton.type='button';restartButton.className='pa-restart';restartButton.addEventListener('click',restart);controls.appendChild(restartButton);
    for(const code of ['en','de']){const button=document.createElement('button');button.type='button';button.dataset.language=code;button.textContent=code.toUpperCase();button.setAttribute('aria-label',code==='de'?'Deutsch':'English');button.addEventListener('click',()=>choose(code));controls.appendChild(button)}
    document.body.appendChild(controls);updateControls();
  }

  const chapterFiles=['zenos-gate.html','oracles-drop.html','hilberts-hotel.html','endless-corridor.html','the-final-question.html'];
  const transitionCopy={
    'zenos-gate.html':{en:['paradox/os booting','session mounted','node_01 ready'],de:['paradox/os startet','sitzung eingebunden','node_01 bereit']},
    'oracles-drop.html':{en:['node_01 cleared','space collapse recorded','opening node_02'],de:['node_01 abgeschlossen','raumkollaps gespeichert','node_02 wird geöffnet']},
    'hilberts-hotel.html':{en:['node_02 cleared','path lattice sealed','nightfall detected'],de:['node_02 abgeschlossen','pfadgitter versiegelt','nacht erkannt']},
    'endless-corridor.html':{en:['node_03 cleared','infinity accepted','memory corridor mounted'],de:['node_03 abgeschlossen','unendlichkeit akzeptiert','erinnerungskorridor eingebunden']},
    'the-final-question.html':{en:['node_04 cleared','inverse path restored','final query received'],de:['node_04 abgeschlossen','umgekehrter pfad wiederhergestellt','letzte anfrage empfangen']}
  };
  const fileName=url=>decodeURIComponent(new URL(url,location.href).pathname.split('/').pop());
  const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  async function streamTransition(href,target){
    if(document.getElementById('pa-transition'))return;
    const overlay=document.createElement('section');overlay.id='pa-transition';overlay.setAttribute('role','status');overlay.setAttribute('aria-live','polite');
    const windowEl=document.createElement('div');windowEl.className='pa-terminal-window';
    const head=document.createElement('div');head.className='pa-terminal-head';head.textContent='paradox-archive / handoff';
    const output=document.createElement('div');output.className='pa-terminal-output';
    windowEl.append(head,output);overlay.appendChild(windowEl);document.body.appendChild(overlay);
    const lines=transitionCopy[target]?.[lang]||transitionCopy[target]?.en||[];const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    let skip=false;overlay.addEventListener('click',()=>skip=true);
    for(const value of lines){
      const row=document.createElement('div');row.className='pa-terminal-line';const prompt=document.createElement('span');prompt.className='pa-terminal-prompt';prompt.textContent='›';const text=document.createElement('span');const cursor=document.createElement('span');cursor.className='pa-terminal-cursor';row.append(prompt,text,cursor);output.appendChild(row);
      if(reduced||skip)text.textContent=value;else for(const character of value){text.textContent+=character;await pause(18);if(skip){text.textContent=value;break}}
      cursor.remove();await pause(reduced||skip?35:150);
    }
    const hold=reduced?650:4000;for(let waited=0;waited<hold&&!skip;waited+=50)await pause(50);location.href=href;
  }
  function bindTransitions(){
    document.addEventListener('click',event=>{
      const anchor=event.target.closest?.('a[href]');if(!anchor||anchor.closest('#pa-language'))return;
      let targetUrl;try{targetUrl=new URL(anchor.href,location.href)}catch{return}
      const target=fileName(targetUrl.href),current=fileName(location.href),to=chapterFiles.indexOf(target),from=chapterFiles.indexOf(current);
      const sequential=to===from+1||current==='paradox-archive.html'&&to===0;if(!sequential)return;
      event.preventDefault();event.stopPropagation();streamTransition(targetUrl.href,target);
    },true);
  }

  document.documentElement.lang=lang;
  const chapterClass={'paradox-archive.html':'chapter-index','zenos-gate.html':'chapter-zeno','oracles-drop.html':'chapter-oracle','hilberts-hotel.html':'chapter-hilbert','endless-corridor.html':'chapter-corridor','the-final-question.html':'chapter-final'}[fileName(location.href)];
  if(chapterClass)document.body.classList.add(chapterClass);
  addInterface();translateTree(document.documentElement);decorateLinks();bindTransitions();
  const observer=new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')translateText(record.target);else if(record.type==='attributes')translateAttributes(record.target);else for(const node of record.addedNodes){translateTree(node);if(node.nodeType===Node.ELEMENT_NODE)decorateLinks(node)}}});
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title']});
})();
