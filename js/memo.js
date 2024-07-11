const effortBtn = document.querySelector('.effort-btn');
    const strengthBtn = document.querySelector('.strength-btn');
    const goalBtn = document.querySelector('.goal-btn');
    const historyBtn = document.querySelector('.history-btn');
    const aboutmeContents = document.querySelectorAll('.aboutme-content-txt');
    const effortTxt = document.querySelector('.effort');
    const strengthTxt = document.querySelector('.strength');
    const goalTxt = document.querySelector('.goal');
    const historyTxt = document.querySelector('.history');


    // #초기화 상태 => effort
    const initializeEffortBtn = () => {
        // #모든 aboutmeContents 숨기기
        aboutmeContents.forEach(content => {
            content.style.display = 'none';
        });

        // #effortTxt 보이도록 설정
        effortTxt.style.display = 'block';

        // #모든 버튼에서 'selected' 클래스 제거
        aboutBtns.forEach(btn => {
            btn.classList.remove('selected');
        });

        // #effortBtn에 'selected' 클래스 추가
        effortBtn.classList.add('selected');
    };

    
    const observerAboutMe = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    initializeEffortBtn();
                }, 2000);
            } else {
                aboutmeContents.forEach(content => {
                    content.style.display = 'none';
                });
            }
        });
    });