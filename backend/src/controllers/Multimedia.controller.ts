import { Request, Response } from 'express';
import Content from '../models/content.model';
import ContentType from '../models/contentType.model';
import ContentFile from '../models/contentFile.model';
import { verfyJWT } from '../helpers/jwt.helper';
import { Op } from 'sequelize';

export class MultimediaController {


    // Crear nuevo tipo de contenido (solo admin/profesor)
    static async createContentType(req: Request, res: Response) {
        try {

            const { name } = req.body;
            if (!name) {
               res.status(400).json({ error: "El nombre del tipo de contenido es requerido" });
               return 
            }

            const newContentType = await ContentType.create({ name });
            res.status(201).json({
                success: true,
                data: newContentType
            });
            return 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al crear el tipo de contenido" });
            return 
        }
    }

    // Obtener todos los tipos de contenido
    static async getContentTypes(req: Request, res: Response) {
        try {
            const contentTypes = await ContentType.findAll();
            res.status(200).json({
                success: true,
                data: contentTypes
            });
            return 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener los tipos de contenido" });
            return 
        }
    }

    // Crear nuevo contenido multimedia (solo admin/profesor)
    static async createContent(req: Request, res: Response) {
        try {

            const { title, description, typeId } = req.body;
            if (!title || !typeId) {
                res.status(400).json({ error: "El título y tipo de contenido son requeridos" });
                return 
            }

            const newContent = await Content.create({
                title,
                description: description || null,
                typeId
            });

            res.status(201).json({
                success: true,
                data: newContent
            });
            return 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al crear el contenido" });
            return 
        }
    }

    // Agregar archivos a un contenido (solo admin/profesor)
    static async addContentFiles(req: Request, res: Response) {
        try {

            const { contentId } = req.params;
            const { files } = req.body; // Array de URIs

            if (!contentId || !files || !Array.isArray(files)) {
                res.status(400).json({ error: "Se requiere contentId y un array de archivos" });
                return 
            }

            // Verificar que el contenido existe
            const content = await Content.findByPk(contentId);
            if (!content) {
                res.status(404).json({ error: "Contenido no encontrado" });
                return 
            }

            // Crear los archivos
            const createdFiles = await Promise.all(
                files.map(async (fileURI) => {
                    await ContentFile.create({
                        contentId: parseInt(contentId),
                        contentURI: fileURI
                    });
                    return 
                })
            );

            return res.status(201).json({
                success: true,
                data: createdFiles
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al agregar archivos al contenido" });
            return 
        }
    }

    // Obtener contenido con sus archivos
    static async getContentWithFiles(req: Request, res: Response) {
        try {
            const { contentId } = req.params;
            if (!contentId) {
                res.status(400).json({ error: "contentId es requerido" });
                return 
            }

            const content = await Content.findByPk(contentId, {
                include: [
                    {
                        model: ContentType,
                        attributes: ['typeId', 'name']
                    },
                    {
                        model: ContentFile,
                        attributes: ['contentFileId', 'contentURI']
                    }
                ]
            });

            if (!content) {
                res.status(404).json({ error: "Contenido no encontrado" });
                return 
            }

            res.status(200).json({
                success: true,
                data: content
            });
            return 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener el contenido" });
            return 
        }
    }

    // Eliminar contenido (solo admin/profesor)
    static async deleteContent(req: Request, res: Response) {
        try {

            const { contentId } = req.params;
            if (!contentId) {
                res.status(400).json({ error: "contentId es requerido" });
                return 
            }

            // Eliminar primero los archivos asociados
            await ContentFile.destroy({
                where: { contentId }
            });

            // Luego eliminar el contenido
            const deleted = await Content.destroy({
                where: { contentId }
            });

            if (!deleted) {
                res.status(404).json({ error: "Contenido no encontrado" });
                return 
            }

            res.status(200).json({
                success: true,
                message: "Contenido eliminado correctamente"
            });
            return 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al eliminar el contenido" });
            return 
        }
    }
}