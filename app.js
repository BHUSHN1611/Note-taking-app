let notes = []
let editingNoteId = null

function loadNotes() {
  const savedNotes = localStorage.getItem('quickNotes')
  return savedNotes ? JSON.parse(savedNotes) : []
}
function saveNote(event) {
  event.preventDefault()

  const thumbnailUrl = getVideoThumnailUrl()

  const title = document.getElementById('noteTitle').value.trim();
  const content = document.getElementById('noteContent').value.trim();
  const youtubeUrl = document.getElementById('noteReference').value.trim()

  if(editingNoteId) {
    // Update existing Note

    const noteIndex = notes.findIndex(note => note.id === editingNoteId)
    notes[noteIndex] = {
      ...notes[noteIndex],
      title: title,
      content: content
    }

  } else {
    // Add New Note
    notes.unshift({
      id: generateId(),
      title: title,
      content: content,
      thumbnailUrl:thumbnailUrl,
      youtubeUrl:youtubeUrl
    })
  }

  console.log(notes)
  closeNoteDialog()
  saveNotes()
  renderNotes()
}
function getVideoThumnailUrl() {
  const link = document.getElementById('noteReference').value.trim();

  // Remove spaces from pasted link
  const cleanedLink = link.replace(/\s+/g, "");

  // Reset preview
  // preview.innerHTML = "";

  try {
    const url = new URL(cleanedLink);
    let videoId = null;

    // Case 1: https://youtu.be/VIDEO_ID
    if (url.hostname === "youtu.be") {
      videoId = url.pathname.slice(1);
    }

    // Case 2: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.hostname.includes("youtube.com")) {
      videoId = url.searchParams.get("v");
    }

    if (!videoId) throw new Error("Invalid YouTube link");

    // Fallback thumbnail logic
  
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    return thumbnailUrl;
  } catch (err) {
    return "https://placehold.co/600x400/EEE/31343C?font=poppins&text=Thumbnail"
    
    
  }
}
function generateId() {
  return Date.now().toString()
}
function saveNotes() {
  localStorage.setItem('quickNotes', JSON.stringify(notes))
}
function deleteNote(noteId) {
  notes = notes.filter(note => note.id != noteId)
  saveNotes()
  renderNotes()
}

function renderNotes() {

  // const thumbnailUrl = getVideoThumnailUrl()

  const notesContainer = document.getElementById('notesContainer');
  // const thumbnail = document.getElementById("thumbnail");

  if(notes.length === 0) {
    // show some fall back elements
    notesContainer.innerHTML = `
      <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</p>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add Your First Note</button>
      </div>`
    return 
  }

  notesContainer.innerHTML = notes.map(note => `
    <div class="note-card">
      <h3 class="note-title">${note.title}</h3>
      <p class="note-content">${note.content}</p>
      <div id="preview">
      <div class="yt-card">
        <a href="${note.youtubeUrl}" target="_blank">
        <img src="${note.thumbnailUrl}" alt="YouTube Thumbnail id="thumbnail">
      </a>
      </div></div>

      <div class="note-actions">
        <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
          </svg>
        </button>
      </div>
    </div>
    `).join('') 
}
function openNoteDialog(noteId = null) {
  const dialog = document.getElementById('noteDialog');
  const titleInput = document.getElementById('noteTitle');
  const contentInput = document.getElementById('noteContent');
  const link = document.getElementById('noteReference')


  if(noteId) {
    // Edit Mode
    const noteToEdit = notes.find(note => note.id === noteId)
    editingNoteId = noteId
    document.getElementById('dialogTitle').textContent = 'Edit Note'
    titleInput.value = noteToEdit.title
    contentInput.value = noteToEdit.content
  }
  else {
    // Add Mode
    editingNoteId = null
    document.getElementById('dialogTitle').textContent = 'Add New Note'
    titleInput.value = ''
    contentInput.value = ''
    link.value = ''
  }

  dialog.showModal()
  titleInput.focus()

}

function closeNoteDialog() {
  document.getElementById('noteDialog').close()
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
  document.getElementById('themeToggleBtn').textContent = isDark ? '☀️' : '🌙'
}

function applyStoredTheme() {
  if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme')
    document.getElementById('themeToggleBtn').textContent = '☀️'
  }
}

document.addEventListener('DOMContentLoaded', function() {
  applyStoredTheme()
  notes = loadNotes()
  renderNotes()

  document.getElementById('noteForm').addEventListener('submit', saveNote)
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme)

  document.getElementById('noteDialog').addEventListener('click', function(event) {
    if(event.target === this) {
      closeNoteDialog()
    }
  })
})