import { Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form';
import { Participant } from './types';

type ParticipantFormType = {
  isExistingParticipant?: boolean;
  onSubmit: (values: Participant) => void;
  form: FormInstance;
};
export default function ParticipantForm({
  isExistingParticipant = false,
  onSubmit,
  form,
}: ParticipantFormType) {
  return (
    <Form form={form} onFinish={onSubmit}>
      <Form.Item
        label="Unique reference number"
        name="id"
        rules={[{ required: true, message: 'Please input URN' }]}
      >
        <Input placeholder="KFG-000" disabled={isExistingParticipant} />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input name' }]}
      >
        <Input placeholder="Jane Doe" />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name="date_of_birth"
        rules={[{ required: true, message: 'Please input date of birth' }]}
      >
        <Input placeholder="27/2/1993" />
      </Form.Item>
      <Form.Item
        label="Phone number"
        name="phone_number"
        rules={[{ required: true, message: 'Please input phone number' }]}
      >
        <Input placeholder="8691022423" />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input address' }]}
      >
        <Input showCount maxLength={20} placeholder="Taipei.1 Lake park" />
      </Form.Item>
      {isExistingParticipant && (
        <Form.Item label="Trial status" name="trial_status">
          <Input disabled />
        </Form.Item>
      )}
    </Form>
  );
}
