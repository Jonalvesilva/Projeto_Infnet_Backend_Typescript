import { faker } from "@faker-js/faker";
import { DependentesRepository } from "./dependentes.repository";

//Executar o server
//Rodar o comando npx ts-node dependentes.seed.ts na pasta dependentes

const dependenteCount = 2;
const integranteId = 9; //Colocar id integrante que está cadastrado no banco.

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

async function dependentesSeed() {
  const repository = new DependentesRepository();

  for (let i = 0; i < dependenteCount; i++) {
    const depedente = generateUser();
    const insert = await repository.add(integranteId, depedente);
    console.log(insert);
  }
}

function generateUser() {
  return {
    nome: faker.person.firstName(),
    cpf: gerarCPF().toString(),
    data_nasc: faker.date.past(),
  };
}

dependentesSeed();
