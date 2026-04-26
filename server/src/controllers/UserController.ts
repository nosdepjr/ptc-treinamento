import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, cpf, password } = req.body;

    if (!name || !email || !cpf || !password) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    const userExists = await UserRepository.findByEmailOrCpf(email, cpf);

    if (userExists) {
      return res.status(409).json({
        message: "Email ou CPF já cadastrado",
      });
    }

    const user = await UserRepository.create({
      name,
      email,
      cpf,
      password,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar usuário",
      error,
    });
  }
};

export const readAllUsers = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    let users;

    if (name) {
      users = await UserRepository.findByName(String(name));
    } else {
      users = await UserRepository.findAll();
    }

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

export const countUsers = async (req: Request, res: Response) => {
  try {
    const total = await UserRepository.count();

    return res.status(200).json({
      total,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao contar usuários",
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, cpf, password } = req.body;

    const userExists = await UserRepository.findById(id);

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

    const updatedUser = await UserRepository.update(id, dataToUpdate);

    return res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      cpf: updatedUser.cpf,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });

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

    const userExists = await UserRepository.findById(id);

    if (!userExists) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    await UserRepository.delete(id);

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