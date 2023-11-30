import { AiOutlinePhone } from 'react-icons/ai';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillClockFill } from 'react-icons/bs';
import { TfiWrite } from 'react-icons/tfi';
import { toast } from 'react-toastify';

const About = () => {


    const handleForm = (e) => {
        e.preventDefault()
        const form = e.target
        toast.success("Thank you for reaching out to us.")
        form.reset()
        

    }
    return (
        <div className=' mt-10 text-center flex flex-col justify-center items-center'>
            
            <div className='flex flex-col md:flex-row justify-center items-center bg-base-200 rounded-xl lg:p-10 '>
                <div data-aos="fade-up">
                    <img className='rounded-xl ' src="https://i.ibb.co/w0qPF4F/about-card-img-1.jpg" alt="" />
                </div>
                <div data-aos="fade-down" className='text-center lg:mx-10 md:ml-2 mt-10 md:mt-0'>
                <h3 className=" text-3xl lg:text-5xl font-bold lg:mb-10 mb-2  text-amber-600">About Us</h3>
                    <h1 className='text-xl md:text-2xl lg:text-4xl font-bold lg:mb-5'>Welcome to Express Cargo. </h1>
                    <p className='max-w-md text-start'>Welcome to Express Cargo, your trusted partner in express cargo services. At Express Cargo, we are dedicated to delivering more than just parcels, we deliver peace of mind, reliability, and efficiency.</p> <br />
                    <p className='max-w-md text-start'>With a commitment to excellence, we have crafted a seamless and swift cargo experience that caters to the diverse needs of our clients. Our team of dedicated professionals works tirelessly to ensure that your cargo reaches its destination safely and on time.</p>
                </div>
            </div>
            <div>
                <div className='grid md:grid-cols-2 gap-5 mt-10'>
                    <div data-aos="fade-right" className='flex gap-3 border-2 rounded-xl p-3 shadow-xl'>
                        <div className='text-4xl'><FaLocationDot></FaLocationDot></div>
                        <div>
                            <p className="text-2xl">Postal Address</p>
                            <p>Express Cargo</p>
                            <p>2nd floor, Abdullah Mansion, <br />Mirpur, Dhaka</p>
                        </div>

                    </div >
                    <div data-aos="fade-left" className='flex gap-3 border-2 rounded-xl p-3 shadow-xl'>
                        <div className='text-4xl'><AiOutlinePhone></AiOutlinePhone></div>
                        <div>
                            <p className="text-2xl">Phone & Email</p>
                            <p>Phone: <span className="text-blue-500 underline">(456) 789-1234</span></p>
                            <p>Fax: <span className="text-blue-500 underline"> (123) 456-7890</span></p>
                            <p>Email: <span className="text-blue-500 underline">hasan@gmail.com</span></p>
                        </div>

                    </div>

                    <div data-aos="fade-right" className='flex gap-3 border-2 rounded-xl p-3 shadow-xl'>
                        <div className='text-4xl'><BsFillClockFill></BsFillClockFill></div>
                        <div>
                            <p className="text-2x">Open Hours</p>
                            <p>Monday-Friday</p>
                            <p>8.00 am - 5.00 pm</p>
                            <p>Weekends Close</p>
                        </div>
                    </div>

                    <div data-aos="fade-left" className=' flex gap-3 border-2 rounded-xl p-3 shadow-xl'>
                        <div className='text-4xl'><TfiWrite></TfiWrite></div>
                        <div>
                            <p className="text-2xl">Sessions</p>
                            <p>Mornings: 8 am - 12 am</p>
                            <p>Afternoons: 1 pm - 5 pm</p>
                            <p>Full Day: 8 am - 5 pm</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='text-left mt-10'>
                <h2 className="text-4xl md:text-5xl font-bold mb-2">Contact Us</h2>
                <p className="text-sm">Contact Us
                    If you have any questions about this Agreement, please contact us filling this contact form</p>
                <form onSubmit={handleForm}>
                    <div className='flex flex-col gap-5 mt-5'>
                        <textarea placeholder="Massage" className="textarea textarea-bordered textarea-lg w-full " required></textarea>
                        <input type="text" placeholder="Your Name" className="input input-bordered w-full " required/>
                        <input type="email" placeholder="Your Email" className="input input-bordered w-full " required/>
                    </div>
                    <input className='btn btn-primary mt-5' type="submit" value="Submit" />

                </form>
            </div>
        </div>
    );
};

export default About;