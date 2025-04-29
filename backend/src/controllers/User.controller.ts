import type { Request, Response } from 'express';
import  User  from '../models/user.model';
import Team from '../models/team.model';
import UserTeam from '../models/userTeam.model';
import Project from '../models/project.model';
import { Op, where } from 'sequelize';
import { verfyJWT } from '../helpers/jwt.helper';


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
            success: true,
            data: teams,
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

  static async getAllUserTeams(req: Request, res: Response){
    try{
        const {userId} = req.query
        const jwt = req.headers.authorization?.split(' ')[1];
        const userIdFromHeader = await verfyJWT(jwt);
        const { id } = userIdFromHeader as { id: string };
        if(!userId){
            res.status(400).json({error:"El id del usuario es requerido"});
            return
        }
        if(id != userId){
            res.status(403).json({
                error:"No tienes permiso de ver este contenido"
            })
            return
        }
        const allTeams = await Team.findAll({
            where: {
              [Op.or]: [
                { userId: id }, // Equipos que creó
                { '$members.userId$': id } // Equipos donde es miembro
              ]
            },
            include: [
              {
                model: UserTeam,
                as: 'members',
                include: [
                  {
                    model: User,
                    as: 'user',
                    attributes: ['userId', 'name', 'username', 'email']
                  }
                ],
                attributes: []
              }
            ],
            attributes:['teamId','name']
          });
    
          if (!allTeams || allTeams.length === 0) {
             res.status(200).json({
              success: true,
              message: "No se encontraron equipos",
              data: []
            });
            return
          }
        res.status(200).json({
            success: true,
            data: allTeams,
        })
        return
    }catch(error){
        console.error("No se ha podudo obtener todos los equipos:"+error)
        res.status(500).json({error:"No se han podido obtener los equipos del usuario"})
        return
    }

  }

    // Obtener todos los proyectos de un usuario
  static async getUserProjects(req: Request, res: Response) {
    try {
      const { userId, page = '1', limit = '6' } = req.query;

      if (!userId) {
        res.status(400).json({ error: "El userId es obligatorio" });
        return 
      }
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const offset = (pageNum - 1) * limitNum;

      const { count, rows: projects } = await Project.findAndCountAll({
        attributes:["name", "description","projectId"],
        include: [{
            model: Team,
            as: 'teams',
            attributes: ['teamId', 'name'],
            through: { attributes: [] },
            include: [{
                model: UserTeam,
                where: { userId },
                attributes: [],
                required: true,
                include: [{
                    model: User,
                    as: 'user'  // <-- Usa el alias exacto definido en UserTeam
                }]
            }]
        }],
        limit: limitNum,
        offset: offset,
        distinct: true
    });
      const totalPages = Math.ceil(count / limitNum);

      res.status(200).json({ 
        success: true,
        data: projects, 
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
      res.status(500).json({ error: "Error al obtener los proyectos del usuario" });
      return
    }
  }

  static async getDashboardStats(req: Request, res: Response) {
    try {
        const { userId } = req.query;

        if (!userId) {
             res.status(400).json({ 
                success: false,
                error: "userId es obligatorio" 
            });
            return
        }

        // Obtener fecha de hace un mes
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // Consultas en paralelo para mejor rendimiento
        const [projects, teams, lastMonthProjects, lastMonthTeams] = await Promise.all([
            // Proyectos activos totales
            Project.count({
                include: [{
                    model: Team,
                    through: { attributes: [] },
                    include: [{
                        model: UserTeam,
                        where: { userId },
                        attributes: []
                    }]
                }],
                distinct: true
            }),
            
            // Equipos totales
            Team.count({
                include: [{
                    model: UserTeam,
                    where: { userId },
                    attributes: []
                }]
            }),
            
            // Proyectos creados en el último mes
            Project.count({
                where: {
                    createdAt: {
                        [Op.gte]: oneMonthAgo
                    }
                },
                include: [{
                    model: Team,
                    through: { attributes: [] },
                    include: [{
                        model: UserTeam,
                        where: { userId },
                        attributes: []
                    }]
                }],
                distinct: true
            }),
            
            // Equipos unidos en el último mes
            UserTeam.count({
                where: {
                    userId,
                    createdAt: {
                        [Op.gte]: oneMonthAgo
                    }
                }
            })
        ]);

        // Calcular diferencias
        const projectsDiff = projects - lastMonthProjects;
        const teamsDiff = teams - lastMonthTeams;

        // Formatear respuesta
        const stats = {
            projects: {
                title:'Proyectos',
                total: projects,
                diff: projectsDiff,
                diffText: `${projectsDiff >= 0 ? '+' : ''}${projectsDiff} desde el mes pasado`
            },
            teams: {
                title:"Equipos",
                total: teams,
                diff: teamsDiff,
                diffText: `${teamsDiff >= 0 ? '+' : ''}${teamsDiff} desde el mes pasado`
            }
        };

        res.status(200).json({
            success: true,
            data: stats
        });
        return
    } catch (error) {
        console.error("Error en getDashboardStats:", error);
        res.status(500).json({ 
            success: false,
            error: "Error al obtener estadísticas del dashboard" 
        });
        return
    }
}

static async updateUser(req: Request, res: Response) {
    try {
        const { userId } = req.query;
        const updateData = req.body;

        // Verificar que el usuario que hace la petición es el mismo que se va a modificar
        const jwt = req.headers.authorization?.split(' ')[1];
        const userIdFromHeader = await verfyJWT(jwt);
        const { id } = userIdFromHeader as { id: string };
        
        if (updateData.userId != id || id != userId) {
            res.status(403).json({ 
                success: false,
                error: "No tienes permiso para modificar este usuario" 
            });
            return 
        }

        // (protección contra escalada de privilegios)
        const protectedFields = ['role', 'token', 'verified', 'password','userId'];
        protectedFields.forEach(field => {
            if (updateData[field]) {
                delete updateData[field];
            }
        });

        if(updateData.email){
            const user = await User.findOne({ where: { email: updateData.email } })
            if(user) {
                res.status(400).json({error:"El email ingresado ya esta registrado por otro usuario"})
                return
            }
        }
        
        // Actualizar el usuario
        const [updated] = await User.update(updateData, {
            where: { userId }
        });

        if (!updated) {
            res.status(404).json({ 
                success: false,
                error: "Usuario no encontrado" 
            });
            return 
        }

        // Obtener el usuario actualizado
        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password', 'token',"createdAt","updatedAt"] }
        });

        res.status(200).json({
            success: true,
            data:updatedUser
        });
        return
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ 
            success: false,
            error: "Error al actualizar el usuario" 
        });
        return
    }

} 
}   