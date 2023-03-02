/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'vitest';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import server from '../../../mocks/server';
import mocks from '../../../mocks/MOCK_DATA.json';
import Participants from '../index';

const queryClient = new QueryClient();

beforeEach(() => {
  server.use(
    rest.get('/participant/:id', (req, res, ctx) => {
      const { id } = req.params;
      if (id === 'KFG-723') return res(ctx.status(200), ctx.json([mocks[0]]));
      if (id === 'KFG-724') return res(ctx.status(200), ctx.json([mocks[1]]));
      if (id === 'KFG-725') return res(ctx.status(200), ctx.json([mocks[2]]));
      if (id === 'KFG-726') return res(ctx.status(200), ctx.json([mocks[3]]));
      return res(ctx.status(200), ctx.json([]));
    })
  );
});
describe('SearchParticipant', () => {
  it('search a participant by Unique reference number', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Participants />
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText('enter URN');
    const button = screen.getByRole('button', { name: 'Search by URN' });
    fireEvent.change(input, { target: { value: 'KFG-724' } });
    fireEvent.click(button);

    const secondRecord = await screen.findByText('KFG-724');
    const allParticipants = await screen.findAllByRole('row');
    expect(allParticipants).toHaveLength(2);
    expect(secondRecord).toHaveTextContent('KFG-724');
  });
});
