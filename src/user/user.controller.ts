import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    //Request
    @Body() data: any,
    //Response
    @Res() res: Response
  ) 
  {
    try
    {
      
      if (!data.username || !data.password)
      {
        return res.status(203).json({msg: "Debe enviar todos los datos para iniciar sesión"})
      }

      const resultado = await this.userService.login(data);

      if (resultado.success === false)
      {
        return res.status(203).json({msg: resultado.msg})
      }
      
      //Envío del refresh token en una cookie
      res.cookie('refreshToken', resultado.refreshToken, {
        httpOnly: true,
        secure: false,  // --------------------------------------------- CAMBIAR ANTES DE DESPLIEGUE
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24
      });
      
      const { accessToken, userId } = resultado;

      //Respuesta
      return res.status(200).json({accessToken, userId})
    }
    catch(e)
    {
      return res.status(500).json({msg: "Error al iniciar sesión"})
    }
  }



  @Post('register')
  async register(
    @Body() data: any,
    @Res() res: Response
  )
  {
    try
    {
      if (!data.name || !data.username || !data.password)
      {
        return res.status(203).json({msg: "Debe enviar todos los datos"});
      }

      const resultado = await this.userService.register(data);
      
      if (resultado.success === false)
      {
        return res.status(203).json({msg: "Error al registrarse"})
      }

      return res.status(200).json({msg: "Se ha registrado exitosamente"})
    }
    catch(e)
    {
      return res.status(500).json({msg: "Error al registrarse"})
    }
  }
}
