import FaqQuestion from "../share/FaqQuestion"
import Title from "../share/Title"



const Faq = () => {

    return (
        <section className="overflow-hidden pb-24">

            <div className="max-w-[90%] xl:max-w-[1200px] mx-auto">

                <Title title={'Frequently Asked Question'}></Title>

                <div className="rounded-lg mt-10">

                        <FaqQuestion
                        question='What I Will Learn From Our Platform?'
                        ans='Ethical Hacking, Frontend Web Development, Video Editing, Digital Marketing, Graphic Design'
                        >
                        </FaqQuestion>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Ethical Hacking'
                            ans='In this course, you will gain a deep understanding of ethical hacking, including penetration
                            testing, network security, vulnerability assessment, and cyber defense strategies, which will
                            enable you to identify, analyze, and mitigate security threats in computer systems and networks.
                            You will also develop the ability to think like a hacker to protect systems, conduct security audits,
                            and ethically test vulnerabilities, making you well-equipped to secure organizations, prevent
                            cyberattacks, and pursue a career in cybersecurity.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Frontend Web Development'
                            ans='In this course, you will gain a deep understanding of frontend web development, including
                            HTML, CSS, JavaScript, and modern frameworks like React or Vue.js, which will enable you to
                            build responsive, interactive, and user-friendly websites and web applications. You will also
                            develop the ability to design and optimize web interfaces, enhance user experience, and
                            implement best coding practices, making you well-equipped to pursue a career as a frontend
                            developer, work on real-world projects, or contribute to web-based applications.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Video Editing'
                            ans='In this course, you will gain a deep understanding of video editing, including cutting, trimming,
                            color grading, transitions, special effects, and audio synchronization, which will enable you to

                            create professional-quality videos for various platforms, including social media, films, and
                            advertisements. You will also develop the ability to use industry-standard editing software,
                            enhance storytelling through visuals, and apply advanced editing techniques, making you
                            well-equipped to pursue a career in video production, content creation, or digital media.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Digital Marketing'
                            ans='In this course, you will gain a deep understanding of digital marketing, including SEO, social
                            media marketing, content marketing, email marketing, paid advertising, and analytics, which will
                            enable you to create and execute effective marketing strategies to grow businesses and brands
                            online. You will also develop the ability to analyze market trends, optimize campaigns, and use
                            data-driven strategies, making you well-equipped to pursue a career in digital marketing,
                            manage online brand presence, and drive business growth through digital channels.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Graphic Design'
                            ans='In this course, you will gain a deep understanding of graphic design, including visual
                            composition, typography, color theory, branding, and digital illustration, which will enable you to
                            create visually appealing designs for marketing, advertising, branding, and digital platforms. You
                            will also develop the ability to use industry-standard design tools, communicate ideas effectively
                            through visuals, and apply design principles to real-world projects, making you well-equipped to
                            work as a graphic designer, create stunning visuals for businesses, or start a freelance design
                            career.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='For Whom Is This Course?'
                            ans='1️⃣Ethical Hacking – Ideal for cybersecurity enthusiasts, IT professionals, and anyone interesin ethical hacking, penetration testing, and cybersecurity defense.

                            2️⃣Frontend Web Development – Perfect for aspiring web developers, designers, and who wants to build responsive and interactive websites.

                            3️⃣Video Editing – Suitable for content creators, filmmakers, YouTubers, and anyone lookingmaster video production and post-production techniques.

                            4️⃣Digital Marketing – Designed for entrepreneurs, business owners, marketers, and individuawho want to learn online marketing strategies to grow a brand.

                            5️⃣Graphic Design – Best for creative individuals, aspiring designers, marketers, and busineowners who want to create stunning visual content.
                            '
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Educational Background Required!'
                            ans='
                            1️⃣Ethical Hacking – No formal degree required! Basic computer knowledge and a passion for cybersecurity are enough to start. CSE students will have an advantage.

                            2️⃣Frontend Web Development – Open to all! No prior experience needed, but bas programming knowledge can help. Perfect for students and self-learners.

                            3️⃣Video Editing – Anyone can join! Creativity matters more than formal education. Ideal for content creators and those eager to tell stories through videos.

                            4️⃣Digital Marketing – No technical background needed! If you are passionate about business growth and online marketing, this course is for you.
                            '
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='How Can I Get Access to Recorded Class?'
                            ans='You can access class recordings anytime! 🎥📚 Every live session is recorded and available on our website, so you can watch, rewind, and learn at your own pace—anytime, anywhere! 🚀✨'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='What Should I Do If I Get Stuck?'
                            ans='You are never alone! 🚀 Get instant support from your teacher/mentor anytime. We are here 24/7 to guide you, motivate you, and help you achieve your goals! 💡💪'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Will You Help Us Earn?'
                            ans='Absolutely! 🚀 We offer internships and job opportunities to all our students, helping you turn your skills into real earnings! 💼💰'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='How Do You Conduct Online Classes?'
                            ans='We offer live classes where you can interact, ask questions, and engage with your teacher in real time! 📢✨ Plus, every session is recorded so you can revisit and learn anytime. 🎥📚'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Will I Get a Certificate?'
                            ans='Yes! 🎓✅ Complete the course and earn a recognized certificate to showcase your skills and boost your career! 🚀'
                            >
                            </FaqQuestion>
                        </div>

                </div>

            </div>

        </section>
    )
}

export default Faq
