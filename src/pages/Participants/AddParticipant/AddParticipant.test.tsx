/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, vi } from 'vitest';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddParticipant from './index';

describe('AddParticipant', () => {
  const handleAdd = vi.fn();
  afterEach(() => {
    handleAdd.mockClear();
  });

  it('able to open a modal when click add', async () => {
    render(<AddParticipant onAdd={handleAdd} />);
    const addButton = screen.getByRole('button', {
      name: 'Add a participant',
    });
    fireEvent.click(addButton);
    const urnInput = screen.getByLabelText('Unique reference number');
    expect(urnInput).toHaveValue('');

    const nameInput = screen.getByLabelText('Name');
    const birthInput = screen.getByLabelText('Date of birth');
    const phoneInput = screen.getByLabelText('Phone number');
    const addressInput = screen.getByLabelText('Address');

    fireEvent.change(urnInput, { target: { value: 'KFG-228' } });
    fireEvent.change(nameInput, { target: { value: 'Yuchi Yu' } });
    fireEvent.change(birthInput, { target: { value: '27/2/1993' } });
    fireEvent.change(phoneInput, { target: { value: '8691022423' } });
    fireEvent.change(addressInput, { target: { value: 'Taipei.1 Lake park' } });
    expect(urnInput).toHaveValue('KFG-228');
    const submitButton = screen.getByRole('button', {
      name: 'OK',
    });
    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(handleAdd).toHaveBeenCalled();
  });
});
