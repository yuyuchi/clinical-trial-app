import { useState } from 'react';
import { Table, Space, Button, Form, Modal, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ParticipantForm from '../ParticipantForm';
import type { Participant, TrialStatus } from '../types';

type ParticipantListProps = {
  participants?: Participant[];
  isLoading: boolean;
  onEdit: (data: Participant) => void;
  onDelete: (id: string) => void;
};
function getStatus(status: TrialStatus) {
  switch (status) {
    case 'active':
      return 'processing';
    case 'finished':
      return 'success';
    case 'error':
      return 'error';
    case 'withdrawn':
      return 'default';
    default:
      return 'default';
  }
}

export default function ParticipantList({
  participants = [],
  isLoading,
  onEdit,
  onDelete,
}: ParticipantListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = (record: Participant) => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = (values: Participant) => {
    setIsModalOpen(false);
    onEdit(values);
    form.resetFields();
  };
  const columns: ColumnsType<Participant> = [
    {
      title: 'Unique reference number',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date of birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Trial status',
      dataIndex: 'trial_status',
      key: 'trial_status',
      render: (_, record) => (
        <Badge
          status={getStatus(record.trial_status)}
          text={record.trial_status}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button type="link" onClick={() => showModal(record)}>
              Edit
            </Button>

            <Button
              type="link"
              style={{ color: 'crimson' }}
              onClick={() => onDelete(record.id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={participants}
        rowKey="id"
      />
      <Modal
        forceRender
        title="Edit a participant"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <ParticipantForm
          isExistingParticipant
          onSubmit={handleSubmit}
          form={form}
        />
      </Modal>
    </>
  );
}
