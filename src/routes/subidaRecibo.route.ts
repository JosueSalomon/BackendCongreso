import express from 'express'
import { subirRecibo } from '../Controller/subidaRecibo.controller'

const routerRecibo = express.Router()

routerRecibo.post('/subirRecibo', subirRecibo)

export default routerRecibo