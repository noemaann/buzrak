document.addEventListener("DOMContentLoaded", () => {

  /* ─── PAGE TRANSITION ──────────────────────────── */
  const transitionEl = document.createElement('div');
  transitionEl.className = 'page-transition';
  document.body.appendChild(transitionEl);

  // Exit animation on all internal links
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto')) {
      link.addEventListener('click', e => {
        e.preventDefault();
        transitionEl.className = 'page-transition enter'; // pgIn animation
        setTimeout(() => { window.location.href = href; }, 480);
      });
    }
  });

  // Entry animation
  transitionEl.className = 'page-transition exit'; // pgOut animation

  /* Custom cursor JS logic removed */

  /* ─── PROGRESS BAR ─────────────────────────────── */
  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollTop / docHeight * 100) + '%';
  });

  /* ─── SIDEBAR TOGGLE ───────────────────────────── */
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  function openSidebar() {
    sidebar.classList.add("active");
    hamburgerMenu.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = 'hidden';
  }
  function closeSidebarFn() {
    sidebar.classList.remove("active");
    hamburgerMenu.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = '';
  }
  function toggleSidebar() {
    if (sidebar.classList.contains("active")) {
      closeSidebarFn();
    } else {
      openSidebar();
    }
  }
  if (hamburgerMenu) hamburgerMenu.addEventListener("click", toggleSidebar);
  if (closeSidebar) closeSidebar.addEventListener("click", closeSidebarFn);
  overlay.addEventListener('click', closeSidebarFn);

  /* ─── SCROLL REVEAL ────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.quote-card, .image-card, .mate-card, .committee-card, .detail-section, .stats-bar, .section-label'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay based on position in parent
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 60, 400);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ─── IMAGE LABELS ─────────────────────────────── */
  document.querySelectorAll('.image-card').forEach((card, i) => {
    if (!card.querySelector('.img-label')) {
      const label = document.createElement('span');
      label.className = 'img-label';
      label.textContent = `No. ${String(i + 1).padStart(2, '0')}`;
      card.appendChild(label);
    }
  });

  /* ─── COMMITTEE CARD BODY WRAP ─────────────────── */
  document.querySelectorAll('.committee-card').forEach(card => {
    const children = Array.from(card.children);
    const img = children.find(c => c.tagName === 'IMG');
    const rest = children.filter(c => c.tagName !== 'IMG');
    if (img && rest.length && !card.querySelector('.committee-card-body')) {
      const body = document.createElement('div');
      body.className = 'committee-card-body';
      rest.forEach(el => body.appendChild(el));
      card.appendChild(body);
    }
  });

  /* ─── HOSTEL MATES DYNAMIC GENERATION ─────────── */
  const matesGrid = document.getElementById("matesGrid");
  if (matesGrid) {
    const mateNames = ["Jasim","Sanjay","Goutham D","Levin","Shinil","Althaf","Aashir","Noeman","Reyyan","Roshan","Nishal","Shibil","Arshad","Nithash","PP","Farseen","Aravind","Huzail","Adhin","Alan","Josekutty","Abhinav","Anuchind","Hrishi","Vaseem","Shabeel","Rasl","Adith","Shaz","Hamdan","Shon","Shemil","Amjad","Shahanad","Nihal","Geo","Sangeeth","Naseef","Anandhu","Sreedin","Faheem","Jayanth","Vaishnav","Sabith","Drupad","Goutham K","Akbar","Alphons","Shaheen","Yacoob","Aman","Adnan","Basim"];
    mateNames.forEach((name, index) => {
      const i = index + 1;
      const a = document.createElement("a");
      a.className = "mate-card";
      a.href = `member.html?id=${i}&name=${encodeURIComponent(name)}`;
      const imgSrc = encodeURI(`DP's/${name}.jpg`);
      a.innerHTML = `
        <img class="mate-photo" src="${imgSrc}" alt="${name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a3a28&color=f7f4ed&size=80'">
        <div class="mate-name">${name}</div>
      `;
      matesGrid.appendChild(a);
    });
  }

  /* ─── HOME PAGE RANDOM GALLERY ─────────────────── */
  const homeGallery = document.getElementById("homeGallery");
  if (homeGallery) {
    const imgPool = ["IMG_0001.JPG", "IMG_0002.JPG", "IMG_0003.JPG", "IMG_0004.JPG", "IMG_0005.JPG", "IMG_0006.JPG", "IMG_0007.JPG", "IMG_0008.JPG", "IMG_0009.JPG", "IMG_0010.JPG", "IMG_0011.JPG", "IMG_0012.JPG", "IMG_0013.JPG", "IMG_0014.JPG", "IMG_0015.JPG", "IMG_0020.JPG", "IMG_0021.JPG", "IMG_0022.JPG", "IMG_0023.JPG", "IMG_0024.JPG", "IMG_0025.JPG", "IMG_0026.JPG", "IMG_0027.JPG", "IMG_0028.JPG", "IMG_0029.JPG", "IMG_0030.JPG", "IMG_0031.JPG", "IMG_0033.JPG", "IMG_0034.JPG", "IMG_0035.JPG", "IMG_0036.JPG", "IMG_0037.JPG", "IMG_0038.JPG", "IMG_0039.JPG", "IMG_0040.JPG", "IMG_0041.JPG", "IMG_0042.JPG", "IMG_0047.JPG", "IMG_0048.JPG", "IMG_0049.JPG", "IMG_0050.JPG", "IMG_0051.JPG", "IMG_0052.JPG", "IMG_0053.JPG", "IMG_0054.JPG", "IMG_0055.JPG", "IMG_0056.JPG", "IMG_0057.JPG", "IMG_0058.JPG", "IMG_0059.JPG", "IMG_0060.JPG", "IMG_0061.JPG", "IMG_0062.JPG", "IMG_0065.JPG", "IMG_0066.JPG", "IMG_0067.JPG", "IMG_0068.JPG", "IMG_0069.JPG", "IMG_0070.JPG", "IMG_0071.JPG", "IMG_0072.JPG", "IMG_0073.JPG", "IMG_0074.JPG", "IMG_0075.JPG", "IMG_0076.JPG", "IMG_0080.JPG", "IMG_0081.JPG", "IMG_0082.JPG", "IMG_0083.JPG", "IMG_0084.JPG", "IMG_0085.JPG", "IMG_0086.JPG", "IMG_0087.JPG", "IMG_0088.JPG", "IMG_0089.JPG", "IMG_0090.JPG", "IMG_0091.JPG", "IMG_0092.JPG", "IMG_0093.JPG", "IMG_0094.JPG", "IMG_0095.JPG", "IMG_0096.JPG", "IMG_0097.JPG", "IMG_0098.JPG", "IMG_0099.JPG", "IMG_0100.JPG", "IMG_0101.JPG", "IMG_0102.JPG", "IMG_0103.JPG", "IMG_0104.JPG", "IMG_0105.JPG", "IMG_0106.JPG", "IMG_0107.JPG", "IMG_0108.JPG", "IMG_0109.JPG", "IMG_0110.JPG", "IMG_0111.JPG", "IMG_0112.JPG", "IMG_0113.JPG", "IMG_0114.JPG", "IMG_0115.JPG", "IMG_0116.JPG", "IMG_0117.JPG", "IMG_0118.JPG", "IMG_0119.JPG", "IMG_0120.JPG", "IMG_0121.JPG", "IMG_0122.JPG", "IMG_0123.JPG", "IMG_0124.JPG", "IMG_0125.JPG", "IMG_0126.JPG", "IMG_0127.JPG", "IMG_0128.JPG", "IMG_0129.JPG", "IMG_0130.JPG", "IMG_0131.JPG", "IMG_0132.JPG", "IMG_0133.JPG", "IMG_0134.JPG", "IMG_0135.JPG", "IMG_0136.JPG", "IMG_0137.JPG", "IMG_0138.JPG", "IMG_0139.JPG", "IMG_0140.JPG", "IMG_0141.JPG", "IMG_0142.JPG", "IMG_0143.JPG", "IMG_0144.JPG", "IMG_0145.JPG", "IMG_0146.JPG", "IMG_0147.JPG", "IMG_0148.JPG", "IMG_0149.JPG", "IMG_0150.JPG", "IMG_0151.JPG", "IMG_0152.JPG", "IMG_0153.JPG", "IMG_0154.JPG", "IMG_0155.JPG", "IMG_0156.JPG", "IMG_0157.JPG", "IMG_0158.JPG", "IMG_0159.JPG", "IMG_0160.JPG", "IMG_0161.JPG", "IMG_0162.JPG", "IMG_0163.JPG", "IMG_0164.JPG", "IMG_0165.JPG", "IMG_0166.JPG", "IMG_0167.JPG", "IMG_0168.JPG", "IMG_0169.JPG", "IMG_0170.JPG", "IMG_0171.JPG", "IMG_0172.JPG", "IMG_0173.JPG", "IMG_0174.JPG", "IMG_0175.JPG", "IMG_0176.JPG", "IMG_0177.JPG", "IMG_0178.JPG", "IMG_0179.JPG", "IMG_0180.JPG", "IMG_0181.JPG", "IMG_0182.JPG", "IMG_0183.JPG", "IMG_0184.JPG", "IMG_0185.JPG", "IMG_0186.JPG", "IMG_0187.JPG", "IMG_0188.JPG", "IMG_0189.JPG", "IMG_0190.JPG", "IMG_0191.JPG", "IMG_0192.JPG", "IMG_0193.JPG", "IMG_0194.JPG", "IMG_0195.JPG", "IMG_0196.JPG", "IMG_0197.JPG", "IMG_0198.JPG", "IMG_0199.JPG", "IMG_0200.JPG", "IMG_0201.JPG", "IMG_0202.JPG", "IMG_0203.JPG", "IMG_0204.JPG", "IMG_0205.JPG", "IMG_0206.JPG", "IMG_0207.JPG", "IMG_0208.JPG", "IMG_0209.JPG", "IMG_0210.JPG", "IMG_0211.JPG", "IMG_0212.JPG", "IMG_0214.JPG", "IMG_0216.JPG", "IMG_0217.JPG", "IMG_0218.JPG", "IMG_0219.JPG", "IMG_0220.JPG", "IMG_0221.JPG", "IMG_0222.JPG", "IMG_0223.JPG", "IMG_0224.JPG", "IMG_0225.JPG", "IMG_0226.JPG", "IMG_0227.JPG", "IMG_0228.JPG", "IMG_0229.JPG", "IMG_0230.JPG", "IMG_0231.JPG", "IMG_0232.JPG", "IMG_0233.JPG", "IMG_0234.JPG", "IMG_0235.JPG", "IMG_0236.JPG", "IMG_0237.JPG", "IMG_0238.JPG", "IMG_0239.JPG", "IMG_0240.JPG", "IMG_0241.JPG", "IMG_0341.JPG", "IMG_0342.JPG", "IMG_0343.JPG", "IMG_0344.JPG", "IMG_0345.JPG", "IMG_0346.JPG", "IMG_0347.JPG", "IMG_0348.JPG", "IMG_0349.JPG", "IMG_0350.JPG", "IMG_0351.JPG", "IMG_0352.JPG", "IMG_0353.JPG", "IMG_0354.JPG", "IMG_0355.JPG", "IMG_0356.JPG", "IMG_0357.JPG", "IMG_0358.JPG", "IMG_0359.JPG", "IMG_0360.JPG", "IMG_0361.JPG", "IMG_0362.JPG", "IMG_0363.JPG", "IMG_0364.JPG", "IMG_0367.JPG", "IMG_0368.JPG", "IMG_0369.JPG", "IMG_0370.JPG", "IMG_0371.JPG", "IMG_0372.JPG", "IMG_0373.JPG", "IMG_0374.JPG", "IMG_0375.JPG", "IMG_0376.JPG", "IMG_0377.JPG", "IMG_0378.JPG", "IMG_0379.JPG", "IMG_0380.JPG", "IMG_0381.JPG", "IMG_0382.JPG", "IMG_0383.JPG", "IMG_0384.JPG", "IMG_0385.JPG", "IMG_0386.JPG", "IMG_0387.JPG", "IMG_0388.JPG", "IMG_0389.JPG", "IMG_0390.JPG", "IMG_0391.JPG", "IMG_0392.JPG", "IMG_0393.JPG", "IMG_0394.JPG", "IMG_0395.JPG", "IMG_0396.JPG", "IMG_0397.JPG", "IMG_0398.JPG", "IMG_0399.JPG", "IMG_0400.JPG", "IMG_0401.JPG", "IMG_0402.JPG", "IMG_0403.JPG", "IMG_0404.JPG", "IMG_0405.JPG", "IMG_0406.JPG", "IMG_0408.JPG", "IMG_0409.JPG", "IMG_0410.JPG", "IMG_0411.JPG", "IMG_0412.JPG", "IMG_0413.JPG", "IMG_0414.JPG", "IMG_0415.JPG", "IMG_0416.JPG", "IMG_0417.JPG", "IMG_0418.JPG", "IMG_0419.JPG", "IMG_0420.JPG", "IMG_0421.JPG", "IMG_0422.JPG", "IMG_0423.JPG", "IMG_0424.JPG", "IMG_0425.JPG", "IMG_0426.JPG", "IMG_0427.JPG", "IMG_0428.JPG", "IMG_0429.JPG", "IMG_0430.JPG", "IMG_0431.JPG", "IMG_0432.JPG", "IMG_0433.JPG", "IMG_0434.JPG", "IMG_0435.JPG"];
    const selectedImages = [];
    while(selectedImages.length < 6 && selectedImages.length < imgPool.length) {
      const randIdx = Math.floor(Math.random() * imgPool.length);
      const img = imgPool[randIdx];
      if(!selectedImages.includes(img)) {
        selectedImages.push(img);
      }
    }
    const imgEls = homeGallery.querySelectorAll('img');
    imgEls.forEach((imgEl, index) => {
      if (selectedImages[index]) {
        imgEl.src = `https://raw.githubusercontent.com/noemaann/Zlu-images/main/images/${selectedImages[index]}`;
        imgEl.alt = `Zulu Memory from Pool`;
      }
    });
  }

  /* ─── MEMBER PAGE ──────────────────────────────── */
  const urlParams = new URLSearchParams(window.location.search);
  const memberId = urlParams.get('id');
  const memberName = urlParams.get('name');

  if (memberId && memberName) {
    const titleEl = document.getElementById("galleryTitle");
    if (titleEl) titleEl.innerText = `${memberName}`;

    const dynamicGallery = document.getElementById("dynamicGallery");
    if (dynamicGallery) {
      for (let i = 1; i <= 6; i++) {
        const div = document.createElement("div");
        div.className = "image-card";
        div.innerHTML = `<img src="https://picsum.photos/400/300?random=${memberId * 10 + i}" alt="${memberName} photo ${i}">`;
        dynamicGallery.appendChild(div);
      }
    }
  }

  /* ─── COMMITTEE DETAIL ─────────────────────────── */
  const committeeDict = {
    "nithash": {
      name: "Nithash Committee",
      period: "August 2025 — November 2025",
      members: ["PP", "Shon", "Alan", "Sangeeth", "Aman"],
      achievements: "Nithash led the committee to organize the first mess without common starting troubles and attempted to implement hostel-wide Wi-Fi.",
      disadvantages: "Failure to distribute chicken equally, the occurrence of food corruption, and that the committee stepped down due to allegations of food corruption.",
      fallReason: "Stepped down due to allegations of food corruption."
    },
    "alphons": {
      name: "Alphons Committee",
      period: "November 2025 — February 2026",
      members: ["Alphons (Secretary)", "Goutham D", "Althaf", "Noeman", "Abhinav"],
      achievements: "Restored midnight canteen access. Repaired the long-broken washing machines in Block B.",
      disadvantages: "Budget shortfalls led to lack of sports equipment and inability to fund inter-hostel tournaments.",
      fallReason: "Term ended gracefully, though widely criticised for a chaotic farewell party."
    },
    "adnan": {
      name: "Adnan Committee",
      period: "February 2026 — May 2026",
      members: ["Adnan (Secretary)", "Basim", "Aman", "Yacoob", "Shaheen"],
      achievements: "Launched weekend gaming tournaments and fully renovated the TV room with new seating.",
      disadvantages: "Noise complaints from wardens spiked considerably. Warden relations hit an all-time low.",
      fallReason: "Dissolved at semester end as hostelites dispersed for summer holidays."
    }
  };

  const committeeId = urlParams.get('id');
  if (committeeId && committeeDict[committeeId]) {
    const data = committeeDict[committeeId];
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('cName', data.name);
    set('cPeriod', data.period);
    set('cAchievements', data.achievements);
    set('cDisadvantages', data.disadvantages);
    set('cFallReason', data.fallReason);
    const cMembers = document.getElementById("cMembers");
    if (cMembers) {
      cMembers.innerHTML = "";
      data.members.forEach(m => {
        const li = document.createElement("li");
        li.innerText = m;
        cMembers.appendChild(li);
      });
    }
  }

  
  /* ─── ENHANCED 3D STATS & SCRAMBLE COUNTER ──────── */
  document.querySelectorAll('.stat-item').forEach(card => {
    
    let isRevealed = false;
    
    // Magnetic 3D Tilt Hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * -12; // tilt degrees
      const tiltY = ((x - cx) / cx) * 12;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.transition = 'transform 0.35s cubic-bezier(0.2, 1, 0.2, 1)';
      card.style.zIndex = 10;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 1.0s cubic-bezier(0.2, 1, 0.2, 1)';
      card.style.zIndex = 1;
    });

    // Scramble Data Counter
    const numEl = card.querySelector('.stat-num');
    if (!numEl) return;
    const targetStr = numEl.dataset.target;
    const targetVal = parseFloat(targetStr);
    const suffix = numEl.dataset.suffix || '';
    
    if (isNaN(targetVal)) return; // Exclude infinity symbols

    numEl.textContent = '0' + suffix;

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isRevealed) {
        isRevealed = true;
        let count = 0;
        let frame = 0;
        
        const animate = () => {
          frame++;
          // Cyberpunk scramble phase
          if (frame < 40) {
             numEl.textContent = Math.floor(Math.random() * targetVal * 2) + suffix;
             requestAnimationFrame(animate);
             return;
          }
          
          // Exponential ease out phase
          count += (targetVal - count) * 0.03; 
          if (targetVal - count < 0.5) {
            numEl.textContent = targetVal + suffix;
            numEl.style.textShadow = '0 0 15px rgba(255,255,255,0.8)';
            numEl.style.transition = 'text-shadow 1.4s ease-out';
            setTimeout(() => numEl.style.textShadow = 'none', 350);
          } else {
            numEl.textContent = Math.ceil(count) + suffix;
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
        obs.unobserve(card);
      }
    });
    obs.observe(card);
  });


  
  /* ─── GLOBAL MOUSE TRACKING FOR BACKGROUND ─────── */
  window.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
  });
  /* ─── SCROLL HERO SEQUENCE ─────────────────────── */
  const scrollWrapper = document.querySelector('.scroll-hero-wrapper');
  const heroText = document.querySelector('.hero-text-content');
  const heroImg = document.querySelector('.hero-image-content');
  
  if (scrollWrapper && heroText && heroImg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const windowHeight = window.innerHeight;
      
      let progress = y / (windowHeight * 0.25);
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      const isMobile = window.innerWidth <= 700;
      
      if (isMobile) {
         const moveY = progress * -35;
         const textScale = 1 - (progress * 0.20); // texts shrink slightly on mobile
         heroText.style.transform = `translateY(${moveY}vh) scale(${textScale})`;
         
         heroImg.style.opacity = progress;
         const imgY = 100 * (1 - progress); 
         const imgScale = 0.9 + (0.1 * progress);
         heroImg.style.transform = `translateY(${imgY}px) scale(${imgScale})`;
      } else {
         const moveX = progress * -24; // text center moves to ~26vw left
         const textScale = 1 - (progress * 0.45); // texts shrink to 55% to fit perfectly side-by-side
         heroText.style.transform = `translateX(${moveX}vw) scale(${textScale})`;
         
         heroImg.style.opacity = progress;
         const imgX = 100 * (1 - progress); 
         const imgScale = 0.9 + (0.1 * progress);
         heroImg.style.transform = `translateY(-50%) translateX(${imgX}px) scale(${imgScale})`;
      }
    }, { passive: true });
  }





  /* ─── CANDIDS GALLERY ────────────────────────────── */
  const candidsGallery = document.getElementById("candidsGallery");
  if (candidsGallery) {
    candidsGallery.innerHTML = '';
    const candidImgs = [
    "WhatsApp Image 2026-04-23 at 6.42.31 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 6.43.20 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.10.25 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.06 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.06 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.27 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.31 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.34 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.35 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.35 PM (2).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.35 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.36 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.36 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.37 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.38 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.38 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.39 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.39 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.40 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.40 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.41 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.42 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.42 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.43 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.43 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.44 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.45 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.45 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.46 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.46 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.47 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.48 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.48 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.49 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.49 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.50 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.51 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.51 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.52 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.52 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.53 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.54 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.54 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.55 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.55 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.56 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.57 PM (1).jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.57 PM.jpeg",
    "WhatsApp Image 2026-04-23 at 7.13.58 PM.jpeg"
]
;
    candidImgs.forEach((imgName, index) => {
      const div = document.createElement("div");
      div.className = "image-card reveal";
      const encodedName = encodeURIComponent(imgName);
      div.innerHTML = `<img loading="lazy" src="https://raw.githubusercontent.com/noemaann/Zlu-images/main/zluimages/${encodedName}" alt="Candid ${index + 1}">`;
      candidsGallery.appendChild(div);
      if (typeof revealObs !== 'undefined') {
        revealObs.observe(div);
      }
    });
  }
});