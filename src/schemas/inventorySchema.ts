import { z } from "zod";

/**
 * 📝 INVENTORY SCHEMA: O CONTRATO DE VALIDAÇÃO DO FORMULÁRIO
 */
export const inventorySchema = z.object({
  // Regra para o campo Nome:
  name: z
    .string()
    .min(3, { message: "O nome do ativo deve ter pelo menos 3 caracteres." })
    .max(50, { message: "O nome do ativo não pode passar de 50 caracteres." }),

  // Regra para o campo Categoria:
  category: z
    .string()
    .min(1, { message: "Selecione uma categoria válida para o equipamento." }),

  // Regra para o campo Preço:
  price: z
    .number({
      error: "Por favor, digite um valor numérico válido.",
    })
    .min(1, { message: "O valor de aquisição deve ser de pelo menos R$ 1,00" })
    .max(100000, {
      message:
        "Por segurança, o valor do ativo não pode ultrapassar R$ 100.000,00",
    }),
});

export type InventoryFormData = z.infer<typeof inventorySchema>;
