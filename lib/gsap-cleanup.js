/**
 * Tear down GSAP / ScrollTrigger instances on route change (SPA navigation).
 */
export function cleanupGsapAnimations() {
  if (typeof window === 'undefined') {
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (ScrollTrigger && typeof ScrollTrigger.getAll === 'function') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  if (gsap) {
    if (typeof gsap.killTweensOf === 'function') {
      gsap.killTweensOf('*');
    }
    if (gsap.globalTimeline) {
      gsap.globalTimeline.clear();
    }
  }

  delete window.CampAnimCore;
  delete window.CampGsap;

  document.documentElement.classList.remove('camp-gsap');
  document.querySelectorAll('.navbar').forEach((navbar) => {
    navbar.classList.remove('navbar--ready', 'navbar--scrolled');
  });
}
