import React from "react";
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css"


/*function MyCell({ value, columnProps: { rest: { someFunc } } }) {
  return (
    

    <div>
  <ReactTable
        className="-striped -highlight"
        data={data}
        filterable
        columns={columns}
        defaultPageSize={10}
      >
   
      </ReactTable>
  </div>

);
}*/


export default class FetchRandomUser extends React.Component {
  state = {
    loading: true,
    products  : []
  };

  async componentDidMount() {
   const url = "https://app.getrecall.com/api/products";
    const response = await fetch(url);
    const data = await response.json();
   this.setState({ products: data.products, loading: false });

  

  }




  render() {
    var data = this.state.products;

 /*   data = data.map((row) => { 
     
      row.feature = row.features;
      return row;
    }); */

    var columns = [
       {
         Header: "userID",
         accessor: "_id",
         className: "frozen",
         headerClassName: "frozen"
       },



       {
        Header: "Name",
        accessor: "name",
       
      },


      {
        Header: "Features",
        Cell: row => {

         

          //const myArrCreatedFromMap =  row.original.features.map((item, i) => (<li key={item + i}>{item}</li>)); 
          
          const myArrCreatedFromMap =  row.original.features.map((item, i) => (<tr><td>{item}</td></tr>)); 
          
          const myList = (
          //  <ul>{myArrCreatedFromMap}</ul> 
            <table style={{textAlign : "left"}}>{myArrCreatedFromMap}</table> 
          )
      
     
          return (
          <p> {myList}</p>
          
    
        );
        },
      
       // getProps: () => ({ someFunc: () => alert("clicked")})
     
      },

      {
        Header: "Description",
        accessor: "description",
    
      },

      {
        Header: "Specifications",
      

        Cell: row => (
         
          <ReactTable
          className="-striped -highlight"
          data={row.original.specifications}
          
          columns={[{
            Header: "name",
            accessor: "name",
          },{
            Header: "category",
            accessor: "category",
          },{
            Header: "value",
            accessor: "value",
          }]}
          showPagination={true}
          defaultPageSize={4}
          
         
        >
     
        </ReactTable>
        
          )
       
      },


      {
        Header: "Category",
        accessor: "category",
      
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          if (filter.value === "1") {
            return row[filter.id] == "Embedded Flash Storage";
          }
          return row[filter.id] == "GPU & Edge AI";
        },
        Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">Show All</option>
          <option value="1">Embedded Flash Storage</option>
          <option value="2">GPU & Edge AI</option>
        </select>

      },

      {
        Header: "Subcategory",
        accessor: "subcategory",
       
      },


      {
        Header: "CreatedAt",
        accessor: "createdAt",
      
      },


      {
        Header: "UpdatedAt",
        accessor: "updatedAt",
       
      },

      {
        Header: "__v",
        accessor: "__v",
        
      },


      {
        Header: "modelId",
        accessor: "modelId",
       
      },


      {
        Header: "pid",
        accessor: "pid",
      
      },


      {
        Header: "Datasheet",
        accessor: "datasheet",
      
      },


      
    

      {
        Header: "Image",
       // accessor: "thumbnail",
        Cell: row => (
          
        <div>
      <a href={row.original.link} target="_blank"  > <img height="100" src={row.original.thumbnail}/></a>
         </div>
        )
        },











    ]
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.products) {
      return <div>didn't get a product</div>;
    }

    return (
    

        <div>
      <ReactTable
            className="-striped -highlight"
            data={data}
            filterable
            columns={columns}
            defaultPageSize={10}
          >
       
          </ReactTable>
      </div>

    );
  }
}
