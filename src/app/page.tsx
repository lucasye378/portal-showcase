'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { products, categories } from '@/lib/products';

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; setVisible(true); };
    const onLeave = () => setVisible(false);
    const animate = () => {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      if (cursor) cursor.style.transform = `translate(${cx}px,${cy}px)`;
      requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    requestAnimationFrame(animate);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseleave', onLeave); };
  }, []);
  return <div ref={cursorRef} className={`cursor ${visible ? 'opacity-100' : 'opacity-0'}`} />;
}

function Ripple({ x, y }: { x: number; y: number }) {
  return (
    <span
      className="ripple"
      style={{ left: x, top: y }}
    />
  );
}

function ProductCard({ product, index, onRipple }: { product: (typeof products)[0]; index: number; onRipple: (x: number, y: number, id: string) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; rid: string }[]>([]);
  const [emojiBounce, setEmojiBounce] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      if (hovered) {
        setTilt({ x: dy * -16, y: dx * 16 });
        setMagnet({ x: dx * 12, y: dy * 12 });
      }
    };
    const onEnter = () => { setHovered(true); setEmojiBounce(true); setTimeout(() => setEmojiBounce(false), 400); };
    const onLeave = () => { setHovered(false); setTilt({ x: 0, y: 0 }); setMagnet({ x: 0, y: 0 }); };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseenter', onEnter); card.removeEventListener('mouseleave', onLeave); };
  }, [hovered]);

  const handleClick = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rid = Math.random().toString(36).slice(2);
    setRipples(prev => [...prev, { x, y, rid }]);
    setTimeout(() => setRipples(prev => prev.filter(p => p.rid !== rid)), 700);
    window.open(product.url, '_blank', 'noopener');
  };

  const style = {
    transform: `translate(${magnet.x}px,${magnet.y}px) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.04 : 1})`,
    transition: hovered ? 'transform 0.06s ease-out' : 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
    '--delay': `${index * 40}ms`,
    '--accent': product.color,
    cursor: 'pointer',
  } as React.CSSProperties;

  return (
    <div ref={cardRef} className={`card ${loaded ? 'loaded' : ''}`} style={style} onClick={handleClick}>
      {ripples.map(r => <Ripple key={r.rid} x={r.x} y={r.y} />)}
      <div className="card-inner">
        <div className="card-img">
          <img src={`/screenshots/${product.id}.png`} alt={product.name} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div className="card-img-overlay" />
          <div className="card-hover-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${product.color}40 0%, transparent 70%)`, opacity: hovered ? 1 : 0 }} />
        </div>
        <div className="card-body">
          <div className="card-top">
            <div className="card-cat">{product.category}</div>
            <div className={`card-icon-anim ${emojiBounce ? 'bounce' : ''}`}>{product.icon}</div>
          </div>
          <h3 className="card-name">{product.name}</h3>
          <p className="card-tag">{product.tagline}</p>
          <div className="card-hover-hint" style={{ opacity: hovered ? 1 : 0 }}>Click to open →</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const initGSAP = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelectorAll('.ha'), { opacity: 0, y: 80, filter: 'blur(14px)' }, { opacity: 1, y: 0, filter: 'blur(0)', duration: 1.4, stagger: 0.14, ease: 'power4.out', delay: 0.2 });
      }

      document.querySelectorAll('.card').forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 100, scale: 0.9 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
          delay: (i % 12) * 0.04,
        });
      });

      document.querySelectorAll('.cat-header').forEach(h => {
        gsap.fromTo(h, { opacity: 0, x: -60 }, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: h, start: 'top 92%', toggleActions: 'play none none reverse' },
        });
      });

      // Staggered grid — add alternating large cards
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, i) => {
        const col = i % 3;
        if (col === 1) {
          (card as HTMLElement).style.gridRow = 'span 1';
        }
      });

      cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    };

    initGSAP();
    return () => cleanup?.();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050507; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; cursor: none; }
        .cursor { position: fixed; top: 0; left: 0; width: 24px; height: 24px; border-radius: 50%; border: 2px solid rgba(139,92,246,0.8); pointer-events: none; z-index: 9999; mix-blend-mode: screen; will-change: transform; transition: width 0.2s, height 0.2s, border-color 0.2s; }
        .card { opacity: 0; will-change: transform, opacity; position: relative; overflow: hidden; }
        .card.loaded { opacity: 1; }
        .card-inner { background: rgba(255,255,255,0.04); backdrop-filter: blur(28px); border: 1px solid rgba(255,255,255,0.09); border-radius: 22px; overflow: hidden; height: 100%; position: relative; z-index: 1; transition: border-color 0.3s, box-shadow 0.3s; }
        .card:hover .card-inner { border-color: rgba(255,255,255,0.18); box-shadow: 0 20px 60px -15px var(--accent, #8b5cf6), 0 0 40px -10px var(--accent, #8b5cf6); }
        .card-img { position: relative; height: 190px; overflow: hidden; background: linear-gradient(135deg, #0a0a0f, #0f0f18); }
        .card-img img { width: 100%; height: 100%; object-fit: cover; object-position: top center; transition: transform 0.7s cubic-bezier(0.23,1,0.32,1); }
        .card:hover .card-img img { transform: scale(1.1); }
        .card-img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 35%, rgba(5,5,7,0.95) 100%); }
        .card-hover-glow { position: absolute; inset: 0; transition: opacity 0.4s; pointer-events: none; }
        .card-body { padding: 20px 22px 22px; }
        .card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .card-cat { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); opacity: 0.9; }
        .card-icon-anim { font-size: 22px; filter: drop-shadow(0 0 8px rgba(139,92,246,0.6)); transition: transform 0.3s; }
        .card-icon-anim.bounce { animation: emojiBounce 0.4s ease; }
        @keyframes emojiBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.4) rotate(10deg)} }
        .card-name { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 800; margin-bottom: 7px; line-height: 1.2; background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .card-tag { font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.5; margin-bottom: 8px; min-height: 36px; }
        .card-hover-hint { font-size: 11px; color: var(--accent); font-weight: 600; transition: opacity 0.3s; margin-top: 4px; }
        /* Ripple */
        .ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.25); transform: scale(0); animation: rippleAnim 0.7s ease-out forwards; pointer-events: none; width: 200px; height: 200px; margin: -100px; }
        @keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }
        /* Category header */
        .cat-header { margin-bottom: 32px; }
        .cat-header-inner { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px 28px; display: flex; align-items: center; gap: 16px; position: relative; overflow: hidden; }
        .cat-header-inner::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 60%); pointer-events: none; }
        .cat-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .cat-title { font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.85); }
        .cat-count { font-size: 11px; color: rgba(255,255,255,0.35); margin-left: auto; }
        .cat-line { width: 40px; height: 2px; border-radius: 1px; flex-shrink: 0; }
        /* Grid */
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .product-grid > :nth-child(4n+2) { grid-column: span 1; }
        /* Noise */
        body::before { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.022'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9998; }
        @media (max-width: 768px) { body { cursor: auto; } .cursor { display: none; } }
      `}</style>
      <CustomCursor />
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, background: 'radial-gradient(circle,rgba(139,92,246,0.16) 0%,transparent 68%)', pointerEvents: 'none', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: '25%', left: '15%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(236,72,153,0.08) 0%,transparent 70%)', pointerEvents: 'none', filter: 'blur(90px)' }} />
        <div className="ha" style={{ marginBottom: 18 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 100, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', fontSize: 12, fontWeight: 700, color: '#a78bfa', letterSpacing: '0.06em' }}>✦ {products.length} Production AI Tools</span>
        </div>
        <h1 className="ha" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(52px,9vw,104px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.035em', background: 'linear-gradient(135deg,#fff 0%,#a78bfa 45%,#60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 28, maxWidth: 960 }}>Lucas AI Products</h1>
        <p className="ha" style={{ fontSize: 'clamp(15px,2vw,19px)', color: 'rgba(255,255,255,0.48)', maxWidth: 500, lineHeight: 1.65, marginBottom: 48 }}>37 production-ready AI tools for freelancers, agencies, and creators. Built to ship. Deployed at scale.</p>
        <div className="ha" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(c => <span key={c} style={{ padding: '8px 18px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{c}</span>)}
        </div>
        <div className="ha" style={{ marginTop: 88, display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.28)', fontSize: 13 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 14px #22c55e' }} />All 37 products live & operational
        </div>
      </section>
      <main ref={gridRef} style={{ maxWidth: 1420, margin: '0 auto', padding: '0 24px 140px' }}>
        {categories.map((cat, ci) => {
          const catProducts = products.filter(p => p.category === cat);
          const catColor = catProducts[0]?.color || '#8b5cf6';
          return (
            <div key={cat} style={{ marginBottom: 96 }}>
              <div className="cat-header">
                <div className="cat-header-inner">
                  <div className="cat-dot" style={{ background: catColor, boxShadow: `0 0 12px ${catColor}` }} />
                  <div className="cat-title">{cat}</div>
                  <div className="cat-count">{catProducts.length} tools</div>
                  <div className="cat-line" style={{ background: `linear-gradient(90deg,${catColor},transparent)` }} />
                </div>
              </div>
              <div className="product-grid">
                {catProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={ci * 10 + i} onRipple={() => {}} />
                ))}
              </div>
            </div>
          );
        })}
      </main>
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '52px 24px', textAlign: 'center', color: 'rgba(255,255,255,0.28)', fontSize: 13 }}>
        {products.length} products · Built with Next.js & AI · <span style={{ color: '#a78bfa' }}>Lucas AI</span>
      </footer>
    </>
  );
}
