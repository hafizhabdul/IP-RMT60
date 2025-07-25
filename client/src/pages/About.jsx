import React from 'react';
import { HardHat, Award, Users, Target, Shield, CheckCircle } from 'lucide-react';

const instructors = [
  {
    name: 'Dr. John Smith',
    role: 'Lead Instructor, UT & RT Specialist',
    bio: 'Dr. Smith is an ASNT NDT Level III certified professional with over 20 years of experience in aerospace and defense. He specializes in Ultrasonic and Radiographic Testing.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Prof. Sarah Johnson',
    role: 'MT & PT Certified Instructor',
    bio: 'Sarah is a certified NDT Level III in Magnetic Particle and Penetrant Testing, with a focus on automotive and manufacturing sectors. She is a passionate educator and mentor.',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Mike Chen',
    role: 'ET Specialist & Field Expert',
    bio: 'Mike brings 15 years of field experience in Eddy Current Testing for the power generation industry. His practical insights are invaluable to our advanced courses.',
    image: 'https://via.placeholder.com/150',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 48 }, (_, i) => (
              <div key={i} className="border-r border-slate-700"></div>
            ))}
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield size={64} className="mx-auto mb-4 text-orange-400" />
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            About <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">SAR NDT EDU</span>
          </h1>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Your trusted partner in Non-Destructive Testing education, certification, and career advancement.
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
              <Target size={48} className="mb-4 text-orange-600" />
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-mono">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be the world's leading online platform for Non-Destructive Testing education, setting the standard for quality, accessibility, and innovation in technical training. We envision a world where every NDT professional has the skills and knowledge to ensure safety and reliability across all industries.
              </p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
              <CheckCircle size={48} className="mb-4 text-green-600" />
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-mono">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                Our mission is to empower NDT professionals with comprehensive, hands-on training and industry-recognized certifications. We are committed to delivering engaging, up-to-date course material, taught by expert instructors, to help our students achieve their career goals and excel in the field of NDT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Users size={48} className="mx-auto mb-4 text-orange-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              <span className="font-mono">Meet Our</span> Instructors
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Learn from the best in the industry. Our instructors are certified Level III professionals with extensive field experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-slate-200 group text-center">
                <div className="relative h-48 bg-slate-200 flex justify-center items-center">
                  <img src={instructor.image} alt={instructor.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 font-mono">{instructor.name}</h3>
                  <p className="text-orange-600 font-semibold mb-3">{instructor.role}</p>
                  <p className="text-slate-600 text-sm">{instructor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Award size={48} className="mx-auto mb-4 text-orange-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              <span className="font-mono">Our</span> Certificates
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We offer certifications compliant with industry standards to help you advance your career.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <HardHat size={48} className="mx-auto mb-4 text-orange-600" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-mono">ASNT SNT-TC-1A</h3>
              <p className="text-slate-600">Our courses are designed to meet the rigorous standards of the American Society for Nondestructive Testing.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <Shield size={48} className="mx-auto mb-4 text-orange-600" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-mono">ISO 9712</h3>
              <p className="text-slate-600">We provide training that aligns with the International Organization for Standardization for NDT personnel qualification.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <CheckCircle size={48} className="mx-auto mb-4 text-orange-600" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-mono">Employer-Recognized</h3>
              <p className="text-slate-600">Our certificates are widely recognized and respected by employers in the NDT industry worldwide.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;