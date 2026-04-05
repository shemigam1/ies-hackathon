import { useState, useRef, useEffect } from 'react'

// Map DSC photos to labelled entries
const ALL_PHOTOS = [
  { src: '/DSC00196.jpg', title: 'Workshop Session', caption: 'Students working hands-on at the electronics bench.', category: 'Workshops' },
  { src: '/DSC00209.jpg', title: 'Build Bench', caption: 'Hardware prototyping in progress — wires, boards, ideas.', category: 'Workshops' },
  { src: '/DSC00212.jpg', title: 'Collaboration', caption: 'Teams debugging circuits and sharing solutions.', category: 'Workshops' },
  { src: '/DSC00223.jpg', title: 'Chapter Energy', caption: 'The energy when engineers gather to build together.', category: 'Events' },
  { src: '/DSC00262.jpg', title: 'Tech Talk', caption: 'Industry speakers sharing real-world engineering insight.', category: 'Events' },
  { src: '/DSC00273.jpg', title: 'Live Demo', caption: 'Live demonstration of a working embedded system prototype.', category: 'Events' },
  { src: '/DSC00288.jpg', title: 'Prototype Review', caption: 'Presenting early-stage prototypes to peers and mentors.', category: 'Workshops' },
  { src: '/DSC00307.jpg', title: 'Community', caption: 'IES UNILAG — building more than circuits, building engineers.', category: 'Community' },
  { src: '/DSC00389.jpg', title: 'Milestone Moment', caption: 'Recognition and celebration for standout contributions.', category: 'Community' },
]

const CATEGORIES = ['All', 'Workshops', 'Events', 'Community']

// Lightbox component
function Lightbox({ photo, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)

  // Animate in on mount
  useEffect(() => {
    const overlay = overlayRef.current
    const panel = panelRef.current
    if (!overlay || !panel) return

    // Trigger reflow then animate
    overlay.style.opacity = '0'
    panel.style.opacity = '0'
    panel.style.transform = 'scale(0.96) translateY(18px)'
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.22s ease'
      panel.style.transition = 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1)'
      overlay.style.opacity = '1'
      panel.style.opacity = '1'
      panel.style.transform = 'scale(1) translateY(0)'
    })

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [photo]) // re-run on photo change for transition

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        ref={panelRef}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%', maxWidth: '900px',
          background: 'linear-gradient(180deg, rgba(20,20,24,0.97), rgba(8,8,10,0.99))',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '28px',
          overflow: 'hidden',
          maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 0 80px rgba(0,0,0,0.8)',
        }}
      >
        {/* Top highlight line */}
        <span style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingRight: '56px',
          flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            color: '#E87722',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>
            {photo.category} · IES UNILAG
          </div>
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.02em',
          }}>{photo.title}</h3>
          <p style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.45)',
            marginTop: '4px',
            lineHeight: 1.5,
          }}>{photo.caption}</p>
        </div>

        {/* Image */}
        <div style={{ overflow: 'auto', flexGrow: 1 }}>
          <img
            src={photo.src}
            alt={photo.title}
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'contain',
              maxHeight: '65vh',
            }}
          />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '36px', height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.1rem',
            lineHeight: 1,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,119,34,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
        >✕</button>

        {/* Prev / Next */}
        {hasPrev && (
          <button onClick={onPrev} style={{
            position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.6)',
            color: '#fff', fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,119,34,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
          >←</button>
        )}
        {hasNext && (
          <button onClick={onNext} style={{
            position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.6)',
            color: '#fff', fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,119,34,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
          >→</button>
        )}

        {/* Counter */}
        <div style={{
          position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.6rem', letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.3)',
        }}>
          {/* passed in via prop */}
        </div>
      </div>
    </div>
  )
}

// Photo card
function PhotoCard({ photo, index, onClick }) {
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const isWide = index % 5 === 0 || index % 5 === 3

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{
        gridColumn: isWide ? 'span 2' : 'span 1',
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        aspectRatio: isWide ? '16/9' : '4/3',
        background: '#0a0e1a',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${index * 0.06}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.06}s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'
        e.currentTarget.querySelector('.overlay').style.opacity = '1'
      }}
      onMouseLeave={e => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1)'
        e.currentTarget.querySelector('.overlay').style.opacity = '0'
      }}
    >
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Hover overlay */}
      <div
        className="overlay"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '20px',
        }}
      >
        <div style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: '#E87722',
          textTransform: 'uppercase',
          marginBottom: '5px',
        }}>{photo.category}</div>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.02em',
        }}>{photo.title}</div>
        <div style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.6)',
          marginTop: '4px',
          lineHeight: 1.4,
        }}>{photo.caption}</div>

        {/* Expand icon */}
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          width: '32px', height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem',
          color: '#fff',
        }}>⊕</div>
      </div>

      {/* Category badge */}
      <div style={{
        position: 'absolute', top: '12px', left: '12px',
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '0.55rem',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.7)',
        background: 'rgba(0,0,0,0.55)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '100px',
        padding: '4px 10px',
        backdropFilter: 'blur(8px)',
        textTransform: 'uppercase',
      }}>{photo.category}</div>
    </div>
  )
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = activeCategory === 'All'
    ? ALL_PHOTOS
    : ALL_PHOTOS.filter(p => p.category === activeCategory)

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevPhoto = () => setLightboxIndex(i => Math.max(0, i - 1))
  const nextPhoto = () => setLightboxIndex(i => Math.min(filtered.length - 1, i + 1))

  // Close on body scroll while open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <section id="gallery" style={{
      position: 'relative', padding: '100px 5%', zIndex: 2,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section heading — ieee-website style */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.5em',
              color: '#E87722',
            }}>06</span>
            <span style={{
              height: '1px', flex: 1,
              background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))',
            }} />
          </div>
          <p style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.65rem', letterSpacing: '0.32em',
            color: '#E87722', textTransform: 'uppercase', marginBottom: '10px',
          }}>Gallery &amp; Past Events</p>
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px',
          }}>
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700, color: '#fff', lineHeight: 1.15,
              maxWidth: '600px',
            }}>
              Proof this chapter has been{' '}
              <span style={{ color: '#E87722', textShadow: '0 0 30px rgba(232,119,34,0.4)' }}>
                doing the work.
              </span>
            </h2>
            <p style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1rem', color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7, maxWidth: '340px', fontWeight: 400,
            }}>
              From soldering clinics to hardware competitions — IES UNILAG builds, iterates, and shows up.
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.65rem', letterSpacing: '0.28em',
                textTransform: 'uppercase',
                padding: '10px 18px',
                borderRadius: '100px',
                border: `1px solid ${activeCategory === cat ? 'rgba(232,119,34,0.5)' : 'rgba(255,255,255,0.1)'}`,
                background: activeCategory === cat ? 'rgba(232,119,34,0.12)' : 'rgba(255,255,255,0.03)',
                color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.45)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (activeCategory !== cat) e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { if (activeCategory !== cat) e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
            >{cat}</button>
          ))}
          <span style={{
            marginLeft: 'auto',
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.6rem', letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.25)',
            alignSelf: 'center',
          }}>{filtered.length} photos</span>
        </div>

        {/* Masonry grid */}
        <style>{`
          .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          @media (max-width: 640px) {
            .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
            .gallery-grid > * { grid-column: span 1 !important; aspect-ratio: 4/3 !important; }
          }
        `}</style>
        <div className="gallery-grid">
          {filtered.map((photo, i) => (
            <PhotoCard
              key={photo.src}
              photo={photo}
              index={i}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            #gallery-grid { grid-template-columns: 1fr !important; }
            #gallery-grid > div { grid-column: span 1 !important; }
          }
          @media (max-width: 480px) {
            #gallery-grid > div { aspect-ratio: 4/3 !important; }
          }
        `}</style>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photo={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < filtered.length - 1}
        />
      )}
    </section>
  )
}
