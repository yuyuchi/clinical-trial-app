import axios from 'axios';

type Participant = {
  id: string;
  name: string;
  date_of_birth: Date;
  phone_number: string;
  address: 'string';
  trial_status?: 'active' | 'withdrawn' | 'finished' | 'error';
};

async function fetchParticipants(): Promise<Participant[]> {
  const res = await axios.get('/participant');
  return res.data;
}

async function fetchParticipantById(id: string): Promise<Participant[]> {
  const res = await axios.get(`/participant/${id}`);
  return res.data;
}

async function addParticipant(data: Participant): Promise<Participant> {
  const res = await axios.post('/participant', data);
  return res.data;
}

async function editParticipant(data: Participant): Promise<Participant> {
  const res = await axios.put(`/participant/${data.id}`, data);
  return res.data;
}

async function deleteParticipantById(id: string): Promise<Participant> {
  const res = await axios.delete(`/participant/${id}`);
  return res.data;
}

export {
  fetchParticipants,
  fetchParticipantById,
  addParticipant,
  editParticipant,
  deleteParticipantById,
};
