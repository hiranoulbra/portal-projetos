import { QueryProjectType } from "@/core/db/db.project";
import { z } from "zod";
import momment from 'moment';

export const validateProjectQuery = (data: QueryProjectType) => {
    
    const schema = z.object({
        search: z.string().optional(),
        status: z.enum(['Não iniciado', 'Em andamento', 'Concluído', 'Cancelado']).optional(),
        start: z.object({
            start: z.string().refine((value) => {
                return momment(value).isValid();
            }).optional(),
            end: z.string().refine((value) => {
                return momment(value,'YYYY-MM-DD').isValid();
            }).optional(),
        }).optional(),
        end: z.object({
            start: z.string().refine((value) => {
                return momment(value,'YYYY-MM-DD').isValid();
            }).optional(),
            end: z.string().refine((value) => {
                return momment(value).isValid();
            }).optional(),
        }).optional(),
        page: z.number().min(0).optional(),
        sort: z.object({
            sort: z.enum(['title', 'manager_id', 'status', 'start_date', 'end_date']).optional(),
            order: z.enum(['ASC', 'DESC']).optional()
        }).optional()
    });
    const result = schema.safeParse(data);
    if (!result.success) {
        return {
            error: result.error.issues.map((issue) => {
                return {
                    message: issue.message,
                    path: issue.path,
                };
            }),
            data: null,
        };
    }
    return {
        error: null,
        data: result.data,
    };
}