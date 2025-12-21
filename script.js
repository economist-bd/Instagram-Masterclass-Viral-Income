document.addEventListener('DOMContentLoaded', () => {
    const chapterList = document.getElementById('chapter-list');
    const bookContent = document.getElementById('book-content');
    const landingPage = document.getElementById('landing-page');
    const readerPage = document.getElementById('reader-page');
    const sidebar = document.getElementById('sidebar');

    // 1. Load Chapters
    function loadChapters() {
        bookData.forEach((chapter, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="far fa-circle"></i> ${chapter.title.split(':')[0]}`; // ছোট টাইটেল
            li.addEventListener('click', () => {
                loadContent(index);
                document.querySelectorAll('#chapter-list li').forEach(l => {
                    l.classList.remove('active');
                    l.querySelector('i').className = 'far fa-circle';
                });
                li.classList.add('active');
                li.querySelector('i').className = 'fas fa-check-circle'; // Active Icon
                
                if(window.innerWidth < 768) sidebar.classList.remove('active');
            });
            chapterList.appendChild(li);
        });
    }

    // 2. Load Content
    function loadContent(index) {
        const chapter = bookData[index];
        bookContent.innerHTML = `
            <div class="page-content fade-in">
                <h2>${chapter.title}</h2>
                <div>${chapter.content}</div>
                <div style="margin-top: 40px; text-align: center;">
                    ${index < bookData.length - 1 ? 
                        `<button class="primary-btn" onclick="nextChapter(${index})">Next Topic ➡️</button>` : 
                        '<p>--- The End ---</p>'}
                </div>
            </div>
        `;
        document.querySelector('.content-area').scrollTop = 0;
    }

    // 3. Helper Functions
    window.nextChapter = (currentIndex) => {
        if(currentIndex + 1 < bookData.length) {
            // Trigger click on next list item to handle UI update automatically
            chapterList.children[currentIndex + 1].click();
        }
    };

    // 4. UI Events
    document.getElementById('start-reading-btn').addEventListener('click', () => {
        landingPage.classList.add('hidden');
        readerPage.classList.remove('hidden');
    });
    
    document.getElementById('toggle-sidebar').addEventListener('click', () => sidebar.classList.add('active'));
    document.getElementById('close-sidebar').addEventListener('click', () => sidebar.classList.remove('active'));

    loadChapters();
});

// PWA Install Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('installBtn');
    btn.style.display = 'block';
    
    btn.addEventListener('click', () => {
        btn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt = null;
    });
});
