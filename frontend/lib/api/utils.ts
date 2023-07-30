interface IGetParams {
  params?: {
    [key: string]: any
  }
}

export const getParams = (opts: IGetParams, reqOptions: IGetParams) => {
  if (opts.params) {
    return {
      ...reqOptions.params,
      ...opts.params,
    }
  }

  return reqOptions.params
}
