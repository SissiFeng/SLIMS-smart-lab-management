import React from 'react';
import { Modal, Form, Input, Select, InputNumber, DatePicker } from 'antd';

interface AddCellLineModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
}

const { Option } = Select;

const AddCellLineModal: React.FC<AddCellLineModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Cell Line"
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then(values => {
            form.resetFields();
            onOk(values);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Cell Line Name"
          rules={[{ required: true, message: 'Please input cell line name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select type' }]}
        >
          <Select>
            <Option value="Adherent">Adherent</Option>
            <Option value="Suspension">Suspension</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="origin"
          label="Origin"
          rules={[{ required: true, message: 'Please input origin' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="bsl"
          label="Biosafety Level"
          rules={[{ required: true, message: 'Please select BSL' }]}
        >
          <Select>
            <Option value={1}>BSL-1</Option>
            <Option value={2}>BSL-2</Option>
            <Option value={3}>BSL-3</Option>
            <Option value={4}>BSL-4</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="passage"
          label="Current Passage"
          rules={[{ required: true, message: 'Please input passage number' }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="culture_medium"
          label="Culture Medium"
          rules={[{ required: true, message: 'Please input culture medium' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="storage_location"
          label="Storage Location"
          rules={[{ required: true, message: 'Please input storage location' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="mycoplasma_test"
          label="Mycoplasma Test"
          rules={[{ required: true, message: 'Please select test result' }]}
        >
          <Select>
            <Option value="Negative">Negative</Option>
            <Option value="Positive">Positive</Option>
            <Option value="Not Tested">Not Tested</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="authentication"
          label="Authentication Status"
          rules={[{ required: true, message: 'Please select authentication status' }]}
        >
          <Select>
            <Option value="Verified">Verified</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Not Verified">Not Verified</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="last_passage_date"
          label="Last Passage Date"
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notes"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCellLineModal; 