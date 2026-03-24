export default () => ({
  port: parseInt(process.env.PORT || '', 10) || 3000,
  authService: {
    containerName: process.env.SHOP_AUTH_CONTAINER_NAME || 'shop-auth',
    port: parseInt(process.env.SHOP_AUTH_EXPOSE_PORT || '', 10) || 3003,
  },
  goodsServiceBaseUrl: process.env.SHOP_BASE_URL || '',
});
