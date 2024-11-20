// assets/js/modules/galleryshortcode/gallery-lazyload.js
'use strict';

export const initGalleryLazyLoad = () => {
    const lazyImages = document.querySelectorAll("img.lazy-load");

    const loadImage = (img) => {
        img.src = img.dataset.src;
        img.classList.remove("lazy-load");
    };

    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        if ("requestIdleCallback" in window) {
            requestIdleCallback(() => {
                lazyImages.forEach(img => imageObserver.observe(img));
            });
        } else {
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    } else {
        lazyImages.forEach(loadImage);
    }
};

export const initGalleryModal = () => {
    const galleryContainer = document.querySelector('.gallery-container');

    if (galleryContainer) {
        galleryContainer.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                const originalImageSrc = item.querySelector('.thumbnail-img').dataset.original;
                openModal(originalImageSrc);
            }
        });
    }
};

const openModal = (src) => {
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" aria-label="Close Modal">&times;</button>
            <img src="${src}" alt="Gallery Image" class="modal-img">
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
};

const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const handleMutations = debounce((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            if (document.querySelector('.gallery-container')) {
                initGalleryLazyLoad();
                initGalleryModal();
            }
        }
    });
}, 200);

const observer = new MutationObserver(handleMutations);

export const initGallery = () => {
    if (document.querySelector('.gallery-container')) {
        initGalleryLazyLoad();
        initGalleryModal();
    }
};

document.addEventListener('DOMContentLoaded', initGallery);

observer.observe(document.body, {
    childList: true,
    subtree: true
});
