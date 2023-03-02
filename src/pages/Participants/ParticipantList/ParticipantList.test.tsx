/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ParticipantList from './index';
import mocks from '../../../mocks/MOCK_DATA.json';

describe('ParticipantList', () => {
  const handleEdit = vi.fn();
  const handleDelete = vi.fn();
  afterEach(() => {
    handleEdit.mockClear();
    handleDelete.mockClear();
  });

  it('delete a participant from the table', async () => {
    render(
      <ParticipantList
        participants={mocks}
        isLoading={false}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    await waitFor(() => {
      fireEvent.click(deleteButtons[0]);
    });
    expect(handleDelete).toHaveBeenCalled();
  });

  it('edit a participant in the table', async () => {
    render(
      <ParticipantList
        participants={mocks}
        isLoading={false}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    fireEvent.click(editButtons[0]);

    const urnInput = screen.getByLabelText('Unique reference number');
    const nameInput = screen.getByLabelText('Name');
    const birthInput = screen.getByLabelText('Date of birth');
    const phoneInput = screen.getByLabelText('Phone number');
    const addressInput = screen.getByLabelText('Address');
    const statusInput = screen.getByLabelText('Trial status');
    expect(urnInput).toHaveValue('KFG-723');
    expect(nameInput).toHaveValue('Dinny Ashall');
    expect(birthInput).toHaveValue('18/10/1997');
    expect(phoneInput).toHaveValue('206-272-1159');
    expect(addressInput).toHaveValue('Room 1278');
    expect(statusInput).toHaveValue('active');
    const submitButton = screen.getByRole('button', {
      name: 'OK',
    });
    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    expect(handleEdit).toHaveBeenCalled();
  });
});
