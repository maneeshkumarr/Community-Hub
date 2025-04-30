import { useState } from 'react';
import { Modal, Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

export default function CreatePostModal({ visible, onClose, onPostCreated }) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      setUploading(true);
      const response = await axios.post('/api/upload', formData);
      setImageUrl(response.data.url);
      return false; // Prevent default upload
    } catch (error) {
      message.error('Image upload failed');
      return false;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/posts', {
        ...values,
        image_url: imageUrl
      });
      onPostCreated(response.data);
      form.resetFields();
      setImageUrl(null);
      onClose();
    } catch (error) {
      message.error('Failed to create post');
    }
  };

  return (
    <Modal
      title="Create New Post"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="category" rules={[{ required: true }]}>
          <Select placeholder="Select category">
            <Option value="discussion">Discussion</Option>
            <Option value="news">News</Option>
            <Option value="post">Post</Option>
            <Option value="query">Query</Option>
            <Option value="job">Job</Option>
          </Select>
        </Form.Item>
        
        <Form.Item name="title">
          <Input placeholder="Title (optional)" />
        </Form.Item>
        
        <Form.Item name="content" rules={[{ required: true }]}>
          <TextArea rows={4} placeholder="What's on your mind?" />
        </Form.Item>
        
        <Form.Item>
          <Upload
            accept="image/*"
            beforeUpload={handleImageUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              Upload Image
            </Button>
          </Upload>
          {imageUrl && (
            <div style={{ marginTop: 8 }}>
              <img src={imageUrl} alt="Preview" style={{ maxHeight: 100 }} />
            </div>
          )}
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}