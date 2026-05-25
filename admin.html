<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم | ALSHKA</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="avatar.png">
    
    <!-- Google Fonts: Tajawal -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body class="admin-body">
    <!-- Background Glows -->
    <div class="glow-container">
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
        <div class="glow-orb orb-3"></div>
    </div>

    <!-- 1. Passcode Lock Screen -->
    <div class="lock-screen-container" id="lockScreen">
        <div class="modal-card passcode-card">
            <div class="lock-icon-header">
                <i class="fas fa-lock-open lock-icon-anim"></i>
            </div>
            <h3 class="modal-title">رمز دخول لوحة التحكم</h3>
            <p class="modal-desc">أدخل رمز المرور لفتح الإعدادات وإدارة الروابط (الافتراضي: 1234)</p>
            <div class="passcode-input-wrapper">
                <input type="password" id="adminPasscodeInput" placeholder="••••" maxlength="8">
            </div>
            <button class="download-qr-btn" id="adminLoginBtn">دخول</button>
            <a href="index.html" class="back-link-btn" style="display: block; margin-top: 15px; font-size: 13px; color: var(--text-secondary); text-decoration: none;">
                <i class="fas fa-arrow-right" style="margin-left: 5px;"></i>العودة للصفحة الرئيسية
            </a>
        </div>
    </div>

    <!-- 2. Main Admin Dashboard Container (Hidden by default) -->
    <main class="profile-container admin-dashboard-container" id="adminDashboard" style="display: none;">
        <!-- Header -->
        <header class="admin-dashboard-header">
            <div class="admin-title-row">
                <h1 class="profile-name">
                    <i class="fas fa-sliders-h" style="color: var(--primary-glow); margin-left: 8px;"></i>
                    لوحة التحكم
                </h1>
                <a href="index.html" class="view-profile-btn" title="عرض الصفحة الشخصية">
                    <i class="fas fa-eye"></i>
                    <span>عرض الصفحة</span>
                </a>
            </div>
            <p class="admin-subtitle">قم بإضافة وتعديل روابط التواصل وتخصيص صورتك وملفك الشخصي.</p>
        </header>

        <!-- Admin Tabs -->
        <div class="admin-tabs">
            <button class="tab-btn active" data-tab="linksTab">إدارة الروابط</button>
            <button class="tab-btn" data-tab="profileTab">الملف الشخصي</button>
            <button class="tab-btn" data-tab="settingsTab">الإعدادات</button>
        </div>

        <!-- Tab Content: Links Management -->
        <div class="tab-content active" id="linksTab">
            <div class="link-manager-actions">
                <button class="add-new-link-btn" id="addNewLinkBtn">
                    <i class="fas fa-plus"></i> إضافة رابط جديد
                </button>
            </div>
            
            <!-- Form to Add/Edit Link (Collapsed by default) -->
            <form class="link-form" id="linkForm" style="display: none;">
                <input type="hidden" id="editLinkId">
                <div class="form-group">
                    <label for="linkPlatform">المنصة</label>
                    <select id="linkPlatform" required>
                        <option value="whatsapp">واتساب</option>
                        <option value="snapchat">سناب شات</option>
                        <option value="instagram">إنستغرام</option>
                        <option value="tiktok">تيك توك</option>
                        <option value="kick">كيك (Kick)</option>
                        <option value="twitch">تويتش (Twitch)</option>
                        <option value="x">إكس (تويتر)</option>
                        <option value="youtube">يوتيوب</option>
                        <option value="telegram">تيليجرام</option>
                        <option value="discord">ديسكورد (Discord)</option>
                        <option value="steam">ستيم (Steam)</option>
                        <option value="email">البريد الإلكتروني</option>
                        <option value="custom">رابط مخصص</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="linkTitle">العنوان الرئيسي</label>
                    <input type="text" id="linkTitle" placeholder="مثال: قناتي على كيك" required>
                </div>
                <div class="form-group">
                    <label for="linkSubtitle">العنوان الفرعي</label>
                    <input type="text" id="linkSubtitle" placeholder="مثال: تابع البث المباشر هنا" required>
                </div>
                <div class="form-group">
                    <label for="linkUrl">الرابط الإلكتروني (URL)</label>
                    <input type="url" id="linkUrl" placeholder="https://..." required>
                </div>
                <div class="form-group custom-icon-group" id="customIconGroup" style="display: none;">
                    <label for="linkIconClass">أيقونة مخصصة (فئة FontAwesome)</label>
                    <input type="text" id="linkIconClass" placeholder="مثال: fas fa-gamepad">
                </div>
                <div class="form-actions">
                    <button type="submit" class="save-form-btn" id="saveLinkFormBtn">حفظ</button>
                    <button type="button" class="cancel-form-btn" id="cancelLinkFormBtn">إلغاء</button>
                </div>
            </form>

            <!-- List of current links in admin dashboard -->
            <div class="admin-links-list" id="adminLinksList">
                <!-- Injected via JS -->
            </div>
        </div>

        <!-- Tab Content: Profile Settings -->
        <div class="tab-content" id="profileTab">
            <form id="profileEditForm">
                <div class="form-group">
                    <label>الصورة الشخصية</label>
                    <div class="avatar-upload-wrapper">
                        <img src="avatar.png" id="avatarPreview" alt="Avatar Preview">
                        <div class="upload-btn-wrapper">
                            <span class="upload-text"><i class="fas fa-cloud-upload-alt"></i> اختر صورة</span>
                            <input type="file" id="avatarUploadInput" accept="image/*">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="profileNameInput">الاسم التعريفي</label>
                    <input type="text" id="profileNameInput" placeholder="ALSHKA" required>
                </div>
                <div class="form-group">
                    <label for="profileBioInput">الوصف الشخصي (البيو)</label>
                    <textarea id="profileBioInput" rows="3" placeholder="مرحباً بك في..." required></textarea>
                </div>
                <button type="submit" class="download-qr-btn" id="saveProfileBtn">حفظ التغييرات</button>
            </form>
        </div>

        <!-- Tab Content: System Settings -->
        <div class="tab-content" id="settingsTab">
            <div class="form-group">
                <label for="changePasscodeInput">تغيير رمز المرور</label>
                <div class="input-action-row">
                    <input type="password" id="changePasscodeInput" placeholder="رمز مرور جديد" maxlength="8">
                    <button class="change-pass-btn" id="savePasscodeBtn">تحديث</button>
                </div>
            </div>
            <hr class="settings-divider">
            <div class="backup-actions">
                <button class="settings-action-btn backup-btn" id="exportBackupBtn">
                    <i class="fas fa-file-export"></i> تصدير البيانات (نسخة احتياطية)
                </button>
                <div class="import-wrapper">
                    <button class="settings-action-btn import-btn" id="triggerImportBtn">
                        <i class="fas fa-file-import"></i> استيراد البيانات (رفع نسخة)
                    </button>
                    <input type="file" id="importFileInput" accept=".json" style="display: none;">
                </div>
                <button class="settings-action-btn reset-btn" id="resetDefaultsBtn">
                    <i class="fas fa-history"></i> إعادة ضبط المصنع
                </button>
            </div>
        </div>
    </main>

    <!-- Notification Toast -->
    <div class="toast" id="toast">
        <div class="toast-content">
            <i class="fas fa-check-circle toast-icon"></i>
            <span class="toast-message">تم الحفظ بنجاح!</span>
        </div>
    </div>

    <!-- Custom Admin Script -->
    <script src="admin.js"></script>
</body>
</html>
