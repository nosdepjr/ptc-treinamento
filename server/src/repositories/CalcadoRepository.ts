import prisma from "@database";

export const CalcadoRepository = {
  create: async (data: any) => {
    return prisma.calcado.create({ data });
  },

  findAll: async () => {
    return prisma.calcado.findMany();
  },

  findById: async (id: number) => {
    return prisma.calcado.findUnique({
      where: { id },
    });
  },

  findByTamanho: async (tamanho: number) => {
    return prisma.calcado.findMany({
      where: { tamanho },
    });
  },

  findByMarca: async (marca: string) => {
    return prisma.calcado.findMany({
      where: {
        marca: {
          contains: marca,
          mode: "insensitive",
        },
      },
    });
  },

  getEstoqueInfo: async () => {
    const totalProdutos = await prisma.calcado.count();

    const estoque = await prisma.calcado.aggregate({
      _sum: {
        quantidade_em_estoque: true,
      },
    });

    return {
      totalProdutos,
      totalPares: estoque._sum.quantidade_em_estoque || 0,
    };
  },

  update: async (id: number, data: any) => {
    return prisma.calcado.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.calcado.delete({
      where: { id },
    });
  },
};    