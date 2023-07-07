import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  //   selectIsRefreshing,
} from 'redux/selectors';

export default function useAuth() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  //   const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);

  return {
    isLoggedIn,
    // isRefreshing,
    user,
  };
}
