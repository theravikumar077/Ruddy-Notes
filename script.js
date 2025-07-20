const addBtn = document.getElementById('add-note-btn');
const modal = document.getElementById('note-modal');
const saveBtn = document.getElementById('save-note');
const closeBtn = document.getElementById('close-modal');
const noteInput = document.getElementById('note-input');
const notesContainer = document.getElementById('notes-container');
const toggleThemeBtn = document.getElementById('toggle-theme');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.className = `note ${note.color}`;
    noteDiv.innerHTML = `
      <p contenteditable="true" onblur="updateNote(${index}, this.innerText)">${note.text}</p>
      <button onclick="deleteNote(${index})">x</button>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

function saveNote() {
  const text = noteInput.value.trim();
  if (text) {
    const colors = ['orange', 'yellow', 'blue'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    notes.push({ text, color });
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    noteInput.value = '';
    modal.style.display = 'none';
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

function updateNote(index, newText) {
  notes[index].text = newText;
  localStorage.setItem('notes', JSON.stringify(notes));
}

addBtn.onclick = () => modal.style.display = 'flex';
closeBtn.onclick = () => modal.style.display = 'none';
saveBtn.onclick = saveNote;

toggleThemeBtn.onclick = () => {
  document.body.classList.toggle('dark');
  renderNotes();
};

renderNotes();
