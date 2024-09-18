window.onload = function() {
    const slideImg = document.querySelector('.slide-image');
    const banners = document.querySelectorAll('.banner');
    const bannerBtns = document.querySelectorAll('.banner-btn');
    const slideWidth = banners[0].clientWidth;
    let slideClone = banners[0].cloneNode(true);
    let slideCount = banners.length;
    let currentIdx = 0;

    slideImg.appendChild(slideClone);

    function updateBanner() {
        slideImg.style.transition = 'transform 0.5s';
        slideImg.style.transform = `translateX(-${slideWidth * currentIdx}px)`;

        bannerBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentIdx);
        });
    }

    let slideSetInterval;

    function startSlideShow() {
        if(slideSetInterval) {
            clearInterval(slideSetInterval)
        }

        slideSetInterval = setInterval(() => {

            currentIdx++;
    
            updateBanner();
    
            if (currentIdx === slideCount) {
                bannerBtns[0].classList.add('active');
                setTimeout(() => {
                    slideImg.style.transition = 'none';
                    slideImg.style.transform = 'translateX(0)';
                    currentIdx = 0;
                }, 500);
            }
        }, 3000)
    }

    startSlideShow();

    bannerBtns.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentIdx = idx;
            updateBanner();
            startSlideShow();
        });
    });


    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const menuList = document.querySelector('.menu-list ul');
    const moveWidth = 281;
    const maxStep = 2;
    let step = 0;

    rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        if(maxStep > step) {
            step++;
            rightMove();
        }
    });

    leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        if(step > 0) {
            step--;
            rightMove();
        }
    });

    function rightMove() {
        const position = moveWidth * step;
        menuList.style.transition = 'transform 0.5s';
        menuList.style.transform = `translateX(-${position}px)`;
    }


    const menuItems = document.querySelectorAll('.menu-list li > a');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => e.preventDefault());
    });

    const newsTitles = document.querySelectorAll('.news h3 > a');
    const event = document.querySelector('.event > h3 > a');
    const sns = document.querySelector('.sns > h3 > a');
    const eventContent = document.querySelector('.event > ul');
    const snsContent = document.querySelector('.sns > ul');

    newsTitles.forEach(title => {
        title.addEventListener('click', () => {
            newsTitles.forEach(title => {
                title.classList.remove('selected');
            });
            title.classList.add('selected');
        });
    });

    event.addEventListener('click', (e) => {
        e.preventDefault();
        eventContent.style.display = 'flex';
        snsContent.style.display = 'none';
    });

    sns.addEventListener('click', (e) => {
        e.preventDefault();
        snsContent.style.display = 'flex';
        eventContent.style.display = 'none';
    });
}