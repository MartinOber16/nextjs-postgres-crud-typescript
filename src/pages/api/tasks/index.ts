import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.method, req.url)
    const { method, body } = req;
    switch (method) {
        case "GET":
            try {
                const query = "SELECT * FROM tasks";
                const response = await conn.query(query);

                return res.status(200).json(response.rows);
            } catch (error: any) {
                return res.status(500).json({
                    error: error.message
                });
            }
        case "POST":
            try {
                const { title, description } = body;

                const query =
                    "INSERT INTO tasks(title,description) VALUES ($1, $2) RETURNING *";
                const values = [title, description];
                const response = await conn.query(query, values);

                return res.status(200).json({
                    message: "creating tasks",
                    task: response.rows[0],
                });
            } catch (error: any) {
                return res.status(500).json({
                    error: error.message
                });
            }
        default:
            return res.status(400).json("invalid method");
    }
};
