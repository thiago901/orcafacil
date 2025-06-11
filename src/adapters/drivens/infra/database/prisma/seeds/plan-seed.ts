import { PrismaService } from '../prisma.service';

export async function planSeed() {
  const prisma = new PrismaService();

  const plan = await prisma.plan.findFirst();
  if (!!plan) {
    return;
  }
  await prisma.plan.create({
    data: {
      id: 'free',
      name: 'Gratuito',
      price_month: 0,
      price_year: 0,
      actived: true,
      resources: {
        proposalsPerMonth: {
          label: 'Até 5 propostas por mês',
          limit: 5,
          active: true,
        },
        searchHighlight: {
          label: 'Sem destaque nas buscas',
          active: false,
        },
        advancedAnalytics: {
          label: 'Sem analytics avançado',
          active: false,
        },
        multiCompanySupport: {
          label: 'Sem múltiplas empresas',
          active: false,
        },
      },
    },
  });
}

planSeed();
