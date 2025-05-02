import { PrismaService } from '../prisma.service';

import { randomUUID } from 'node:crypto';

export async function categorySeed() {
  const categories = [
    'Pintor',
    'Marceneiro',
    'Gesseiro',
    'Eletricista',
    'Encanador',
    'Pedreiro',
    'Serralheiro',
    'Azulejista',
    'Vidraceiro',
    'Jardineiro',
    'Telhadista',
    'Carpinteiro',
    'Mestre de obras',
    'Arquiteto',
    'Engenheiro civil',
    'Designer de interiores',
    'Instalador de drywall',
    'Instalador de piso',
    'Técnico de ar-condicionado',
    'Dedetizador',
  ];

  const prisma = new PrismaService();
  const prismaCategories = categories.map((item) => ({
    id: randomUUID(),
    created_at: new Date(),
    name: item,
  }));
  await prisma.category.createMany({
    data: prismaCategories,
  });
}

categorySeed();
