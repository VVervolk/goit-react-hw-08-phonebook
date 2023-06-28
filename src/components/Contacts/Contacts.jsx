import PropTypes from 'prop-types';
import Item from './Item';

export default function Contacts({ filter, options, deleteContact }) {
  return (
    <ul>
      {filter === ''
        ? options.map(contact => (
            <Item
              key={crypto.randomUUID().slice(0, 5)}
              contact={contact}
              deleteContact={deleteContact}
            ></Item>
          ))
        : options
            .filter(value =>
              value.name.toLowerCase().includes(`${filter.toLowerCase()}`)
            )
            .map(contact => (
              <Item
                key={crypto.randomUUID().slice(0, 5)}
                contact={contact}
                deleteContact={deleteContact}
              ></Item>
            ))}
    </ul>
  );
}

Contacts.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string,
  deleteContact: PropTypes.func.isRequired,
};
