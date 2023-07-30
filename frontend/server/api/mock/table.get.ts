import { _toNumber } from '~/utils/lodash'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const { limit, page } = query

  let items: any = []

  switch (page) {
    case '1':
      items = [
        {
          id: '5618d581-7a31-4b1d-be2b-ffcf3308c0f8',
          name: 'John Doe',
          email: 'johndoe@email.com',
          createdAt: '2022-05-29T19:52:32Z',
          createdBy: null,
        },
        {
          id: 'ebdbd192-5b08-4281-84f2-913be5a3ec7c',
          name: 'Peter Parker',
          email: 'peter@email.com',
          createdAt: '2022-05-29T19:52:32Z',
          createdBy: 'user_uuid',
        },
        {
          id: 'ebdbd192-5b08-4281-84f2-913asda2a3ec7c',
          name: 'Ive Got A Name',
          email: 'ive@email.com',
          createdAt: '2022-05-29T19:52:32Z',
          createdBy: 'user_uuid',
        },
      ]

      break
    case '2':
      items = [
        {
          id: '5618d581-7a31-4b1d-be2b-ffcf3308c0f8',
          name: 'John Xerxes Doe',
          email: 'xerxes@email.com',
          createdAt: '2022-05-29T19:52:32Z',
          createdBy: null,
        },
        {
          id: 'ebdbd192-5b08-4281-84f2-913be5a3ec7c',
          name: 'Peter Benjamin Parker',
          email: 'parker@email.com',
          createdAt: '2022-05-29T19:52:32Z',
          createdBy: 'user_uuid',
        },
        {
          id: 'ebdbd192-5b08-4281-84f2-91300222a3ec7c',
          name: 'Ive Got A Name 2',
          email: 'ive@email.com',
          createdAt: '2022-05-29T19:52:32Z',
          createdBy: 'user_uuid',
        },
      ]

      break
    default:
      items = []
  }

  return {
    page: _toNumber(page),
    total: page !== '1' && page !== '2' ? 0 : 6,
    limit: _toNumber(limit),
    count: items.length,
    items,
  }
})
