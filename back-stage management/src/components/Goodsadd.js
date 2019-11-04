import React,{Component}from "react";
import { Form, Input, Button ,Select,Upload,Icon,message } from 'antd';
const { Option } = Select;
const { Dragger } = Upload;
import Api from "../api"

let gsize = null;
let img  = null;
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
    }

const props = {
        name: 'file',
        method:"post",
        action: 'http://localhost:20124/detail_inf/pic_upload',

        onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList[0].response);
            img = info.fileList[0].response;

        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        },
};
class Goodsadd extends Component{

    constructor() {
        super();
        this.state = {
        formLayout: 'horizontal',
        gsize:null,
        imgList: null,
        sizeForm: {
            title: '',
            subtitle: '',
            img: '',
            go: '',
            price:'',
            tab:[]
        }
        };
    }
        getBase64=(img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
        // console.log(111)
        }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
                imageUrl,
                loading: false,
            }),
            );
        }
        };

        async handleSubmit(e){
            e.preventDefault();
            console.log(this.inputDOM);
            let ID = this.props.form.getFieldValue('ID');
            let Name = this.props.form.getFieldValue('Name');
            let CurrentPrice = this.props.form.getFieldValue('CurrentPrice');
            let datas ={ID:ID,Name:Name,CurrentPrice:CurrentPrice,Size:gsize,imgurl:img};
            let data= await Api.add_goods(datas);
            console.log(datas)
            if(data.code ===1){
                alert("successfully!")
                this.props.form.resetFields(); 
            }
            
        }

        getChange = e=>{
            gsize = e[0]
            console.log(gsize)
        }
    render(){
    const { formLayout ,imageUrl} = this.state;

    const uploadButton = (
        <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const { getFieldDecorator ,getFieldProps} = this.props.form;
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
        <div style={{marginTop:50}}>
                <Form layout={formLayout}  onSubmit={this.handleSubmit.bind(this)}>

                <Form.Item label="ID" {...formItemLayout}>
                <Input placeholder="请输入ID"  {...getFieldProps('ID')}/>
                </Form.Item>

                <Form.Item label="Name" {...formItemLayout}>
                <Input placeholder="请输入商品名"  {...getFieldProps('Name')}/>
                </Form.Item>

                <Form.Item label="Size" {...formItemLayout}>
                {getFieldDecorator('Size', {
                rules: [
                { required: true, message: '选择尺寸', type: 'array' },
                ],
                })(
                <Select mode="multiple" placeholder="请选择尺寸"
                onChange={this.getChange.bind(this)}
                ref={el=>{this.inputDOM=el}}>
                <Option value="500g">500g</Option>
                <Option value="1.3磅">1.3磅</Option>
                <Option value="三只装">三只装</Option>
                </Select>
                ,
                )}
                </Form.Item>

                <Form.Item label="CurrentPrice" {...formItemLayout}>
                <Input placeholder="请输入商品价格" {...getFieldProps('CurrentPrice')}/>
                </Form.Item>

                <Form.Item label="Dragger" beforeUpload={beforeUpload} 
                    showUploadList={false} {...formItemLayout}>
                    <Dragger {...props} >
                        {imageUrl ? <img src={img} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Dragger>
                </Form.Item>

                <Form.Item {...buttonItemLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
                </Form>
        </div>
    )
    }
}
Goodsadd = Form.create({})(Goodsadd);
export default Goodsadd;

