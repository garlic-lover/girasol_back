const customerAccountCreate = async (stripe, userData) => {
  const { firstName, lastName, email } = userData;
  let customer = await stripe.customers.create({
    name: `${firstName} ${lastName}`,
    email: email,
    description: "Customer",
  });
  console.log(customer);
  return customer;
};

module.exports = customerAccountCreate;
