window.onload = function() {



    //====== skill ======
    // ----- 모바일 skill btn -----
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


    // ----- 모바일 modal -----

    // innerWidth 이용해서 모바일만 적용되게 하기 !!!!!!!!!!!!
    var windowWidth = window.innerWidth;

    if(windowWidth < 768 ) {
        const $body = document.querySelector('body');
        const iconClick = document.querySelectorAll('.icon-box > .icon');
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
        iconClick.forEach((icon, idx) => {
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
};
