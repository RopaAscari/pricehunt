/**
 * Description - Properly format a numerical value to currency text
 * @param amount - number to be formatted
 */
export function format(amount: number | string){
  return (Number(amount)
    .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,'));
};