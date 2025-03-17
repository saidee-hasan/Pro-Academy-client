import Title from "../../components/share/Title"

const PrivacyPolicy = () => {

    const allInfo = [
        {
            id: 1,
            title : "Data Collection & Usage",
            desc : "We collect essential information (name, email, course activity) to improve your learning experience. Your data is secure and never shared without consent."
        },

        {
            id: 2,
            title : "Online Classes & Recordings",
            desc : "Live sessions may be recorded for educational purposes. By enrolling, you agree to access and usage policies."
        },

        {
            id: 3,
            title : "Payments & Refunds",
            desc : "All transactions are secure. Refund policies vary by course—please check before enrolling."
        },

        {
            id: 4,
            title : "Certification & Job Support",
            desc : "Students receive a certificate upon course completion. Internship and job opportunities are offered based on performance."
        },

        {
            id: 5,
            title : "Student Conduct & Fair Use",
            desc : "Respectful engagement in classes and the community is expected. Any misuse may lead to restricted access."
        },

        {
            id: 6,
            title : "Policy Updates",
            desc : "We may update this policy as needed. Continued use of our platform means you accept these terms. For any queries, contact support@Pro  Academy .com or whatsapp(01764984545) Or don't give ther the contract number."
        },
    ]

  return (
    <section className="py-24">

        <div className="max-w-[90%] xl:max-w-[1200px] mx-auto">

            <Title title={'Privacy Policy & Terms'}></Title>

            <div className="mt-8">
                {
                    allInfo.map(data => (
                        <div key={data.id}> 
                            <h1 className="text-xl font-bold text-blue-500 mb-2">{data.title}</h1>
                            <p className="text-gray-300 mb-8">{data.desc}</p>
                        </div>
                    ))
                }
            </div>

        </div>

    </section>
  )
}

export default PrivacyPolicy
