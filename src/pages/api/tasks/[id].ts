import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            return res.status(200).json('getting a unique task');
        case 'PUT':
            return res.status(200).json('updating a unique task');
        case 'DELETE':
            return res.status(200).json('deleting a unique task');
        default:
            return res.status(400).json('method not allowed');
    }
}