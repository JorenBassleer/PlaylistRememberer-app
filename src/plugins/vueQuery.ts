import { VueQueryPlugin, QueryClient, VueQueryPluginOptions } from '@tanstack/vue-query';
import { App } from 'vue';

const queryClient = new QueryClient();

const setupVueQuery = (app: App) => {
  app.use(VueQueryPlugin, {
    queryClient,
  } as VueQueryPluginOptions);
};

export default setupVueQuery;
