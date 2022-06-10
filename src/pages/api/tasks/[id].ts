import { NextApiRequest, NextApiResponse } from "next";
// import { conn } from "../../../utils/database";
import { conn } from "src/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query, body } = req;

    switch (method) {
        case "GET":
            try {
                const response = await conn.query(
                    "SELECT * FROM tasks WHERE id = $1",
                    [query.id]
                );

                if (response.rows.length === 0)
                    return res.status(400).json({ message: "Task not found" });

                return res.status(200).json(response.rows[0]);
            } catch (error: any) {
                return res.status(500).json({
                    error: error.message,
                });
            }
        case "PUT":
            try {
                const { title, description } = body;
                const response = await conn.query(
                    "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
                    [title, description, query.id]
                );

                if (response.rows.length === 0)
                    return res.status(400).json({ message: "Task not found" });

                return res.status(200).json({
                    message: "updated task",
                    task: response.rows[0]
                });
            } catch (error: any) {
                return res.status(500).json({
                    error: error.message,
                });
            }
        case "DELETE":
            try {
                const response = await conn.query(
                    "DELETE FROM tasks WHERE id = $1 RETURNING *",
                    [query.id]
                );

                if (response.rowCount === 0)
                    return res.status(400).json({ message: "Task not found" });

                return res.status(200).json({
                    message: "deleted task",
                    task: response.rows[0]
                });
            } catch (error: any) {
                return res.status(500).json({
                    error: error.message,
                });
            }
        default:
            return res.status(400).json("method not allowed");
    }
};
