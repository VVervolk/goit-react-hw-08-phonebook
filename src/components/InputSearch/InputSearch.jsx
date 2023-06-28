import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { makeFilter } from 'redux/slices/filterSlice';

export default function InputSearch() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  return (
    <div>
      {contacts.length > 0 ? (
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
