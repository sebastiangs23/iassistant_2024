import { Request, Response } from "express";
import User from "../../models/users/usersModel.js";
import TypeUser from "../../models/users/typeUsers.js";
import CryptoJS from "crypto-js";
import jws from 'jsonwebtoken';
import 'dotenv';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { email, password } = req.params;

    const user = await User.findOne({
      email
    });

    if(user){

      const descryptedPw = CryptoJS.AES.decrypt(user.password ,'password');
      const pw = descryptedPw.toString(CryptoJS.enc.Utf8);

      if(password === pw){
        const token = jws.sign({id: user._id}, process.env.JWT_SECRET || "" ,{
          expiresIn : process.env.JWT_EXPIRES_IN,
        });


        res.json({
          token,
          status: 'success',
          message: 'Bienvenido a IAssistant!',
          id_user: user._id
        })
      }else {
        res.json({
          status: 'error',
          message: 'Contraseña incorrecta.'
        })
      }
    }else {
      res.json({
        status: 'error',
        message: 'No existe un usuario con ese correo.'
      })
    }

  } catch (error) {
    console.log(error);
    res.json({
      status: 'error',
      message: 'Error al intentar logearse!'
    })
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { form } = req.body;

    const existingEmail = await User.findOne({ email: form.email }).select(
      "email"
    );

    console.log('existingEmail: ', existingEmail);

    if (!existingEmail) {
      const idUserType = await TypeUser.findOne({ name: "user" }).select("_id");

      const passwordCrypted = CryptoJS.AES.encrypt(
        form.password,
        "password"
      ).toString();

      //const desencrypted = CryptoJS.AES.decrypt(passwordCrypted, 'password');
      //let original = desencrypted.toString(CryptoJS.enc.Utf8);

      //console.log('la clave desemcriptada: ', original)

      const user = await User.create({
        name: form.name,
        last_name: form.last_name,
        email: form.email,
        age: form.age,
        password: passwordCrypted,
        id_type_user: idUserType ? idUserType._id : null,
      });
      console.log("User created:", user);

      if (user) {
        res.json({
          status: "successfull",
          message: "El usuario fue creado exitosamente!",
        });
      } else {
        res.json({
          status: "error",
          message: "Ocurrio un error al intentar crear el usuario.",
        });
      }
    } else {
      res.json({
        status: "error",
        message: "El correo ya se encuentra en uso",
      });
    }
  } catch (error) {
    console.log('Error en el controlador createUser: ', error);

    res.json({
      status: "warning",
      message: "El correo ya se encuentro en uso",
    });
  }
}

export async function getTypeUsers(req: Request, res: Response) {
  try {
    // const typeUsers = await TypeUser.create({
    //   name: "user",
    // });
    // console.log("Se creo de manera exitosa!");
    // res.json(typeUsers);
  } catch (error) {
    console.log(error);
  }
}
