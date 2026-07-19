//Importamos a biblioteca (apelidada de 'z') para construir nossas regras
import { z } from "zod";

/**
 * 📝 INVENTORY SCHEMA: O CONTRATO DE VALIDAÇÃO DO FORMULÁRIO
 * O Zod funciona criando um objeto de espelho do formulário da tela.
 * Ele vai interceptar o clique de enviar e checar campo por campo com as regras abaixo.
 */

export const inventorySchema = z.object({
  // Regra para o campo Nome:
  name: z
    .string()
    .min(3, { message: "O nome do ativo deve ter pelo menos 3 caracteres." }) // Bloqueia nomes vazios ou muito curtos
    .max(50, { message: "O nome do ativo não pode passar de 50 caracteres." }), // Evita textos gigantescos que quebram o layout

  // Regra para o campo Categoria:
  category: z
    .string() // O HTML devolve o valor do dropdown como texto
    .min(1, { message: "Selecione uma categoria válida para o equipamento." }), // Garante que o usuário não deixe na opção padrão vazia

  // Regra para o campo Preço:
  price: z.coerce
    .number({
      error: "Por favor, digite um valor numérico válido.",
    }) // Garante que o resultado final seja um número real
    .min(1, { message: "O valor de aquisição deve ser de pelo menos R$ 1,00" }) // Bloqueia preços zerados ou negativos
    .max(100000, {
      message:
        "Por segurança, o valor do ativo não pode ultrapassar R$ 100.000,00",
    }), // Exemplo de regra de negócio limitadora;
});

/**
 * 👑 EXTRAÇÃO DE TIPAGEM AUTOMÁTICA
 * Em vez de termos que criar manualmente uma interface TypeScript para o formulário,
 * o Zod possui o recurso 'z.infer'. Ele lê as regras acima e cria um Tipo TypeScript
 * perfeito e automático para nós usarmos lá no React Hook Form!
 */

export type InventoryFormData = z.infer<typeof inventorySchema>;
