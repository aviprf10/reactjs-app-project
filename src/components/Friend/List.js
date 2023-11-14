import React, { useEffect , useRef, useState} from 'react'
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import Pagination from 'react-bootstrap/Pagination';
import dateFormat from 'dateformat';
import Spinner from 'react-bootstrap/Spinner';

export default function List() {
  var name="Friend List";
  var headname = "Friend";
  const [APIData, setAPIData] = useState({ 
    data:[]
  }); //State and HOOK Variable
  const [paginationItem, setPaginationItem] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const renderAfterCalled = useRef(false);

  let last = (e) =>{
    console.log('last');
    if(APIData.meta.pagination.page !== APIData.meta.pagination.pageCount){
      getFriendData(e, APIData.meta.pagination.pageCount);
    }
  }

  let next = (e) =>{
    console.log('next');
    if(APIData.meta.pagination.page !== APIData.meta.pagination.pageCount){
      let next = APIData.meta.pagination.page + 1;
      getFriendData(e, next);
    }
  }

  let first = (e) =>{
    if(APIData.meta.pagination.page !== 1){
      getFriendData(e, 1);
    }
    
  }

  let prev = (e) =>{
    console.log('prev');
    if(APIData.meta.pagination.page !== 1){
      let prev = APIData.meta.pagination.page - 1;
      getFriendData(e, prev);
    }
  }

  let gotoPage = (e, i) =>{
    console.log('goTopage');
    getFriendData(e, i);
  }

  useEffect(() => {
    if (!renderAfterCalled.current) {
       getFriendData();
    }
    renderAfterCalled.current = true
  })

  let getFriendData = (e='', pageno=1) => {
      try {
        setIsLoading(true);
        axios({
            url: `${process.env.REACT_APP_LOCAL_URL}friends?sort[0]=id:desc&pagination[page]=${pageno}&pagination[pageSize]=10`,
            method:"get", 
              headers:{
                "Authorization": `Bearer  ${process.env.REACT_APP_TOKEN}`,
                "accept": "application/json",
                "Content-Type": "application/json",
                
            }
          })
        .then(response => {
          setAPIData(response.data)
          
          var start = response.data.meta.pagination.page
          var pageCount = response.data.meta.pagination.pageCount;
          var arr=[];
          for(let i=start; i <= pageCount; i++){
            arr.push(<Pagination.Item onClick={(e)=>{ gotoPage(e, i) }}>{i}</Pagination.Item>);
          }
          setPaginationItem(arr);
          setIsLoading(false)
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error.response);
          Swal.fire({
              icon: 'error',
              title: error.response.data.error.name,
              text: error
            })
            setIsLoading(false)  
        });
      } catch (error) {
        console.log(error);
          Swal.fire({
            icon: 'error',
            title: error,
            text: error,
          })
        setIsLoading(false)  
      }
  }

  let onDelete = (id)=>{
      try {
        setIsLoading(true);
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then( async (result) => {
          if (result.isConfirmed) {
            axios({
              url: `${process.env.REACT_APP_LOCAL_URL}friends/${id}`,
                method:"delete", 
                  headers:{
                    "Authorization": `Bearer  ${process.env.REACT_APP_TOKEN}`,
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    
                }
            })
            .then(response =>{
              console.log("error", response)
              if(response.data !== null){
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                getFriendData();
                setIsLoading(false);
              }else{
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: response.error.message,
                    })
                  setIsLoading(false)  
              }
            })
            .catch((error)=>{
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error.name,
                    text: error.response.data.error.message,
                  })
                setIsLoading(false)   
            });
            
          }
        })
        
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      }
  }

  return (
    <>
    <div className="container" ><br/>
      <h1>{name}</h1>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to='/friend-list'><button className='btn btn-info'> List {headname}</button></Link>
        <Link to='/friend-create'><button className='btn btn-primary'> Create {headname}</button></Link>
      </div> <br/>
      {isLoading ? (
          <div className="d-flex justify-content-center" >
              <Spinner animation="grow" />
          </div>
        ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              APIData.data.map(function(currentValue, index, arr){
                var create_at = dateFormat(currentValue.attributes.createdAt, "d-m-yyyy"); 
                return (
                  
                      <tr key={currentValue.id}>
                        <td>{currentValue.id}</td>
                        <td>{currentValue.attributes.name}</td>
                        <td>{currentValue.attributes.email}</td>
                        <td>{create_at}</td>
                        <td>
                          <Link to={`/view-friend/${currentValue.id}`}><Button variant="warning"><i className="fa fa-eye"></i></Button></Link>&nbsp; &nbsp;
                          <Link to={`/edit-friend/${currentValue.id}`}><Button variant="primary"><i className="fa fa-edit"></i></Button></Link>&nbsp; &nbsp;
                          <Button variant="danger" onClick= {(e) => { onDelete(currentValue.id) }}><i className="fa fa-trash"></i></Button>
                        </td>
                      </tr>
                    
                  )
              })
            }
            
          </tbody>
        </Table>
      )}
      <Pagination style={{float:'right'}}>
        <Pagination.First onClick={(e)=>{ first(e); }}/>
        <Pagination.Prev onClick={(e)=>{ prev(e); }}/>
        {
          paginationItem
        }
        <Pagination.Next onClick={(e)=>{ next(e); }}/>
        <Pagination.Last onClick={(e)=>{ last(e); }}/> 
      </Pagination> 
    </div>
    </>
  )
}
