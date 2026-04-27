import { Request, Response } from "express";
import { CalcadoRepository } from "../repositories/CalcadoRepository";

export const createCalcado = async (req: Request, res: Response) => {
  try {
    const {
      nome_produto,
      cor,
      marca,
      tamanho,
      preco,
      quantidade_em_estoque,
    } = req.body;

    if (
      !nome_produto ||
      !cor ||
      !marca ||
      tamanho === undefined ||
      preco === undefined ||
      quantidade_em_estoque === undefined
    ) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    const calcado = await CalcadoRepository.create({
      nome_produto,
      cor,
      marca,
      tamanho,
      preco,
      quantidade_em_estoque,
    });

    return res.status(201).json(calcado);

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar calçado",
      error,
    });
  }
};

export const readAllCalcados = async (req: Request, res: Response) => {
  try {
    const { tamanho, marca } = req.query;

    let calcados;

    if (tamanho) {
      calcados = await CalcadoRepository.findByTamanho(Number(tamanho));
    } else if (marca) {
      calcados = await CalcadoRepository.findByMarca(String(marca));
    } else {
      calcados = await CalcadoRepository.findAll();
    }

    return res.status(200).json(calcados);

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar calçados",
      error,
    });
  }
};

export const countEstoque = async (req: Request, res: Response) => {
  try {
    const { totalProdutos, totalPares } =
      await CalcadoRepository.getEstoqueInfo();

    return res.status(200).json({
      total_produtos: totalProdutos,
      total_pares: totalPares,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao contar estoque",
      error,
    });
  }
};

export const updateCalcado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      nome_produto,
      cor,
      marca,
      tamanho,
      preco,
      quantidade_em_estoque,
    } = req.body;

    const calcadoExists = await CalcadoRepository.findById(Number(id));

    if (!calcadoExists) {
      return res.status(404).json({
        message: "Calçado não encontrado",
      });
    }

    const dataToUpdate: any = {};

    if (nome_produto !== undefined) dataToUpdate.nome_produto = nome_produto;
    if (cor !== undefined) dataToUpdate.cor = cor;
    if (marca !== undefined) dataToUpdate.marca = marca;
    if (tamanho !== undefined) dataToUpdate.tamanho = tamanho;
    if (preco !== undefined) dataToUpdate.preco = preco;
    if (quantidade_em_estoque !== undefined)
      dataToUpdate.quantidade_em_estoque = quantidade_em_estoque;

    const updated = await CalcadoRepository.update(Number(id), dataToUpdate);

    return res.status(200).json(updated);

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar calçado",
      error,
    });
  }
};

export const deleteCalcado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const calcadoExists = await CalcadoRepository.findById(Number(id));

    if (!calcadoExists) {
      return res.status(404).json({
        message: "Calçado não encontrado",
      });
    }

    await CalcadoRepository.delete(Number(id));

    return res.status(200).json({
      message: "Calçado deletado com sucesso",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar calçado",
      error,
    });
  }
};