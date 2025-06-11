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
        resources:
          '{"searchHighlight": {"label": "Sem destaque nas buscas", "active": false}, "advancedAnalytics": {"label": "Sem analytics avançado", "active": false}, "proposalsPerMonth": {"label": "Até 5 propostas por mês", "limit": 5, "active": true}, "multiCompanySupport": {"label": "Sem múltiplas empresas", "active": false}}',
        actived: true,
        created_at: '2025-06-11T02:00:48.407Z',
        updated_at: null,
        price_month: 0.0,
        price_year: 0.0,
        description: 'Ideal para começar',
        price_id: '',
      },
      {
        id: 'basic',
        name: 'Básico',
        resources:
          '{"searchHighlight": {"label": "Sem destaque nas buscas", "active": false}, "advancedAnalytics": {"label": "Sem analytics avançado", "active": false}, "proposalsPerMonth": {"label": "Até 5 propostas por mês", "limit": 5, "active": true}, "multiCompanySupport": {"label": "Sem múltiplas empresas", "active": false}}',
        actived: true,
        created_at: '2025-06-11T02:00:48.407Z',
        updated_at: null,
        price_month: 19.9,
        price_year: 210.0,
        description: 'Para profissionais ativos',
        price_id: 'price_1RXsaUQitTm5wxzyWdMMd0r1',
      },
      {
        id: 'profissional',
        name: 'Profissional',
        resources:
          '{"searchHighlight": {"label": "Sem destaque nas buscas", "active": false}, "advancedAnalytics": {"label": "Sem analytics avançado", "active": false}, "proposalsPerMonth": {"label": "Até 5 propostas por mês", "limit": 5, "active": true}, "multiCompanySupport": {"label": "Sem múltiplas empresas", "active": false}}',
        actived: true,
        created_at: '2025-06-11T02:00:48.407Z',
        updated_at: null,
        price_month: 79.9,
        price_year: 798.96,
        description: 'Para profissionais ativos',
        price_id: 'price_1RXsatQitTm5wxzymxAJfvvM',
      },
    ],
  });
}

planSeed();
