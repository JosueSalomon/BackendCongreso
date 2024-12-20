"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcionpruebaparametro = exports.funcionprueba = void 0;
const prueba_model_1 = require("../models/prueba.model");
const funcionprueba = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield prueba_model_1.prueba.funcionprueba();
        res.status(201).json({
            resultado
        });
    }
    catch (error) {
        console.log('error con fetch ', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.funcionprueba = funcionprueba;
const funcionpruebaparametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultado = yield prueba_model_1.prueba.funcionPruebaParametro(Number(id));
        res.status(201).json({
            resultado
        });
    }
    catch (error) {
        console.log('error con fetch ', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.funcionpruebaparametro = funcionpruebaparametro;
