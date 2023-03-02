import { useState } from 'react';
import { AxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import AddParticipant from './AddParticipant';
import ParticipantList from './ParticipantList';
import SearchParticipant from './SearchParticipant';
import {
  fetchParticipantById,
  addParticipant,
  editParticipant,
  deleteParticipantById,
} from '../../api/participant';
import type { Participant } from './types';

export default function ParticipantPage() {
  const queryClient = useQueryClient();
  const [participantId, setParticipantId] = useState('');

  const displayError = (e: AxiosError) =>
    notification.open({
      message: e.message,
    });

  const { data, isLoading } = useQuery({
    queryKey: ['participants', participantId],
    queryFn: () => fetchParticipantById(participantId),
    onError: displayError,
  });

  const invalidateParticipant = () => {
    queryClient.invalidateQueries({ queryKey: ['participants'] });
  };

  const addMutation = useMutation({
    mutationFn: (participant: Participant) => addParticipant(participant),
    onSuccess: invalidateParticipant,
    onError: displayError,
  });
  const editMutation = useMutation({
    mutationFn: (participant: Participant) => editParticipant(participant),
    onSuccess: invalidateParticipant,
    onError: displayError,
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteParticipantById(id),
    onSuccess: invalidateParticipant,
    onError: displayError,
  });
  const handleSearch = (id: string) => {
    setParticipantId(id);
  };

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <AddParticipant onAdd={(p: Participant) => addMutation.mutate(p)} />
        <div style={{ float: 'right' }}>
          <SearchParticipant onSearch={handleSearch} />
        </div>
      </div>
      <ParticipantList
        isLoading={isLoading}
        participants={data}
        onEdit={(p: Participant) => editMutation.mutate(p)}
        onDelete={(id: string) => deleteMutation.mutate(id)}
      />
    </>
  );
}
