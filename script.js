
let whatWedo_links = document.querySelectorAll('.what-we-do a');

let podCards = document.querySelectorAll('.podcast-card');

podCards.forEach(card => {
    let tagLabel = card.querySelector('.tag-label').textContent;
    let linkTag = card.querySelector('.tag')
    let episodeNumber = card.querySelector('.episode-number').textContent;
    // console.log(tagLabel);
    // console.log(linkTag);
    // console.log(episodeNumber);
    linkTag.setAttribute('aria-label', tagLabel + ' ' + episodeNumber + ' ' + linkTag.textContent);
});

whatWedo_links.forEach(link => {
    link.setAttribute('aria-label', 'Learn more about ' + link.textContent);
});

document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    let currentIndex = Math.floor(sliderItems.length / 2);
    const visibleItems = 5;

    // Function to update visible slides
    function updateVisibleSlides(activeIndex) {
        // Hide all items first
        sliderItems.forEach(item => {
            item.classList.remove('visible', 'active');
            item.style.order = '0';
        });

        // Calculate which items should be visible
        let visibleIndexes = [];
        for (let i = -2; i <= 2; i++) {
            let index = activeIndex + i;
            // Handle circular navigation
            if (index < 0) index = sliderItems.length + index;
            if (index >= sliderItems.length) index = index - sliderItems.length;
            visibleIndexes.push(index);
        }

        // Show visible items and set their order
        visibleIndexes.forEach((index, orderIndex) => {
            sliderItems[index].classList.add('visible');
            sliderItems[index].style.order = orderIndex;
            if (index === activeIndex) {
                sliderItems[index].classList.add('active');
            }
        });
    }

    // Function to update active slide
    function updateActiveSlide(newIndex) {
        // Update featured image
        const featuredImage = document.getElementById('featured-image');
        featuredImage.src = sliderItems[newIndex].dataset.image;

        // Update current index and visible slides
        currentIndex = newIndex;
        updateVisibleSlides(currentIndex);
    }

    // Previous button click handler
    prevButton.addEventListener('click', () => {
        const newIndex = currentIndex === 0 ? sliderItems.length - 1 : currentIndex - 1;
        updateActiveSlide(newIndex);
    });

    // Next button click handler
    nextButton.addEventListener('click', () => {
        const newIndex = currentIndex === sliderItems.length - 1 ? 0 : currentIndex + 1;
        updateActiveSlide(newIndex);
    });

    // Click handler for individual slider items
    sliderItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateActiveSlide(index);
        });
    });

    // Initialize slider
    updateActiveSlide(currentIndex);
});

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.insights-slider');
    const cards = document.querySelectorAll('.insight-card');
    const prevButton = document.querySelector('.insights-nav .prev');
    const nextButton = document.querySelector('.insights-nav .next');

    let currentIndex = 0;
    const cardsPerView = 3.5; // 3 full cards + 1 half card
    const totalCards = cards.length;
    const maxIndex = Math.max(0, totalCards - Math.floor(cardsPerView));

    function updateSliderPosition() {
        const cardWidth = cards[0].offsetWidth;
        const gapWidth = 32; // 2rem gap
        let offset = currentIndex * (cardWidth + gapWidth);
        slider.style.transform = `translateX(-${offset}px)`;
        updateButtonStates();
    }

    function updateButtonStates() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;

        // Optional: Update button opacity to show disabled state
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    // Initialize
    updateButtonStates();

    // Update on window resize
    window.addEventListener('resize', () => {
        // Reset position when window is resized
        currentIndex = Math.min(currentIndex, maxIndex);
        updateSliderPosition();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize podcasts slider
    const podcastsSlider = document.querySelector('.podcasts-slider');
    const podcastCards = document.querySelectorAll('.podcast-card');
    const podcastPrevButton = document.querySelector('.podcasts-nav .prev');
    const podcastNextButton = document.querySelector('.podcasts-nav .next');

    let podcastCurrentIndex = 0;
    const cardsToMove = 3;
    const totalPodcastCards = podcastCards.length;
    const maxPodcastIndex = Math.max(0, Math.ceil((totalPodcastCards - 3.25) / cardsToMove)) * cardsToMove;

    function updatePodcastSliderPosition() {
        const cardWidth = podcastCards[0].offsetWidth;
        const gapWidth = 32;
        const offset = (podcastCurrentIndex / cardsToMove) * (cardWidth * cardsToMove + gapWidth * (cardsToMove - 1));
        podcastsSlider.style.transform = `translateX(-${offset}px)`;
        updatePodcastButtonStates();
    }

    function updatePodcastButtonStates() {
        podcastPrevButton.disabled = podcastCurrentIndex === 0;
        podcastNextButton.disabled = podcastCurrentIndex >= maxPodcastIndex;

        podcastPrevButton.style.opacity = podcastCurrentIndex === 0 ? '0.5' : '1';
        podcastNextButton.style.opacity = podcastCurrentIndex >= maxPodcastIndex ? '0.5' : '1';
    }

    podcastNextButton.addEventListener('click', () => {
        if (podcastCurrentIndex < maxPodcastIndex) {
            podcastCurrentIndex = Math.min(podcastCurrentIndex + cardsToMove, maxPodcastIndex);
            updatePodcastSliderPosition();
        }
    });

    podcastPrevButton.addEventListener('click', () => {
        if (podcastCurrentIndex > 0) {
            podcastCurrentIndex = Math.max(podcastCurrentIndex - cardsToMove, 0);
            updatePodcastSliderPosition();
        }
    });

    // Initialize
    updatePodcastButtonStates();

    // Update on window resize
    window.addEventListener('resize', () => {
        podcastCurrentIndex = Math.min(podcastCurrentIndex, maxPodcastIndex);
        updatePodcastSliderPosition();
    });
});
