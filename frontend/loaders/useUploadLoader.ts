import { IObjectRunLoaderOptions } from '~/lib/api/loaderTypes'
import { useObjectLoader } from '~/lib/api/loaderObject'

export interface IUploadItem {
  url: string
  file_name: string
  path: string
  size: number
  name: string
  mime_type: string
}

export interface IUploadData {
  name: string
  url: string
  path: string
  size: number
  content_type: string
}

export const useUploadLoader = () => {
  const { getDefaultWithAuth } = useRequestOptions()

  return useObjectLoader<IUploadData>({
    method: 'post',
    url: '/upload',
    getRequestOptions: (_data: any, opts: IObjectRunLoaderOptions<any>) => ({
      ...getDefaultWithAuth(),
      headers: {
        ...getDefaultWithAuth().headers,
        'Content-Type': 'multipart/form-data',
      },
      onDownloadProgress: opts.data?.onDownloadProgress,
      onUploadProgress: opts.data?.onUploadProgress,
    }),
  })
}
