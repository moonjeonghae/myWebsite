window.onload = function() {
    const slideImg = document.querySelector('.slide-image');
    const banner = document.querySelectorAll('.banner');
    const slideWidth = banner[0].clientWidth;
    let slideClone = banner[0].cloneNode(true);
    let slideCount = banner.length;
    let currentIdx = 0;

    slideImg.appendChild(slideClone);

    setInterval(() => {
        currentIdx++;

        slideImg.style.transition = 'transform 0.5s';
        slideImg.style.transform = `translateX(-${slideWidth * currentIdx}px)`;

        if (currentIdx === slideCount) {
            setTimeout(() => {
                slideImg.style.transition = 'none';
                slideImg.style.transform = 'translateX(0)';
                currentIdx = 0;
            }, 500);
        }
    }, 3000)
}