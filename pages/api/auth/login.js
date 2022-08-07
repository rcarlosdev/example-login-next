import jwt from "jsonwebtoken";
import { serialize } from 'cookie'


export default function loginHandler(req, res) {
  const { email, password } = req.body;

  if (email === 'admin@admin.com' && password === 'admin') {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      email: 'admin@admin.com',
      username: 'r3po'
    }, 'secret');

    const serialized = serialize('myTokenName', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', //Solo para el mismo dominio
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    });

    res.setHeader('Set-Cookie', serialized);

    return res.json('login succesfully');
  }

  return res.status(401).json({ error: 'Invalid email or password' });
}