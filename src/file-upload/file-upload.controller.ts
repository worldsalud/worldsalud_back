import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/roles.enum';
import { AllowOwnerOrRole } from 'src/decorators/allow-owner-or-role.decorator';
import { AllowOnlyRole } from 'src/decorators/allow-only-role.decorator';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AllowOnlyRole(Role.Admin)
  @ApiOperation({ summary: 'Upload image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen subida correctamente',
  })
  @ApiResponse({
    status: 400,
    example: {
      message: 'La validación falló',
      error: 	'Solicitud incorrecta',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'Token inválido',
      error: 'No autorizado',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 403,
    example: {
      message: 'No tienes permiso para acceder a este recurso.',
      error: 'Prohibido',
      statusCode: 403,
    },
  })
  @ApiResponse({
    status: 404,
    example: {
      message: 'Producto no encontrado',
      error: 'No encontrado',
      statusCode: 404,
    },
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploadService.uploadImage(file);
  }

  @ApiTags('Products')
  @Post('uploadImage/:productId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AllowOnlyRole(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen subida correctamente',
  })
  @ApiResponse({
    status: 400,
    example: {
      message: 	'La validación falló',
      error: 'Solicitud incorrecta',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'Token inválido',
      error: 'No autorizado',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 403,
    example: {
      message: 'No tienes permiso para acceder a este recurso.',
      error: 'Forbidden',
      statusCode: 403,
    },
  })
  @ApiResponse({
    status: 404,
    example: {
      message: 'Producto no encontrado',
      error: 'No encontrado',
      statusCode: 404,
    },
  })
  async uploadProductImage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 600000,
            message: 'El archivo debe tener un tamaño máximo de 600kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|mp4|mov|avi)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadProductImage(file, productId);
  }




  @ApiTags('Users')
  @Post('uploadImage/user/:userId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @AllowOwnerOrRole(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen subida correctamente',
  })
  @ApiResponse({
    status: 400,
    example: {
      message: 'La validación falló',
      error: 'Solicitud incorrecta',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'Token inválido',
      error: 'No autorizado',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 403,
    example: {
      message: 'No tienes permiso para acceder a este recurso.',
      error: 	'Prohibido',
      statusCode: 403,
    },
  })
  @ApiResponse({
    status: 404,
    example: {
      message: 	'Usuario no encontrado',
      error: 'No encontrado',
      statusCode: 404,
    },
  })
  async uploadUserImage(
    @Param('userId', ParseUUIDPipe) userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 600000,
            message: 'El archivo debe tener un tamaño máximo de 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|mp4|mov|avi)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadUserImage(file, userId);
  }
}
