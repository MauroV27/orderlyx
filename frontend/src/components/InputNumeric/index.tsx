import React, { useState, useEffect, useCallback, type JSX } from "react";
import InputBase from "@mui/material/InputBase"; // Importação do componente base
import clsx from "clsx";

import { InputAdornment } from "@mui/material";

import styles from "./inputText.module.css";
import type { InputNumericProps } from "./type";

const InputNumeric: React.FC<InputNumericProps> = ({
  label,
  className,
  value,
  onChange,
  iconStart,
  iconEnd,
  min,
  max,
  step,
  error,
  helperText,
  formatValue,
  parseValue,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  ...props
}): JSX.Element => {
  const [displayValue, setDisplayValue] = useState<string>(formatValue(value));
  const [isFocused, setIsFocused] = useState(false);

  // Efeito para atualizar displayValue quando o valor numérico (prop) muda
  useEffect(() => {
    // 💡 Só atualiza a exibição se NÃO estiver focado
    if (!isFocused) {
      const formatted = formatValue(value);
      setDisplayValue(formatted);
    }
  }, [value, isFocused, formatValue]);

  // Lógica para obter o número do texto e aplicar validações
  const processAndValidateValue = useCallback(
    (text: string): number | null => {
      // 1. Converte o texto para número.
      // Usamos o Number() aqui, mas o parseValue deve garantir que o texto
      // retornado é algo que o JS consegue converter (Ex: "20.5" em vez de "20,5")
      const numericValue = Number(text);

      if (isNaN(numericValue) || text.trim() === "") {
        return null;
      }

      // 2. Aplica validação Min/Max
      let finalValue = numericValue;
      if (min !== undefined && finalValue < min) {
        finalValue = min;
      }
      if (max !== undefined && finalValue > max) {
        finalValue = max;
      }

      return finalValue;
    },
    [min, max]
  );

  // --- HANDLERS DE FOCO ---
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);

      // 💡 Usa a prop 'parseValue' para remover a formatação complexa.
      // O valor resultante será a string numérica pura para edição (Ex: "20.05").
      const pureValue = parseValue(displayValue);
      setDisplayValue(pureValue);

      if (onFocusProp) {
        onFocusProp(event);
      }
    },
    [displayValue, parseValue, onFocusProp]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      // 1. Garante que o valor final (puro) no estado do React está atualizado
      // Usa o último 'displayValue' para recalcular o valor numérico
      const lastDisplayValue = event.target.value;
      const pureValueForValidation = parseValue(lastDisplayValue);
      const finalNumericValue = processAndValidateValue(pureValueForValidation);

      // 2. Chama o onChange final (caso as props tenham mudado)
      onChange(finalNumericValue);

      // 3. Aplica a formatação customizada para exibição (usando o valor numérico ATUALIZADO)
      const formatted = formatValue(finalNumericValue);
      setDisplayValue(formatted);

      if (onBlurProp) {
        onBlurProp(event);
      }
    },
    [processAndValidateValue, onChange, formatValue, parseValue, onBlurProp]
  );

  // --- HANDLER DE MUDANÇA ---
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;

      // 1. Atualiza o displayValue IMEDIATAMENTE (para feedback de digitação)
      setDisplayValue(text);

      // 2. Converte o texto de entrada para um formato puro para validação
      const pureValueForValidation = parseValue(text);

      // 3. Processa e valida o valor, e notifica o componente pai.
      // É importante chamar onChange aqui para que o componente pai tenha o valor
      // numérico mais recente durante a digitação.
      const finalNumericValue = processAndValidateValue(pureValueForValidation);
      onChange(finalNumericValue);
    },
    [onChange, parseValue, processAndValidateValue]
  );

  // Adorno final: não mostra o iconEnd se estiver focado
  const EndAdornment = iconEnd ? (
    <InputAdornment position="end">{iconEnd}</InputAdornment>
  ) : undefined;

  const StartAdornment = iconStart ? (
    <InputAdornment position="start">{iconStart}</InputAdornment>
  ) : undefined;

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label className={clsx(styles.label, { [styles.errorLabel]: error })}>
          {label}
        </label>
      )}

      <InputBase
        {...props}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
        fullWidth={props.fullWidth !== undefined ? props.fullWidth : true}
        className={clsx(styles.inputBase, { [styles.errorInput]: error })}
        startAdornment={StartAdornment}
        endAdornment={EndAdornment}
        inputProps={{
          min: min,
          max: max,
          step: step,
          style: { textAlign: "right" },
        }}
      />

      {helperText && (
        <p className={clsx(styles.helperText, { [styles.errorHelper]: error })}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputNumeric;
