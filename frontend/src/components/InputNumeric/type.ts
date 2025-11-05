import type { InputBaseProps } from "@mui/material";
import type { ReactNode } from "react";

// Estende as propriedades base do TextField (omitindo 'type' e 'multiline')
export interface InputNumericProps extends Omit<InputBaseProps, "onChange"> {
  // Propriedades herdadas do InputText:
  label?: string;
  className?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;

  // Propriedades Numéricas:
  value: number | null | undefined; // O valor interno (numérico)
  onChange: (value: number | null) => void; // Retorna o valor numérico

  // Propriedades de Validação:
  min?: number;
  max?: number;
  step?: number;

  helperText?: string;
  formatValue: (v: number | null | undefined) => string;
  /** * Função para remover a formatação e retornar o número puro para edição.
   * (ex: "R$ 20,50" -> "20.5" ou "20,5")
   */
  parseValue: (v: string) => string;
}
