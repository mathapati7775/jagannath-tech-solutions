/**
 * TECH JAGANNATH – Enterprise Client Controller
 * World-Class Enterprise AI & SaaS Interactive UI/UX
 */

document.addEventListener('DOMContentLoaded', () => {
  initCentralContactLinks();
  initDataDrivenRendering();
  initPreloader();
  initNavbar();
  initNeuralCanvas();
  initHeroSlider();
  initHeroParallax();
  initMarquees();
  initProductsCarousel();
  initTeamCarousel();
  initGalleryFeaturedCarousel();
  initGalleryAndLightbox();
  initCasesCarousel();
  initTestimonialsSlider();
  initScrollSpy();
  initScrollAnimations();
  initStatCounters();
  initFaqAccordion();
  initConsultationModal();
  initBackToTop();
  initMagneticButtons();
  init3DTiltEffect();
});

/* ═══════════════════════════════════════════════════════════════════
   1. DATA-DRIVEN RENDERING ENGINE
   ═══════════════════════════════════════════════════════════════════ */
function initDataDrivenRendering() {
  if (typeof window.TechJagannathData === 'undefined') return;
  const data = window.TechJagannathData;

  // 1. Render Hero Slider Tabs & Slides
  if (data.heroSlides) renderHeroSlides(data.heroSlides);

  // 2. Render Partners Marquee
  if (data.partners) renderPartnersMarquee(data.partners);

  // 3. Render Achievements
  if (data.achievements) renderAchievements(data.achievements);

  // 4. Render Products
  if (data.products) renderProducts(data.products);

  // 5. Render Tech Stack (Marquee + 7-Category Matrix)
  if (data.techStack) {
    renderTechMarquee(data.techStack);
    renderTechMatrix(data.techStack);
  }

  // 6. Render Case Studies
  if (data.caseStudies) renderCaseStudies(data.caseStudies);

  // 7. Render Team Cards (Atlas-Style 3D Carousel)
  if (data.team) renderTeamCards(data.team);

  // 8. Render Company Gallery (Filterable Masonry Grid)
  if (data.gallery) renderGalleryGrid(data.gallery, 'all');

  // 9. Render Featured Gallery Carousel
  if (data.galleryFeatured) renderFeaturedGallery(data.galleryFeatured);

  // 10. Render Testimonials (Single-Card Luxury Slider)
  if (data.testimonials) renderTestimonials(data.testimonials);

  // 11. Render Social Channels Grid
  if (data.channels) renderChannelsGrid(data.channels);

  // 12. Render Careers Open Roles
  if (data.careers) renderCareers(data.careers);
}

/* ─── Hero Slider Renderer ───────────────────────────────────────── */
function renderHeroSlides(slidesList) {
  const tabsRail = document.getElementById('heroTabsRail');
  const track = document.getElementById('heroSliderTrack');
  if (!slidesList || !slidesList.length) return;

  if (tabsRail) {
    tabsRail.innerHTML = slidesList.map((slide, idx) => `
      <button class="hero-tab-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" role="tab" aria-selected="${idx === 0}">
        <span>${slide.tag || slide.badge}</span>
        <div class="tab-progress-fill"></div>
      </button>
    `).join('');
  }

  if (track) {
    track.innerHTML = slidesList.map((slide, idx) => {
      const metricsHtml = (slide.metrics || []).map(m => `
        <div class="slide-metric">
          <span class="metric-val">${m.val}</span>
          <span class="metric-lbl">${m.lbl}</span>
        </div>
      `).join('');

      return `
        <div class="hero-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
          <div class="hero-grid">
            <div class="hero-content">
              <div class="hero-pill-badge">
                <span class="badge-dot"></span>
                <span>${slide.badge || 'Enterprise AI & Cloud SaaS'}</span>
              </div>

              <h1 class="hero-title">
                ${slide.title.replace('Intelligent Systems', '<span class="text-gradient">Intelligent Systems</span>')}
              </h1>

              <p class="hero-subtitle lead-text">
                ${slide.subtitle}
              </p>

              <div class="hero-buttons">
                <a href="${slide.primaryHref || '#products'}" class="btn btn-primary btn-lg">
                  <span>${slide.primaryCta || 'Explore Flagship Products'}</span>
                  <span class="btn-arrow">→</span>
                </a>
                <button onclick="openConsultation('${slide.secondaryCta || 'Book Consultation'}')" class="btn btn-secondary btn-lg">
                  <span>${slide.secondaryCta || 'Book Consultation'}</span>
                </button>
              </div>

              <div class="hero-slide-metrics">
                ${metricsHtml}
              </div>
            </div>

            <div class="hero-preview-col">
              <div class="hero-dashboard-card">
                <div class="dash-topbar">
                  <div class="window-controls">
                    <span class="win-dot red"></span>
                    <span class="win-dot yellow"></span>
                    <span class="win-dot green"></span>
                  </div>
                  <span class="dash-tab-title">techjagannath-neural-core.live</span>
                  <span class="dash-live-badge">
                    <span class="live-pulse"></span> LIVE
                  </span>
                </div>

                <div class="dash-stats-row">
                  <div class="dash-stat-box">
                    <span class="stat-label">Daily Active Telemetry</span>
                    <span class="stat-val">120,000+</span>
                    <span class="stat-sub up">▲ 99.98% accuracy</span>
                  </div>
                  <div class="dash-stat-box">
                    <span class="stat-label">Partner Institutions</span>
                    <span class="stat-val">80+ Campuses</span>
                    <span class="stat-sub blue">TapAxe & ExamCraft</span>
                  </div>
                </div>

                <div class="neural-terminal-box">
                  <div class="term-line">
                    <span class="term-prompt">$</span> init --engine=tapaxe-biometrics --mesh=aws-multi-region
                  </div>
                  <div class="term-line term-success">
                    ✓ Connected: 240+ Edge Biometric Nodes [Latency: 18ms]
                  </div>
                  <div class="term-line">
                    <span class="term-prompt">$</span> load-pipeline --rag=examcraft-curriculum-v4 --status=active
                  </div>
                  <div class="term-line term-info">
                    ℹ System Operational: 3.5M+ Questions Authored with 100% Bloom Match
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

/* ─── Partners Continuous Marquee Renderer ──────────────────────── */
function renderPartnersMarquee(partnersList) {
  const track = document.getElementById('partnersMarqueeTrack');
  if (!track || !partnersList || !partnersList.length) return;

  const doubleList = [...partnersList, ...partnersList];
  track.innerHTML = doubleList.map(p => `
    <div class="marquee-partner-pill">
      <span class="partner-icon">${p.icon || '🏛️'}</span>
      <span class="partner-name">${p.name || ''}</span>
      ${p.tag || p.type ? `<span class="partner-tag">• ${p.tag || p.type}</span>` : ''}
    </div>
  `).join('');
}

/* ─── Achievements Stats Renderer ───────────────────────────────── */
function renderAchievements(achievementsList) {
  const grid = document.getElementById('statsCarouselGrid');
  if (!grid || !achievementsList || !achievementsList.length) return;

  grid.innerHTML = achievementsList.map(item => `
    <div class="stat-achievement-card" data-animate="fadeIn">
      <div class="achievement-counter-wrap">
        <span class="achievement-val counter" data-target="${item.target || 0}" ${item.decimal ? `data-decimal="${item.decimal}"` : ''}>0</span>
        <span class="achievement-suffix">${item.suffix || '+'}</span>
      </div>
      <div class="achievement-lbl">${item.label || ''}</div>
      ${item.subtext ? `<div class="achievement-sub">${item.subtext}</div>` : ''}
    </div>
  `).join('');
}

/* ─── Products Responsive Grid & Card Renderer ──────────────────── */
function renderProducts(productsList) {
  const container = document.getElementById('productsGrid');
  const carouselTrack = document.getElementById('productsCarouselTrack');
  if (!productsList || !productsList.length) return;

  const productsHtml = productsList.map(prod => {
    const highlightsList = prod.highlights || prod.features || [];
    const highlightsHtml = highlightsList.map(f => `
      <div class="feature-bullet">
        <span class="check-icon">✓</span>
        <span>${f}</span>
      </div>
    `).join('');

    const statsList = prod.stats || [];
    const statsHtml = statsList.map(s => {
      const val = s.value || s.val || '';
      const lbl = s.label || s.lbl || '';
      if (!val && !lbl) return '';
      return `
        <div class="p-stat-item">
          <div class="p-stat-val">${val}</div>
          <div class="p-stat-lbl">${lbl}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="product-grid-card product-3d-card" data-animate="fadeIn">
        ${prod.image ? `
          <div class="product-img-banner">
            <img src="${prod.image}" alt="${prod.name}" class="product-banner-photo" loading="lazy" />
            <div class="product-banner-overlay">
              <span class="product-badge">${prod.badge || 'Flagship SaaS'}</span>
              <span class="product-category-label">${prod.category || 'AI Platform'}</span>
            </div>
          </div>
        ` : `
          <div class="product-grid-header">
            <div class="product-badge">
              <span class="badge-dot"></span>
              <span>${prod.badge || 'Flagship SaaS'}</span>
            </div>
            <span class="product-category-label">${prod.category || 'AI Platform'}</span>
          </div>
        `}

        <div class="product-grid-body">
          <div>
            <h3 class="product-name">${prod.name || ''}</h3>
            ${prod.tagline ? `<p class="product-tagline">${prod.tagline}</p>` : ''}
            ${prod.description ? `<p class="product-desc">${prod.description}</p>` : ''}

            ${highlightsList.length > 0 ? `
              <div class="product-features-list">
                ${highlightsHtml}
              </div>
            ` : ''}
          </div>

          <div>
            ${statsList.length > 0 ? `
              <div class="product-3d-stats-row">
                ${statsHtml}
              </div>
            ` : ''}

            <div class="product-actions">
              <button class="btn btn-primary" onclick="openConsultation('Product Demo: ${prod.name || 'SaaS'}')">
                <span>Book ${prod.name || 'Platform'} Demo</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (container) container.innerHTML = productsHtml;
  if (carouselTrack) carouselTrack.innerHTML = productsHtml;
}

/* ─── Tech Stack Marquee & 7-Group Categorized Matrix Renderer ───── */
function renderTechMarquee(techList) {
  const track = document.getElementById('techMarqueeTrack');
  if (!track || !techList || !techList.length) return;

  const doubleList = [...techList, ...techList];
  track.innerHTML = doubleList.map(t => `
    <div class="tech-marquee-item" title="${t.description || t.name}">
      <span class="tech-logo-icon">${t.svg || ''}</span>
      <span class="tech-name">${t.name || ''}</span>
      ${t.category ? `<span class="tech-category-pill">${t.category}</span>` : ''}
    </div>
  `).join('');
}

function renderTechMatrix(techList) {
  const container = document.getElementById('techGroupsMatrix');
  if (!container || !techList || !techList.length) return;

  const categories = [
    { title: "Frontend", icon: "💻", filter: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"] },
    { title: "Backend", icon: "⚙️", filter: ["Node.js", "NestJS", "Python", "FastAPI", "Django", "Go"] },
    { title: "Database", icon: "🗄️", filter: ["PostgreSQL", "MongoDB", "Redis", "Pinecone"] },
    { title: "Cloud", icon: "☁️", filter: ["AWS", "Azure", "Google Cloud"] },
    { title: "AI & ML", icon: "🧠", filter: ["OpenAI", "LangChain", "PyTorch", "TensorFlow"] },
    { title: "Mobile", icon: "📱", filter: ["Flutter", "React Native", "Android / Kotlin"] },
    { title: "DevOps", icon: "🚀", filter: ["Docker", "Kubernetes", "GitHub Actions", "Git"] }
  ];

  container.innerHTML = categories.map((cat, idx) => {
    const matchedTechs = techList.filter(t => cat.filter.includes(t.name) || t.category === cat.title);
    const itemsHtml = matchedTechs.map(t => `
      <div class="tech-matrix-item" title="${t.description || t.name}">
        <span class="tech-logo-icon">${t.svg || ''}</span>
        <span class="tech-name">${t.name || ''}</span>
      </div>
    `).join('');

    return `
      <div class="tech-group-card" data-animate="fadeIn" data-delay="${idx * 0.05}">
        <h3 class="tech-group-title">
          <span>${cat.icon}</span> ${cat.title}
        </h3>
        <div class="tech-items-list">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join('');
}

/* ─── Case Studies Carousel & Card Renderer ─────────────────────── */
function renderCaseStudies(casesList) {
  const track = document.getElementById('casesCarouselTrack');
  const grid = document.getElementById('casesGrid');
  const target = track || grid;
  if (!target || !casesList || !casesList.length) return;

  target.innerHTML = casesList.map((cs, idx) => {
    const metricsList = cs.metrics || [];
    const metricsHtml = metricsList.map(m => {
      const val = m.value || m.val || '';
      const lbl = m.label || m.lbl || '';
      if (!val && !lbl) return '';
      return `
        <div class="case-metric-item">
          <span class="case-metric-val">${val}</span>
          <span class="case-metric-lbl">${lbl}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="case-grid-card case-carousel-card" data-animate="fadeIn" data-index="${idx}">
        ${cs.image ? `
          <div class="case-img-banner">
            <img src="${cs.image}" alt="${cs.title}" class="case-banner-photo" loading="lazy" />
            <div class="case-card-topbar">
              <span class="case-category-tag">${cs.industry || cs.category || cs.tag || 'Enterprise AI'}</span>
              ${cs.client ? `<span class="case-client-badge">${cs.client}</span>` : ''}
            </div>
          </div>
        ` : `
          <div class="case-card-topbar">
            <span class="case-category-tag">${cs.industry || cs.category || cs.tag || 'Enterprise AI'}</span>
            ${cs.client ? `<span class="case-client-badge">${cs.client}</span>` : ''}
          </div>
        `}

        <div class="case-card-content">
          <h3 class="case-title">${cs.title || 'Enterprise Transformation'}</h3>
          ${cs.description ? `<p class="case-desc">${cs.description}</p>` : ''}

          <div class="case-pillars-box">
            ${cs.challenge ? `
              <div class="case-pillar-item">
                <span class="case-pillar-label">Challenge:</span>
                <p class="case-pillar-text">${cs.challenge}</p>
              </div>
            ` : ''}
            ${cs.solution ? `
              <div class="case-pillar-item">
                <span class="case-pillar-label">Solution:</span>
                <p class="case-pillar-text">${cs.solution}</p>
              </div>
            ` : ''}
            ${cs.results ? `
              <div class="case-pillar-item">
                <span class="case-pillar-label">Results:</span>
                <p class="case-pillar-text">${cs.results}</p>
              </div>
            ` : ''}
          </div>

          ${metricsList.length > 0 ? `
            <div class="case-metrics-row">
              ${metricsHtml}
            </div>
          ` : ''}

          <div class="case-card-footer">
            <button class="btn btn-secondary btn-sm" onclick="openConsultation('Case Study: ${cs.title || 'Architecture'}')">
              <span>${cs.cta || 'Explore Architecture'}</span>
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ─── Team Renderer (Atlas-Style 3D Carousel) ─────────────────────── */
function renderTeamCards(teamList) {
  const track = document.getElementById('teamCarouselTrack');
  const dotsContainer = document.getElementById('teamCarouselDots');
  if (!track || !teamList || !teamList.length) return;

  track.innerHTML = '';
  if (dotsContainer) dotsContainer.innerHTML = '';

  teamList.forEach((member, index) => {
    const card = document.createElement('div');
    card.className = `team-card ${index === 0 ? 'is-active' : ''}`;
    card.setAttribute('data-index', index);
    card.setAttribute('data-id', member.id || index);

    const skillsList = member.skills || [];
    const skillsHtml = skillsList.map(s => `<span class="team-skill-pill">${s}</span>`).join('');

    card.innerHTML = `
      <div class="team-photo-wrapper">
        <img src="${member.photo}" alt="${member.name}" class="team-photo-img" loading="lazy" />
        <div class="team-dept-badge">${member.department || 'Engineering'}</div>
      </div>
      <div class="team-card-content">
        <div class="team-member-header">
          <h3 class="team-member-name">${member.name || ''}</h3>
          <span class="team-member-role">${member.designation || ''}</span>
        </div>
        ${member.bio ? `<p class="team-member-bio">${member.bio}</p>` : ''}
        ${skillsList.length > 0 ? `<div class="team-skills-row">${skillsHtml}</div>` : ''}
        <div class="team-card-actions">
          <a href="${member.linkedin || 'https://linkedin.com'}" target="_blank" rel="noopener noreferrer" class="team-linkedin-btn" aria-label="LinkedIn profile of ${member.name}">
            <span>Connect on LinkedIn</span>
            <span class="linkedin-icon">↗</span>
          </a>
        </div>
      </div>
    `;

    track.appendChild(card);

    if (dotsContainer) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to team slide ${index + 1}`);
      dot.setAttribute('data-index', index);
      dotsContainer.appendChild(dot);
    }
  });
}

/* ─── Company Gallery (Filterable Masonry & Lightbox) ─────────────── */
function renderGalleryGrid(galleryList, filterCategory = 'all') {
  const grid = document.getElementById('galleryGrid');
  if (!grid || !galleryList) return;

  grid.innerHTML = '';

  const filtered = filterCategory === 'all'
    ? galleryList
    : galleryList.filter(item => item.category === filterCategory);

  filtered.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.setAttribute('data-category', item.category);
    card.setAttribute('data-id', item.id);
    card.setAttribute('data-index', index);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View ${item.title}`);

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="gallery-card-img" loading="lazy" />
      <div class="gallery-overlay">
        <div class="gallery-card-top">
          <span class="gallery-badge">${item.categoryLabel || item.category}</span>
          <span class="gallery-zoom-icon">⤢</span>
        </div>
        <div class="gallery-card-bottom">
          <span class="gallery-date">${item.date || ''}</span>
          <h4 class="gallery-title">${item.title || ''}</h4>
        </div>
      </div>
    `;

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item, filtered, index);
      }
    });

    card.addEventListener('click', () => {
      openLightbox(item, filtered, index);
    });

    grid.appendChild(card);
  });
}

function renderFeaturedGallery(featuredList) {
  const track = document.getElementById('galleryFeaturedTrack');
  if (!track || !featuredList || !featuredList.length) return;

  track.innerHTML = featuredList.map((item, idx) => `
    <div class="gallery-featured-card" data-index="${idx}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="featured-caption">
        <h4>${item.title}</h4>
      </div>
    </div>
  `).join('');
}

/* ─── Testimonials Renderer (Luxury Single-Card Slider) ───────────── */
function renderTestimonials(testimonialsList) {
  const track = document.getElementById('testimonialSliderTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!track || !testimonialsList || !testimonialsList.length) return;

  track.innerHTML = '';
  if (dotsContainer) dotsContainer.innerHTML = '';

  testimonialsList.forEach((t, idx) => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide-card';
    slide.setAttribute('data-index', idx);

    slide.innerHTML = `
      <div class="testimonial-quote-mark">“</div>
      <div class="rating-stars" style="color: #F59E0B; font-size: 1.1rem; margin-bottom: 14px;">★★★★★</div>
      <p class="testimonial-quote-text">"${t.quote || ''}"</p>

      <div class="testimonial-author-row">
        <div class="testimonial-author-profile">
          <img src="${t.avatar}" alt="${t.author}" class="testimonial-avatar" />
          <div>
            <div class="testimonial-author-name">${t.author || ''}</div>
            <div class="testimonial-author-role">${t.role || ''}, ${t.company || t.org || 'Enterprise Leader'}</div>
          </div>
        </div>
        <span class="badge" style="background: var(--primary-50); color: var(--primary-700); font-weight: 700; padding: 6px 14px; border-radius: var(--radius-pill); font-size: 0.76rem; border: 1px solid var(--primary-100);">Verified Partner</span>
      </div>
    `;

    track.appendChild(slide);

    if (dotsContainer) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial ${idx + 1}`);
      dot.setAttribute('data-index', idx);
      dotsContainer.appendChild(dot);
    }
  });
}

/* ─── Social Channels Grid Renderer ─────────────────────────────── */
function renderChannelsGrid(channelsList) {
  const container = document.getElementById('socialCardsGrid');
  if (!container || !channelsList || !channelsList.length) return;

  container.innerHTML = channelsList.map(ch => `
    <a href="${ch.url}" target="_blank" rel="noopener noreferrer" class="channel-card" data-animate="fadeIn" aria-label="Visit ${ch.name}">
      <div class="channel-icon-wrap" style="background: ${ch.color}15; color: ${ch.color};">
        ${ch.iconSvg ? ch.iconSvg : `<span style="font-weight: 800; font-size: 1.1rem;">${ch.name.slice(0, 2).toUpperCase()}</span>`}
      </div>
      <div class="channel-info">
        <h4 class="channel-name">${ch.name}</h4>
        <span class="channel-role">${ch.role || 'Official'}</span>
        <span class="channel-handle">${ch.handle}</span>
      </div>
      <span class="channel-arrow" style="color: ${ch.color}">↗</span>
    </a>
  `).join('');
}

/* ─── Careers Renderer ───────────────────────────────────────────── */
function renderCareers(careersList) {
  const container = document.getElementById('careersGrid');
  if (!container || !careersList || !careersList.length) return;

  container.innerHTML = careersList.map(role => {
    const skillsList = role.skills || [];
    const skillsHtml = skillsList.map(s => `<span class="career-skill-tag">${s}</span>`).join('');

    return `
      <div class="career-role-card" data-animate="fadeIn">
        <div class="career-card-top">
          <div>
            <span class="career-dept-tag">${role.department || 'Engineering'}</span>
            <h3 class="career-title">${role.title}</h3>
            <span class="career-meta">${role.type} • ${role.experience}</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="openConsultation('Job Application: ${role.title}')">
            <span>Apply Now</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
        <p class="career-desc">${role.description}</p>
        ${skillsList.length > 0 ? `<div class="career-skills-row">${skillsHtml}</div>` : ''}
      </div>
    `;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════════
   2. HERO SLIDER CONTROLLER
   ═══════════════════════════════════════════════════════════════════ */
let currentHeroIndex = 0;
let heroAutoPlayTimer = null;
const HERO_AUTO_INTERVAL = 5500;

function initHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  const tabsRail = document.getElementById('heroTabsRail');
  const btnPrev = document.getElementById('heroPrevBtn');
  const btnNext = document.getElementById('heroNextBtn');

  if (!track) return;

  const getSlides = () => Array.from(track.querySelectorAll('.hero-slide'));
  const getTabs = () => tabsRail ? Array.from(tabsRail.querySelectorAll('.hero-tab-btn')) : [];

  const updateHeroSlider = () => {
    const slides = getSlides();
    const tabs = getTabs();
    if (!slides.length) return;

    track.style.transform = `translateX(-${currentHeroIndex * 100}%)`;

    slides.forEach((s, idx) => s.classList.toggle('active', idx === currentHeroIndex));
    tabs.forEach((t, idx) => {
      t.classList.toggle('active', idx === currentHeroIndex);
      t.setAttribute('aria-selected', idx === currentHeroIndex);
    });
  };

  const setHeroIndex = (idx) => {
    const slides = getSlides();
    if (!slides.length) return;
    currentHeroIndex = (idx + slides.length) % slides.length;
    updateHeroSlider();
    resetHeroTimer();
  };

  const resetHeroTimer = () => {
    clearInterval(heroAutoPlayTimer);
    heroAutoPlayTimer = setInterval(() => {
      setHeroIndex(currentHeroIndex + 1);
    }, HERO_AUTO_INTERVAL);
  };

  if (btnPrev) btnPrev.addEventListener('click', () => setHeroIndex(currentHeroIndex - 1));
  if (btnNext) btnNext.addEventListener('click', () => setHeroIndex(currentHeroIndex + 1));

  if (tabsRail) {
    tabsRail.addEventListener('click', (e) => {
      const tab = e.target.closest('.hero-tab-btn');
      if (!tab) return;
      const idx = parseInt(tab.getAttribute('data-index'), 10);
      if (!isNaN(idx)) setHeroIndex(idx);
    });
  }

  resetHeroTimer();
}

/* ═══════════════════════════════════════════════════════════════════
   3. ATLAS-STYLE 3D TEAM CAROUSEL CONTROLLER
   ═══════════════════════════════════════════════════════════════════ */
let currentTeamIndex = 0;
let teamAutoPlayTimer = null;
const TEAM_AUTO_INTERVAL = 5500;

function initTeamCarousel() {
  const wrapper = document.getElementById('teamCarouselWrapper');
  const viewport = document.getElementById('teamCarouselViewport');
  const track = document.getElementById('teamCarouselTrack');
  const btnPrev = document.getElementById('teamCarouselPrev');
  const btnNext = document.getElementById('teamCarouselNext');
  const dotsContainer = document.getElementById('teamCarouselDots');

  if (!wrapper || !viewport || !track) return;

  const getCards = () => Array.from(track.querySelectorAll('.team-card'));
  const getDots = () => dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot')) : [];

  const updateTeamCarousel = () => {
    const cards = getCards();
    const dots = getDots();
    if (!cards.length) return;

    const viewportWidth = viewport.offsetWidth;
    const activeCard = cards[currentTeamIndex];
    if (!activeCard) return;

    const cardWidth = activeCard.offsetWidth;
    const cardLeft = activeCard.offsetLeft;

    const targetOffset = -(cardLeft - (viewportWidth / 2) + (cardWidth / 2));
    track.style.transform = `translateX(${targetOffset}px)`;

    cards.forEach((card, idx) => {
      card.classList.toggle('is-active', idx === currentTeamIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentTeamIndex);
    });
  };

  const setTeamIndex = (idx) => {
    const cards = getCards();
    if (!cards.length) return;
    currentTeamIndex = (idx + cards.length) % cards.length;
    updateTeamCarousel();
    resetTeamAutoPlay();
  };

  const startTeamAutoPlay = () => {
    clearInterval(teamAutoPlayTimer);
    teamAutoPlayTimer = setInterval(() => {
      setTeamIndex(currentTeamIndex + 1);
    }, TEAM_AUTO_INTERVAL);
  };

  const resetTeamAutoPlay = () => {
    startTeamAutoPlay();
  };

  if (btnPrev) btnPrev.addEventListener('click', () => setTeamIndex(currentTeamIndex - 1));
  if (btnNext) btnNext.addEventListener('click', () => setTeamIndex(currentTeamIndex + 1));

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (!dot) return;
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) setTeamIndex(idx);
    });
  }

  track.addEventListener('click', (e) => {
    const card = e.target.closest('.team-card');
    if (!card) return;
    const idx = parseInt(card.getAttribute('data-index'), 10);
    if (!isNaN(idx) && idx !== currentTeamIndex) {
      setTeamIndex(idx);
    }
  });

  // Touch / Drag handling
  let isDown = false;
  let startX = 0;
  let initialDiff = 0;

  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    viewport.classList.add('is-dragging');
    startX = e.pageX;
    initialDiff = 0;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    viewport.classList.remove('is-dragging');
    if (Math.abs(initialDiff) > 50) {
      if (initialDiff > 0) setTeamIndex(currentTeamIndex - 1);
      else setTeamIndex(currentTeamIndex + 1);
    }
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    initialDiff = e.pageX - startX;
  });

  let touchStartX = 0;
  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) setTeamIndex(currentTeamIndex - 1);
      else setTeamIndex(currentTeamIndex + 1);
    }
  });

  viewport.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > 25) {
      e.preventDefault();
      if (e.deltaX > 0) setTeamIndex(currentTeamIndex + 1);
      else setTeamIndex(currentTeamIndex - 1);
    }
  }, { passive: false });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const rect = viewport.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') setTeamIndex(currentTeamIndex - 1);
    if (e.key === 'ArrowRight') setTeamIndex(currentTeamIndex + 1);
  });

  viewport.addEventListener('mouseenter', () => clearInterval(teamAutoPlayTimer));
  viewport.addEventListener('mouseleave', () => startTeamAutoPlay());

  window.addEventListener('resize', updateTeamCarousel);

  setTimeout(() => {
    updateTeamCarousel();
    startTeamAutoPlay();
  }, 100);
}

/* ═══════════════════════════════════════════════════════════════════
   4. COMPANY GALLERY & FULLSCREEN LIGHTBOX CONTROLLER
   ═══════════════════════════════════════════════════════════════════ */
let activeGalleryItems = [];
let currentLightboxIndex = 0;

function initGalleryAndLightbox() {
  const filterBar = document.getElementById('galleryFilterBar');
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.gallery-filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';
      if (window.TechJagannathData && window.TechJagannathData.gallery) {
        renderGalleryGrid(window.TechJagannathData.gallery, filter);
      }
    });
  }

  // Lightbox navigation elements
  const modal = document.getElementById('galleryLightbox');
  const btnClose = document.getElementById('lightboxCloseBtn');
  const backdrop = document.getElementById('lightboxBackdrop');
  const btnPrev = document.getElementById('lightboxPrevBtn');
  const btnNext = document.getElementById('lightboxNextBtn');

  if (btnClose) btnClose.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (btnPrev) btnPrev.addEventListener('click', () => navigateLightbox(-1));
  if (btnNext) btnNext.addEventListener('click', () => navigateLightbox(1));

  window.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function initGalleryFeaturedCarousel() {
  const track = document.getElementById('galleryFeaturedTrack');
  const btnPrev = document.getElementById('galleryPrevBtn');
  const btnNext = document.getElementById('galleryNextBtn');
  if (!track) return;

  let featIdx = 0;
  const cards = track.querySelectorAll('.gallery-featured-card');

  const update = () => {
    if (!cards.length) return;
    track.style.transform = `translateX(-${featIdx * 100}%)`;
  };

  if (btnPrev) btnPrev.addEventListener('click', () => {
    featIdx = Math.max(0, featIdx - 1);
    update();
  });
  if (btnNext) btnNext.addEventListener('click', () => {
    featIdx = Math.min(cards.length - 1, featIdx + 1);
    update();
  });
}

function openLightbox(item, itemsList, index) {
  const modal = document.getElementById('galleryLightbox');
  if (!modal) return;

  activeGalleryItems = itemsList;
  currentLightboxIndex = index;
  updateLightboxContent();

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('galleryLightbox');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  if (!activeGalleryItems || !activeGalleryItems.length) return;
  currentLightboxIndex = (currentLightboxIndex + direction + activeGalleryItems.length) % activeGalleryItems.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  if (!activeGalleryItems || !activeGalleryItems[currentLightboxIndex]) return;
  const item = activeGalleryItems[currentLightboxIndex];

  const imgEl = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDesc');
  const catEl = document.getElementById('lightboxCat');
  const dateEl = document.getElementById('lightboxDate');
  const counterEl = document.getElementById('lightboxCounter');

  if (imgEl) {
    imgEl.src = item.image;
    imgEl.alt = item.title;
  }
  if (titleEl) titleEl.textContent = item.title;
  if (descEl) descEl.textContent = item.description || '';
  if (catEl) catEl.textContent = item.categoryLabel || item.category;
  if (dateEl) dateEl.textContent = item.date || '';
  if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} of ${activeGalleryItems.length}`;
}

/* ═══════════════════════════════════════════════════════════════════
   5. CASE STUDIES & TESTIMONIALS SLIDER CONTROLLERS
   ═══════════════════════════════════════════════════════════════════ */
function initCasesCarousel() {
  const wrapper = document.getElementById('casesCarouselWrapper');
  const track = document.getElementById('casesCarouselTrack');
  const btnPrev = document.getElementById('casesCarouselPrev') || document.getElementById('casesPrevBtn');
  const btnNext = document.getElementById('casesCarouselNext') || document.getElementById('casesNextBtn');

  if (!wrapper) return;

  let currentCaseIdx = 0;
  const getSlides = () => Array.from(document.querySelectorAll('.case-grid-card'));

  const updateCaseSlider = () => {
    const slides = getSlides();
    if (!slides.length) return;
    const slide = slides[currentCaseIdx];
    if (!slide) return;
    slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      const slides = getSlides();
      currentCaseIdx = Math.max(0, currentCaseIdx - 1);
      updateCaseSlider();
    });
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const slides = getSlides();
      currentCaseIdx = Math.min(slides.length - 1, currentCaseIdx + 1);
      updateCaseSlider();
    });
  }
}

let currentTestimonialIndex = 0;
let testimonialTimer = null;

function initTestimonialsSlider() {
  const track = document.getElementById('testimonialSliderTrack');
  const btnPrev = document.getElementById('testimonialPrevBtn');
  const btnNext = document.getElementById('testimonialNextBtn');
  const dotsContainer = document.getElementById('testimonialDots');

  if (!track) return;

  const getSlides = () => Array.from(track.querySelectorAll('.testimonial-slide-card'));
  const getDots = () => dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot')) : [];

  const updateTestimonialSlider = () => {
    const slides = getSlides();
    const dots = getDots();
    if (!slides.length) return;

    track.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;

    slides.forEach((s, idx) => s.classList.toggle('active', idx === currentTestimonialIndex));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === currentTestimonialIndex));
  };

  const setTestimonial = (idx) => {
    const slides = getSlides();
    if (!slides.length) return;
    currentTestimonialIndex = (idx + slides.length) % slides.length;
    updateTestimonialSlider();
    resetTestimonialTimer();
  };

  const resetTestimonialTimer = () => {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(() => {
      setTestimonial(currentTestimonialIndex + 1);
    }, 6500);
  };

  if (btnPrev) btnPrev.addEventListener('click', () => setTestimonial(currentTestimonialIndex - 1));
  if (btnNext) btnNext.addEventListener('click', () => setTestimonial(currentTestimonialIndex + 1));

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (!dot) return;
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) setTestimonial(idx);
    });
  }

  resetTestimonialTimer();
}

function initProductsCarousel() {
  // Mobile touch scrolling and responsive layouts initialized
}

/* ═══════════════════════════════════════════════════════════════════
   6. UI CONTROLLERS & ANIMATIONS
   ═══════════════════════════════════════════════════════════════════ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 550);
  };

  // 2.2-second premium branded entrance
  const startTime = Date.now();
  const onReady = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(2200 - elapsed, 500);
    setTimeout(hidePreloader, remaining);
  };

  if (document.readyState === 'complete') {
    onReady();
  } else {
    window.addEventListener('load', onReady);
    setTimeout(hidePreloader, 2800);
  }
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }
}

function initMarquees() {
  // Continuous smooth CSS marquee animations
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

function initScrollAnimations() {
  const animEls = document.querySelectorAll('[data-animate]');
  if (!animEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => {
          el.classList.add('is-visible');
        }, delay * 1000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  animEls.forEach(el => observer.observe(el));
}

function initStatCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || 0);
        const decimal = el.getAttribute('data-decimal');
        const duration = 1800;
        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const current = target * progress;
          el.textContent = decimal ? current.toFixed(parseInt(decimal, 10)) : Math.floor(current).toLocaleString();
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = decimal ? target.toFixed(parseInt(decimal, 10)) : target.toLocaleString();
        };

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

function initFaqAccordion() {
  const faqSection = document.getElementById('faq');
  if (!faqSection) return;

  faqSection.addEventListener('click', (e) => {
    const questionBtn = e.target.closest('.faq-question-btn');
    if (!questionBtn) return;

    const item = questionBtn.closest('.faq-item') || questionBtn.closest('.faq-accordion-item');
    if (!item) return;

    const isOpen = item.classList.contains('active');
    faqSection.querySelectorAll('.faq-item, .faq-accordion-item').forEach(i => i.classList.remove('active'));

    if (!isOpen) {
      item.classList.add('active');
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════
   20. CENTRAL CONTACT LINKS & DYNAMIC BINDING
   ═══════════════════════════════════════════════════════════════════ */
function initCentralContactLinks() {
  if (typeof COMPANY_CONTACT === 'undefined') return;

  // 1. Centralized WhatsApp links
  const waLinks = document.querySelectorAll('a[href*="wa.me"], a.footer-social-btn[aria-label="WhatsApp"], a[data-contact="whatsapp"]');
  waLinks.forEach(link => {
    link.href = typeof getWhatsAppUrl === 'function' ? getWhatsAppUrl() : `https://wa.me/${COMPANY_CONTACT.whatsapp}?text=${encodeURIComponent(COMPANY_CONTACT.whatsappText)}`;
  });

  // 2. Centralized Email links
  const emailLinks = document.querySelectorAll('a[href^="mailto:"], a[data-contact="email"]');
  emailLinks.forEach(link => {
    const defaultSubject = COMPANY_CONTACT.emailSubject || 'Website Inquiry - Jagannath Tech Solutions';
    link.href = typeof getMailtoUrl === 'function' ? getMailtoUrl() : `mailto:${COMPANY_CONTACT.email}?subject=${encodeURIComponent(defaultSubject)}`;
    if (link.textContent.trim() === 'info@techjagannath.com' || link.hasAttribute('data-contact-text')) {
      link.textContent = COMPANY_CONTACT.email;
    }
  });

  // 3. Centralized Phone links
  const phoneLinks = document.querySelectorAll('a[href^="tel:"], a[data-contact="phone"]');
  phoneLinks.forEach(link => {
    link.href = typeof getTelUrl === 'function' ? getTelUrl() : `tel:${COMPANY_CONTACT.phone}`;
    if (link.textContent.trim().startsWith('+91') || link.hasAttribute('data-contact-text')) {
      link.textContent = COMPANY_CONTACT.displayPhone || COMPANY_CONTACT.phone;
    }
  });
}

/* ─── Validation Helpers ─────────────────────────────────────────── */
function isValidEmail(email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(String(email).trim());
}

function isValidPhone(phone) {
  if (!phone) return false;
  const digits = String(phone).replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function showFormError(element, message) {
  if (!element) {
    alert(message);
    return;
  }
  element.textContent = '⚠️ ' + message;
  element.style.display = 'block';
}

/* ─── Consultation & Book Demo Modal Controller ─────────────────── */
function initConsultationModal() {
  const modal = document.getElementById('consultModal');
  const btnOpens = document.querySelectorAll('#btnOpenConsultModal, .btn-open-consult-modal, [data-open-modal="consult"]');
  const btnClose = document.getElementById('btnCloseConsultModal');

  btnOpens.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customTopic = btn.getAttribute('data-topic') || 'General Architecture Consultation';
      openConsultation(customTopic);
    });
  });

  if (btnClose && modal) {
    btnClose.addEventListener('click', () => closeConsultation());
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeConsultation();
    });
  }

  // Keyboard accessibility: Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeConsultation();
    }
  });
}

function openConsultation(topic) {
  const modal = document.getElementById('consultModal');
  const topicInput = document.getElementById('modalTopic');
  const errBox = document.getElementById('modalErrorMessage');
  const succBox = document.getElementById('modalSuccessMessage');
  if (!modal) return;

  if (errBox) errBox.style.display = 'none';
  if (succBox) succBox.style.display = 'none';

  if (topicInput && topic) {
    if (topicInput.tagName === 'SELECT') {
      let matched = false;
      for (let i = 0; i < topicInput.options.length; i++) {
        if (topicInput.options[i].value.toLowerCase().includes(topic.toLowerCase()) || 
            topic.toLowerCase().includes(topicInput.options[i].value.toLowerCase())) {
          topicInput.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) {
        const newOpt = new Option(topic, topic, true, true);
        topicInput.add(newOpt);
      }
    } else {
      topicInput.value = topic;
    }
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const firstInput = document.getElementById('modalName');
    if (firstInput) firstInput.focus();
  }, 120);
}

function closeConsultation() {
  const modal = document.getElementById('consultModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ─── Modal Form Submission (Book Demo) ─────────────────────────── */
let isModalSubmitting = false;

async function handleModalSubmit(e) {
  e.preventDefault();
  if (isModalSubmitting) return;

  const form = document.getElementById('consultForm');
  const submitBtn = document.getElementById('modalSubmitBtn') || form?.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('modalSuccessMessage');
  const errorMsg = document.getElementById('modalErrorMessage');

  if (errorMsg) errorMsg.style.display = 'none';
  if (successMsg) successMsg.style.display = 'none';

  const name = document.getElementById('modalName')?.value.trim() || '';
  const organization = document.getElementById('modalOrg')?.value.trim() || '';
  const email = document.getElementById('modalEmail')?.value.trim() || '';
  const phone = document.getElementById('modalPhone')?.value.trim() || '';
  const topic = document.getElementById('modalTopic')?.value.trim() || 'General Architecture Consultation';
  const demoDate = document.getElementById('modalDate')?.value || '';
  const demoTime = document.getElementById('modalTime')?.value || '';
  const message = document.getElementById('modalMessage')?.value.trim() || '';

  // 1. Validation
  if (!name) {
    showFormError(errorMsg, 'Please enter your Full Name.');
    document.getElementById('modalName')?.focus();
    return;
  }
  if (!email || !isValidEmail(email)) {
    showFormError(errorMsg, 'Please enter a valid work or institutional email address.');
    document.getElementById('modalEmail')?.focus();
    return;
  }
  if (!phone || !isValidPhone(phone)) {
    showFormError(errorMsg, 'Please enter a valid Phone / WhatsApp number (min 7 digits).');
    document.getElementById('modalPhone')?.focus();
    return;
  }

  // 2. Loading state & anti-duplicate lock
  isModalSubmitting = true;
  let origBtnContent = '';
  if (submitBtn) {
    submitBtn.disabled = true;
    origBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Transmitting Demo Request...</span>';
    submitBtn.style.opacity = '0.75';
    submitBtn.style.cursor = 'not-allowed';
  }

  const payload = {
    name,
    organization,
    email,
    phone,
    topic,
    demoDate,
    demoTime,
    message,
    source: 'Book Demo Modal',
    submittedAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json().catch(() => ({}));

    if (res.ok && result.success) {
      if (successMsg) {
        successMsg.textContent = result.message || '✓ Demo request received! Our engineering team will contact you shortly to confirm your scheduled slot.';
        successMsg.style.display = 'block';
      }
      if (form) form.reset();

      setTimeout(() => {
        closeConsultation();
        if (successMsg) successMsg.style.display = 'none';
      }, 2600);
    } else {
      throw new Error(result.error || result.message || 'Unable to send your request right now. Please try again or contact us directly.');
    }
  } catch (err) {
    console.error('[Demo Request Error]', err);
    showFormError(errorMsg, err.message || 'Unable to send your request right now. Please try again or contact us directly.');
  } finally {
    isModalSubmitting = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnContent || '<span class="btn-text">Schedule Live Demo</span> <span class="btn-arrow">→</span>';
      submitBtn.style.opacity = '';
      submitBtn.style.cursor = '';
    }
  }
}

/* ─── Contact Form Submission ────────────────────────────────────── */
let isContactSubmitting = false;

async function handleContactSubmit(e) {
  e.preventDefault();
  if (isContactSubmitting) return;

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn') || form?.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('formSuccessMessage');
  const errorMsg = document.getElementById('formErrorMessage');

  if (errorMsg) errorMsg.style.display = 'none';
  if (successMsg) successMsg.style.display = 'none';

  const name = document.getElementById('contactName')?.value.trim() || '';
  const email = document.getElementById('contactEmail')?.value.trim() || '';
  const phone = document.getElementById('contactPhone')?.value.trim() || '';
  const organization = document.getElementById('contactOrg')?.value.trim() || '';
  const subject = document.getElementById('contactInterest')?.value || 'General Inquiry';
  const message = document.getElementById('contactMessage')?.value.trim() || '';

  // 1. Validation
  if (!name) {
    showFormError(errorMsg, 'Please enter your Full Name.');
    document.getElementById('contactName')?.focus();
    return;
  }
  if (!email || !isValidEmail(email)) {
    showFormError(errorMsg, 'Please enter a valid work email address.');
    document.getElementById('contactEmail')?.focus();
    return;
  }
  if (phone && !isValidPhone(phone)) {
    showFormError(errorMsg, 'Please enter a valid Phone / WhatsApp number (min 7 digits).');
    document.getElementById('contactPhone')?.focus();
    return;
  }
  if (!message || message.length < 5) {
    showFormError(errorMsg, 'Please enter your project requirements or query (at least 5 characters).');
    document.getElementById('contactMessage')?.focus();
    return;
  }

  // 2. Loading state & anti-duplicate lock
  isContactSubmitting = true;
  let origBtnContent = '';
  if (submitBtn) {
    submitBtn.disabled = true;
    origBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Submitting Request...</span>';
    submitBtn.style.opacity = '0.75';
    submitBtn.style.cursor = 'not-allowed';
  }

  const payload = {
    name,
    email,
    phone: phone || 'N/A',
    organization: organization || 'N/A',
    subject,
    service: subject,
    message,
    source: 'Website Contact Form',
    submittedAt: new Date().toISOString()
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json().catch(() => ({}));

    if (res.ok && result.success) {
      if (successMsg) {
        successMsg.textContent = result.message || '✓ Thank you! Your request has been transmitted directly to our executive team. We will respond within 4 business hours.';
        successMsg.style.display = 'block';
      }
      if (form) form.reset();
      setTimeout(() => {
        if (successMsg) successMsg.style.display = 'none';
      }, 5000);
    } else {
      throw new Error(result.error || result.message || 'Unable to send your request right now. Please try again or contact us directly.');
    }
  } catch (err) {
    console.error('[Contact Form Error]', err);
    showFormError(errorMsg, err.message || 'Unable to send your request right now. Please try again or contact us directly.');
  } finally {
    isContactSubmitting = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnContent || '<span class="btn-text">Submit Enterprise Request</span> <span class="btn-arrow">→</span>';
      submitBtn.style.opacity = '';
      submitBtn.style.cursor = '';
    }
  }
}

function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('active');
    else btn.classList.remove('active');
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

function init3DTiltEffect() {
  const tiltCards = document.querySelectorAll('.product-3d-card, .service-card-modern, .hero-dashboard-card, .case-carousel-card, .case-grid-card, .why-card, .stat-achievement-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initHeroParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 35;
    const y = (e.clientY - rect.top - rect.height / 2) / 35;

    const glow1 = hero.querySelector('.glow-1');
    const glow2 = hero.querySelector('.glow-2');
    if (glow1) glow1.style.transform = `translate(${x * 1.5}px, ${y * 1.5}px)`;
    if (glow2) glow2.style.transform = `translate(${-x * 1.2}px, ${-y * 1.2}px)`;
  });
}

function initNeuralCanvas() {
  let canvas = document.getElementById('neuralCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'neuralCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.7';
    document.body.insertBefore(canvas, document.body.firstChild);
  }

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 28 : 55;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resize);
  resize();

  const mouse = { x: null, y: null, radius: 140 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(168, 85, 247, ';
      this.alpha = Math.random() * 0.6 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color + '0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = (1 - dist / 130) * 0.25;
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  };

  animate();
}

// Global scope attachment for inline handlers
window.handleContactSubmit = handleContactSubmit;
window.handleModalSubmit = handleModalSubmit;
window.openConsultation = openConsultation;
window.closeConsultation = closeConsultation;
