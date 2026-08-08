import { useEffect, useState } from "react";

import API from "../services/api";

import "../styles/manageAdmins.css";


function ManageAdmins() {


const [users,setUsers] = useState([]);

const [loading,setLoading] = useState(true);

const [actionLoading,setActionLoading] = useState(false);





useEffect(()=>{

    fetchUsers();

},[]);







// ==========================
// Get All Users
// ==========================

const fetchUsers = async()=>{


try{


    const response =
    await API.get(
        "/admin/users"
    );


    setUsers(
        response.data.users || []
    );


}

catch(error){


    console.log(error);


}


finally{


    setLoading(false);


}


};









// ==========================
// Make Admin
// ==========================

const makeAdmin = async(id)=>{


try{


    const confirm =
    window.confirm(
        "Make this user Admin?"
    );


    if(!confirm)
    return;



    setActionLoading(true);



    await API.put(
        `/admin/make-admin/${id}`
    );



    alert(
        "User promoted to Admin"
    );



    fetchUsers();



}

catch(error){


    console.log(error);


    alert(

        error.response?.data?.message ||

        "Failed to make admin"

    );


}

finally{


    setActionLoading(false);


}


};









// ==========================
// Remove Admin
// ==========================

const removeAdmin = async(id)=>{


try{


    const confirm =
    window.confirm(
        "Remove Admin access?"
    );


    if(!confirm)
    return;



    setActionLoading(true);



    await API.put(
        `/admin/remove-admin/${id}`
    );



    alert(
        "Admin removed"
    );



    fetchUsers();



}

catch(error){


    console.log(error);



    alert(

        error.response?.data?.message ||

        "Failed to remove admin"

    );


}

finally{


    setActionLoading(false);


}


};








if(loading){


return (

<div>

<h2>
Loading Users...
</h2>

</div>

);


}







return (

<div className="manage-admins">


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


<th>
Action
</th>


</tr>


</thead>





<tbody>


{

users.map((user)=>(


<tr key={user._id}>


<td>

{user.name}

</td>



<td>

{user.email}

</td>



<td>

{user.role}

</td>





<td>




{

user.role === "student" &&

(

<button

onClick={()=>
makeAdmin(user._id)
}

disabled={actionLoading}

>

Make Admin

</button>


)

}





{

user.role === "admin" &&

(

<button

onClick={()=>
removeAdmin(user._id)
}

disabled={actionLoading}

>

Remove Admin

</button>


)

}





{

user.role === "superadmin" &&

(

<span>

Super Admin

</span>

)

}




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