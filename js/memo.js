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





    function draw(){
                            
        var ctx = document.getElementById('myCanvas1').getContext("2d");
                            
        var grad1 = ctx.createLinearGradient(0, 0, 100, 130);
        grad1.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad1.addColorStop(1, 'rgba(158, 110, 151, 0.7)');

        ctx.strokeStyle = grad1;
        ctx.lineWidt = 1;
        ctx.stroke(); 
        var startAngle = (Math.PI/180) * 0; 
        var endAngle = (Math.PI/180) * 275; 
        var currentAngle = startAngle; 

        function animate() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();

            ctx.arc(130, 130, 180, startAngle, currentAngle, false);
            ctx.stroke();

            currentAngle += (Math.PI / 180) * 2;

            if (currentAngle <= endAngle) {
                requestAnimationFrame(animate);
            }
        }
        
        
    }
    draw();


    function pfDraw(){
        var ctx = document.getElementById('pf-canvas').getContext("2d");

        var pfGrad = ctx.createLinearGradient(0, 0, 300, 250);
        pfGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        pfGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
        pfGrad.addColorStop(1, 'rgba(255, 255, 255, 0.7)');

        ctx.strokeStyle = pfGrad;
        ctx.lineWidth = 1;
        ctx.stroke(); 

        if (windowWidth < 768 ) {
            var startAngle = (Math.PI / 180) * 90; 
        } else {
            var startAngle = (Math.PI / 180) * 60; 
        }
        var endAngle = (Math.PI / 180) * 360; 
        var currentAngle = startAngle; 

        function animate() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();

            ctx.arc(325, 325, 325, startAngle, currentAngle, false);
            ctx.stroke();

            currentAngle += (Math.PI / 180) * 4;

            if (currentAngle <= endAngle) {
                requestAnimationFrame(animate);
            }
        }

        const observerPortfolio = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    animate();
                } 
            });
        });
        
        const portfolio = document.querySelector('.portfolio-title');
        observerPortfolio.observe(portfolio);
    }
    pfDraw();

    const observerStarlight = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            var target = entry.target;

            if(entry.isIntersecting) {
                if(target.classList.contains('starlight')) {
                    target.classList.add('starlight-show');
                } else if (target.classList.contains('small-starlight')) {
                    target.classList.add('small-starlight-show');
                }
            }
        });
    });

    if (starlight) {
        observerStarlight.observe(starlight);
      }
      
      if (smallStarlight) {
        observerStarlight.observe(smallStarlight);
      }

    // skill 부분 아래 보이는 것처럼 수정하기
    // 버튼과 그에 대한 아이콘들을 객체로 정의
    const buttonMappings = {
        allBtn: { show: ['coding', 'design', 'video', 'etc'] },
        codingBtn: { show: ['coding'], hide: ['design', 'video', 'etc'] },
        designBtn: { show: ['design'], hide: ['coding', 'video', 'etc'] },
        videoBtn: { show: ['video'], hide: ['coding', 'design', 'etc'] },
        etcBtn: { show: ['etc'], hide: ['coding', 'design', 'video'] }
    };

    // 클릭 이벤트 핸들러 함수
    function handleButtonClick(btnId) {
        const { show, hide } = buttonMappings[btnId];

        // 모든 아이콘 숨기기
        hideIcons();

        // 보여질 아이콘들 보이기
        showIcons(show);

        // donut graph 실행
        donuts.forEach(donut => {
            donutAnimation(donut);
        });
    }

    // 모든 아이콘 숨기는 함수
    function hideIcons() {
        codingIcon.forEach(icon => { icon.style.display = 'none'; });
        designIcon.forEach(icon => { icon.style.display = 'none'; });
        videoIcon.style.display = 'none';
        etcIcon.style.display = 'none';
    }

    // 특정 타입의 아이콘들 보이는 함수
    function showIcons(types) {
        types.forEach(type => {
            switch (type) {
                case 'coding':
                    codingIcon.forEach(icon => { icon.style.display = 'block'; });
                    break;
                case 'design':
                    designIcon.forEach(icon => { icon.style.display = 'block'; });
                    break;
                case 'video':
                    videoIcon.style.display = 'block';
                    break;
                case 'etc':
                    etcIcon.style.display = 'block';
                    break;
                default:
                    break;
            }
        });
    }

    // 각 버튼에 클릭 이벤트 리스너 등록
    Object.keys(buttonMappings).forEach(btnId => {
        const btn = document.getElementById(btnId);
        btn.addEventListener('click', () => {
            handleButtonClick(btnId);
        });
    });


    