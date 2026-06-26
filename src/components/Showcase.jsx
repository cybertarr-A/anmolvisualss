import React, { useState } from 'react';

export const projectsData = [
  {
    id: 1,
    title: 'Chasing Horizons',
    category: 'Contemplative Drama',
    client: 'Western Ghats Films',
    type: 'Coming-of-Age Short',
    style: 'Contemplative / Naturalistic',
    duration: '08:45',
    views: '6.2M',
    ctr: '11.2%',
    retention: '64.5%',
    desc: "An intimate coming-of-age narrative following a young dreamer who seeks refuge in nature to find clarity amidst life's shifting currents.",
    longDesc: "Chasing Horizons explores the themes of solitude and self-discovery. Shot in the lush, misty valleys, the cinematography emphasizes natural light and the serene soundscapes of running water. The edit relies on quiet pacing and long takes to mirror the protagonist's introspective journey.",
    tools: ['DaVinci Resolve', 'Premiere Pro', 'Audition', 'Photoshop'],
    videoUrl: './assets/chasing_horizons.mp4',
    cardVideoUrl: '', // Static image on the card
    poster: './assets/chasing_horizons.jpg',
    gradBefore: 'linear-gradient(135deg, #707074 0%, #505052 100%)', // Washed LOG
    gradAfter: 'linear-gradient(135deg, #443c2c 0%, #150f08 100%)' // Gold Graded
  },
  {
    id: 2,
    title: 'Golden Hour',
    category: 'Cinematic Transitions Edit',
    client: 'Independent Project',
    type: 'Transition Reel',
    style: 'Seamless / Whip-Pan Cuts',
    duration: '01:45',
    views: '8.5M',
    ctr: '9.8%',
    retention: '58.2%',
    desc: 'A cinematic transition video featuring seamless whip-pans, light-leak morphs, and speed-ramp cuts crafted in After Effects.',
    longDesc: 'Golden Hour is a fast-paced cinematic transition reel built entirely in Adobe After Effects. The edit showcases advanced transition techniques including seamless zoom-throughs, luma-fade wipes, parallax slide cuts, and velocity-ramped whip-pans synced to beat drops. Every transition was hand-keyframed with custom motion blur and light-leak overlays to create buttery-smooth scene changes that feel organic and high-end.',
    tools: ['After Effects', 'Premiere Pro', 'Media Encoder'],
    videoUrl: './assets/golden_reverie.mp4',
    cardVideoUrl: '', // Static image on the card
    poster: './assets/golden_reverie.png',
    gradBefore: 'linear-gradient(135deg, #706555 0%, #50483c 100%)', // Warm LOG
    gradAfter: 'linear-gradient(135deg, #584228 0%, #1a0f03 100%)' // Rich Gold Grade
  }
];

export function Showcase({ isActive }) {
  const [selectedProj, setSelectedProj] = useState(null);
  const [gradeSplit, setGradeSplit] = useState(50);

  const handleCardClick = (project) => {
    setSelectedProj(project);
    setGradeSplit(50);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setSelectedProj(null);
  };

  return (
    <section id="work" className={'showcase-section' + (isActive ? ' active' : '')}>
      <div className="section-hdr">
        <span className="section-num">01 / CINEMATIC CASE STUDIES</span>
        <h2 className="section-title">Selected Works</h2>
        <p className="section-desc">
          Exploring the delicate boundary between shadow and emotion, stitching narratives frame-by-frame. Click any print below to enter the screening suite.
        </p>
      </div>

      <div className="gallery-container interactive">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => handleCardClick(project)}
            role="button"
            tabIndex={0}
            aria-label={`View details of project ${project.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(project);
              }
            }}
          >
            {project.cardVideoUrl ? (
              <video 
                src={project.cardVideoUrl} 
                poster={project.poster}
                className="project-image" 
                loop 
                muted 
                playsInline 
                autoPlay
                preload="metadata"
              />
            ) : (
              <img 
                src={project.poster} 
                alt={project.title} 
                className="project-image" 
                loading="lazy"
                decoding="async"
                style={{ objectPosition: 'top center' }}
              />
            )}
            
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc-short">{project.desc}</p>
              
              <div className="project-tools">
                {project.tools.slice(0, 3).map((tool, idx) => (
                  <span key={idx} className="tool-tag">{tool}</span>
                ))}
                {project.tools.length > 3 && (
                  <span className="tool-tag">+{project.tools.length - 3} More</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProj && (
        <div 
          className="expanded-panel interactive" 
          onClick={handleClose}
          id="screening-room"
        >
          <button 
            className="panel-close-btn" 
            onClick={handleClose}
            aria-label="Close screening room"
          >
            [ Close Suite ]
          </button>
          
          <div 
            className="panel-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="panel-video-wrapper" style={{ marginBottom: '25px', height: 'auto', aspectRatio: '16/9' }}>
                {selectedProj.videoUrl ? (
                  <video 
                    className="panel-video" 
                    src={selectedProj.videoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    muted
                    preload="metadata"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img 
                    className="panel-video" 
                    src={selectedProj.poster} 
                    alt={selectedProj.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
            </div>
            
            {/* Right Side: Performance Metrics & Metadata */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="project-category" style={{ marginBottom: '10px' }}>{selectedProj.category}</span>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', lineHeight: '1.2' }}>{selectedProj.title}</h2>
                
                <p style={{ marginBottom: '25px', fontSize: '0.95rem', lineHeight: '1.7', color: '#c8c8c8' }}>
                  {selectedProj.longDesc}
                </p>
                
                <div style={{ marginBottom: '30px' }}>
                  <span style={{ display: 'block', fontSize: '0.65rem', color: '#7f7f7f', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Suite Assembly Tools
                  </span>
                  <div className="project-tools">
                    {selectedProj.tools.map((tool, idx) => (
                      <span key={idx} className="tool-tag">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <button className="btn btn-secondary" onClick={handleClose} style={{width: '100%'}}>
                  Return to Suite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
