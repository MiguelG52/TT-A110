import type { Request, Response } from 'express';
import  User  from '../models/user.model';
import Team from '../models/team.model';
import UserTeam from '../models/userTeam.model';

export class UserController {
    static async getUserTeams(req: Request, res: Response) {
        try {
          const { userId } = req.body; 
          if (!userId) {
            res.status(400).json({ error: "userId es obligatorio" });
            return 
          }
      
          const teams = await Team.findAll({
            include: [
              {
                model: UserTeam,
                where: { userId }, 
                attributes: [] 
              }
            ],
            attributes: ["teamId", "name", "description"] 
          });
      
          res.status(200).json({ teams });
          return
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error al obtener los equipos del usuario" });
          return
        }
      }
      
}