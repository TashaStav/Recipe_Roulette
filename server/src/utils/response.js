export function success(data) {
  return {
    success: true,
    data,
    error: null,
  };
}

export function error(message, code = 500) {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
    },
  };
}