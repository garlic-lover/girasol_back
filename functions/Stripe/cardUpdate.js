const cardUpdate = async (stripe, customerId, cardId) => {
  try {
    let card = await stripe.customers.retrieveSource(customerId, cardId);
    return card;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = cardUpdate;
