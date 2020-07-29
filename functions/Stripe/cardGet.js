const cardGet = async (stripe, customerId) => {
  try {
    let user = await stripe.customers.retrieve(customerId);
    let paymentMethod = await stripe.paymentMethods.retrieve(
      user.invoice_settings.default_payment_method
    );
    return paymentMethod.card;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = cardGet;
