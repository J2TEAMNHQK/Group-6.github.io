document.addEventListener('DOMContentLoaded', function() {
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    /* Thay đổi shadow navbar khi scroll */
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    /* Smooth scroll cho links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const memberCards = document.querySelectorAll('.member-card');
    
    /* Hiệu ứng 3D khi di chuột vào card */
    memberCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `translateY(-15px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        /* Reset khi chuột rời card */
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        });
    });
    
    /* Animation khi scroll đến phần tử */
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-card, .member-card').forEach(el => {
        el.classList.add('fade-in-scroll');
        observer.observe(el);
    });
    
    /* Parallax cho banner và bubbles */
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const banner = document.querySelector('.banner');
        
        if (banner) {
            banner.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach((bubble, index) => {
            const speed = (index + 1) * 0.05;
            bubble.style.transform = `translateY(${-scrolled * speed}px)`;
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    /* Highlight nav link theo section đang xem */
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    /* Thay đổi màu sóng động */
    const waves = document.querySelectorAll('.wave');
    let hue = 200;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        waves.forEach((wave, index) => {
            wave.style.filter = `hue-rotate(${hue}deg)`;
        });
    }, 100);
    
    /* Tạo bong bóng ngẫu nhiên */
    function createRandomBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 40 + 20;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        
        document.querySelector('.bubbles').appendChild(bubble);
        
        setTimeout(() => {
            bubble.remove();
        }, (duration + delay) * 1000);
    }
    
    setInterval(createRandomBubble, 3000);
    
    /* Fade in toàn trang khi load */
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    /* Easter egg: Click logo 5 lần để xem pháo hoa */
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    
    logo.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 5) {
            createFireworks();
            clickCount = 0;
        }
    });
    
    /* Hiệu ứng pháo hoa */
    function createFireworks() {
        const colors = ['#0ea5e9', '#fb923c', '#f97316', '#fef3c7'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.style.position = 'fixed';
                firework.style.width = '10px';
                firework.style.height = '10px';
                firework.style.borderRadius = '50%';
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                firework.style.left = '50%';
                firework.style.top = '50%';
                firework.style.pointerEvents = 'none';
                firework.style.zIndex = '9999';
                
                const angle = (Math.PI * 2 * i) / 50;
                const velocity = Math.random() * 5 + 5;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                document.body.appendChild(firework);
                
                let x = 0, y = 0, opacity = 1;
                const animate = () => {
                    x += vx;
                    y += vy;
                    opacity -= 0.02;
                    
                    firework.style.transform = `translate(${x}px, ${y}px)`;
                    firework.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        firework.remove();
                    }
                };
                
                animate();
            }, i * 10);
        }
    }
    
    /* Console message */
    console.log('%c🌊 Nhóm 6 - Lập Trình Web 🌊', 
        'font-size: 20px; font-weight: bold; color: #0ea5e9; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%cMade with ❤️ by Team 6', 
        'font-size: 14px; color: #fb923c;');
    console.log('%cTip: Click logo 5 lần để xem hiệu ứng đặc biệt! 🎆', 
        'font-size: 12px; color: #666; font-style: italic;');
    
});