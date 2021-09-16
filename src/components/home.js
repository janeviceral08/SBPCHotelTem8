import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import Carousel from 'react-bootstrap/Carousel'

import TextField from '@material-ui/core/TextField';


import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import cogoToast from 'cogo-toast';

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        exercises: [],
        about_hotel: [],
        hotel_offer:[],
        carousel_header: [], 
        Hotel_Information: '',
        Name_of_Hotel: '',
        map_address: '',
        email: '',
        mobile: '',
        tel_no: '',
        website: '',
        address: '',
        hotel_city: '',
        title: '',
        subtitles: '',
        link: '',
        background_image: '',
        selectedDate :null,
        dates_value: [null, null],
        guest: "", 
		 check_out: "", 
		 check_in: "", 
		 room: "",
         open: false,
         username: "",
         password:"",
         hotel_image: "",
         spands: false,
     };
  }

  componentDidMount() {
    const hotel = {  val: "project=6127126cae94bc64a5e4b23a", }
    axios.post('http://localhost:5000/room_type/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
	})
	.catch((error) => {
	  console.log(error);
	})
      axios.post('http://localhost:5000/about_hotel/View_About_hotel/', hotel)
      .then(response => {
        this.setState({ about_hotel: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.post('http://localhost:5000/hotel_offer/View_Hotel_Offer/', hotel)
      .then(response => {
        this.setState({ hotel_offer: response.data })
      })
      .catch((error) => {
        console.log(error);
      })



      axios.post('http://localhost:5000/additional_info/View_Additional_Info/', hotel)
      .then(response => {
        this.setState({ 
            Hotel_Information: response.data.hotel_info,
             Name_of_Hotel: response.data.hotel_name,
             map_address:response.data.map_address,
            email: response.data.email,
            mobile:response.data.mobile,
            tel_no:response.data.tel_no,
            website:response.data.website,
            address:response.data.address,
            hotel_city: response.data.hotel_city,
            hotel_image: response.data.hotel_image,
            })
      }) 
      .catch((error) => {
        console.log(error);
      })

      axios.post('http://localhost:5000/carousel_header/View_Carousel_header/', hotel)
      .then(response => {
        this.setState({ carousel_header: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      
    axios.post('http://localhost:5000/video_area/View_Video_Area/', hotel)
      .then(response => {
        this.setState({ 
            title: response.data.title,
            subtitles: response.data.subtitles,
        link:  response.data.link,
        background_image: response.data.background_image,
        
      })
    
    // console.log('View_Video_Area ', response.data)
      })
      .catch((error) => {
        console.log(error);
      })


  }

  handleDateChange = (date) => {
    this.setState({selectedDate:date});
  };


  
  select= event => {

    this.setState({
		[event.target.name]: event.target.value
    })
  }


  onSubmit = event => {
    const { room, check_in, check_out, guest } = this.state;
if( guest !== "" && check_out!== "" && check_in!== "" && room!== ""){
	this.props.history.push('/Add_inf/'+room+'/'+check_in+'/'+check_out+'/'+guest)
}
   else{
	console.log("Please Complete the fields");
   }
};


onLogin = event => {
    const { username, password } = this.state;

    const exercise = {
        username,
	    password
      }
    axios.post('http://localhost:5000/admin/logins', exercise)
    .then(response =>
{        localStorage.setItem('hotel_id', response.data._partition)
        this.props.history.push('/')}
        ).catch(function (error) {
            cogoToast.error('Invalid Email or Password')
        console.log('error',error);
      })
    
    //this.props.history.push('/Admin')
console.log('pressed: ', username, password )
};


handleOpen = () => {

    this.setState({open:true});
  };
  
  handleOpenspands= () => {

    this.setState({spands:!this.state.spands});
  };
  handlespands = () => {
    this.setState({spands: false});
  };

   handleClose = () => {
    this.setState({open: false});
  };

  render() {
    var myloop = [];
	for (let i = 1; i < 10; i++) {
		myloop.push(
		
		  <option value={i} key={i}>{i}</option>
		);
	  }
      console.log('password: ', this.state.room)
      const { room, check_in, check_out, guest } = this.state;
	  const book = 'http://localhost:3000/Website_reserve?check_in='+check_in+'&&check_out='+check_out+'&&guest='+guest+'&&room='+room+'&&hotel='+"project=6127126cae94bc64a5e4b23a";
    return (
    
<body>

<Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>
          <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
  width: '70%',
  marginTop: '10%',
marginLeft: '20%'
    
    }} class="col-xl-12">
        <p>User Name</p>
        <TextField id="outlined-basic" label="User Name" variant="outlined" style={{width: '100%'}} name="username" onChange={this.select} />
        <p>Password</p>
        <TextField id="outlined-basic" label="Password" variant="outlined" style={{width: '100%'}} name="password" onChange={this.select} />
        <br /><br />
     <div style={{alignSelf: 'center'}}>
                                        <button type="submit" class="boxed-btn3" onClick={this.onLogin} >Login</button>
           </div>                       
        </div>

        </Fade>
      </Modal>

    <header>
        <div class="header-area ">
            <div id="sticky-header" class="main-header-area">
                <div class="container-fluid p-0">
                    <div class="row align-items-center no-gutters">
                        <div class="col-xl-5 col-lg-6">
                            <div class="main-menu d-none d-lg-block">
                                <nav>
                                    <ul>
                                        <li><a class="active">Home</a></li>
                                        <li><a >Rooms</a></li>
                                        <li><a >About</a></li>
                                        <li><a >Contact</a></li>
                                        <li onClick={this.handleOpen}><a onClick={this.handleOpen}>Login</a></li>
                                    </ul>
                                    
                                </nav>
                            </div>
                        </div>
                      
                        <div class="col-xl-2 col-lg-2">
                        {window.innerWidth < 992?
                          <div class="logo-img" style={{position: 'relative'}}>
                          <a>
                              <img src={this.state.hotel_image} alt=""/>
                          </a>
                          <i class="fa fa-bars" style={{'float': 'right', marginRight: '10%', padding: 10, fontSize: 25}} onClick={this.handleOpenspands}></i>
                                 <div class="book_room" style={{'float': 'right', marginRight: '10%', padding: 10}}>
                          
                          <div class="book_btn d-lg-block">
                              <a class="popup-with-form" href="#test-form">Book A Room</a>
                          </div>
                      </div>
                      </div>
                      :
                      <div class="logo-img" style={{position: 'relative'}}>
                            <a> <img src={this.state.hotel_image} alt=""/> </a>
                            </div>
                    }
                          
                          
                            <div style={{ display: this.state.spands==false?'none':'block',  color: 'white',
  padding:'14px 16px',
  'text-decoration': 'none',
  'font-size': '17px','background-color': '#333'}}>
    <a href="#news" style={{color: 'white',
  padding: '14px 16px',
  'text-decoration': 'none',
  'font-size':'17px',
  'display': 'block',}}>Home</a>
    <a href="#contact" style={{color: 'white',
  padding: '14px 16px',
  'text-decoration': 'none',
  'font-size':'17px',
  'display': 'block',}}>Rooms</a>
    <a href="#about" style={{color: 'white',
  padding: '14px 16px',
  'text-decoration': 'none',
  'font-size':'17px',
  'display': 'block',}}>About</a>
   <a href="#about" style={{color: 'white',
  padding: '14px 16px',
  'text-decoration': 'none',
  'font-size':'17px',
  'display': 'block',}}>Contact</a>
   <a href="#about" style={{color: 'white',
  padding: '14px 16px',
  'text-decoration': 'none',
  'font-size':'17px',
  'display': 'block',}}  onClick={this.handleOpen}>Login</a>
  </div>

                        </div>
                        <div class="col-xl-5 col-lg-4 d-none d-lg-block">
                            <div class="book_room">
                                
                                <div class="book_btn d-none d-lg-block">
                                    <a class="popup-with-form" href="#test-form">Book A Room</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="slider_area">
        <div class="slider_active owl-carousel">
        <Carousel indicators={false}>
        {this.state.carousel_header.map((header, index)=> 
          <Carousel.Item interval={2000} key={index}>
            <div class="single_slider d-flex align-items-center justify-content-center" style={{ 'background-image':`url(${header.background_image})`}}>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="slider_text text-center">
                                <h3>{header.title}</h3>
                                <p>{header.subtitles}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Carousel.Item>
            )}
  


</Carousel>
          
        </div>
    </div>
    {this.state.about_hotel.map((about,index)=> {
        if((index + 1) % 2 == 0){
           return <div class="about_area">
           <div class="container">
               <div class="row">
                   <div class="col-xl-5 col-lg-5">
                       <div class="about_info">
                           <div class="section_title mb-20px">
                               <span>{about.subtitle}</span>
                               <h3>{about.title}</h3>
                           </div>
                           <p>{about.description}</p>
                          
                       </div>
                   </div>
                   <div class="col-xl-7 col-lg-7">
                       <div class="about_thumb d-flex">
                           <div class="img_1">
                               <img src={about.image1} alt=""/>
                           </div>
                           <div class="img_2">
                               <img src={about.image2} alt=""/>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
        }else{
            return <div class="about_area">
            <div class="container">
                <div class="row">
                    <div class="col-xl-7 col-lg-7">
                        <div class="about_thumb2 d-flex">
                            <div class="img_1">
                                <img src={about.image1}alt=""/>
                            </div>
                            <div class="img_2">
                                <img src={about.image2}alt=""/>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-5">
                        <div class="about_info">
                            <div class="section_title mb-20px">
                                <span>{about.subtitle}</span>
                                <h3>{about.title}</h3>
                            </div>
                            <p>{about.description}</p>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
    }
    )}
    
    <div class="offers_area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="section_title text-center mb-100">
                        <span>Our Offers</span>
                        <h3>Ongoing Offers</h3>
                    </div>
                </div>
            </div>
            <div class="row">
                {this.state.hotel_offer.map((offer, index)=>
                 <div class="col-xl-4 col-md-4">
                 <div class="single_offers">
                     <div class="about_thumb">
                         <img src={offer.image} alt=""/>
                     </div>
                     <h3>{offer.title}</h3>
                     <ul>
                     {offer.description.map((item,index) => 
    <li key={index}>{item}</li>
)}
                     </ul>
                     
                 </div>
             </div>
                )}
               
               
                
            </div>
        </div>
    </div>
    <div class="video_area overlay" style={{ 'background-image':`url(${this.state.background_image})`}}>
        <div class="video_area_inner text-center">
            <span>{this.state.subtitles}</span>
            <h3>{this.state.title} </h3>
            <a href={this.state.link} class="video_btn popup-video">
                <i class="fa fa-play"></i>
            </a>
        </div>
    </div>

    <div class="features_room">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="section_title text-center mb-100">
                        <span>Featured Rooms</span>
                        <h3>Choose a Better Room</h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="rooms_here">

        {this.state.exercises.map( (rooms, index)=>
        <div class="single_rooms" key={index}>
        <div class="room_thumb">
        <ImageGallery items={rooms.img.map(({original, thumbnail}) => ({original, thumbnail }))}  defaultImage="http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg" 
                                    infinite={true}
                                    showBullets={true}
                                    showFullscreenButton={true}
                                    showPlayButton={true}
                                    showThumbnails={true}
                                    showIndex={true}
                                    showNav={true}
                                    thumbnailPosition={'right'}
                                    slideDuration={450}
                                    slideInterval={2000}
                                    slideOnThumbnailOver={true}
                                    additionalClass="app-image-gallery"
                                    useWindowKeyDown={true}/>
            
            <div class="room_heading d-flex justify-content-between align-items-center">
                <div class="room_heading_inner">
                    <span>Price { rooms.rate_mode == "Daily"? currencyFormat(parseFloat( rooms.roomprice)):  rooms.rate_mode == "Promo" &&  rooms.duration_mode == 'Daily'?currencyFormat(parseFloat( rooms.roomprice)): rooms.rate_mode == "Promo" &&  rooms.duration_mode == 'Hour'?currencyFormat(parseFloat( rooms.roomprice)):currencyFormat(parseFloat( rooms.roomprice_hour))}{ rooms.rate_mode == "Daily"? '/night':  rooms.rate_mode == "Promo" &&  rooms.duration_mode == 'Daily'?"("+ rooms.promo_duration+"nights)": rooms.rate_mode == "Promo" &&  rooms.duration_mode == 'Hour'?"/"+ rooms.hour_duration+"hours": "/"+ rooms.hour_duration+"hours"}
                    </span>
                    <span>Good for {rooms.max_person}</span>
                    <h3>{rooms.room_type}</h3>
                </div>
                <a class="line-button">book now</a>
            </div>
        </div>
    </div>
        )   }

            
           
          
           
        </div>
    </div>
    <div class="forQuery">
        <div class="container">
            <div class="row">
                <div class="col-xl-10 offset-xl-1 col-md-12">
                    <div class="Query_border">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-xl-6 col-md-6">
                                <div class="Query_text">
                                    <p>For Reservation 0r Query?</p>
                                </div>
                            </div>
                            <div class="col-xl-6 col-md-6">
                                <div class="phone_num">
                                    <a href="#" class="mobile_no">{this.state.mobile} {' & '} 
                               {this.state.tel_no}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="footer_top">
            <div class="container">
                <div class="row">
                <div class="col-xl-2 col-md-6 col-lg-2">
                        <div class="footer_widget">
                            <h3 class="footer_title">
                                Navigation
                            </h3>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Rooms</a></li>
                                <li><a href="#">About</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 col-lg-3">
                        <div class="footer_widget">
                            <h3 class="footer_title">
                                Contact Us
                            </h3>
                            <p class="footer_text">{this.state.mobile} <br/>
                               {this.state.tel_no}<br/>
                               {this.state.email}
                               <br/>
                               {this.state.website}
                              </p>
                        </div>
                    </div>
                  
                    <div class="col-xl-3 col-md-6 col-lg-3">
                        <div class="footer_widget">
                            <h3 class="footer_title">
                                address
                            </h3>
                            <p class="footer_text"> {this.state.address}<br/>  </p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-6 col-lg-4">
                        <div class="footer_widget">
                            <h3 class="footer_title">
                            Get Direction
                            </h3>
                            <form action="#" class="newsletter_form">
                            <iframe src={this.state.map_address} width="100%" height="270" style={{border:0}} allowfullscreen=""></iframe> 
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copy-right_text">
            <div class="container">
                <div class="footer_border"></div>
                <div class="row">
                    <div class="col-xl-8 col-md-7 col-lg-9">
                        <p class="copy_right">Copyright &copy;All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
</p>
                    </div>
                    <div class="col-xl-4 col-md-5 col-lg-3">
                        <div class="socail_links">
                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-facebook-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

        <form id="test-form" class="white-popup-block mfp-hide" onSubmit={this.onSubmit} >
                <div class="popup_box" style={{width: '100%'}}>
                        <div class="popup_inner">
                            <h3>Reservation</h3>
                            
                                <div class="row">
                                
                                <div class="col-xl-6">
                                <label for="file">Check-in Date</label> <br />
                                    <input type="date"  class="form-select wide form-control form-control-lg" name="check_in" onChange={this.select}/>
                                      
                                    </div>
                                    <div class="col-xl-6">
                                    <label for="file">Check-out Date:</label> <br />
                                    <input type="date"  class="form-select wide form-control form-control-lg" name="check_out" onChange={this.select}/>
                                      
                                    </div>
                                    <div class="col-xl-6">
                                    <label for="file">Guest:</label> <br />
                                        <select class="form-control form-control-lg" name="guest" style={{fontSize: 14}} onChange={this.select}>
                                         {myloop}
                                        </select>
                                    </div>
                                    <div class="col-xl-6">
                                        
                                    <label for="file">Room Type:</label> <br />
                                    <select class="form-select wide form-control form-control-lg" name="room" style={{fontSize: 14}} onChange={this.select}>
                                          

                                    {this.state.exercises.map((d, idx)=>
          <option key={idx} value={d.temp_id}>{d.name}</option>
       )}
                                        </select>
                                    </div>
                                    <div class="col-xl-12">
                                      &nbsp;
                                    </div>
                                    <div class="col-xl-12">
                                    <a class="boxed-btn3" href={book}> Book A Reservation</a>
                                      
                                    </div>
                                </div>
                         
                        </div>
                    </div>
            </form>



</body>
    )
  }
}