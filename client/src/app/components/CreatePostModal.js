import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './CreatePostModal.module.css';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('category', values.category);
    if (image) formData.append('image', image);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const newPost = await response.json();
        onPostCreated(newPost);
        onClose();
        form.resetFields();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Modal
      title="Create a New Post"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter the title" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please enter the content' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter the content" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select a category">
            <Select.Option value="Discussion">Discussion</Select.Option>
            <Select.Option value="News">News</Select.Option>
            <Select.Option value="Posts">Posts</Select.Option>
            <Select.Option value="Query">Query</Select.Option>
            <Select.Option value="Job">Job</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload Image"
        >
          <Upload
            fileList={image ? [image] : []} // Updated to use `fileList` instead of `value`
            beforeUpload={(file) => {
              setImage(file);
              return false;
            }}
            onRemove={() => setImage(null)} // Allow removing the uploaded file
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;