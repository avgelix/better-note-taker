document.addEventListener('DOMContentLoaded', () => {
    const notePages = [];
    let currentPage = 0;

    // DOM Elements
    const newPageBtn = document.getElementById('newPageBtn');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageNumberSpan = document.getElementById('pageNumber');
    const notePage = document.getElementById('notePage');

    // Initialize first page
    notePages.push({
        cueColumn: '',
        notesColumn: '',
        summaryColumn: ''
    });

    // Save current page content
    function saveCurrentPage() {
        const cueContent = document.querySelector('.cue-column .content').innerHTML;
        const notesContent = document.querySelector('.notes-column .content').innerHTML;
        const summaryContent = document.querySelector('.summary-column .content').innerHTML;

        notePages[currentPage] = {
            cueColumn: cueContent,
            notesColumn: notesContent,
            summaryColumn: summaryContent
        };
    }

    // Load page content
    function loadPage(pageIndex) {
        const page = notePages[pageIndex];
        document.querySelector('.cue-column .content').innerHTML = page.cueColumn;
        document.querySelector('.notes-column .content').innerHTML = page.notesColumn;
        document.querySelector('.summary-column .content').innerHTML = page.summaryColumn;
        pageNumberSpan.textContent = `Page ${pageIndex + 1}`;
        
        // Update navigation buttons
        prevPageBtn.disabled = pageIndex === 0;
        nextPageBtn.disabled = pageIndex === notePages.length - 1;
    }

    // Event Listeners
    newPageBtn.addEventListener('click', () => {
        saveCurrentPage();
        notePages.push({
            cueColumn: '',
            notesColumn: '',
            summaryColumn: ''
        });
        currentPage = notePages.length - 1;
        loadPage(currentPage);
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            saveCurrentPage();
            currentPage--;
            loadPage(currentPage);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < notePages.length - 1) {
            saveCurrentPage();
            currentPage++;
            loadPage(currentPage);
        }
    });

    // Auto-save when content changes
    const contentDivs = document.querySelectorAll('.content');
    contentDivs.forEach(div => {
        div.addEventListener('input', () => {
            saveCurrentPage();
            // Save to localStorage or your preferred storage method here
        });
    });

    // Initialize the first page
    loadPage(0);
});