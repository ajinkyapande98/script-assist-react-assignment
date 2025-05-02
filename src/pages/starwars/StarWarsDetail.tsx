import { FC, useState } from 'react';
import { 
  Container,
  Title,
  Paper,
  Group,
  Text,
  Loader,
  Alert,
  Badge,
  Grid,
  Tabs,
  Card,
  Accordion,
  Divider,
  Button,
  Box,
  List
} from '@mantine/core';
import { IconAlertCircle, IconArrowLeft, IconInfoCircle, IconMovie, IconRefresh } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPerson, getFilm, Film } from '../../api/swapi';

const StarWarsDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>('info');
  
  const { 
    data: person, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useQuery(
    ['person', id],
    () => getPerson(id!),
    {
      enabled: !!id,
      retry: 3,
      retryDelay: 1000,
    }
  );
  
  const { 
    data: films, 
    isLoading: isFilmsLoading, 
    isError: isFilmsError,
  } = useQuery(
    ['films', person?.films],
    async () => {
      if (!person?.films || person.films.length === 0) {
        return [];
      }
      return Promise.all(person.films.map(filmUrl => getFilm(filmUrl)));
    },
    {
      enabled: !!person && person.films.length > 0,
      retry: 3,
      retryDelay: 1000,
    }
  );
  
  const renderErrorContent = (errorMessage: string) => (
    <Container size="md" py="xl">
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="lg">
        {errorMessage}
      </Alert>
      
      <Paper shadow="xs" p="xl" withBorder>
        <Box>
          <Group mb="md">
            <IconInfoCircle size={24} />
            <Title order={3}>API Connection Issues</Title>
          </Group>
          
          <Text mb="md">
            We're experiencing connection issues with the Star Wars API. The SSL certificate might be invalid or the service might be temporarily down.
          </Text>
          
          <Title order={4} mb="xs">Troubleshooting options:</Title>
          <List>
            <List.Item>Try refreshing the data</List.Item>
            <List.Item>Check your browser's security settings and temporarily allow insecure content for this site (for development only)</List.Item>
            <List.Item>Try again later when the API might be back online</List.Item>
          </List>
          
          <Group mt="xl">
            <Button leftIcon={<IconRefresh size={16} />} onClick={() => refetch()}>
              Retry
            </Button>
            <Button 
              leftIcon={<IconArrowLeft size={16} />} 
              variant="outline"
              onClick={() => navigate('/starwars')}
            >
              Back to Characters
            </Button>
          </Group>
        </Box>
      </Paper>
    </Container>
  );
  
  if (isLoading) {
    return (
      <Container size="md" py="xl">
        <Paper shadow="xs" p="xl" withBorder sx={{ display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </Paper>
      </Container>
    );
  }
  
  if (isError) {
    return renderErrorContent((error as Error).message || 'Failed to load character details');
  }
  
  if (!person) {
    return (
      <Container size="md" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Not Found" color="yellow">
          Character not found
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container size="md" py="xl">
      <Group mb="md">
        <Button 
          leftIcon={<IconArrowLeft size={16} />} 
          variant="outline"
          onClick={() => navigate('/starwars')}
        >
          Back to Characters
        </Button>
      </Group>
      
      <Paper shadow="sm" p="lg" radius="md" withBorder mb="lg">
        <Title order={1}>{person.name}</Title>
        <Text color="dimmed">Star Wars Character</Text>
      </Paper>
      
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="info" icon={<IconInfoCircle size={14} />}>Character Info</Tabs.Tab>
          <Tabs.Tab value="films" icon={<IconMovie size={14} />}>
            Films
            <Badge ml="xs" size="sm">{person.films.length}</Badge>
          </Tabs.Tab>
        </Tabs.List>
        
        <Tabs.Panel value="info" pt="xs">
          <Paper shadow="sm" p="lg" withBorder mt="md">
            <Grid>
              <Grid.Col span={6}>
                <Text weight={700}>Height:</Text>
                <Text>{person.height !== 'unknown' ? `${person.height} cm` : 'Unknown'}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text weight={700}>Mass:</Text>
                <Text>{person.mass !== 'unknown' ? `${person.mass} kg` : 'Unknown'}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text weight={700}>Hair Color:</Text>
                <Text>{person.hair_color}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text weight={700}>Skin Color:</Text>
                <Text>{person.skin_color}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text weight={700}>Eye Color:</Text>
                <Text>{person.eye_color}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text weight={700}>Birth Year:</Text>
                <Text>{person.birth_year}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text weight={700}>Gender:</Text>
                <Text>{person.gender}</Text>
              </Grid.Col>
            </Grid>
          </Paper>
        </Tabs.Panel>
        
        <Tabs.Panel value="films" pt="xs">
          <Paper shadow="sm" p="lg" withBorder mt="md">
            {isFilmsLoading ? (
              <Loader />
            ) : isFilmsError ? (
              <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                Failed to load films. The API might be experiencing issues.
              </Alert>
            ) : films && films.length > 0 ? (
              <Accordion>
                {films.map((film: Film) => (
                  <Accordion.Item key={film.url} value={film.title}>
                    <Accordion.Control>
                      <Group>
                        <Text>{film.title}</Text>
                        <Badge color="blue">Episode {film.episode_id}</Badge>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Text size="sm" mb="md">{film.opening_crawl}</Text>
                      <Divider my="sm" />
                      <Grid>
                        <Grid.Col span={6}>
                          <Text weight={700} size="sm">Director:</Text>
                          <Text size="sm">{film.director}</Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Text weight={700} size="sm">Release Date:</Text>
                          <Text size="sm">{film.release_date}</Text>
                        </Grid.Col>
                        <Grid.Col span={12}>
                          <Text weight={700} size="sm">Producer:</Text>
                          <Text size="sm">{film.producer}</Text>
                        </Grid.Col>
                      </Grid>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <Text>No films found for this character</Text>
            )}
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default StarWarsDetail; 