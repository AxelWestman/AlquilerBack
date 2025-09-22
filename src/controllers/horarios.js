import conectsql from '../config/configsql.js';
import https from 'https';
import bcrypt from 'bcrypt';
//import multer from 'multer';
import path from 'path';
import fs from 'fs';

const controller = {

    getBloquesHorarios: async (req, res) => {
        let connection;

    try {
      connection = await conectsql();
      const [rows] = await connection.execute("SELECT * FROM bloques_horarios");

      if (rows.length > 0) {
        res.json({
          status: "success",
          data: rows,
        });
      } else {
        res.json({
          status: "success",
          data: "No hay horarios registrados todavía.",
        });
      }
    } catch (error) {
      console.error("Error al obtener los horarios:", error);
      res.status(500).json({
        status: "error",
        message: "Error al obtener los horarios",
        error,
      });
    } finally {
      if (connection) {
        connection.close();
        console.log("Conexión cerrada");
      }
    }
    },

    registroBloqueHorario: async (req, res) => {
        let params = req.body;
        if(!params.hora_inicio || !params.hora_fin){
            res.json({
            status: "error",
            message: "Faltan datos para la creación de un bloque horario",
          });
        } else{
            let connection;
            try{
                connection = await conectsql();
                const [result] = await connection.execute(
              `INSERT INTO bloques_horarios (hora_inicio, hora_fin) VALUES (?, ?)`,
              [
                params.hora_inicio,
                params.hora_fin
              ]
            );
            return res.json({
              status: "success",
              message: "Se ha registrado el horario exitosamente!",
            });
            } catch(error){
                res.status(500).json({
              status: "error",
              message: "Error al registrar el horario..." + error,
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