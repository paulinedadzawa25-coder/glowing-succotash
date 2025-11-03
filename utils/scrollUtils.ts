export function scrollToElement(elementId: string) {
  // Try multiple times with increasing delays
  let attempts = 0;
  const maxAttempts = 5;
  const initialDelay = 100;

  function tryScroll() {
    const element = document.getElementById(elementId);
    if (element) {
      // Calculate the element's position
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offset = 100; // Adjust this value based on your header height
      const targetPosition = elementPosition - offset;

      // Smoothly scroll to the element
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Additional check to ensure we've reached the correct position
      const checkPosition = () => {
        const currentPosition = window.pageYOffset;
        if (Math.abs(currentPosition - targetPosition) > 2) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      };

      // Check position after animation
      setTimeout(checkPosition, 1000);
      return true;
    }
    
    if (attempts < maxAttempts) {
      attempts++;
      setTimeout(tryScroll, initialDelay * attempts);
      return false;
    }
    
    console.warn(`Could not find element with id: ${elementId}`);
    return false;
  }

  // Add a small delay before first attempt
  setTimeout(tryScroll, 100);
}

export function handleHashNavigation() {
  if (typeof window === 'undefined') return;

  // Check if there's a hash in the URL
  if (window.location.hash) {
    // Remove the # from the hash
    const elementId = window.location.hash.slice(1);
    // Wait for the page to be ready
    setTimeout(() => {
      scrollToElement(elementId);
    }, 500);
  }
}