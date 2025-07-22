//app/api/user/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { dbConnect } from '../../../middlewares/dbConnect'



import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()
const { username, email, password, type } = body


    if (type !== 'register') {
      return NextResponse.json({ message: 'Tipo de acción inválido.' }, { status: 400 })
    }

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios.' }, { status: 400 })
    }

    // Verifica si el usuario ya existe
    const userExists = await User.findOne({ email })
    if (userExists) {
      return NextResponse.json({ message: 'El correo ya está registrado.' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

    return NextResponse.json(
      {
        message: 'Usuario registrado correctamente.',
        user: { id: savedUser._id, username: savedUser.username, email: savedUser.email },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error en el registro:', error)
    return NextResponse.json({ message: 'Error del servidor.' }, { status: 500 })
  }
}
