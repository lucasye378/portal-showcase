'use client';
import { useEffect, useRef, useState } from 'react';
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
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
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

function MagneticCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      if (hovered) { setTilt({ x: dy * -14, y: dx * 14 }); setMagnet({ x: dx * 10, y: dy * 10 }); }
    };
    const onEnter = () => setHovered(true);
    const onLeave = () => { setHovered(false); setTilt({ x: 0, y: 0 }); setMagnet({ x: 0, y: 0 }); };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseenter', onEnter); card.removeEventListener('mouseleave', onLeave); };
  }, [hovered]);

  const style = {
    transform: `translate(${magnet.x}px,${magnet.y}px) perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transition: hovered ? 'transform 0.08s' : 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
    '--delay': `${index * 50}ms`,
    '--accent': product.color,
  } as React.CSSProperties;

  return (
    <div ref={cardRef} className={`card ${loaded ? 'loaded' : ''}`} style={style}>
      <div className="card-inner">
        <div className="card-img">
          <img src={`/screenshots/${product.id}.png`} alt={product.name} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div className="card-img-overlay" />
        </div>
        <div className="card-body">
          <div className="card-cat">{product.category}</div>
          <h3 className="card-name">{product.name}</h3>
          <p className="card-tag">{product.tagline}</p>
          <div className="card-foot">
            <span className="card-icon">{product.icon}</span>
            <a href={product.url} target="_blank" rel="noopener noreferrer" className="card-btn" onClick={(e) => e.stopPropagation()}>Visit →</a>
          </div>
        </div>
      </div>
      <div className="card-glow" style={{ background: `radial-gradient(circle,${product.color}25 0%,transparent 70%)`, opacity: hovered ? 1 : 0 }} />
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelectorAll('.ha'), { opacity: 0, y: 70, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0)', duration: 1.2, stagger: 0.12, ease: 'power4.out', delay: 0.3 });
      }
      document.querySelectorAll('.card').forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 90, scale: 0.93 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      });
      document.querySelectorAll('.cat-header').forEach(h => {
        gsap.fromTo(h, { opacity: 0, x: -50 }, {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: h, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
      });
      cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    })();
    return () => cleanup?.();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050507; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; cursor: none; }
        .cursor { position: fixed; top: 0; left: 0; width: 22px; height: 22px; border-radius: 50%; border: 2px solid rgba(139,92,246,0.75); pointer-events: none; z-index: 9999; mix-blend-mode: screen; will-change: transform; }
        .card { opacity: 0; will-change: transform, opacity; }
        .card.loaded { opacity: 1; }
        .card-inner { background: rgba(255,255,255,0.03); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden; height: 100%; position: relative; z-index: 1; }
        .card-img { position: relative; height: 200px; overflow: hidden; background: linear-gradient(135deg,#0a0a0f,#111118); }
        .card-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.6s cubic-bezier(0.23,1,0.32,1); }
        .card:hover .card-img img { transform: scale(1.08); }
        .card-img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom,transparent 40%,rgba(5,5,7,0.92) 100%); }
        .card-body { padding: 18px; }
        .card-cat { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; opacity: 0.85; }
        .card-name { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 5px; line-height: 1.2; }
        .card-tag { font-size: 11.5px; color: rgba(255,255,255,0.48); line-height: 1.5; margin-bottom: 14px; min-height: 34px; }
        .card-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.07); }
        .card-icon { font-size: 19px; }
        .card-btn { font-size: 11px; font-weight: 600; color: var(--accent); text-decoration: none; padding: 5px 13px; border-radius: 20px; background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.22); transition: all 0.25s; }
        .card-btn:hover { background: rgba(139,92,246,0.22); transform: translateX(2px); }
        .card:hover .card-inner { border-color: rgba(255,255,255,0.14); box-shadow: 0 0 40px -8px var(--accent); }
        .card-glow { position: absolute; inset: -1px; border-radius: 21px; pointer-events: none; transition: opacity 0.4s; z-index: 0; }
        .card { position: relative; }
        .card:hover { z-index: 10; }
        body::before { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9998; }
        @media (max-width: 768px) { body { cursor: auto; } .cursor { display: none; } }
      `}</style>
      <CustomCursor />
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle,rgba(139,92,246,0.14) 0%,transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', top: '28%', left: '18%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(59,130,246,0.09) 0%,transparent 70%)', pointerEvents: 'none', filter: 'blur(80px)' }} />
        <div className="ha" style={{ marginBottom: 16 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.28)', fontSize: 12, fontWeight: 600, color: '#a78bfa', letterSpacing: '0.05em' }}>✦ {products.length} AI Products</span>
        </div>
        <h1 className="ha" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(48px,8vw,96px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', background: 'linear-gradient(135deg,#fff 0%,#a78bfa 50%,#60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 24, maxWidth: 900 }}>Lucas AI Products</h1>
        <p className="ha" style={{ fontSize: 'clamp(15px,2vw,19px)', color: 'rgba(255,255,255,0.5)', maxWidth: 520, lineHeight: 1.6, marginBottom: 44 }}>37 production-ready AI tools for freelancers, agencies, and creators. Built with precision. Deployed at scale.</p>
        <div className="ha" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(c => <span key={c} style={{ padding: '7px 17px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{c}</span>)}
        </div>
        <div className="ha" style={{ marginTop: 80, display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 12px #22c55e' }} />All products live & operational
        </div>
      </section>
      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px 120px' }}>
        {categories.map(cat => (
          <div key={cat} style={{ marginBottom: 80 }}>
            <div className="cat-header" style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>{cat}</h2>
              <div style={{ width: 48, height: 3, borderRadius: 2, background: 'linear-gradient(90deg,#8b5cf6,#3b82f6)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(295px, 1fr))', gap: 18 }}>
              {products.filter(p => p.category === cat).map((p, i) => <MagneticCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        ))}
      </main>
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '44px 24px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
        {products.length} products · Built with Next.js & AI · <span style={{ color: '#a78bfa' }}>Lucas AI</span>
      </footer>
    </>
  );
}
