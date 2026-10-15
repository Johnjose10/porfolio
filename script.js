/**
 * John Jose - DevOps Engineer Portfolio
 * JavaScript Interactions, Validation & Dynamic Features
 */

(function () {
  'use strict';

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. Dynamic Copyright Year
     ========================================================================== */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. Sticky Navbar & Active Navigation Highlighting
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ScrollSpy to highlight active menu item
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* ==========================================================================
     3. Mobile Navigation Drawer Toggle
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function openMobileMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close mobile menu when a nav link is clicked
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (
        mobileDrawer.classList.contains('open') &&
        !mobileDrawer.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     4. Typing Animation for Hero Subtitle
     ========================================================================== */
  const typedRoleElement = document.getElementById('typedRole');
  if (typedRoleElement && !prefersReducedMotion) {
    const roles = [
      'Cloud & Automation Enthusiast',
      'CI/CD Pipeline Specialist',
      'AWS & Docker Practitioner',
      'Infrastructure as Code Explorer',
      'Linux Administration Advocate'
    ];

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = true;
    let typingSpeed = 70;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 75;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        isDeleting = true;
        typingSpeed = 2200;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    // Initial pause before beginning erasure
    setTimeout(typeLoop, 2600);
  }

  /* ==========================================================================
     5. Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade');

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add('revealed'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ==========================================================================
     6. Technical Skills Category Filtering
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Set active tab
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.classList.add('revealed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     7. Back to Top Floating Button
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.pageYOffset > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      },
      { passive: true }
    );

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ==========================================================================
     8. Project Architecture Details Modal
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalBodyContent = document.getElementById('modalBodyContent');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  const projectDetails = {
    project1: {
      title: 'Website Deployment & Automation — Pipeline Architecture',
      content: `
        <div class="modal-flow-box">
          <h4 style="color:#38bdf8; margin-bottom: 0.75rem;"><i class="fa-solid fa-gears"></i> Continuous Deployment Flow</h4>
          <div class="modal-flow-steps">
            <div class="modal-flow-step">
              <span class="step-num">1</span>
              <span><strong>Code Push:</strong> Developer pushes changes to the Bitbucket repository main branch.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">2</span>
              <span><strong>Webhook Trigger:</strong> Jenkins receives repository webhook and starts declarative pipeline.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">3</span>
              <span><strong>Docker Build:</strong> Multi-stage Dockerfile builds and optimizes the application container.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">4</span>
              <span><strong>AWS EC2 Deploy:</strong> Jenkins securely transfers artifacts / deploys via SSH onto the EC2 host.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">5</span>
              <span><strong>Health Verification:</strong> Automated curl checks verify HTTP 200 response on public endpoint.</span>
            </div>
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; color:#f8fafc;">Key Implementation Details:</h4>
          <ul style="list-style: disc; padding-left: 1.5rem; color:#94a3b8; display:flex; flex-direction:column; gap:0.4rem;">
            <li>Zero-downtime container replacement using Docker Compose port bindings.</li>
            <li>Configured AWS Security Groups to limit SSH access to Jenkins runner IP and open ports 80/443 to web traffic.</li>
            <li>Integrated shell script hooks for automated rollback if container health check fails.</li>
          </ul>
        </div>
      `
    },
    project2: {
      title: 'Cyberbullying Detection System — Architecture',
      content: `
        <div class="modal-flow-box">
          <h4 style="color:#c084fc; margin-bottom: 0.75rem;"><i class="fa-solid fa-brain"></i> Machine Learning & NLP Pipeline</h4>
          <div class="modal-flow-steps">
            <div class="modal-flow-step">
              <span class="step-num">1</span>
              <span><strong>Data Preprocessing:</strong> Removal of stop-words, URLs, mentions, emojis, and tokenization.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">2</span>
              <span><strong>Feature Vectorization:</strong> TF-IDF / N-gram representation of social text tokens.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">3</span>
              <span><strong>Classification:</strong> Supervised classification model detecting toxic patterns.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">4</span>
              <span><strong>Containerization:</strong> Packaged ML inference engine inside Docker for cross-platform execution.</span>
            </div>
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; color:#f8fafc;">Engineering Highlights:</h4>
          <ul style="list-style: disc; padding-left: 1.5rem; color:#94a3b8; display:flex; flex-direction:column; gap:0.4rem;">
            <li>Evaluated models based on precision, recall, and F1-score for balanced toxicity detection.</li>
            <li>Implemented modular Python scripts for data ingestion, cleaning, and evaluation.</li>
            <li>Constructed clean container runtime with all Python scientific dependencies isolated.</li>
          </ul>
        </div>
      `
    },
    project3: {
      title: 'Campus Event Management System — Architecture',
      content: `
        <div class="modal-flow-box">
          <h4 style="color:#60a5fa; margin-bottom: 0.75rem;"><i class="fa-solid fa-server"></i> System Architecture</h4>
          <div class="modal-flow-steps">
            <div class="modal-flow-step">
              <span class="step-num">1</span>
              <span><strong>User & Role Management:</strong> Role-based access control for students, faculty, and event organizers.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">2</span>
              <span><strong>Event Life Cycle:</strong> Event creation, proposal review, venue scheduling, and attendee registration.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">3</span>
              <span><strong>Relational Storage:</strong> Normalized MySQL schema ensuring ACID compliance for bookings.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">4</span>
              <span><strong>Containerized Stack:</strong> Docker Compose coordinating web server and database containers.</span>
            </div>
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 0.5rem; color:#f8fafc;">Operational Focus:</h4>
          <ul style="list-style: disc; padding-left: 1.5rem; color:#94a3b8; display:flex; flex-direction:column; gap:0.4rem;">
            <li>Eliminated manual registration bottlenecks during major campus seminars and cultural programs.</li>
            <li>Integrated database connection pooling and schema migrations for predictable rollouts.</li>
          </ul>
        </div>
      `
    },
    project4: {
      title: 'OMS Application DevOps Deployment — Planned Architecture',
      content: `
        <div class="modal-flow-box">
          <h4 style="color:#fbbf24; margin-bottom: 0.75rem;"><i class="fa-solid fa-compass-drafting"></i> Future Deployment Blueprint</h4>
          <div class="modal-flow-steps">
            <div class="modal-flow-step">
              <span class="step-num">1</span>
              <span><strong>Microservice Topology:</strong> Order intake, inventory lookup, and payment notifications isolated as services.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">2</span>
              <span><strong>Container Orchestration:</strong> Kubernetes Deployment and Service manifests with rolling update strategy.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">3</span>
              <span><strong>CI/CD Stages:</strong> Automated unit testing, container vulnerability scanning, and Canary deployments.</span>
            </div>
            <div class="modal-flow-step">
              <span class="step-num">4</span>
              <span><strong>IaC with Terraform:</strong> Automated provisioning of AWS VPC, EKS/EC2 compute, and RDS databases.</span>
            </div>
          </div>
        </div>
        <p style="color:#94a3b8; font-size:0.88rem; margin-top:0.75rem;">
          <i class="fa-solid fa-circle-info text-amber"></i> <em>Note:</em> This is a planned enterprise architecture project actively being engineered as a demonstration of production-grade microservices deployment.
        </p>
      `
    }
  };

  let lastActiveTrigger = null;

  function openModal(projectId, triggerBtn) {
    const details = projectDetails[projectId];
    if (!details) return;

    lastActiveTrigger = triggerBtn;
    modalTitle.textContent = details.title;
    modalBodyContent.innerHTML = details.content;
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closeModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveTrigger) {
      lastActiveTrigger.focus();
    }
  }

  modalTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId, btn);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     9. Clipboard Copy Utility with Toast Notification
     ========================================================================== */
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotification) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showToast(`Copied "${textToCopy}" to clipboard!`);
          })
          .catch(() => {
            fallbackCopy(textToCopy);
          });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Copied "${text}" to clipboard!`);
    } catch (err) {
      showToast('Could not copy automatically. Please copy manually.');
    }
    document.body.removeChild(tempInput);
  }

  /* ==========================================================================
     10. Contact Form Validation & Submission Handling
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const subjectInput = document.getElementById('userSubject');
  const messageInput = document.getElementById('userMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  const submitBtn = document.getElementById('submitBtn');
  const btnIcon = document.getElementById('btnIcon');
  const btnText = document.getElementById('btnText');
  const formFeedback = document.getElementById('formFeedback');

  // Email format regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input, errorElement, ruleFn, errorMsg) {
    const value = input.value.trim();
    if (!ruleFn(value)) {
      input.classList.add('input-error');
      errorElement.textContent = errorMsg;
      return false;
    } else {
      input.classList.remove('input-error');
      errorElement.textContent = '';
      return true;
    }
  }

  function validateName() {
    return validateField(
      nameInput,
      nameError,
      (val) => val.length >= 2,
      'Please enter your name (at least 2 characters).'
    );
  }

  function validateEmail() {
    return validateField(
      emailInput,
      emailError,
      (val) => emailRegex.test(val),
      'Please enter a valid email address (e.g. user@domain.com).'
    );
  }

  function validateSubject() {
    return validateField(
      subjectInput,
      subjectError,
      (val) => val.length >= 3,
      'Please enter a subject (at least 3 characters).'
    );
  }

  function validateMessage() {
    return validateField(
      messageInput,
      messageError,
      (val) => val.length >= 10,
      'Please enter a message (at least 10 characters).'
    );
  }

  if (contactForm) {
    // Real-time validation on blur & input
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('input-error')) validateName();
    });

    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('input-error')) validateEmail();
    });

    subjectInput.addEventListener('blur', validateSubject);
    subjectInput.addEventListener('input', () => {
      if (subjectInput.classList.contains('input-error')) validateSubject();
    });

    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', () => {
      if (messageInput.classList.contains('input-error')) validateMessage();
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please correct the highlighted errors before submitting.';
        return;
      }

      // Simulate sending state
      submitBtn.disabled = true;
      btnIcon.className = 'fa-solid fa-spinner fa-spin';
      btnText.textContent = 'Validating & Packaging...';
      formFeedback.style.display = 'none';

      setTimeout(() => {
        submitBtn.disabled = false;
        btnIcon.className = 'fa-solid fa-paper-plane';
        btnText.textContent = 'Send Message';

        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Form validated successfully!</strong><br>
          Thank you, <em>${escapeHtml(nameInput.value.trim())}</em>. Your message has been processed locally.<br>
          <small style="opacity:0.9;">To transmit messages to an active mailbox, configure this form with Formspree, EmailJS, or an AWS SES endpoint.</small>
        `;

        contactForm.reset();
      }, 900);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
})();
