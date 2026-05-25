// Script Document - ALSHKA Bio Website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Default Configuration
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
            { id: "5", platform: "x", title: "إكس (تويتر)", subtitle: "اقرأ أفكاري وتغريداتي ومقالاتي", url: "https://x.com/your_username" },
            { id: "6", platform: "youtube", title: "يوتيوب", subtitle: "اشترك في قناتي لمتابعة الفيديوهات المميزة", url: "https://youtube.com/@your_username" },
            { id: "7", platform: "telegram", title: "تيليجرام", subtitle: "انضم لقناتي لمتابعة التحديثات الحصرية", url: "https://t.me/your_username" },
            { id: "8", platform: "email", title: "البريد الإلكتروني", subtitle: "راسلني للاستفسارات والأعمال الرسمية", url: "mailto:your_email@domain.com" }
        ]
    };

    // Load configuration from localStorage or fall back to defaults
    let appConfig = JSON.parse(localStorage.getItem('alshka_bio_config')) || { ...DEFAULT_CONFIG };
    
    // Ensure active links array exists
    if (!appConfig.links) {
        appConfig.links = [...DEFAULT_CONFIG.links];
    }

    let isAdminAuthenticated = false;
    let selectedAvatarBase64 = null;

    // Helper: Save config to localStorage
    function saveConfig() {
        localStorage.setItem('alshka_bio_config', JSON.stringify(appConfig));
    }

    // Helper: Map platform to FontAwesome icon class
    function getPlatformIcon(platform, customIcon) {
        if (platform === 'custom') return customIcon || 'fas fa-globe';
        const icons = {
            whatsapp: 'fab fa-whatsapp',
            snapchat: 'fab fa-snapchat',
            instagram: 'fab fa-instagram',
            tiktok: 'fab fa-tiktok',
            x: 'fab fa-x-twitter',
            youtube: 'fab fa-youtube',
            telegram: 'fab fa-telegram',
            email: 'fas fa-envelope'
        };
        return icons[platform] || 'fas fa-link';
    }

    // 2. DOM Rendering Engine (Profile and Dynamic Cards)
    function renderProfile() {
        // Render Text Content
        document.getElementById('profileName').innerHTML = `${appConfig.name} <span class="verified-badge" title="حساب موثق"><i class="fas fa-check-circle"></i></span>`;
        document.getElementById('profileBio').textContent = appConfig.bio;
        document.getElementById('footerName').textContent = appConfig.name;

        // Render Avatar
        const avatarImg = document.getElementById('profileAvatar');
        if (avatarImg) {
            avatarImg.src = appConfig.avatar;
        }

        // Render Links
        const linksSection = document.getElementById('linksSection');
        linksSection.innerHTML = ''; // Clear existing

        appConfig.links.forEach((link, index) => {
            const card = document.createElement('a');
            card.href = link.url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.className = `social-link-card link-${link.platform}`;
            
            // Initial animation state
            card.style.opacity = '0';
            card.style.transform = 'translateY(25px)';

            const iconClass = getPlatformIcon(link.platform, link.iconClass);

            card.innerHTML = `
                <div class="link-icon"><i class="${iconClass}"></i></div>
                <div class="link-info">
                    <span class="link-title">${link.title}</span>
                    <span class="link-subtitle">${link.subtitle}</span>
                </div>
                <div class="arrow-icon"><i class="fas fa-chevron-left"></i></div>
            `;

            linksSection.appendChild(card);

            // Stagger animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 250 + (index * 80));
        });
    }

    // Render admin links editor view
    function renderAdminLinksList() {
        const adminLinksList = document.getElementById('adminLinksList');
        adminLinksList.innerHTML = '';

        if (appConfig.links.length === 0) {
            adminLinksList.innerHTML = `<p style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px;">لا توجد روابط حالية. اضغط على الزر أعلاه لإضافة رابط.</p>`;
            return;
        }

        appConfig.links.forEach((link, index) => {
            const item = document.createElement('div');
            item.className = 'admin-link-item';
            
            const iconClass = getPlatformIcon(link.platform, link.iconClass);

            item.innerHTML = `
                <div class="admin-link-item-info">
                    <div class="admin-link-item-icon"><i class="${iconClass}"></i></div>
                    <div>
                        <div class="admin-link-item-title">${link.title}</div>
                        <div class="admin-link-item-platform">${link.subtitle || link.platform}</div>
                    </div>
                </div>
                <div class="admin-link-item-controls">
                    <button class="control-btn up-btn" title="نقل للأعلى" data-index="${index}"><i class="fas fa-arrow-up"></i></button>
                    <button class="control-btn down-btn" title="نقل للأسفل" data-index="${index}"><i class="fas fa-arrow-down"></i></button>
                    <button class="control-btn edit-btn" title="تعديل" data-id="${link.id}"><i class="fas fa-edit"></i></button>
                    <button class="control-btn delete-btn" title="حذف" data-id="${link.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;

            adminLinksList.appendChild(item);
        });

        // Attach controls event listeners
        attachLinkControlsListeners();
    }

    // 3. Navigation/Common Elements
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Toast Alerts helper
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

    // 4. Copy Page URL
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

    // 5. QR Code Modal
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

    if (closeModalBtn) closeModalBtn.addEventListener('click', () => qrModal.classList.remove('active'));
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

    // 6. Security Gates (Passcode Authentication)
    const adminBtn = document.getElementById('adminBtn');
    const passcodeModal = document.getElementById('passcodeModal');
    const closePasscodeModalBtn = document.getElementById('closePasscodeModalBtn');
    const passcodeInput = document.getElementById('passcodeInput');
    const submitPasscodeBtn = document.getElementById('submitPasscodeBtn');
    const adminModal = document.getElementById('adminModal');
    const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');

    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            if (isAdminAuthenticated) {
                openAdminPanel();
            } else {
                passcodeModal.classList.add('active');
                passcodeInput.value = '';
                passcodeInput.focus();
            }
        });
    }

    if (closePasscodeModalBtn) {
        closePasscodeModalBtn.addEventListener('click', () => passcodeModal.classList.remove('active'));
    }

    if (submitPasscodeBtn) {
        submitPasscodeBtn.addEventListener('click', checkPasscode);
    }

    if (passcodeInput) {
        passcodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPasscode();
        });
    }

    function checkPasscode() {
        if (passcodeInput.value === appConfig.passcode) {
            isAdminAuthenticated = true;
            passcodeModal.classList.remove('active');
            openAdminPanel();
        } else {
            showToast('رمز المرور خاطئ!');
            passcodeInput.value = '';
            passcodeInput.focus();
        }
    }

    function openAdminPanel() {
        adminModal.classList.add('active');
        
        // Fill profile settings
        document.getElementById('profileNameInput').value = appConfig.name;
        document.getElementById('profileBioInput').value = appConfig.bio;
        document.getElementById('avatarPreview').src = appConfig.avatar;
        selectedAvatarBase64 = null; // reset temp upload state

        renderAdminLinksList();
    }

    if (closeAdminModalBtn) {
        closeAdminModalBtn.addEventListener('click', () => adminModal.classList.remove('active'));
    }

    // 7. Admin Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 8. Admin links form editing actions
    const addNewLinkBtn = document.getElementById('addNewLinkBtn');
    const linkForm = document.getElementById('linkForm');
    const cancelLinkFormBtn = document.getElementById('cancelLinkFormBtn');
    const linkPlatform = document.getElementById('linkPlatform');
    const customIconGroup = document.getElementById('customIconGroup');

    if (addNewLinkBtn) {
        addNewLinkBtn.addEventListener('click', () => {
            linkForm.reset();
            document.getElementById('editLinkId').value = '';
            customIconGroup.style.display = 'none';
            linkForm.style.display = 'block';
            addNewLinkBtn.style.display = 'none';
        });
    }

    if (cancelLinkFormBtn) {
        cancelLinkFormBtn.addEventListener('click', () => {
            linkForm.style.display = 'none';
            addNewLinkBtn.style.display = 'block';
        });
    }

    if (linkPlatform) {
        linkPlatform.addEventListener('change', () => {
            if (linkPlatform.value === 'custom') {
                customIconGroup.style.display = 'block';
            } else {
                customIconGroup.style.display = 'none';
            }
        });
    }

    // Form Submit handler
    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const editId = document.getElementById('editLinkId').value;
        const platform = document.getElementById('linkPlatform').value;
        const title = document.getElementById('linkTitle').value;
        const subtitle = document.getElementById('linkSubtitle').value;
        const url = document.getElementById('linkUrl').value;
        const iconClass = document.getElementById('linkIconClass').value;

        if (editId) {
            // Update mode
            const index = appConfig.links.findIndex(l => l.id === editId);
            if (index !== -1) {
                appConfig.links[index] = { id: editId, platform, title, subtitle, url, iconClass };
                showToast('تم تحديث الرابط بنجاح!');
            }
        } else {
            // Add mode
            const newLink = {
                id: Date.now().toString(),
                platform,
                title,
                subtitle,
                url,
                iconClass
            };
            appConfig.links.push(newLink);
            showToast('تم إضافة الرابط بنجاح!');
        }

        saveConfig();
        renderProfile();
        renderAdminLinksList();

        linkForm.style.display = 'none';
        addNewLinkBtn.style.display = 'block';
    });

    // Control triggers (up/down/edit/delete)
    function attachLinkControlsListeners() {
        // Move Up
        document.querySelectorAll('.up-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                if (index > 0) {
                    const temp = appConfig.links[index];
                    appConfig.links[index] = appConfig.links[index - 1];
                    appConfig.links[index - 1] = temp;
                    saveConfig();
                    renderProfile();
                    renderAdminLinksList();
                }
            });
        });

        // Move Down
        document.querySelectorAll('.down-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                if (index < appConfig.links.length - 1) {
                    const temp = appConfig.links[index];
                    appConfig.links[index] = appConfig.links[index + 1];
                    appConfig.links[index + 1] = temp;
                    saveConfig();
                    renderProfile();
                    renderAdminLinksList();
                }
            });
        });

        // Edit
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const link = appConfig.links.find(l => l.id === id);
                if (link) {
                    document.getElementById('editLinkId').value = link.id;
                    document.getElementById('linkPlatform').value = link.platform;
                    document.getElementById('linkTitle').value = link.title;
                    document.getElementById('linkSubtitle').value = link.subtitle;
                    document.getElementById('linkUrl').value = link.url;
                    document.getElementById('linkIconClass').value = link.iconClass || '';

                    if (link.platform === 'custom') {
                        customIconGroup.style.display = 'block';
                    } else {
                        customIconGroup.style.display = 'none';
                    }

                    linkForm.style.display = 'block';
                    addNewLinkBtn.style.display = 'none';
                    linkForm.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Delete
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('هل أنت متأكد من حذف هذا الرابط؟')) {
                    appConfig.links = appConfig.links.filter(l => l.id !== id);
                    saveConfig();
                    renderProfile();
                    renderAdminLinksList();
                    showToast('تم حذف الرابط!');
                }
            });
        });
    }

    // 9. Profile Information Save
    const profileEditForm = document.getElementById('profileEditForm');
    const avatarUploadInput = document.getElementById('avatarUploadInput');
    const avatarPreview = document.getElementById('avatarPreview');

    if (avatarUploadInput) {
        avatarUploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Ensure image file
                if (!file.type.startsWith('image/')) {
                    showToast('يرجى اختيار ملف صورة فقط!');
                    return;
                }
                // Size check limit to ~2MB to avoid localStorage overflow
                if (file.size > 2 * 1024 * 1024) {
                    showToast('حجم الصورة كبير جداً! اختر صورة أصغر من 2 ميجابايت.');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    selectedAvatarBase64 = event.target.result;
                    avatarPreview.src = selectedAvatarBase64;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (profileEditForm) {
        profileEditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            appConfig.name = document.getElementById('profileNameInput').value;
            appConfig.bio = document.getElementById('profileBioInput').value;
            
            if (selectedAvatarBase64) {
                appConfig.avatar = selectedAvatarBase64;
            }

            saveConfig();
            renderProfile();
            showToast('تم حفظ الملف الشخصي بنجاح!');
            adminModal.classList.remove('active');
        });
    }

    // 10. System Settings tab logic (Backup/Reset/Passcode)
    const savePasscodeBtn = document.getElementById('savePasscodeBtn');
    const changePasscodeInput = document.getElementById('changePasscodeInput');

    if (savePasscodeBtn && changePasscodeInput) {
        savePasscodeBtn.addEventListener('click', () => {
            const newPass = changePasscodeInput.value.trim();
            if (newPass.length < 4) {
                showToast('يجب أن يكون رمز المرور 4 خانات على الأقل.');
                return;
            }
            appConfig.passcode = newPass;
            saveConfig();
            changePasscodeInput.value = '';
            showToast('تم تحديث رمز المرور بنجاح!');
        });
    }

    // Export Backup
    const exportBackupBtn = document.getElementById('exportBackupBtn');
    if (exportBackupBtn) {
        exportBackupBtn.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appConfig, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `ALSHKA_Bio_Backup.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.removeChild(downloadAnchor);
            showToast('تم تصدير النسخة الاحتياطية!');
        });
    }

    // Trigger Import File Dialog
    const triggerImportBtn = document.getElementById('triggerImportBtn');
    const importFileInput = document.getElementById('importFileInput');
    if (triggerImportBtn && importFileInput) {
        triggerImportBtn.addEventListener('click', () => {
            importFileInput.click();
        });
    }

    // Import Backup File
    if (importFileInput) {
        importFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const parsed = JSON.parse(event.target.result);
                    if (parsed.name && parsed.links) {
                        appConfig = parsed;
                        saveConfig();
                        renderProfile();
                        showToast('تم استيراد البيانات بنجاح!');
                        adminModal.classList.remove('active');
                    } else {
                        showToast('الملف المرفوع غير صالح للتهيئة.');
                    }
                } catch (err) {
                    showToast('خطأ في قراءة ملف التكوين.');
                }
            };
            reader.readAsText(file);
            importFileInput.value = ''; // Reset file input
        });
    }

    // Reset Defaults
    const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
    if (resetDefaultsBtn) {
        resetDefaultsBtn.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من إعادة ضبط المصنع؟ سيؤدي هذا لحذف كافة روابطك المخصصة والعودة للتصميم والروابط الأساسية.')) {
                appConfig = { ...DEFAULT_CONFIG };
                appConfig.links = [...DEFAULT_CONFIG.links];
                saveConfig();
                renderProfile();
                showToast('تم إعادة تعيين الموقع للوضع الافتراضي.');
                adminModal.classList.remove('active');
            }
        });
    }

    // 11. Initial Run
    renderProfile();
});
