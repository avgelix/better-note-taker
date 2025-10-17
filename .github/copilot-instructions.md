# AI Coding Agent Instructions for Better Note Taker

## Project Overview
Better Note Taker is a web-based implementation of the Cornell Note-Taking System. It's a single-page application built with vanilla JavaScript, HTML, and CSS that allows users to create and manage multiple pages of structured notes.

## Architecture & Components

### Core Components
- **Page Management**: Implemented in `script.js` using the `notePages` array to store multiple pages of notes
- **Three-Column Layout**: Each note page consists of:
  - Cue Column (left) - For main ideas and questions
  - Notes Column (middle) - For primary lecture notes
  - Summary Column (bottom) - For post-lecture summary
- **Navigation System**: Handles page traversal with Previous/Next buttons and page counting

### Data Structure
Notes are stored in memory using the following format:
```javascript
{
    cueColumn: string,
    notesColumn: string,
    summaryColumn: string
}
```

## Key Files
- `index.html` - Core structure and Cornell note-taking layout
- `script.js` - Page management and event handling
- `styles.css` - Responsive layout and visual styling with CSS Grid

## Development Patterns

### State Management
- Page state is managed through the `notePages` array
- Current page state is saved before navigation using `saveCurrentPage()`
- Page content is loaded via `loadPage(pageIndex)`

### Event Handling
Navigation and content updates are handled through event listeners on:
- New Page button (`newPageBtn`)
- Previous/Next navigation buttons
- Contenteditable div elements for note input

### UI/UX Conventions
- Interactive elements use the 'Inter' font family
- Colors follow a specific palette:
  - Primary actions: `#3498db`
  - Text: `#2c3e50`
  - Backgrounds: `#f5f5f5` (body), `#fff` (header)
- Consistent spacing using rem units
- Responsive design with CSS Grid

## Integration Points
- Google Fonts API for the 'Inter' typeface
- LocalStorage integration could be added for persistence (currently in-memory only)

## Development Workflow
1. Make changes to HTML structure in `index.html`
2. Update corresponding styles in `styles.css`
3. Implement functionality in `script.js`
4. Test in browser with different viewport sizes

When making changes, ensure:
- Contenteditable areas maintain their placeholder text
- Navigation state (Previous/Next buttons) updates correctly
- Page numbers display accurately