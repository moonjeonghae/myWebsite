 // ----- [공통] 화면에 보일 때 txt 애니메이션 실행되게 하기 -----
 const observerTyping = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const target = entry.target;

        if (entry.isIntersecting) {
            target.classList.add('pf-active');
        }  else {
            target.classList.remove('pf-active');
        }
    });
});

const texts = document.querySelectorAll('.pf-txt');
texts.forEach(txt => {
    observerTyping.observe(txt);
});

const jobObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const target = entry.target;

        if(entry.isIntersecting && isTypingJob) {
            setTimeout (() => {
                isTypingJob = true;
                jobTypingBox.innerText = '';
                tyIntJob = setInterval(typeTextJob, 100);
            },200);
        }
    });
});

jobObserver.observe(jobTypingBox);

const nameObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting && !isTypingName) {
            typingIdxName = 0;
            nameTypingBox.innerText = '';
            
            setTimeout (() => {
                isTypingName = true;
                tyIntName = setInterval(typeTextName, 100);
            },1100);
        }
    });
});

nameObserver.observe(nameTypingBox);


    // setTimeout(() => {
    //     if (isTypingName == false) {
    //         isTypingName = true;
    //         tyIntName = setInterval(typeTextName, 100);
    //     }
    // }, 1100);
    const highlight = document.querySelector('.highight');

    const bracketObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                setTimeout(() => {
                    highlight.classList.add('highlight-visible');
                }, 500)
            } else {
                highlight.classList.remove('highlight-visible');
            }
        });
    });
    
    bracketObserver.observe(highlight);




    
    const aboutBtns = document.querySelectorAll('.aboutme-tab-btn button');

    function aboutBtnAnimation() {
        aboutBtns.forEach((btn, idx) => {
            setTimeout(() => {
                btn.classList.add('show');
            }, idx * 100)
        });
    }
    const ObserverAboutBtns = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                setTimeout(() => {
                    aboutBtnAnimation();
                }, 1500);
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    aboutBtns.forEach(btn => {
        ObserverAboutBtns.observe(btn);
    }); 