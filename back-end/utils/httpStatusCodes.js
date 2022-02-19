const clientErrors = {
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
};

const successResponses = {
  ok: 200,
};

const serverErrors = {
  internalServerError: 500,
};

module.exports = { clientErrors, successResponses, serverErrors };
