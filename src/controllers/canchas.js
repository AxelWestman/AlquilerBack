import conectsql from '../config/configsql.js';
import https from 'https';
import bcrypt from 'bcrypt';
//import multer from 'multer';
import path from 'path';
import fs from 'fs';

const controller = {
  
  //registrar cancha
  registroCancha: async (req, res) => {
    let params = req.body;
    if (!params.nombre || params.nombre === "") {
      res.json({
        status: "error",
        message: "Inserte el nombre de la cancha para identificarla",
      });
    } else {
      let connection;
      try {
        connection = await conectsql();
        const [result] = await connection.execute(
          `INSERT INTO canchas (nombre, ubicacion, descripcion, tipo, precio_por_hora) VALUES (?, ?, ?, ?, ?)`,
          [
            params.nombre,
            params.ubicacion,
            params.descripcion,
            params.tipo,
            params.precio_por_hora,
          ]
        );
        return res.json({
          status: "success",
          message: "Se ha registrado la cancha exitosamente!",
        });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Error al registrar la cancha..." + error,
          error: error,
        });
      } finally {
        if (connection) {
          connection.close();
          console.log("Conexión cerrada");
        }
      }
    }
  },

  //obtener todas las canchas
  obtenerCanchas: async (req, res) => {
     let connection;

    try {
      connection = await conectsql();
      const [rows] = await connection.execute("SELECT * FROM canchas");

      if (rows.length > 0) {
        res.json({
          status: "success",
          data: rows,
        });
      } else {
        res.json({
          status: "success",
          data: "No hay canchas registradas todavía.",
        });
      }
    } catch (error) {
      console.error("Error al obtener las canchas:", error);
      res.status(500).json({
        status: "error",
        message: "Error al obtener las canchas",
        error,
      });
    } finally {
      if (connection) {
        connection.close();
        console.log("Conexión cerrada");
      }
    }
  },

};

export default controller;