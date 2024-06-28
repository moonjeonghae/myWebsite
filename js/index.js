window.onload = function() {
    // const logo = document.querySelector('.logo');
    // const $html = document.querySelector('html');

    // logo.addEventListener('click', () => {
    //     $html.style.scrollTop = 0;
    // });
    // innerWidth 이용해서 모바일만 적용되게 하기 !!!!!!!!!!!!
    var windowWidth = window.innerWidth;
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
    // else {
    //     gnbA.forEach((a) => {
    //         a.addEventListener('click', (e) => {
    //             e.preventDefault(); // 기본 동작 방지
        
    //             const targetId = a.getAttribute('href').substring(1); // 링크의 href에서 '#' 제거
    //             const targetSec = document.getElementById(targetId);
        
    //             if (targetSec) {
    //                 // 해당 섹션의 위치로 스크롤
    //                 targetSec.scrollIntoView({
    //                     behavior: 'smooth' // 부드러운 스크롤
    //                 });
    //             }
    //         });
    //     });
    // }

    //====== about me ======
    // ----- aboutme-tab-btn click 시 -----
    const aboutBtns = document.querySelectorAll('.aboutme-tab-btn button');
    const effortBtn = document.querySelector('.effort-btn');
    // const strengthBtn = document.querySelector('.strength-btn');
    // const goalBtn = document.querySelector('.goal-btn');
    // const historyBtn = document.querySelector('.history-btn');
    // const aboutmeContents = document.querySelectorAll('.aboutme-content-txt');
    // const effortTxt = document.querySelector('.effort');
    // const goalTxt = document.querySelector('.goal');

    // ***** highlight css 적용 *****
    const selectedAboutBtn = (e) => {
        effortBtn.classList.remove('selected');
        aboutBtns.forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
    }

    aboutBtns.forEach(btn => {
        btn.addEventListener('click', selectedAboutBtn);
    });

    // ***** 해당 내용 나오게 하기 *****
    // const showContentTxt = (e) => {
    //     effortTxt.style.display = 'none';
    //     aboutmeContents.forEach(content => {content.style.display = 'none';});
    //     e.target.style.display = 'block';
    // }
    // effortBtn.addEventListener('click', () => {
    //     effortTxt.style.display = 'block';
    //     aboutmeContents.forEach(content => {content.style.display = 'none';});
    // });

    // goalBtn.addEventListener('click', () => {
    //     goalTxt.style.display = 'block';
    //     aboutmeContents.forEach(content => {content.style.display = 'none';});
    // });

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
    const iconModal = document.querySelectorAll('.skill-desc .skill-desc-txt')

    if(windowWidth < 768 ) {
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

        // ----- [PC] skill-desc 애니메이션 -----
        const skillDescAni = document.querySelectorAll('.desc-txt-ani');
        const titleBox = document.querySelector('.title-box');

        // #mouseover 시 적용될 css 함수 만들기 => movingSkillDesc
        const movingSkillDesc = (idx) => {
            return () => {
                skillDescAni[idx].classList.add('visible');
                titleBox.style.display = 'none';
                skillDescAni[idx].classList.add('moving');
            };
        };
        
        // #mouseout 시 적용될 css 함수 만들기 => originSkillDesc
        const originSkillDesc = (idx) => {
            return () => {
                skillDescAni[idx].classList.remove('moving');
            
                setTimeout(() => {
                    skillDescAni[idx].classList.remove('visible');
                    titleBox.style.display = 'block';
                },500)
            
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


    // ----- [PC] bar graph 만들기 -----
    // #skill-graph, graph-bar 변수 지정
    const barGraph = document.querySelectorAll('.skill-graph');
    // #각 skill-graph 지정
    barGraph.forEach(bar => {
        // #data-value 속성값 변수 지정하여 불러오기
        const graphBar = document.querySelectorAll('.graph-bar');
        const data = parseFloat(bar.getAttribute('data-value'));

        console.log(data);
        // #style 적용하기
        graphBar.forEach(graph => {
            graph.style.width = `${data}%`;
        })
    });
    
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

    //====== contact ======

};

$(document).ready(function() {
// 초기값은 typing 진행 안 하는 것으로 설정
var isTyping = false;
var typingIdx = 0;

// typing 할 텍스트 가지고 오기
var typingTxt = $('.job').text();  
// 텍스트 한글자씩 자르기
typingTxt = typingTxt.split('');

// typing 함수 만들기
function typeText() {
    if (typingIdx < typingTxt.length) {
        $('.job-typing').append(typingTxt[typingIdx]);
        typingIdx++;
    } else {
        clearInterval(tyInt);
    }
}

// typing이 진행되지 않으면 typing 실행함
if (isTyping == false) {
    isTyping = true;
    var tyInt = setInterval(typeText, 100);
}
});
