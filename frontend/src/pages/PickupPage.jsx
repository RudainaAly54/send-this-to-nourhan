import React, {useState} from "react";
import ReqHistoryCard from "../components/ReqHistoryCard";
import { Truck} from 'lucide-react';
import {createRequest, getRequests} from '../api.js'


const PickupPage = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [address, setAddress] = useState("");
    const [material, setMaterial] = useState("");
    const [weight, setWeight] = useState();
    const [instructions, setInstructions] = useState("");
    const [status, setStatus] = useState("Pending")
    
    
    async function handleSubmit() {
 const dateTime = `${date}T${time}`;
        
        let pickupReq ={
            user_id: null, 
            center_id: null,
            material: material,
            weight_kg: weight,
            status: status,
            requested_at: new Date().toLocaleDateString("en-EG", {
  timeZone: "Africa/Cairo"
}), // e.g. "2025-09-26",
            completed_at: dateTime
        }

        await createRequest(pickupReq)
    }

    function PickUpHistory () {

    }
    return (
        <div 
        style={{
            display:"flex",
           gap:'10px'
        }}
        >
            {/* Form */}
            <div style={{
                background:"#fff",
                border:"none",
                borderRadius:"20px",
                color:"#808080",
                padding:"10px"
            }}>
                
                   
                  <div style={{display:'flex', alignItems:"center"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck-icon lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                    <div>
                        <h2
                    style={{
                        color:"#000",
                        textAlign:'start',
                        lineHeight:'1px'
                    }}>   Schedule Pickup </h2>
                <p>convient pickup service for your recyclable materials </p>
                  </div>
                    </div>
                
                    <form onSubmit={handleSubmit}>
                        {/* Date input */}
                <div style={{
                    display:'flex',
                    gap:"20px"
                }} >
                    <div  style={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:"10px",
                    }}>
                        <label htmlFor="date" style={{color:"#000" }}>
                        Preffered Date 
                    </label>
                    <input type="date" id="date" 
                    onChange={(e) => setDate(new Date(e.target.value))}   required
                    style={
                        {
                            border: 'none',
                            borderRadius:'15px',
                            padding:'10px',
                            background:'#F5F5F5',
                            color:"#808080",
                        }
                    }/>
                    </div>

                <div style={{
                      display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:"10px",
                }}>
                        <label htmlFor="time"  style={{color:"#000"}}>
                        Time Slot 
                    </label>
                   <select name="time" id="time" 
                   onChange={(e) => setTime(e.target.value)} required
                   style={
                        {
                            border: 'none',
                            borderRadius:'15px',
                            padding:'10px',
                            background:'#F5F5F5',
                            color:'#808080'
                        }
                    }>
                    <option value="" disabled>Select time slot</option>
                    <option value="10AM-12PM">10AM-12PM</option>
                    <option value="4PM-5PM">4PM-5PM</option>
                    <option value="7PM-8PM">7PM-8PM</option>
                   </select>
                </div>
                </div>
                {/*  Date  input ended*/}

{/* Address input */}
                <div style={{
                      display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:"10px",
                }}
                >
                    <label htmlFor="address" style={{color:'#000'}}>Pickup Adress</label>
                    <input style={ {
                            border: 'none',
                            borderRadius:'15px',
                            padding:'10px',
                            background:'#F5F5F5',
                            color:'#808080',
                            width: "95%"
                        }}
                    type="text" id="address" placeholder="Enter your pickup address" 
                    onChange={(e) => setAddress(e.target.value)} required/>
                </div>
{/* Address INput ended */}

{/* Material Input */}
                <div style={{
                      display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:"10px",
                }}>
<label htmlFor="material" style={{color: 'black'}}> Material for pickup</label>
                   
                    <div style={{
                      display:'flex',
                        flexDirection:'row',
                        alignItems:'flex-start',
                        gap:"50px",
                        marginLeft: "30px"
                }}> 
                         {/* Left checkboxes */}
                        <div style={{
                      display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:"10px",
                }}>
                     
                        <div>
                    <input type="checkbox" id="plastic" value={"plastic"} style={{background:"#3B3B3B"}} onChange={(e) => setMaterial(e.target.value)}/>
                    <label htmlFor="plastic" style={{ color:"#000"}}>Plastic</label>
                        </div>
                        <div>
                    <input type="checkbox" id="glass" value={"glass"} style={{background:"#3B3B3B"}} onChange={(e) => setMaterial(e.target.value)}/>
                    <label htmlFor="glass" style={{ color:"#000"}}>Glass</label>
                        </div>
                        <div>
                    <input type="checkbox" id="cardboard" value={"cardboard"} style={{background:"#3B3B3B"}}onChange={(e) => setMaterial(e.target.value)}/>
                    <label htmlFor="cardboard" style={{ color:"#000"}}>Cardboard</label>
                        </div>
                    </div>

                    {/* Right Checkboxes */}
                    <div style={{
                      display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:"10px",
                }}>
                   <div>
                    <input type="checkbox" id="paper" value={"paper"} style={{background:"#3B3B3B"}} onChange={(e) => setMaterial(e.target.value)}/>
                    <label htmlFor="paper" style={{ color:"#000"}}>Paper</label>
                        </div>
                        <div>
                    <input type="checkbox" id="metal" value={"metal"} style={{background:"#3B3B3B"}} onChange={(e) => setMaterial(e.target.value)}/>
                    <label htmlFor="metal" style={{ color:"#000"}}>Metal</label>
                        </div>
                        <div>
                    <input type="checkbox" id="electronics" value={"electronics"} style={{background:"#3B3B3B"}} onChange={(e) => setMaterial(e.target.value)}/>
                    <label htmlFor="electronics" style={{ color:"#000"}}>Electronics</label>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Materail input Ended */}

                {/* Weigtht input */}

                < div style={{
                      display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:"10px",
                }}>
                    <label htmlFor="weight" style={{color:'#000'}}>Estimated Weight (kg)</label>
                    <input style={ {
                            border: 'none',
                            borderRadius:'15px',
                            padding:'10px',
                            background:'#F5F5F5',
                            color:'#808080',
                            width: "95%"
                        }}
                    type="number" id="weight" placeholder="e.g 5" 
                    onChange={(e) => setWeight(Number(e.target.value))} required/>
                </div>

                <div style={{
                      display:'flex',
                        flexDirection:'column',
                        alignItems:'flex-start',
                        gap:"10px",
                }}>
                    <label htmlFor="instructions" style={{color:"#000"}}>Special Instructions</label>
                    <textarea type="text" id="instructions" placeholder="Any special instructions fot pickup" onChange={(e) => setInstructions(e.target.value)}
                    style={{
                        background:'none',
                        border: '2px solid #000',
                        borderRadius:"25px",
                        padding:"10px",
                        width:"95%",
                        height: "60px"
                    }}></textarea>
                </div>

{/* service */}
<div style={{display:"flex"}}>
    <svg style={{color:'black'}}
    xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days-icon lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
    <p>Pickup service is available Monday-Saturday, 
9 AM to 5 PM. A $5 service fee applies for pickups under 25 lbs.</p></div>
                <button type="submit" 
                style={{
                    width:"95%",
                    marginTop:"10px", 
                    display:'flex', 
                    alignItems: "center", 
                    justifyContent:"center"
                }}
                ><Truck  style={{marginRight:"5px"}}/> Schedule Pickup</button>
            </form>
            </div>
        
<div style={{
    display:'flex',
    flexDirection: "column",
    gap:'20px'
}}>
    
            {/* Pickup History */}
            <div 
            style={{
                background:"#fff",
                border:"none",
                borderRadius:"20px",
                padding:"10px"
            }}
            >

                <div style={{textAlign:"start"}}>
                    <h3 style={{color:"black"}}>Pickup History</h3>
                    <p style={{color:"#808080"}}>your recent pickup requests and their status</p>
                </div>

                <div>
                {/*     <ReqHistoryCard  date={new Date()} time={time} material={material} status={status}/> */}
                </div>

            </div>

            {/* Benefits */}
         <div 
         style={{
                background:"#fff",
                border:"none",
                borderRadius:"20px",
                padding:"10px"
            }}
         >

            <div style={{
                display:"flex",
                gap:"10px", 
                color:"#000"
            }}>
                <svg width="30"
                fill="#004932" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#004932"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M177.6,80.43a10,10,0,1,0-19.5,4.5,60.76,60.76,0,0,1-6,44.5c-16.5,28.5-53.5,38.5-82,22-28.5-16-38.5-53-22-81.5s53.5-38.5,82-22a9.86,9.86,0,1,0,10-17c-38.5-22.5-87-9.5-109.5,29a80.19,80.19,0,1,0,147,20.5Zm-109.5,11a10.12,10.12,0,0,0-11,17l40,25a10.08,10.08,0,0,0,5.5,1.5,10.44,10.44,0,0,0,8-4l52.5-67.5c3.5-4.5,2.5-10.5-2-14s-10.5-2.5-14,2l-47,60Z"></path></g></svg>
           <p>Convenient door-to-door service</p>
            </div>
            <div style={{
                display:"flex",
                gap:"10px",
                color:"#000"
            }}>
                <svg width="30"
                fill="#004932" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#004932"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M177.6,80.43a10,10,0,1,0-19.5,4.5,60.76,60.76,0,0,1-6,44.5c-16.5,28.5-53.5,38.5-82,22-28.5-16-38.5-53-22-81.5s53.5-38.5,82-22a9.86,9.86,0,1,0,10-17c-38.5-22.5-87-9.5-109.5,29a80.19,80.19,0,1,0,147,20.5Zm-109.5,11a10.12,10.12,0,0,0-11,17l40,25a10.08,10.08,0,0,0,5.5,1.5,10.44,10.44,0,0,0,8-4l52.5-67.5c3.5-4.5,2.5-10.5-2-14s-10.5-2.5-14,2l-47,60Z"></path></g></svg>
           <p>Proper sorting and handling</p>
            </div>
            <div style={{
                display:"flex",
                gap:"10px",
                color:"#000"
            }}>
                <svg width="30"
                fill="#004932" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#004932"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M177.6,80.43a10,10,0,1,0-19.5,4.5,60.76,60.76,0,0,1-6,44.5c-16.5,28.5-53.5,38.5-82,22-28.5-16-38.5-53-22-81.5s53.5-38.5,82-22a9.86,9.86,0,1,0,10-17c-38.5-22.5-87-9.5-109.5,29a80.19,80.19,0,1,0,147,20.5Zm-109.5,11a10.12,10.12,0,0,0-11,17l40,25a10.08,10.08,0,0,0,5.5,1.5,10.44,10.44,0,0,0,8-4l52.5-67.5c3.5-4.5,2.5-10.5-2-14s-10.5-2.5-14,2l-47,60Z"></path></g></svg>
           <p>Flexible scheduling options</p>
            </div>
            <div style={{
                display:"flex",
                gap:"10px",
                color:"#000"
            }}>
                <svg width="30"
                fill="#004932" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#004932"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M177.6,80.43a10,10,0,1,0-19.5,4.5,60.76,60.76,0,0,1-6,44.5c-16.5,28.5-53.5,38.5-82,22-28.5-16-38.5-53-22-81.5s53.5-38.5,82-22a9.86,9.86,0,1,0,10-17c-38.5-22.5-87-9.5-109.5,29a80.19,80.19,0,1,0,147,20.5Zm-109.5,11a10.12,10.12,0,0,0-11,17l40,25a10.08,10.08,0,0,0,5.5,1.5,10.44,10.44,0,0,0,8-4l52.5-67.5c3.5-4.5,2.5-10.5-2-14s-10.5-2.5-14,2l-47,60Z"></path></g></svg>
           <p>Real-time updates</p>
            </div>
            <div style={{
                display:"flex",
                gap:"10px",
                color:"#000"
            }}>
                <svg width="30"
                fill="#004932" viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#004932"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M177.6,80.43a10,10,0,1,0-19.5,4.5,60.76,60.76,0,0,1-6,44.5c-16.5,28.5-53.5,38.5-82,22-28.5-16-38.5-53-22-81.5s53.5-38.5,82-22a9.86,9.86,0,1,0,10-17c-38.5-22.5-87-9.5-109.5,29a80.19,80.19,0,1,0,147,20.5Zm-109.5,11a10.12,10.12,0,0,0-11,17l40,25a10.08,10.08,0,0,0,5.5,1.5,10.44,10.44,0,0,0,8-4l52.5-67.5c3.5-4.5,2.5-10.5-2-14s-10.5-2.5-14,2l-47,60Z"></path></g></svg>
           <p>Earn points for every pickup</p>
            </div>
         </div>
</div>
        </div>
    )
}
export default PickupPage