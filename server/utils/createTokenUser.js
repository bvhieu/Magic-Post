const createTokenUser = (user) => {
  return {
    name: user.name,
    email: user.email,
    region: user.region,
    point: user.point,
    userId: user.id,
    role: user.role
  };
};

module.exports = createTokenUser;
