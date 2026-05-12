/*
  Seed strategy:
  - migrate hardcoded frontend subject/topic/question data into PostgreSQL
  - create subject slugs/icons used by the dashboard
  - store Basic / Intermediate / Advanced / Final question sets

  This file is intentionally a scaffold for the next pass once Prisma is installed.
*/

async function main() {
  console.log('Seed scaffold ready. Implement Prisma-backed seeding here.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
