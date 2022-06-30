exports.handler = async (event) => {
  console.log(event);

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      `Hello from Lambda ${process.env.AWS_LAMBDA_FUNCTION_VERSION}`
    ),
  };

  // throw new Error("custom error!");

  return response;
};
