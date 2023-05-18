import Http from '../http'

export const getChainList = () => {
  return Http.get({
    url: '/chain'
  })
}
