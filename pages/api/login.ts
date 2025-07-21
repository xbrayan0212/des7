import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const SECRET = 'mi_secreto_super_seguro'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' })
  }

  const { username, password } = req.body

  // Aquí valida tu usuario y contraseña (ejemplo básico)
  if (username === 'admin' && password === '1234') {
    // Crear token JWT (puedes agregar más info dentro del payload)
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' })

    // Mandar token en cookie HTTPOnly para más seguridad
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`)

    return res.status(200).json({ message: 'Login exitoso' })
  } else {
    return res.status(401).json({ message: 'Credenciales inválidas' })
  }
}
