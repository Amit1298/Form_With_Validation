import axios from "axios";
import { useEffect, useState } from "react";
import {MDBTable,MDBTableHead,MDBTableBody,MDBRow,MDBCol,MDBContainer,MDBBtn,MDBBtnGroup,MDBPaginationItem,MDBPaginationLink, MDBPagination,} from "mdb-react-ui-kit"

function Details(){
    const [data, setData]=useState([]);
    const [currentPage,setCurrentPage]=useState(0);
    const [pageLimit,setPageLimit]=useState(4);

    useEffect(()=>{
        loadUserData(0,4,0);
    },[]);

    const loadUserData=async (start,end,increase)=>{
        return await axios.get(`http://localhost:5000/users?_start=${start}&_end=${end}`).then((response)=>{
            setData(response.data);
            setCurrentPage(currentPage+increase);
        }).catch((err)=>console.log(err));
    }
    console.log("Data: ",data);

    const renderPagination=()=>{
        if(currentPage===0){
            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <MDBPaginationLink>1</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn onClick={()=> loadUserData(4,8,1)}>Next</MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }else if(currentPage < pageLimit -1 && data.length === pageLimit){
            return (
                <MDBPagination className="mb-0">
                    
                    <MDBPaginationItem>
                        <MDBBtn onClick={()=> loadUserData((currentPage - 1)*4,currentPage*4,-1)}>Previus</MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                        </MDBPaginationItem>
                    
                    <MDBPaginationItem>
                        <MDBBtn onClick={()=> loadUserData((currentPage+1)*4,(currentPage+2)*4,1)}>Next</MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }
        else{
            return(
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <MDBBtn onClick={()=> loadUserData(4,8,1)}>Previus</MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage+1}</MDBPaginationLink>
                    </MDBPaginationItem>
                    
                </MDBPagination>
            )
        }
    }
    return(
        <>
        <MDBContainer>
            <div style={{marginTop: "100px"}}>
                <h2>Pagination With Fake API</h2>
                <MDBRow>
                    <MDBCol size='12'>
                        <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Title</th>
                                <th scope="col">Desciption</th>
                                <th scope="col">Status</th>
                                <th scope="col">Assignee</th>
                                <th scope="col">Reporter</th>
                            </tr>
                        </MDBTableHead>
                        {data.length===0 ? (
                            <MDBTableBody className="align-center mb-0">
                                <tr>
                                    <td colSpan={5} className="text-center mb-0">No Data Found</td>
                                </tr>
                            </MDBTableBody>
                        ):(data.map((item,index)=>(
                            <MDBTableBody key={index}>
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.Title}</td>
                                    <td>{item.Desciption}</td>
                                    <td>{item.Status}</td>
                                    <td>{item.Assignee}</td>
                                    <td>{item.Reporter}</td>
                                </tr>
                            </MDBTableBody>
                        )))}
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
                <div style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "450px",
                    alignContent: "center"
                }}>{renderPagination()}</div>
            </div>
        </MDBContainer>
        </>
    )
}
export default Details;