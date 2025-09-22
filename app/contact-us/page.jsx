import MyDiv from '@/components/ui/MyDiv'


import Address from './Address';
import { mobile } from '@/components/utils/variables';
import ContactForm from './ContactForm';


export default function ContactUsPage() {
    return (
        <MyDiv image={"/img/bgs/contact us.jpg"} title={"Contact Us"}>
            <div className="w-full my-12">
                <h1 className="text-gray-600 text-3xl font-bold">
                    <span className="text-primary">Connect</span> With Us
                </h1>
                <br />
                <p>We would love to respond to your queries and help you get the best packages for Andaman</p>
                <p>{`Feel free to contact us 24/7 Our Executives are available for you.`}</p>
                <br />
                <br />
                <div className={`flex flex-col sm:flex-row bg-white rounded-xl items-start gap-8`}>
                    <div className={`h-fit w-full sm:w-1/2`}>
                        <ContactForm/>
                    </div>
                    <Address
                        Address={"Shop No. 01, Pulikeezu Bhavan Bargat Line, near juvenile home, DRDO TRANSIT, Nayagaon, Port Blair, Andaman and Nicobar Islands 744106"}
                        Phone={"+91 99332 37775 | +91 9933263867"}
                        Email={"enquiryandamancabs@gmail.com"}
                    />
                </div>
                <a target="_blank" href="https://share.google/FcT40x72ZqMzqgi8P"><img src="/img/bgs/andaman google map.jpg" loading="lazy" alt="cruize banner" className="w-full mt-15"/></a>
            </div>
        </MyDiv>
    )
}
