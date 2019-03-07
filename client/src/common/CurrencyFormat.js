const CurrencyFormat = ({ price, currency = 'USD', digit = 0 }) => {
  return (
    new Intl.NumberFormat("en", {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: digit,
    }).format(price)
  )
}

export default CurrencyFormat;