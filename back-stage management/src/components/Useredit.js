    import React  from "react";
    import { Table, Input, Popconfirm, Form } from 'antd';
    const EditableContext = React.createContext();
    import Api from "../api"

    let changename = null;
    let changevalue = null;
    const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
    <tr {...props} />
    </EditableContext.Provider>
    );

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
        }

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
        console.log(this)
        changename = this.props.dataIndex;
        changevalue = this.input.props.value;
        let ID = this.props.record.key
        let updatedata = {}
        updatedata[changename] = changevalue;
        // let datas = {Img,updatedata}
        //数据库数据更新
        // console.log(updatedata)
        let datas ={ID,updatedata}
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
            key:"count", 
            title: '#',
            dataIndex: 'count',
            width: '10%',
            // editable: true,
        },
        {
        key:"Phone", 
        title: 'Phone',
        dataIndex: 'Phone',
        width: '30%',
        // editable: true,
        },
        {
        key:"Password", 
        title: 'Password',
        dataIndex: 'Password',
        width: '20%',
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
        let {data} = await Api.get_userall();
        // console.log(data)
        this.setState({
            dataSource:data.map(item=>{
                return {
                    key:item._id,
                    Phone:`${item.phone}`,
                    Password:item.password,
                }
            }),
            count:data.length
        })
    }
    handleDelete = key => {
    let ID = key ;
        // console.log(ID)
    let {data} = Api.delete_user(ID)
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
        {/* <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a row
        </Button> */}
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
            <EditableTable  style={{width:"90%"}} rowSelection={rowSelection} scroll={{ y: 240 } }/>
        )
    }
    }
    export default Goodshow;