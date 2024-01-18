function delete_all()
{
    localStorage.clear()
    document.querySelectorAll('.note').forEach(element => {
        element.remove()
    })
}
document.querySelector('#newnote').addEventListener('click',()=>{
    let mytitle = document.querySelector('.title').value
    let summary = document.querySelector('textarea').value
    if(mytitle=="" || summary=="")
    {
        alert('Values are must enter ')
    }
    else
    {
    let uniqueID = 'note'+Math.floor(Math.random()*1000)
    console.log(uniqueID)
    let note =
    {
        title:mytitle,
        summary:summary,
    }
    addtolocalstorage(note,uniqueID) 
    create_note(note,uniqueID)

    }
})

let mynotes=[]
function addtolocalstorage(note,uniqueID)
{
    let notes = {...note,uniqueID}
    mynotes.push(notes)
    localStorage.setItem("notes",JSON.stringify(mynotes))
}

function create_note(note,uniqueID)
{
    let mydiv = document.createElement('div')
    mydiv.classList.add('note',uniqueID)
    let mytit = document.createElement('h4')
    mytit.textContent = note.title
    mydiv.append(mytit)
    let mysummary = document.createElement('p')
    mysummary.innerText = note.summary
    mydiv.append(mysummary)
    let mybtn = document.createElement('button')
    mybtn.textContent='Delete Note'
    mybtn.className='delete-btn'
    mydiv.append(mybtn)
    document.querySelector('.notesdisplay').append(mydiv);
    document.querySelector('.title').value=""
    document.querySelector('textarea').value=""
    mybtn.addEventListener('click',()=>{
       deletesinglenote(uniqueID)
    })
}
function render_note(note)
{
    let mydiv = document.createElement('div')
    mydiv.classList.add('note',note.uniqueID)
    let mytit = document.createElement('h4')
    mytit.textContent = note.title
    mydiv.append(mytit)
    let mysummary = document.createElement('p')
    mysummary.innerText = note.summary
    mydiv.append(mysummary)
    let mybtn = document.createElement('button')
    mybtn.textContent='Delete Note'
    mybtn.className='delete-btn'
    mydiv.append(mybtn)
    document.querySelector('.notesdisplay').append(mydiv);
    mybtn.addEventListener('click',()=>{
       deletesinglenote(note.uniqueID)
    })
}
function deletesinglenote(id)
{
    document.querySelector('.'+id).remove()
    mynotes = JSON.parse(localStorage.getItem('notes'))
    console.log(mynotes)
    let index = mynotes.findIndex(note=>note.uniqueID == id) //findIndex(note=>note.uniqueID == id)
    mynotes.splice(index,1)
    localStorage.setItem("notes",JSON.stringify(mynotes))
}

if(localStorage.getItem('notes'))
    {
        mynotes = JSON.parse(localStorage.getItem('notes'))
        mynotes.forEach(element=>{
        render_note(element)


        })
    }