//Normaliza Texto
export function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ");
}

//Function Create Search SQL
export function createSearchSql(search: string) {
  const str = `%${search}%`;
  return `AND (LOWER(t1.nome) like '${str}' OR LOWER(t1.num_carteirinha) like '${str}' OR LOWER(t1.cpf) like '${str}')`;
}
