import { useDispatch } from 'react-redux';
import { useGetContactsQuery } from 'redux/auth/services';
import { makeFilter } from 'redux/slices/filterSlice';
import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

export default function InputSearch() {
  const { data } = useGetContactsQuery();
  const shouldRender = data && data.length !== 0;

  const dispatch = useDispatch();

  return (
    <>
      {shouldRender ? (
        <InputGroup w={'80%'}>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="blue.600" />
          </InputLeftElement>
          <Input
            onChange={e => dispatch(makeFilter(e.target.value))}
            type="text"
            placeholder="Find contacts by name"
          />
        </InputGroup>
      ) : (
        <Text
          color={'blue.600'}
          fontWeight={'500'}
          fontSize={'clamp(1rem, 2.5vw, 1.5rem)'}
          mt={'30px'}
        >
          You haven`t add any contact yet!
        </Text>
      )}
    </>
  );
}
