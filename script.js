// Script Document - ALSHKA Bio Website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Staggered Entrance Animations for Social Cards
    const cards = document.querySelectorAll('.social-link-card');
    cards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(25px)';
        
        // Animating in sequence
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 80));
    });

    // 3. Copy Link Action
    const shareBtn = document.getElementById('shareBtn');
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (message) {
            toast.querySelector('.toast-message').textContent = message;
        }
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            // Get current URL (fallback to placeholder if opened via local file protocol)
            let pageUrl = window.location.href;
            if (pageUrl.startsWith('file:///')) {
                pageUrl = 'https://alshka.bio'; // Fallback clean link for demo purposes
            }

            if (navigator.clipboard && window.isSecureContext) {
                // Clipboard API method
                navigator.clipboard.writeText(pageUrl)
                    .then(() => showToast())
                    .catch(() => fallbackCopyText(pageUrl));
            } else {
                // Fallback method
                fallbackCopyText(pageUrl);
            }
        });
    }

    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed'; // Prevent scrolling to bottom of page
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showToast();
            } else {
                showToast('عذراً، تعذر نسخ الرابط تلقائياً.');
            }
        } catch (err) {
            showToast('عذراً، تعذر نسخ الرابط.');
        }
        document.body.removeChild(textArea);
    }

    // 4. QR Code Modal Logic
    const qrBtn = document.getElementById('qrBtn');
    const qrModal = document.getElementById('qrModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const qrPlaceholder = document.getElementById('qrPlaceholder');
    const qrImage = document.getElementById('qrImage');
    const downloadQrBtn = document.getElementById('downloadQrBtn');

    let qrGenerated = false;
    let finalQrUrl = '';

    if (qrBtn && qrModal) {
        qrBtn.addEventListener('click', () => {
            qrModal.classList.add('active');
            
            // Only generate the QR once per session to save bandwidth
            if (!qrGenerated) {
                let pageUrl = window.location.href;
                if (pageUrl.startsWith('file:///')) {
                    pageUrl = 'https://alshka.bio';
                }
                
                // QR Server API url (300x300 size, margin=1, error correction quality high)
                finalQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pageUrl)}&margin=2`;
                
                // Show loading spinner
                qrPlaceholder.style.display = 'flex';
                qrImage.style.display = 'none';
                
                // Load image
                qrImage.src = finalQrUrl;
                qrImage.onload = () => {
                    qrPlaceholder.style.display = 'none';
                    qrImage.style.display = 'block';
                    qrGenerated = true;
                };
                
                qrImage.onerror = () => {
                    qrPlaceholder.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>';
                    showToast('خطأ في تحميل رمز QR.');
                };
            }
        });
    }

    // Close Modal
    function closeModal() {
        qrModal.classList.remove('active');
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close Modal on overlay click
    if (qrModal) {
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) {
                closeModal();
            }
        });
    }

    // Download QR Code Action
    if (downloadQrBtn) {
        downloadQrBtn.addEventListener('click', () => {
            if (!finalQrUrl) return;
            
            // Show downloading Toast message
            showToast('جاري تحضير ملف الـ QR...');
            
            fetch(finalQrUrl)
                .then(response => {
                    if (!response.ok) throw new Error('Network response error');
                    return response.blob();
                })
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = 'ALSHKA_QR.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(blobUrl);
                })
                .catch(err => {
                    // Fallback to opening in new window if blob download fails due to CORS or network
                    window.open(finalQrUrl, '_blank');
                });
        });
    }
});
