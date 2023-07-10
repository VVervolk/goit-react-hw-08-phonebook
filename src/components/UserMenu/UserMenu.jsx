import { useDispatch, useSelector } from 'react-redux';
import { removeCredentials } from 'redux/auth/authSlice';
import { useLogOutMutation } from 'redux/auth/services';
import { selectUser } from 'redux/selectors';
import { toast } from 'react-toastify';

export default function UserMenu() {
  const [logOut, { reset }] = useLogOutMutation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser).name;

  async function handleClick() {
    await logOut();
    dispatch(removeCredentials());
    reset();
    toast.success('Successful logout!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    return;
  }

  return (
    <>
      <div>
        <p>{user}</p>
        <button onClick={handleClick} type="button">
          Logout
        </button>
      </div>
    </>
  );
}
