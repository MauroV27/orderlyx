import React, { type JSX, type ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery, // Hook essencial para a responsividade do MUI
  useTheme, // Para acessar as configurações do tema (opcional, mas recomendado)
} from "@mui/material";
import type {
  TableCardProps,
  TableCardRow,
  TableCardDataProps,
  TableCardColumnHeader,
} from "./type"; // Importa os tipos
// Importa os tipos
import styles from "./tableCard.module.css"; // Importa o CSS

// Componente de Tabela
function TableView<T extends TableCardRow>({
  data,
  columns,
}: {
  data: T[];
  columns: TableCardColumnHeader[];
}) {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table aria-label="responsive table">
        {/* Cabeçalho da Tabela */}
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <TableCell key={column.name} style={{ width: column.width }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* Corpo da Tabela */}
        <TableBody>
          {(data ?? []).map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {(columns ?? []).map((column) => (
                <TableCell key={`${rowIndex}-${column.name}`}>
                  {row[column.name]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Componente de Cards
function CardView<T extends TableCardRow>({
  data,
  columns,
  renderCard,
}: {
  data: T[];
  columns: TableCardColumnHeader[];
  renderCard: (cardProps: TableCardDataProps<T>) => ReactNode;
}): JSX.Element {
  return (
    <div className={styles.cardContainer}>
      {(data ?? []).map((rowData, index) => (
        // Chama a função renderCard, passando os dados da linha
        <React.Fragment key={index}>
          {renderCard({ rowData, columns })}
        </React.Fragment>
      ))}
    </div>
  );
}

// Componente Principal TableCard
export function TableCard<T extends TableCardRow>({
  data,
  columns,
  renderCard,
  minWidthForTable = 768,
}: TableCardProps<T>) {
  const theme = useTheme();

  // O useMediaQuery é a chave. Ele verifica se a largura é >= minWidthForTable.
  // Criamos um breakpoint customizado para o nosso minWidth.
  const isTableMode = useMediaQuery(theme.breakpoints.up(minWidthForTable));

  console.log(1232, data);

  // Renderiza a Tabela ou os Cards com base na largura
  if (isTableMode) {
    return <TableView data={data} columns={columns} />;
  } else {
    return <CardView data={data} columns={columns} renderCard={renderCard} />;
  }
}
