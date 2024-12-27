import React from 'react'
import { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import EmployeeService from '../service/EmployeeService'

function UpdateEmployeeComponent() {

    let navigate=useNavigate();

    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[email,setEmail]=useState("");
    const {id}=useParams();

    useEffect(()=>{
        EmployeeService.getEmployeeById(id).then(res=>{
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmail(res.data.email);
        })
    },[])

    const handleCancle=(e)=>{
        e.preventDefault();
        navigate("/employees");
    }

    const handleUpdate=(e)=>{
        e.preventDefault();
        const employee={firstName,lastName,email};

        if(id)
        {
            EmployeeService.updateEmployee(id,employee).then(res=>{
                navigate("/employees")
            })
        }
        else
        {
            EmployeeService.createEmployee(employee).then(res=>{
                navigate("/employees")
            })
        }
    }

  return (
    <div className='container mt-3'>
        <div className='card col-md-6 offset-3'>
            <h4 className='text-center pt-3'>Update Employee</h4>

            <div className='card-body'>
                <form>
                    <label className='my-3'>FirstName:</label>
                    <input type='text' name='firstName' id='firstName' className='form-control' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>

                    <label className='my-3'>LastName:</label>
                    <input type='text' name='lastName' id='lastName' className='form-control' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>

                    <label className='my-3'>Email:</label>
                    <input type='text' name='email' id='email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>

                    <button className='btn btn-danger mt-3' onClick={handleCancle}>Cancle</button>
                    <button className='btn btn-success mt-3 ms-3' onClick={handleUpdate}>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateEmployeeComponent
