const addBtn = document.getElementById("add")
const editBtn = document.getElementById("edit")
let notes = document.querySelectorAll(".notes")
const noteHeader = document.getElementById("note-header")
const noteContent = document.getElementById("note-content")
let theLastOne

const savedNotes = {}

function lookForEnter(event){
  let x = event.key
  if(x == "Enter"){
    event.target.blur()
  }
}
notes.forEach((each) => {
  each.addEventListener("click", function(){
    noteClick(each) 
  })
})
function noteClick(each, status = "saved", editable = false){
  if(theLastOne){theLastOne.classList.remove("selected")}
  if(!theLastOne){noteContent.classList.remove("default")}
  each.classList.add("selected")
  theLastOne = each
  if(status === "saved"){
    editBtn.style.display = "flex"
    noteHeader.innerHTML = savedNotes[each.id]["header"]
    noteContent.innerHTML = contentCheck(savedNotes[each.id]["content"])
  }
  if(status === "new"){
    //header
    let headerInput = document.createElement("input")
    headerInput.setAttribute("type", "text")
    headerInput.setAttribute("placeholder", "Add a Header")
    headerInput.setAttribute("onkeypress", "lookForEnter(event)")
    headerInput.value = editable ? savedNotes[each.id]["header"] : ""
    noteHeader.innerHTML = ""
    noteHeader.appendChild(headerInput)
    headerInput.focus()
    let contentInput = document.createElement("textarea")
    headerInput.addEventListener("blur", function(){
      if(headerInput.value == ""){
        headerInput.value = each.textContent
      }
      savedNotes[each.id]["header"] = headerInput.value
      noteHeader.removeChild(headerInput)
      noteHeader.innerHTML = savedNotes[each.id]["header"]
      each.textContent = savedNotes[each.id]["header"]
      contentInput.focus()
    })
    //content
    noteContent.innerHTML = ""
    contentInput.setAttribute("placeholder", "Type something...")
    contentInput.value = editable ? savedNotes[each.id]["content"] : ""
    noteContent.appendChild(contentInput)
    contentInput.addEventListener("blur", function(){
      noteContent.appendChild(contentInput)
      savedNotes[each.id]["content"] = contentInput.value
      noteContent.innerHTML = contentCheck(savedNotes[each.id]["content"])
    })
  }
}
function contentCheck(content){
  return content.replace(/\n/g, "<br>")
}
addBtn.addEventListener("click", ()=>{
  editBtn.style.display = "none"
  createNote()
})
function createNote(){
  let myArray = Array.from(document.getElementsByClassName("notes"))

  //creating div.notes element
  let note = document.createElement("div")
  note.setAttribute("class", "notes selected")
  note.setAttribute("id", "note" + (myArray.length+1).toString())
  note.textContent = "note " + (myArray.length+1).toString()
  note.addEventListener("click", function(){ noteClick(note) })
  savedNotes[note.id] = {
    "header" : "Header",
    "content" : "Type something..."
  }
  document.querySelector(".notes-list").appendChild(note)
  noteClick(note, "new")
}
editBtn.addEventListener("click", function(){
  noteClick(theLastOne, "new", true)
})