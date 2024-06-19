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
    const $body = document.querySelector('body');
    const htmlClick = document.querySelector('.icon-box > .html');
    const htmlModal = document.querySelector('.skill-desc .html')
    const skillDesc = document.querySelector('.skill-desc');
    const xBtn = document.querySelector('.x-btn');
    // # icon click 시
    htmlClick.addEventListener('click', () => {
        // # click한 icon과 관련 있는 skill-desc-txt가 뜸
        skillDesc.style.display = 'block';
        htmlModal.style.display = 'block';
        // # scroll 없앨 것이기 때문에 body에 있는 .scroll-stop 추가
        $body.classList.add('scroll-stop');
    });
    // X 버튼 누르면 모달이 사라짐
    xBtn.addEventListener('click', () => {
        skillDesc.style.display = 'none';
        htmlModal.style.display = 'none';
        $body.classList.remove('scroll-stop');
    });
};
