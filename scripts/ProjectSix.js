const addBtn = document.getElementById("addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener("click", function () {
    addNote();
});

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="tool">
            <ion-icon class="save" name="save"></ion-icon>
            <ion-icon class="trash" name="trash"></ion-icon>
        </div>
        <textarea>${text}</textarea>
    `;

    note.querySelector(".trash").addEventListener("click", function () {
        note.remove();
        saveNotes();
    });
    
    note.querySelector(".save").addEventListener("click", function () {
        saveNotes();
    });

    note.querySelector("textarea").addEventListener("focusout", function() {
        saveNotes();
    });

    main.appendChild(note);
    saveNotes();
};

// Self-invoking function to load saved notes from localStorage
(function () {
    const LsNotes = JSON.parse(localStorage.getItem("notes")) || [];

    LsNotes.forEach((lsnote) => {
        addNote(lsnote);
    });

    if (LsNotes.length === 0) {
        addNote();
    }
})();
