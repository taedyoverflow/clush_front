import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Checkbox, message } from "antd";
import axios from "axios";

const { Option } = Select;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingTask, setEditingTask] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  // 모든 할 일 가져오기
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        showCompleted
          ? "http://localhost:8080/api/tasks/completed"
          : "http://localhost:8080/api/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      message.error("할 일을 가져오는 중 오류가 발생했습니다.");
    }
  };

  // 할 일 추가 또는 수정
  const handleAddOrEdit = async (values) => {
    try {
      if (editingTask) {
        await axios.put(`http://localhost:8080/api/tasks/${editingTask.id}`, values);
        message.success("할 일이 성공적으로 수정되었습니다.");
      } else {
        await axios.post("http://localhost:8080/api/tasks", values);
        message.success("할 일이 성공적으로 추가되었습니다.");
      }
      fetchTasks();
      setIsModalOpen(false);
      form.resetFields();
      setEditingTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
      message.error("할 일을 저장하는 중 오류가 발생했습니다.");
    }
  };

  // 할 일 삭제
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      message.success("할 일이 성공적으로 삭제되었습니다.");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error("할 일을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  // 완료 상태 업데이트
  const handleComplete = async (id, completed) => {
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/${id}/complete`,
        completed,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      message.success("할 일 완료 상태가 업데이트되었습니다.");
      fetchTasks();
    } catch (error) {
      console.error("Error updating completion status:", error);
      message.error("완료 상태를 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [showCompleted]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        const colors = { High: "red", Medium: "orange", Low: "green" };
        return <span style={{ color: colors[priority] }}>{priority}</span>;
      },
    },
    {
      title: "Completed",
      key: "completed",
      render: (_, record) => (
        <Checkbox
          checked={record.completed}
          onChange={() => handleComplete(record.id, !record.completed)}
        >
          {record.completed ? "완료" : "미완료"}
        </Checkbox>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setEditingTask(record);
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginRight: 10 }}>
          Add Task
        </Button>
        <Checkbox
          checked={showCompleted}
          onChange={(e) => setShowCompleted(e.target.checked)}
        >
          Show Completed Tasks
        </Checkbox>
      </div>
      <Table dataSource={tasks} columns={columns} rowKey="id" />
      <Modal
        title={editingTask ? "Edit Task" : "Add Task"}
        visible={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingTask(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrEdit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a task name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select a priority" }]}
          >
            <Select placeholder="Select a priority">
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
