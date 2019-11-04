import React,{Component}from "react";
import { Form, Input, Button ,Select,Upload,Icon,Modal} from 'antd';
const { Option } = Select;


class Goodsadd extends Component{

    constructor() {
        super();
        this.state = {
        formLayout: 'horizontal',
        previewVisible: false,
        previewImage: '',
        imgList: [],
        };
    }
    
    handleFormLayoutChange = e => {
        this.setState({ formLayout: e.target.value });
    };

    picCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }

    handleChange = ({ file, fileList }) => {
        // console.log(JSON.stringify(file)); // file 是当前正在上传的 单个 img
        // console.log(JSON.stringify(fileList)); // fileList 是已上传的全部 img 列表
        this.setState({
            imgList: fileList,
        });
        };

    normFile = e => {
    // 检查图片类型
    // 只能上传三种图片格式
    const isJPG = e.file.type === 'image/jpeg';
    const isPNG = e.file.type === 'image/png';
    const isBMP = e.file.type === 'image/bmp';
    const isGIF = e.file.type === 'image/gif';
    const isWEBP = e.file.type === 'image/webp';
    const isPic = isJPG || isPNG || isBMP || isGIF || isWEBP;
    if (!isPic) {
    message.error('只能上传图片');
    // console.log(e.fileList);
    return e.fileList.filter((fileItem)=> e.file.uid !== fileItem.uid);
    } else {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
    }
        };

    render(){
    const { formLayout ,previewVisible,previewImage} = this.state;
    console.log( this.props.form);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout =
    formLayout === 'horizontal'
    ? {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    }
    : null;
    const buttonItemLayout =
    formLayout === 'horizontal'
    ? {
    wrapperCol: { span: 14, offset: 4 },
    }
    : null;

    return(
        <div>
                <Form layout={formLayout}>

                <Form.Item label="ID" {...formItemLayout}>
                <Input placeholder="请输入ID" />
                </Form.Item>

                <Form.Item label="Name" {...formItemLayout}>
                <Input placeholder="请输入商品名" />
                </Form.Item>

                <Form.Item label="Size" {...formItemLayout}>
                {getFieldDecorator('Size', {
                rules: [
                { required: true, message: '选择尺寸', type: 'array' },
                ],
                })(
                <Select mode="multiple" placeholder="请选择尺寸">
                <Option value="red">500g</Option>
                <Option value="green">1.3磅</Option>
                <Option value="blue">三只装</Option>
                </Select>
                ,
                )}
                </Form.Item>

                <Form.Item label="CurrentPrice" {...formItemLayout}>
                <Input placeholder="请输入商品价格" />
                </Form.Item>

                <Form.Item label="Dragger"   {...formItemLayout}>
                    {getFieldDecorator('dragger', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    // initialValue: info && info.img_path,
                    })(
                    <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                    ,
                    <Modal visible={previewVisible} footer={null} onCancel={this.picCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                    )}
                </Form.Item>

                <Form.Item {...buttonItemLayout}>
                <Button type="primary">Submit</Button>
                </Form.Item>
                </Form>
        </div>
    )
    }
}
Goodsadd = Form.create({})(Goodsadd);
export default Goodsadd;

