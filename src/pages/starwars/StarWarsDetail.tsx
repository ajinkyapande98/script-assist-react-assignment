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
  List,
  Image,
  Avatar,
  ThemeIcon,
  useMantineTheme,
  Center,
  SimpleGrid
} from '@mantine/core';
import { 
  IconAlertCircle, 
  IconArrowLeft, 
  IconInfoCircle, 
  IconMovie, 
  IconRefresh, 
  IconRocket, 
  IconCalendar,
  IconUser
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPerson, getFilm, Film } from '../../api/swapi';

const StarWarsDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>('info');
  const theme = useMantineTheme();
  
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
          <Loader size="xl" variant="dots" />
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

  // Generate placeholder image based on character name
  const placeholderImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=300&background=3B82F6&color=fff`;
  
  return (
    <Container size="lg" py="xl">
      <Group mb="lg">
        <Button 
          leftIcon={<IconArrowLeft size={16} />} 
          variant="outline"
          onClick={() => navigate('/starwars')}
        >
          Back to Characters
        </Button>
      </Group>
      
      <Grid gutter="lg" mb="xl">
        <Grid.Col xs={12} md={4}>
          <Card shadow="sm" className="sw-character-card" withBorder>
            <Card.Section p="lg">
              <Center>
                <Avatar size={200} radius={100} src={placeholderImage} alt={person.name} />
              </Center>
            </Card.Section>
            <Title order={2} align="center" mt="md">{person.name}</Title>
            <Text color="dimmed" align="center">Star Wars Character</Text>
            
            <Group position="center" mt="md" spacing="xs">
              <Badge size="lg" color="blue">Profile #{id}</Badge>
              {person.gender !== 'n/a' && (
                <Badge size="lg" color={person.gender === 'male' ? 'indigo' : 'pink'}>
                  {person.gender}
                </Badge>
              )}
            </Group>
            
            <Text align="center" mt="md">
              <Text component="span" weight={700}>Birth Year:</Text> {person.birth_year}
            </Text>
          </Card>
        </Grid.Col>
        
        <Grid.Col xs={12} md={8}>
          <Tabs value={activeTab} onTabChange={setActiveTab} variant="pills">
            <Tabs.List mb="md">
              <Tabs.Tab value="info" icon={<IconInfoCircle size={14} />}>Character Info</Tabs.Tab>
              <Tabs.Tab value="films" icon={<IconMovie size={14} />}>
                Films
                <Badge ml="xs" size="sm">{person.films.length}</Badge>
              </Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Panel value="info" pt="xs">
              <Card shadow="sm" withBorder>
                <Title order={3} mb="md">Physical Attributes</Title>
                <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
                  <Paper p="md" withBorder radius="md">
                    <Group>
                      <ThemeIcon size="lg" radius="md" variant="light">
                        <IconUser size={20} />
                      </ThemeIcon>
                      <Box>
                        <Text weight={700}>Height</Text>
                        <Text>{person.height !== 'unknown' ? `${person.height} cm` : 'Unknown'}</Text>
                      </Box>
                    </Group>
                  </Paper>
                  
                  <Paper p="md" withBorder radius="md">
                    <Group>
                      <ThemeIcon size="lg" radius="md" variant="light">
                        <IconUser size={20} />
                      </ThemeIcon>
                      <Box>
                        <Text weight={700}>Mass</Text>
                        <Text>{person.mass !== 'unknown' ? `${person.mass} kg` : 'Unknown'}</Text>
                      </Box>
                    </Group>
                  </Paper>
                </SimpleGrid>
                
                <Title order={3} mb="md" mt="xl">Appearance</Title>
                <SimpleGrid cols={3} spacing="lg" breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
                  <Paper p="md" withBorder radius="md">
                    <Group>
                      <ThemeIcon 
                        size="lg" 
                        radius="md" 
                        variant="light" 
                        color={theme.colorScheme === 'dark' ? 'yellow' : 'orange'}
                      >
                        <Box sx={{ width: 20, height: 20, borderRadius: '50%' }} />
                      </ThemeIcon>
                      <Box>
                        <Text weight={700}>Hair Color</Text>
                        <Text sx={{ textTransform: 'capitalize' }}>{person.hair_color}</Text>
                      </Box>
                    </Group>
                  </Paper>
                  
                  <Paper p="md" withBorder radius="md">
                    <Group>
                      <ThemeIcon 
                        size="lg" 
                        radius="md" 
                        variant="light" 
                        color={theme.colorScheme === 'dark' ? 'blue' : 'cyan'}
                      >
                        <Box sx={{ width: 20, height: 20, borderRadius: '50%' }} />
                      </ThemeIcon>
                      <Box>
                        <Text weight={700}>Eye Color</Text>
                        <Text sx={{ textTransform: 'capitalize' }}>{person.eye_color}</Text>
                      </Box>
                    </Group>
                  </Paper>
                  
                  <Paper p="md" withBorder radius="md">
                    <Group>
                      <ThemeIcon 
                        size="lg" 
                        radius="md" 
                        variant="light" 
                        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                      >
                        <Box sx={{ width: 20, height: 20, borderRadius: '50%' }} />
                      </ThemeIcon>
                      <Box>
                        <Text weight={700}>Skin Color</Text>
                        <Text sx={{ textTransform: 'capitalize' }}>{person.skin_color}</Text>
                      </Box>
                    </Group>
                  </Paper>
                </SimpleGrid>
              </Card>
            </Tabs.Panel>
            
            <Tabs.Panel value="films" pt="xs">
              <Card shadow="sm" withBorder>
                <Title order={3} mb="md">Film Appearances</Title>
                
                {isFilmsLoading ? (
                  <Center p="xl">
                    <Loader />
                  </Center>
                ) : isFilmsError ? (
                  <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                    Failed to load films. The API might be experiencing issues.
                  </Alert>
                ) : films && films.length > 0 ? (
                  <Accordion variant="separated" className="sw-film-accordion">
                    {films.map((film: Film) => (
                      <Accordion.Item key={film.url} value={film.title}>
                        <Accordion.Control>
                          <Group position="apart">
                            <Group>
                              <ThemeIcon radius="xl" size="lg" color="blue">
                                <IconMovie size={20} />
                              </ThemeIcon>
                              <div>
                                <Text weight={500}>{film.title}</Text>
                                <Text size="xs" color="dimmed">Episode {film.episode_id}</Text>
                              </div>
                            </Group>
                            <Badge color="blue" size="lg">
                              {new Date(film.release_date).getFullYear()}
                            </Badge>
                          </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Text size="sm" mb="md" sx={{ whiteSpace: 'pre-line' }}>{film.opening_crawl}</Text>
                          <Divider my="md" />
                          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
                            <Group align="flex-start">
                              <ThemeIcon radius="xl" size="md" color="indigo">
                                <IconUser size={14} />
                              </ThemeIcon>
                              <div>
                                <Text weight={700} size="sm">Director:</Text>
                                <Text size="sm">{film.director}</Text>
                              </div>
                            </Group>
                            
                            <Group align="flex-start">
                              <ThemeIcon radius="xl" size="md" color="indigo">
                                <IconCalendar size={14} />
                              </ThemeIcon>
                              <div>
                                <Text weight={700} size="sm">Release Date:</Text>
                                <Text size="sm">{new Date(film.release_date).toLocaleDateString()}</Text>
                              </div>
                            </Group>
                          </SimpleGrid>
                          
                          <Group align="flex-start" mt="md">
                            <ThemeIcon radius="xl" size="md" color="indigo">
                              <IconRocket size={14} />
                            </ThemeIcon>
                            <div>
                              <Text weight={700} size="sm">Producer:</Text>
                              <Text size="sm">{film.producer}</Text>
                            </div>
                          </Group>
                          
                          <Group mt="xl">
                            <Button 
                              variant="outline" 
                              compact
                              component="a"
                              href={`https://www.starwars.com/films`}
                              target="_blank"
                            >
                              Learn More
                            </Button>
                          </Group>
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                  <Text>No films found for this character</Text>
                )}
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default StarWarsDetail; 