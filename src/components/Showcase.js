import React, { useState } from 'react';
import htm from 'https://esm.sh/htm';

const html = htm.bind(React.createElement);

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
  /*,
  {
    id: 3,
    title: 'Echoes in the Mist',
    category: 'Atmospheric Short Film',
    client: 'Self-Produced',
    type: 'Cinematic Drama',
    style: 'Atmospheric / Slow Paced',
    duration: '03:15',
    views: '5.6M',
    ctr: '14.2%',
    retention: '72.1%',
    desc: 'A moody, atmospheric cinematic edit following a solitary figure walking down a foggy, historic mountain pathway.',
    longDesc: 'Echoes in the Mist explores themes of isolation and introspection. Utilizing a muted green-grey color palette, the color grading emphasizes the soft diffusion of light through heavy fog. The pacing is deliberate and slow, designed to build a deep, contemplative atmosphere that allows the natural environment and ambient soundscapes to take center stage.',
    tools: ['DaVinci Resolve', 'Premiere Pro'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-editor-working-on-a-video-console-40295-large.mp4',
    cardVideoUrl: '',
    poster: './assets/echoes_of_light.png',
    gradBefore: 'linear-gradient(135deg, #746c6c 0%, #524f4f 100%)', // Washed LOG
    gradAfter: 'linear-gradient(135deg, #2a2e2b 0%, #0d100e 100%)' // Deep foggy forest tones
  },
  {
    id: 4,
    title: 'Transient Dream',
    category: 'Art Documentary',
    client: 'Heller Foundation',
    type: 'Artist Portrait',
    style: 'Contemplative / Slow Pace',
    duration: '06:15',
    views: '11.8M',
    ctr: '10.5%',
    retention: '61.4%',
    desc: 'An intimate, slow-paced documentary capturing abstract sculptors carving marble in remote stone quarries.',
    longDesc: 'A poetic documentary centered on the textures of stone and human labor. The visual edits are slow, allowing the viewer to absorb the atmosphere of the quarry. The sound design was fully isolated and layered to amplify the crack and resonance of iron hammers on raw marble.',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'Audition'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-snowy-mountains-under-cloudy-sky-40097-large.mp4',
    cardVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-snowy-mountains-under-cloudy-sky-40097-large.mp4',
    poster: 'data:image/svg+xml,%3Csvg width="450" height="600" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="100%25" height="100%25" fill="%23151515"/%3E%3Ctext x="50%25" y="50%25" font-family="Cinzel, serif" font-size="28" fill="%23b89f65" text-anchor="middle"%3ETRANSIENT DREAM%3C/text%3E%3C/svg%3E',
    gradBefore: 'linear-gradient(135deg, #6c6c6c 0%, #4c4c4c 100%)', // Washed LOG
    gradAfter: 'linear-gradient(135deg, #2c322d 0%, #0d120e 100%)' // Deep forest grade
  }
  */
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

  return html`
    <section id="work" className=${'showcase-section' + (isActive ? ' active' : '')}>
      <div className="section-hdr">
        <span className="section-num">01 / CINEMATIC CASE STUDIES</span>
        <h2 className="section-title">Selected Works</h2>
        <p className="section-desc">
          Exploring the delicate boundary between shadow and emotion, stitching narratives frame-by-frame. Click any print below to enter the screening suite.
        </p>
      </div>

      <div className="gallery-container interactive">
        ${projectsData.map((project) => html`
          <div 
            key=${project.id} 
            className="project-card"
            onClick=${() => handleCardClick(project)}
            role="button"
            tabIndex=${0}
            aria-label=${`View details of project ${project.title}`}
          >
            ${project.cardVideoUrl ? html`
              <video 
                src=${project.cardVideoUrl} 
                poster=${project.poster}
                className="project-image" 
                loop 
                muted 
                playsInline 
                autoPlay
              />
            ` : html`
              <img 
                src=${project.poster} 
                alt=${project.title} 
                className="project-image" 
                loading="lazy"
                style=${{ objectPosition: 'top center' }}
              />
            `}
            
            <div className="project-info">
              <span className="project-category">${project.category}</span>
              <h3 className="project-title">${project.title}</h3>
              <p className="project-desc-short">${project.desc}</p>
              
              <div className="project-tools">
                ${project.tools.slice(0, 3).map((tool, idx) => html`
                  <span key=${idx} className="tool-tag">${tool}</span>
                `)}
                ${project.tools.length > 3 && html`
                  <span className="tool-tag">+${project.tools.length - 3} More</span>
                `}
              </div>
            </div>
          </div>
        `)}
      </div>

      ${selectedProj && html`
        <div 
          className="expanded-panel interactive" 
          onClick=${handleClose}
          id="screening-room"
        >
          <button 
            className="panel-close-btn" 
            onClick=${handleClose}
            aria-label="Close screening room"
          >
            [ Close Suite ]
          </button>
          
          <div 
            className="panel-content" 
            onClick=${(e) => e.stopPropagation()}
          >
            <div>
              <div className="panel-video-wrapper" style=${{ marginBottom: '25px', height: 'auto', aspectRatio: '16/9' }}>
                ${selectedProj.videoUrl ? html`
                  <video 
                    className="panel-video" 
                    src=${selectedProj.videoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    muted
                    style=${{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ` : html`
                  <img 
                    className="panel-video" 
                    src=${selectedProj.poster} 
                    alt=${selectedProj.title}
                    style=${{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                `}
              </div>
            </div>
            
            <!-- Right Side: Performance Metrics & Metadata -->
            <div style=${{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="project-category" style=${{ marginBottom: '10px' }}>${selectedProj.category}</span>
                <h2 style=${{ fontSize: '2.2rem', marginBottom: '20px', lineHeight: '1.2' }}>${selectedProj.title}</h2>
                


                <p style=${{ marginBottom: '25px', fontSize: '0.95rem', lineHeight: '1.7', color: '#c8c8c8' }}>
                  ${selectedProj.longDesc}
                </p>
                
                <div style=${{ marginBottom: '30px' }}>
                  <span style=${{ display: 'block', fontSize: '0.65rem', color: '#7f7f7f', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Suite Assembly Tools
                  </span>
                  <div className="project-tools">
                    ${selectedProj.tools.map((tool, idx) => html`
                      <span key=${idx} className="tool-tag">${tool}</span>
                    `)}
                  </div>
                </div>
              </div>
              
              <div>
                <button className="btn btn-secondary" onClick=${handleClose} style=${{width: '100%'}}>
                  Return to Suite
                </button>
              </div>
            </div>
          </div>
        </div>
      `}
    </section>
  `;
}
