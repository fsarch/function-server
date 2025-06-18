export type WorkerConfigType = {
  api: {
    [key: string]: {
      type: 'pdf-render',
      url: string;
    };
  };
};
