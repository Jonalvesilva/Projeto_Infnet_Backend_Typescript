import { Service } from "typedi";
import { BadRequestError } from "routing-controllers";
import { signInSchema, SignInSchema } from "./schemas/signin.schema";
import { FuncionarioService } from "../funcionarios/funcionarios.serv";
import { JWTService } from "./jwt.service";
import { SignUpDto } from "./schemas/sign-up.dto";

@Service()
export class AuthService {
  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly jwtService: JWTService
  ) {}

  async signUp(signUpData: SignUpDto) {
    const maybeFuncionario = await this.funcionarioService.findByEmail(
      signUpData.email
    );
    if (maybeFuncionario !== null) {
      throw new BadRequestError(
        "Este email já está sendo utilizado por outro funcionário"
      );
    }
    const date = new Date();
    const funcionario = await this.funcionarioService.create({
      ...signUpData,
      created_at: date,
    });

    const payload = {
      id: funcionario.id,
      nome: funcionario.nome,
      sobrenome: funcionario.sobrenome,
      email: funcionario.email,
      created_at: funcionario.created_at,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      success: true,
      funcionario,
      jwt,
    };
  }

  async signIn(signInData: SignInSchema) {
    const signInDataValidation = await signInSchema.safeParseAsync(signInData);

    if (signInDataValidation.success === false) {
      return {
        success: false,
        jwt: null,
      };
    }

    const { email, senha } = signInDataValidation.data;
    const funcionario = await this.funcionarioService.findByEmailPassword(
      email,
      senha
    );

    if (funcionario === null) {
      return {
        success: false,
        funcionario: null,
        jwt: null,
      };
    }

    const payload = {
      id: funcionario.id,
      nome: funcionario.nome,
      sobrenome: funcionario.sobrenome,
      email: funcionario.email,
      created_at: funcionario.created_at,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      success: true,
      funcionario,
      jwt,
    };
  }
}
