export default {
  User: {
    fullname(user) {
      return `${user.firstname} ${user.lastname}`;
    },
  },
  Query: {
    users() {
      return [
        {
          firstname: 'Theodor',
          lastname: 'Diaconu',
        },
        {
          firstname: 'Claudiu',
          lastname: 'Roman',
        },
      ];
    },
  },
};
