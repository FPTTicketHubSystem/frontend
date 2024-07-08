import { PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  Select,
  Upload,
  Modal,
  Space,
  notification,
} from "antd";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState, useContext, useRef } from "react";
import "../../assets/Forum.css";
import "../../assets/Style.css";
import TextArea from "antd/es/input/TextArea";
import { SubjectContext } from "../../context/SubjectContext";
import { PostContext } from "../../context/PostContext";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Spinner from "./../../common/Spinner/Spinner";
import { EditPost } from "../../services/ForumService";
const defaultAvatar = "../Image/Avatar_null.png";
const anh = "../Image/Forum/icon-anh-video.png";
const monhoc = "../Image/Forum/icon-sach.png";
const tag = "../Image/Forum/icon-tag.png";

export default function PostForm({ open, post, setOpen, showEditForm }) {
  console.log(post);
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState({
    Status: post?.status,
    postText: post?.postText,
    postFile: post?.postFile,
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { subjects } = useContext(SubjectContext);
  const { addPost, getPostByStatus } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const { accountId } = user;
  const imageUrlRef = useRef("");

  let imageUrlUpload = "";
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const cancelModal = () => {
    console.log(open)
    setOpen(false);
    console.log(open)
    form.resetFields();
  };

  const uploadImage = async () => {
    if (imageUpload == null) return;
    setUploadingImage(true);
    const imageRef = ref(storage, `forum_images/${imageUpload.name + v4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      imageUrlRef.current = url;
      imageUrlUpload = imageUrlRef.current;
      setUploadingImage(false);
      return imageUrlUpload;
    } catch (error) {
      console.log(error);
      setUploadingImage(false);
    }
  };

  //Display notification
  const [api, contextHolder] = notification.useNotification();
  const openNotificationAddPostSuccess = (placement) => {
    api.success({
      message: "Thông báo",
      description: "Bài viết của bạn đang chờ được phê duyệt !",
      placement,
    });
  };

  const handleSubmitAddPostForm = async (postId) => {
    const postFile = await uploadImage();
    
    let jsonObject = {
        "postId": postId,
        "accountId": 0,
        "createDate": "2024-07-07T06:38:32.866Z",
        "status": "string",
        "comment": [
            {
                "postCommentId": 0,
                "accountId": 0,
                "postId": postId,
                "content": "string",
                "commentDate": "2024-07-07T06:38:32.866Z"
            }
        ]
    };

    const form = new FormData();
    form.append('postText', formValue.postText);
    if (postFile) {
        form.append('postFile', postFile);
    }

    // Add the postText and postFile to the jsonObject
    jsonObject.postText = formValue.postText;
    if (postFile) {
        jsonObject.postFile = postFile;
    }

    await EditPost(postId, jsonObject);
    openNotificationAddPostSuccess("topRight");
    cancelModal();
    window.location.reload();
};

  const handleStatusChange = (status) => {
    setFormValue({ ...formValue, Status: status });
  };

  useEffect(() => {
    if (post) {
      setFormValue({
        Status: post.status,
        postText: post.postText,
        postFile: post.postFile,
      });
      form.setFieldsValue({
        Status: post.status,
        postText: post.postText,
        postFile: post.postFile,
      });
    }
  }, [post, form]);

  return (
    <Modal
      title="Sửa bài viết"
      open={open}
      okText={uploadingImage ? <Spinner /> : "Đăng bài"}
      cancelText="Đóng"
      onCancel={cancelModal}
      onOk={form.submit}
      okButtonProps={uploadingImage && { style: { pointerEvents: "none" } }}
    >
      <Form
        form={form}
        layout="horizontal"
        initialValues={formValue}
        onFinish={() => handleSubmitAddPostForm(post.postId)}
      >
        <Form.Item
          label="Status"
          name="Status"
          rules={[{ required: true, message: "Vui lòng chọn status!" }]}
        >
          <Select
            onChange={handleStatusChange}
            placeholder="-- Vui lòng chọn status --"
          >
            <Select.Option value="Chưa diễn ra">Chưa diễn ra</Select.Option>
            <Select.Option value="Sắp diễn ra">Sắp diễn ra</Select.Option>
            <Select.Option value="Đang diễn ra">Đang diễn ra</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nội dung!",
            },
          ]}
        >
          <TextArea
            rows={6}
            placeholder="Bạn đang nghĩ gì thế?"
            value={post.postText}
            onChange={(e) =>
              setFormValue({ ...formValue, postText: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Ảnh/Video"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          style={{
            marginTop: 10,
          }}
          className="form-item upload-image"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImageUpload(event.target.files[0])}
          />
        </Form.Item>
      </Form>
      {/* <TextArea
            rows={6}
            plaeholder="Bạn đang nghĩ gì thế?"
            value={post.postText}
            // onChange={(e) =>
            //   setFormValue({ ...formValue, postText: e.target.value })
            // }
          /> */}
    </Modal>
  );
}
