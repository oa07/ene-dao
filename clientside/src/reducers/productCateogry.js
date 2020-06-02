import {
  SUBMIT_PROD_CATEGORY,
  PROD_CATEGORY_LOADING,
  FETCH_PROD_CATEGORY,
  PROD_CATEGORY_UPDATED,
  PROD_CATEGORY_DELETED,
} from '../actions/types';

const initialState = {
  category: {},
  categories: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROD_CATEGORY_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SUBMIT_PROD_CATEGORY:
      return {
        category: action.payload,
        categories: [action.payload, ...state.categories],
        isLoading: false,
      };
    case FETCH_PROD_CATEGORY:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      };

    case PROD_CATEGORY_UPDATED:
      const index = state.categories.findIndex(
        (cat) => cat._id === action.payload._id
      );

      return {
        ...state,
        isLoading: false,
        categories: [
          ...state.categories.slice(0, index),
          action.payload,
          ...state.categories.slice(index + 1),
        ],
      };
    case PROD_CATEGORY_DELETED:
      return {
        ...state,
        isLoading: false,
        categories: state.categories.filter(
          (cat) => cat._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
}
