import React ,{Commponent} from "react";
import { Table, Input, Button, Popconfirm, Form } from 'antd';
const EditableContext = React.createContext();
import Api from "../api"


let changename = null;
let changevalue = null;
const EditableRow = ({ form, index, ...props }) => (
<EditableContext.Provider value={form}>
<tr {...props} />
</EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
state = {
editing: false,
};

toggleEdit = () => {
const editing = !this.state.editing;
this.setState({ editing }, () => {
    if (editing) {
    this.input.focus();
    }
});
};

save = e => {

const { record, handleSave } = this.props;
this.form.validateFields((error, values) => {
    if (error && error[e.currentTarget.id]) {
    return;
    }
    this.toggleEdit();
    handleSave({ ...record, ...values });
    //获取
    changename = this.props.dataIndex;
    changevalue = this.input.props.value;
    let Img = this.props.record.Img
    let updatedata = {}
    updatedata[changename] = changevalue;
    // let datas = {Img,updatedata}
    //数据库数据更新
    // console.log(updatedata)
    let datas ={Img,updatedata}
    let {data} = Api.update_goods(datas)
    // console.log(data)
});
};

renderCell = form => {
this.form = form;
const { children, dataIndex, record, title } = this.props;
const { editing } = this.state;
return editing ? (
    <Form.Item style={{ margin: 0 }}>
    {form.getFieldDecorator(dataIndex, {
        rules: [
        {
            required: true,
            message: `${title} is required.`,
        },
        ],
        initialValue: record[dataIndex],
    })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
    </Form.Item>
) : (
    <div
    className="editable-cell-value-wrap"
    style={{ paddingRight: 24 }}
    onClick={this.toggleEdit}
    >
    {children}
    </div>
);
};

render() {
const {
    editable,
    dataIndex,
    title,
    record,
    index,
    handleSave,
    children,
    ...restProps
} = this.props;
return (
    <td {...restProps}>
    {editable ? (
        <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    ) : (
        children
    )}
    </td>
);
}
}

class EditableTable extends React.Component {
constructor(props) {
super(props);
this.columns = [
    {
    key:"ID", 
    title: 'ID',
    dataIndex: 'ID',
    width: '10%',
    editable: true,
    },
    {
    key:"Name", 
    title: 'Name',
    dataIndex: 'Name',
    width: '20%',
    editable: true,
    },
    {
    key:"Img", 
    title: 'Img',
    dataIndex: 'Img',
    width: '10%',
    render: (Img,record) =>{
        // console.log(Img,record)
        return <img src={record.Img} style={{width:50,height:50}}/>
    }
    },
    {
    key:"Size", 
    title: 'Size',
    dataIndex: 'Size',
    width: '10%',
    editable: true,
    },
    {
    key:"CurrentPrice", 
    title: 'CurrentPrice',
    dataIndex: 'CurrentPrice',
    width: '10%',
    editable: true,
    },

    {
    title: 'operation',
    dataIndex: 'operation',
    width: '20%',
    render: (text, record) =>
        this.state.dataSource.length >= 1 ? (
        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            <a>Delete</a>
        </Popconfirm>
        ) : null,
    },
];

this.state = {
    dataSource: [
    ],
    count: null,
};
}

async componentDidMount(){
    let {data} = await Api.get_detailall();
    // console.log(data)
    this.setState({
        dataSource:data.map(item=>{
            return {
                key:item.Name,
                ID:`${item.ID}`,
                Name:item.Name,
                Img:item.imgurl,                  	
                Size:`${item.Size}`,                  	
                CurrentPrice:item.CurrentPrice,
            }
        }),
        count:data.length

    })
}
handleDelete = key => {
let ID = key ;
    // console.log(ID)
let {data} = Api.delete_goods(ID)
// if(data.code===1){
//     alert("haha")
// }
this.forceUpdate();
const dataSource = [...this.state.dataSource];
this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
};


handleAdd = () => {
const { count, dataSource } = this.state;
const newData = {
    key: count,
    ID:"EDIT",
    Name:"EDIT",
    Img:"EDIT",                  	
    Size:"EDIT",                 	
    CurrentPrice:"EDIT"
};
this.setState({
    dataSource: [newData,...dataSource],
    count: count + 1,
});
};

handleSave = row => {
const newData = [...this.state.dataSource];
const index = newData.findIndex(item => row.key === item.key);
const item = newData[index];
newData.splice(index, 1, {
    ...item,
    ...row,
});
this.setState({ dataSource: newData });
console.log(this.state)
};

render() {
const { dataSource } = this.state;
const components = {
    body: {
    row: EditableFormRow,
    cell: EditableCell,
    },
};

const columns = this.columns.map(col => {
    if (!col.editable) {
    return col;
    }
    return {
    ...col,
    onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: this.handleSave,
    }),
    };
});

return (
    <div>
    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
    </Button>
    <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
    />
    </div>
);
}
}
class Goodshow extends React.Component{
render(){
    return(
        <EditableTable  style={{width:"90%"}} scroll={{ y: 240 } }/>
    )
}
}
export default Goodshow;