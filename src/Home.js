
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import * as api from './api/index.js';

const Home = ({isLoggedIn}) => {
  const [center,setCenter]=useState({});
  const [current,setCurrent]=useState({});
  const [distance,setDistance]=useState(10);
  const [watchId,setWatchId]=useState(null);
  const [inside,setInside]=useState(true);
  const [id,setId]=useState();

  useEffect(() => {
    watchLocation();
    const postLocation={
       latitude:0,
       longitude:0
     }
    const createLocation = async(postLocation) =>{
      try {
        const response=await api.createLocation(postLocation);
        setId(response.data._id);
      } catch (error) {
        console.log(error.message);
      }
    };
    createLocation(postLocation);
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  

  const watchLocation=()=>{
    if ('geolocation' in navigator) {
      const geoOptions = {
        enableHighAccuracy: true,
        maximumAge : 30000,
        timeout : 27000
      };

      navigator.geolocation.watchPosition((position)=>{getLocation(position)}, null, geoOptions);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  const getLocation=(position)=> {
      const newCurrent={ 
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      setCurrent(newCurrent);
    if(center.lat===undefined){
      const newCenter={
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      setCenter(newCenter);
    }
    checkDistance();
  }

  const updateCenter=(position)=>{
    const newCenter={
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
    setCenter(newCenter);
    alert('center updated successfully')
  }

  const currentLocation=()=>{
    if ('geolocation' in navigator) {
      const geoOptions = {
        enableHighAccuracy: true,
        maximumAge : 30000,
        timeout : 27000
      };
      navigator.geolocation.getCurrentPosition((position)=>{updateCenter(position)}, null, geoOptions);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  
  const checkDistance=()=>{
    let x=getDistanceFromLatLonInKm(center.lat,center.lng,current.lat,current.lng);
    if(x<distance){
      setInside(true);
    }
    else{
      setInside(false);
    }
  }

  const getDistanceFromLatLonInKm=(lat1,lon1,lat2,lon2)=>{
    if(!lat1 || !lat2 || !lon1 || !lon2) return 0;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    let x=d;
    return x*1000;
  }

  const deg2rad=(deg)=> {
    return deg * (Math.PI/180)
  }

  const saveLocation=()=>{
    
    const newLocation={
      latitude:current.lat,
      longitude:current.lng
    }
   const updateLocation = async(newLocation) =>{
     try {
       const response=await api.updateLocation(id,newLocation);
       alert('Location saved successfully');
     } catch (error) {
       console.log(error.message);
     }
   };
   updateLocation(newLocation); 
  }

  
  const chnageFence=(e)=>{
    if(e.target.value>0){
    setDistance(e.target.value)
    }
  }

  return(
    <>
      {center.lat===undefined && <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Enter your location to use the app</h2></div>}
      {isLoggedIn && center.lat!==undefined &&
      <div >
        <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Latitude  {current.lat}</h2></div>
        <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Longitude  {current.lng}</h2></div>
        <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Fencing(in meter)  {distance}</h2></div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
        <button style={{background:'green',height:'30px',width:'150px'}}  onClick={currentLocation}>Change Center</button>
        <button style={{background:'grey',height:'30px',width:'150px',marginLeft:'5px'}}  onClick={saveLocation}>Save Location</button>
        </div>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}> <b>Enter fencing radius</b>&nbsp;<input type="number" onChange={(e)=>{chnageFence(e)}}></input></div>
        {inside && <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>You are inside the fence</h2></div>}
        {!inside && <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Alert!! You are outside the fence</h2></div>}
        
      </div>}
      {
        !isLoggedIn && center.lat!==undefined &&
        
        <div >
          <div style={{display:'flex',justifyContent:'center',height:'40px'}}><h2>Signin to use geofencing application</h2></div>
        <div style={{display:'flex',justifyContent:'center',height:'30px'}}><h2>Latitude  {current.lat}</h2></div>
        <div style={{display:'flex',justifyContent:'center'}}><h2>Longitude  {current.lng}</h2></div>
        </div>
      }
    </>
  )
};

export default Home;
 