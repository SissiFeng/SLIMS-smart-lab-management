import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';

interface AddChemicalModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const AddChemicalModal: React.FC<AddChemicalModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="添加化学品"
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
          label="化学品名称"
          rules={[{ required: true, message: '请输入化学品名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="casNumber"
          label="CAS号"
          rules={[{ required: true, message: '请输入CAS号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="数量"
          rules={[{ required: true, message: '请输入数量' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="unit"
          label="单位"
          rules={[{ required: true, message: '请选择单位' }]}
        >
          <Select>
            <Select.Option value="ml">毫升(ml)</Select.Option>
            <Select.Option value="l">升(L)</Select.Option>
            <Select.Option value="g">克(g)</Select.Option>
            <Select.Option value="kg">千克(kg)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="存储位置"
          rules={[{ required: true, message: '请输入存储位置' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddChemicalModal;
