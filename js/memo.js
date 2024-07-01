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