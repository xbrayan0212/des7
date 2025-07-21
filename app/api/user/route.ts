// app/api/user/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, type } = body;

    if (type !== "register") {
      return NextResponse.json({ message: "Tipo de acción inválido." }, { status: 400 });
    }

    // Validaciones básicas
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Todos los campos son obligatorios." }, { status: 400 });
    }

    // Simulación de guardado (puedes reemplazar con MongoDB, etc.)
    console.log("Nuevo usuario:", { name, email, password });

    // Devuelve éxito
    return NextResponse.json({ message: "Usuario registrado correctamente." }, { status: 200 });

  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json({ message: "Error del servidor." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Método GET disponible en /api/user" });
}
