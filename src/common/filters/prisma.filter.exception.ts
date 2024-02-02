// prisma-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorMessage = exception.message;

    if (exception instanceof Prisma.PrismaClientInitializationError) {
      // Manejar errores de inicializacioni
      response.status(400).json({
        statusCode: 400,
        message: 'Error en la inicializacion de Prisma',
        errors: exception.message,
      });
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      // Manejar errores de validaciones
      if (errorMessage.match(/Unknown argument(.*)/)) {
        const match = errorMessage.match(/Unknown argument(.*)/); // Busca la parte del mensaje que sigue a 'Unknown argument'
        const finalMessage = match
          ? match[1]?.trim()
          : 'Error de validación de Prisma';

        response.status(400).json({
          statusCode: 400,
          message: 'Unknown argument:' + finalMessage,
        });
      } else {
        response.status(400).json({
          statusCode: 400,
          message: 'Error en las validaciones de Prisma',
          errors: exception.message,
        });
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Manejar errores conocidos
      response.status(400).json({
        statusCode: 400,
        message: 'Error conocido de Prisma',
        errors: exception.message,
      });
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      // Manejar errores desconocidos
      response.status(500).json({
        statusCode: 500,
        message: 'Error desconocido de Prisma',
        errors: exception.message,
      });
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      response.status(400).json({
        statusCode: 400,
        message: 'Error en el codigo Rust subyacente de Prisma',
        errors: exception.message,
      });
    }
  }
}
