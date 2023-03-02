import { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import ParticipantForm from '../ParticipantForm';
import type { Participant } from '../types';

type AddParticipantType = {
  onAdd: (data: Participant) => void;
};

export default function AddParticipant({ onAdd }: AddParticipantType) {
  const title = 'Add a participant';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values: Participant) => {
    setIsModalOpen(false);
    onAdd(values);
    form.resetFields();
  };

  return (
    <>
      <Button size="large" onClick={showModal}>
        {title}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <ParticipantForm onSubmit={handleSubmit} form={form} />
      </Modal>
    </>
  );
}
