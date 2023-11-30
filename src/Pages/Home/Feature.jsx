import SectionTitle from "../../Components/SectionTitle";




const Feature = () => {
    return (
        <>
            <SectionTitle heading={'Feature'} subHeading={'----Explore Our Feature----'}></SectionTitle>
            <div className="grid gap-5 mx-5 md:mx-10  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                <div className="card bg-base-100 shadow-xl items-start">
                    <figure><img className="p-5" src="https://i.ibb.co/SXQ9MZX/support.png" alt="support" /></figure>
                    <div className="p-4">
                        <h2 className="card-title mb-5">Premium
                            Logistics Support</h2>
                        <p>Discover unparalleled efficiency and reliability with our Premium Logistics Support services. At the forefront of cutting-edge logistics solutions, we redefine industry standards by seamlessly integrating precision and performance. </p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl items-start">
                    <figure><img className="p-5" src="https://i.ibb.co/Xpv05sP/courier.png" alt="support" /></figure>
                    <div className="p-4">
                        <h2 className="card-title mb-5">Highly Skilled
                            Logistics Partners</h2>
                        <p>Elevate your supply chain with our team of highly skilled logistics partners. At [Your Company Name], we understand the critical role that logistics play in the success of your business.</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl items-start">
                    <figure><img className="p-5" src="https://i.ibb.co/YfWDMck/unboxing.png" alt="support" /></figure>
                    <div className="p-4">
                        <h2 className="card-title mb-5">Safe & Secure
                            Product Delivery</h2>
                        <p>Experience peace of mind with our Safe & Secure Product Delivery service. At Express Cargo, we prioritize the safety and security of your valuable products from dispatch to doorstep. </p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl items-start">
                    <figure><img className="w-20" src="https://i.ibb.co/fX8Q3cM/11667260-20945973.jpg" alt="support" /></figure>
                    <div className="p-4">
                        <h2 className="card-title mt-2 mb-5">Fast Delivery Service at Your Doorstep!</h2>
                        <p>Experience the epitome of efficiency with our Fast Delivery Service. We understand the value of time, and our dedicated team is committed to ensuring swift and reliable delivery of your parcels.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feature;