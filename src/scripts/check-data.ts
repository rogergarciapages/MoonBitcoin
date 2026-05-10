import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.dailyMarketData.count();
  const first = await prisma.dailyMarketData.findFirst({ orderBy: { date: 'asc' } });
  const last = await prisma.dailyMarketData.findLast({ orderBy: { date: 'asc' } });
  
  console.log(`Count: ${count}`);
  console.log(`First: ${first?.date}`);
  console.log(`Last: ${last?.date}`);
}

main();
