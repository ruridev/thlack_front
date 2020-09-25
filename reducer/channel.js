import actionCreator from '../action/index';
const { GET_CATEGORIES } = actionCreator.category;

const category = (state = null, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      const categories = action.categories.reduce(function(map, obj) {
        map[obj.id] = obj;
        return map;
      }, {});
      return categories;
    default:
      return state;
  }
};

export default category;
