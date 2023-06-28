import PropTypes from 'prop-types';

export default function InputSearch({ options, filter, onChange }) {
  return (
    <div>
      {options.length > 0 ? (
        <>
          <p>Find contacts by name</p>
          <input type="text" value={filter} onChange={onChange} />
        </>
      ) : (
        <p>No contacts here</p>
      )}
    </div>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
