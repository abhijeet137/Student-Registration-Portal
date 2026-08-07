import { useEffect, useState } from "react";

import API from "../services/api";



function ManageAdmins() {


const [admins,setAdmins] =
useState([]);


const [loading,setLoading] =
useState(true);





useEffect(()=>{

fetchAdmins();

},[]);






const fetchAdmins = async()=>{


try{


const response =
await API.get("/admin/admins");


setAdmins(
response.data.admins || []
);


}

catch(error){


console.log(error);


}

finally{


setLoading(false);


}


};







if(loading){


return (

<h2>
Loading Admins...
</h2>

);


}






return (

<div>


<h1>
Manage Admins
</h1>



<table>


<thead>

<tr>

<th>
Name
</th>


<th>
Email
</th>


<th>
Role
</th>


</tr>

</thead>




<tbody>


{

admins.map((admin)=>(


<tr key={admin._id}>


<td>
{admin.name}
</td>


<td>
{admin.email}
</td>


<td>
{admin.role}
</td>



</tr>


))


}


</tbody>


</table>



</div>

);


}



export default ManageAdmins;