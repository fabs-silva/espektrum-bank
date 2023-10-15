-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "debit_credit" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programmed_to" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" DATETIME,
    "settled_at" DATETIME,
    CONSTRAINT "Transaction_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Receiver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("account_id", "approved_at", "comment", "created_at", "debit_credit", "id", "receiver_id", "settled_at", "status", "type", "value") SELECT "account_id", "approved_at", "comment", "created_at", "debit_credit", "id", "receiver_id", "settled_at", "status", "type", "value" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
