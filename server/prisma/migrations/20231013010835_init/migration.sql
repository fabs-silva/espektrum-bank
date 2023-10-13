-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "birth_country" TEXT NOT NULL,
    "genre_identity" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "issuing_body" TEXT NOT NULL,
    "issuing_state" TEXT NOT NULL,
    "selfie_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email_address" TEXT NOT NULL,
    "user_id" TEXT,
    "supervisor_id" TEXT,
    CONSTRAINT "Email_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Email_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "Supervisor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Telephone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone_number" TEXT NOT NULL,
    "user_id" TEXT,
    "supervisor_id" TEXT,
    CONSTRAINT "Telephone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Telephone_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "Supervisor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "account_type" TEXT NOT NULL,
    "account_number" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "balance" DECIMAL NOT NULL DEFAULT 0.0,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supervisor_id" TEXT,
    CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Account_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "Supervisor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Supervisor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "degree_kinship" TEXT NOT NULL,
    "genre_identity" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "issuing_body" TEXT NOT NULL,
    "issuing_state" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PixKey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "key_type" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PixKey_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "debit_credit" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" DATETIME,
    "settled_at" DATETIME,
    CONSTRAINT "Transaction_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Receiver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Receiver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "document_number" TEXT NOT NULL,
    "pix_key" TEXT,
    "bank" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_identification_key" ON "User"("identification");

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_number_key" ON "Account"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_id_key" ON "Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Supervisor_cpf_key" ON "Supervisor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Supervisor_identification_key" ON "Supervisor"("identification");

-- CreateIndex
CREATE UNIQUE INDEX "PixKey_key_key" ON "PixKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "PixKey_account_id_key" ON "PixKey"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_receiver_id_key" ON "Transaction"("receiver_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_account_id_key" ON "Transaction"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Receiver_document_number_key" ON "Receiver"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "Receiver_pix_key_key" ON "Receiver"("pix_key");
