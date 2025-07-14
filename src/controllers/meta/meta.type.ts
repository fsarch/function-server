export type WorkerConfigType = {
  api: {
    [key: string]: 
      | {
          type: 'pdf-server';
          url: string;
        }
      | {
          type: 'material-tracing-server';
          url: string;
        }
      | {
          type: 'product-server';
          url: string;
          catalogId: string;
        }
      | {
          type: 'printer-server';
          url: string;
        };
  };
};
