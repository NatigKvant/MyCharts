const getExchangeRate = async () => {
    try {
        return (await fetch('http://apilayer.net/api/live?access_key=7f45ab6dac83bacf3248ce4d8fed22e1&currencies=RUB&source=USD&format=1')
            .then((response) => {
                return response.json()
            })).quotes.USDRUB

    } catch (error) {
        throw new Error(`Не выходит получить курс обмена для RUB и USD`);
    }
}
export const convertCurrency = async (amount) => {
    const exchangeRate = await getExchangeRate();

    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} USD стоит ${convertedAmount} RUB`;
}
convertCurrency(3)
    .then((message) => {
        /*console.log(message);*/
    }).catch((error) => {
    console.log(error.message);
});
