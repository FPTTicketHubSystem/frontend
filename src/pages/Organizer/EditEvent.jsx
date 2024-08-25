import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Form, Input, Button, DatePicker, Select, Table, Upload, message, Modal, Row, Col, Switch, Checkbox } from 'antd';
import { UserContext } from '../../context/UserContext';
import { AddEventService, GetEventForEdit, GetTicketTypeByEventService, UpdateEventService, UpdateTicketQuantityService, AddTicketTypeService, GetDiscountCodeByEventService, AddDiscountCodeService, UpdateDiscountQuantityService } from '../../services/EventService';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { InboxOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import LocationPicker from '../../component/LocationPicker';
import styled from "styled-components";
import Navbar from '../../component/Organizer/Navbar';
import Footer from '../../component/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { decodeId } from '../../utils/utils';
import moment from 'moment/moment';
import CustomCKEditor from '../../component/CustomCKEditor';

const { Dragger } = Upload;
const { Option } = Select;
const { Column } = Table;

// custom upload image ckeditor
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const imgRef = ref(storage, `images/event_images/description_images/${v4()}`);
    const snapshot = await uploadBytes(imgRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { default: url };
  }
  abort() { }
}

// setup custom upload ckeditor
function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

const CustomButton = styled(Button)`
  background-color: #EC6C21;
  border-color: #EC6C21;

  &:hover {
    background-color: #81360b !important;
    border-color: #81360b !important;
  }
`;

const CustomSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: #EC6C21;
  }
  &:hover.ant-switch-checked:not(.ant-switch-disabled) {
    background-color: #b74f18;
  }
  .ant-switch-inner {
    font-size: 16px;
  }
  &.ant-switch {
    width: 90px;
    height: 22px;
  }
`;

const EditEvent = () => {
  const { user } = useContext(UserContext);
  // const {userId} = useState(user?.accountId);
  const { encodedId } = useParams();
  const [eventId, setEventId] = useState(decodeId(encodedId));
  //const eventId = decodeId(encodedId);
  //const [render, setRender] = useState('');
  const navigate = useNavigate();
  //const {currentAccountId} = useState(user?.accountId);
  //const MemoizedCKEditor = React.memo(CKEditor);
  // const [showNoteModal, setShowNoteModal] = useState(true);
  const [formData, setFormData] = useState({
    eventId: '',
    accountId: '',
    categoryId: '',
    eventName: '',
    themeImage: '',
    eventDescription: '',
    address: '',
    location: '',
    startTime: null,
    endTime: null,
    //ticketQuantity: 0,
    status: '',
    // eventImages: [],
    // ticketTypes: [],
    // discountCodes: []
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDiscountModalVisible, setIsDiscountModalVisible] = useState(false);
  const [selectedTicketTypeId, setSelectedTicketTypeId] = useState(null);
  const [isCreateTicketModalVisible, setIsCreateTicketModalVisible] = useState(false);
  const [newTicketType, setNewTicketType] = useState({
    eventId: eventId,
    typeName: '',
    price: 0,
    quantity: 0,
    status: ''
  });
  const [newDiscountCode, setNewDiscountCode] = useState({
    accountId: user?.accountId,
    eventId: eventId,
    code: '',
    discountAmount: 0,
    quantity: 0,
    status: ''
  });
  const [isCreateDiscountModalVisible, setIsCreateDiscountModalVisible] = useState(false);

  const [addQuantity, setAddQuantity] = useState(0);
  const [selectedDiscountCodeId, setSelectedDiscountCodeId] = useState(null);
  const [discountQuantity, setDiscountQuantity] = useState(0);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [discountCodes, setDiscountCodes] = useState([]);
  const [isConfirmChecked, setIsConfirmChecked] = useState(false);
  const [addOrRemove, setAddOrRemove] = useState(1);

  const HandleGetEventForEdit = async () => {
    const response = await GetEventForEdit(eventId);
    if (response.accountId !== user?.accountId) {
      toast.error('Không có quyền truy cập!')
      navigate('/404');
    }
    if (response) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...response,
        startTime: response.startTime ? moment.utc(response.startTime).local() : null,
        endTime: response.endTime ? moment.utc(response.endTime).local() : null,
      }));
    }
  };

  const HandleGetTicketType = async () => {
    const response = await GetTicketTypeByEventService(eventId);
    try {
      if (response) {
        setTicketTypes(response.result || []);
      }
    }
    catch (e) {
      console.error('error', e);
    }
  };

  const HandleGetDiscountCode = async () => {
    const response = await GetDiscountCodeByEventService(eventId);
    try {
      if (response) {
        setDiscountCodes(response.result.result || []);
      }
    }
    catch (e) {
      console.error('error', e);
    }
  };

  const handleCreateTicketType = async () => {
    if (!isConfirmChecked) {
      toast.error('Bạn chưa xác nhận');
      return;
    }
    try {
      const response = await AddTicketTypeService(newTicketType);
      if (response.status === 200) {
        toast.success('Tạo loại vé thành công!');
        setTicketTypes([...ticketTypes, response.newTicketType]);
        setNewTicketType({eventId: eventId,
          typeName: '',
          price: 0,
          quantity: 0,
          status: ''});
          setIsConfirmChecked(false);
        setIsCreateTicketModalVisible(false);
      } if (response.status === 400 && response.message === "TicketTypeIsExist") {
        toast.error ('Tên loại vé đã tồn tại');
      }
      if (response.status === 400 && response.message === "Add TicketType Fail") {
        toast.error ('Có lỗi xảy ra, vui lòng thử lại');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi tạo loại vé.');
    }
  };

  const handleCreateDiscountCode = async () => {
    if (!newDiscountCode.code || newDiscountCode.discountAmount <= 0 || newDiscountCode.quantity <= 0) {
      toast.error('Vui lòng điền đầy đủ thông tin và kiểm tra giá trị giảm và số lượng.');
      return;
    }
    try {
      const response = await AddDiscountCodeService(newDiscountCode);
      console.log('discount submit', newDiscountCode);
      if (response.status === 200) {
        toast.success('Tạo mã giảm giá thành công!');
        setDiscountCodes([...discountCodes, response.newDiscountCode]);
        setIsCreateDiscountModalVisible(false);
      } if (response.status === 400 && response.message === "DiscountCodeIsExist") {
        toast.error ('Mã giảm giá đã tồn tại');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi tạo mã giảm giá.');
    }
  };


  useEffect(() => {
    if (!user.accountId) {
      console.error('accountid', user.accountId);
      //setLoading(false);
      return;
    }
    try {
      console.log('accountid', user.accountId)
      HandleGetEventForEdit();
      HandleGetTicketType();
      HandleGetDiscountCode();
      
    }
    catch (e) {
      console.error('error', e);
    }

  }, [user.accountId]);

  useEffect(() => {
    if (user.accountId) {
      setNewDiscountCode(prevState => ({
        ...prevState,
        accountId: user.accountId
      }));
    }
  }, [user.accountId]);

  // useEffect(() => {
  //   console.log('response', formData);
  // }, [formData]);


  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }, []);

  const handleDateChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value ? value.toISOString() : null,
    }));
  };



  const handleCKEditorChange = useCallback((event, editor) => {
    const data = editor.getData();
    setFormData((prevFormData) => ({
      ...prevFormData,
      eventDescription: data,
    }));
  }, []);


  // const handleAddressChange = ({ provinceName, districtName, wardName, details }) => {
  //   const address = `${details}, ${wardName}, ${districtName}, ${provinceName}`;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     address: address
  //   }));
  // };

  const handleInputImage = async (file) => {
    const imgRef = ref(storage, `images/event_images/theme_images${v4()}`);
    try {
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setFormData(prevState => ({
        ...prevState,
        themeImage: url
      }));
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading image!');
    }
  };

  // const calculateTotalTicketQuantity = (ticketTypes) => {
  //   return ticketTypes.reduce((total, ticket) => total + Number(ticket.quantity), 0);
  // };

  // const handleAddTicketType = () => {
  //   setFormData(prevState => {
  //     const newTicketTypes = [...prevState.ticketTypes, { typeName: '', price: 0, quantity: 0, status: '' }];
  //     //const newTicketQuantity = calculateTotalTicketQuantity(newTicketTypes);
  //     return {
  //       ...prevState,
  //       ticketTypes: newTicketTypes,
  //       //ticketQuantity: newTicketQuantity
  //     };
  //   });
  // };

  // const handleAddDiscountCode = () => {
  //   setFormData(prevState => ({
  //     ...prevState,
  //     discountCodes: [...prevState.discountCodes, { code: '', discountAmount: 0, quantity: 0, status: '' }]
  //   }));
  // };

  // const handleTicketTypeChange = (index, e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => {
  //     const updatedTicketTypes = [...prevState.ticketTypes];
  //     if (name === 'price' && value < 0) {
  //       message.error('Invalid price!');
  //       return prevState;
  //     }
  //     if (name === 'quantity' && value <= 0) {
  //       message.error('Invalid quantity!');
  //       return prevState;
  //     }
  //     updatedTicketTypes[index][name] = value;
  //     //const newTicketQuantity = calculateTotalTicketQuantity(updatedTicketTypes);
  //     return {
  //       ...prevState,
  //       ticketTypes: updatedTicketTypes,
  //       //ticketQuantity: newTicketQuantity
  //     };
  //   });
  // };

  // const handleDiscountCodeChange = (index, e) => {
  //   const { name, value } = e.target;
  //   setFormData(prevState => {
  //     const updatedDiscountCodes = [...prevState.discountCodes];
  //     if ((name === 'discountAmount' || name === 'quantity') && value < 0) {
  //       message.error(`${name === 'discountAmount' ? 'Invalid discount amount' : 'Invalid quantity'}`);
  //       return prevState;
  //     }
  //     updatedDiscountCodes[index][name] = value;
  //     return {
  //       ...prevState,
  //       discountCodes: updatedDiscountCodes,
  //     };
  //   });
  // };

  // const handleRemoveTicketType = (index) => {
  //   setFormData(prevState => {
  //     const updatedTicketTypes = prevState.ticketTypes.filter((_, i) => i !== index);
  //     //const newTicketQuantity = calculateTotalTicketQuantity(updatedTicketTypes);
  //     return {
  //       ...prevState,
  //       ticketTypes: updatedTicketTypes,
  //       //ticketQuantity: newTicketQuantity
  //     };
  //   });
  // };

  // const handleRemoveDiscountCode = (index) => {
  //   const updatedDiscountCodes = formData.discountCodes.filter((_, i) => i !== index);
  //   setFormData(prevState => ({ ...prevState, discountCodes: updatedDiscountCodes }));
  // };
  const showAddQuantityModal = (ticketTypeId) => {
    setSelectedTicketTypeId(ticketTypeId);
    setAddQuantity(0);
    setIsModalVisible(true);
  };

  const showAddDiscountQuantityModal = (discountCodeId) => {
    setSelectedDiscountCodeId(discountCodeId);
    setDiscountQuantity(0);
    setIsDiscountModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const startTime = formData.startTime ? moment(formData.startTime).utc().toISOString() : null;
      const endTime = formData.endTime ? moment(formData.endTime).utc().toISOString() : null;

      const eventData = {
        ...formData,
        startTime,
        endTime,
        ticketTypes: []
      };

      console.log('submitdata', eventData);

      const response = await UpdateEventService(eventData);
      if (response.status === 200) {
        toast.success('Chỉnh sửa thành công!');
        navigate('/organizer/events');
      } else if (response.status === 400) {
        toast.error('Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the event!');
    }
  };




  const handleAddQuantity = async () => {
    if (isNaN(addQuantity) || addQuantity <= 0) {
      toast.error("Vui lòng nhập số lượng hợp lệ.");
      return;
    }

    try {
      const response = await UpdateTicketQuantityService(selectedTicketTypeId, addQuantity, addOrRemove);
      if (response.result.result.status === 200) {
        toast.success("Đã cập nhật số lượng vé thành công!");
        if (addOrRemove === 1) {
          setTicketTypes((prevTicketTypes) =>
            prevTicketTypes.map((ticket) =>
              ticket.ticketTypeId === selectedTicketTypeId
                ? { ...ticket, quantity: ticket.quantity + addQuantity }
                : ticket
            )
          );
        }
        else if (addOrRemove === 0) {
          setTicketTypes((prevTicketTypes) =>
            prevTicketTypes.map((ticket) =>
              ticket.ticketTypeId === selectedTicketTypeId
                ? { ...ticket, quantity: ticket.quantity - addQuantity }
                : ticket
            )
          );
        }
        setIsModalVisible(false);
        setAddQuantity(0);
        setAddOrRemove(1);
      } if (response.result.result.status === 400 && response.result.result.message === "InvalidQuantity") {
        toast.error ("Số lượng thay đổi không hợp lệ");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while updating the ticket quantity.");
    }
  };

  const handleAddDiscountQuantity = async () => {
    if (isNaN(discountQuantity) || discountQuantity <= 0) {
      toast.error("Vui lòng nhập số lượng hợp lệ.");
      return;
    }

    try {
      const response = await UpdateDiscountQuantityService(selectedDiscountCodeId, discountQuantity);
      console.log('discountcode id', selectedDiscountCodeId);
      console.log('discountquantity', discountQuantity);
      if (response.result.result.status === 200) {
        toast.success("Đã cập nhật số lượng mã giảm giá thành công!");
        setDiscountCodes((prevDiscountCodes) =>
          prevDiscountCodes.map((discount) =>
            discount.discountCodeId === selectedDiscountCodeId
              ? { ...discount, quantity: discount.quantity + discountQuantity }
              : discount
          )
        );
        setIsDiscountModalVisible(false);
      } if (response.result.result.status === 400 && response.result.result.message === "InvalidQuantity") {
        toast.error("Số lượng thay đổi không hợp lệ");
      }
       else {
        toast.error("Có lỗi xảy ra khi cập nhật số lượng mã giảm giá.");
      }
    } catch (error) {
      console.error(error);
      message.error("Đã xảy ra lỗi khi cập nhật số lượng mã giảm giá.");
    }
  };


  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            if (img.width === 1280 && img.height === 720) {
              resolve();
            } else {
              message.error('Image size must be 1280x720!');
              reject(new Error('Invalid image size'));
            }
          };
        };
      });
    },
    customRequest({ file, onSuccess }) {
      setTimeout(() => {
        handleInputImage(file);
        onSuccess("ok");
      }, 0);
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  // const closeNoteModal = () => {
  //   setShowNoteModal(false);
  // };

  return (
    <div>
      <Navbar />
      <div className="bg bg-light">
        <div className="p-4">
          <Form layout="vertical">
            <h2>Chỉnh sửa sự kiện <i class="bi bi-calendar-event"></i></h2>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Ảnh nền sự kiện">
                  <Dragger {...uploadProps}>
                    {formData.themeImage ? (
                      <img
                        src={formData.themeImage}
                        alt="Event Theme"
                        style={{ width: '100%', cursor: 'pointer' }}
                      />
                    ) : (
                      <>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined style={{ color: '#EC6C21' }} />
                        </p>
                        <p className="ant-upload-text">Ảnh nền sự kiện</p>
                        <p className="ant-upload-hint">Kích thước 1280x720</p>
                      </>
                    )}
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tên sự kiện">
                  <Input
                    disabled
                    id="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    placeholder="Nhập tên sự kiện"
                    maxLength={80}
                    showCount
                  />
                </Form.Item>
                <Form.Item label="Tên địa điểm">
                  <Input
                    disabled
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Nhập tên địa điểm"
                    maxLength={80}
                    showCount
                  />
                </Form.Item>
                <Form.Item label="Địa chỉ">
                  <Input
                    disabled
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ"
                    maxLength={200}
                    showCount
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Thời gian bắt đầu">
                  <DatePicker
                    disabled
                    format="DD/MM/YYYY HH:mm"
                    showTime
                    value={formData.startTime ? moment(formData.startTime) : null}
                    onChange={(value) => handleDateChange('startTime', value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Thời gian kết thúc">
                  <DatePicker
                    disabled
                    format="DD/MM/YYYY HH:mm"
                    showTime
                    value={formData.endTime ? moment(formData.endTime) : null}
                    onChange={(value) => handleDateChange('endTime', value)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Mô tả sự kiện">
              <CustomCKEditor
                value={formData.eventDescription}
                onChange={handleCKEditorChange}
              />
            </Form.Item>
            <Form.Item name="status" label="Trạng thái" className='mt-3'>
              {/* {formData.status === 'Nháp' && (
                <CustomSwitch
                  checked={formData.status === 'Chờ duyệt'}
                  onChange={(checked) => setFormData({ ...formData, status: checked ? 'Chờ duyệt' : 'Nháp' })}
                  checkedChildren="Chờ duyệt"
                  unCheckedChildren="Nháp"
                />
              )}
              {formData.status === 'Chờ duyệt' && (
                <span>Chờ duyệt</span>
              )}
              {formData.status === 'Đã duyệt' && (
                <span>Đã duyệt</span>
              )} */}
              <span>{formData.status}</span>
            </Form.Item>
            <Form.Item>
              <CustomButton type="primary" onClick={handleSubmit}>
                Lưu thay đổi
              </CustomButton>
            </Form.Item>
            <hr/>
            <Form.Item label="Các loại vé">
              <CustomButton
                type="primary"
                onClick={() => setIsCreateTicketModalVisible(true)}
                className='mb-2'
              >
                Tạo loại vé <i class="bi bi-plus-circle"></i>
              </CustomButton>
              <Table dataSource={ticketTypes} rowKey="ticketTypeId" pagination={false}>
                <Column title="Tên loại vé" dataIndex="typeName" key="typeName" />
                <Column title="Giá (VND)" dataIndex="price" key="price" render={(price) => price === 0 ? 'Miễn phí' : `${price.toLocaleString()}`} />
                <Column title="Số lượng" dataIndex="quantity" key="quantity" />
                <Column
                  title="Hành động"
                  key="action"
                  render={(_, record) => (
                    <CustomButton
                      type="primary"
                      onClick={() => showAddQuantityModal(record.ticketTypeId)}
                    >
                      <i class="bi bi-pen"></i> Số lượng
                    </CustomButton>
                  )}
                />
              </Table>
            </Form.Item>
            {/* {formData.status == "Đã duyệt" && (
              <Form.Item label="Mã giảm giá">
              <CustomButton
                type="primary"
                onClick={() => setIsCreateDiscountModalVisible(true)}
                className='mb-2'
              >
                Tạo mã <i class="bi bi-plus-circle"></i>
              </CustomButton>
              <Table dataSource={discountCodes} rowKey="discountCodeId" pagination={false}>
                <Column title="Mã" dataIndex="code" key="code" />
                <Column title="Giá trị giảm (%)" dataIndex="discountAmount" key="discountAmount" />
                <Column title="Số lượng" dataIndex="quantity" key="quantity" />
                <Column
                  title="Hành động"
                  key="action"
                  render={(_, record) => (
                    <CustomButton
                      type="primary"
                      onClick={() => showAddDiscountQuantityModal(record.discountCodeId)}
                    >
                      <i class="bi bi-plus-lg"></i> Số lượng
                    </CustomButton>
                  )}
                />
              </Table>
            </Form.Item>
            )} */}
          </Form>
        </div>
      </div>
      <Footer />
      <Modal
        title="Thay đổi số lượng vé"
        open={isModalVisible}
        //onOk={handleAddQuantity}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <CustomButton key="submit" type="primary" onClick={handleAddQuantity}>
            Lưu
          </CustomButton>,
        ]}
      >
        <CustomSwitch
          checked={addOrRemove === 1}
          onChange={(checked) => setAddOrRemove(checked ? 1 : 0)}
          checkedChildren="Tăng"
          unCheckedChildren="Giảm"
          className='mb-3 mt-2'
        />
        <Input
          type="number"
          min={1}
          value={addQuantity}
          onChange={(e) => setAddQuantity(parseInt(e.target.value, 10))}
          placeholder="Nhập số lượng vé thay đổi"
          onWheel={(e) => e.target.blur()}
        />
      </Modal>
      <Modal
        title="Thêm loại vé"
        open={isCreateTicketModalVisible}
        onCancel={() => setIsCreateTicketModalVisible(false)}
        footer={[
          <CustomButton key="submit" type="primary" onClick={handleCreateTicketType}>
            Tạo
          </CustomButton>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Tên loại vé">
            <Input
              value={newTicketType.typeName}
              onChange={(e) => setNewTicketType({ ...newTicketType, typeName: e.target.value })}
              placeholder="Nhập tên loại vé"
              name="typeName"
              maxLength={20}
              showCount
            />
          </Form.Item>
          <Form.Item label="Giá (VND)">
            <Input
              type="number"
              value={newTicketType.price}
              
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= 100000000) {
                  setNewTicketType({ ...newTicketType, price: value });
                }
              }}
              placeholder="Nhập giá"
              min={0}
              max={100000000}
              addonAfter='đ'
              onWheel={(e) => e.target.blur()}
            />
          </Form.Item>
          <Form.Item label="Số lượng">
            <Input
              type="number"
              min={1}
              value={newTicketType.quantity}
              onChange={(e) => setNewTicketType({ ...newTicketType, quantity: parseInt(e.target.value, 10) })}
              placeholder="Nhập số lượng"
              onWheel={(e) => e.target.blur()}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox checked={isConfirmChecked} onChange={(e) => setIsConfirmChecked(e.target.checked)}>
              Loại vé không được thay đổi sau khi tạo, vui lòng kiểm tra kỹ thông tin
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
      {/* <Modal
        title="Tạo mã giảm giá"
        open={isCreateDiscountModalVisible}
        onCancel={() => {
          setNewDiscountCode({
            accountId: user.accountId,
            eventId: eventId,
            code: '',
            discountAmount: 0,
            quantity: 0,
            status: ''
          });
          setIsCreateDiscountModalVisible(false);
        }}
        footer={[
          <CustomButton key="submit" type="primary" onClick={handleCreateDiscountCode}>
            Tạo
          </CustomButton>,
        ]}
      >
        <Form layout="vertical" onFinish={handleCreateDiscountCode}>
          <Form.Item label="Mã giảm giá" name="code" rules={[
            { required: true, message: 'Vui lòng nhập mã giảm giá' },
            { pattern: /^[A-Z0-9]+$/, message: 'Mã giảm giá phải viết in hoa và không có khoảng trắng' },
            { max: 10, message: 'Mã giảm giá không vượt quá 10 ký tự' }
          ]}>
            <Input
              value={newDiscountCode.code}
              onChange={(e) => setNewDiscountCode({ ...newDiscountCode, code: e.target.value })}
              placeholder="Nhập mã giảm giá"
              maxLength={20}
              showCount
            />
          </Form.Item>
          <Form.Item label="Giá trị giảm (%)" name="discountAmount"
            rules={[
              { required: true, message: 'Vui lòng nhập giá trị giảm' },
              { type: 'number', min: 1, max: 100, message: 'Giá trị giảm phải lớn hơn 1 và nhỏ hơn 100' }
            ]}>
            <Input
              type="number"
              value={newDiscountCode.discountAmount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setNewDiscountCode({ ...newDiscountCode, discountAmount: value });
              }}
              placeholder="Nhập giá trị giảm"
            />
          </Form.Item>
          <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
            <Input
              type="number"
              min={1}
              value={newDiscountCode.quantity}
              onChange={(e) => setNewDiscountCode({ ...newDiscountCode, quantity: e.target.value })}
              placeholder="Nhập số lượng"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm số lượng mã giảm giá"
        open={isDiscountModalVisible}
        onCancel={() => setIsDiscountModalVisible(false)}
        footer={[
          <CustomButton key="submit" type="primary" onClick={handleAddDiscountQuantity}>
            Thêm
          </CustomButton>,
        ]}
      >
        <Input
          type="number"
          min={1}
          value={discountQuantity}
          onChange={(e) => setDiscountQuantity(parseInt(e.target.value, 10))}
          placeholder="Nhập số lượng mã giảm giá muốn thêm"
        />
      </Modal> */}
    </div>
  );
};

export default EditEvent;
