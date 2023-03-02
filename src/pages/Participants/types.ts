type Participant = {
  id: string;
  name: string;
  date_of_birth: string;
  phone_number: string;
  address: string;
  trial_status: TrialStatus;
};

type TrialStatus = 'active' | 'withdrawn' | 'finished' | 'error';

export type { Participant, TrialStatus };
