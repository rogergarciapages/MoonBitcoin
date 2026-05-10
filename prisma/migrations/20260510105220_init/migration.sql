-- CreateTable
CREATE TABLE "daily_market_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "priceUsd" REAL,
    "marketCapUsd" REAL,
    "volumeUsd" REAL,
    "moonPhase" TEXT,
    "moonIllumination" REAL,
    "dailyReturn" REAL,
    "volatility" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_market_data_date_key" ON "daily_market_data"("date");
