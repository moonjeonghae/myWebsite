window.onload = function() {
    // innerWidth 이용해서 모바일만 적용되게 하기 !!!!!!!!!!!!
    var windowWidth = window.innerWidth;

    // ++++++++++++++++++ header ++++++++++++++++++
    // ----- logo click 시 첫 화면 나오게 하기 -----
    const logo = document.querySelector('.logo');
    
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ----- [PC] 선택된 gnb에 효과 적용하기 -----
    const gnbs = document.querySelectorAll('.gnb a');
    const homeGnb = document.querySelector('.gnb a:first-child');
    
    if(windowWidth >= 768) {
        const selectedGnb = (e) =>  {
                gnbs.forEach(a => a.classList.remove('gnb-selected'));
                e.target.classList.add('gnb-selected');
        };
        
        // #초기값으로 homeGnb 선택
        selectedGnb({ target: homeGnb });
    
        gnbs.forEach(gnb => {
            gnb.addEventListener('click', selectedGnb);
        });


        // ----- [PC] 각 section에 맞는 gnb에 효과 적용하기 -----
        const sections = document.querySelectorAll('section');

        // #각 섹션에 offsetTop 값을 저장할 배열 변수로 지정하기
        const sectionOffsets = [];

        // #각 섹션에 offsetTop 값 구하기
        sections.forEach(section => {
            sectionOffsets.push(section.offsetTop);
        });

        // #현재 스크롤 위치에 따라 gnb에 효과 적용하기
        const activeGnb = () => {
            const scrollPos = window.scrollY + window.innerHeight / 2;

            sections.forEach((section, idx) => {
                const sectionTop = sectionOffsets[idx];
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    gnbs.forEach(a => a.classList.remove('gnb-selected'));
                    gnbs[idx].classList.add('gnb-selected');
                }
            });
        };

        // #초기값 설정
        activeGnb();

        window.addEventListener('scroll', activeGnb);
    }

    // ----- [PC] gnb click 시 해당 section으로 부드럽게 스크롤 -----
    const sections = document.querySelectorAll('section');

    // #각 섹션에 offsetTop 값을 저장할 배열 변수로 지정하기
    const sectionOffsets = [];

    // #각 섹션에 offsetTop 값 구하기
    sections.forEach(section => {
        sectionOffsets.push(section.offsetTop);
    });

    gnbs.forEach((gnb, idx) => {
        gnb.addEventListener('click', (e) => {
            e.preventDefault();
            sections[idx].scrollIntoView({ behavior: 'smooth' }); 
        });
    });

    // ----- [모바일] 햄버거 메뉴 -----
    if (windowWidth < 768) {
        const $body = document.querySelector('body');
        const menuBar = document.querySelector('.mobile-menu-bar');
        const bars = document.querySelectorAll('.bar');
        const gnb = document.querySelector('.gnb');
        const gnbA = document.querySelectorAll('.gnb a');


        menuBar.addEventListener('click', () => {
            bars.forEach(bar => {
                bar.classList.toggle('active');
            });

            gnb.classList.toggle('menu-visible');
            $body.classList.toggle('scroll-stop');
        });
        
        // ----- [모바일] gnb click 하면 스크롤 다시 생기게 하기 -----
        gnbA.forEach((a) => {
            a.addEventListener('click', () => {
                bars.forEach(bar => {
                    bar.classList.remove('active');
                });
                gnb.classList.remove('menu-visible');
                $body.classList.remove('scroll-stop');
            })
        })
    } 



    // ++++++++++++++++++ main ++++++++++++++++++
    //====== about me ======
    // ----- [공통] 첫 번째 타이핑 효과 => 웹 개발자 -----
    var isTypingJob = false;
    var typingIdxJob = 0;
    var tyIntJob;
    const jobTypingBox = document.querySelector('.job-typing');
    
    // #typing 할 텍스트 가지고 오기
    var typingTxtJob = document.querySelector('.job').innerText;  
    
    // #텍스트 한글자씩 자르기
    typingTxtJob = typingTxtJob.split(''); 

    // #typing 함수 만들기
    function typeTextJob() {
        if (typingIdxJob < typingTxtJob.length) {
            jobTypingBox.innerText += typingTxtJob[typingIdxJob];
            typingIdxJob++;
        } else {
            clearInterval(tyIntJob);
            isTypingJob = false;
        }
    };

    // #typing이 진행되지 않으면 typing 실행
    const jobObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !isTypingJob) {
                typingIdxJob = 0;
                jobTypingBox.innerText = '';

                setTimeout (() => {
                    isTypingJob = true;
                    tyIntJob = setInterval(typeTextJob, 100);
                }, 100);
            }
        });
    });
    
    jobObserver.observe(jobTypingBox);

    // ----- [공통] bracket 나타나게 하기 -----
    const highlight = document.querySelector('.highlight');

    const bracketObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                setTimeout(() => {
                    highlight.classList.add('highlight-visible');
                }, 400)
            } else {
                highlight.classList.remove('highlight-visible');
            }
        });
    });
    
    bracketObserver.observe(highlight);
    // ----- [공통] 두 번째 타이핑 효과 => 문정해 -----
    var isTypingName = false;
    var typingIdxName = 0;
    var tyIntName; 
    const nameTypingBox = document.querySelector('.name-typing');

    // #typing 할 텍스트 가지고 오기
    var typingTxtName = document.querySelector('.name').innerText;  
    
    // #텍스트 한글자씩 자르기
    typingTxtName = typingTxtName.split(''); 

    // #typing 함수 만들기
    function typeTextName() {
        if (typingIdxName < typingTxtName.length) {
            nameTypingBox.innerText += typingTxtName[typingIdxName];
            typingIdxName++;
        } else {
            clearInterval(tyIntName);
            isTypingName = false;
        }

    };
    
    // #typing이 진행되지 않으면 typing 실행함
    const nameObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !isTypingName) {
                typingIdxName = 0;
                nameTypingBox.innerText = '';
                
                setTimeout (() => {
                    isTypingName = true;
                    tyIntName = setInterval(typeTextName, 100);
                }, 1000);
            }
        });
    });
    
    nameObserver.observe(nameTypingBox);
    


    // ----- [공통] typing 후 aboutme-btn 등장 -----
    const aboutBtns = document.querySelectorAll('.aboutme-tab-btn button');
 
    function aboutBtnAnimation() {
        aboutBtns.forEach((btn, idx) => {
            setTimeout(() => {
                btn.classList.add('show');
            }, idx * 100)
        });
    }
    const observerAboutBtns = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                setTimeout(() => {
                    aboutBtnAnimation();
                }, 1400);
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    aboutBtns.forEach(btn => {
        observerAboutBtns.observe(btn);
    });


    // ----- [공통] typing 후 aboutme-content-box 등장 & aboutme-tab-btn click 시 -----
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

    // #Intersection Observer가 effortBtn을 감시
    observerAboutMe.observe(effortBtn);

    // #각 aboutBtns 버튼에 대한 클릭 이벤트 처리
    aboutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // #모든 버튼에서 'selected' 클래스 제거
            aboutBtns.forEach(btn => {
                btn.classList.remove('selected');
            });

            // #클릭된 버튼에 'selected' 클래스 추가
            e.target.classList.add('selected');

            // #버튼 click 시 txt style
            aboutmeContents.forEach(content => {
                content.style.display = 'none';
            });

            if (e.target === effortBtn) {
                effortTxt.style.display = 'block';
            } else if (e.target === strengthBtn) {
                strengthTxt.style.display = 'block';
            } else if (e.target === goalBtn) {
                goalTxt.style.display = 'block';
            } else if (e.target === historyBtn) {
                historyTxt.style.display = 'block';
            }
        });
    });



    //====== skill ======
    const $body = document.querySelector('body');
    const icons = document.querySelectorAll('.icon-box > .icon');
    const iconModal = document.querySelectorAll('.skill-desc .skill-desc-txt')
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
        // #초기 상태 => allBtn
        const initializeSkillBtn = () => {
            // #모든 btn class 제거 후 allBtn에만 적용
            skillTabBtn.forEach(btn => btn.classList.remove('selected'));
            allBtn.classList.add('selected');

            // #모든 icon 보이게 하기
            codingIcon.forEach(icon => {
                icon.style.display = 'block';
            });
            designIcon.forEach(icon => {
                icon.style.display = 'block';
            });
            videoIcon.style.display = 'block';
            etcIcon.style.display = 'block';

            // #donut graph 실행
            donuts.forEach(donut => {
                donutAnimation(donut);
            });
        };

        const observerSkill = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeSkillBtn();
                }
            });
        });
    
        // #Intersection Observer가 allBtn을 감시
        observerSkill.observe(allBtn);
    

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

            // #donut graph 실행
            donuts.forEach(donut => {
                donutAnimation(donut);
            });
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

            // #donut graph 실행
            donuts.forEach(donut => {
                donutAnimation(donut);
            });
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

            // #donut graph 실행
            donuts.forEach(donut => {
                donutAnimation(donut);
            });
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

            // #donut graph 실행
            donuts.forEach(donut => {
                donutAnimation(donut);
            });
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

            // #donut graph 실행
            donuts.forEach(donut => {
                donutAnimation(donut);
            });
        });


        // ----- [모바일] icon graph -----
        const donutAnimation =(donut) => {
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
        }
        const donuts = document.querySelectorAll('.icon');
    
        donuts.forEach(donut => {
            donutAnimation(donut);
        });
        
        // ----- [모바일] modal -----
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
            icon.addEventListener('click', () => showModal(idx));
        })
    
        // X 버튼 누르면 모달이 사라지는 함수 만들기
        const removeModal = () => {
            skillDesc.style.display = 'none';
            iconModal.forEach(modal => modal.style.display = 'none');
            $body.classList.remove('scroll-stop');

            donuts.forEach(donut => {
                donutAnimation(donut);
            });
        }
    
        // # button에 함수 적용하기
        xBtn.addEventListener('click', removeModal);
    }  // [모바일] skill


    // ----- [PC] icon 배치 -----
    if(windowWidth >= 768) {
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


        // ----- [PC] skill-desc / bar graph 애니메이션 -----
        const iconBox = document.querySelector('.icon-box');
        const skillDescAni = document.querySelectorAll('.desc-txt-ani');
        const titleBox = document.querySelector('.title-box');
        const barGraph = document.querySelectorAll('.skill-graph');

        // #mouseenter 시 적용될 css 함수 만들기 => movingSkillDesc
        const movingSkillDesc = (idx) => {
            return () => {
                iconBox.style.animationPlayState = 'paused';
                icons.forEach(icon => {
                    icon.style.animationPlayState = 'paused';
                });
                titleBox.style.visibility = 'hidden';
                
                setTimeout(() => {
                    skillDescAni[idx].classList.add('visible');
                    skillDescAni[idx].classList.add('moving');

    
                    const graphBar = barGraph[idx].querySelector('.graph-bar');
                    const data = parseFloat(barGraph[idx].getAttribute('data-value'));
                    graphBar.style.width = `${data}%`;
                },10)
            };
        };
        
        // #mouseout 시 적용될 css 함수 만들기 => originSkillDesc
        const originSkillDesc = (idx) => {
            return () => {
                skillDescAni[idx].classList.remove('moving');
            
                setTimeout(() => {
                    skillDescAni[idx].classList.remove('visible');
                    titleBox.style.visibility = 'visible';
                    const graphBar = barGraph[idx].querySelector('.graph-bar');
                    graphBar.style.width = '0';
                    iconBox.style.animationPlayState = 'running';
                    icons.forEach(icon => {
                        icon.style.animationPlayState = 'running';
                    });
                },300)
                
            };
        };

        // #icon에 mouseover하면 각 icon에 movingSkillDesc()가 적용됨
        icons.forEach((icon, idx) => {
            icon.addEventListener('mouseenter', movingSkillDesc(idx))
        });
        // #icon에 mouseout하면 각 icon에 originSkillDesc()가 적용됨
        icons.forEach((icon, idx) => {
            icon.addEventListener('mouseleave', originSkillDesc(idx))
        });
    }

    
    //====== portfolio_title ======

    //====== portfolio_detail ======
    // ----- [모바일] button click 시 -----
    const pfBtn = document.querySelectorAll('.pf-btn button');
    let activeBtn = null;

    if (windowWidth < 768) {
        // ***** style 적용 *****
        const clickPfBtn = (e) => {
            if(activeBtn && activeBtn !== e.target) {
                e.target.style.color = '#7b588c';
                e.target.style.backgroundColor = '#fff';
            }
            e.target.style.color = '#fff';
            e.target.style.backgroundColor = '#7b588c';

            // #현재 버튼 상태
            activeBtn = e.target;
        };
    
        pfBtn.forEach((btn) => {
            btn.addEventListener('click', clickPfBtn);
        });
    }

    // ----- [공통] 화면에 보일 때 img 애니메이션 실행되게 하기 -----
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // #entry가 화면에 보이는 경우
            if(entry.isIntersecting) {
                const target = entry.target;
                target.classList.add('img-animation');
                observer.unobserve(target);  // 한 번만 작동하도록 관찰 중지
            }
        });
    });

    // #img 요소 가져와서 IntersectionObserver로 관찰
    const images = document.querySelectorAll('.website-image img');
    images.forEach(img => {
        observer.observe(img);
        img.style.cursor ='pointer';

        img.addEventListener('mouseenter', () => {
            img.style.animationPlayState = 'paused';
        });

        img.addEventListener('mouseleave', () => {
            img.style.animationPlayState = 'running';
        });
    });

    // ----- [공통] 화면에 보일 때 txt 애니메이션 실행되게 하기 -----
    const observerTxt = new IntersectionObserver(entries => {
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
        observerTxt.observe(txt);
    });

    // ----- [공통] 화면에 보일 때 btn 애니메이션 실행되게 하기 -----
    const observerBtn = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const target = entry.target;

            if (entry.isIntersecting) {
                target.classList.add('pfBtn-active');
            }  else {
                target.classList.remove('pfBtn-active');
            }
        });
    });

    const bottuns = document.querySelectorAll('.pf-btn');
    bottuns.forEach(btn => {
        observerBtn.observe(btn);
    });

    //====== contact ======
   


    // ++++++++++++++++++ footer ++++++++++++++++++
};
