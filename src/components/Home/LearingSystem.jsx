import { FaArrowDown } from "react-icons/fa";
import Title from "../share/Title";
import learningImg from '../../assets/learning.png'

const LearningSystem = () => {
  const features = [
    {
      title: "🎥 Live Interactive Classes",
      description:
        "Imagine sitting in a virtual classroom where you can interact with expert mentors, ask questions, and get immediate feedback.",
    },
    {
      title: "📼 Recorded Classes – Learn at Your Own Pace",
      description:
        "Missed a session? No worries! Every class is recorded and stored in your dashboard, so you can revisit lessons anytime, anywhere. Learn at your convenience and never fall behind.",
    },
    {
      title: "📖 Module-Based Learning – Step-by-Step Progress",
      description:
        "We don’t believe in throwing random lessons at you. Our structured module-based curriculum ensures that you build skills progressively—from beginner to advanced levels—so you never feel overwhelmed.",
    },
    {
      title: "⚡ Crash Courses – Learn Faster, Smarter!",
      description:
        "Pressed for time? Our crash courses are designed to help you quickly master high-demand skills without compromising quality. Whether you’re a beginner or someone looking to upskill, we’ve got you covered.",
    },
    {
      title: "🎓 Certification – Showcase Your Achievement",
      description:
        "Upon course completion, you’ll receive an industry-recognized professional certificate, proving your expertise and giving you an edge in the job market.",
    },
    {
      title: "💼 Guaranteed Internship & Job Assistance",
      description:
        "Unlike other platforms that just teach, we ensure you land a job! Every student gets access to internship opportunities, real-world projects, and career guidance to help them step into the professional world with confidence.",
    },
    {
      title: "️ Lifetime Support & Free Updates",
      description:
        "Your learning journey doesn’t end when the course does! Enroll once, and you get lifetime access to course updates, mentorship, and community support—ensuring that your skills stay relevant as industries evolve.",
    },
  ];

  return (
    <section className="max-w-[90%] xl:max-w-[1150px] mx-auto pt-24">
    
        <div className="mb-14">
            <Title title={"Productive Learning Process"}></Title>
        </div>

      <div className=" text-white shadow-lg flex flex-col md:flex-row">

        <div className="flex-1 space-y-10 border-l-2 border-dashed border-gray-300">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative pl-8 "
            >
              <div className="absolute -left-5  top-1 flex items-center justify-center w-10 h-10  rounded-full border border-blue-500 bg-[#020617]">
                <FaArrowDown className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-1 justify-center items-center">
          <img
            src={learningImg}
            alt="Learning Illustration"
            className="w-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default LearningSystem;
