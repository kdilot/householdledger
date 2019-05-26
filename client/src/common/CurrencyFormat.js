const CurrencyFormat = ({ price, currency = 'USD', digit = 0 }) => {
  return (
    price > 0 ?
      new Intl.NumberFormat("en", {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: digit,
      }).format(price)
      : '-'
  )
}

export default CurrencyFormat;