-- CreateTable
CREATE TABLE "contato" (
    "id_documento" SERIAL NOT NULL,
    "id_integrante" INTEGER NOT NULL,
    "tel_cel" VARCHAR(11) NOT NULL,
    "tel_res" VARCHAR(10) NOT NULL,
    "email" VARCHAR(50) NOT NULL,

    CONSTRAINT "contato_pkey" PRIMARY KEY ("id_documento")
);

-- CreateTable
CREATE TABLE "dependentes" (
    "id_dependente" SERIAL NOT NULL,
    "id_integrante" INTEGER NOT NULL,
    "num_carteirinha" VARCHAR(10) NOT NULL DEFAULT (ceil((random() * ('9999999999'::bigint)::double precision)))::text,
    "nome" VARCHAR(50),
    "data_nasc" DATE,
    "cpf" VARCHAR(11),

    CONSTRAINT "dependentes_pkey" PRIMARY KEY ("id_dependente")
);

-- CreateTable
CREATE TABLE "desconto_farmacia" (
    "id_integrante" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "integrantes" (
    "id_integrante" SERIAL NOT NULL,
    "num_carteirinha" VARCHAR(10) NOT NULL DEFAULT (ceil((random() * ('9999999999'::bigint)::double precision)))::text,
    "nome" VARCHAR(50) NOT NULL,
    "data_nasc" DATE NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,

    CONSTRAINT "integrantes_pkey" PRIMARY KEY ("id_integrante")
);

-- CreateTable
CREATE TABLE "plano" (
    "id_integrante" INTEGER NOT NULL,
    "plano" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "resgate_domiciliar" (
    "id_integrante" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "funcionarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "sobrenome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(50) NOT NULL,
    "created_at" DATE NOT NULL,

    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contato_id_integrante_key" ON "contato"("id_integrante");

-- CreateIndex
CREATE UNIQUE INDEX "dependentes_num_carteirinha_key" ON "dependentes"("num_carteirinha");

-- CreateIndex
CREATE UNIQUE INDEX "desconto_farmacia_id_integrante_key" ON "desconto_farmacia"("id_integrante");

-- CreateIndex
CREATE UNIQUE INDEX "integrantes_num_carteirinha_key" ON "integrantes"("num_carteirinha");

-- CreateIndex
CREATE UNIQUE INDEX "plano_id_integrante_key" ON "plano"("id_integrante");

-- CreateIndex
CREATE UNIQUE INDEX "resgate_domiciliar_id_integrante_key" ON "resgate_domiciliar"("id_integrante");

-- AddForeignKey
ALTER TABLE "contato" ADD CONSTRAINT "contato_id_integrante_fkey" FOREIGN KEY ("id_integrante") REFERENCES "integrantes"("id_integrante") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dependentes" ADD CONSTRAINT "dependentes_id_integrante_fkey" FOREIGN KEY ("id_integrante") REFERENCES "integrantes"("id_integrante") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "desconto_farmacia" ADD CONSTRAINT "desconto_farmacia_id_integrante_fkey" FOREIGN KEY ("id_integrante") REFERENCES "integrantes"("id_integrante") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "plano" ADD CONSTRAINT "plano_id_integrante_fkey" FOREIGN KEY ("id_integrante") REFERENCES "integrantes"("id_integrante") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resgate_domiciliar" ADD CONSTRAINT "resgate_domiciliar_id_integrante_fkey" FOREIGN KEY ("id_integrante") REFERENCES "integrantes"("id_integrante") ON DELETE CASCADE ON UPDATE NO ACTION;

