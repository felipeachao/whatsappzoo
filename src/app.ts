import express, { Request, Response } from "express"
import { send } from "process";
import Sender from "./sender";

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger/swagger_output.json')

const sender = new Sender()

const app = express()

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/status', (req: Request, res: Response) => {
    return res.send({
        qr_code: sender.qrCode,
        connected: sender.isConnected,
    })
})

app.post('/send', async (req: Request, res: Response) => {
    const { number, path } = req.body
    
    try{
        await sender.sendImage(number + '@c.us', path)
        return res.status(200).json()
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', message: error })
    }
    /*
    #swagger.description = 'Rota para enviar imagem para o número do Usuário'
    */
    
    /* 
    #swagger.responses[001] = {
        description: 'number',
        schema: { $ref: '#/definitions/number' }
    }
    #swagger.responses[002] = {
        description: 'path',
        schema: { $ref: '#/definitions/path' }
    }
    */
})

app.listen(3000, () => {
    console.log('server started')
})