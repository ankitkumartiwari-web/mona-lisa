import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

const chapters = [
  ["01", "Origins"],
  ["02", "Leonardo"],
  ["03", "The sitter"],
  ["04", "Making"],
  ["05", "The theft"],
  ["06", "The smile"],
  ["07", "Legacy"],
  ["08", "Conservation"],
  ["09", "Global icon"],
];

const theftEvents = [
  {
    date: "21 Aug 1911",
    label: "The disappearance",
    text: "Former Louvre worker Vincenzo Peruggia removes the painting from the museum.",
  },
  {
    date: "1911–1913",
    label: "Hidden from the world",
    text: "The portrait stays concealed for more than two years while newspapers fuel the mystery.",
  },
  {
    date: "Dec 1913",
    label: "An offer in Florence",
    text: "Peruggia approaches an Italian art dealer, believing the work should return to Italy.",
  },
  {
    date: "1913",
    label: "Recovered",
    text: "The dealer alerts the authorities. The Mona Lisa returns to the Louvre as a global celebrity.",
  },
];

const facts = [
  ["Not canvas", "The Mona Lisa is painted in oil on a poplar wood panel."],
  ["c. 1503", "Leonardo began the portrait in Florence and revisited it over many years."],
  ["Sfumato", "Soft, smoky transitions replace hard outlines around the face."],
  ["500+ years", "The work has survived travel, theft, war, and changing taste."],
  ["Protected", "Today it sits behind climate-controlled, bullet-resistant glass."],
  ["La Gioconda", "Its Italian name is a play on Lisa's married surname—and on happiness."],
];

function activateOnKey(event: KeyboardEvent<HTMLDivElement>, action: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [activeTheft, setActiveTheft] = useState(0);
  const [openFacts, setOpenFacts] = useState<Set<number>>(() => new Set());
  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const length = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(length > 0 ? window.scrollY / length : 0);
      document.documentElement.style.setProperty("--scroll", String(window.scrollY));
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  const scrollTo = (index: number) =>
    document.getElementById(`chapter-${index + 1}`)?.scrollIntoView({ behavior: "smooth" });

  const tiltPortrait = (event: MouseEvent<HTMLDivElement>) => {
    const rect = portraitRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPortraitTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -12,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
    });
  };

  return (
    <main>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <nav className="side-nav" aria-label="Story chapters">
        <div className="side-nav__line" />
        {chapters.map((chapter, index) => (
          <div
            className="side-nav__item"
            role="button"
            tabIndex={0}
            aria-label={`Go to chapter ${chapter[0]}: ${chapter[1]}`}
            onClick={() => scrollTo(index)}
            onKeyDown={(event) => activateOnKey(event, () => scrollTo(index))}
            key={chapter[0]}
          >
            <span>{chapter[0]}</span>
            <span className="side-nav__label">{chapter[1]}</span>
          </div>
        ))}
      </nav>

      <section className="hero" id="chapter-1">
        <div className="hero__mist hero__mist--one" />
        <div className="hero__mist hero__mist--two" />
        <div className="hero__copy">
          <div className="eyebrow">An interactive history project</div>
          <div className="display-title">
            Mona <span>Lisa</span>
          </div>
          <div className="hero__subtitle">The painting that became a mystery</div>
          <div className="hero__intro">
            A portrait, a theft, and a smile that has kept the world looking for more than five centuries.
          </div>
          <div
            className="explore-link"
            role="button"
            tabIndex={0}
            onClick={() => scrollTo(1)}
            onKeyDown={(event) => activateOnKey(event, () => scrollTo(1))}
          >
            <span>Begin the story</span>
            <span className="explore-link__arrow">↓</span>
          </div>
        </div>
        <div
          className="portrait-stage"
          ref={portraitRef}
          onMouseMove={tiltPortrait}
          onMouseLeave={() => setPortraitTilt({ x: 0, y: 0 })}
        >
          <div className="portrait-orbit portrait-orbit--back">1503</div>
          <div
            className="portrait-frame"
            style={{ transform: `rotateX(${portraitTilt.x}deg) rotateY(${portraitTilt.y}deg)` }}
          >
            <div className="portrait-frame__edge" />
            <img src="https://raw.githubusercontent.com/ankitkumartiwari-web/mona-lisa/main/public/mona-lisa.jpg" alt="The Mona Lisa by Leonardo da Vinci"/>
            <div className="portrait-frame__glare" />
          </div>
          <div className="portrait-orbit portrait-orbit--front">500+</div>
          <div className="portrait-caption">Oil on poplar panel · Louvre Museum, Paris</div>
        </div>
        <div className="hero__scroll">SCROLL TO EXPLORE</div>
      </section>

      <section className="chapter chapter--leonardo" id="chapter-2">
        <div className="section-number parallax-figure">02</div>
        <div className="chapter__grid reveal">
          <div className="artist-visual">
            <div className="artist-visual__halo" />
            <img src="https://raw.githubusercontent.com/ankitkumartiwari-web/mona-lisa/main/public/leonardo.jpg" alt="Leonardo da Vinci"/>
            <div className="artist-visual__date">1452 — 1519</div>
          </div>
          <div className="chapter__copy">
            <div className="eyebrow">The mind behind the masterpiece</div>
            <div className="chapter-title">Leonardo da Vinci</div>
            <div className="chapter-lead">
              Painter. Scientist. Inventor. Engineer. Leonardo observed the world as one connected system.
            </div>
            <div className="detail-list">
              <div><span>01</span><p>His study of anatomy helped him understand the body beneath the skin.</p></div>
              <div><span>02</span><p>His experiments with light and shadow gave faces volume and presence.</p></div>
              <div><span>03</span><p>His relentless curiosity turned observation into believable art.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter chapter--sitter" id="chapter-3">
        <div className="section-number section-number--right parallax-figure">03</div>
        <div className="sitter-intro reveal">
          <div>
            <div className="eyebrow">Behind the famous face</div>
            <div className="chapter-title">Meet Lisa Gherardini</div>
          </div>
          <div className="chapter-lead">
            The sitter was likely not a duchess or queen, but a Florentine woman whose ordinary life became
            extraordinary through art.
          </div>
        </div>
        <div className="identity-cards reveal">
          <div className="identity-card">
            <span>1479</span>
            <div>Born in Florence, Italy</div>
          </div>
          <div className="identity-card identity-card--raised">
            <span>Lisa Gherardini</span>
            <div>The identity accepted by most historians</div>
          </div>
          <div className="identity-card">
            <span>Francesco del Giocondo</span>
            <div>Her husband, a prosperous silk merchant</div>
          </div>
          <div className="identity-card identity-card--raised">
            <span>La Gioconda</span>
            <div>The portrait's name in Italian</div>
          </div>
        </div>
        <div className="mystery-line reveal">Her name may be known. Her thoughts are not.</div>
      </section>

      <section className="chapter chapter--making" id="chapter-4">
        <div className="making-image" aria-hidden="true" />
        <div className="making-panel reveal">
          <div className="eyebrow">Time & technique</div>
          <div className="chapter-title">A portrait refined across years</div>
          <div className="chapter-lead">
            Leonardo began around 1503. He worked intermittently and may have continued refining the painting
            until 1517–1519.
          </div>
          <div className="timeline-simple">
            <div><span>1503</span><p>Work begins in Florence</p></div>
            <div><span>c. 1506</span><p>The main portrait takes form</p></div>
            <div><span>1517</span><p>Still in Leonardo's care</p></div>
            <div><span>1519</span><p>Possible final refinements</p></div>
          </div>
          <div className="sfumato-card">
            <span>Sfumato <small>· Italian, “smoky”</small></span>
            <p>A painting technique that softly blends colours and shadows, avoiding harsh outlines and creating a hazy, lifelike effect.</p>
          </div>
          <div className="sfumato-card glossary-card">
            <span>c. <small>· short for circa</small></span>
            <p>Means “approximately” or “around.” Dates such as c. 1506 are estimates because the exact year is not certain.</p>
          </div>
        </div>
      </section>

      <section className="chapter chapter--theft" id="chapter-5">
        <div className="section-number parallax-figure">05</div>
        <div className="theft-heading reveal">
          <div className="eyebrow">The crime that changed everything</div>
          <div className="chapter-title">The day she disappeared</div>
          <div className="chapter-lead">Choose a date to follow the two-year mystery.</div>
        </div>
        <div className="theft-experience reveal">
          <div className="theft-tabs" role="tablist" aria-label="Theft timeline">
            {theftEvents.map((event, index) => (
              <div
                className={`theft-tab ${activeTheft === index ? "is-active" : ""}`}
                role="tab"
                aria-selected={activeTheft === index}
                tabIndex={0}
                onClick={() => setActiveTheft(index)}
                onKeyDown={(keyEvent) => activateOnKey(keyEvent, () => setActiveTheft(index))}
                key={event.date}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {event.date}
              </div>
            ))}
          </div>
          <div className="theft-card" role="tabpanel">
            <div className="theft-card__stamp">{theftEvents[activeTheft].date}</div>
            <div className="theft-card__title">{theftEvents[activeTheft].label}</div>
            <p>{theftEvents[activeTheft].text}</p>
            <div className="theft-card__name">VINCENZO PERUGGIA</div>
          </div>
        </div>
      </section>

      <section className="chapter chapter--smile" id="chapter-6">
        <div className="smile-face">
          <img src="/mona-lisa.jpg" alt="Detail of the Mona Lisa's face and mysterious smile" />
          <div className="smile-face__veil" />
        </div>
        <div className="smile-content reveal">
          <div className="eyebrow">Look, then look again</div>
          <div className="chapter-title">Why does her smile change?</div>
          <div className="chapter-lead">
            Sometimes it appears clear. Look directly at the mouth, and it may seem to fade.
          </div>
          <div className="reason-stack">
            <div><span>01</span><p><b>Soft edges</b> — Sfumato blurs transitions around the mouth and cheeks.</p></div>
            <div><span>02</span><p><b>Peripheral vision</b> — The smile may look stronger when viewed indirectly.</p></div>
            <div><span>03</span><p><b>Interpretation</b> — We bring our own emotions to her expression.</p></div>
          </div>
        </div>
      </section>

      <section className="chapter chapter--facts" id="chapter-7">
        <div className="facts-heading reveal">
          <div className="eyebrow">Details worth remembering</div>
          <div className="chapter-title">Six facts. Tap to reveal.</div>
        </div>
        <div className="facts-grid reveal">
          {facts.map((fact, index) => (
            <div
              className={`fact-card ${openFacts.has(index) ? "is-open" : ""}`}
              role="button"
              tabIndex={0}
              aria-expanded={openFacts.has(index)}
              onClick={() => setOpenFacts((current) => {
                const next = new Set(current);
                if (next.has(index)) next.delete(index);
                else next.add(index);
                return next;
              })}
              onKeyDown={(event) => activateOnKey(event, () => setOpenFacts((current) => {
                const next = new Set(current);
                if (next.has(index)) next.delete(index);
                else next.add(index);
                return next;
              }))}
              key={fact[0]}
            >
              <div className="fact-card__inner">
                <div className="fact-card__front">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>{fact[0]}</div>
                  <small>REVEAL +</small>
                </div>
                <div className="fact-card__back">
                  <span>{fact[0]}</span>
                  <div>{fact[1]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="chapter chapter--sitter" id="chapter-8">
        <div className="section-number section-number--right parallax-figure">08</div>
        <div className="sitter-intro reveal">
          <div>
            <div className="eyebrow">A fragile masterpiece</div>
            <div className="chapter-title">How the painting survives</div>
          </div>
          <div className="chapter-lead">
            More than five centuries old, the Mona Lisa needs careful protection from changes in its environment,
            light, and physical surroundings.
          </div>
        </div>
        <div className="identity-cards reveal">
          <div className="identity-card">
            <span>Poplar panel</span>
            <div>The wooden support can respond to changes in humidity and temperature.</div>
          </div>
          <div className="identity-card identity-card--raised">
            <span>Controlled climate</span>
            <div>Museum systems help keep environmental conditions stable around the artwork.</div>
          </div>
          <div className="identity-card">
            <span>Protective glass</span>
            <div>A barrier helps shield the painting from accidental contact and other risks.</div>
          </div>
          <div className="identity-card identity-card--raised">
            <span>Expert monitoring</span>
            <div>Conservators study the work and its condition to guide long-term care.</div>
          </div>
        </div>
        <div className="mystery-line reveal">Conservation is a balance: protect the original while preserving access to it.</div>
      </section>

      <section className="chapter chapter--leonardo" id="chapter-9">
        <div className="section-number parallax-figure">09</div>
        <div className="chapter__grid reveal">
          <div className="artist-visual">
            <div className="artist-visual__halo" />
            <img src="/mona-lisa.jpg" alt="The Mona Lisa, displayed behind protective glass" />
            <div className="artist-visual__date">A GLOBAL ICON</div>
          </div>
          <div className="chapter__copy">
            <div className="eyebrow">From portrait to cultural symbol</div>
            <div className="chapter-title">A painting seen around the world</div>
            <div className="chapter-lead">
              The Mona Lisa is now more than a Renaissance portrait. Reproductions, popular culture, tourism,
              and the story of its theft have made it one of the most recognisable artworks in the world.
            </div>
            <div className="detail-list">
              <div><span>01</span><p><b>The Louvre</b> — Visitors travel to Paris to see the original in person.</p></div>
              <div><span>02</span><p><b>Reproductions</b> — Prints, books, and digital images bring the portrait to audiences far beyond the museum.</p></div>
              <div><span>03</span><p><b>Popular culture</b> — Artists and creators reinterpret the image, keeping it part of public conversation.</p></div>
              <div><span>04</span><p><b>Enduring questions</b> — Its sitter, technique, and expression continue to invite new interpretations.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="legacy">
        <div className="legacy__image" aria-hidden="true" />
        <div className="legacy__overlay" />
        <div className="legacy__content reveal">
          <div className="eyebrow">Reflection & legacy</div>
          <div className="legacy__title">More than a famous painting.</div>
          <div className="legacy__body">
            The Mona Lisa connects artistic skill, scientific observation, human mystery, and an extraordinary
            history. The 1911 theft showed how quickly news could turn art into a global phenomenon. Leonardo's
            technique showed how light and shadow can make still paint seem alive.
          </div>
          <div className="legacy__quote">
            “Protecting historical art means protecting our shared human memory.”
          </div>
          <div
            className="restart"
            role="button"
            tabIndex={0}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onKeyDown={(event) =>
              activateOnKey(event, () => window.scrollTo({ top: 0, behavior: "smooth" }))
            }
          >
            RETURN TO THE PORTRAIT ↑
          </div>
        </div>
        <div className="legacy__credit">
          Artwork imagery: public domain · Museum photograph: Unsplash / Carnet de Voyage d'Alex
        </div>
      </section>
    </main>
  );
}
