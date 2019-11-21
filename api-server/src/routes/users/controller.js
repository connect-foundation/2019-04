import jwt from 'jsonwebtoken';

async function sendUserData(req, res) {
    try {
        const token = req.cookies.jwt;
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send({ data: user });
    } catch (e) {
        res.status(401);
    }
};

export {
    sendUserData
};