export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SWAPIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Updated to use a mirror with valid SSL certificate
const BASE_URL = 'https://swapi.py4e.com/api';

export async function getPeople(page = 1): Promise<SWAPIResponse<Person>> {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch people');
  }
  return response.json();
}

export async function getPerson(id: string): Promise<Person> {
  const response = await fetch(`${BASE_URL}/people/${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch person with id ${id}`);
  }
  return response.json();
}

export async function getFilm(url: string): Promise<Film> {
  // Replace the domain in the URL if it's from swapi.dev
  const updatedUrl = url.replace('swapi.dev', 'swapi.py4e.com');
  const response = await fetch(updatedUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch film from ${updatedUrl}`);
  }
  return response.json();
}

export async function searchPeople(query: string): Promise<SWAPIResponse<Person>> {
  const response = await fetch(`${BASE_URL}/people/?search=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to search people');
  }
  return response.json();
}

// Utility to extract ID from SWAPI URL
export function extractIdFromUrl(url: string): string {
  const matches = url.match(/\/([0-9]+)\/$/);
  return matches ? matches[1] : '';
} 