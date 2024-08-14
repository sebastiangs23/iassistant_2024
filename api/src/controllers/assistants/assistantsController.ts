import { Request, Response } from "express";
import Assistant from "../../models/assistant/assistant.js";
import mongoose from "mongoose";
import OpenAI from "openai";
import "dotenv/config.js";

const api = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: api
});

export async function getAssistantsUser(req: Request, res: Response) {
  try {
    const { id_user } = req.params;
    console.log(id_user);
    const assistants = await Assistant.find({
      id_user: new mongoose.Types.ObjectId(id_user),
    });

    res.json({
      status: "success",
      assistants,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "Hubo un error al intentar traer a los asistentes.",
    });
  }
}

export async function createAssistant(req: Request, res: Response) {
  try {
    const { data } = req.body;
    console.log(data);

    const assistant = await Assistant.create({
      name: data.name,
      id_user: data.id_user,
      speciality: data.speciality,
    });

    //validaciones

    res.json({
      status: "successfull",
      message: "Asistente creado de manera exitosa!",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function askAssistant(req: Request, res: Response) {
    try {
      const { _id, initial, conversationHistory } = req.body;
  
      console.log(req.body);
  
      let messages: Array<{ role: "system" | "user"; content: string }> = [];
  
      // Si es la primera interacción
      if ((!conversationHistory || conversationHistory.length === 0) && initial) {
        const assistant = await Assistant.findOne({
          _id: new mongoose.Types.ObjectId(_id),
        });
  
        console.log(assistant);
  
        // Construir el mensaje inicial
        messages = [
          {
            role: "user",
            content: `Hola, necesito tu ayuda como especialista en ${assistant?.speciality}. Mi primera pregunta es: ${initial}`,
          },
        ];
      } else if (conversationHistory && conversationHistory.length > 0) {
        // Continuar con la conversación existente
        messages = [
          ...conversationHistory,
          {
            role: "user",
            content: initial, // Este debería ser el nuevo mensaje del usuario
          },
        ];
      } else {
        res.status(400).json({ message: "No se recibió mensaje inicial ni historial de conversación" });
        return;
      }
  
      // Enviamos los mensajes a la API de OpenAI para obtener la respuesta
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        stream: true,
      });
  
      let chat_gpt_answer = "";
  
      // Recolectamos la respuesta del modelo GPT
      for await (const chunk of stream) {
        const context = chunk.choices[0]?.delta?.content || "";
        if (context) {
          chat_gpt_answer += context;
        }
      }
  
      // Agregamos la respuesta de ChatGPT a la conversación
      messages.push({
        role: "system",
        content: chat_gpt_answer,
      });
  
      // Guardamos la conversación actualizada en la base de datos
      await Assistant.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(_id) },
        { $push: { conversation: { $each: messages } } }  // Añadimos los nuevos mensajes al historial de conversación existente
      );
  
      console.log({ system: chat_gpt_answer });
      res.json({ system: chat_gpt_answer });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function updateAssistant(req: Request, res: Response){
    try{
        const { data } = req.body;

        console.log('data --> ', data);

        const assistant = await Assistant.updateOne({
            _id: new mongoose.Types.ObjectId(data._id),
        }, {
            name: data.name
        });

        res.json({
            status: 'success',
            message: 'Se actualizó de manera correcta el asistente',
        });
        
    }catch(error){
        console.log(error);
        res.json({
            status: 'error',
            message: 'Hubo un error al intentar actualizar al asistente.'
        })
    }
};

export async function deleteAssistant(req: Request, res:Response){
    try{
        const { _id  } = req.params;

        await Assistant.deleteOne({
            _id
        });

        res.json({
            status: 'success',
            message: 'Se eliminó de manera correcta el asistente.'
        });

        
    }catch(error){
        console.log(error);
        res.json({
            status: 'error',
            message: 'Hubo un error al intentar eliminar el asistente'
        })
    }
}
