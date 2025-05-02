import { FC, useState } from 'react';
import { 
  Container, 
  Title, 
  Paper, 
  Table, 
  Text, 
  TextInput, 
  Group, 
  Button, 
  Pagination, 
  Loader, 
  Alert, 
  Badge,
  Box,
  List
} from '@mantine/core';
import { IconAlertCircle, IconSearch, IconInfoCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPeople, searchPeople, extractIdFromUrl } from '../../api/swapi';

const StarWarsList: FC = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const { data, isLoading, isError, error } = useQuery(
    ['people', page, debouncedQuery],
    () => debouncedQuery ? searchPeople(debouncedQuery) : getPeople(page),
    {
      keepPreviousData: true,
      retry: 3,
      retryDelay: 1000,
    }
  );
  
  const handleSearch = () => {
    setDebouncedQuery(searchQuery);
    setPage(1);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setPage(1);
  };
  
  const totalPages = data ? Math.ceil(data.count / 10) : 0;
  
  const renderErrorContent = () => (
    <>
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="lg">
        {(error as Error).message || 'Failed to load characters'}
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
            <List.Item>Try refreshing the page</List.Item>
            <List.Item>Check your browser's security settings and temporarily allow insecure content for this site (for development only)</List.Item>
            <List.Item>Try again later when the API might be back online</List.Item>
          </List>
          
          <Group mt="xl">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button component={Link} to="/" variant="outline">
              Go to Home
            </Button>
          </Group>
        </Box>
      </Paper>
    </>
  );
  
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="md">Star Wars Characters</Title>
      
      <Paper shadow="xs" p="md" withBorder mb="lg">
        <Group position="apart" mb="md">
          <TextInput
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            icon={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Group spacing="sm">
            <Button onClick={handleSearch}>Search</Button>
            {debouncedQuery && (
              <Button variant="outline" onClick={clearSearch}>
                Clear
              </Button>
            )}
          </Group>
        </Group>
        
        {debouncedQuery && (
          <Text color="dimmed" mb="md">
            Showing results for "{debouncedQuery}"
          </Text>
        )}
      </Paper>
      
      {isLoading ? (
        <Paper shadow="xs" p="xl" withBorder sx={{ display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </Paper>
      ) : isError ? (
        renderErrorContent()
      ) : (
        <>
          <Paper shadow="xs" withBorder>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Birth Year</th>
                  <th>Height</th>
                  <th>Films</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.results.map((person) => {
                  const id = extractIdFromUrl(person.url);
                  return (
                    <tr key={person.url}>
                      <td>{person.name}</td>
                      <td>{person.gender}</td>
                      <td>{person.birth_year}</td>
                      <td>{person.height !== 'unknown' ? `${person.height} cm` : 'Unknown'}</td>
                      <td>
                        <Badge>{person.films.length}</Badge>
                      </td>
                      <td>
                        <Button 
                          component={Link} 
                          to={`/starwars/${id}`} 
                          size="xs"
                          variant="subtle"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Paper>
          
          {totalPages > 0 && (
            <Group position="center" mt="lg">
              <Pagination 
                total={totalPages} 
                value={page} 
                onChange={setPage} 
                withEdges 
              />
            </Group>
          )}
        </>
      )}
    </Container>
  );
};

export default StarWarsList; 