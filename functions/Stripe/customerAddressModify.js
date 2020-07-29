const customerAddressModify = async (stripe, userData, firstTime) => {
  const { stripeData, address, billingAddress } = userData;
  let customer;
  if (firstTime === true) {
    customer = await stripe.customers.update(stripeData.id, {
      address: {
        line1: address.address,
        city: address.city,
        country: address.country,
        postal_code: address.postalCode,
      },
      shipping: {
        name: `${address.firstName} ${address.lastName}`,
        address: {
          line1: address.address,
          city: address.city,
          country: address.country,
          postal_code: address.postalCode,
        },
      },
    });
  } else if (firstTime === false) {
    customer = await stripe.customers.update(stripeData.id, {
      address: {
        line1: address.address,
        city: address.city,
        country: address.country,
        postal_code: address.postalCode,
      },
    });
  } else if (firstTime === "billing") {
    console.log(userData);
    customer = await stripe.customers.update(stripeData.id, {
      shipping: {
        name: `${billingAddress.firstName} ${billingAddress.lastName}`,
        address: {
          line1: billingAddress.address,
          city: billingAddress.city,
          country: billingAddress.country,
          postal_code: billingAddress.postalCode,
        },
      },
    });
    console.log(customer);
  }
  console.log(customer);
  return customer;
};

module.exports = customerAddressModify;
