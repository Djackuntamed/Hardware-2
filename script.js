const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      const firstLink = menu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();
    }
  });
}

const jingle = document.getElementById('jingle');
function playJingleOnce() {
  if (!jingle) return;
  
  const playOnInteract = () => {
    const p = jingle.play();
    if (p && typeof p.then === 'function') {
      p.catch((err) => {
        console.warn('Audio playback blocked:', err.message);
      });
    }
    document.removeEventListener('click', playOnInteract);
    document.removeEventListener('keydown', playOnInteract);
  };
  
  document.addEventListener('click', playOnInteract, { once: true });
  document.addEventListener('keydown', playOnInteract, { once: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', playJingleOnce);
} else {
  playJingleOnce();
}

// Slideshow for in-stock products
function initSlideshow() {
  const posterImg = document.getElementById('catalogue-slideshow');
  if (!posterImg) return;

  let currentIndex = 0;
  let autoPlayInterval;
  let instockImages = [];

  function loadInstockImages() {
    // Get items from localStorage
    const items = JSON.parse(localStorage.getItem('tjv-instock-items')) || [];
    
    if (items.length === 0) {
      // Fallback to static catalogue if no in-stock items
      instockImages = [
        { src: 'images/1.jpg', alt: 'TJV Hardware catalogue page 1', name: 'Building Materials Catalogue' },
        { src: 'images/2.jpg', alt: 'TJV Hardware catalogue page 2', name: 'Construction Supplies' },
        { src: 'images/3.jpg', alt: 'TJV Hardware catalogue page 3', name: 'Hardware Tools' },
        { src: 'images/4.jpg', alt: 'TJV Hardware catalogue page 4', name: 'Finishing Materials' },
        { src: 'images/5.jpg', alt: 'TJV Hardware catalogue page 5', name: 'Plumbing Supplies' },
        { src: 'images/6.jpg', alt: 'TJV Hardware catalogue page 6', name: 'Electrical Items' },
        { src: 'images/7.jpg', alt: 'TJV Hardware catalogue page 7', name: 'Paint & Coating' },
        { src: 'images/8.jpg', alt: 'TJV Hardware catalogue page 8', name: 'Site Equipment' },
        { src: 'images/9.jpg', alt: 'TJV Hardware catalogue page 9', name: 'Professional Tools' }
      ];
    } else {
      // Use in-stock items for slideshow
      instockImages = items.map(item => ({
        src: item.image,
        alt: `${item.name} - ${item.category}`,
        name: item.name,
        category: item.category,
        price: `UGX ${parseInt(item.price).toLocaleString()}/unit`,
        promo: item.promo || ''
      }));
    }
  }

  function showImage(index) {
    if (instockImages.length === 0) return;
    
    currentIndex = (index + instockImages.length) % instockImages.length;
    const currentImage = instockImages[currentIndex];
    
    posterImg.src = currentImage.src;
    posterImg.alt = currentImage.alt;
    
    // Update slide counter
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    if (currentSlideEl) currentSlideEl.textContent = currentIndex + 1;
    if (totalSlidesEl) totalSlidesEl.textContent = instockImages.length;
    
    // Update or create product info overlay for in-stock items
    updateProductOverlay(currentImage);
  }
  
  function updateProductOverlay(imageData) {
    let overlay = document.querySelector('.product-info-overlay');
    const slideFrame = document.querySelector('.slideshow-frame');
    
    if (!slideFrame) return;
    
    // Remove existing overlay
    if (overlay) {
      overlay.remove();
    }
    
    // Only show overlay for actual products (not catalogue pages)
    if (imageData.category && imageData.price) {
      overlay = document.createElement('div');
      overlay.className = 'product-info-overlay';
      overlay.innerHTML = `
        <div class="product-info-name">${imageData.name}</div>
        <div class="product-info-category">${imageData.category}</div>
        <div class="product-info-price">${imageData.price}</div>
      `;
      slideFrame.appendChild(overlay);
    }

    // Promo sticker: always visible, top-right corner of image
    let existingPromo = slideFrame.querySelector('.slideshow-promo-sticker');
    if (existingPromo) existingPromo.remove();
    if (imageData.promo) {
      const promoEl = document.createElement('div');
      promoEl.className = 'slideshow-promo-sticker';
      promoEl.textContent = imageData.promo;
      slideFrame.appendChild(promoEl);
    }
  }

  function nextSlide() {
    showImage(currentIndex + 1);
    resetAutoPlay();
  }

  function prevSlide() {
    showImage(currentIndex - 1);
    resetAutoPlay();
  }

  function autoPlay() {
    nextSlide();
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(autoPlay, 2500); // Slower for product viewing
  }

  // Initialize slideshow
  function initializeSlideshow() {
    loadInstockImages();
    
    if (instockImages.length > 0) {
      showImage(0);
      // Only start auto-play if there are multiple images
      if (instockImages.length > 1) {
        autoPlayInterval = setInterval(autoPlay, 2500);
      }
    }

    // Button listeners
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  }

  // Public function to refresh slideshow when products are updated
  window.refreshSlideshow = function() {
    clearInterval(autoPlayInterval);
    initializeSlideshow();
  };

  initializeSlideshow();
}

// Load in-stock items
function loadInStockItems(refreshSlideshowAfter = false) {
  const itemsContainer = document.getElementById('instock-items');
  const noItemsMsg = document.getElementById('no-items-message');
  
  if (!itemsContainer) return;

  // Get items from localStorage (populated by admin panel)
  const items = JSON.parse(localStorage.getItem('tjv-instock-items')) || [];

  if (items.length === 0) {
    itemsContainer.style.display = 'none';
    noItemsMsg.style.display = 'block';
  } else {
    itemsContainer.style.display = 'grid';
    noItemsMsg.style.display = 'none';
    itemsContainer.innerHTML = '';

    items.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'instock-item';
      itemEl.innerHTML = `
        <div class="instock-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="instock-item-content">
          <div class="instock-item-name">${item.name}</div>
          <div class="instock-item-category">${item.category}</div>
          <div class="instock-item-price">UGX ${parseInt(item.price).toLocaleString()} per unit</div>
        </div>
        ${item.promo ? `<div class="promo-badge">${item.promo}</div>` : ''}
      `;
      itemsContainer.appendChild(itemEl);
    });
  }

  // Only refresh slideshow if explicitly requested (e.g. dynamic admin update)
  if (refreshSlideshowAfter && window.refreshSlideshow) {
    window.refreshSlideshow();
  }
}

// Secret admin access toggle
let clickCount = 0;
let clickTimer = null;

function toggleAdminAccess() {
  console.log('Admin trigger clicked!', clickCount + 1); // Debug log
  clickCount++;
  
  // Clear existing timer
  if (clickTimer) {
    clearTimeout(clickTimer);
  }
  
  // Set new timer - reset click count after 2 seconds
  clickTimer = setTimeout(() => {
    clickCount = 0;
  }, 2000);
  
  // Require 3 clicks within 2 seconds to go directly to admin
  if (clickCount >= 3) {
    // Show brief notification
    showAdminAccessMessage();
    
    // Navigate directly to admin panel after short delay
    setTimeout(() => {
      window.location.href = 'admin.html';
    }, 800); // 800ms delay to show the message
  }
}

// Make toggleAdminAccess globally accessible
window.toggleAdminAccess = toggleAdminAccess;

function showAdminAccessMessage() {
  // Create temporary message
  const message = document.createElement('div');
  message.textContent = 'Redirecting to admin panel...';
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--gold);
    color: var(--navy);
    padding: 15px 25px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(message);
  
  // Animate in
  setTimeout(() => {
    message.style.opacity = '1';
  }, 10);
  
  // Remove after navigation
  setTimeout(() => {
    if (document.body.contains(message)) {
      document.body.removeChild(message);
    }
  }, 1000);
}

// Initialize everything
function initializeApp() {
  initSlideshow();
  loadInStockItems(false);
  
  const secretTrigger = document.querySelector('.secret-trigger');
  if (secretTrigger) {
    secretTrigger.addEventListener('click', toggleAdminAccess);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
