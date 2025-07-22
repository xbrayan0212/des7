// /pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
const jwt = require('jsonwebtoken')

const SECRET = 'mi_secreto_super_seguro'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' })
  }

  const { username, password } = req.body

  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' })
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`)
    return res.status(200).json({ message: 'Login exitoso' })
  } else {
    return res.status(401).json({ message: 'Credenciales inválidas' })
  }
}
