import { Request, Response } from "express";
import prisma from "@database";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, cpf, password } = req.body;

    if (!name || !email || !cpf || !password) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    if (userExists) {
      return res.status(409).json({
        message: "Email ou CPF já cadastrado",
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        cpf,
        password,
      },
    });

    const userWithoutPassword = {
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar usuário",
      error,
    });
  }
};

export const readAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    const usersWithoutPassword = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    return res.status(200).json(usersWithoutPassword);

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar usuários",
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, cpf, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    const dataToUpdate: any = {};

    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (cpf) dataToUpdate.cpf = cpf;
    if (password) dataToUpdate.password = password;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    const userWithoutPassword = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      cpf: updatedUser.cpf,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return res.status(200).json(userWithoutPassword);

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar usuário",
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Usuário deletado com sucesso",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar usuário",
      error,
    });
  }
};