window.onload = function() {
    // innerWidth 이용해서 모바일만 적용되게 하기
    var windowWidth = window.innerWidth;

    // ++++++++++++++++++ header ++++++++++++++++++
    // ----- logo click 시 첫 화면 나오게 하기 -----
    const logo = document.querySelector('.logo');
    
    logo.addEventListener('click', () => {
        window.location.href = './index.html';
    });


    // ----- [PC] 선택된 gnb에 효과 적용하기 -----
    const gnbs = document.querySelectorAll('.gnb a');
    const homeGnb = document.querySelector('.gnb a:first-child');
    
    if(windowWidth >= 768) {
        const selectedGnb = (e) =>  {
                gnbs.forEach(a => a.classList.remove('gnb-selected'));
                e.target.classList.add('gnb-selected');
        };
        
        selectedGnb({ target: homeGnb });
    
        gnbs.forEach(gnb => {
            gnb.addEventListener('click', selectedGnb);
        });


        // ----- [PC] 각 section에 맞는 gnb에 효과 적용하기 -----
        const sections = document.querySelectorAll('section');

        const sectionOffsets = [];

        sections.forEach(section => {
            sectionOffsets.push(section.offsetTop);
        });

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
        activeGnb();

        window.addEventListener('scroll', activeGnb);
    }

    // ----- [PC] gnb click 시 해당 section으로 부드럽게 스크롤 -----
    const sections = document.querySelectorAll('section');
    const sectionOffsets = [];

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
    // ----- [공통] img 애니메이션 -----
    const photo = document.querySelector('.my-photo')
    var observerImg = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                photo.classList.add('img-move');
            }
        });
    });

    const photoContent = document.querySelector('.photo-content');
    observerImg.observe(photoContent);

    // ----- [공통] circle 애니메이션 -----
    // ***** big-circle 적용 *****
    function bigDraw(){
        var ctx = document.getElementById('circle-canvas').getContext("2d");
        var grad = ctx.createLinearGradient(0, 0, 300, 120);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        grad.addColorStop(1, 'rgba(158, 110, 151, 1)');

        ctx.strokeStyle = grad; 
        ctx.lineWidth = 1;
        ctx.stroke(); 
        var startAngle = (Math.PI / 180) * 25; 
        var endAngle = (Math.PI / 180) * 275; 
        var currentAngle = startAngle; 
        var animationCompleted = false;

        function animate() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.arc(182, 200, 180, startAngle, currentAngle, false);
            ctx.stroke();

            currentAngle += (Math.PI / 180) * 4.5;

            if (currentAngle <= endAngle) {
                requestAnimationFrame(animate);
            } else {
                animationCompleted = true;
            }
        }
        const observerBigCircle = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting && !animationCompleted) {
                    animate();
                } 
            });
        });
        
        const photoContent = document.querySelector('.photo-content');
        observerBigCircle.observe(photoContent);
    }
    bigDraw();

    // ***** small-circle 적용 *****
    function smallDraw(){
                            
        var ctx = document.getElementById('circle-canvas1').getContext("2d");
        var grad1 = ctx.createLinearGradient(0, 0, 300, 250);
        grad1.addColorStop(0, 'rgba(158, 110, 151, 0.7)');
        grad1.addColorStop(1, 'rgba(255, 255, 255, 1)');

        ctx.strokeStyle = grad1;
        ctx.lineWidth = 1;
        var startAngle = (Math.PI / 180) * 0;
        var endAngle = (Math.PI / 180) * 275;
        var currentAngle = startAngle;
        var animationCompleted = false;

        function animate() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 캔버스 지우기
            ctx.beginPath();
            ctx.arc(130, 130, 120, startAngle, currentAngle, false);
            ctx.stroke();

            currentAngle += (Math.PI / 180) * 7;

            if (currentAngle <= endAngle) {
                requestAnimationFrame(animate);
            } else {
                animationCompleted = true;
            }
        }

        const observerSmallCircle = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting  && !animationCompleted) {
                    animate();
                } 
            });
        });
        
        const photoContent = document.querySelector('.photo-content');
        observerSmallCircle.observe(photoContent);
    }
    smallDraw();

    // ----- [공통] starlight 애니메이션 -----
    const starlight = document.querySelector('.big-circle .starlight');
    const smallStarlight = document.querySelector('.small-circle .small-starlight');
    
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

    // ----- [공통] 첫 번째 타이핑 효과 => 웹 개발자 -----
    var isTypingJob = false;
    var typingIdxJob = 0;
    var tyIntJob;
    const jobTypingBox = document.querySelector('.job-typing');
    var typingTxtJob = document.querySelector('.job').innerText;  
    
    typingTxtJob = typingTxtJob.split(''); 

    function typeTextJob() {
        if (typingIdxJob < typingTxtJob.length) {
            jobTypingBox.innerText += typingTxtJob[typingIdxJob];
            typingIdxJob++;
        } else {
            clearInterval(tyIntJob);
            isTypingJob = false;
        }
    };

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
    var typingTxtName = document.querySelector('.name').innerText;  
    
    typingTxtName = typingTxtName.split(''); 

    function typeTextName() {
        if (typingIdxName < typingTxtName.length) {
            nameTypingBox.innerText += typingTxtName[typingIdxName];
            typingIdxName++;
        } else {
            clearInterval(tyIntName);
            isTypingName = false;
        }
    };
    
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
        aboutmeContents.forEach(content => {
            content.style.display = 'none';
        });

        effortTxt.style.display = 'block';

        aboutBtns.forEach(btn => {
            btn.classList.remove('selected');
        });

        effortBtn.classList.add('selected');
    };

    
    const observerAboutMe = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            let isInitialized = false;

            if (entry.isIntersecting && !isInitialized) {
                isInitialized = true;
                setTimeout(() => {
                    initializeEffortBtn();
                }, 2000);
            } else if (!entry.isIntersecting) {
                isInitialized = false;
                aboutmeContents.forEach(content => {
                    content.style.display = 'none';
                });
            }
        });
    });

    observerAboutMe.observe(effortBtn);

    aboutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            aboutBtns.forEach(btn => {
                btn.classList.remove('selected');
            });

            e.target.classList.add('selected');

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
        const skillTabBtns = document.querySelectorAll('.skill-tab-btn button');
        const allBtn = document.querySelector('.skill-tab-btn .all');
        const codingBtn = document.querySelector('.skill-tab-btn .coding');
        const designBtn = document.querySelector('.skill-tab-btn .design');
        const videoBtn = document.querySelector('.skill-tab-btn .video');
        const etcBtn = document.querySelector('.skill-tab-btn .etc');
        const codingIcons = document.querySelectorAll('.icon-box .coding');
        const designIcons = document.querySelectorAll('.icon-box .design');
        const videoIcon = document.querySelector('.icon-box .video');
        const etcIcon = document.querySelector('.icon-box .etc');

        // ***** selected css 적용 *****
        const initializeSkillBtn = () => {
            skillTabBtns.forEach(btn => btn.classList.remove('selected'));
            allBtn.classList.add('selected');

            [codingIcons, designIcons].forEach(icons => 
                icons.forEach(icon => icon.style.display = 'block')
            );

            [videoIcon, etcIcon].forEach(icon => icon.style.display = 'block');

            donuts.forEach(donut => donutAnimation(donut));
        };

        const observerSkill = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeSkillBtn();
                }
            });
        });
    
        observerSkill.observe(allBtn);
    

        const selectedBtn = (e) => {
            allBtn.classList.remove('selected');
            skillTabBtns.forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
        };

        skillTabBtns.forEach(btn => btn.addEventListener('click', selectedBtn));


        // ***** 해당 icon만 보이게 하기 *****
        const showIcons = (showCoding, showDesign, showVideo, showEtc) => {
            codingIcons.forEach(icon => icon.style.display = showCoding ? 'block' : 'none');
            designIcons.forEach(icon => icon.style.display = showDesign ? 'block' : 'none');
            videoIcon.style.display = showVideo ? 'block' : 'none';            
            etcIcon.style.display = showEtc ? 'block' : 'none';  
            
            donuts.forEach(donut => donutAnimation(donut));
        };

        allBtn.addEventListener('click', () => showIcons(true, true, true, true));
        codingBtn.addEventListener('click', () => showIcons(true, false, false, false));
        designBtn.addEventListener('click', () => showIcons(false, true, false, false));
        videoBtn.addEventListener('click', () => showIcons(false, false, true, false));
        etcBtn.addEventListener('click', () => showIcons(false, false, false, true));

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
    
        donuts.forEach(donut => donutAnimation(donut));
        
        // ----- [모바일] modal -----
        const skillDesc = document.querySelector('.skill-desc');
        const xBtn = document.querySelector('.x-btn');
    
        const showModal = (idx) => {
            skillDesc.style.display = 'block';
            iconModal[idx].style.display = 'block';
            $body.classList.add('scroll-stop');
        };
    
        icons.forEach((icon, idx) => {
            icon.addEventListener('click', () => showModal(idx));
        });
    
        const removeModal = () => {
            skillDesc.style.display = 'none';
            iconModal.forEach(modal => modal.style.display = 'none');
            $body.classList.remove('scroll-stop');

            donuts.forEach(donut => {
                donutAnimation(donut);
            });
        };
    
        xBtn.addEventListener('click', removeModal);
    }  // [모바일] skill


    // ----- [PC] icon 배치 -----
    if(windowWidth >= 768) {
        const radius = 285;

        const iconArrangement = (idx) => {
            const angle = (idx / icons.length) * 2 * Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const $icon = icons[idx];
            $icon.style.left = `calc(50% + ${x}px)`;
            $icon.style.top = `calc(50% + ${y}px)`;
        };

        icons.forEach((icon, idx) => {
            iconArrangement(idx);
        });


        // ----- [PC] skill-desc / bar graph 애니메이션 -----
        const iconBox = document.querySelector('.icon-box');
        const skillDescAni = document.querySelectorAll('.desc-txt-ani');
        const titleBox = document.querySelector('.title-box');
        const barGraph = document.querySelectorAll('.skill-graph');
        const iconImgs = document.querySelectorAll('.icon > img');

        const pausedAnimation = () => {
            iconBox.style.animationPlayState = 'paused';
            icons.forEach(icon => {
                icon.style.animationPlayState = 'paused';
            });
        }

        const runningAnimation = () => {
            iconBox.style.animationPlayState = 'running';
            icons.forEach(icon => {
                icon.style.animationPlayState = 'running';
            });
        }
        const movingSkillDesc = (idx) => {
            return () => {
                pausedAnimation();
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
        
        const originSkillDesc = (idx) => {
            return () => {
                skillDescAni[idx].classList.remove('moving');
                titleBox.style.visibility = 'visible';
                titleBox.style.opacity = '0';
                
                setTimeout(() => {
                    skillDescAni[idx].classList.remove('visible');
                    const graphBar = barGraph[idx].querySelector('.graph-bar');
                    graphBar.style.width = '0';
                    titleBox.style.opacity = '1';
                }, 300)
                
                runningAnimation();
            };
        };

        iconImgs.forEach((icon, idx) => {
            icon.addEventListener('mouseenter', movingSkillDesc(idx))
        });

        iconImgs.forEach((icon, idx) => {
            icon.addEventListener('mouseleave', originSkillDesc(idx))
        });
    }

    
    //====== portfolio_title ======
    // ----- [공통] 포트폴리오 title 애니메이션 -----
    // ***** txt, line 적용 *****
    function portfolioTitleAnimationPlay(entries) {
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                function portfolioTitleAnimation(entries) {
                    entries.forEach(entry => {
                        var target = entry.target;
                        if(entry.isIntersecting) {
                            target.classList.add(target.dataset.class);
                        } else {
                            target.classList.remove(target.dataset.class);
                        }
                    })
                };

                const pfObserver = new IntersectionObserver(portfolioTitleAnimation);

                const pfLongLine = document.querySelector('.long-line');
                const pfSubTitleP = document.querySelector('.pf-sub-title p');
                const pfTitle = document.querySelector('.pf-title');
                const pfShortLine = document.querySelector('.short-line');

                pfLongLine.dataset.class = 'longline-active';
                pfSubTitleP.dataset.class = 'p-active';
                pfTitle.dataset.class = 'pftitle-active';
                pfShortLine.dataset.class = 'shortline-active';

                pfObserver.observe(pfLongLine);
                pfObserver.observe(pfSubTitleP);
                pfObserver.observe(pfTitle);
                pfObserver.observe(pfShortLine);
            }
        });
    };
    
    const portfolio = document.querySelector('.portfolio-title');

    const pfPlayOBbserver = new IntersectionObserver(portfolioTitleAnimationPlay);
    pfPlayOBbserver.observe(portfolio);

    // ***** circle 적용 *****
    function pfDraw(){
        var ctx = document.getElementById('pf-canvas').getContext("2d");

        var pfGrad = ctx.createLinearGradient(0, 0, 300, 250);
        pfGrad.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
        pfGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
        pfGrad.addColorStop(1, 'rgba(255, 255, 255, 0.5)');

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

        function drawInitial() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.arc(325, 325, 325, startAngle, startAngle, false);
            ctx.stroke();
        };

        function animate() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();

            ctx.arc(325, 325, 325, startAngle, currentAngle, false);
            ctx.stroke();

            currentAngle += (Math.PI / 180) * 4;

            if (currentAngle <= endAngle) {
                requestAnimationFrame(animate);
            }  
        };

        const observerPortfolio = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    currentAngle = startAngle;
                    drawInitial();
                    setTimeout(() => {
                        animate();
                    }, 1500);
                }
            });
        });

        const portfolio = document.querySelector('.portfolio-title');
        observerPortfolio.observe(portfolio);
    }
    pfDraw();

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

            activeBtn = e.target;
        };
    
        pfBtn.forEach((btn) => {
            btn.addEventListener('click', clickPfBtn);
        });
    }

    // ----- [공통] 화면에 보일 때 img/video 애니메이션 실행되게 하기 -----
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = entry.target;
                target.classList.add('img-animation');
                observer.unobserve(target);
            }
        });
    });

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

    const videos = document.querySelectorAll('.pf-content-box video');

    const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const video = entry.target;
            if(entry.isIntersecting) {
                video.currentTime = 0;
                video.play();
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    });

    videos.forEach(video => {
        videoObserver.observe(video);
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

    // ----- [공통] 버튼 hover animation -----  
    const btns = document.querySelectorAll('.pf-btn button');

    function btnSpanAnimation() {
        btns.forEach(btn => {
            const spans = btn.querySelectorAll('span');
    
            spans.forEach((span, idx) => {
                const n = idx + 1;
    
                span.style.left = `${(n - 1) * 25}%`;
                span.style.transitionDelay = `${(n - 1) * 0.1}s`;
            });
        });
    }

    btns.forEach(btn => btn.addEventListener('mouseenter', btnSpanAnimation));

    // ----- [공통] 버튼 클릭 시 href 연결 -----  
    btns.forEach((btn) => {
        if(!btn.hasAttribute('data-exclude')) {
            btn.addEventListener('click', () => {
                const url = btn.getAttribute('data-href');
                window.open(url, '_blank');
            });
        }
    });
     
     
    // ----- [공통] design 버튼 클릭 시 모달창 띄우기 -----
    const designGuideBtns = document.querySelectorAll('.design-btn');
    const designGuides = document.querySelectorAll('.design-guide');
    const cancelBtns = document.querySelectorAll('.cancel-btn');
    
    const clickDesignGuideBtn = (idx)=> {
        designGuides[idx].classList.add('dg-show');
        designGuides[idx].style.display = 'block';
        $body.classList.add('scroll-stop'); 
    };

    const cancelModal = (idx) => {
        designGuides[idx].classList.remove('dg-show');
        designGuides[idx].style.display = 'none';
        $body.classList.remove('scroll-stop');
    }

    designGuideBtns.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            clickDesignGuideBtn(idx);
        });
    });

    cancelBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            cancelModal(idx);
        });
    });


    // ++++++++++++++++++ footer ++++++++++++++++++
    // [pc] phone-icon 복사 가능하게 창 띄우기
    const phoneIcon = document.querySelector('.phone-icon a');

    phoneIcon.addEventListener('click', (e) => {
        if(windowWidth >= 1024) {
            e.preventDefault();
            
            const phoneNumber = phoneIcon.getAttribute('data-number');

            alert('전화번호 : ' + phoneNumber + '\n\n확인을 누르시면 번호가 복사됩니다.');

            navigator.clipboard.writeText(phoneNumber)
            .then(function() {
                alert('전화번호가 클립보드에 복사되었습니다.');
            })
            .catch(err => {
                console.error('복사 실패 : ', err);
                alert('전화번호 복사에 실패하였습니다. 수동으로 복사해 주시기를 바랍니다.')
            });
        }
    });

    // [공통] top 버튼 애니메이션
    const TopBtn = document.querySelector('.fixed-menu');

    TopBtn.addEventListener('mouseenter', () => {
        TopBtn.classList.add('moving');
    });

    TopBtn.addEventListener('mouseleave', () => {
        TopBtn.classList.remove('moving');
    });

    TopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const homeSec = document.getElementById('home');
    const homeHeight = homeSec.offsetHeight / 2;
    console.log(homeHeight);
    
    function topBtnOpacity() {
        const scrollPos = window.scrollY;
        console.log(scrollPos);
        
        if(scrollPos < homeHeight) {
            TopBtn.style.opacity = 0;
            TopBtn.style.transition = 'opacity 0.3s';
        } else {
            TopBtn.style.opacity = 1;
        }
    }

    topBtnOpacity();

    window.addEventListener('scroll', topBtnOpacity);
};
