import conectsql from '../config/configsql.js';
import https from 'https';
import bcrypt from 'bcrypt';
//import multer from 'multer';
import path from 'path';
import fs from 'fs';

const controller = {
  //obtener todos los usuarios
  getUsuarios: async (req, res) => {
    let connection;

    try {
      connection = await conectsql();
      const [rows] = await connection.execute("SELECT * FROM usuarios");

      if (rows.length > 0) {
        res.json({
          status: "success",
          data: rows,
        });
      } else {
        res.json({
          status: "success",
          data: "No hay usuarios registrados todavía.",
        });
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).json({
        status: "error",
        message: "Error al obtener los usuarios",
        error,
      });
    } finally {
      if (connection) {
        connection.close();
        console.log("Conexión cerrada");
      }
    }
  },

  //añadir usuario
  addUsuario: async (req, res) => {
    let params = req.body;
    console.log(params);
    const saltRounds = 10;

    if (
      params.nombre &&
      params.apellido &&
      params.celular &&
      params.email &&
      params.password
    ) {
      let connection;

      try {
        connection = await conectsql();
        const hashedPassword = await bcrypt.hash(params.password, saltRounds);
        const [result] = await connection.execute(
          `INSERT INTO usuarios (nombre, apellido, celular, email, id_rol, password) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            params.nombre,
            params.apellido,
            params.celular,
            params.email,
            2,
            hashedPassword,
          ]
        );
        return res.json({
          status: "success",
          message: "Se ha registrado exitosamente!",
        });
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({
          status: "error",
          message: "Error al registrar los usuarios",
          error: error,
        });
      } finally {
        if (connection) {
          connection.close();
          console.log("Conexión cerrada");
        }
      }
    } else {
      res.json({
        status: "error",
        message: "Faltan enviar datos",
      });
    }
  },

  login: async (req, res) => {
    let params = req.body;
    if (params.email && params.password) {
      let connection;
      try {
        connection = await conectsql();
        const [rows] = await connection.execute(
          "SELECT email, password FROM usuarios WHERE email = ?",
          [params.email]
        );
        if (rows.length > 0 && rows[0].email === params.email) {
          const match = await bcrypt.compare(params.password, rows[0].password);
          if (match) {
            res.json({
              status: "success",
              data: "Usted ha sido logueado exitosamente",
            });
          } else {
            res.json({
              status: "error",
              message: "Contraseña incorrecta, intente nuevamente",
            });
          }
        } else {
          res.status(500).json({
            status: "error",
            message: "No se ha encontrado el usuario",
          });
        }
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: "Error",
          error: error.message,
        });
      }
    } else {
      res.json({
        status: "error",
        message: "Faltan datos",
      });
    }
  },
};
export default controller;