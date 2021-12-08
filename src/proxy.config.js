const proxy = [
    {
      context: '/oauth',
      target: 'http://localhost:8090',
      pathRewrite: {'^/oauth' : ''}
    }
  ];
  module.exports = proxy;