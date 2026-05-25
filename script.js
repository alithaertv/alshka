// Script Document - ALSHKA Bio Website (Public Page)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Default Configuration
    const DEFAULT_CONFIG = {
        name: "ALSHKA",
        bio: "مرحباً بك في صفحتي التعريفية الشخصية. يمكنك الوصول إلى جميع حساباتي الرسمية وقنوات التواصل معي من خلال الروابط أدناه.",
        avatar: "avatar.png",
        passcode: "1234",
        links: [
            { id: "1", platform: "whatsapp", title: "واتساب", subtitle: "تواصل معي مباشرة ومحادثة فورية", url: "https://wa.me/your_number" },
            { id: "2", platform: "snapchat", title: "سناب شات", subtitle: "تابع يومياتي ولقطاتي اليومية", url: "https://snapchat.com/add/your_username" },
            { id: "3", platform: "instagram", title: "إنستغرام", subtitle: "شاهد أحدث الصور ومقاطع الريلز الخاصة بي", url: "https://instagram.com/your_username" },
            { id: "4", platform: "tiktok", title: "تيك توك", subtitle: "شاهد الفيديوهات القصيرة والمسلية", url: "https://tiktok.com/@your_username" },
            { id: "5", platform: "kick", title: "كيك (Kick)", subtitle: "تابع بثي المباشر والألعاب الحماسية", url: "https://kick.com/your_username" },
            { id: "6", platform: "twitch", title: "تويتش (Twitch)", subtitle: "انضم لمجتمع الألعاب والبث المباشر الخاص بي", url: "https://twitch.tv/your_username" },
            { id: "7", platform: "x", title: "إكس (تويتر)", subtitle: "اقرأ أفكاري وتغريداتي ومقالاتي", url: "https://x.com/your_username" },
            { id: "8", platform: "youtube", title: "يوتيوب", subtitle: "اشترك في قناتي لمتابعة الفيديوهات المميزة", url: "https://youtube.com/@your_username" },
            { id: "9", platform: "telegram", title: "تيليجرام", subtitle: "انضم لقناتي لمتابعة التحديثات الحصرية", url: "https://t.me/your_username" },
            { id: "10", platform: "discord", title: "ديسكورد (Discord)", subtitle: "دردش وتواصل مع مجتمعنا الخاص", url: "https://discord.gg/your_invite" },
            { id: "11", platform: "steam", title: "ستيم (Steam)", subtitle: "العب معي وتابع قائمة ألعابي المفضلة", url: "https://steamcommunity.com/id/your_id" },
            { id: "12", platform: "email", title: "البريد الإلكتروني", subtitle: "راسلني للاستفسارات والأعمال الرسمية", url: "mailto:your_email@domain.com" }
        ]
    };

    // Load configuration
    const appConfig = JSON.parse(localStorage.getItem('alshka_bio_config')) || { ...DEFAULT_CONFIG };
    
    // Fallback links check
    if (!appConfig.links) {
        appConfig.links = [...DEFAULT_CONFIG.links];
    }

    // Helper: Map platform to FontAwesome icon markup or custom SVG for Kick
    function getPlatformIconMarkup(platform, customIcon) {
        if (platform === 'custom') {
            return `<i class="${customIcon || 'fas fa-globe'}"></i>`;
        }
        if (platform === 'kick') {
            return `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <rect width="24" height="24" rx="5" fill="#53fc18"/>
                <path d="M6 5h3v4h2V5h3v6h-2v2h2v6h-3v-4H9v4H6V5z" fill="#000000"/>
            </svg>`;
        }
        const icons = {
            whatsapp: 'fab fa-whatsapp',
            snapchat: 'fab fa-snapchat',
            instagram: 'fab fa-instagram',
            tiktok: 'fab fa-tiktok',
            twitch: 'fab fa-twitch',
            x: 'fab fa-x-twitter',
            youtube: 'fab fa-youtube',
            telegram: 'fab fa-telegram',
            discord: 'fab fa-discord',
            steam: 'fab fa-steam',
            email: 'fas fa-envelope'
        };
        const iconClass = icons[platform] || 'fas fa-link';
        return `<i class="${iconClass}"></i>`;
    }

    // 2. Render Page Content dynamically
    function renderProfilePage() {
        // Name and Bio
        const nameEl = document.getElementById('profileName');
        if (nameEl) {
            nameEl.innerHTML = `${appConfig.name} <span class="verified-badge" title="حساب موثق"><i class="fas fa-check-circle"></i></span>`;
        }
        const bioEl = document.getElementById('profileBio');
        if (bioEl) {
            bioEl.textContent = appConfig.bio;
        }
        const footerNameEl = document.getElementById('footerName');
        if (footerNameEl) {
            footerNameEl.textContent = appConfig.name;
        }

        // Avatar Image
        const avatarImg = document.getElementById('profileAvatar');
        if (avatarImg) {
            avatarImg.src = appConfig.avatar;
        }

        // Links List
        const linksSection = document.getElementById('linksSection');
        if (linksSection) {
            linksSection.innerHTML = '';
            
            appConfig.links.forEach((link, index) => {
                const card = document.createElement('a');
                card.href = link.url;
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
                card.className = `social-link-card link-${link.platform}`;
                
                // Initial animation state
                card.style.opacity = '0';
                card.style.transform = 'translateY(25px)';

                const iconMarkup = getPlatformIconMarkup(link.platform, link.iconClass);

                card.innerHTML = `
                    <div class="link-icon">${iconMarkup}</div>
                    <div class="link-info">
                        <span class="link-title">${link.title}</span>
                        <span class="link-subtitle">${link.subtitle}</span>
                    </div>
                    <div class="arrow-icon"><i class="fas fa-chevron-left"></i></div>
                `;

                linksSection.appendChild(card);

                // Stagger loading
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 250 + (index * 80));
            });
        }
    }

    // 3. Set Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 4. Toast Notifications
    const toast = document.getElementById('toast');
    function showToast(message) {
        if (message) {
            toast.querySelector('.toast-message').textContent = message;
        } else {
            toast.querySelector('.toast-message').textContent = "تم نسخ الرابط بنجاح!";
        }
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 5. Clipboard Copy Action
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            let pageUrl = window.location.href;
            if (pageUrl.startsWith('file:///')) {
                pageUrl = 'https://alshka.bio';
            }

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(pageUrl)
                    .then(() => showToast())
                    .catch(() => fallbackCopyText(pageUrl));
            } else {
                fallbackCopyText(pageUrl);
            }
        });
    }

    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showToast();
        } catch (err) {
            showToast('عذراً، تعذر نسخ الرابط.');
        }
        document.body.removeChild(textArea);
    }

    // 6. QR Code Generation Modals
    const qrBtn = document.getElementById('qrBtn');
    const qrModal = document.getElementById('qrModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const qrPlaceholder = document.getElementById('qrPlaceholder');
    const qrImage = document.getElementById('qrImage');
    const downloadQrBtn = document.getElementById('downloadQrBtn');
    let finalQrUrl = '';

    if (qrBtn && qrModal) {
        qrBtn.addEventListener('click', () => {
            qrModal.classList.add('active');
            let pageUrl = window.location.href;
            if (pageUrl.startsWith('file:///')) {
                pageUrl = 'https://alshka.bio';
            }
            
            finalQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pageUrl)}&margin=2`;
            qrPlaceholder.style.display = 'flex';
            qrImage.style.display = 'none';
            
            qrImage.src = finalQrUrl;
            qrImage.onload = () => {
                qrPlaceholder.style.display = 'none';
                qrImage.style.display = 'block';
            };
            qrImage.onerror = () => {
                qrPlaceholder.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>';
            };
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => qrModal.classList.remove('active'));
    }
    if (qrModal) {
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) qrModal.classList.remove('active');
        });
    }

    if (downloadQrBtn) {
        downloadQrBtn.addEventListener('click', () => {
            if (!finalQrUrl) return;
            showToast('جاري تحميل رمز QR...');
            fetch(finalQrUrl)
                .then(r => r.blob())
                .then(b => {
                    const url = URL.createObjectURL(b);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'ALSHKA_QR.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                })
                .catch(() => window.open(finalQrUrl, '_blank'));
        });
    }

    // Initial Execution
    renderProfilePage();
});
