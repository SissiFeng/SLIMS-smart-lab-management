import React from 'react';
import { Modal, Form, Input, InputNumber, Select, DatePicker } from 'antd';

interface AddPlasmidModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const { Option } = Select;

const AddPlasmidModal: React.FC<AddPlasmidModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Plasmid"
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
          label="Plasmid Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="vector"
          label="Vector"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="size"
          label="Size (kb)"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} step={0.1} />
        </Form.Item>

        <Form.Item
          name="resistance"
          label="Resistance"
          rules={[{ required: true }]}
        >
          <Select mode="multiple">
            <Option value="amp">Ampicillin</Option>
            <Option value="kan">Kanamycin</Option>
            <Option value="cm">Chloramphenicol</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="storage_location"
          label="Storage Location"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPlasmidModal; 