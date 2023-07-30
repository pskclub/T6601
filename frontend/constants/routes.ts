export const routes = {
  home: {
    to: '/',
    name: CONFIG.TITLE,
  },
  login: {
    to: '/login',
    name: 'เข้าสู่ระบบ',
  },
  logout: {
    to: '/logout',
    name: 'ออกจากระบบ',
  },

  register: {
    to: '/register',
    name: 'ลงทะเบียน',
  },
  myPosts: {
    to: '/profile/posts',
    name: 'Your posts',
  },
}
