import React from 'react'

export default function ContactUs() {
   
  return (
    <div className="container mt-5">
    <h1 className="text-center mb-5" style={{fontFamily:"Madimi One"}}>Contact Us</h1>
    <div className="row">
        <div className="col-md-6 offset-md-3">
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>
  )
}
