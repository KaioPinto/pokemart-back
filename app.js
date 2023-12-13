require("express-async-errors")
const express = require('express')
require('./config/database')
const itenRouter = require('./src/routes/itenRouter')
const userRouter = require('./src/routes/userRouter')
const auth = require('./src/middlewares/auth')
const AppError = require("./src/errors/AppError")
const http = require('http')
const cors = require('cors');
const socketIo = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketIo(server, {})

io.on('connection', socket => {
    socket.on('chat', (msg) => {
        console.log(msg)
        io.emit('chat', msg)

    })
    socket.on('disconnect', () => {
        console.log("Desconectado")
    })
})

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json({ limit: '15mb' }))
app.use(auth)
app.use(itenRouter)
app.use(userRouter)

const corsOptions = {
    origin: 'http://10.5.1.171:8081',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions))


const erroHandling = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    if (err instanceof AppError) {
        return res.status(statusCode).json({
            erro: err.message
        });
    }

    return res.status(statusCode).json({
        erro: err.message
    });
};

app.use(erroHandling)
server.listen(3000, () => { console.log("Conectados a porta 3000") })
