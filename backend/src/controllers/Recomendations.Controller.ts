

import { Request, Response } from "express";
import { createPrompt } from "../helpers/prompt";
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.API_KEY_RECOMENDATIONS
});


export class RecommendationsController {
    static async getRecommendations(req: Request, res: Response) {
        if (req.method !== 'POST'){
            res.status(405).end();
            return 
        }
        try {
            const { javaCode } = req.body;
            const decodedCode = JSON.parse(javaCode);
            const prompt = createPrompt(decodedCode);
            const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            });
            
            const response = JSON.parse(completion.choices[0].message.content || '{}');
           const processedRecs = response.recommendations?.map(rec => ({
            ...rec,
            type: rec.type || 'improvement',
            severity: rec.severity || 'medium',
            })) || [];

            res.status(200).json({
            message: "Recomendaciones generadas exitosamente",  
            data:{
                recommendations:processedRecs,
            }
            });
            return

        } catch (error) {
            console.error("Error generating recommendations:", error);
            res.status(500).json({ error: "Internal server error" });
            return
        }
    }
}