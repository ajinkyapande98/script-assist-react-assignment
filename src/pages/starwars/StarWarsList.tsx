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
  List,
  Card,
  Avatar,
  ActionIcon,
  Tooltip,
  Center,
  Grid,
  SimpleGrid
} from '@mantine/core';
import { 
  IconAlertCircle, 
  IconSearch, 
  IconInfoCircle, 
  IconChevronRight, 
  IconFilter,
  IconUserCircle,
  IconGenderBigender,
  IconCalendar,
  IconFilterOff 
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPeople, searchPeople, extractIdFromUrl } from '../../api/swapi';

const StarWarsList: FC = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filterGender, setFilterGender] = useState<string | null>(null);
  
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

  const clearFilters = () => {
    setFilterGender(null);
  };
  
  const filteredResults = data?.results.filter(person => {
    if (!filterGender) return true;
    return person.gender === filterGender;
  }) || [];
  
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

  const renderCharacterCard = (person: any) => {
    const id = extractIdFromUrl(person.url);
    const placeholderImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=128&background=3B82F6&color=fff`;
    
    return (
      <Card key={person.url} shadow="sm" p="lg" radius="md" withBorder className="sw-character-card">
        <Group position="apart" mb="md">
          <Avatar size="lg" radius="xl" src={placeholderImage} alt={person.name} />
          <Badge size="lg" color="blue">
            ID: {id}
          </Badge>
        </Group>
        
        <Title order={4} mb="xs">{person.name}</Title>
        
        <Group spacing="xs" mb="xs">
          <IconGenderBigender size={16} />
          <Text size="sm" color="dimmed" sx={{ textTransform: 'capitalize' }}>
            {person.gender !== 'n/a' ? person.gender : 'Unknown'}
          </Text>
        </Group>
        
        <Group spacing="xs" mb="xs">
          <IconCalendar size={16} />
          <Text size="sm" color="dimmed">
            Born: {person.birth_year}
          </Text>
        </Group>
        
        <Group spacing="xs" mb="md">
          <IconUserCircle size={16} />
          <Text size="sm" color="dimmed">
            Height: {person.height !== 'unknown' ? `${person.height} cm` : 'Unknown'}
          </Text>
        </Group>
        
        <Group position="apart" mt="md">
          <Badge>
            {person.films.length} {person.films.length === 1 ? 'film' : 'films'}
          </Badge>
          <Button 
            component={Link} 
            to={`/starwars/${id}`} 
            variant="light"
            rightIcon={<IconChevronRight size={16} />}
            radius="md"
          >
            View Details
          </Button>
        </Group>
      </Card>
    );
  };
  
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="md">Star Wars Characters</Title>
      
      <Card shadow="sm" withBorder mb="lg" p="lg">
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

        <Group position="apart">
          <Group spacing="xs">
            <Text weight={500}>Filters:</Text>
            <Tooltip label="Show male characters">
              <ActionIcon 
                variant={filterGender === 'male' ? 'filled' : 'outline'} 
                color="blue"
                onClick={() => setFilterGender(filterGender === 'male' ? null : 'male')}
              >
                <IconFilter size={16} />
                M
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Show female characters">
              <ActionIcon 
                variant={filterGender === 'female' ? 'filled' : 'outline'} 
                color="pink"
                onClick={() => setFilterGender(filterGender === 'female' ? null : 'female')}
              >
                <IconFilter size={16} />
                F
              </ActionIcon>
            </Tooltip>
            {filterGender && (
              <Tooltip label="Clear all filters">
                <ActionIcon 
                  variant="subtle" 
                  color="gray"
                  onClick={clearFilters}
                >
                  <IconFilterOff size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
          
          {filterGender && (
            <Text size="sm" color="dimmed">
              Filtered by: {filterGender === 'male' ? 'Male' : 'Female'} characters
            </Text>
          )}
        </Group>
      </Card>
      
      {isLoading ? (
        <Center p="xl">
          <Loader size="xl" variant="dots" />
        </Center>
      ) : isError ? (
        renderErrorContent()
      ) : (
        <>
          <SimpleGrid 
            cols={3} 
            spacing="lg" 
            breakpoints={[
              { maxWidth: 'md', cols: 2 },
              { maxWidth: 'xs', cols: 1 }
            ]}
          >
            {filteredResults.map(renderCharacterCard)}
          </SimpleGrid>
          
          {filteredResults.length === 0 && (
            <Card shadow="sm" withBorder p="xl" mt="lg">
              <Center>
                <Box>
                  <Title order={3} align="center">No Results Found</Title>
                  <Text align="center" mt="md">
                    {filterGender 
                      ? `No ${filterGender} characters found. Try clearing filters.` 
                      : "No characters found matching your search criteria."}
                  </Text>
                  <Group position="center" mt="lg">
                    <Button onClick={clearFilters} disabled={!filterGender}>
                      Clear Filters
                    </Button>
                    <Button variant="outline" onClick={clearSearch} disabled={!debouncedQuery}>
                      Clear Search
                    </Button>
                  </Group>
                </Box>
              </Center>
            </Card>
          )}
          
          {totalPages > 0 && filteredResults.length > 0 && (
            <Group position="center" mt="xl">
              <Pagination 
                total={totalPages} 
                value={page} 
                onChange={setPage} 
                withEdges 
                size="lg"
                radius="md"
              />
            </Group>
          )}
        </>
      )}
    </Container>
  );
};

export default StarWarsList; 