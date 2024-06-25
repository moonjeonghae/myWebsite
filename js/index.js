window.onload = function() {
    // const logo = document.querySelector('.logo');
    // const $html = document.querySelector('html');

    // logo.addEventListener('click', () => {
    //     $html.style.scrollTop = 0;
    // });
    // innerWidth 이용해서 모바일만 적용되게 하기 !!!!!!!!!!!!
    var windowWidth = window.innerWidth;

    //====== about me ======
    // ----- aboutme-tab-btn click 시 -----
    // ***** highlight css 적용 *****
    // ***** 해당 내용 나오게 하기 *****


    //====== skill ======
    // ----- [모바일] tabBtn click 시 -----
    if(windowWidth < 768) {
        const skillTabBtn = document.querySelectorAll('.skill-tab-btn button');
        const allBtn = document.querySelector('.skill-tab-btn .all');
        const codingBtn = document.querySelector('.skill-tab-btn .coding');
        const designBtn = document.querySelector('.skill-tab-btn .design');
        const videoBtn = document.querySelector('.skill-tab-btn .video');
        const etcBtn = document.querySelector('.skill-tab-btn .etc');
        const codingIcon = document.querySelectorAll('.icon-box .coding');
        const designIcon = document.querySelectorAll('.icon-box .design');
        const videoIcon = document.querySelector('.icon-box .video');
        const etcIcon = document.querySelector('.icon-box .etc');

        // ***** selected css 적용 *****
        const selectedBtn = (e) => {
            allBtn.classList.remove('selected');
            skillTabBtn.forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
        };

        skillTabBtn.forEach(btn => {
            btn.addEventListener('click', selectedBtn);
        });


        // ***** 해당 icon만 보이게 하기 *****
        allBtn.addEventListener('click', function() {
            codingIcon.forEach(icon => {
                icon.style.display = 'block';
            });
            designIcon.forEach(icon => {
                icon.style.display = 'block';
            });
            videoIcon.style.display = 'block';
            etcIcon.style.display = 'block';
        });

        codingBtn.addEventListener('click', function() {
            codingIcon.forEach(icon => {
                icon.style.display = 'block';
            });
            designIcon.forEach(icon => {
                icon.style.display = 'none';
            });
            videoIcon.style.display = 'none';
            etcIcon.style.display = 'none';
        });

        designBtn.addEventListener('click', function() {
            codingIcon.forEach(icon => {
                icon.style.display = 'none';
            });
            designIcon.forEach(icon => {
                icon.style.display = 'block';
            });
            videoIcon.style.display = 'none';
            etcIcon.style.display = 'none';
        });

        videoBtn.addEventListener('click', function() {
            codingIcon.forEach(icon => {
                icon.style.display = 'none';
            });
            designIcon.forEach(icon => {
                icon.style.display = 'none';
            });
            videoIcon.style.display = 'block';
            etcIcon.style.display = 'none';
        });

        etcBtn.addEventListener('click', function() {
            codingIcon.forEach(icon => {
                icon.style.display = 'none';
            });
            designIcon.forEach(icon => {
                icon.style.display = 'none';
            });
            videoIcon.style.display = 'none';
            etcIcon.style.display = 'block';
        });
    }


    // ----- [모바일] icon graph -----
    if(windowWidth < 768) {
        const donuts = document.querySelectorAll('.icon');
    
        donuts.forEach(donut => {
            const ttlPercent = parseFloat(donut.dataset.deg);
            let final = 0;
            const donutAnimation = setInterval(() => {
                donut.dataset.deg = final;
                donut.style.background = `conic-gradient(#efb1d5 0% ${final}%, #fff ${final}% 100%)`;
    
                final++;
                if (final >= ttlPercent) {
                    clearInterval(donutAnimation);
                }
            }, 10);
        });
    }


    // ----- [모바일] modal -----
    const $body = document.querySelector('body');
    const icons = document.querySelectorAll('.icon-box > .icon');

    if(windowWidth < 768 ) {
        const iconModal = document.querySelectorAll('.skill-desc .skill-desc-txt')
        const skillDesc = document.querySelector('.skill-desc');
        const xBtn = document.querySelector('.x-btn');
    
        // #icon click 시 발생할 함수 만들기
        const showModal = (idx) => {
            skillDesc.style.display = 'block';
            iconModal[idx].style.display = 'block';
            // # scroll 없앨 것이기 때문에 body에 있는 .scroll-stop 추가
            $body.classList.add('scroll-stop');
        }
    
        // # 각 icon에 함수 적용
        icons.forEach((icon, idx) => {
            icon.addEventListener('click', () => showModal(idx))
        })
    
        // X 버튼 누르면 모달이 사라지는 함수 만들기
        const removeModal = () => {
            skillDesc.style.display = 'none';
            iconModal.forEach(modal => modal.style.display = 'none');
            $body.classList.remove('scroll-stop');
        }
    
        // # button에 함수 적용하기
        xBtn.addEventListener('click', removeModal);
    }


    // ----- [PC] icon 배치 -----
    if(windowWidth > 768) {
        const radius = 285;

        const iconArrangement = (idx) => {
            // #각도를 라디안으로 변환
            const angle = (idx / icons.length) * 2 * Math.PI;
            // #(x,y) 좌표 구하기
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            // #계산된 좌표로 각 div 이동하기
            const $icon = icons[idx];
            $icon.style.left = `calc(50% + ${x}px)`;
            $icon.style.top = `calc(50% + ${y}px)`;
        };

        // # 각 icon 박스에 적용시키기
        icons.forEach((icon, idx) => {
            iconArrangement(idx);
        });
    }


    //====== portfolio_title ======

    //====== portfolio_detail ======
    // ----- [모바일] button click 시 -----
    const pfBtn = document.querySelectorAll('.pf-btn button');

    if (windowWidth < 768) {
        // ***** style 적용 *****
        const clickPfBtn = (e) => {
            e.target.style.color = '#fff';
            e.target.style.backgroundColor = '#7b588c';
        };
    
        pfBtn.forEach((btn) => {
            btn.addEventListener('click', clickPfBtn);
        });
    }

    //====== contact ======
    // ----- focus 시 placeholder 없애기 -----
    // const inputs = document.querySelectorAll('input');
    // const textarea = document.querySelector('textarea');

    // inputs.forEach(input => {
    //     input.addEventListener('focus', function() {
    //         this.setAttribute('unvisible', this.setAttribute('visible'));
    //     })
    // })
};
