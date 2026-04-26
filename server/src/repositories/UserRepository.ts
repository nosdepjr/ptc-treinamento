import prisma from "@database";

export const UserRepository = {
  create: async (data: any) => {
    return prisma.user.create({ data });
  },

  findAll: async () => {
    return prisma.user.findMany();
  },

  findByName: async (name: string) => {
    return prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive", // busca sem case sensitive
        },
      },
    });
  },

  count: async () => {
    return prisma.user.count();
  },

  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  findByEmailOrCpf: async (email: string, cpf: string) => {
    return prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });
  },

  update: async (id: string, data: any) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return prisma.user.delete({
      where: { id },
    });
  },
};