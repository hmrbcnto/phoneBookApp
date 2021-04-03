const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const currentId = Number(request.params.id)
    const filteredNotes = notes.filter(n => n.id === currentId)
    if (!filteredNotes.length){
        return response.status(400).json({
            error:"note does not exist"
        })
    }
    const note = filteredNotes[0]

    response.json(note)

})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})