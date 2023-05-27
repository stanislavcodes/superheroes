import { Superhero } from './Superhero';

export type SuperheroPayload = Omit<Superhero, 'id'>;

