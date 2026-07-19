/**
 *📝 INTERFACE: CONTRATO DE TIPAGEM DO TYPESCRIPT
 * Aqui definimos o formato exato que um item de inventário deve ter.
 * Isso impede que a gente comenta erros de digitação ou esqueça algum dado importante no futuro.
 */

export interface IHubItem {
  id: string; // Um identificador único gerado para cada equipamento (ex: UUID)
  name: string; // O nome do equipamento (ex: "MacBook Pro M3")
  category: string; // A categoria do item (ex: "Computação", "Rede", "Periféricos")
  price: number; // O valor financeiro de aquisição do ativo em reais
}

/**
 * 🏛️ CLASSE PRINCIPAL: PROGRAMAÇÃO ORIENTADA A OBJETOS (POO)
 * Esta classe é responsável por centralizar toda a inteligência do nosso inventário.
 * A tela (React) não mexerá nos dados diretamente; ela pedirá para a classe fazer isso.
 */

export class HubInventory {
  // ATRIBUTO PRIVADO (Encapsulamento):
  // Usamos o termo 'private' para que nenhum outro arquivo consiga alterar ou deletar
  // a nossa lista de itens diretamente por fora da classe. Segurança total dos dados!

  private items: IHubItem[];

  /**
   * 🏗️ CONSTRUTOR da Classe
   * O método constructor roda automaticamente no momento em que criamos um novo inventário.
   * Ele recebe a lista de dados iniciais (que virão da API ou do estado) e guarda no nosso atributo privado.
   */

  constructor(initialItems: IHubItem[]) {
    this.items = initialItems;
  }

  /**
   * 🔄 MÉTODO 1: RETORNAR TODOS OS ITENS (Uso indireto do MAP)
   * Este método serve para expor com segurança os itens guardados lá dentro.
   * Usamos o map() para criar um novo array com cópias exatas dos objetos.
   * Se a tela alterar um item por acidente, o array original protegido dentro da classe não sofre nada.
   */
  public getAllItems(): IHubItem[] {
    // O map passa item por item e devolve um novo objeto clonado { ...item }
    return this.items.map((item) => ({ ...item }));
  }

  /**
   * 🔍 MÉTODO 2: FILTRAR ITENS (Uso do FILTER)
   * Este método varre o inventário e devolve apenas os itens que combinarem
   * com o texto digitado na busca e com a categoria selecionada pelo usuário.
   */
  public filterItems(searchText: string, selectedCategory: string): IHubItem[] {
    // O filter passa por toda a lista e só deixa passar quem retornar 'true' na condição
    return this.items.filter((item) => {
      // Condição 1: Converte o nome do item e a busca para letras minúsculas (.toLowerCase())
      // e checa se o texto digitado está contido (.includes) dentro do nome do equipamento.
      const matchSearch = item.name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase());

      // Condição 2: Se a categoria selecionada for 'todos', qualquer item passa.
      // Se for uma categoria específica (ex: "Rede"), ela precisa ser exatamente igual à do item.
      const matchesCategory =
        selectedCategory === "todos" || item.category === selectedCategory;

      // O item só entra no resultado final se passar nas duas condições ao mesmo tempo (operador &&)
      return matchSearch && matchesCategory;
    });
  }

  /**
   * 🧮 MÉTODO 3: CALCULAR PATRIMÔNIO TOTAL (Uso do REDUCE)
   * Este método passa por todos os equipamentos cadastrados no hub, pega o preço
   * de cada um e vai somando tudo para nos dar o valor total investido no espaço.
   */
  public calculateTotalValue(): number {
    // O reduce recebe uma função com o acumulador (total atual) e o item da rodada (currentItem)
    return this.items.reduce((accumulator, currentItem) => {
      // Linha por linha, ele pega o que já tinha somado e adiciona o preço do item atual
      return accumulator + currentItem.price;
    }, 0); // Este número 0 é o valor inicial onde a nossa contagem vai começar
  }

  /**
   * ⚖️ MÉTODO 4: CALCULAR CUSTO MÉDIO POR ITEM (Uso indireto do REDUCE)
   * Regra de negócio simples: Se não tiver nenhum item, a média é zero.
   * Se tiver itens, dividimos o valor total (calculado via reduce) pela quantidade de itens.
   */
  public calculateAveragePrice(): number {
    // Evita o erro matemático de divisão por zero caso o inventário esteja vazio
    if (this.items.length === 0) {
      return 0;
    }
    // Reaproveita o método do reduce criado acima e divide pelo total de elementos (.length)
    return this.calculateTotalValue() / this.items.length;
  }

  /**
   * 🎯 MÉTODO 5: DETECTAR ITEM ESPECÍFICO (Uso do FIND)
   * Este método faz uma busca cirúrgica baseada no ID único do equipamento.
   * Ele é ideal para quando o usuário clica em "Auditar Item" e precisamos abrir o Modal de detalhes.
   */
  public findItemById(idToFind: string): IHubItem | undefined {
    // O find varre a lista e, no exato milissegundo em que a igualdade for verdadeira,
    // ele para a busca imediatamente e retorna aquele objeto. Se não achar, devolve undefined.
    return this.items.find((item) => item.id === idToFind);
  }
}
