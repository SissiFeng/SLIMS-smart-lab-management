import React from 'react';
import { Modal, Form, Input, InputNumber, Select, DatePicker, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

interface AddPassageModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddPassageModal: React.FC<AddPassageModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add Passage Record"
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
      width={720}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="cell_line"
          label="Cell Line"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="HEK293T">HEK293T</Select.Option>
            <Select.Option value="Jurkat">Jurkat</Select.Option>
            <Select.Option value="MCF7">MCF7</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="passage_number"
          label="Passage Number"
          rules={[{ required: true }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="confluence"
          label="Confluence (%)"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="viability"
          label="Cell Viability (%)"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="morphology"
          label="Morphology"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Normal">Normal</Select.Option>
            <Select.Option value="Abnormal">Abnormal</Select.Option>
            <Select.Option value="Mixed">Mixed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="media_type"
          label="Media Type"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="DMEM">DMEM + 10% FBS</Select.Option>
            <Select.Option value="RPMI">RPMI + 10% FBS</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notes"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="images"
          label="Images"
        >
          <Upload
            listType="picture-card"
            maxCount={4}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPassageModal; 