import type { ReactNode } from "react";

// Tipo para as propriedades de uma coluna
// 'width' é opcional e será usado apenas no modo tabela
export type TableCardColumnHeader = {
  name: string; // O nome da coluna (chave no objeto de dados)
  label: string; // O texto de cabeçalho a ser exibido
  width?: string; // Por exemplo: '100px', '20%', '1fr', etc. (para o modo tabela)
};

// Tipo para o conteúdo de cada célula da linha.
// Permite string ou um ReactNode (Componente React Personalizado).
export type TableCardCellValue = string | ReactNode;

// Tipo para uma linha de dados.
// É um objeto onde as chaves são os 'name' das colunas e os valores são TableCardCellValue.
// O Record<string, T> permite que as chaves sejam strings genéricas (os nomes das colunas)
// e os valores sejam do tipo TableCardCellValue.
export type TableCardRow = Record<string, TableCardCellValue>;

// Tipo para as propriedades passadas para a função renderCard.
// Contém os dados de uma única linha.
export type TableCardDataProps<T extends TableCardRow> = {
  rowData: T;
  columns: TableCardColumnHeader[];
};

// Tipo para as propriedades do componente TableCard.
export type TableCardProps<T extends TableCardRow> = {
  data: T[];
  columns: TableCardColumnHeader[];
  minWidthForTable?: number; // Largura em pixels para mudar de Card para Tabela
  renderCard: (cardProps: TableCardDataProps<T>) => ReactNode;
};
