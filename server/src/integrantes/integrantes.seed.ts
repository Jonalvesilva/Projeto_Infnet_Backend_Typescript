import { faker } from "@faker-js/faker";
import { IntegrantesRepository } from "./integrantes.repository";

//Executar o server
//Rodar o comando npx ts-node integrantes.seed.ts na pasta integrantes

const integrantesCount = 2;

function gerarCPF() {
  let cpf = [];

  for (let i = 0; i < 9; i++) {
    cpf.push(Math.floor(Math.random() * 10));
  }

  // Gera o primeiro dígito verificador
  let soma = cpf.reduce((acc, curr, index) => acc + curr * (10 - index), 0);
  cpf.push((11 - (soma % 11)) % 10);

  // Gera o segundo dígito verificador
  soma = cpf.reduce((acc, curr, index) => acc + curr * (11 - index), 0);
  cpf.push((11 - (soma % 11)) % 10);

  return cpf.join("");
}

async function integrantesSeed() {
  const repository = new IntegrantesRepository();

  for (let i = 0; i < integrantesCount; i++) {
    const integrante = generateUser();
    const insert = await repository.add(integrante);
    console.log(insert);
  }
}

function generateUser() {
  return {
    nome: faker.person.firstName(),
    cpf: gerarCPF().toString(),
    data_nasc: faker.date.past(),
    plano: "Gold",
    resgate_ativo: true,
    desconto_farm: true,
    tel_res: gerarCPF().substring(0, 10),
    tel_cel: gerarCPF().toString(),
    email: faker.internet.email(),
  };
}

integrantesSeed();
