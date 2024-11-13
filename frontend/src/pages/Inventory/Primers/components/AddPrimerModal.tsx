import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';

interface AddPrimerModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const { Option } = Select;
const { TextArea } = Input;

const AddPrimerModal: React.FC<AddPrimerModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Primer"
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then(values => {
            form.resetFields();
            onOk();
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Primer Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="sequence"
          label="Sequence"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="direction"
          label="Direction"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="Forward">Forward</Option>
            <Option value="Reverse">Reverse</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="concentration"
          label="Concentration (μM)"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="storage_location"
          label="Storage Location"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notes"
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPrimerModal; 