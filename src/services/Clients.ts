import {json, Request, Response} from 'express'
import db from '../database/db'

class Clients {

    async insert(req: Request, res: Response) {
        const {name, amount} = req.body

        try {
            db.getConnection((error: any, conn: any) => {
                if(error) {
                    throw new Error (error.message);
                }
                conn.query('INSERT INTO clients SET ? ', [name, amount])
                res.status(201).send(json)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    async findAll(req: Request, res: Response) {
        try {
            const response = await db.query('SELECT * FROM clients');
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    }

    async findOne(req: Request, res: Response) {
        const {id} = req.params
        try {
            const response = await db.query('SELECT clients SET ? WHERE id = ?', [id]);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    }

    async update(req: Request, res: Response) {
        const {id} = req.params
        const {name, amount} = req.body

        try {
            const response = await db.query('UPDATE clients SET ? WHERE id = ?', [name, amount, id]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }

    }

    async delete(req: Request, res: Response) {
        const {id} = req.params

        try {
            const response = await db.query(`DELETE FROM clients WHERE id = ${id}`);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    } 
}

export default Clients; 