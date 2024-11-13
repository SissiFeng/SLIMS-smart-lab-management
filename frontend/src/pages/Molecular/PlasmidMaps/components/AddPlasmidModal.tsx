import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Upload, Space, Divider, Button } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { Plasmid } from '../types';

interface AddPlasmidModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddPlasmidModal: React.FC<AddPlasmidModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Plasmid"
      open={visible}
      onCancel={onClose}
      onOk={() => {
        form.validateFields()
          .then(values => {
            console.log(values);
            form.resetFields();
            onClose();
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
      >
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
          <Select>
            <Select.Option value="pUC19">pUC19</Select.Option>
            <Select.Option value="pET28a">pET28a</Select.Option>
            <Select.Option value="pcDNA3.1">pcDNA3.1</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="size"
          label="Size (kb)"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="resistance"
          label="Antibiotic Resistance"
          rules={[{ required: true }]}
        >
          <Select mode="multiple">
            <Select.Option value="Ampicillin">Ampicillin</Select.Option>
            <Select.Option value="Kanamycin">Kanamycin</Select.Option>
            <Select.Option value="Chloramphenicol">Chloramphenicol</Select.Option>
          </Select>
        </Form.Item>

        <Divider>Sequence Information</Divider>

        <Form.Item
          name="sequence"
          label="DNA Sequence"
        >
          <Input.TextArea rows={6} />
        </Form.Item>

        <Form.Item
          name="features"
          label="Features"
        >
          <Select mode="tags" style={{ width: '100%' }}>
            <Select.Option value="promoter">Promoter</Select.Option>
            <Select.Option value="terminator">Terminator</Select.Option>
            <Select.Option value="ori">Origin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="map_file"
          label="Map File"
        >
          <Upload maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Map File</Button>
          </Upload>
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

export default AddPlasmidModal; 