import { AiOutlinePhone } from 'react-icons/ai';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillClockFill } from 'react-icons/bs';
import { TfiWrite } from 'react-icons/tfi';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import useAuth from '../../../Hooks/useAuth';
import SectionTitle from '../../../Components/SectionTitle';


const About = () => {

    const { user } = useAuth();
    const form = useRef();



    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_jpdrchn', 'template_lak7lg6', form.current, 'wpNh2IsyaGvPczacL')
            .then(() => {
                toast.success("Thank you for reaching out to us.")
                e.target.reset()
            }, (error) => {
                console.error(error.text);
                toast.error("Please try again later.")
            });
    };



    return (
        <div className='max-w-7xl mx-auto mt-10 p-4 text-center '>

            <div className='flex flex-col md:flex-row justify-between w-full  items-center bg-base-200 rounded-xl lg:p-5' id='about'>
                <div data-aos="fade-up">
                    <img className='rounded-xl max-h-[400px] w-full' src="https://i.ibb.co/w0qPF4F/about-card-img-1.jpg" alt="" />
                </div>
                <div data-aos="fade-down" className='text-center lg:mx-10 md:ml-2 mt-10 md:mt-0'>
                    <h3 className=" text-3xl lg:text-5xl font-bold lg:mb-10 mb-2  text-amber-600">About Us</h3>
                    <h1 className='text-xl md:text-2xl lg:text-4xl font-bold lg:mb-5'>Welcome to Express Cargo. </h1>
                    <p className='max-w-2xl'>Welcome to Express Cargo, your trusted partner in express cargo services. At Express Cargo, we are dedicated to delivering more than just parcels, we deliver peace of mind, reliability, and efficiency.</p> <br />
                    <p className='max-w-2xl '>With a commitment to excellence, we have crafted a seamless and swift cargo experience that caters to the diverse needs of our clients. Our team of dedicated professionals works tirelessly to ensure that your cargo reaches its destination safely and on time.</p>
                </div>
            </div>

            <div  id='contact'>
                <SectionTitle heading={'Contact Us'} subHeading={'----Have Any Question----'}></SectionTitle>
            <div className='flex lg:flex-row-reverse flex-col gap-10'>
                <div className='grid md:grid-cols-2 gap-5 mt-10 w-full'>
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
                <div className='text-left mt-10 w-full'>
                    
                    <form ref={form} onSubmit={sendEmail}>
                        <div className='flex flex-col gap-5 mt-5'>

                            <input type="text" name="from_name" placeholder="Your Name" defaultValue={user?.displayName} className="input input-bordered w-full " required />
                            <input type="email" name="from_email" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full " required />
                            <textarea placeholder="Massage" className="textarea textarea-bordered textarea-lg w-full " name="message" required></textarea>
                        </div>
                        <input className='btn bg-[#f5793b] text-white mt-5' type="submit" value="Send" />

                    </form>
                </div>
            </div>
            </div>
        </div>
    );
};

export default About;