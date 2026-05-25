// Script Document - ALSHKA Bio Website (Admin Panel Page)

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
    let appConfig = JSON.parse(localStorage.getItem('alshka_bio_config')) || { ...DEFAULT_CONFIG };
    
    // Ensure active links exist
    if (!appConfig.links) {
        appConfig.links = [...DEFAULT_CONFIG.links];
    }

    let selectedAvatarBase64 = null;

    // Helper: Save config to localStorage
    function saveConfig() {
        localStorage.setItem('alshka_bio_config', JSON.stringify(appConfig));
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

    // 2. Security Check (Session authentication)
    const lockScreen = document.getElementById('lockScreen');
    const adminDashboard = document.getElementById('adminDashboard');
    const adminPasscodeInput = document.getElementById('adminPasscodeInput');
    const adminLoginBtn = document.getElementById('adminLoginBtn');

    if (sessionStorage.getItem('alshka_admin_auth') === 'true') {
        showDashboard();
    } else {
        lockScreen.style.display = 'flex';
        adminDashboard.style.display = 'none';
        adminPasscodeInput.focus();
    }

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', checkPasscode);
    }
    if (adminPasscodeInput) {
        adminPasscodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPasscode();
        });
    }

    function checkPasscode() {
        if (adminPasscodeInput.value === appConfig.passcode) {
            sessionStorage.setItem('alshka_admin_auth', 'true');
            showDashboard();
        } else {
            showToast('رمز المرور خاطئ!');
            adminPasscodeInput.value = '';
            adminPasscodeInput.focus();
        }
    }

    function showDashboard() {
        lockScreen.style.display = 'none';
        adminDashboard.style.display = 'block';
        
        // Fill Profile Form Inputs
        document.getElementById('profileNameInput').value = appConfig.name;
        document.getElementById('profileBioInput').value = appConfig.bio;
        document.getElementById('avatarPreview').src = appConfig.avatar;
        selectedAvatarBase64 = null; // reset

        renderAdminLinksList();
    }

    // 3. Render Link List (Admin view)
    function renderAdminLinksList() {
        const adminLinksList = document.getElementById('adminLinksList');
        if (!adminLinksList) return;

        adminLinksList.innerHTML = '';

        if (appConfig.links.length === 0) {
            adminLinksList.innerHTML = `<p style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 20px;">لا توجد روابط حالية. أضف روابط جديدة لتبدأ.</p>`;
            return;
        }

        appConfig.links.forEach((link, index) => {
            const item = document.createElement('div');
            item.className = 'admin-link-item';
            
            const iconMarkup = getPlatformIconMarkup(link.platform, link.iconClass);

            item.innerHTML = `
                <div class="admin-link-item-info">
                    <div class="admin-link-item-icon">${iconMarkup}</div>
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

        attachLinkControlsListeners();
    }

    // 4. Tab Switches
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

    // 5. Toast Alerts
    const toast = document.getElementById('toast');
    function showToast(message) {
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 6. Form Link Operations
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

    // Form submit
    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const editId = document.getElementById('editLinkId').value;
        const platform = document.getElementById('linkPlatform').value;
        const title = document.getElementById('linkTitle').value;
        const subtitle = document.getElementById('linkSubtitle').value;
        const url = document.getElementById('linkUrl').value;
        const iconClass = document.getElementById('linkIconClass').value;

        if (editId) {
            // Edit
            const index = appConfig.links.findIndex(l => l.id === editId);
            if (index !== -1) {
                appConfig.links[index] = { id: editId, platform, title, subtitle, url, iconClass };
                showToast('تم تحديث الرابط بنجاح!');
            }
        } else {
            // Add
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
        renderAdminLinksList();

        linkForm.style.display = 'none';
        addNewLinkBtn.style.display = 'block';
    });

    // Controls Event Listeners
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
                    renderAdminLinksList();
                    showToast('تم حذف الرابط!');
                }
            });
        });
    }

    // 7. Profile Updates
    const profileEditForm = document.getElementById('profileEditForm');
    const avatarUploadInput = document.getElementById('avatarUploadInput');
    const avatarPreview = document.getElementById('avatarPreview');

    if (avatarUploadInput) {
        avatarUploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (!file.type.startsWith('image/')) {
                    showToast('يرجى رفع ملف صورة فقط!');
                    return;
                }
                if (file.size > 2 * 1024 * 1024) {
                    showToast('حجم الصورة كبير! اختر صورة أقل من 2 ميجابايت.');
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
            showToast('تم حفظ الملف الشخصي بنجاح!');
        });
    }

    // 8. Settings & Systems
    const savePasscodeBtn = document.getElementById('savePasscodeBtn');
    const changePasscodeInput = document.getElementById('changePasscodeInput');

    if (savePasscodeBtn && changePasscodeInput) {
        savePasscodeBtn.addEventListener('click', () => {
            const newPass = changePasscodeInput.value.trim();
            if (newPass.length < 4) {
                showToast('يجب أن يكون الرمز 4 خانات على الأقل.');
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

    // Trigger Import File
    const triggerImportBtn = document.getElementById('triggerImportBtn');
    const importFileInput = document.getElementById('importFileInput');
    if (triggerImportBtn && importFileInput) {
        triggerImportBtn.addEventListener('click', () => {
            importFileInput.click();
        });
    }

    // Read File
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
                        
                        // Refill
                        document.getElementById('profileNameInput').value = appConfig.name;
                        document.getElementById('profileBioInput').value = appConfig.bio;
                        document.getElementById('avatarPreview').src = appConfig.avatar;
                        
                        renderAdminLinksList();
                        showToast('تم استيراد البيانات بنجاح!');
                    } else {
                        showToast('ملف التكوين غير صالح.');
                    }
                } catch (err) {
                    showToast('خطأ في قراءة ملف JSON.');
                }
            };
            reader.readAsText(file);
            importFileInput.value = '';
        });
    }

    // Reset Defaults
    const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
    if (resetDefaultsBtn) {
        resetDefaultsBtn.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من إعادة ضبط المصنع؟ سيؤدي ذلك لحذف كافة تخصيصاتك والعودة للإعدادات الأساسية للموقع.')) {
                appConfig = { ...DEFAULT_CONFIG };
                appConfig.links = [...DEFAULT_CONFIG.links];
                saveConfig();
                
                // Refill
                document.getElementById('profileNameInput').value = appConfig.name;
                document.getElementById('profileBioInput').value = appConfig.bio;
                document.getElementById('avatarPreview').src = appConfig.avatar;
                
                renderAdminLinksList();
                showToast('تمت إعادة تعيين الموقع للمصنع.');
            }
        });
    }
});
