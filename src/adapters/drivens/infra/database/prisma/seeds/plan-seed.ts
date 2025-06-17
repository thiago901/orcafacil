import { PrismaService } from '../prisma.service';

export async function planSeed() {
  const prisma = new PrismaService();

  const plan = await prisma.plan.findFirst();
  if (!!plan) {
    return;
  }

  await prisma.plan.createMany({
    data: [
      {
        id: 'free',
        name: 'Gratuito',
        description: 'Ideal para começar',
        price_month: 0,
        price_year: 0,
        price_id_month: null,
        price_id_year: null,
        resources: {
          searchHighlight: {
            label: 'Sem destaque nas buscas',
            active: false,
          },
          advancedAnalytics: {
            label: 'Sem analytics avançado',
            active: false,
          },
          proposalsPerMonth: {
            label: 'Até 5 propostas por mês',
            limit: 5,
            active: true,
          },
          multiCompanySupport: {
            label: 'Sem múltiplas empresas',
            active: false,
          },
        },
        actived: true,
      },
      {
        id: 'essential',
        name: 'Essencial',
        description: 'Para profissionais ativos',
        price_month: 49.9,
        price_year: 499.0,
        price_id_month: 'price_month_essential_xyz', // stripe ID
        price_id_year: 'price_year_essential_xyz',
        resources: {
          searchHighlight: {
            label: 'Destaque nas buscas',
            active: true,
          },
          advancedAnalytics: {
            label: 'Analytics avançado ativado',
            active: true,
          },
          proposalsPerMonth: {
            label: 'Até 100 propostas por mês',
            limit: 100,
            active: true,
          },
          multiCompanySupport: {
            label: 'Gerencie até 10 empresas',
            limit: 10,
            active: true,
          },
        },
        actived: true,
      },
    ],
  });
}

planSeed();
