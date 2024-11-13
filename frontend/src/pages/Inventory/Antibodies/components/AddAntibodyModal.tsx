import React from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';

interface AddAntibodyModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
}

const { Option } = Select;

const AddAntibodyModal: React.FC<AddAntibodyModalProps> = ({
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Antibody"
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
          label="Antibody Name"
          rules={[{ required: true, message: 'Please input antibody name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select antibody type' }]}
        >
          <Select>
            <Option value="monoclonal">Monoclonal</Option>
            <Option value="polyclonal">Polyclonal</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="host"
          label="Host"
          rules={[{ required: true, message: 'Please select host species' }]}
        >
          <Select>
            <Option value="mouse">Mouse</Option>
            <Option value="rabbit">Rabbit</Option>
            <Option value="rat">Rat</Option>
            <Option value="goat">Goat</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="applications"
          label="Applications"
          rules={[{ required: true, message: 'Please select applications' }]}
        >
          <Select mode="multiple">
            <Option value="WB">Western Blot</Option>
            <Option value="IF">Immunofluorescence</Option>
            <Option value="IHC">Immunohistochemistry</Option>
            <Option value="FC">Flow Cytometry</Option>
            <Option value="IP">Immunoprecipitation</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="storageTemp"
          label="Storage Temperature (°C)"
          rules={[{ required: true, message: 'Please select storage temperature' }]}
        >
          <Select>
            <Option value={-80}>-80°C</Option>
            <Option value={-20}>-20°C</Option>
            <Option value={4}>4°C</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="concentration"
          label="Concentration"
          rules={[{ required: true, message: 'Please input concentration' }]}
        >
          <Input addonAfter="μg/mL" />
        </Form.Item>

        <Form.Item
          name="location"
          label="Storage Location"
          rules={[{ required: true, message: 'Please input storage location' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAntibodyModal; 