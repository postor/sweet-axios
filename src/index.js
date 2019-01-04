import Swal from 'sweetalert2'
import request from 'axios'
import { isString } from 'util';

const bind = (fn, swalConfig = {}) => {
  return (...args) => {
    const {
      start = () => Swal({
        title: 'please wait',
        text: 'starting request...',
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      }),
      progress = progressEvent => {
        Swal.getContent().textContent = `progress ${((progressEvent.loaded * 100) / progressEvent.total).toFixed()}%`
      },
      end = () => Swal.close()
    } = swalConfig
    start()

    const lastArgs = args[args.length - 1]
    const newArgs = isString(lastArgs)
      || (typeof URLSearchParams != 'undefined' && lastArgs instanceof URLSearchParams)
      || (typeof FormData != 'undefined' && lastArgs instanceof FormData)
      ? [lastArgs, {}] : [...args]
    const axiosConfig = newArgs[newArgs.length - 1]
    const { onUploadProgress = () => { }, onDownloadProgress = () => { } } = axiosConfig
    newArgs[newArgs.length - 1] = {
      ...axiosConfig,
      onUploadProgress: (e) => {
        onUploadProgress(e)
        progress(e)
      },
      onDownloadProgress: (e) => {
        onDownloadProgress(e)
        progress(e)
      }
    }

    return fn(...newArgs).then(x => {
      end()
      return x
    })
  }
}

export default (config) => {
  const swalRequest = bind(request, config);
  ['get', 'head', 'post', 'put', 'delete', 'connect', 'options', 'trace', 'patch'].forEach(k => swalRequest[k] = bind(request[k], config))
  return swalRequest
}