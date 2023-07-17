import axios from 'axios';
import React, { useState } from 'react'

const Contactform = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [subject, setsubject] = useState("");
    const [message, setmessage] = useState("");
    const submitform = (e) => {
        const register = async () => {
          const response = await axios.post(
            "http://localhost:5000/api/contact",
            {
              name:name,
              email:email,
              subject:subject,
              message:message,
            }
          );
          console.log(response);
          alert("sent successfully");
        };
        register();
      };
  return (
    <div>
        <div class="mt-5 conatiner">
            <div class="text-center">
                <h3 className='m-4 text-black' style={{fontSize:"2rem",fontWeight:"800"}}>How Can We Help You?</h3>
                <p class="lead text-black" >If You Have Any Questions Contact here!!</p>
            </div>
            <div class=" d-flex align-items-center justify-content-center">
                <div class="bg-white col-md-6">
                    <div class="p-4 rounded shadow-md">
                        <div>
                            <label for="name" class="form-label">Your Name</label>
                            <input type="text" name="name" class="form-control" placeholder="Your Name" 
                             onChange={(e) => setname(e.target.value)}
                            required/>
                        </div>
                        <div class="mt-3">
                            <label for="email" class="form-label">Your Email</label>
                            <input type="text" name="email" class="form-control" 
                            placeholder="Your Email"
                            onChange={(e) => setemail(e.target.value)}
                            required/>
                        </div>
                        <div class="mt-3">
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" name="subject" class="form-control" placeholder="Subject"
                             onChange={(e) => setsubject(e.target.value)}
                             required/>
                        </div>
                        <div class="mt-3 mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea name="message" cols="20" rows="6" class="form-control"
                                placeholder="message" onChange={(e) => setmessage(e.target.value)}></textarea>
                        </div>
                        <button class="btn btn-secondary" onClick={submitform}>
                            Send
                        </button>
                    <div/>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Contactform