export const useInputFormatter = () => {
  const formatBRL = (value: string): string => {
    // Remove all non-digits
    const numericValue = value.replace(/\D/g, "");

    // Convert to number and divide by 100 to get correct decimal places
    const numberValue = parseFloat(numericValue) / 100;

    // Format as BRL currency
    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  const formatToPrice = (value: string): string => {
    // Remove all non-digits
    const numericValue = value.replace(/\D/g, "");

    // Convert to number and divide by 100 to get correct decimal places
    const numberValue = parseFloat(numericValue) / 100;

    // Format as BRL currency
    return numberValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const parseBRL = (value: string): number => {
    // Remove currency formatting and convert to number
    const numericValue = value.replace(/[^\d,]/g, "").replace(",", ".");
    return parseFloat(numericValue) || 0;
  };

  return { formatBRL, formatToPrice, parseBRL };
};
