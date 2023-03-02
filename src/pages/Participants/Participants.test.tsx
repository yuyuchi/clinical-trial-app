/* eslint-disable import/no-extraneous-dependencies */
import { describe, it } from 'vitest';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import server from '../../mocks/server';
import mocks from '../../mocks/MOCK_DATA.json';
import Participants from './index';

const queryClient = new QueryClient();

beforeEach(() => {
  server.use(
    rest.get('/participant', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mocks));
    })
  );
});

describe('Participants', () => {
  it('display a list of participants', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Participants />
      </QueryClientProvider>
    );

    await screen.findByText('KFG-723');
    const allParticipants = await screen.findAllByRole('row');
    expect(allParticipants).toHaveLength(5);
  });

  it('able to open a modal when click edit', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Participants />
      </QueryClientProvider>
    );
    const editButtons = screen.getAllByRole('button', {
      name: 'Edit',
    });
    fireEvent.click(editButtons[0]);
    const urnInput = screen.getByLabelText('Unique reference number');
    expect(urnInput).toHaveValue('KFG-723');
  });
  it('able to open a modal when click add', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Participants />
      </QueryClientProvider>
    );
    const addButton = screen.getByRole('button', {
      name: 'Add a participant',
    });
    fireEvent.click(addButton);
    const urnInput = screen.getByLabelText('Unique reference number');
    expect(urnInput).toHaveValue('');
  });
});
