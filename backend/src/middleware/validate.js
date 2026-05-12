function validate(schema, source = 'body') {
  return (req, res, next) => {
    if (!schema || typeof schema.safeParse !== 'function') {
      return next();
    }

    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: result.error.flatten(),
      });
    }

    req[source] = result.data;
    return next();
  };
}

module.exports = { validate };
