import { Container } from 'components/others/Container.styled';
import { Description, Hero, Title } from './Home.styled';
import { Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Hero>
        <Container>
          <Title>Phonebook - organize your contacts effortlessly</Title>
          <Description>
            Keep your personal and professional contacts in one place with
            Phonebook. Say goodbye to scattered contacts and hello to seamless
            organization.
          </Description>
          <Button color="blue.600" as={NavLink} to="/register">
            Get started
            <ArrowForwardIcon marginLeft="8px" />
          </Button>
        </Container>
      </Hero>
    </>
  );
}
