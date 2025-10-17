document.addEventListener('DOMContentLoaded', () => {
    let notePages = [];
    let currentPage = 0;

    // DOM Elements
    const newPageBtn = document.getElementById('newPageBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageNumberSpan = document.getElementById('pageNumber');
    const notePage = document.getElementById('notePage');

    // Load saved pages from localStorage
    const savedPages = localStorage.getItem('cornellNotes');
    if (savedPages) {
        notePages = JSON.parse(savedPages);
        loadPage(0);
    }

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
        const className = document.getElementById('className').value;
        const lessonTopic = document.getElementById('lessonTopic').value;
        const noteDate = document.getElementById('noteDate').value;

        notePages[currentPage] = {
            cueColumn: cueContent,
            notesColumn: notesContent,
            summaryColumn: summaryContent,
            metadata: {
                className,
                lessonTopic,
                noteDate
            }
        };
    }

    // Load page content
    function loadPage(pageIndex) {
        const page = notePages[pageIndex];
        document.querySelector('.cue-column .content').innerHTML = page.cueColumn;
        document.querySelector('.notes-column .content').innerHTML = page.notesColumn;
        document.querySelector('.summary-column .content').innerHTML = page.summaryColumn;
        
        // Load metadata
        if (page.metadata) {
            document.getElementById('className').value = page.metadata.className || '';
            document.getElementById('lessonTopic').value = page.metadata.lessonTopic || '';
            document.getElementById('noteDate').value = page.metadata.noteDate || '';
        }
        
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
            summaryColumn: '',
            metadata: {
                className: document.getElementById('className').value,
                lessonTopic: document.getElementById('lessonTopic').value,
                noteDate: new Date().toISOString().split('T')[0]
            }
        });
        currentPage = notePages.length - 1;
        loadPage(currentPage);
        localStorage.setItem('cornellNotes', JSON.stringify(notePages));
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
            localStorage.setItem('cornellNotes', JSON.stringify(notePages));
        });
    });

    // Save metadata changes
    const metadataInputs = document.querySelectorAll('.metadata-group input');
    metadataInputs.forEach(input => {
        input.addEventListener('change', () => {
            saveCurrentPage();
            localStorage.setItem('cornellNotes', JSON.stringify(notePages));
        });
    });

    // Initialize first page if no saved pages exist
    if (notePages.length === 0) {
        notePages.push({
            cueColumn: '',
            notesColumn: '',
            summaryColumn: '',
            metadata: {
                className: '',
                lessonTopic: '',
                noteDate: new Date().toISOString().split('T')[0]
            }
        });
        loadPage(0);
    }

    // PDF Download functionality
    downloadBtn.addEventListener('click', async () => {
        // Save current page before downloading
        saveCurrentPage();
        
        // Create a clone of the note page for PDF generation
        const pdfContent = notePage.cloneNode(true);
        
        // Add some styling for better PDF output
        const style = document.createElement('style');
        style.textContent = `
            .note-page {
                padding: 20px;
                background: white;
            }
            .content {
                border: 1px solid #ccc;
                margin-bottom: 10px;
                min-height: 0;
            }
            .section-header {
                margin-bottom: 10px;
            }
        `;
        pdfContent.appendChild(style);

        // Generate filename based on metadata
        const className = document.getElementById('className').value || 'Untitled';
        const lessonTopic = document.getElementById('lessonTopic').value || 'Notes';
        const date = document.getElementById('noteDate').value || new Date().toISOString().split('T')[0];
        const filename = `${className}-${lessonTopic}-${date}.pdf`;

        // PDF generation options
        const options = {
            margin: 10,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            // Generate PDF
            await html2pdf().from(pdfContent).set(options).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('There was an error generating the PDF. Please try again.');
        }
    });

    // Initialize the first page
    loadPage(0);
});