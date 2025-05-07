import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validar los datos recibidos
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Verificar que las variables de entorno estén configuradas
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Environment variables EMAIL_USER and EMAIL_PASS must be set")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Configurar el transporter de nodemailer con más opciones
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Configurar el email con formato HTML para mejor presentación
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "contacto@alioshasystem.com",
      subject: `[Aliosha System] ${subject}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Enviar el email con manejo de errores mejorado
    try {
      await transporter.sendMail(mailOptions)

      return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      return NextResponse.json({ error: `Error sending email: ${(emailError as Error).message}` }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Error processing request" }, { status: 500 })
  }
}

