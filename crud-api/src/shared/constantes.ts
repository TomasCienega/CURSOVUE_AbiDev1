export const API = 'https://api-rest-tareas.onrender.com' as const

export interface ITareas{
    _id:string;
    name: string;
    description: string;
    status:boolean;
}