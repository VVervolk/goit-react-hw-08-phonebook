import { useDispatch } from 'react-redux';
import { useGetContactsQuery } from 'redux/auth/services';
import { makeFilter } from 'redux/slices/filterSlice';

export default function InputSearch() {
  const { data } = useGetContactsQuery();
  const shouldRender = data && data.length !== 0;

  const dispatch = useDispatch();

  return (
    <div>
      {shouldRender ? (
        <>
          <p>Find contacts by name</p>
          <input
            type="text"
            onChange={e => dispatch(makeFilter(e.target.value))}
          />
        </>
      ) : (
        <p>No contacts here</p>
      )}
    </div>
  );
}
