import type { Request, Response } from 'express';
import  User  from '../models/user.model';
import Team from '../models/team.model';
import UserTeam from '../models/userTeam.model';
import Project from '../models/project.model';

export class UserController {

    static getUserByID(){

    }
    
    static async getUserTeams(req: Request, res: Response) {
      try {
          const { userId, page = '1', limit = '6' } = req.query;
          
          if (!userId) {
              res.status(400).json({ error: "userId es obligatorio" });
              return 
          }
  
          const pageNum = parseInt(page as string);
          const limitNum = parseInt(limit as string);
          const offset = (pageNum - 1) * limitNum;
  
          // Consulta para obtener los equipos paginados
          const { count, rows: teams } = await Team.findAndCountAll({
              include: [
                  {
                      model: UserTeam,
                      where: { userId },
                      attributes: [],
                      required: true
                  },
                  {
                      model: UserTeam,
                      as: 'members',
                      include: [
                          {
                              model: User,
                              attributes: ["username"],
                              as: 'user'
                          }
                      ],
                      attributes: ["userId"]
                  }
              ],
              attributes: ["teamId", "name", "description", "teamCodeId"],
              limit: limitNum,
              offset: offset,
              distinct: true // Importante para el conteo correcto con includes
          });
  
          const totalPages = Math.ceil(count / limitNum);
  
          res.status(200).json({ 
              teams,
              pagination: {
                  currentPage: pageNum,
                  totalPages,
                  totalItems: count,
                  itemsPerPage: limitNum
              }
          });
          return
          
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al obtener los equipos del usuario" });
          return
      }
  }

    // Obtener todos los proyectos de un usuario
  static async getUserProjects(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ error: "El userId es obligatorio" });
        return 
      }

      const projects = await Project.findAll({
        where: { userId },
        include: [{ model: Team, through: { attributes: [] } }],
      });

      res.status(200).json({ projects });
      return
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los proyectos del usuario" });
      return
    }
  }
      
}