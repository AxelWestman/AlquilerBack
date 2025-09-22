import conectsql from '../config/configsql.js';
import https from 'https';
import bcrypt from 'bcrypt';
//import multer from 'multer';
import path from 'path';
import fs from 'fs';

const controller = {

    verficarReserva: async(req, res) => {
      let canchaId = req.query.canchaId;
      let bloque_horario_id = req.query.bloque_horario_id;
      let fecha = req.query.fecha;

      if (!canchaId || !bloque_horario_id || !fecha) {
        res.json({
          status: "error",
          message: "Faltan datos para verificar la reserva",
        });
      } else {
        let connection;
        try {
          connection = await conectsql();
          const [rows] = await connection.execute(
            `SELECT * FROM reservas WHERE cancha_id = ? AND bloque_horario_id = ? AND fecha = ?`,
            [canchaId, bloque_horario_id, fecha]
          );
          if (rows.length > 0) {
            res.json({
              status: "success",
              data: rows,
            });
          } else {
            res.json({
              status: "success",
              data: "No hay reserva para esta cancha y este horario todavía.",
            });
          }
        } catch (error) {
          res.status(500).json({
            status: "error",
            message: "Error al obtener la verificacion de la reserva... " + error,
            error,
          });
        } finally {
          if (connection) {
            connection.close();
            console.log("Conexión cerrada");
          }
        }
      }
    },

    realizarReserva: async (req, res) => {
        let params = req.body;

        if(!params.cancha_id || !params.usuario_id || !params.bloque_horario_id || !params.fecha){
            res.json({
          status: "error",
          message: "Faltan datos para realizar la reserva",
            });
        }
        else{
            let connection; 
            try{
                connection = await conectsql();
                const [result] = await connection.execute(
              `INSERT INTO reservas (cancha_id, usuario_id, bloque_horario_id, fecha) VALUES (?, ?, ?, ?)`,
              [
                params.cancha_id,
                params.usuario_id,
                params.bloque_horario_id,
                params.fecha
              ]
            );
            return res.json({
              status: "success",
              message: "Se ha registrado la reserva exitosamente!",
                });
            }
            catch(error){
                res.status(500).json({
              status: "error",
              message: "Error al registrar la reserva..." + error,
              error: error,
            });
            }
            finally {
            if (connection) {
              connection.close();
              console.log("Conexión cerrada");
            }
          }
        }
    }

}

export default controller;