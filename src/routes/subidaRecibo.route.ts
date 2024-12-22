import express from 'express'
import { subirRecibo } from '../Controller/subidaRecibo.controller'
import upload from '../services/multer'

const routerRecibo = express.Router()

routerRecibo.post('/subirRecibo', upload.single('recibo') , subirRecibo)

export default routerRecibo