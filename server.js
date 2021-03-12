const express = require('express')
const socketIo = require("socket.io")

const app = express()
const http = require('http').createServer(app)
const io = socketIo(http)

io.on('connection', socket => {
    const username = socket.handshake.query.username
    console.log(username, 'has connected!')

    socket.on('disconnect', () => {
        console.log(username, 'has disconnected')
    })

    socket.on('chat message', msg => {
        // send the message to all the other connected clients
        console.log(`${username} says: ${msg.content}`)
        io.emit('chat message', msg)
    })

    socket.on('clear-display', () => {
        io.emit('clear-display')
    })

    socket.on('add-circle', data => {
        io.emit('add-circle', data)
    })
})


const PORT = process.env.PORT || 3030
http.listen(PORT, () => {
    console.log('listening on port', PORT)
})