// Medical Beauty Website - Custom JavaScript
// Mobile-first interactivity and enhancements

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add fade-in animation to content sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all major content elements
  document.querySelectorAll('.md-typeset h2, .md-typeset h3, .md-typeset p, .md-typeset blockquote, .qr-contact').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Mobile touch gestures for navigation
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      // Get current page navigation
      const navLinks = document.querySelectorAll('.md-nav__link');
      const currentLink = document.querySelector('.md-nav__link--active');
      
      if (currentLink && navLinks.length > 1) {
        const currentIndex = Array.from(navLinks).indexOf(currentLink);
        
        if (swipeDistance > 0 && currentIndex > 0) {
          // Swipe right - previous page
          navLinks[currentIndex - 1].click();
        } else if (swipeDistance < 0 && currentIndex < navLinks.length - 1) {
          // Swipe left - next page
          navLinks[currentIndex + 1].click();
        }
      }
    }
  }

  // Enhanced mobile menu interaction
  const headerTitle = document.querySelector('.md-header__title');
  if (headerTitle) {
    headerTitle.addEventListener('click', function() {
      // Scroll to top on mobile
      if (window.innerWidth <= 768) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  // Reading progress indicator
  function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(135deg, #f8b5c1, #ec4899);
      z-index: 1000;
      transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', function() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  createProgressBar();

  // Mobile-friendly table scrolling
  document.querySelectorAll('table').forEach(table => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      overflow-x: auto;
      margin: 1rem 0;
      border-radius: 8px;
      box-shadow: 0 2px 15px rgba(107, 70, 193, 0.1);
    `;
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  // Copy link functionality for headers
  document.querySelectorAll('.md-typeset h1, .md-typeset h2, .md-typeset h3').forEach(header => {
    if (header.id) {
      header.style.cursor = 'pointer';
      header.title = '点击复制链接';
      
      header.addEventListener('click', function() {
        const url = window.location.origin + window.location.pathname + '#' + this.id;
        
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            showCopyNotification();
          });
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          showCopyNotification();
        }
      });
    }
  });

  function showCopyNotification() {
    const notification = document.createElement('div');
    notification.textContent = '链接已复制到剪贴板';
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #6b46c1;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      z-index: 10000;
      font-size: 0.9rem;
      box-shadow: 0 4px 20px rgba(107, 70, 193, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }

  // Image lazy loading and optimization
  document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
    
    // Add error handling
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
    
    // Add loading placeholder
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      this.style.transition = 'opacity 0.3s ease';
    });
    
    img.style.opacity = '0';
  });

  console.log('美丽心灵地图网站已加载完成 ✨');
});