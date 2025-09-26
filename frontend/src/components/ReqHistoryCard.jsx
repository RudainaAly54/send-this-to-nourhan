import React from "react";

const ReqHistoryCard = ({date, material, time, status}) =>{
return (
    <div style={{display:'flex', flexDirection:"column" , background:"none", border:"2px solid #000", borderRadius:"20px", position:"relative", textAlign:"start", padding:"10px", lineHeight:"5px", width: "350px"}}>
        <h3 style={{fontWeight:'900', color:"#000"}}>{date}</h3>
        <p style={{color:'#808080'}}>{time}</p>
        <p style={{color:'#808080'}}>{material}</p>
        <div style={{display:"flex", gap:"5px", margin:"10px"}}>
            <button style={{background: "none", border:"2px solid #000", borderRadius:"10px", color:"black", padding:"5px", height:"30px", fontSize:"10px", display:"flex", justifyContent:"center", alignItems:'center'}}>Modify</button>
        <button style={{background: "none", border:"2px solid #000", borderRadius:"10px", color:"black",padding:"5px", height:"30px", fontSize:"10px", display:"flex", justifyContent:"center", alignItems:'center'}}>Cancel</button>
        </div>
        <div style={{background:'#F5F5F5', color:'#000',  border:"none", borderRadius:'20px', padding:"5px", position:"absolute", top:"10px", right:"1px", width:"90px", height:"30px", display:"flex", justifyContent:"center", alignItems:'center'}}> <p>{status}</p></div>
    </div>
)
}
export default ReqHistoryCard